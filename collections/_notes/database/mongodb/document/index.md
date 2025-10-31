---
layout: note
permalink: /115
title: MongoDB Document - Data의 기본 단위
description: Document는 MongoDB에서 data를 저장하는 기본 단위로, JSON과 유사한 BSON 형식을 사용합니다.
date: 2025-10-31
---


## Document : MongoDB의 기본 Data 단위

- **document**는 MongoDB에서 data를 저장하는 기본 단위입니다.
    - 관계형 database의 row에 해당합니다.

- document는 field와 value 쌍으로 구성된 구조화된 data입니다.
    - JSON과 유사한 형식으로 표현되지만, 실제로는 BSON(Binary JSON) 형식으로 저장됩니다.

- document는 유연한 schema를 가집니다.
    - 같은 collection 내의 document들이 서로 다른 field 구조를 가질 수 있습니다.
    - 필요에 따라 field를 동적으로 추가하거나 제거할 수 있습니다.


---


## Document 구조

- document는 중첩된 구조를 지원하여 복잡한 data를 표현할 수 있습니다.


### 기본 구조

```js
{
    _id: ObjectId("507f1f77bcf86cd799439011"),
    name: "John Doe",
    age: 30,
    email: "john@example.com"
}
```

- 각 document는 고유한 `_id` field를 가집니다.
    - `_id`는 document를 식별하는 primary key 역할을 합니다.
    - 명시적으로 지정하지 않으면 MongoDB가 자동으로 `ObjectId` 타입의 값을 생성합니다.

- field 이름은 문자열이며, value는 다양한 data type을 가질 수 있습니다.


### Embedded Document (중첩 문서)

```js
{
    _id: ObjectId("507f1f77bcf86cd799439011"),
    name: "John Doe",
    address: {
        street: "123 Main St",
        city: "Seoul",
        zipCode: "12345"
    }
}
```

- document 내부에 다른 document를 포함할 수 있습니다.
    - 관련된 data를 하나의 document에 함께 저장하여 조회 성능을 향상시킵니다.

- embedded document는 최대 100단계까지 중첩할 수 있습니다.
    - 실무에서는 2-3단계 정도의 중첩이 일반적입니다.


### Array Field (배열 Field)

```js
{
    _id: ObjectId("507f1f77bcf86cd799439011"),
    name: "Book Store",
    tags: ["books", "education", "bestseller"],
    authors: [
        { name: "Alice", role: "writer" },
        { name: "Bob", role: "editor" }
    ]
}
```

- field 값으로 array를 사용할 수 있습니다.
    - array 내부에 primitive 값이나 embedded document를 저장할 수 있습니다.

- array field에 index를 생성하면 multikey index가 자동으로 생성됩니다.


---


## Document 크기 제한

- MongoDB document에는 크기 제한이 있습니다.


### 최대 크기

- 각 document의 최대 크기는 16MB입니다.
    - BSON 형식으로 저장될 때의 크기 기준입니다.

- 16MB를 초과하는 data는 GridFS를 사용해야 합니다.
    - GridFS는 큰 파일을 여러 chunk로 나누어 저장하는 방식입니다.


### Field 제한

- document는 최대 100단계까지 중첩할 수 있습니다.

- field 이름은 다음 규칙을 따라야 합니다.
    - `$`로 시작할 수 없습니다. (query 연산자와 구분하기 위함)
    - `.`을 포함할 수 없습니다. (nested field 접근 문법과 충돌)
    - `null` 문자를 포함할 수 없습니다.


---


## BSON Data Type

- MongoDB는 JSON을 확장한 BSON 형식을 사용하여 더 다양한 data type을 지원합니다.


### 기본 Data Type

| Type | 설명 | 예시 |
| --- | --- | --- |
| `String` | 문자열 | `"hello"` |
| `Integer` | 32-bit 정수 | `123` |
| `Long` | 64-bit 정수 | `NumberLong("9223372036854775807")` |
| `Double` | 64-bit 부동소수점 | `3.14` |
| `Boolean` | 참/거짓 | `true`, `false` |
| `Null` | null 값 | `null` |
| `Array` | 배열 | `[1, 2, 3]` |
| `Object` | 내장 문서 | `{ name: "John" }` |


### 특수 Data Type

| Type | 설명 | 예시 |
| --- | --- | --- |
| `ObjectId` | 고유 식별자 | `ObjectId("507f1f77bcf86cd799439011")` |
| `Date` | 날짜와 시간 | `ISODate("2025-10-31T12:00:00Z")` |
| `Timestamp` | timestamp | `Timestamp(1634567890, 1)` |
| `Binary Data` | 이진 data | file, image 등 |
| `Regular Expression` | 정규 표현식 | `/pattern/i` |
| `JavaScript Code` | JavaScript code | `function() { return true; }` |


### ObjectId 구조

```js
ObjectId("507f1f77bcf86cd799439011")
```

- `ObjectId`는 12-byte 값으로 구성됩니다.
    - 4-byte : Unix timestamp (생성 시각).
    - 5-byte : random value (machine 식별자).
    - 3-byte : incrementing counter.

