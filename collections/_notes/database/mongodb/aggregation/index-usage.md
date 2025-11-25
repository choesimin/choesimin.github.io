---
layout: note
permalink: /275
title: MongoDB - Aggregation Pipeline에서 Index 활용하기
description: aggregation pipeline에서는 초기 stage만 index를 활용하므로, index를 사용하는 stage를 앞쪽에 배치하여 성능을 최적화합니다.
date: 2025-11-25
---


## Aggregation Pipeline과 Index

- aggregation pipeline에서 index는 특정 stage에서만 활용되며, pipeline 구성 방식에 따라 성능이 크게 달라집니다.
    - `$match`, `$sort` 같은 초기 stage에서는 index를 활용할 수 있지만, `$group`, `$unwind` 이후에는 index를 사용할 수 없습니다.

- pipeline 최적화의 핵심은 index를 활용하는 stage를 가능한 한 앞쪽에 배치하는 것입니다.
    - 초기 단계에서 document 수를 줄이고 index를 활용하면 전체 pipeline 성능이 향상됩니다.


---


## Stage별 Index 활용 여부

- aggregation pipeline의 각 stage는 index 활용 가능 여부가 다르며, `$match`와 `$sort`는 pipeline 초기에 있을 때만 index를 사용합니다.


### Index를 활용하는 Stage

- pipeline 초기 단계에서 `$match`, `$sort`, `$geoNear` stage들은 index를 활용할 수 있습니다.

#### $match

- pipeline의 첫 번째 stage이거나 index를 사용하지 않는 stage 바로 다음에 오면 index를 활용합니다.
    - 일반적인 `find()` query와 동일하게 index를 사용합니다.

```js
// index 활용 (pipeline 첫 단계)
db.orders.aggregate([
    { $match: { status: "pending" } },  // index 사용
    { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
]);

// index 활용 안 됨 ($group 이후)
db.orders.aggregate([
    { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
    { $match: { total: { $gte: 1000 } } }  // index 사용 불가
]);
```

- `$match`를 가능한 한 pipeline 앞쪽에 배치해야 index를 활용할 수 있습니다.

#### $sort

- pipeline 초기에 위치하고 적절한 index가 있으면 index를 활용하여 정렬합니다.
    - memory 정렬 없이 index의 순서대로 document를 읽습니다.

```js
// index 활용
db.orders.aggregate([
    { $match: { status: "pending" } },
    { $sort: { createdAt: -1 } },  // index 사용 (status_1_createdAt_-1 index 있는 경우)
    { $limit: 10 }
]);

// index 활용 안 됨 ($group 이후)
db.orders.aggregate([
    { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } }  // memory 정렬
]);
```

- `$sort`가 `$group`, `$project` 등의 변환 stage 이후에 오면 index를 사용할 수 없습니다.

#### $geoNear

- geospatial index를 필수로 사용하는 stage입니다.
    - pipeline의 첫 번째 stage여야 합니다.

```js
db.places.aggregate([
    {
        $geoNear: {
            near: { type: "Point", coordinates: [127.0, 37.5] },
            distanceField: "distance",
            spherical: true
        }
    },
    { $limit: 10 }
]);
```

- `$geoNear`는 hint와 함께 사용할 수 없으며, 자동으로 적절한 geospatial index를 선택합니다.


### Index를 활용하지 않는 Stage

- `$group`, `$unwind`, `$project` 같은 변환 stage들은 index를 사용하지 않으며, 이들 이후의 stage도 index를 활용할 수 없습니다.

#### $group

- document를 grouping하고 집계하는 stage로, index를 사용하지 않습니다.
    - memory나 disk에서 grouping 작업을 수행합니다.

```js
db.orders.aggregate([
    { $match: { status: "pending" } },  // index 사용
    { $group: {  // index 사용 안 함
        _id: "$customerId",
        total: { $sum: "$amount" }
    }}
]);
```

