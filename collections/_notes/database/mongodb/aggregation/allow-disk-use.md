---
layout: note
permalink: /281
title: MongoDB allowDiskUse Option - Memory 제한 극복하기
description: allowDiskUse option은 aggregation과 sort 작업에서 memory 제한을 초과할 때 disk를 활용하여 대용량 data를 처리하는 option입니다.
date: 2025-12-16
---


## `allowDiskUse` Option

- `allowDiskUse`는 MongoDB가 memory 제한을 초과하는 작업에서 임시 file을 disk에 작성할 수 있도록 허용하는 option입니다.
    - aggregation pipeline, sort, group 등의 작업에서 사용합니다.

- MongoDB는 기본적으로 단일 aggregation pipeline stage에서 최대 100MB의 RAM만 사용할 수 있습니다.
    - 제한을 초과하면 `exceeded memory limit` error가 발생합니다.

- `allowDiskUse: true`를 설정하면 memory 한계를 초과할 때 임시 directory에 data를 저장하여 작업을 계속 진행합니다.


---


## Memory 제한과 필요성

- MongoDB는 각 aggregation stage에서 100MB memory 제한을 두어 server 자원을 보호하지만, 대량 document 처리 시 쉽게 제한에 도달합니다.

- memory 제한을 초과하면 `Exceeded memory limit for $group, but didn't allow external sort. Pass allowDiskUse:true to opt in.` error가 발생합니다.

```
Error: Exceeded memory limit for $group, but didn't allow external sort.
Pass allowDiskUse:true to opt in.
```

- 수백만 건의 document를 날짜순으로 정렬할 때, 대량 data를 category별로 grouping하고 집계할 때, 복잡한 `$lookup`으로 여러 collection을 join할 때 memory 제한에 자주 도달합니다.


---


## 적용 대상 작업

- `allowDiskUse`는 aggregation pipeline의 `$sort`, `$group`, `$bucket` stage와 `find().sort()` 조합에서 사용하며, 각 작업마다 설정 방식이 다릅니다.


### Aggregation Pipeline

- aggregation의 `$sort`, `$group`, `$bucket` 등의 stage에서 memory를 많이 사용합니다.

```js
db.sales.aggregate(
    [
        { $group: {
            _id: "$customerId",
            totalAmount: { $sum: "$amount" },
            orders: { $push: "$$ROOT" }
        }},
        { $sort: { totalAmount: -1 } }
    ],
    { allowDiskUse: true }
)
```

- `$group`에서 accumulator로 `$push`나 `$addToSet`을 사용하면 각 group에 모든 document를 array로 저장하기 때문에 memory 사용량이 급격히 증가합니다.


### Sort 작업

- `find()`와 `sort()`를 함께 사용할 때도 `allowDiskUse`를 지정할 수 있습니다.

```js
db.orders.find({ status: "completed" })
    .sort({ orderDate: -1 })
    .allowDiskUse()
```

- sort 작업은 index를 사용하지 못할 때 in-memory sort를 수행하므로 memory를 많이 소비합니다.


### Memory 사용량이 큰 Stage

- `$group` : grouping key의 cardinality가 높고 accumulator가 복잡할수록 memory를 많이 사용합니다.
- `$sort` : index를 활용하지 못하면 전체 dataset을 memory에 load하여 정렬합니다.
- `$bucket` : 범위별 grouping 시 많은 bucket이 생성되면 memory 사용량이 증가합니다.
- `$lookup` : join하는 document 수가 많으면 memory를 크게 차지합니다.


---


## 사용 방법

- aggregation과 find 작업에서 각각 다른 방식으로 `allowDiskUse`를 설정합니다.


### Aggregation에서 사용

- `aggregate()` method의 두 번째 인자로 option object를 전달합니다.

```js
db.collection.aggregate(
    [ /* pipeline stages */ ],
    { allowDiskUse: true }
)
```


### 실제 예시

```js
db.products.aggregate(
    [
        { $match: { category: "electronics" } },
        { $group: {
            _id: "$brand",
            models: { $push: "$model" },
            avgPrice: { $avg: "$price" },
            totalSold: { $sum: "$quantitySold" }
        }},
        { $sort: { totalSold: -1 } }
    ],
    { allowDiskUse: true }
)
```

- `$push`로 모든 model을 array에 저장하므로 memory 사용량이 높습니다.


