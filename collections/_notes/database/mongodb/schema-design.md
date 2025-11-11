---
layout: note
permalink: /246
title: MongoDB Schema Design - 효율적인 Data Modeling
description: MongoDB의 유연한 구조를 활용하여 application 요구 사항에 최적화된 data model을 설계할 수 있습니다.
date: 2025-10-31
---


## Schema Design : 유연한 Data Modeling

- **schema design**은 application의 요구 사항에 맞춰 data 구조를 설계하는 과정입니다.
    - MongoDB는 schema-less이지만, 효율적인 schema 설계가 성능에 큰 영향을 미칩니다.

- 관계형 database와 달리 MongoDB는 embedding과 referencing을 선택할 수 있습니다.
    - 설계 선택에 따라 성능, 확장성, 유지 보수성이 크게 달라집니다.

- MongoDB schema 설계의 핵심은 "어떻게 data를 조회할 것인가?"입니다.


---


## Embedding vs Referencing

- MongoDB에서 관계를 표현하는 두 가지 주요 방법으로 embedding(내장)과 referencing(참조)이 있습니다.


### Embedding (내장)

- 관련 data를 하나의 document에 포함하는 방식입니다.

```js
// user와 address를 하나의 document에 embedding
{
    _id: ObjectId("..."),
    name: "Alice",
    email: "alice@example.com",
    address: {
        street: "123 Main St",
        city: "Seoul",
        zipCode: "12345"
    }
}
```

#### Embedding의 장점

- 한 번의 query로 모든 data를 조회할 수 있습니다.
- atomicity가 보장됩니다.
    - single document update.
- 성능이 우수합니다.
    - no join.

#### Embedding의 단점

- document 크기가 커질 수 있습니다.
    - 16MB 제한.
- data 중복이 발생할 수 있습니다.
- embedded data가 독립적으로 조회되기 어렵습니다.


### Referencing (참조)

- 관련 data를 별도 document에 저장하고 참조하는 방식입니다.

```js
// User document
{
    _id: ObjectId("user1"),
    name: "Alice",
    email: "alice@example.com",
    addressId: ObjectId("addr1")
}

// address document (별도 collection)
{
    _id: ObjectId("addr1"),
    street: "123 Main St",
    city: "Seoul",
    zipCode: "12345"
}
```

#### Referencing의 장점

- document 크기를 작게 유지할 수 있습니다.
- data 중복을 방지합니다.
- 독립적으로 조회하고 관리할 수 있습니다.

#### Referencing의 단점

- 여러 query 또는 `$lookup`이 필요합니다.
- join 작업으로 성능이 저하될 수 있습니다.
- atomicity 보장이 어렵습니다.
    - multi-document.


---


## 관계 Modeling Pattern

- 다양한 관계 유형에 따른 one-to-one, one-to-few, one-to-many, one-to-squillions, many-to-many modeling pattern을 제공합니다.


### One-to-One (1:1) : Embedding 사용
```js
{
    _id: ObjectId("..."),
    username: "alice",
    profile: {
        firstName: "Alice",
        lastName: "Smith",
        birthDate: ISODate("1990-01-01")
    }
}
```

- 1:1 관계는 대부분 embedding이 적합합니다.
- 자주 함께 조회되는 data일 때 효율적입니다.


### One-to-Few (1:소수) : Embedding 사용

```js
{
    _id: ObjectId("..."),
    name: "Alice",
    addresses: [
        { type: "home", street: "123 Main St", city: "Seoul" },
        { type: "work", street: "456 Work Ave", city: "Seoul" }
    ]
}
```

- 관련 data가 소수(수십 개 이하)일 때 embedding이 좋습니다.
- Array가 무한히 증가하지 않는 것이 중요합니다.


### One-to-Many (1:다수) : Referencing 사용

```js
// author document
{
    _id: ObjectId("author1"),
    name: "Alice",
    bio: "Best-selling author"
}

// book documents (별도 collection)
{
    _id: ObjectId("book1"),
    title: "MongoDB Guide",
    authorId: ObjectId("author1")
}
{
    _id: ObjectId("book2"),
    title: "Advanced MongoDB",
    authorId: ObjectId("author1")
}
```

