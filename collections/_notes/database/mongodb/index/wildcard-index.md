---
layout: note
permalink: /390
title: MongoDB Wildcard Index - 동적 Field를 위한 유연한 색인
description: Wildcard Index는 미리 알 수 없는 field나 nested document의 모든 field를 자동으로 indexing합니다.
date: 2025-10-30
---


## Wildcard Index : 동적 Field를 자동으로 Indexing

- **wildcard index**는 document의 모든 field 또는 특정 경로의 모든 하위 field를 자동으로 indexing합니다.
    - field 이름을 미리 알 수 없거나 자주 변경되는 schema에 유용합니다.

- MongoDB 4.2 version부터 지원되는 기능입니다.
    - 동적 schema와 nested document를 다루는 현대적인 application에 최적화되어 있습니다.

- wildcard index는 `$**` 기호를 사용하여 생성합니다.


---


## Wildcard Index의 필요성

- 전통적인 index는 명시적으로 지정한 field에만 작동하지만, wildcard index는 동적 field를 자동으로 처리합니다.


### 동적 Schema 지원

- document마다 다른 field를 가지는 경우 모든 가능한 field에 대해 개별 index를 만들 수 없습니다.
    - wildcard index는 모든 field를 자동으로 indexing합니다.

```js
// 각 사용자가 다른 custom field를 가지는 경우
{
    userId: 1,
    name: "Alice",
    customFields: {
        department: "Engineering",
        location: "Seoul"
    }
}

{
    userId: 2,
    name: "Bob",
    customFields: {
        team: "Sales",
        region: "Asia"
    }
}

// customFields의 모든 하위 field를 indexing
db.users.createIndex({ "customFields.$**": 1 });
```


### Nested Document 처리

- 깊게 중첩된 document의 모든 field를 검색해야 하는 경우 유용합니다.
    - 각 nested field마다 index를 만드는 대신 wildcard index 하나로 처리할 수 있습니다.

```js
// 복잡한 nested structure
{
    product: "Laptop",
    specs: {
        processor: {
            brand: "Intel",
            model: "i7",
            cores: 8
        },
        memory: {
            size: 16,
            type: "DDR4"
        }
    }
}

// specs의 모든 nested field를 자동으로 indexing
db.products.createIndex({ "specs.$**": 1 });
```


### 빠른 개발과 Prototype

- schema가 아직 확정되지 않은 개발 초기 단계에서 유용합니다.
    - field를 추가할 때마다 index를 만들 필요가 없습니다.

- product와 user research를 위한 빠른 prototype 개발에 적합합니다.


---


## Wildcard Index 생성

- wildcard index는 다양한 방식으로 생성할 수 있습니다.


### 전체 Document에 대한 Wildcard Index

```js
// 모든 field를 indexing (_id 제외)
db.collection.createIndex({ "$**": 1 });
```

- collection의 모든 field가 자동으로 index에 포함됩니다.
    - 새로운 field가 추가되어도 별도 작업 없이 index가 적용됩니다.

- 매우 유연하지만 저장 공간을 많이 사용할 수 있습니다.


### 특정 경로에 대한 Wildcard Index

```js
// attributes의 모든 하위 field를 indexing
db.products.createIndex({ "attributes.$**": 1 });

// address의 모든 nested field를 indexing
db.customers.createIndex({ "address.$**": 1 });
```

- 특정 경로 아래의 모든 field만 indexing하여 저장 공간을 절약합니다.


### Array 내부의 Wildcard Index

```js
// tags array의 각 요소 내부 field를 모두 indexing
db.articles.createIndex({ "tags.$**": 1 });
```

```js
// document 예시
{
    title: "MongoDB Guide",
    tags: [
        { category: "database", priority: "high" },
        { category: "nosql", priority: "medium" }
    ]
}

// 검색 가능
db.articles.find({ "tags.category": "database" });
db.articles.find({ "tags.priority": "high" });
```

- array의 각 요소가 object인 경우, 내부의 모든 field가 자동으로 indexing됩니다.


---


## Wildcard Index 옵션

- wildcard index 생성 시 포함하거나 제외할 field를 지정할 수 있습니다.


### wildcardProjection으로 Field 선택