### Find와 Sort에서 사용

- `find()` 후 `allowDiskUse()` method를 chain합니다.

```js
db.logs.find({ level: "error" })
    .sort({ timestamp: -1 })
    .allowDiskUse()
```

- cursor modifier 방식으로도 설정 가능합니다.

```js
db.logs.find({ level: "error" })
    .sort({ timestamp: -1 })
    .addOption(DBQuery.Option.allowDiskUse)
```


---


## 성능 영향

- `allowDiskUse`는 memory 부족 문제를 해결하지만 disk I/O로 인해 성능이 크게 저하되므로, production 환경에서는 신중하게 사용해야 합니다.


### Disk I/O 비용

- memory 접근 속도는 nanosecond 단위이지만 disk I/O는 millisecond 단위로, 약 100,000배 이상의 속도 차이가 발생합니다.

- SSD를 사용하더라도 memory보다 훨씬 느리므로 가능하면 memory 내에서 작업을 완료해야 합니다.


### 성능 비교 예시

- 1,000만 건의 document를 sort하는 경우, memory 내 sort는 5-10초가 걸리지만 `allowDiskUse: true` 사용 시 2-5분이 소요됩니다.

- 실제 성능은 document 크기, disk 속도, system 부하에 따라 달라집니다.


### 사용 시기

- 다른 최적화 방법을 모두 시도했지만 memory error가 발생하거나, 일회성 batch 작업이나 reporting 작업처럼 성능보다 완료가 중요할 때만 `allowDiskUse`를 사용합니다.
    - production 실시간 query에서는 가능한 한 피해야 합니다.


---


## 최적화 방법과 대안

- `allowDiskUse` 사용 전에 index 생성, pipeline 순서 최적화, field 선택, data 분할 처리 등의 방법을 먼저 시도해야 합니다.


### Index 활용

- sort에 사용되는 field에 index를 생성하면 in-memory sort를 피할 수 있습니다.

```js
// index 생성
db.orders.createIndex({ orderDate: -1 })

// index를 활용한 sort (memory 사용 최소화)
db.orders.find({ status: "completed" })
    .sort({ orderDate: -1 })
```

- index를 사용하면 이미 정렬된 순서로 document를 읽으므로 별도 sort 작업이 불필요합니다.


### Pipeline 순서 최적화

- `$match`를 최대한 앞에 배치하여 처리할 document 수를 줄입니다.

```js
// 좋은 예 : match를 먼저 수행
db.sales.aggregate([
    { $match: { year: 2025 } },  // 먼저 filtering
    { $group: { _id: "$product", total: { $sum: "$amount" } }}
])

// 나쁜 예 : group을 먼저 수행
db.sales.aggregate([
    { $group: { _id: "$product", total: { $sum: "$amount" } }},
    { $match: { year: 2025 } }  // 늦은 filtering
])
```


### 필요한 Field만 선택

- `$project`로 필요한 field만 남겨 memory 사용량을 줄입니다.

```js
db.orders.aggregate([
    { $match: { status: "completed" } },
    { $project: { _id: 0, product: 1, amount: 1 }},  // 필요한 field만
    { $group: { _id: "$product", total: { $sum: "$amount" } }}
])
```


### Data 분할 처리

- 대량 data는 날짜나 category별로 나누어 처리합니다.

```js
// 월별로 나누어 처리
for (let month = 1; month <= 12; month++) {
    db.sales.aggregate([
        { $match: {
            date: {
                $gte: new Date(2025, month-1, 1),
                $lt: new Date(2025, month, 1)
            }
        }},
        { $group: { _id: "$product", total: { $sum: "$amount" } }},
        { $out: `sales_2025_${month}` }
    ])
}
```


### Compound Index 활용

- sort와 filter를 동시에 수행할 때는 compound index를 생성합니다.

```js
// compound index 생성
db.orders.createIndex({ status: 1, orderDate: -1 })

// index를 완전히 활용
db.orders.find({ status: "completed" })
    .sort({ orderDate: -1 })
```


---


## 주의 사항

- `allowDiskUse` 사용 시 disk 공간 확보, cloud 환경 제약, 동시 실행 제한, 임시 file 관리 등의 여러 제약 사항을 고려해야 합니다.


### Disk 공간 확보

- 임시 file이 저장될 충분한 disk 공간이 필요하며, 처리하는 data 크기의 2-3배 여유 공간을 확보해야 합니다.

