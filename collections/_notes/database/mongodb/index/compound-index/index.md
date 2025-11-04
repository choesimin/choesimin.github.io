---
layout: note
permalink: /261
title: MongoDB Compound Index - 여러 Field를 포함하는 색인
description: Compound Index는 여러 field를 함께 indexing하여 복합 query의 성능을 대폭 향상시킵니다.
date: 2025-11-04
---


## Compound Index : 다중 Field 검색을 위한 색인

- **compound index**는 두 개 이상의 field를 함께 indexing하는 특수한 index입니다.
    - 여러 field의 조건을 동시에 만족하는 document를 효율적으로 찾을 수 있습니다.

- compound index는 단일 field index와 달리 **field의 순서가 매우 중요**합니다.
    - index의 첫 번째 field부터 순차적으로 검색하므로, query pattern에 맞게 field 순서를 설계해야 합니다.

- MongoDB는 single index로도 여러 field query를 처리할 수 있지만, compound index를 사용하면 훨씬 더 효율적입니다.
    - 특히 `sort()`, 범위 검색, 여러 조건의 AND query에서 성능이 크게 향상됩니다.


---


## Compound Index의 필요성

- compound index는 **multiple field query의 성능을 획기적으로 개선**하는 가장 효과적인 방법입니다.
    - 단일 index로는 여러 조건을 동시에 처리하기 어렵고, full collection scan이 발생할 수 있습니다.


### 단일 Index의 한계

- 각 field마다 별도의 단일 index를 생성해도 MongoDB는 한 번에 하나의 index만 사용합니다.
    - 여러 field 조건이 있는 query에서는 먼저 선택된 index로 document를 찾은 후, 나머지 조건을 memory에서 filtering합니다.

```js
// 두 개의 단일 index
db.users.createIndex({ age: 1 });
db.users.createIndex({ status: 1 });

// query에서는 한 가지 index만 선택됨
db.users.find({ age: 25, status: "active" });
// age index를 선택하고, status는 memory에서 filtering
```

- 이런 방식은 filtering할 document가 많으면 매우 비효율적입니다.


### Compound Index의 장점

- compound index를 사용하면 **두 field 모두에 대한 index를 활용**할 수 있습니다.

```js
// compound index
db.users.createIndex({ age: 1, status: 1 });

// query 실행
db.users.find({ age: 25, status: "active" });
// age와 status 모두를 index로 탐색
```

- **첫 번째 field로 빠르게 후보를 줄인 후, 두 번째 field로 추가 filtering**합니다.
    - 두 번째 field로 정렬된 상태로 document를 반환하므로 `sort()` operation도 생략됩니다.


---


## Compound Index 생성

- compound index는 여러 field를 객체 형태로 지정하여 생성합니다.


### 기본 Compound Index

```js
// age와 status에 대한 compound index
db.users.createIndex({ age: 1, status: 1 });
```

- field 다음의 `1`은 ascending order, `-1`은 descending order를 의미합니다.
    - index 생성 시 정렬 방향을 명시해야 합니다.

- 최대 32개의 field를 하나의 compound index에 포함할 수 있습니다.


### 정렬 방향 지정

```js
// age는 ascending, status는 descending
db.users.createIndex({ age: 1, status: -1 });

// query 실행 시 age는 낮은 순, status는 높은 순으로 정렬됨
db.users.find({ age: 25 }).sort({ age: 1, status: -1 });
```

- compound index의 정렬 방향은 query의 정렬 조건과 일치할 때 가장 효율적입니다.


### 복잡한 Compound Index

```js
// 3개 이상의 field를 포함하는 compound index
db.orders.createIndex({
    customerId: 1,
    orderDate: -1,
    status: 1
});

// 다양한 query pattern을 지원
db.orders.find({ customerId: "123" });
db.orders.find({ customerId: "123", orderDate: { $gte: new Date("2025-01-01") } });
db.orders.find({ customerId: "123", orderDate: -1, status: "completed" });
```

- field가 많을수록 다양한 query를 지원할 수 있지만, write 성능에는 영향을 줍니다.


---


## ESR Rule : Compound Index 설계 원칙

- compound index를 효율적으로 설계하기 위해 **ESR rule**을 따르는 것이 권장됩니다.
    - ESR은 Equality, Sort, Range의 약자입니다.


### ESR Rule의 의미

- **Equality** : 정확한 일치(`=`)를 확인하는 field를 맨 앞에 배치합니다.
    - `{ status: "active" }` 같은 조건을 처리하는 field입니다.

