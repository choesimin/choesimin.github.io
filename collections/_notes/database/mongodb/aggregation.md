---
layout: note
permalink: /242
title: MongoDB Aggregation Framework - 강력한 Data 처리 Pipeline
description: Aggregation Framework는 MongoDB에서 복잡한 data 분석과 변환을 수행하는 강력한 도구입니다.
date: 2025-10-31
---


## Aggregation Framework

- **aggregation framework**는 MongoDB에서 data를 처리하고 분석하는 강력한 도구입니다.
    - 여러 단계의 pipeline을 통해 data를 변환하고 집계합니다.

- SQL의 `GROUP BY`, `JOIN`, `WHERE` 등의 기능을 제공하면서도 훨씬 유연합니다.
    - 복잡한 data 분석, 통계 계산, reporting 작업에 필수적입니다.

- aggregation은 `aggregate()` method를 사용하며, stage의 배열을 인자로 받습니다.


---


## Aggregation Pipeline 개념

- aggregation pipeline은 여러 stage를 순차적으로 거쳐 data를 처리하며, 각 stage는 입력 document를 받아 처리한 후 결과를 다음 stage로 전달합니다.

```js
db.collection.aggregate([
    { stage1 },
    { stage2 },
    { stage3 }
])
```

- 각 stage는 Unix의 pipe(`|`)와 유사하게 동작합니다.

```js
// 판매 data에서 제품별 총 판매액 계산
db.sales.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: "$product", totalSales: { $sum: "$amount" } }},
    { $sort: { totalSales: -1 } }
])
```


### Aggregation vs Find

- 단순 조회에는 `find()`를, 복잡한 집계와 변환에는 `aggregate()`를 사용합니다.

| 상황 | 권장 방법 |
| --- | --- |
| 단순 조회 | `find()` |
| filtering + 정렬 | `find()` |
| Grouping 필요 | `aggregate()` |
| 계산/통계 필요 | `aggregate()` |
| Join 필요 | `aggregate()` ($lookup) |
| 복잡한 변환 | `aggregate()` |


---


## 주요 Aggregation Stage

- aggregation pipeline은 `$match`(filtering), `$group`(집계), `$project`(field 선택), `$sort`(정렬), `$limit`/`$skip`(결과 제한), `$unwind`(array 펼치기), `$lookup`(join) 등의 핵심 stage로 구성됩니다.


### $match

```js
{ $match: { field: value } }
```

- SQL의 `WHERE`에 해당하며, 조건에 맞는 document만 다음 stage로 전달합니다.

```js
db.orders.aggregate([
    { $match: {
        orderDate: {
            $gte: ISODate("2025-01-01"),
            $lt: ISODate("2026-01-01")
        }
    }}
])
```

- `$match`는 가능한 한 pipeline 초반에 배치하여 index를 활용해야 합니다.


### $group

```js
{ $group: { _id: expression, field: { accumulator } } }
```

- SQL의 `GROUP BY`에 해당하며, document를 grouping하고 집계 함수를 적용합니다.

```js
db.products.aggregate([
    { $group: {
        _id: "$category",
        avgPrice: { $avg: "$price" },
        count: { $sum: 1 }
    }}
])
```

- 주요 accumulator로는 `$sum`, `$avg`, `$min`, `$max`, `$first`, `$last`, `$push`, `$addToSet`이 있습니다.
    - accumulator란 grouping된 document에 대해 계산을 수행하는 함수입니다.


### $project

```js
{ $project: { field: 1, newField: expression } }
```

- SQL의 `SELECT`에 해당하며, 특정 field를 선택하거나 새로운 field를 생성합니다.

```js
db.orders.aggregate([
    { $project: {
        _id: 0,
        orderNumber: 1,
        total: { $multiply: ["$quantity", "$price"] }
    }}
])
```


### $sort

```js
{ $sort: { field: 1 } }  // 1은 오름차순, -1은 내림차순
```

- document를 지정된 field 기준으로 정렬합니다.

```js
db.sales.aggregate([
    { $sort: { totalAmount: -1 } }
])
```


### $limit과 $skip

```js
{ $limit: number }
{ $skip: number }
```

- $limit는 출력 document 개수를 제한하고, $skip은 지정된 개수만큼 document를 건너뜁니다.

```js
// pagination 구현 (11번째부터 20번째까지)
db.products.aggregate([
    { $sort: { _id: 1 } },
    { $skip: 10 },
    { $limit: 10 }
])
```


### $unwind

```js
{ $unwind: "$arrayField" }
```

- array field의 각 요소를 별도의 document로 분리합니다.

```js
db.articles.aggregate([
    { $unwind: "$tags" }
])
// 입력: { _id: 1, title: "MongoDB", tags: ["database", "nosql"] }
// 출력: { _id: 1, title: "MongoDB", tags: "database" }
//       { _id: 1, title: "MongoDB", tags: "nosql" }
```


### $lookup

```js
{ $lookup: {
    from: "collection",
    localField: "field",
    foreignField: "field",
    as: "outputArray"
}}
```

- SQL의 `LEFT OUTER JOIN`에 해당하며, 다른 collection과 data를 결합합니다.

```js
db.orders.aggregate([
    { $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "customerInfo"
    }}
])
```


---


## 복합 Aggregation 예시