- `$group` 이후의 stage는 grouping 결과에 대해 작동하므로 원본 collection의 index를 사용할 수 없습니다.

#### $unwind

- array field를 펼쳐서 개별 document로 만드는 stage로, index를 사용하지 않습니다.

```js
db.orders.aggregate([
    { $match: { status: "pending" } },  // index 사용
    { $unwind: "$items" },  // index 사용 안 함
    { $group: { _id: "$items.product", count: { $sum: 1 } } }
]);
```

#### $project

- field를 선택하거나 새로운 field를 생성하는 stage로, index를 사용하지 않습니다.

```js
db.orders.aggregate([
    { $match: { status: "pending" } },  // index 사용
    { $project: {  // index 사용 안 함
        customerId: 1,
        totalAmount: { $multiply: ["$quantity", "$price"] }
    }}
]);
```

#### $lookup

- 다른 collection과 join하는 stage로, 각 collection은 독립적으로 index를 사용합니다.
    - lookup 대상 collection의 조건에 맞는 index가 있으면 활용됩니다.

```js
db.orders.aggregate([
    { $match: { status: "pending" } },  // orders collection의 index 사용
    {
        $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",  // customers collection의 _id index 사용
            as: "customer"
        }
    }
]);
```

- `$lookup`의 성능은 대상 collection의 join field에 index가 있는지에 크게 영향받습니다.


---


## Pipeline 최적화 전략

- aggregation pipeline의 성능을 최적화하려면 index 활용, document 수 조기 감소, memory 사용 최소화를 고려하여 stage 순서를 조정해야 합니다.


### Index 활용 Stage를 앞쪽에 배치하기

- `$match`와 `$sort`를 pipeline 초기에 배치하여 index를 활용합니다.
    - 가능한 한 첫 번째 또는 두 번째 stage로 배치합니다.

```js
// 비효율적
db.orders.aggregate([
    { $project: { customerId: 1, amount: 1, status: 1 } },
    { $match: { status: "pending" } },  // index 사용 불가
    { $sort: { amount: -1 } }  // memory 정렬
]);

// 효율적
db.orders.aggregate([
    { $match: { status: "pending" } },  // index 사용
    { $sort: { amount: -1 } },  // index 사용 가능
    { $project: { customerId: 1, amount: 1 } }
]);
```


### Document 수를 조기에 감소시키기

- `$match`와 `$limit`를 사용하여 초기 단계에서 처리할 document 수를 줄입니다.
    - 이후 stage의 처리 부하가 감소합니다.

```js
db.orders.aggregate([
    { $match: { status: "pending", amount: { $gte: 1000 } } },  // 대량 감소
    { $sort: { createdAt: -1 } },
    { $limit: 100 },  // 추가 감소
    { $lookup: { from: "customers", ... } },  // 100개만 join
    { $group: { _id: "$customer.region", total: { $sum: "$amount" } } }
]);
```


### $match를 여러 단계에 배치하기

- `$match`는 여러 번 사용할 수 있으며, 각 단계마다 불필요한 document를 제거합니다.

```js
db.orders.aggregate([
    { $match: { status: "pending" } },  // 초기 filtering (index 사용)
    { $lookup: { from: "customers", ... } },
    { $match: { "customer.tier": "vip" } },  // join 후 추가 filtering
    { $group: { _id: "$product", total: { $sum: "$amount" } } },
    { $match: { total: { $gte: 10000 } } }  // 집계 후 filtering
]);
```


### Covered Query 활용하기

- `$project`를 사용하여 index만으로 필요한 field를 제공할 수 있으면 성능이 향상됩니다.

```js
// index : { status: 1, customerId: 1, amount: 1 }
db.orders.aggregate([
    { $match: { status: "pending" } },
    { $project: { customerId: 1, amount: 1, _id: 0 } },  // covered query
    { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
]);
```

- index에 포함된 field만 projection하면 실제 document를 읽지 않아도 됩니다.


