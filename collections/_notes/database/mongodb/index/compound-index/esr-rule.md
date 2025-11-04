---
layout: note
permalink: /xxx
title: ESR Rule - Compound Index 설계의 핵심 원칙
description: ESR Rule은 Equality, Sort, Range 순서로 compound index의 field를 배치하는 원칙으로, query 성능을 획기적으로 향상시킵니다.
date: 2025-11-04
published: false
---


## ESR Rule : Equality, Sort, Range

- **ESR Rule**은 compound index의 field 순서를 결정하는 설계 원칙입니다.
    - Equality(=) : Sort(order) : Range(<, >, <=, >=)의 순서로 field를 배치합니다.
    - MongoDB query optimizer가 index를 최대한 효율적으로 활용할 수 있도록 합니다.

- ESR Rule을 따르면 filtering과 정렬을 모두 index에서 처리합니다.
    - memory에서의 정렬이 발생하지 않습니다.
    - document 접근을 최소화합니다.

- MongoDB 공식 문서에서 권장하는 best practice입니다.
    - 특히 범위 검색과 정렬이 함께 있는 복잡한 query에서 성능 차이가 극명합니다.


---


## 각 Component의 의미

- **Equality (E)** : 정확한 값으로 filtering하는 field입니다.
    - `{ status: "active" }` 같은 조건의 field입니다.
    - index에서 후보를 빠르게 좁혀줍니다.

- **Sort (S)** : query 결과를 정렬하는 field입니다.
    - `sort({ createdAt: -1 })` 같은 정렬 조건의 field입니다.
    - index에 이미 정렬된 순서로 배치되므로, 추가 정렬이 불필요합니다.

- **Range (R)** : 범위 조건으로 filtering하는 field입니다.
    - `{ age: { $gte: 20 } }` 같은 범위 조건의 field입니다.
    - index의 마지막에 배치하면 memory sort를 피할 수 있습니다.


---


## ESR Rule 적용 예시

- 같은 query에 대해 field 순서에 따라 성능이 어떻게 달라지는지 비교합니다.


### 기본 적용

```js
// query
db.users.find({
    status: "active",                    // Equality
    age: { $gte: 25 }                    // Range
}).sort({ createdAt: -1 });              // Sort

// 잘못된 설계 (field 순서 부적절)
db.users.createIndex({ age: 1, status: 1, createdAt: -1 });
// age 범위 검색 후 memory에서 정렬 필요

// 올바른 설계 (ESR rule)
db.users.createIndex({ status: 1, createdAt: -1, age: 1 });
// status로 filtering → createdAt으로 정렬 (index 활용) → age 범위 (index 활용)
```

- ESR rule을 따르면 모든 작업이 index에서 처리됩니다.


### 여러 Equality field

```js
// query
db.orders.find({
    customerId: "123",                   // Equality
    status: "completed",                 // Equality
    amount: { $gte: 100 }                // Range
}).sort({ orderDate: -1 });              // Sort

// 잘못된 설계
db.orders.createIndex({ amount: 1, orderDate: 1, customerId: 1, status: 1 });

// 올바른 설계 (ESR rule)
db.orders.createIndex({ customerId: 1, status: 1, orderDate: -1, amount: 1 });
// customerId와 status로 filtering → orderDate로 정렬 → amount 범위
```

- 여러 equality field가 있을 때도 같은 원칙을 적용합니다.


### Range만 있는 경우

```js
// query (정렬 없음)
db.products.find({
    category: "electronics",             // Equality
    price: { $lt: 1000 }                 // Range
});

// 올바른 설계 (ESR rule, Sort field 생략)
db.products.createIndex({ category: 1, price: 1 });
// category로 filtering → price 범위 (E-R)
```

- Sort가 없으면 E-R 순서로만 배치합니다.


### Equality와 Sort만 있는 경우

```js
// query (범위 검색 없음)
db.articles.find({
    author: "John"                       // Equality
}).sort({ views: -1 });                  // Sort

// 올바른 설계 (ESR rule, Range field 생략)
db.articles.createIndex({ author: 1, views: -1 });
// author로 filtering → views 정렬 (E-S)
```

- Range가 없으면 E-S 순서로만 배치합니다.


---


## ESR Rule이 중요한 이유


### Memory Sort의 성능 저하