```js
// 특정 field만 포함
db.collection.createIndex(
    { "$**": 1 },
    {
        wildcardProjection: {
            fieldA: 1,
            fieldB: 1
        }
    }
);

// 특정 field만 제외
db.collection.createIndex(
    { "$**": 1 },
    {
        wildcardProjection: {
            sensitiveField: 0,
            temporaryField: 0
        }
    }
);
```

- `1`은 포함, `0`은 제외를 의미합니다.
    - 포함과 제외를 동시에 사용할 수 없습니다.


### Nested Field 선택

```js
// user.profile의 모든 field는 포함하되, user.credentials는 제외
db.users.createIndex(
    { "$**": 1 },
    {
        wildcardProjection: {
            "user.profile": 1,
            "user.credentials": 0
        }
    }
);
```

- nested field의 경로를 dot notation으로 지정합니다.


---


## Wildcard Index 사용

- wildcard index는 일반 index와 동일하게 query에서 자동으로 사용됩니다.


### 단일 Field Query

```js
// wildcard index 생성
db.products.createIndex({ "attributes.$**": 1 });

// 자동으로 index 사용
db.products.find({ "attributes.color": "red" });
db.products.find({ "attributes.size": "large" });
db.products.find({ "attributes.brand.name": "Apple" });
```

- field 이름이 무엇이든 wildcard index가 자동으로 적용됩니다.


### Query 제약사항

- wildcard index는 하나의 query에서 하나의 field만 사용할 수 있습니다.

```js
// wildcard index 사용됨 (단일 field)
db.products.find({ "attributes.color": "red" });

// wildcard index 사용 안 됨 (여러 wildcard field)
db.products.find({
    "attributes.color": "red",
    "attributes.size": "large"
});
```

- 여러 field를 함께 검색하는 경우 compound index를 사용해야 합니다.


### Compound Wildcard Index 불가

- wildcard index는 다른 field와 compound index를 만들 수 없습니다.

```js
// 불가능
db.collection.createIndex({ category: 1, "attributes.$**": 1 });
```

- wildcard index는 항상 단독으로 생성해야 합니다.


---


## Wildcard Index vs 일반 Index

- wildcard index와 일반 index를 비교하여 적절한 선택을 할 수 있습니다.


### 장점

- **유연성** : field를 미리 알 필요가 없습니다.
    - 동적 schema에 자동으로 대응합니다.

- **유지 보수 감소** : field가 추가되어도 index를 수동으로 관리할 필요가 없습니다.

- **빠른 개발** : schema 설계 초기 단계에서 빠르게 prototype을 만들 수 있습니다.


### 단점

- **저장 공간** : 모든 field가 indexing되므로 저장 공간이 많이 필요합니다.

- **Write 성능** : 여러 field가 index에 포함되어 insert/update 성능이 저하될 수 있습니다.

- **Query 제약** : 여러 wildcard field를 동시에 사용하는 compound query를 지원하지 않습니다.

- **정렬 제약** : wildcard index는 정렬 작업에 사용될 수 없습니다.


### 선택 기준

| 상황 | 권장 Index |
| --- | --- |
| field가 사전에 정의되고 고정됨 | 일반 Index |
| schema가 동적이거나 자주 변경됨 | Wildcard Index |
| 여러 field를 함께 검색함 | Compound Index |
| 특정 field만 검색함 | Single Field Index |
| 모든 field를 유연하게 검색함 | Wildcard Index |


---


## Wildcard Index 활용 사례

- wildcard index는 특정 use case에서 매우 효과적입니다.


### 사용자 정의 속성 (Custom Attributes)

```js
// 각 상품마다 다른 속성을 가지는 e-commerce
{
    productId: "P001",
    name: "Smartphone",
    customAttrs: {
        screenSize: "6.5 inch",
        battery: "4000mAh",
        camera: "48MP"
    }
}

{
    productId: "P002",
    name: "Book",
    customAttrs: {
        author: "John Doe",
        pages: 350,
        publisher: "ABC Press"
    }
}

// 모든 custom attribute 검색 가능
db.products.createIndex({ "customAttrs.$**": 1 });
```

- 상품 category마다 완전히 다른 속성을 가지는 경우에 적합합니다.


### IoT Sensor Data