### $sort + $limit 조합 최적화

- `$sort` 바로 다음에 `$limit`가 오면 MongoDB가 자동으로 최적화합니다.
    - 모든 document를 정렬하지 않고 top N만 유지합니다.

```js
db.orders.aggregate([
    { $match: { status: "pending" } },
    { $sort: { amount: -1 } },
    { $limit: 10 }  // top 10만 정렬
]);
```


---


## $lookup과 Index

- `$lookup`은 join 대상 collection에서 독립적으로 index를 사용하며, join field에 index가 있으면 성능이 크게 향상됩니다.


### $lookup의 기본 동작

- `$lookup`은 각 입력 document마다 대상 collection을 조회합니다.
    - `foreignField`에 index가 있으면 효율적으로 조회합니다.

```js
db.orders.aggregate([
    { $match: { status: "pending" } },
    {
        $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",  // _id는 자동으로 indexing
            as: "customer"
        }
    }
]);
```

- `foreignField`에 index가 없으면 매번 collection scan이 발생하여 매우 느립니다.


### $lookup 성능 최적화

- join 대상 field에 반드시 index를 생성합니다.

```js
// customers collection에 index 생성
db.customers.createIndex({ _id: 1 });  // 기본으로 존재
db.customers.createIndex({ email: 1 });

// $lookup에서 활용
db.orders.aggregate([
    {
        $lookup: {
            from: "customers",
            localField: "customerEmail",
            foreignField: "email",  // index 있음
            as: "customer"
        }
    }
]);
```


### Pipeline 형태의 $lookup

- pipeline 형태의 `$lookup`은 더 복잡한 조건을 지원하며, pipeline 내부에서도 index를 활용할 수 있습니다.

```js
db.orders.aggregate([
    {
        $lookup: {
            from: "customers",
            let: { customerId: "$customerId" },
            pipeline: [
                { $match: {  // customers collection의 index 사용 가능
                    $expr: { $eq: ["$_id", "$$customerId"] },
                    tier: "vip"
                }},
                { $project: { name: 1, email: 1 } }
            ],
            as: "customer"
        }
    }
]);
```

- `$match` stage가 pipeline 내부에서도 index를 활용합니다.


---


## $unionWith와 Index

- `$unionWith`는 여러 collection의 결과를 합치며, 각 collection은 독립적으로 자신의 index를 사용하지만, union 이후의 작업은 전체 결과를 대상으로 수행됩니다.


### $unionWith의 Index 동작

- main collection과 `$unionWith`로 합쳐지는 collection은 각각 독립적으로 index를 활용합니다.
    - 합쳐진 결과는 memory상의 document 집합이므로 index가 없습니다.

```js
// orders collection의 index 사용
db.orders.aggregate([
    { $match: { status: "pending" } },  // orders의 status index 사용
    {
        $unionWith: {
            coll: "archived_orders",
            pipeline: [
                { $match: { status: "pending" } }  // archived_orders의 status index 사용
            ]
        }
    },
    { $sort: { createdAt: -1 } }  // union 결과 정렬 (index 없음, memory 정렬)
]);
```

- union 이후의 `$sort`, `$match` 등은 결과 집합에 대해 작동하므로 index를 사용할 수 없습니다.


### Union 후 정렬의 실제 동작

- `$unionWith` 이후 `$sort`는 합쳐진 전체 결과를 대상으로 수행됩니다.

```js
// 실행 단계별 분석
db.payments.aggregate([
    { $match: { type: "card" } },  // 1. index 사용, 10,000건 추출
    {
        $unionWith: {
            coll: "payments",
            pipeline: [
                { $match: { type: "bank_transfer" } }  // 2. index 사용, 15,000건 추출
            ]
        }
    },
    // 3. 10,000 + 15,000 = 25,000건 병합
    { $sort: { createdAt: -1 } },  // 4. 25,000건 전체를 memory 정렬
    { $limit: 100 }  // 5. 상위 100개만 반환
]);
```