- 관련 data가 많을 때(수백 개 이상) referencing을 사용합니다.
- "Many" 쪽에 "One"의 참조를 저장합니다.
    - child references parent.


### One-to-Squillions (1:매우 많음) : Referencing + Parent Reference in Child

```js
// product document
{
    _id: ObjectId("prod1"),
    name: "Laptop",
    description: "High-performance laptop"
}

// review documents (수천~수백만 개)
{
    _id: ObjectId("review1"),
    productId: ObjectId("prod1"),  // Parent reference
    rating: 5,
    comment: "Excellent product"
}
```

- 관련 data가 매우 많을 때(수천 개 이상) 반드시 referencing을 사용합니다.
- Child에서 parent를 참조합니다.


### Many-to-Many (N:M) : Array of References

- 다대다 관계는 양방향 또는 한방향 array of references를 사용합니다.

#### 양방향 Array of References

```js
// Student document
{
    _id: ObjectId("student1"),
    name: "Alice",
    courseIds: [ObjectId("course1"), ObjectId("course2")]
}

// Course document
{
    _id: ObjectId("course1"),
    title: "MongoDB Basics",
    studentIds: [ObjectId("student1"), ObjectId("student2")]
}
```

- 양쪽에서 자주 조회하는 경우 양방향 참조를 사용합니다.

#### 한방향 Array of References

```js
// 한쪽에서만 자주 조회하는 경우
{
    _id: ObjectId("student1"),
    name: "Alice",
    courseIds: [ObjectId("course1"), ObjectId("course2")]
}
```


---


## Schema Design Pattern

- MongoDB에서 자주 사용되는 attribute pattern, bucket pattern, computed pattern, subset pattern, extended reference pattern, schema versioning pattern 등의 design pattern들이 있습니다.


### Attribute Pattern

- 다양한 속성을 가진 document를 효율적으로 저장합니다.

```js
// 나쁜 예 : 각 속성마다 별도 field
{
    productId: "P001",
    color_red: true,
    color_blue: false,
    size_S: false,
    size_M: true,
    size_L: true
}

// 좋은 예 (Attribute Pattern)
{
    productId: "P001",
    attributes: [
        { key: "color", value: "red" },
        { key: "size", value: "M" },
        { key: "size", value: "L" }
    ]
}

// Index 생성
db.products.createIndex({ "attributes.key": 1, "attributes.value": 1 })
```

- 속성이 다양하고 동적으로 변경될 때 유용합니다.


### Bucket Pattern

- 시계열 data나 IoT sensor data를 효율적으로 저장합니다.

```js
// 나쁜 예 : 각 측정값마다 document
{ sensorId: "S001", timestamp: ISODate("2025-10-31T10:00:00Z"), temp: 25.5 }
{ sensorId: "S001", timestamp: ISODate("2025-10-31T10:01:00Z"), temp: 25.6 }

// 좋은 예 (Bucket Pattern) : 일정 기간의 측정값을 하나의 document에
{
    sensorId: "S001",
    date: ISODate("2025-10-31"),
    hour: 10,
    measurements: [
        { minute: 0, temp: 25.5, humidity: 60 },
        { minute: 1, temp: 25.6, humidity: 61 },
        // ... 60개의 측정값
    ],
    count: 60,
    avgTemp: 25.7
}
```

- document 수를 크게 줄여 성능을 향상시킵니다.


### Computed Pattern

- 자주 계산되는 값을 미리 저장합니다.

```js
// 나쁜 예 : 매번 계산
db.orders.aggregate([
    { $match: { customerId: "C001" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
])

// 좋은 예 (Computed Pattern) : 미리 계산된 값 저장
{
    customerId: "C001",
    name: "Alice",
    totalOrders: 150,
    totalSpent: 50000,
    lastOrderDate: ISODate("2025-10-30")
}

// Order 생성 시 customer의 통계 update
db.customers.updateOne(
    { _id: "C001" },
    {
        $inc: { totalOrders: 1, totalSpent: 100 },
        $set: { lastOrderDate: new Date() }
    }
)
```

- 읽기가 매우 많고 쓰기가 적은 경우 유용합니다.


### Subset Pattern

- 자주 접근하는 data만 main document에 포함합니다.

