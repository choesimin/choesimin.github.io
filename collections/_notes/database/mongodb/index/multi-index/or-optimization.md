---
layout: note
permalink: /481
title: MongoDB $or Query 최적화 - OR Stage와 SORT_MERGE
description: $or query는 각 조건에 맞는 index를 개별 scan하고 결과를 합집합으로 병합하며, 정렬이 필요한 경우 SORT_MERGE stage를 사용합니다.
date: 2025-01-22
---


## $or Query의 Index 활용

- `$or` query는 각 조건에 맞는 index를 **개별적으로 scan**하고, 결과를 **합집합**으로 병합합니다.
    - 각 index scan 결과에서 중복 document를 제거하여 최종 결과를 반환합니다.

- `$or`의 **모든 절(clause)**이 index로 지원되어야 multi-index query가 가능합니다.
    - 하나라도 index가 없는 조건이 있으면 전체 collection scan이 발생합니다.


---


## OR Stage

- `$or` query에서 각 조건이 서로 다른 index를 사용할 때 `OR` stage가 나타납니다.
    - 각 index scan 결과를 병합하고 중복을 제거합니다.

```js
// name과 email에 각각 단일 index가 있는 경우
db.users.createIndex({ name: 1 });
db.users.createIndex({ email: 1 });

// $or 조건으로 검색
db.users.find({
    $or: [
        { name: "Alice" },
        { email: "bob@example.com" }
    ]
});
```


### OR Stage의 동작 원리

- MongoDB는 각 조건에 대해 별도의 index scan을 수행합니다.
    - `name` index에서 조건에 맞는 document를 검색합니다.
    - `email` index에서 조건에 맞는 document를 검색합니다.
    - 두 결과를 합치고 중복 document를 제거합니다.


### RecordId 기반 중복 제거

- OR stage는 **RecordId set**을 유지하여 중복 document를 제거합니다.
    - 각 index scan에서 반환된 RecordId를 set에 추가합니다.
    - 이미 set에 있는 RecordId는 건너뜁니다.

- 이 방식은 document 수에 비례하여 memory를 사용합니다.
    - 결과가 많으면 memory 사용량이 크게 증가할 수 있습니다.


### Explain에서 OR Stage 확인

```js
db.users.find({
    $or: [
        { name: "Alice" },
        { email: "bob@example.com" }
    ]
}).explain("executionStats");
```

```js
{
    "stage": "SUBPLAN",
    "inputStage": {
        "stage": "OR",
        "inputStages": [
            {
                "stage": "IXSCAN",
                "indexName": "name_1",
                "keyPattern": { "name": 1 }
            },
            {
                "stage": "IXSCAN",
                "indexName": "email_1",
                "keyPattern": { "email": 1 }
            }
        ]
    }
}
```

- `OR` stage 아래에 여러 `IXSCAN`이 있으면 multi-index query가 발생한 것입니다.


---


## SUBPLAN Stage

- `$or` query의 실행 계획을 감싸는 **wrapper stage**입니다.
    - 각 `$or` 절에 대해 최적의 실행 계획을 선택하는 역할을 합니다.

```js
{
    "stage": "SUBPLAN",
    "inputStage": {
        "stage": "OR",
        ...
    }
}
```

- SUBPLAN stage 자체는 실행 시간에 거의 영향을 주지 않습니다.
    - query planning 단계에서 각 절의 최적 plan을 결정하는 데 사용됩니다.


---


## SORT_MERGE Stage

- `$or` query에 `sort()`가 추가되고, 각 조건이 **동일한 정렬 순서**를 제공할 수 있으면 `SORT_MERGE` stage가 사용됩니다.
    - 각 index scan 결과가 이미 정렬되어 있으므로, memory에 올리지 않고 병합할 수 있습니다.


### SORT_MERGE vs OR + SORT

| 구분 | SORT_MERGE | OR + SORT |
| --- | --- | --- |
| **정렬 방식** | index 순서 활용 | memory 정렬 |
| **Memory 사용** | 낮음 | 높음 |
| **성능** | 빠름 | 느림 |
| **조건** | 모든 절이 동일한 정렬 제공 | 정렬 순서 불일치 |


### SORT_MERGE 발생 조건

- `$or`의 모든 절이 **동일한 index의 동일한 정렬 순서**를 제공해야 합니다.

```js
// 두 조건 모두 { rand: 1, dt: 1 } index 사용 가능
db.collection.createIndex({ rand: 1, dt: 1 });
db.collection.createIndex({ name_seq: 1, dt: 1 });

// 두 index 모두 dt 정렬 제공 → SORT_MERGE 가능
db.collection.find({
    $or: [
        { rand: 25 },
        { name_seq: "A" }
    ]
}).sort({ dt: 1 });
```


### SORT_MERGE 성능 향상 사례

- OR + SORT 대비 SORT_MERGE는 성능이 크게 향상될 수 있습니다.
    - memory 정렬을 피하고 streaming 방식으로 결과를 반환합니다.

```plaintext
OR + SORT : 12ms, 692 keys, 1,212 docs 검사
SORT_MERGE : 3ms, 688 keys, 627 docs 검사

→ 약 4배 성능 향상
```


### SORT_MERGE가 불가능한 경우

- 각 절이 서로 다른 정렬 순서를 제공하면 `OR` stage 후 memory `SORT`가 발생합니다.