- 각 `$match`는 index를 활용하여 빠르게 document를 추출합니다.
- union은 단순히 두 결과를 붙이므로 빠릅니다.
- `$sort`는 병합된 25,000건 전체를 대상으로 정렬합니다.
    - index가 없으므로 memory 정렬이 발생합니다.
    - `$limit`와 함께 사용되므로 top-k algorithm으로 100개만 memory에 유지합니다.
    - 하지만 25,000건을 모두 비교하는 연산은 필요합니다.


### $sort + $skip + $limit 조합의 영향

- `$skip` 값이 클수록 처리해야 할 document 수가 증가합니다.

```js
db.payments.aggregate([
    { $match: { type: "card" } },  // 10,000건
    {
        $unionWith: {
            coll: "payments",
            pipeline: [
                { $match: { type: "bank_transfer" } }  // 15,000건
            ]
        }
    },
    // 25,000건 병합
    { $sort: { createdAt: -1 } },  // 25,000건 전체 정렬
    { $skip: 1000 },  // 1,000개 건너뛰기
    { $limit: 100 }  // 100개 반환
]);
```

- `$skip: 1000`, `$limit: 100`이면 상위 1,100개를 유지하면서 정렬합니다.
- 25,000건을 모두 비교하지만, memory에는 1,100개만 유지합니다.
- `$skip` 값이 클수록 memory 사용량이 증가합니다.


### $unionWith 성능 최적화 전략

- `$match`에서 최대한 document 수를 줄이는 것이 핵심입니다.

```js
// 비효율적 (전체 조회 후 filtering)
db.orders.aggregate([
    { $match: { status: "pending" } },  // 50,000건
    {
        $unionWith: {
            coll: "archived_orders",
            pipeline: [
                { $match: { status: "pending" } }  // 100,000건
            ]
        }
    },
    // 150,000건 정렬
    { $sort: { createdAt: -1 } },
    { $limit: 100 }
]);

// 효율적 (조기에 filtering)
db.orders.aggregate([
    { $match: {
        status: "pending",
        amount: { $gte: 1000 },  // 추가 조건
        createdAt: { $gte: new Date("2025-01-01") }  // 날짜 범위 제한
    }},  // 5,000건으로 감소
    {
        $unionWith: {
            coll: "archived_orders",
            pipeline: [
                { $match: {
                    status: "pending",
                    amount: { $gte: 1000 },
                    createdAt: { $gte: new Date("2025-01-01") }
                }}  // 8,000건으로 감소
            ]
        }
    },
    // 13,000건 정렬 (150,000건 대비 크게 감소)
    { $sort: { createdAt: -1 } },
    { $limit: 100 }
]);
```


### 각 Pipeline에서 미리 제한하는 방법

- 각 pipeline에서 미리 정렬하고 제한할 수 있지만, 결과가 부정확할 수 있습니다.

```js
db.orders.aggregate([
    { $match: { status: "pending" } },
    { $sort: { createdAt: -1 } },
    { $limit: 100 },  // 메인에서 100개만
    {
        $unionWith: {
            coll: "archived_orders",
            pipeline: [
                { $match: { status: "pending" } },
                { $sort: { createdAt: -1 } },
                { $limit: 100 }  // union 대상도 100개만
            ]
        }
    },
    // 200건만 정렬 (전체 대비 크게 감소)
    { $sort: { createdAt: -1 } },
    { $limit: 100 }
]);
```

- union 후 정렬 대상이 200건으로 줄어듭니다.
- 하지만 각 collection에서 100개씩 자른 후 합치므로, 실제 최신 100개가 아닐 수 있습니다.
    - 예를 들어, 실제 최신 100개가 모두 `orders`에 있다면 `archived_orders`의 100개는 불필요합니다.


### Application Level에서 병합

- 가장 정확하고 효율적인 방법은 application에서 병합하는 것입니다.