- `ObjectId`는 시간 순서가 보장됩니다.
    - 나중에 생성된 document의 `_id`가 항상 더 큽니다.


---


## Document CRUD 작업

- document는 생성(Create), 조회(Read), 수정(Update), 삭제(Delete) 작업을 수행할 수 있습니다.


### Create (생성)

```js
// 단일 document 삽입
db.users.insertOne({
    name: "Alice",
    age: 25,
    email: "alice@example.com"
});

// 여러 document 삽입
db.users.insertMany([
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
]);
```

- collection이 존재하지 않으면 자동으로 생성됩니다.
- `_id`를 명시하지 않으면 자동으로 생성됩니다.


### Read (조회)

```js
// 모든 document 조회
db.users.find();

// 조건에 맞는 document 조회
db.users.find({ age: { $gte: 30 } });

// 단일 document 조회
db.users.findOne({ name: "Alice" });

// 특정 field만 조회 (projection)
db.users.find({}, { name: 1, email: 1, _id: 0 });
```

- `find()`는 cursor를 반환하여 대량의 data를 효율적으로 처리합니다.
- projection을 사용하여 필요한 field만 조회하면 성능이 향상됩니다.


### Update (수정)

```js
// 단일 document 수정
db.users.updateOne(
    { name: "Alice" },
    { $set: { age: 26 } }
);

// 여러 document 수정
db.users.updateMany(
    { age: { $lt: 30 } },
    { $inc: { age: 1 } }
);

// document 전체 교체
db.users.replaceOne(
    { name: "Bob" },
    { name: "Bob", age: 31, status: "active" }
);
```

- `$set` 연산자로 특정 field만 수정합니다.
- `$inc`, `$push`, `$pull` 등 다양한 update 연산자를 사용할 수 있습니다.


### Delete (삭제)

```js
// 단일 document 삭제
db.users.deleteOne({ name: "Alice" });

// 여러 document 삭제
db.users.deleteMany({ age: { $lt: 25 } });

// 모든 document 삭제 (collection은 유지)
db.users.deleteMany({});
```

- 삭제된 document는 복구할 수 없습니다.
- 대량 삭제 시 성능을 고려하여 batch 단위로 처리하는 것이 좋습니다.


---


## Document 설계 원칙

- document 구조를 설계할 때 고려해야 할 여러 원칙이 있습니다.


### Embedding vs Referencing

- **Embedding** : 관련 data를 하나의 document에 포함합니다.
    - 조회 성능이 우수합니다. (single query로 모든 data 조회)
    - document 크기가 커질 수 있습니다.
    - data 중복이 발생할 수 있습니다.

```js
/* Embedding 방식 */
{
    _id: 1,
    name: "John",
    address: {
        street: "123 Main St",
        city: "Seoul"
    }
}
```

- **Referencing** : 관련 data를 별도 collection에 저장하고 참조합니다.
    - data 중복을 줄입니다.
    - 여러 query가 필요합니다. (join 작업 필요)
    - data 일관성 유지가 쉽습니다.

```js
/* Referencing 방식 */

// users collection
{
    _id: 1,
    name: "John",
    address_id: 100
}

// addresses collection
{
    _id: 100,
    street: "123 Main St",
    city: "Seoul"
}
```


### 언제 Embedding을 사용할까

- 1:1 관계이거나 1:Few 관계인 경우.
- 관련 data를 항상 함께 조회하는 경우.
- 관련 data가 자주 변경되지 않는 경우.
- embedded data가 무한히 증가하지 않는 경우.


### 언제 Referencing을 사용할까

- 1:Many 관계이고 Many가 매우 큰 경우.
- data를 독립적으로 조회하는 경우가 많은 경우.
- data가 자주 변경되는 경우.
- 여러 document에서 같은 data를 공유하는 경우.


---


## Document 성능 최적화

- document를 효율적으로 사용하기 위해 여러 전략을 적용할 수 있습니다.


### Document 크기 최소화

- 불필요한 field를 제거합니다.
    - projection을 사용하여 필요한 field만 조회합니다.

- field 이름을 간결하게 유지합니다.
    - field 이름도 저장 공간을 차지하므로, 긴 이름보다는 짧은 이름을 사용합니다.
    - 단, 가독성을 해치지 않는 선에서 결정합니다.


### Index 활용

- 자주 조회하는 field에 index를 생성합니다.
    - query 성능이 크게 향상됩니다.

- covered query를 활용합니다.
    - index만으로 query를 처리하여 document를 읽지 않습니다.


### Array 크기 관리

- array가 너무 크면 document 크기가 급증합니다.
    - array 크기가 계속 증가하는 경우 referencing 방식을 고려합니다.

- array에 대한 query는 성능이 저하될 수 있습니다.
    - multikey index를 적절히 활용합니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/document/>
- <https://www.mongodb.com/docs/manual/reference/bson-types/>
- <https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/>
- <https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/>

