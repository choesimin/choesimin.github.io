---
layout: note
permalink: /274
title: MongoDB Hint - Query Optimizer에게 Index 선택 지시하기
description: hint는 MongoDB query optimizer에게 특정 index를 사용하도록 명시적으로 지시하여 query 실행 계획을 제어합니다.
date: 2025-11-25
---


## Query Hint : Index 선택 강제하기

- MongoDB의 **hint**는 query optimizer에게 특정 index를 사용하도록 명시적으로 지시하는 기능입니다.
    - query planner가 자동으로 선택하는 index 대신 개발자가 지정한 index를 강제로 사용합니다.

- hint는 optimizer가 최적의 index를 선택하지 못하는 특수한 상황에서 성능을 개선하는 도구입니다.
    - 일반적으로는 optimizer가 적절한 index를 선택하지만, 복잡한 query나 특수한 data 분포에서는 잘못된 선택을 할 수 있습니다.


---


## Hint를 사용하는 이유

- query optimizer는 대부분의 경우 최적의 index를 선택하지만, 항상 완벽하지는 않으므로 hint로 개입이 필요한 경우가 있습니다.


### Optimizer의 잘못된 선택

- query optimizer는 통계 정보와 과거 실행 기록을 바탕으로 index를 선택합니다.
    - data 분포가 불균등하거나 통계가 부정확한 경우 잘못된 index를 선택할 수 있습니다.

```js
// 여러 index가 있는 경우
db.orders.createIndex({ status: 1, createdAt: 1 });
db.orders.createIndex({ customerId: 1, createdAt: 1 });

// optimizer가 status index를 선택했지만 customerId index가 더 효율적인 경우
db.orders.find({ status: "pending", customerId: 12345 });
```

- optimizer가 선택한 index가 실제로 최적이 아닐 수 있습니다.


### 특정 실행 계획 강제

- performance test 결과를 바탕으로 특정 index가 더 빠르다는 것을 확인한 경우, hint로 해당 index를 강제합니다.
    - optimizer의 선택을 신뢰하지 않고 확실한 성능을 보장하고자 할 때 사용합니다.


### Collection Scan 강제

- 때로는 index를 사용하지 않고 전체 collection scan이 더 효율적인 경우가 있습니다.
    - 매우 작은 collection이거나 대부분의 document를 반환해야 하는 경우입니다.
    - `$natural` hint로 collection scan을 강제할 수 있습니다.


---


## Hint 사용 방법

- hint는 `find()` 계열과 `aggregate()` 계열에서 각각 다른 문법으로 사용하며, index 이름 또는 index pattern으로 지정합니다.


### find 계열에서 사용

- `find()` method chain에 `hint()` method를 추가하여 index를 지정합니다.

```js
// index 이름으로 지정
db.collection.find({ field: value }).hint("index_name");

// index pattern으로 지정
db.collection.find({ field: value }).hint({ field: 1 });
```

```js
// 구체적인 예시
db.orders.find({ status: "pending", customerId: 12345 })
    .hint("customerId_1_createdAt_1");

// 또는 pattern으로
db.orders.find({ status: "pending", customerId: 12345 })
    .hint({ customerId: 1, createdAt: 1 });
```


### aggregate 계열에서 사용

- `aggregate()` method의 두 번째 parameter인 options 객체에 `hint` field를 추가합니다.
    - MongoDB 4.2 version부터 지원됩니다.

```js
// index 이름으로 지정
db.collection.aggregate(
    [{ $match: { field: value } }],
    { hint: "index_name" }
);

// index pattern으로 지정
db.collection.aggregate(
    [{ $match: { field: value } }],
    { hint: { field: 1 } }
);
```

```js
// 구체적인 예시
db.orders.aggregate(
    [
        { $match: { status: "pending" } },
        { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
    ],
    { hint: "status_1_customerId_1" }
);
```


### explain과 함께 사용

- hint의 효과를 검증하려면 `explain()`과 함께 사용하여 실제 성능을 비교합니다.

```js
// find 계열
db.orders.explain("executionStats")
    .find({ status: "pending", customerId: 12345 })
    .hint("customerId_1_createdAt_1");

// aggregate 계열
db.orders.explain("executionStats")
    .aggregate(
        [{ $match: { status: "pending" } }],
        { hint: "status_1" }
    );
```

- `explain()` 결과에서 `indexName` field를 확인하여 의도한 index가 사용되었는지 검증합니다.


### $natural Hint

- `$natural` hint는 index를 사용하지 않고 collection scan을 강제합니다.
    - disk 상의 자연스러운 순서대로 document를 읽습니다.