- **Sort** : 정렬(`sort()`)이 필요한 field를 중간에 배치합니다.
    - 정렬된 순서로 document를 반환하는 field입니다.

- **Range** : 범위 검색(`<`, `>`, `>=`, `<=`)을 하는field를 마지막에 배치합니다.
    - `{ age: { $gte: 20 } }` 같은 범위 조건을 처리하는 field입니다.


### ESR Rule 적용 예시

```js
// 나쁜 예 : field 순서가 뒤바뀜
db.users.createIndex({ age: 1, status: 1, createdAt: -1 });

// 좋은 예 : ESR rule 적용
// equality: status, sort: createdAt, range: age
db.users.createIndex({ status: 1, createdAt: -1, age: 1 });

// query
db.users.find({
    status: "active",
    age: { $gte: 20 }
}).sort({ createdAt: -1 });
```

- ESR rule을 따르면 query 실행 시 **모든 index를 활용**할 수 있습니다.
    - field 순서가 틀리면 일부 field는 memory에서 filtering됩니다.


---


## Compound Index 활용

- compound index는 다양한 query pattern을 지원합니다.


### Prefix 사용

```js
// compound index
db.users.createIndex({ country: 1, age: 1, name: 1 });

// 다음 query들은 모두 이 index를 활용
db.users.find({ country: "Korea" });
db.users.find({ country: "Korea", age: 25 });
db.users.find({ country: "Korea", age: 25, name: "John" });

// 다음 query는 index를 활용하지 못함 (age가 먼저 나옴)
db.users.find({ age: 25, name: "John" });
```

- compound index는 **field의 prefix를 활용할 수 있습니다.**
    - 앞의 field부터 순차적으로 사용되므로, 첫 번째 field부터 시작하는 query들이 index를 활용합니다.


### Sort 최적화

```js
// index
db.users.createIndex({ status: 1, age: 1 });

// in-memory sort 없음 (index에 이미 정렬됨)
db.users.find({ status: "active" }).sort({ age: 1 });

// in-memory sort 필요 (역순 정렬)
db.users.find({ status: "active" }).sort({ age: -1 });
```

- compound index의 정렬 방향과 query의 정렬 방향이 일치하면 추가 정렬이 필요 없습니다.


### Covered Query

```js
// compound index (projection도 포함)
db.users.createIndex({ status: 1, age: 1 });

// covered query: document 접근 없음
db.users.find(
    { status: "active", age: 25 },
    { _id: 0, status: 1, age: 1 }
);
```

- compound index의 모든 field가 projection에 포함되면 **covered query**가 가능합니다.
    - covered query란 **index만으로 필요한 data를 모두 제공하는 query**를 의미합니다.
    - document를 읽을 필요 없이 index만으로 query를 처리합니다.


---


## Compound Index vs 단일 Index

- compound index와 여러 개의 단일 index의 차이를 비교합니다.


### 성능 비교

```js
// 단일 index 두 개
db.orders.createIndex({ customerId: 1 });
db.orders.createIndex({ status: 1 });

// query 실행 - 하나의 index만 선택됨
db.orders.find({ customerId: "123", status: "completed" });
// customerId index로 찾은 후 status는 memory에서 filtering

// compound index 하나
db.orders.createIndex({ customerId: 1, status: 1 });

// query 실행 - 두 field 모두 index 활용
db.orders.find({ customerId: "123", status: "completed" });
// customerId와 status 모두 index로 탐색
```

- compound index는 **두 field의 조건을 모두 index에서 처리**합니다.
    - 단일 index는 하나만 사용되고 나머지는 memory에서 처리됩니다.


### 저장 공간

```js
// 단일 index 두 개 : 각각 저장 공간 사용
db.orders.createIndex({ customerId: 1 });
db.orders.createIndex({ status: 1 });

// compound index 하나 : 더 효율적인 저장
db.orders.createIndex({ customerId: 1, status: 1 });
```

- compound index가 **여러 단일 index보다 저장 공간을 절약**할 수 있습니다.
    - 하지만 동일한 field를 여러 index에서 중복으로 처리하면 저장 공간이 증가합니다.


---


## Compound Index 성능 최적화

- compound index를 효율적으로 사용하기 위한 전략이 있습니다.
    - **field 선택과 정렬 방향 설계가 성능을 크게 좌우**하므로, 신중히 결정해야 합니다.