```js
// query
db.users.find({
    status: "active",
    age: { $gte: 20 }
}).sort({ createdAt: -1 });

// ESR rule 미적용 : { age: 1, status: 1, createdAt: -1 }
// 1. age 범위 검색 : 50,000개 document 검사
// 2. memory sort : 50,000개를 createdAt으로 정렬
// 3. memory 제한 : 104MB 이상 정렬 시 실패 가능
{
    "nReturned": 100,
    "totalDocsExamined": 50000,
    "executionTimeMillis": 2500
}

// ESR rule 적용 : { status: 1, createdAt: -1, age: 1 }
// 1. status filtering : 5,000개로 축소
// 2. createdAt 정렬 : index에 이미 정렬됨 (추가 작업 없음)
// 3. age 범위 : 100개만 반환
{
    "nReturned": 100,
    "totalDocsExamined": 100,
    "executionTimeMillis": 25
}
```

- Memory sort는 성능을 100배 이상 저하시킵니다.


### Index Intersection 회피

```js
// ESR rule 미적용 시 MongoDB의 상황
db.users.createIndex({ age: 1 });
db.users.createIndex({ status: 1 });
db.users.createIndex({ createdAt: -1 });

db.users.find({
    status: "active",
    age: { $gte: 20 }
}).sort({ createdAt: -1 });

// MongoDB가 여러 index를 조합하려 시도 → 복잡하고 비효율적
// 또는 하나의 index만 선택 후 나머지는 memory에서 처리
```

- ESR rule을 따르는 하나의 compound index가 여러 단일 index보다 훨씬 효율적입니다.


### Working Set 최적화

```js
// ESR rule 적용으로 검사 document 수가 줄어듦
// → 더 많은 index가 memory에 올라감
// → cache hit rate 증가
// → query 성능 극적 개선
```

- **working set** : query 처리에 필요한 모든 data(index + document).
- ESR rule로 working set을 줄이면 memory에 더 많이 cache됩니다.


---


## ESR Rule 적용 시 고려 사항


### Query Pattern 분석의 중요성

```js
// query pattern 1 : status로 많이 filtering
db.users.find({ status: "active" }).sort({ createdAt: -1 });

// query pattern 2 : age 범위로 많이 검색
db.users.find({ age: { $gte: 20 } }).sort({ createdAt: -1 });

// 가장 자주 사용되는 query를 기준으로 index 설계
// 패턴 1이 더 많으면 : { status: 1, createdAt: -1, age: 1 }
// 패턴 2가 더 많으면 : age는 range이므로 ESR rule 위반
```

- 가장 자주 실행되는 query를 기준으로 ESR rule을 적용해야 합니다.
- 모든 query를 100% 최적화할 수는 없습니다.


### Selectivity 고려

```js
// 높은 selectivity : status 값이 적음 (10개 정도)
// 낮은 selectivity : age 범위가 너무 넓음 (전체 범위)

// 이 경우 더 selective한 field를 먼저 배치
db.users.createIndex({ status: 1, createdAt: -1, age: 1 });
// status로 빠르게 축소 → createdAt 정렬 → age 범위
```

- Equality field 여럿이 있을 때 더 selective한 field를 앞에 배치하면 더 효율적입니다.


### Write Performance 트레이드오프

```js
// ESR rule을 따르는 여러 compound index 생성
db.users.createIndex({ status: 1, createdAt: -1, age: 1 });
db.users.createIndex({ department: 1, createdAt: -1, salary: 1 });
db.users.createIndex({ region: 1, createdAt: -1, experience: 1 });

// document 삽입 시 모든 index를 update해야 함
db.users.insertOne({ ... }); // 3개 index 모두 update
```

- ESR rule을 정확히 적용한 index는 query 성능은 최적이지만 write 성능은 저하됩니다.
- 필요한 query만 선택적으로 index를 만들어야 합니다.


### Sort 방향의 영향

```js
// query 1
db.products.find({ category: "electronics" })
    .sort({ price: 1 });  // ascending

// query 2
db.products.find({ category: "electronics" })
    .sort({ price: -1 }); // descending

// 두 query를 모두 index에서 처리하려면
db.products.createIndex({ category: 1, price: 1 });
// query 1은 최적 (ascending 일치)
// query 2는 backward scan 필요 (약간의 성능 저하)
```

