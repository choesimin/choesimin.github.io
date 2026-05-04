---
layout: note
permalink: /480
title: MongoDB Index Intersection - AND 조건에서 여러 Index 결합
description: index intersection은 AND 조건에서 여러 단일 index의 결과를 교집합으로 결합하며, AND_SORTED와 AND_HASH 두 가지 방식으로 동작합니다.
date: 2025-01-22
---


## Index Intersection

- **index intersection**은 AND 조건에서 여러 단일 index의 결과를 **교집합**으로 결합하는 기법입니다.
    - 각 index에서 일치하는 document의 RecordId를 가져온 후, 공통된 RecordId만 반환합니다.

- compound index가 없을 때 여러 field 조건을 처리하는 대안이 됩니다.
    - 하지만 query optimizer는 대부분의 경우 compound index를 선호합니다.


---


## AND_SORTED

- 두 index scan 결과가 모두 **RecordId 순으로 정렬**되어 있을 때 사용하는 방식입니다.
    - 정렬된 두 결과를 merge하면서 교집합을 구합니다.

```js
// status와 category에 각각 단일 index가 있는 경우
db.products.createIndex({ status: 1 });
db.products.createIndex({ category: 1 });

// 두 조건을 AND로 결합
db.products.find({ status: "active", category: "electronics" });
```


### AND_SORTED의 동작 원리

- 각 index scan은 RecordId 순으로 정렬된 결과를 반환합니다.
    - 두 정렬된 stream을 동시에 순회하면서 공통된 RecordId를 찾습니다.

```plaintext
Index A 결과 (RecordId 순) : [1, 3, 5, 7, 9]
Index B 결과 (RecordId 순) : [2, 3, 6, 7, 10]

AND_SORTED 병합 :
- 1 < 2 → A 진행
- 3 > 2 → B 진행
- 3 = 3 → 3 출력, A와 B 모두 진행
- 5 < 6 → A 진행
- 7 > 6 → B 진행
- 7 = 7 → 7 출력, A와 B 모두 진행
- ...

교집합 결과 : [3, 7]
```

- 이 방식은 `O(n + m)` 시간 복잡도로 효율적입니다.
    - `n`과 `m`은 각 index scan 결과의 크기입니다.


### Explain에서 AND_SORTED 확인

```js
{
    "stage": "FETCH",
    "inputStage": {
        "stage": "AND_SORTED",
        "inputStages": [
            {
                "stage": "IXSCAN",
                "indexName": "status_1",
                "keyPattern": { "status": 1 }
            },
            {
                "stage": "IXSCAN",
                "indexName": "category_1",
                "keyPattern": { "category": 1 }
            }
        ]
    }
}
```

- `AND_SORTED` stage 아래에 여러 `IXSCAN`이 있으면 index intersection이 발생한 것입니다.


---


## AND_HASH

- index scan 결과를 **hash table**에 저장하여 교집합을 구하는 방식입니다.
    - 첫 번째 index scan 결과의 RecordId를 hash table에 저장합니다.
    - 두 번째 index scan 결과를 순회하면서 hash table에 존재하는 RecordId만 반환합니다.

```js
{
    "stage": "AND_HASH",
    "inputStages": [
        { "stage": "IXSCAN", ... },
        { "stage": "IXSCAN", ... }
    ]
}
```


### AND_SORTED vs AND_HASH

| 구분 | AND_SORTED | AND_HASH |
| --- | --- | --- |
| **전제 조건** | 두 결과 모두 정렬됨 | 정렬 불필요 |
| **시간 복잡도** | `O(n + m)` | `O(n + m)` |
| **Memory 사용** | 낮음 | 높음 (hash table) |
| **선택 기준** | 정렬된 결과 사용 가능 시 | 정렬 불가능 시 |

- query optimizer는 일반적으로 `AND_SORTED`를 선호합니다.
    - memory 사용량이 적고 streaming 방식으로 처리 가능하기 때문입니다.


---


## Index Intersection 발생 조건

- index intersection이 발생하려면 query optimizer가 compound index보다 intersection이 더 효율적이라고 판단해야 합니다.


### 발생 가능한 조건

- compound index가 없고 각 field에 단일 index만 있는 경우입니다.