```js
// collection scan 강제
db.orders.find({ status: "pending" }).hint({ $natural: 1 });

// 역순 scan
db.orders.find({ status: "pending" }).hint({ $natural: -1 });
```

- 매우 작은 collection이거나 대부분의 document를 읽어야 하는 경우에 유용합니다.


---


## Hint 지정 방법

- hint는 index 이름 또는 index key pattern으로 지정할 수 있으며, 각 방법마다 장단점이 있습니다.


### Index 이름으로 지정

- `createIndex()`로 생성된 index의 이름을 문자열로 지정합니다.
    - 기본적으로 index 이름은 `field1_1_field2_-1` 형식으로 자동 생성됩니다.
    - 또는 `createIndex()` 시 `name` option으로 직접 지정할 수 있습니다.

```js
// 기본 이름으로 지정
db.orders.find({ customerId: 12345 }).hint("customerId_1_createdAt_1");

// 직접 지정한 이름으로
db.orders.find({ customerId: 12345 }).hint("search_customer_idx");
```

- index 이름은 명확하고 변경되지 않으므로 안정적입니다.


### Index Pattern으로 지정

- index의 key pattern을 객체 형태로 지정합니다.
    - `{ field1: 1, field2: -1 }` 형식으로 작성합니다.

```js
db.orders.find({ customerId: 12345 })
    .hint({ customerId: 1, createdAt: 1 });
```

- pattern으로 지정하면 index 이름을 몰라도 사용할 수 있습니다.
    - 그러나 정확히 일치하는 index가 없으면 error가 발생합니다.


### 선택 기준

- index 이름이 명시적으로 관리되는 경우 이름으로 지정합니다.
- index의 구조를 직접 표현하고 싶은 경우 pattern으로 지정합니다.
- 일반적으로는 index 이름으로 지정하는 것이 더 명확하고 안전합니다.


---


## Hint 사용 시 주의 사항

- hint는 강력한 도구이지만 잘못 사용하면 오히려 성능을 저하시킬 수 있으므로, 신중하게 사용해야 합니다.


### 존재하지 않는 Index 지정 시 Error

- hint로 지정한 index가 존재하지 않으면 query가 실패합니다.

```js
// 존재하지 않는 index를 hint로 지정
db.orders.find({ customerId: 12345 }).hint("nonexistent_index");

// error 발생
// MongoServerError: planner returned error :: caused by :: hint provided does not correspond to an existing index
```

- hint를 사용하기 전에 반드시 index가 존재하는지 확인합니다.


### 잘못된 Hint에 의한 성능 저하

- optimizer가 선택한 index가 실제로 더 효율적인데 hint로 다른 index를 강제하면 성능이 저하됩니다.
    - hint를 사용하기 전에 `explain()`으로 여러 index의 성능을 비교해야 합니다.

```js
// optimizer 선택 : status_1 index 사용, 10ms
db.orders.find({ status: "pending", amount: { $gte: 1000 } });

// hint 강제 : amount_1 index 사용, 50ms (더 느림)
db.orders.find({ status: "pending", amount: { $gte: 1000 } })
    .hint("amount_1");
```

- hint는 항상 성능을 개선하는 것이 아니므로 검증이 필수입니다.


### Hint는 임시방편

- hint는 근본적인 해결책이 아니라 임시방편입니다.
    - optimizer가 잘못된 index를 선택하는 이유를 파악하고, index 설계를 개선하는 것이 올바른 접근입니다.

- data 분포가 변경되거나 MongoDB version이 update되면 hint 없이도 optimizer가 올바른 선택을 할 수 있습니다.
    - 정기적으로 hint의 필요성을 재검토해야 합니다.


### MongoDB Version 및 Stage 제약

- MongoDB 4.2 이전 version에서는 `aggregate()`에서 hint를 사용할 수 없습니다.
    - 4.2 이상 version을 사용해야 합니다.

- `$geoNear` 같은 일부 aggregation stage는 hint와 함께 사용할 수 없습니다.
    - 특정 stage는 자체적으로 index를 선택하기 때문입니다.

```js
// $geoNear는 hint와 함께 사용 불가
db.places.aggregate(
    [
        {
            $geoNear: {
                near: { type: "Point", coordinates: [127.0, 37.5] },
                distanceField: "distance"
            }
        }
    ],
    { hint: "location_2dsphere" }  // error 발생
);
```


---


## 실전 활용 사례

