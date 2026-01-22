---
layout: note
permalink: /336
title: MongoDB Multi-Index Query - 여러 Index를 활용하는 Query
description: MongoDB는 단일 query에서 여러 index를 동시에 사용하여 AND 조건은 교집합으로, OR 조건은 합집합으로 결과를 결합합니다.
date: 2025-01-22
---


## Multi-Index Query

- MongoDB는 단일 query에서 **여러 index를 동시에 사용**하여 결과를 결합할 수 있습니다.
    - AND 조건에서는 **index intersection**으로 여러 index 결과의 교집합을 구합니다.
    - OR 조건에서는 여러 index 결과의 **합집합**을 구합니다.

- compound index가 없는 상황에서 여러 field 조건을 처리하는 대안이 됩니다.
    - 하지만 일반적으로 compound index가 multi-index query보다 성능이 좋습니다.


---


## AND 조건에서의 Multi-Index 사용

- `$and` 조건이나 암묵적 AND 조건에서 여러 index의 결과를 **교집합**으로 결합하는 것을 **index intersection**이라고 합니다.
    - 각 index에서 일치하는 document ID를 가져온 후, 공통된 ID만 반환합니다.

```js
// status와 category에 각각 단일 index가 있는 경우
db.products.createIndex({ status: 1 });
db.products.createIndex({ category: 1 });

// 두 index를 동시에 사용하여 교집합
db.products.find({ status: "active", category: "electronics" });
```

- explain 결과에서 `AND_SORTED` 또는 `AND_HASH` stage로 나타납니다.

```js
{
    "stage": "AND_SORTED",
    "inputStages": [
        { "stage": "IXSCAN", "indexName": "status_1" },
        { "stage": "IXSCAN", "indexName": "category_1" }
    ]
}
```


### Index Intersection의 선택 빈도

- MongoDB 공식 문서에서도 "query optimizer rarely selects plans that use index intersection"이라고 명시합니다.
    - optimizer는 대부분의 경우 단일 index나 compound index를 선호합니다.
    - index intersection은 compound index가 없고, 각 단일 index의 selectivity가 높을 때 선택될 수 있습니다.


---


## OR 조건에서의 Multi-Index 사용

- `$or` 조건에서 각 절(clause)이 서로 다른 index를 사용할 수 있으면, 여러 index 결과를 **합집합**으로 결합합니다.
    - 각 조건에 맞는 index를 개별적으로 scan한 후, 결과를 병합하고 중복을 제거합니다.

```js
// name과 email에 각각 단일 index가 있는 경우
db.users.createIndex({ name: 1 });
db.users.createIndex({ email: 1 });

// 각 index를 사용하여 결과 합집합
db.users.find({
    $or: [
        { name: "Alice" },
        { email: "bob@example.com" }
    ]
});
```

- explain 결과에서 `OR` stage로 나타납니다.

```js
{
    "stage": "SUBPLAN",
    "inputStage": {
        "stage": "OR",
        "inputStages": [
            { "stage": "IXSCAN", "indexName": "name_1" },
            { "stage": "IXSCAN", "indexName": "email_1" }
        ]
    }
}
```


### $or Query의 Index 사용 조건

- `$or`의 **모든 절**이 index로 지원되어야 multi-index query가 가능합니다.
    - 하나라도 index가 없는 조건이 있으면 전체 collection scan이 발생합니다.

```js
// multi-index 사용 : 모든 조건에 index 있음
db.users.find({ $or: [{ name: "A" }, { email: "B" }] });

// collection scan : age에 index 없음
db.users.find({ $or: [{ name: "A" }, { age: 25 }] });
```


---


## Multi-Index vs Compound Index

- multi-index query와 compound index는 trade-off 관계입니다.

| 구분 | Multi-Index Query | Compound Index |
| --- | --- | --- |
| **성능** | 상대적으로 느림 | 더 빠름 |
| **유연성** | 다양한 query 조합 지원 | 특정 query 조합에 최적화 |
| **저장 공간** | 단일 index 여러 개 | 하나의 큰 index |
| **유지 보수** | index 개별 관리 | compound index 관리 |

