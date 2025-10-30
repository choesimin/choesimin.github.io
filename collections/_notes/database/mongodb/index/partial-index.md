---
layout: note
permalink: /389
title: MongoDB Partial Index - 조건부 색인으로 저장 공간 절약하기
description: Partial Index는 특정 조건을 만족하는 document만 index에 포함하여 저장 공간과 성능을 최적화합니다.
date: 2025-10-30
---


## Partial Index : 조건을 만족하는 Document만 색인화

- **partial index**는 collection의 일부 document만 index에 포함하는 선택적 index입니다.
    - filter 조건을 지정하여 해당 조건을 만족하는 document만 index에 추가합니다.

- partial index는 저장 공간을 크게 절약하면서도 필요한 query의 성능을 향상시킵니다.
    - 대규모 collection에서 특정 상태나 조건의 document만 자주 조회하는 경우에 매우 효과적입니다.

- MongoDB 3.2 version부터 지원되는 기능입니다.


---


## Partial Index의 필요성

- partial index는 일반 index보다 훨씬 적은 저장 공간을 사용하면서도 동일한 query 성능을 제공합니다.


### 저장 공간 절약

- 전체 collection에 대한 index를 만들면 모든 document가 index에 포함됩니다.
    - collection이 클수록 index가 차지하는 disk 공간도 비례하여 증가합니다.

- partial index는 필요한 document만 index에 포함하여 저장 공간을 대폭 줄입니다.
    - 예를 들어, 전체 주문 중 활성 주문만 자주 조회한다면 활성 주문만 index에 포함하면 됩니다.

```js
// 전체 document index (비효율적)
db.orders.createIndex({ status: 1, createdAt: 1 });

// 활성 주문만 index (효율적)
db.orders.createIndex(
    { status: 1, createdAt: 1 },
    { partialFilterExpression: { status: "active" } }
);
```


### Write 성능 향상

- index에 포함되는 document 수가 적을수록 insert, update, delete 작업의 성능이 향상됩니다.
    - index update 작업이 줄어들기 때문입니다.

- 대부분의 document가 filter 조건을 만족하지 않는 경우, write 성능이 크게 개선됩니다.


### Memory 효율성

- index가 작을수록 memory에 더 많은 부분을 cache할 수 있습니다.
    - working set이 memory에 유지되어 query 성능이 향상됩니다.

- partial index는 자주 접근하는 data만 index에 포함하여 memory 활용도를 높입니다.


---


## Partial Index 생성

- `partialFilterExpression` option으로 filter 조건을 지정합니다.


### 기본 생성 방법

```js
db.collection.createIndex(
    { field: 1 },
    { partialFilterExpression: { filterField: filterValue } }
);
```

```js
// 활성 사용자만 index에 포함
db.users.createIndex(
    { email: 1 },
    { partialFilterExpression: { active: true } }
);

// 특정 등급 이상의 회원만 index에 포함
db.members.createIndex(
    { name: 1 },
    { partialFilterExpression: { grade: { $gte: "gold" } } }
);

// null이 아닌 값만 index에 포함
db.products.createIndex(
    { category: 1 },
    { partialFilterExpression: { category: { $exists: true, $ne: null } } }
);
```


### 지원되는 Filter Expression

- partial index의 filter expression은 다음 연산자를 지원합니다.

| 연산자 | 설명 |
| --- | --- |
| `$eq` | 등호 비교 |
| `$gt`, `$gte`, `$lt`, `$lte` | 범위 비교 |
| `$exists` | field 존재 여부 |
| `$type` | data type 확인 |
| `$and` | 논리 AND 연산 |
| `$or` | 논리 OR 연산 |

```js
// 여러 조건을 조합한 partial index
db.orders.createIndex(
    { customerId: 1, createdAt: 1 },
    {
        partialFilterExpression: {
            $and: [
                { status: { $in: ["pending", "processing"] } },
                { amount: { $gte: 100 } }
            ]
        }
    }
);
```

- `$regex`, `$text`, geospatial 연산자 등은 지원되지 않습니다.


### Unique Partial Index

- partial index와 unique 제약을 함께 사용할 수 있습니다.
    - filter 조건을 만족하는 document 사이에서만 unique 제약이 적용됩니다.

```js
// 활성 사용자의 email은 중복 불가
db.users.createIndex(
    { email: 1 },
    {
        unique: true,
        partialFilterExpression: { active: true }
    }
);
```

- 비활성 사용자는 동일한 email을 가질 수 있지만, 활성 사용자끼리는 email이 중복될 수 없습니다.
    - 이는 soft delete scenario에서 매우 유용합니다.


---


## Partial Index 사용

- query에서 partial index를 사용하려면 query 조건이 filter expression을 포함하거나 더 엄격해야 합니다.


### Query가 Index를 사용하는 조건

- partial index는 query의 조건이 filter expression과 일치하거나 더 제한적일 때만 사용됩니다.

```js
// partial index 생성
db.orders.createIndex(
    { customerId: 1 },
    { partialFilterExpression: { status: "active" } }
);

// index 사용됨 (조건 일치)
db.orders.find({ customerId: 123, status: "active" });

// index 사용 안 됨 (조건 불일치)
db.orders.find({ customerId: 123 });
db.orders.find({ customerId: 123, status: "completed" });
```

- filter expression을 만족하지 않는 query는 partial index를 사용할 수 없습니다.


### 복잡한 Filter Expression 사용