```js
// compound index 없음, 단일 index만 존재
db.products.createIndex({ status: 1 });
db.products.createIndex({ category: 1 });

// optimizer가 intersection을 선택할 수 있음
db.products.find({ status: "active", category: "electronics" });
```


### 실제 선택 빈도

- MongoDB 공식 문서에서 "query optimizer rarely selects plans that use index intersection"이라고 명시합니다.
    - optimizer는 단일 index로 대부분의 filtering을 처리하고 나머지는 FETCH 후 filtering하는 방식을 선호합니다.

- intersection이 선택되려면 각 단일 index의 **selectivity가 모두 높아야** 합니다.
    - 한쪽 index만 selectivity가 높으면 그 index만 사용하는 것이 더 효율적입니다.


### Compound Index가 있으면 선택 안 됨

- 적합한 compound index가 있으면 intersection 대신 compound index를 사용합니다.

```js
// compound index 추가
db.products.createIndex({ status: 1, category: 1 });

// intersection 대신 compound index 사용
db.products.find({ status: "active", category: "electronics" });
```


---


## 성능 특성

- index intersection은 compound index 대비 overhead가 있습니다.


### Index Scan 횟수

- intersection은 조건 수만큼 index scan을 수행합니다.
    - compound index는 한 번의 scan으로 처리합니다.

```js
// intersection : 2번의 index scan + merge 연산
db.products.find({ status: "active", category: "electronics" });

// compound index : 1번의 index scan
db.products.find({ status: "active", category: "electronics" })
    .hint({ status: 1, category: 1 });
```


### Memory 사용

- `AND_SORTED`는 streaming 방식으로 memory 사용량이 적습니다.
- `AND_HASH`는 첫 번째 index scan 결과를 hash table에 저장하므로 memory 사용량이 증가합니다.
    - 결과가 많으면 memory 부담이 커집니다.


### FETCH Stage

- intersection 후에도 document를 가져오는 `FETCH` stage가 필요합니다.
    - intersection은 RecordId만 반환하므로 실제 document는 별도로 fetch해야 합니다.

```js
{
    "stage": "FETCH",
    "inputStage": {
        "stage": "AND_SORTED",
        "inputStages": [ ... ]
    }
}
```


---


## Explain으로 분석

- explain을 사용하여 index intersection이 발생했는지 확인하고 성능을 분석합니다.


### Intersection 여부 확인

```js
db.products.find({ status: "active", category: "electronics" })
    .explain("executionStats");
```

- `AND_SORTED` 또는 `AND_HASH` stage가 있으면 intersection이 발생한 것입니다.
- 각 `inputStage`가 `IXSCAN`인지 확인합니다.


### 성능 지표 확인

```js
{
    "executionStats": {
        "nReturned": 50,
        "executionTimeMillis": 10,
        "totalKeysExamined": 300,
        "totalDocsExamined": 50
    }
}
```

- `totalKeysExamined`는 모든 index scan에서 검사한 key 수의 합입니다.
- `totalDocsExamined`가 `nReturned`와 같으면 intersection이 효과적으로 동작한 것입니다.


### Compound Index와 비교

```js
// intersection 사용
db.products.find({ status: "active", category: "electronics" }).explain();

// compound index 강제
db.products.find({ status: "active", category: "electronics" })
    .hint({ status: 1, category: 1 })
    .explain();
```

- 두 실행 계획의 `executionTimeMillis`와 `totalKeysExamined`를 비교합니다.


---


## 권장 사항

- index intersection에 의존하기보다 **compound index를 생성**하는 것이 권장됩니다.
    - 자주 사용하는 query pattern을 분석하여 적합한 compound index를 설계합니다.

```js
// 권장 : compound index 생성
db.products.createIndex({ status: 1, category: 1 });
```

- intersection은 다양한 query 조합을 지원해야 하거나 index 저장 공간이 제한된 환경에서 유용합니다.
    - 10개 field에 대해 다양한 조합의 query가 발생하면 모든 조합에 compound index를 만들 수 없으므로, 단일 index 10개로 intersection을 활용합니다.
    - compound index는 field 수만큼 저장 공간이 증가하지만, 단일 index 여러 개는 상대적으로 공간 효율적입니다.
    - 각 field의 selectivity가 모두 높아서 intersection 결과가 작으면 성능 저하가 크지 않습니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/index-intersection/>
- <https://www.mongodb.com/docs/manual/reference/explain-results/>