- 자주 사용하는 query pattern에는 compound index를 생성하는 것이 권장됩니다.
    - multi-index query는 compound index가 없는 상황에서의 fallback으로 동작합니다.

```js
// 권장 : 자주 사용하는 pattern에 compound index 생성
db.products.createIndex({ status: 1, category: 1 });

// multi-index에 의존하는 것보다 compound index가 효율적
db.products.find({ status: "active", category: "electronics" });
```


---


## 성능 특성

- multi-index query는 여러 index scan 결과를 memory에 유지하고 병합해야 합니다.
    - compound index 대비 index scan 횟수가 많고, 병합 연산이 추가됩니다.


### Index Scan 횟수

- multi-index query는 조건 수만큼 index scan을 수행합니다.
    - compound index는 한 번의 scan으로 처리합니다.

```js
// multi-index : 2번의 index scan + merge 연산
db.products.find({ status: "active", category: "electronics" });

// compound index : 1번의 index scan
db.products.find({ status: "active", category: "electronics" })
    .hint({ status: 1, category: 1 });
```


### Memory 사용

- 병합 과정에서 중복 제거를 위해 document ID를 memory에 유지합니다.
    - 결과가 많으면 memory 사용량이 증가합니다.


---


## Explain으로 확인

- explain을 사용하여 multi-index query가 발생했는지 확인합니다.

```js
db.products.find({ status: "active", category: "electronics" })
    .explain("executionStats");
```

- 확인할 stage는 AND 조건과 OR 조건에 따라 다릅니다.
    - AND 조건 : `AND_SORTED`, `AND_HASH`.
    - OR 조건 : `OR`, `SUBPLAN`.

- 각 `inputStage`가 `IXSCAN`이면 multi-index query가 발생한 것입니다.


---


## 제한 사항

- multi-index query는 모든 index 조합에서 가능한 것이 아니며, special index 간의 결합에는 제한이 있습니다.


### $text와 $or 결합 불가

- `$text` 연산자는 `$or` 절 안에서 사용할 수 없습니다.

```js
// 불가능 : error 발생
db.articles.find({
    $or: [
        { $text: { $search: "mongodb" } },
        { author: "John" }
    ]
});
```

- `$text` query가 필요하면 `$or` 대신 별도의 query로 분리하거나, compound text index를 활용해야 합니다.


### Special Index 간 결합 불가

- 서로 다른 special index 타입을 결합하는 query는 지원되지 않습니다.

| 조합 | 가능 여부 |
| --- | --- |
| 일반 index + 일반 index | **가능** |
| `$text` + 일반 index | **가능** (compound text index) |
| `$text` + `$near` | **불가** |
| `$text` + geospatial | **불가** |
| geospatial + geospatial | **불가** |

```js
// 불가능 : $text와 $near 결합
db.places.find({
    $text: { $search: "cafe" },
    location: { $near: { $geometry: { type: "Point", coordinates: [127, 37] } } }
});
```


### Compound Text Index 제한

- compound text index는 multikey field나 geospatial field를 포함할 수 없습니다.
    - text index key 앞에 오는 field는 equality 조건이 필수입니다.

```js
// compound text index
db.articles.createIndex({ category: 1, content: "text" });

// 가능 : prefix field에 equality 조건
db.articles.find({
    category: "tech",
    $text: { $search: "mongodb" }
});

// 불가능 : prefix field 조건 없음
db.articles.find({
    $text: { $search: "mongodb" }
});
```


### Sort와 별도 Index 필요 시

- `sort()`에 별도의 index가 필요하면 index intersection이 적용되지 않습니다.
    - query와 sort를 모두 지원하는 compound index를 생성해야 합니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/index-intersection/>
- <https://www.mongodb.com/docs/manual/reference/operator/query/or/>
- <https://www.mongodb.com/docs/manual/reference/explain-results/>
- <https://www.mongodb.com/docs/manual/core/indexes/index-types/index-text/text-index-restrictions/>