```js
// 범위 조건을 포함한 partial index
db.products.createIndex(
    { name: 1 },
    { partialFilterExpression: { price: { $gte: 1000 } } }
);

// index 사용됨 (더 제한적인 조건)
db.products.find({ name: "Laptop", price: { $gte: 2000 } });

// index 사용 안 됨 (덜 제한적인 조건)
db.products.find({ name: "Laptop", price: { $gte: 500 } });
```

- query의 조건이 filter expression보다 더 넓은 범위를 포함하면 index가 사용되지 않습니다.


### Explain으로 확인

```js
// partial index 사용 여부 확인
db.orders.find(
    { customerId: 123, status: "active" }
).explain("executionStats");
```

- `explain()` 결과에서 `indexName` field를 확인하여 partial index가 사용되었는지 검증합니다.


---


## Partial Index vs Sparse Index

- partial index와 sparse index는 비슷해 보이지만 중요한 차이가 있습니다.


### Sparse Index

- **sparse index**는 index field가 존재하는 document만 포함합니다.
    - field가 `null`이거나 존재하지 않으면 index에 포함되지 않습니다.

```js
// sparse index 생성
db.users.createIndex(
    { phone: 1 },
    { sparse: true }
);
```

- sparse index는 오직 field의 존재 여부만 확인합니다.


### Partial Index

- **partial index**는 임의의 filter 조건을 지정할 수 있습니다.
    - field 존재 여부뿐만 아니라 값의 범위, type, 복합 조건 등을 모두 사용할 수 있습니다.

```js
// partial index로 sparse index 기능 구현 가능
db.users.createIndex(
    { phone: 1 },
    { partialFilterExpression: { phone: { $exists: true } } }
);
```

- partial index가 sparse index보다 훨씬 유연하고 강력합니다.


### 선택 기준

- field의 존재 여부만 확인하면 되는 경우 sparse index를 사용합니다.
- 복잡한 조건이 필요한 경우 partial index를 사용합니다.
- MongoDB 3.2 이상에서는 partial index를 권장합니다.


---


## Partial Index 활용 사례

- partial index는 다양한 실무 상황에서 효과적으로 사용됩니다.


### 활성/비활성 Data 분리

```js
// 활성 사용자만 자주 조회하는 경우
db.users.createIndex(
    { email: 1, lastLoginAt: 1 },
    { partialFilterExpression: { active: true } }
);

// 처리 중인 작업만 monitoring하는 경우
db.jobs.createIndex(
    { status: 1, priority: 1, createdAt: 1 },
    { partialFilterExpression: { status: { $in: ["pending", "running"] } } }
);
```

- 대부분의 query가 특정 상태의 document만 조회하는 경우 매우 효과적입니다.


### Soft Delete

```js
// 삭제되지 않은 document만 index에 포함
db.posts.createIndex(
    { title: 1, createdAt: 1 },
    { partialFilterExpression: { deletedAt: { $exists: false } } }
);

// unique 제약도 삭제되지 않은 document에만 적용
db.users.createIndex(
    { username: 1 },
    {
        unique: true,
        partialFilterExpression: { deletedAt: { $exists: false } }
    }
);
```

- soft delete pattern을 사용할 때 partial index는 필수적입니다.
    - 삭제된 document는 index에서 제외되어 성능과 저장 공간을 절약합니다.


### 중요도 기반 Index

```js
// VIP 고객만 빠르게 조회
db.customers.createIndex(
    { name: 1, region: 1 },
    { partialFilterExpression: { tier: { $in: ["vip", "premium"] } } }
);

// 고액 주문만 빠르게 분석
db.orders.createIndex(
    { createdAt: 1, amount: 1 },
    { partialFilterExpression: { amount: { $gte: 10000 } } }
);
```

- business logic에 따라 중요한 data만 index에 포함하여 효율성을 높입니다.


### 시계열 Data

```js
// 최근 30일 data만 index에 포함
db.logs.createIndex(
    { timestamp: 1, level: 1 },
    {
        partialFilterExpression: {
            timestamp: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
    }
);
```

- 오래된 data는 조회 빈도가 낮으므로 index에서 제외합니다.
    - 그러나 정적인 날짜 값을 사용하면 시간이 지나도 갱신되지 않으므로, TTL index와 함께 사용하거나 주기적으로 재생성해야 합니다.


---


## Partial Index 제약 사항

- partial index를 사용할 때 주의해야 할 제약 사항이 있습니다.


### _id Index는 Partial이 될 수 없음

- `_id` field의 기본 index는 partial index로 만들 수 없습니다.
    - `_id`는 모든 document에 대해 unique해야 하기 때문입니다.


### Shard Key Index 제약

- sharded collection의 shard key index는 partial index가 될 수 없습니다.
    - shard key는 모든 document에 대해 완전해야 하기 때문입니다.


### Filter Expression 연산자 제한

- filter expression에서 사용할 수 없는 연산자가 있습니다.
    - `$regex`, `$text`, `$where`, geospatial query 연산자 등.

- filter expression은 단순한 비교 연산과 논리 연산만 지원합니다.


### Query Planner 고려 사항

- query가 filter expression을 포함하지 않으면 partial index가 사용되지 않습니다.
    - application code에서 항상 올바른 조건을 포함해야 합니다.

- 여러 index 중 선택할 때 query planner가 partial index를 선택하지 않을 수도 있습니다.
    - `hint()`를 사용하여 명시적으로 index를 지정할 수 있습니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/index-partial/>
- <https://www.mongodb.com/docs/manual/core/index-sparse/>
- <https://www.mongodb.com/docs/manual/tutorial/unique-index-on-a-field-with-null-values/>