- 실무에서는 여러 stage를 조합하여 매출 통계 분석, 고객 분석, 제품 분포 분석 등의 복잡한 작업을 수행합니다.


### 매출 통계 분석

```js
db.sales.aggregate([
    { $match: {
        date: {
            $gte: ISODate("2025-01-01"),
            $lt: ISODate("2026-01-01")
        }
    }},
    { $group: {
        _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            product: "$productName"
        },
        totalRevenue: { $sum: "$amount" },
        totalQuantity: { $sum: "$quantity" },
        avgPrice: { $avg: "$price" }
    }},
    { $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        product: "$_id.product",
        totalRevenue: 1,
        totalQuantity: 1,
        avgPrice: { $round: ["$avgPrice", 2] }
    }},
    { $sort: { totalRevenue: -1 } }
])
```


### 상위 고객 분석

```js
db.orders.aggregate([
    { $match: { status: "completed" } },
    { $group: {
        _id: "$customerId",
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$amount" },
        avgOrderValue: { $avg: "$amount" }
    }},
    { $lookup: {
        from: "customers",
        localField: "_id",
        foreignField: "_id",
        as: "customer"
    }},
    { $unwind: "$customer" },
    { $project: {
        customerName: "$customer.name",
        customerEmail: "$customer.email",
        totalOrders: 1,
        totalSpent: 1,
        avgOrderValue: { $round: ["$avgOrderValue", 2] }
    }},
    { $sort: { totalSpent: -1 } },
    { $limit: 10 }
])
```


---


## 고급 Aggregation Stage

- 고급 stage로는 `$facet`(다중 pipeline 동시 실행), `$bucket`(범위별 grouping), `$addFields`(field 추가), `$out`(결과 저장) 등이 있습니다.


### $facet

```js
{ $facet: {
    pipeline1: [ stages ],
    pipeline2: [ stages ]
}}
```

- 하나의 입력에 대해 여러 aggregation pipeline을 동시에 실행합니다.

```js
db.products.aggregate([
    { $facet: {
        priceRanges: [
            { $bucket: {
                groupBy: "$price",
                boundaries: [0, 100, 500, 1000, 5000],
                default: "expensive",
                output: { count: { $sum: 1 } }
            }}
        ],
        categoryStats: [
            { $group: {
                _id: "$category",
                avgPrice: { $avg: "$price" }
            }}
        ]
    }}
])
```


### $bucket

```js
{ $bucket: {
    groupBy: "$field",
    boundaries: [0, 10, 20, 30],
    default: "other",
    output: { count: { $sum: 1 } }
}}
```

- 값의 범위에 따라 document를 grouping합니다.

```js
db.users.aggregate([
    { $bucket: {
        groupBy: "$age",
        boundaries: [0, 20, 30, 40, 50, 100],
        default: "unknown",
        output: {
            count: { $sum: 1 },
            users: { $push: "$name" }
        }
    }}
])
```


### $addFields

```js
{ $addFields: { newField: expression } }
```

- 기존 document에 새로운 field를 추가하며, `$project`와 달리 기존 field를 유지합니다.

```js
db.orders.aggregate([
    { $addFields: {
        totalPrice: { $multiply: ["$quantity", "$price"] },
        discountedPrice: {
            $multiply: ["$price", { $subtract: [1, "$discount"] }]
        }
    }}
])
```


### $out

```js
{ $out: "outputCollection" }
```

- aggregation 결과를 새로운 collection에 저장하며, 기존 collection이 있으면 덮어씁니다.

```js
db.sales.aggregate([
    { $group: {
        _id: { $month: "$date" },
        totalSales: { $sum: "$amount" }
    }},
    { $out: "monthlySalesStats" }
])
```


---


## Aggregation 성능 최적화

- aggregation 성능 향상을 위해 pipeline 순서 최적화, index 활용, field 제한, allowDiskUse option 사용 등의 전략을 적용해야 합니다.


### Pipeline 순서 최적화

- `$match`와 `$project`를 가능한 한 초반에 배치하여 처리할 document와 field 수를 줄입니다.

```js
// 좋은 예
db.orders.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: "$product", total: { $sum: "$amount" } }}
])

// 나쁜 예
db.orders.aggregate([
    { $group: { _id: "$product", total: { $sum: "$amount" } }},
    { $match: { status: "completed" } }
])
```


### Index 활용

- `$match`와 `$sort`는 pipeline 초반에 배치하여 index를 활용합니다.

```js
db.orders.aggregate([
    { $match: { orderDate: { $gte: ISODate("2025-01-01") } }},
    { $sort: { orderDate: -1 } }
])
```


### Field 제한

- 필요한 field만 선택하여 memory 사용량을 줄입니다.

```js
db.orders.aggregate([
    { $match: { status: "completed" } },
    { $project: { _id: 0, product: 1, amount: 1 }},
    { $group: { _id: "$product", total: { $sum: "$amount" } }}
])
```


### allowDiskUse Option

- memory 제한(100MB)을 초과하는 aggregation에는 disk 사용을 허용합니다.

```js
db.collection.aggregate(
    [ /* pipeline stages */ ],
    { allowDiskUse: true }
)
```


---


## Reference

- <https://www.mongodb.com/docs/manual/aggregation/>
- <https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/>
- <https://www.mongodb.com/docs/manual/core/aggregation-pipeline-optimization/>