```js
// 각 index의 정렬 순서가 다름
db.users.find({
    $or: [
        { name: "Alice" },
        { status: "active" }
    ]
}).sort({ createdAt: -1 });
```

- 병합된 결과를 memory에서 정렬해야 합니다.
    - 결과가 많으면 `allowDiskUse` option이 필요할 수 있습니다.


---


## $or Query 최적화 전략

- `$or` query는 모든 조건에 index를 생성하고, 같은 field 검색은 `$in`으로 대체하며, selectivity가 높은 조건을 활용하여 최적화합니다.


### 모든 조건에 Index 생성

- `$or`의 모든 조건이 index를 사용할 수 있도록 설계합니다.

```js
// 모든 조건에 index 생성
db.users.createIndex({ name: 1 });
db.users.createIndex({ email: 1 });
db.users.createIndex({ phone: 1 });

// 모든 조건이 index 사용
db.users.find({
    $or: [
        { name: "Alice" },
        { email: "alice@example.com" },
        { phone: "010-1234-5678" }
    ]
});
```


### $or 대신 $in 사용

- **같은 field**에 대한 여러 값 검색은 `$in`이 더 효율적입니다.
    - `$in`은 단일 index scan으로 처리합니다.

```js
// 비효율적 : $or 사용
db.users.find({
    $or: [
        { status: "active" },
        { status: "pending" },
        { status: "review" }
    ]
});

// 효율적 : $in 사용 (단일 index scan)
db.users.find({
    status: { $in: ["active", "pending", "review"] }
});
```


### 정렬이 필요한 경우 Index 설계

- `$or` + `sort()` 조합에서 SORT_MERGE를 활용하려면 정렬 field를 포함한 compound index가 필요합니다.

```js
// 각 조건 field + 정렬 field로 compound index 생성
db.users.createIndex({ name: 1, createdAt: -1 });
db.users.createIndex({ email: 1, createdAt: -1 });

// SORT_MERGE 가능
db.users.find({
    $or: [
        { name: "Alice" },
        { email: "bob@example.com" }
    ]
}).sort({ createdAt: -1 });
```


### Selectivity 고려

- selectivity가 높은 조건(결과가 적은 조건)이 있으면 전체 성능이 향상됩니다.
    - MongoDB optimizer가 자동으로 최적화합니다.

```js
// unique한 email 조건이 결과를 크게 줄임
db.users.find({
    $or: [
        { email: "specific@example.com" },  // 결과 1건
        { status: "active" }                 // 결과 10,000건
    ]
});
```


---


## Memory 사용 주의

- `$or` query는 RecordId set과 결과 병합에 memory를 사용합니다.


### RecordId Set Memory

- 중복 제거를 위해 이미 처리한 RecordId를 memory에 유지합니다.
    - document 수에 비례하여 memory 사용량이 증가합니다.
    - 이 memory 사용량에는 제한이 없어서 unbounded memory 이슈가 발생할 수 있습니다.

```js
// 각 조건의 결과가 많으면 memory 부담 증가
db.logs.find({
    $or: [
        { level: "error" },      // 100,000건
        { level: "warning" }     // 500,000건
    ]
});
```


### 정렬 Memory

- SORT_MERGE가 불가능하면 memory에서 정렬이 발생합니다.
    - 100MB 제한을 초과하면 error가 발생합니다.
    - `allowDiskUse: true` option으로 disk 사용을 허용할 수 있습니다.


---


## Explain으로 분석

- explain을 사용하여 `$or` query의 실행 계획과 성능을 분석합니다.


### 확인할 Stage

```js
db.users.find({
    $or: [
        { name: "Alice" },
        { email: "bob@example.com" }
    ]
}).sort({ createdAt: -1 }).explain("executionStats");
```

- `SUBPLAN` : `$or` query의 wrapper stage.
- `OR` : 여러 index 결과를 합집합으로 병합.
- `SORT_MERGE` : 정렬을 유지하면서 정렬된 index 결과를 병합.
- `SORT` : SORT_MERGE가 불가능할 때 memory 정렬.


### 성능 지표 확인

```js
{
    "executionStats": {
        "nReturned": 100,
        "executionTimeMillis": 15,
        "totalKeysExamined": 250,
        "totalDocsExamined": 100
    }
}
```

- `totalKeysExamined`가 `nReturned`보다 훨씬 크면 각 index scan에서 많은 key를 검사한 것입니다.
- `SORT` stage가 있으면 memory 정렬이 발생한 것이므로 index 재설계를 고려합니다.


### Collection Scan과 비교

```js
// multi-index 사용
db.users.find({ $or: [{ name: "A" }, { email: "B" }] }).explain();

// collection scan 강제
db.users.find({ $or: [{ name: "A" }, { email: "B" }] })
    .hint({ $natural: 1 })
    .explain();
```

- 두 실행 계획의 `executionTimeMillis`를 비교하여 multi-index query가 효과적인지 판단합니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/reference/operator/query/or/>
- <https://www.mongodb.com/docs/manual/reference/explain-results/>
- <https://jira.mongodb.org/browse/SERVER-24375>
- <https://jira.mongodb.org/browse/SERVER-27658>
- <https://github.com/simagix/mongodb-demo/blob/master/sort_stages/README.md>