```js
// movie document : 주요 정보 + 최근 리뷰 일부
{
    _id: ObjectId("movie1"),
    title: "Inception",
    year: 2010,
    recentReviews: [  // 최근 10개 리뷰만
        { user: "Alice", rating: 5, comment: "Amazing!" },
        { user: "Bob", rating: 4, comment: "Good movie" }
    ],
    totalReviews: 15000
}

// 모든 리뷰는 별도 collection에
{
    _id: ObjectId("review1"),
    movieId: ObjectId("movie1"),
    user: "Alice",
    rating: 5,
    comment: "Amazing!",
    timestamp: ISODate("2025-10-31")
}
```

- document 크기를 줄이고 자주 사용하는 data의 접근 속도를 높입니다.


### Extended Reference Pattern

- 자주 함께 조회되는 data를 중복 저장합니다.

```js
// order document에 customer 정보 일부 복사
{
    _id: ObjectId("order1"),
    orderNumber: "ORD-001",
    customerId: ObjectId("customer1"),
    customerName: "Alice",        // 중복 저장
    customerEmail: "alice@example.com",  // 중복 저장
    items: [...],
    total: 1000
}
```

- join을 피하고 성능을 향상시킵니다.
- 중복된 data는 변경 시 모두 update해야 합니다.


### Schema Versioning Pattern

- schema 변경을 관리합니다.

```js
{
    _id: ObjectId("..."),
    schemaVersion: 2,
    name: "Alice",
    // version 2의 field들
    email: "alice@example.com",
    preferences: { ... }
}
```

- schema가 진화할 때 version을 기록하여 호환성을 유지합니다.


---


## Schema Design 원칙

- MongoDB schema를 설계할 때 application 요구 사항 우선, document 크기 고려, data duplication 전략, index 전략, growth pattern 고려 등의 원칙을 따라야 합니다.


### 1. Application 요구 사항 우선

- "어떤 data를 저장하는가"보다 "어떻게 data를 사용하는가"가 중요합니다.

```plaintext
질문 목록

1. 어떤 query가 가장 자주 실행되는가?
2. 어떤 data를 함께 조회하는가?
3. 읽기와 쓰기 비율은?
4. Data 증가 속도는?
```


### 2. Document 크기 고려

- document는 16MB를 초과할 수 없습니다.
- 너무 큰 document는 성능을 저하시킵니다.

```js
// 나쁜 예 : 무한히 증가하는 array
{
    userId: "user1",
    logs: [  // 수백만 개로 증가 가능
        { timestamp: "...", action: "..." },
        // ...
    ]
}

// 좋은 예 : 별도 collection
{
    userId: "user1",
    name: "Alice"
}

// logs collection
{
    userId: "user1",
    timestamp: "...",
    action: "..."
}
```


### 3. Data Duplication 전략

- 적절한 중복은 성능 향상에 도움이 됩니다.

- 변경이 적을 때 **중복이 적합**합니다.
    - 읽기가 매우 많고 쓰기가 적은 경우.
    - 중복된 data가 자주 변경되지 않는 경우.
    - join 비용이 큰 경우.

- 변경이 많을 때 **중복을 피해**야 합니다.
    - 중복된 data가 자주 변경되는 경우.
    - 일관성 유지가 중요한 경우.
    - 저장 공간이 제한적인 경우.


### 4. Index 전략

- schema 설계 시 index를 함께 고려합니다.

```js
// Query pattern: { userId: ..., status: ... }
db.orders.createIndex({ userId: 1, status: 1 })
```


### 5. Growth Pattern 고려

- data가 어떻게 증가할지 예측하고 설계합니다.

```js
// 나쁜 예 : array가 무한히 증가
{
    userId: "user1",
    friends: [...]  // 수천 명으로 증가 가능
}

// 좋은 예 : referencing 사용
{
    userId: "user1",
    name: "Alice"
}

// friendships collection
{
    userId: "user1",
    friendId: "user2",
    since: ISODate("...")
}
```


---


## 실전 Schema 예시

- 실제 application의 e-commerce system, blog system 등의 schema 설계 예시입니다.


### E-commerce System