- 정렬 방향도 중요하지만, ascending과 descending 모두 효율적으로 처리할 수 있습니다.
- 완벽히 일치하지 않아도 memory sort보다 훨씬 효율적입니다.


---


## ESR Rule 적용 시 확인 사항


### Index 설계 전

- 자주 실행되는 query들을 파악했는가.
- 각 query의 filtering 조건(Equality, Range)을 분류했는가.
- 각 query의 정렬(Sort) 조건을 파악했는가.
- 가장 중요한 query를 선정했는가.

### Index 설계 중

- Equality field들을 앞에 배치했는가.
- Sort field를 그 다음에 배치했는가.
- Range field를 마지막에 배치했는가.
- 더 selective한 equality field가 앞에 있는가.

### Index 적용 후

- `explain("executionStats")`로 실행 계획을 확인했는가.
- `SORT` stage가 없는가.
- `nReturned`와 `totalDocsExamined`의 비율이 1:1에 가까운가.
- 실행 시간이 100ms 이하인가.


---


## ESR Rule vs 다른 설계 원칙


### ESR Rule이 최적인 경우

```js
// Equality + Sort + Range가 함께 있을 때
db.orders.find({
    status: "completed",
    amount: { $gte: 100 }
}).sort({ orderDate: -1 });

// ESR rule : { status: 1, orderDate: -1, amount: 1 }
```

### Sort 없이 Range만 있을 때

```js
// Equality + Range만 있을 때 (정렬 없음)
db.products.find({
    category: "electronics",
    price: { $lt: 1000 }
});

// E-R rule : { category: 1, price: 1 }
// ESR rule은 필요 없음 (S가 없으므로)
```

### Equality + Sort만 있을 때

```js
// Equality + Sort만 있을 때 (범위 검색 없음)
db.articles.find({
    author: "John"
}).sort({ views: -1 });

// E-S rule : { author: 1, views: -1 }
// Range field가 없으므로 ESR rule 전체가 필요 없음
```

- **ESR rule은 Equality, Sort, Range가 모두 있을 때 가장 강력합니다.**
- 상황에 따라 E-S, E-R 등 부분적으로 적용하기도 합니다.


---


## 실전 활용 예시


### e-commerce 상품 검색

```js
// query
db.products.find({
    status: "active",                    // Equality
    category: "electronics",             // Equality
    price: { $gte: 100, $lte: 1000 }    // Range
}).sort({ rating: -1 }).limit(20);      // Sort

// 올바른 설계 (ESR rule 적용)
db.products.createIndex({
    status: 1,        // E1
    category: 1,      // E2 (selectivity도 고려해서 순서 결정)
    rating: -1,       // S
    price: 1          // R
});

// 실행 계획
// 1. status="active" filtering
// 2. category="electronics" filtering
// 3. rating 내림차순으로 이미 정렬됨 (index 활용)
// 4. price 범위로 추가 filtering
// 5. top 20개만 반환
```


### 사용자 활동 분석

```js
// query
db.userActivity.find({
    userId: "user123",                   // Equality
    eventType: "purchase",               // Equality
    timestamp: {                         // Range
        $gte: new Date("2025-01-01"),
        $lte: new Date("2025-12-31")
    }
}).sort({ amount: -1 }).limit(100);     // Sort

// 올바른 설계 (ESR rule 적용)
db.userActivity.createIndex({
    userId: 1,        // E
    eventType: 1,     // E
    amount: -1,       // S
    timestamp: 1      // R
});
```


### Log 검색

```js
// query
db.logs.find({
    level: "error",                      // Equality
    service: "payment",                  // Equality
    timestamp: { $gte: Date.now() - 86400000 }  // Range (최근 24시간)
}).sort({ timestamp: -1 }).limit(50);   // Sort

// 올바른 설계 (ESR rule 적용)
db.logs.createIndex({
    level: 1,         // E
    service: 1,       // E
    timestamp: -1,    // S
});

// 참고 : Range field 생략한 이유는 timestamp가 이미 Sort에 포함되어 있기 때문
// timestamp 범위는 정렬 후 추가적으로 filtering됨
```


---


## Reference

- <https://www.mongodb.com/docs/manual/tutorial/sort-results-with-indexes/>
- <https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/>
- <https://www.mongodb.com/docs/manual/core/index-compound/#create-a-compound-index>