```js
// 각각 독립적으로 조회 (각각 index 활용)
const cardPayments = await db.payments.find({ type: "card", ... })
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

const bankTransfers = await db.payments.find({ type: "bank_transfer", ... })
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

// Application에서 merge sort (O(n) 시간)
const merged = mergeSortedArrays(cardPayments, bankTransfers, 100);
```

- 각 query는 index를 활용하여 최적화됩니다.
- 이미 정렬된 두 배열을 병합하는 것은 매우 빠릅니다.
- 정확한 상위 100개를 보장하려면 각각 충분히 많이 가져와야 합니다.


### Union 후에는 Index 최적화 불가

- `$unionWith` 이후에는 index를 활용한 모든 최적화 기법이 적용되지 않습니다.

```js
db.orders.aggregate([
    { $match: { status: "pending" } },  // index 사용
    { $project: { status: 1, amount: 1, _id: 0 } },  // covered query 가능
    {
        $unionWith: {
            coll: "archived_orders",
            pipeline: [
                { $match: { status: "pending" } },  // index 사용
                { $project: { status: 1, amount: 1, _id: 0 } }  // covered query 가능
            ]
        }
    },
    // union 이후
    { $match: { amount: { $gte: 1000 } } },  // index 없음, memory filtering
    { $sort: { amount: -1 } },  // index 없음, memory 정렬
    { $project: { status: 1 } }  // covered query 불가, memory에서 직접 접근
]);
```

- union 이전 각 pipeline에서는 index 최적화가 가능합니다.
    - `$match`는 index 사용.
    - `$project`는 covered query 가능.
    - `$sort`는 index 활용 가능.

- union 이후에는 모든 작업이 memory상에서 수행됩니다.
    - `$match` : memory에서 filtering.
    - `$sort` : memory에서 정렬.
    - `$project` : covered query 불가, memory에서 field 접근.
    - `$limit`, `$skip` : memory에서 처리.


---


## Aggregation에서 Explain 사용

- `explain()` method를 사용하여 aggregation pipeline이 index를 제대로 활용하는지 확인합니다.


### Aggregation Explain 사용법

```js
db.orders.explain("executionStats").aggregate([
    { $match: { status: "pending" } },
    { $sort: { createdAt: -1 } },
    { $limit: 10 }
]);
```


### Explain 결과 확인 사항

- `stages` field에서 각 stage의 실행 계획을 확인합니다.

```js
{
    "stages": [
        {
            "$cursor": {
                "queryPlanner": {
                    "winningPlan": {
                        "stage": "LIMIT",
                        "inputStage": {
                            "stage": "FETCH",
                            "inputStage": {
                                "stage": "IXSCAN",  // index 사용
                                "indexName": "status_1_createdAt_-1"
                            }
                        }
                    }
                }
            }
        }
    ]
}
```

- `IXSCAN`이 나타나면 index를 사용하고, `COLLSCAN`이 나타나면 collection scan입니다.


### 성능 지표 확인

```js
{
    "executionStats": {
        "nReturned": 10,
        "executionTimeMillis": 5,
        "totalKeysExamined": 10,
        "totalDocsExamined": 10
    }
}
```

- `totalDocsExamined` / `nReturned` 비율이 낮을수록 효율적입니다.
- `executionTimeMillis`가 짧을수록 좋습니다.


---


## 실전 활용 사례

- 실무에서 자주 사용하는 aggregation pattern에서 index를 효과적으로 활용할 수 있는 여러 방법들이 있습니다.


### 시계열 Data 집계

```js
// 비효율적
db.logs.aggregate([
    { $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        count: { $sum: 1 }
    }},
    { $match: { _id: { $gte: "2025-01-01" } } }  // group 후 filtering
]);

// 효율적
db.logs.aggregate([
    { $match: {  // index 사용
        timestamp: {
            $gte: ISODate("2025-01-01"),
            $lt: ISODate("2026-01-01")
        }
    }},
    { $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        count: { $sum: 1 }
    }}
]);
```