```js
// users collection
{
    _id: ObjectId("user1"),
    email: "alice@example.com",
    name: "Alice",
    shippingAddresses: [  // One-to-Few
        {
            type: "home",
            street: "123 Main St",
            city: "Seoul",
            isDefault: true
        }
    ],
    totalOrders: 45,  // Computed Pattern
    totalSpent: 150000
}

// products collection
{
    _id: ObjectId("prod1"),
    sku: "LAPTOP-001",
    name: "Gaming Laptop",
    price: 1500000,
    category: "Electronics",
    attributes: [  // Attribute Pattern
        { key: "brand", value: "ASUS" },
        { key: "cpu", value: "i7" },
        { key: "ram", value: "16GB" }
    ],
    stock: 50,
    recentReviews: [...]  // Subset Pattern
}

// orders collection
{
    _id: ObjectId("order1"),
    orderNumber: "ORD-2025-001",
    customerId: ObjectId("user1"),
    customerName: "Alice",  // Extended Reference
    customerEmail: "alice@example.com",
    items: [  // Embedding (Few items)
        {
            productId: ObjectId("prod1"),
            name: "Gaming Laptop",
            price: 1500000,
            quantity: 1
        }
    ],
    total: 1500000,
    status: "completed",
    createdAt: ISODate("2025-10-31")
}

// reviews collection (One-to-Many from Product)
{
    _id: ObjectId("review1"),
    productId: ObjectId("prod1"),
    userId: ObjectId("user1"),
    userName: "Alice",  // Extended Reference
    rating: 5,
    comment: "Excellent laptop!",
    createdAt: ISODate("2025-10-31")
}
```


### Blog System

```js
// authors collection
{
    _id: ObjectId("author1"),
    username: "alice",
    email: "alice@example.com",
    profile: {  // One-to-One Embedding
        bio: "Tech blogger",
        website: "https://alice.com"
    },
    postCount: 120  // Computed Pattern
}

// posts collection
{
    _id: ObjectId("post1"),
    title: "MongoDB Schema Design",
    slug: "mongodb-schema-design",
    authorId: ObjectId("author1"),
    authorName: "alice",  // Extended Reference
    content: "...",
    tags: ["mongodb", "database", "nosql"],  // Embedding
    publishedAt: ISODate("2025-10-31"),
    viewCount: 1500,
    commentCount: 25,  // Computed Pattern
    recentComments: [  // Subset Pattern
        {
            _id: ObjectId("comment1"),
            author: "Bob",
            text: "Great article!",
            createdAt: ISODate("2025-10-31")
        }
    ]
}

// comments collection (One-to-Many from Post)
{
    _id: ObjectId("comment1"),
    postId: ObjectId("post1"),
    author: "Bob",
    text: "Great article!",
    createdAt: ISODate("2025-10-31")
}
```


---


## Schema Migration 전략

- 기존 schema를 변경하기 위해 schema versioning, lazy migration, batch migration 등의 전략을 제공합니다.


### Schema Versioning

```js
// schema version을 document에 포함
{
    _id: ObjectId("..."),
    schemaVersion: 2,
    // ... fields
}

// application에서 version에 따라 처리
if (doc.schemaVersion === 1) {
    // Migrate to version 2
    doc = migrateV1toV2(doc);
}
```


### Lazy Migration

- document를 읽거나 쓸 때 점진적으로 migration합니다.

```js
function getUser(userId) {
    let user = db.users.findOne({ _id: userId });

    // old schema 감지
    if (!user.schemaVersion) {
        user = migrateUser(user);
        db.users.updateOne(
            { _id: userId },
            { $set: user }
        );
    }

    return user;
}
```


### Batch Migration

- script로 모든 document를 일괄 migration합니다.

```js
// 모든 users를 새 schema로 migration
db.users.find({ schemaVersion: { $ne: 2 } }).forEach(function(doc) {
    doc.schemaVersion = 2;
    doc.fullName = doc.firstName + " " + doc.lastName;
    delete doc.firstName;
    delete doc.lastName;

    db.users.updateOne({ _id: doc._id }, { $set: doc });
});
```


---


## Reference

- <https://www.mongodb.com/docs/manual/core/data-modeling-introduction/>
- <https://www.mongodb.com/docs/manual/applications/data-models/>
- <https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/>
- <https://www.mongodb.com/blog/post/building-with-patterns-a-summary>