- MongoDB는 기본적으로 `dbPath/_tmp` directory에 임시 file을 저장합니다.


### Cloud 환경 제약

- MongoDB Atlas에서는 `allowDiskUse`가 기본적으로 활성화되어 있지만, M0, M2, M5 무료/공유 tier에서는 disk 사용량에 제한이 있습니다.

- AWS DocumentDB 등 일부 managed service는 `allowDiskUse`를 지원하지 않거나 제한합니다.


### 동시 실행 제한

- 여러 작업이 동시에 `allowDiskUse`를 사용하면 disk I/O 경합이 발생하여 system 전체 성능이 크게 저하될 수 있습니다.

- production 환경에서는 동시 실행 수를 제한해야 합니다.


### 임시 File 관리

- MongoDB는 작업 완료 후 임시 file을 자동으로 삭제하지만 비정상 종료 시 임시 file이 남을 수 있습니다.

- `_tmp` directory를 주기적으로 monitoring하고 정리해야 합니다.


### Index가 더 나은 선택

- 대부분의 경우 `allowDiskUse`보다 적절한 index를 생성하는 것이 훨씬 효과적입니다.
    - index는 한 번 생성하면 지속적으로 성능을 향상시킵니다.
    - `allowDiskUse`는 임시 방편일 뿐 근본적인 해결책이 아닙니다.


---


## 실전 활용 예시

- 1억 건의 log에서 IP별 통계를 추출하거나 전체 판매 data에서 제품별 상세 통계를 생성할 때 `allowDiskUse`가 필요하지만, 불필요한 data 저장을 제거하면 `allowDiskUse` 없이도 처리할 수 있습니다.


### 대량 Log 분석

```js
// 1억 건의 log에서 IP별 요청 통계
db.logs.aggregate(
    [
        { $match: {
            timestamp: {
                $gte: ISODate("2025-01-01"),
                $lt: ISODate("2025-02-01")
            }
        }},
        { $group: {
            _id: "$ip",
            totalRequests: { $sum: 1 },
            uniqueUrls: { $addToSet: "$url" },
            avgResponseTime: { $avg: "$responseTime" }
        }},
        { $sort: { totalRequests: -1 } },
        { $limit: 1000 }
    ],
    { allowDiskUse: true }
)
```

- `$addToSet`으로 unique URL을 수집하므로 memory 사용량이 높습니다.


### 월간 매출 Report

```js
// 전체 판매 data에서 제품별 상세 통계
db.sales.aggregate(
    [
        { $group: {
            _id: "$productId",
            totalRevenue: { $sum: "$amount" },
            totalQuantity: { $sum: "$quantity" },
            orders: { $push: {
                orderId: "$orderId",
                date: "$date",
                amount: "$amount"
            }},
            uniqueCustomers: { $addToSet: "$customerId" }
        }},
        { $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo"
        }},
        { $unwind: "$productInfo" },
        { $sort: { totalRevenue: -1 } },
        { $out: "monthly_sales_report" }
    ],
    { allowDiskUse: true }
)
```

- 모든 order 정보를 `$push`로 저장하고 `$lookup`까지 수행하므로 memory 제한에 걸립니다.


### 개선된 Version

```js
// orders 정보를 저장하지 않고 필요한 통계만 계산
db.sales.aggregate(
    [
        { $group: {
            _id: "$productId",
            totalRevenue: { $sum: "$amount" },
            totalQuantity: { $sum: "$quantity" },
            orderCount: { $sum: 1 },
            uniqueCustomers: { $addToSet: "$customerId" },
            avgOrderValue: { $avg: "$amount" }
        }},
        { $addFields: {
            uniqueCustomerCount: { $size: "$uniqueCustomers" }
        }},
        { $project: { uniqueCustomers: 0 }},  // array 제거
        { $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo"
        }},
        { $unwind: "$productInfo" },
        { $sort: { totalRevenue: -1 } }
    ]
)
```

- 개별 order를 저장하지 않고 집계 값만 계산하여 memory 사용량을 크게 줄입니다.
- `allowDiskUse` 없이도 처리 가능하며 훨씬 빠릅니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/reference/command/aggregate/>
- <https://www.mongodb.com/docs/manual/core/aggregation-pipeline-limits/>
- <https://www.mongodb.com/docs/manual/reference/method/cursor.allowDiskUse/>