- `timestamp` field에 index가 있으면 초기 filtering에서 활용됩니다.


### Top N Query

```js
db.products.aggregate([
    { $match: { category: "electronics", inStock: true } },  // index 사용
    { $sort: { salesCount: -1 } },  // index 사용 (category_1_salesCount_-1)
    { $limit: 10 },
    { $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "productId",  // reviews의 productId index 사용
        as: "reviews"
    }},
    { $project: {
        name: 1,
        price: 1,
        avgRating: { $avg: "$reviews.rating" }
    }}
]);
```

- compound index `{ category: 1, salesCount: -1 }`가 있으면 최적입니다.


### Hierarchical Data 조회

```js
db.comments.aggregate([
    { $match: { postId: ObjectId("...") } },  // postId index 사용
    { $sort: { createdAt: -1 } },  // postId_1_createdAt_-1 index 사용
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",  // users의 _id index 사용
            as: "author"
        }
    },
    { $unwind: "$author" },
    { $project: {
        content: 1,
        createdAt: 1,
        "author.name": 1,
        "author.avatar": 1
    }}
]);
```


### 복잡한 Filtering 후 집계

```js
db.sales.aggregate([
    { $match: {  // index 사용
        saleDate: { $gte: ISODate("2025-01-01") },
        status: "completed"
    }},
    { $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product"
    }},
    { $unwind: "$product" },
    { $match: { "product.category": "electronics" } },  // join 후 filtering
    { $group: {
        _id: "$product.brand",
        totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        totalSold: { $sum: "$quantity" }
    }},
    { $match: { totalRevenue: { $gte: 100000 } } },  // 집계 후 filtering
    { $sort: { totalRevenue: -1 } }
]);
```

- 각 단계에서 점진적으로 filtering하여 처리량을 줄입니다.


---


## 주의 사항

- aggregation pipeline에서 index를 활용할 때 주의해야 할 사항들입니다.


### Memory 제한

- 각 stage는 기본적으로 100MB memory 제한이 있습니다.
    - `$group`, `$sort` 등에서 대량 data를 처리하면 error가 발생할 수 있습니다.

```js
// error 발생 가능
db.orders.aggregate([
    { $group: { _id: "$customerId", orders: { $push: "$$ROOT" } } }
]);

// allowDiskUse 옵션 사용
db.orders.aggregate(
    [
        { $group: { _id: "$customerId", orders: { $push: "$$ROOT" } } }
    ],
    { allowDiskUse: true }
);
```

- `allowDiskUse: true` option을 사용하면 disk를 임시 저장소로 사용합니다.


### Index 선택 강제

- aggregation에서도 `hint`를 사용하여 특정 index를 강제할 수 있습니다.

```js
db.orders.aggregate(
    [
        { $match: { status: "pending", customerId: 12345 } },
        { $sort: { createdAt: -1 } }
    ],
    { hint: "status_1_customerId_1_createdAt_-1" }
);
```


### Pipeline 순서 자동 최적화

- MongoDB는 일부 stage의 순서를 자동으로 최적화합니다.
    - `$project` + `$match`를 `$match` + `$project`로 재배치하는 등의 최적화가 자동으로 이루어집니다.

- 그러나 명시적으로 최적의 순서로 작성하는 것이 더 명확합니다.


### Shard 환경에서의 고려 사항

- sharded collection에서는 각 shard가 독립적으로 aggregation을 수행합니다.
    - `$group`, `$sort` 등은 각 shard에서 실행된 후 결과를 병합합니다.
    - shard key에 맞는 index가 중요합니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/aggregation-pipeline/>
- <https://www.mongodb.com/docs/manual/core/aggregation-pipeline-optimization/>
- <https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/>
- <https://www.mongodb.com/docs/manual/reference/operator/aggregation/unionWith/>