### 자주 사용되는 Query 분석

```js
// 자주 실행되는 query pattern
db.products.find({ category: "electronics", price: { $lt: 100 } });
db.products.find({ category: "electronics", popularity: -1 });
db.products.find({ category: "electronics", inStock: true });

// 이 pattern들을 모두 지원하려면
db.products.createIndex({ category: 1, inStock: 1, price: 1, popularity: -1 });
```

- 자주 사용되는 query pattern을 파악한 후 field 순서를 결정해야 합니다.


### Write Performance 고려

```js
// compound index가 많으면 write 성능 저하
db.users.createIndex({ email: 1 });
db.users.createIndex({ username: 1 });
db.users.createIndex({ status: 1, createdAt: -1 });
db.users.createIndex({ email: 1, status: 1 });
// ... 더 많은 index

// document 삽입 시 모든 index를 update해야 함
db.users.insertOne({ email: "test@example.com", username: "test", status: "active", createdAt: new Date() });
```

- 너무 많은 compound index는 **write operation을 느리게** 만듭니다.
    - 필요한 query pattern만 선택적으로 index를 생성해야 합니다.


### Index Size Monitoring

```js
// index 크기 확인
db.users.stats().indexSizes;

// 사용되지 않는 index 제거
db.users.dropIndex({ email: 1, status: 1 });
```

- 자주 사용되지 않는 compound index는 제거하여 저장 공간과 write 성능을 개선합니다.


---


## Compound Index 제약 사항

- compound index는 여러 제약 사항을 고려하여 설계해야 합니다.


### Field 순서의 중요성

- **field 순서가 다르면 다른 index**로 취급됩니다.

```js
// 서로 다른 index
db.users.createIndex({ status: 1, age: 1 });
db.users.createIndex({ age: 1, status: 1 });

// 첫 번째 query는 첫 번째 index 사용
db.users.find({ status: "active" });

// 두 번째 query는 두 번째 index 사용
db.users.find({ age: 25 });

// 역순 정렬이 필요한 경우
db.users.find({ status: "active" }).sort({ age: -1 });
// age가 descending인 index를 따로 생성해야 함
```

- query pattern을 신중히 분석하여 field 순서를 결정해야 합니다.


### Sort 방향 제약

```js
// index
db.users.createIndex({ status: 1, age: 1 });

// 일치 : index 방향과 query 정렬 일치
db.users.find({ status: "active" }).sort({ age: 1 });
// → status로 filtering (index 사용) + age 정렬 (index에 이미 정렬됨)

// 불일치 : index 방향과 query 정렬 역순
db.users.find({ status: "active" }).sort({ age: -1 });
// → status로 filtering (index 사용) + age 역순 정렬 (memory에서 재정렬 필요)
```

- index는 **filtering에는 사용**되지만, **정렬 방향이 다르면 in-memory sort가 발생**합니다.
    - 정렬 방향이 일치할 때만 index에서 이미 정렬된 순서를 활용할 수 있습니다.


### 범위 검색 후 정렬

```js
// 나쁜 설계 : 범위 검색이 정렬 field 앞에 위치
db.orders.createIndex({ status: 1, amount: 1, date: -1 });
db.orders.find({
    status: "completed",
    amount: { $gte: 100 }
}).sort({ date: -1 });
// status로 filtering → amount 범위 검색 → date로 memory에서 정렬 필요
// amount 범위 이후로 index의 date 정렬 순서를 활용할 수 없음

// 좋은 설계 : ESR rule 적용 (Equality → Sort → Range)
db.orders.createIndex({ status: 1, date: -1, amount: 1 });
db.orders.find({
    status: "completed",
    amount: { $gte: 100 }
}).sort({ date: -1 });
// status로 filtering (Equality) → date로 정렬 (Sort, index에 이미 정렬됨) → amount 범위 (Range)
// 모든 작업을 index에서 처리
```

- **범위 검색과 정렬이 함께 있을 때는 ESR rule을 반드시 따라야 합니다.**
    - 범위 검색(range)을 정렬(sort) field 뒤에 배치하면, index의 정렬된 순서를 활용할 수 있습니다.
    - 만약 범위 검색이 정렬 field 앞에 오면, 범위 검색 이후 memory에서 정렬이 발생합니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/index-compound/>
- <https://www.mongodb.com/docs/manual/tutorial/sort-results-with-indexes/>
- <https://www.mongodb.com/docs/manual/core/query-optimization/>