```js
// 각 sensor가 다른 측정값을 전송하는 경우
{
    sensorId: "S001",
    timestamp: ISODate("2025-10-30"),
    readings: {
        temperature: 25.5,
        humidity: 60,
        pressure: 1013
    }
}

{
    sensorId: "S002",
    timestamp: ISODate("2025-10-30"),
    readings: {
        vibration: 0.05,
        noise: 45,
        rotation: 1200
    }
}

// 모든 sensor reading을 검색 가능
db.sensorData.createIndex({ "readings.$**": 1 });
```

- sensor 종류마다 다른 측정값을 가지는 IoT system에 유용합니다.


### Multi-tenant Application

```js
// tenant마다 다른 설정을 가지는 경우
{
    tenantId: "T001",
    settings: {
        theme: "dark",
        language: "ko",
        notifications: true
    }
}

{
    tenantId: "T002",
    settings: {
        currency: "USD",
        timezone: "EST",
        dateFormat: "MM/DD/YYYY"
    }
}

// 모든 setting을 검색 가능
db.tenants.createIndex({ "settings.$**": 1 });
```

- tenant마다 완전히 다른 설정 항목을 가지는 SaaS application에 적합합니다.


### Metadata와 Tag

```js
// 자유로운 metadata를 가지는 file system
{
    fileId: "F001",
    name: "report.pdf",
    metadata: {
        author: "Alice",
        department: "Sales",
        quarter: "Q4"
    }
}

// metadata의 모든 field를 검색 가능
db.files.createIndex({ "metadata.$**": 1 });
```

- 사용자가 자유롭게 정의하는 metadata나 tag system에 유용합니다.


---


## Wildcard Index 성능 최적화

- wildcard index를 효율적으로 사용하기 위한 전략이 있습니다.


### wildcardProjection 활용

```js
// 자주 검색하는 field만 포함
db.products.createIndex(
    { "attributes.$**": 1 },
    {
        wildcardProjection: {
            "attributes.color": 1,
            "attributes.size": 1,
            "attributes.brand": 1
        }
    }
);
```

- 모든 field를 indexing하는 대신 실제로 검색에 사용되는 field만 선택합니다.
    - 저장 공간과 write 성능을 크게 개선할 수 있습니다.


### 경로 제한

```js
// 전체 document 대신 특정 경로만 indexing
db.collection.createIndex({ "specificPath.$**": 1 });
```

- 가능한 한 구체적인 경로를 지정하여 index 크기를 줄입니다.


### Query Pattern 분석

```js
// 실제 query pattern을 분석하여 wildcard index 필요성 판단
db.system.profile.find({ ns: "mydb.products" }).pretty();
```

- wildcard index가 정말 필요한지 확인합니다.
    - 고정된 field만 검색한다면 일반 index가 더 효율적입니다.


### 일반 Index와 병행

```js
// 자주 검색하는 field는 별도 index 생성
db.products.createIndex({ "attributes.brand": 1, "attributes.model": 1 });

// 나머지 동적 field는 wildcard index 사용
db.products.createIndex({ "attributes.$**": 1 });
```

- 성능이 중요한 query는 일반 index를 사용하고, 동적 field 검색만 wildcard index를 사용합니다.


---


## Wildcard Index 제약 사항

- wildcard index는 특정 제약사항이 있습니다.


### Compound Index 불가

- wildcard index는 다른 field와 compound index를 만들 수 없습니다.
    - 여러 field를 함께 검색하는 경우 별도의 compound index를 생성해야 합니다.


### 정렬 지원 안 됨

- wildcard index는 `sort()` operation에 사용될 수 없습니다.

```js
// 정렬을 위한 별도 index 필요
db.products.createIndex({ "attributes.price": 1 });
db.products.find({ "attributes.color": "red" }).sort({ "attributes.price": 1 });
```


### Text Index, Geospatial Index와 혼용 불가

- wildcard index는 text index나 geospatial index와 결합할 수 없습니다.


### Shard Key 제약

- wildcard index는 shard key로 사용할 수 없습니다.
    - sharded collection에서는 명시적인 shard key가 필요합니다.


### _id Field 포함 안 됨

- wildcard index는 `_id` field를 자동으로 포함하지 않습니다.
    - `_id`는 이미 기본 index가 있으므로 중복이 필요 없습니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/index-wildcard/>
- <https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/>
- <https://www.mongodb.com/blog/post/coming-in-mongodb-4-2-wildcard-indexes>