- hint는 compound index 선택, collection scan 강제, performance test 등 실무에서 다양한 상황에 활용됩니다.


### Compound Index 중 특정 Index 선택

- 여러 compound index가 있을 때 optimizer가 잘못된 index를 선택하는 경우 hint로 올바른 index를 지정합니다.

```js
// 여러 index 존재
db.orders.createIndex({ status: 1, createdAt: 1 });
db.orders.createIndex({ customerId: 1, createdAt: 1 });
db.orders.createIndex({ status: 1, customerId: 1, createdAt: 1 });

// query
db.orders.find({ status: "pending", customerId: 12345 })
    .sort({ createdAt: -1 });

// optimizer가 status_1_createdAt_1을 선택했지만,
// status_1_customerId_1_createdAt_1이 더 효율적
db.orders.find({ status: "pending", customerId: 12345 })
    .sort({ createdAt: -1 })
    .hint("status_1_customerId_1_createdAt_1");
```

- `explain()`으로 각 index의 성능을 비교하여 최적의 index를 선택합니다.


### Collection Scan 강제

- 매우 작은 collection이거나 대부분의 document를 읽어야 하는 경우 collection scan(`$natural`)이 더 빠를 수 있습니다.

```js
// 작은 collection (100개 미만)
db.settings.find({}).hint({ $natural: 1 });

// 대부분의 document를 읽어야 하는 경우 (90% 이상)
db.users.find({ active: true }).hint({ $natural: 1 });
```

- index overhead가 오히려 성능을 저하시키는 경우에 유용합니다.


### 정렬 순서 최적화

- 정렬 조건과 정확히 일치하는 index를 hint로 지정하여 memory 정렬을 방지합니다.

```js
// index
db.products.createIndex({ category: 1, price: -1 });
db.products.createIndex({ category: 1, name: 1 });

// query (price 순 정렬)
db.products.find({ category: "electronics" })
    .sort({ price: -1 })
    .hint({ category: 1, price: -1 });

// query (name 순 정렬)
db.products.find({ category: "electronics" })
    .sort({ name: 1 })
    .hint({ category: 1, name: 1 });
```

- 정렬 방향까지 정확히 일치하는 index를 사용하여 `SORT` stage를 제거합니다.


### Performance Test 및 비교

- 여러 index 후보 중 어떤 것이 최적인지 확인하기 위해 hint를 사용하여 성능을 비교합니다.

```js
// index A test
db.orders.explain("executionStats")
    .find({ status: "pending", customerId: 12345 })
    .hint("status_1_customerId_1");

// index B test
db.orders.explain("executionStats")
    .find({ status: "pending", customerId: 12345 })
    .hint("customerId_1_status_1");

// 결과 비교 후 더 빠른 index 선택
```

- `executionTimeMillis`, `totalDocsExamined` 등의 지표를 비교하여 최적의 index를 결정합니다.


---


## Hint와 Index 선택 전략

- hint를 효과적으로 사용하려면 optimizer의 동작 원리를 이해하고, hint가 필요한 상황을 정확히 판단해야 합니다.


### Optimizer의 Index 선택 과정

- query optimizer는 여러 후보 index를 평가하여 가장 효율적인 것을 선택합니다.
    - query 조건, 정렬, projection, 통계 정보 등을 종합적으로 고려합니다.

- optimizer는 과거 실행 기록을 cache하여 다음 실행에 활용합니다.
    - 동일한 query pattern이 반복되면 cache된 plan을 재사용합니다.


### Hint가 필요한 상황 판단

- `explain()`으로 optimizer가 선택한 index를 확인하고, 성능이 만족스럽지 않은 경우에만 hint를 고려합니다.

- hint를 사용하기 전에 여러 사항을 먼저 확인하고, 신중하게 사용을 결정합니다.
    - optimizer가 선택한 index가 잘못되었는가.
    - 다른 index를 사용하면 성능이 개선되는가.
    - index 설계를 개선할 수 있는가.

- hint는 마지막 수단이어야 하며, index 설계 개선이 우선입니다.


### 정기적인 재검토

- data 분포, query pattern, MongoDB version 등이 변경되면 hint의 효과도 달라질 수 있습니다.
    - 정기적으로 hint가 여전히 필요한지, 더 나은 방법은 없는지 재검토합니다.

- optimizer가 발전하면서 예전에는 필요했던 hint가 불필요해지는 경우도 있습니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/reference/method/cursor.hint/>
- <https://www.mongodb.com/docs/manual/reference/operator/meta/hint/>
- <https://www.mongodb.com/docs/manual/core/query-plans/>

