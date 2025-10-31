---
layout: note
permalink: /240
title: MongoDB Collection - Document를 담는 그릇
description: Collection은 MongoDB에서 document를 grouping하여 저장하는 단위로, 관계형 database의 table에 해당합니다.
date: 2025-10-31
---


## Collection : Document의 Group

- **collection**은 MongoDB에서 document를 grouping하여 저장하는 단위입니다.
    - 관계형 database의 table에 해당합니다.

- collection은 여러 document를 포함합니다.
    - 같은 collection 내의 document들은 유사한 목적으로 사용되지만, 동일한 구조를 가질 필요는 없습니다.

- MongoDB는 schema-less 특성을 가지므로, collection 내 document들이 서로 다른 field를 가질 수 있습니다.
    - 그러나 실무에서는 일관된 schema를 유지하는 것이 일반적입니다.


---


## Collection 특징

- collection은 MongoDB database의 핵심 구성 요소입니다.


### Schema 유연성

- collection은 고정된 schema를 요구하지 않습니다.
    - 같은 collection 내에서 document마다 다른 field를 가질 수 있습니다.

```js
// users collection에 다른 구조의 document 저장 가능
db.users.insertOne({
    name: "Alice",
    age: 25,
    email: "alice@example.com"
});

db.users.insertOne({
    name: "Bob",
    department: "Engineering",
    skills: ["MongoDB", "Node.js"]
});
```

- schema 유연성은 빠른 개발을 가능하게 하지만, data 일관성 관리가 필요합니다.
    - schema validation을 사용하여 일관성을 강제할 수 있습니다.


### 동적 생성

- collection은 명시적으로 생성하지 않아도 첫 document 삽입 시 자동으로 생성됩니다.

```js
// users collection이 없어도 자동 생성됨
db.users.insertOne({ name: "Alice" });
```

- 명시적으로 `createCollection()` method를 사용하여 option과 함께 생성할 수도 있습니다.


### Namespace

- collection은 database 내에서 고유한 이름을 가져야 합니다.
    - 전체 경로는 `database.collection` 형식입니다.

```js
// mydb database의 users collection
mydb.users

// testdb database의 users collection (위와 다른 collection)
testdb.users
```


---


## Collection 명명 규칙

- collection 이름은 특정 규칙을 따라야 합니다.


### 기본 규칙

- 빈 문자열("")은 사용할 수 없습니다.

- `null` 문자(`\0`)를 포함할 수 없습니다.

- `system.` prefix를 사용할 수 없습니다.
    - system collection은 MongoDB 내부용으로 예약되어 있습니다.

- `$` 기호를 포함할 수 없습니다.
    - 일부 driver와 tool에서 특수한 의미로 사용됩니다.


### 권장 사항

- 소문자를 사용합니다.
    - `Users` 대신 `users`를 사용합니다.

- 복수형을 사용합니다.
    - `user` 대신 `users`를 사용합니다.

- snake_case 또는 camelCase를 일관되게 사용합니다.
    - `user_profiles` 또는 `userProfiles`.

- 의미 있고 명확한 이름을 사용합니다.
    - `data1`, `temp` 같은 이름은 피합니다.


---


## Collection 작업

- collection을 생성, 조회, 삭제하는 기본 작업이 있습니다.


### Collection 조회

```js
// 현재 database의 모든 collection 조회
show collections

// 또는
db.getCollectionNames()
```

- `show collections`는 현재 database의 모든 collection 이름을 반환합니다.

- `db.getCollectionNames()`는 collection 이름을 array로 반환합니다.


### Collection 생성

```js
// 기본 collection 생성
db.createCollection("users")

// option과 함께 생성
db.createCollection("logs", {
    capped: true,
    size: 5242880,  // 5MB
    max: 5000
})
```

- 대부분의 경우 명시적인 생성이 불필요합니다.
    - 첫 document 삽입 시 자동으로 생성되기 때문입니다.

- capped collection이나 validation rule이 필요한 경우에만 명시적으로 생성합니다.


### Collection 삭제

```js
// users collection 삭제
db.users.drop()
```

- `drop()` method는 collection과 그 안의 모든 document, index를 삭제합니다.

- 삭제된 collection은 복구할 수 없으므로 주의해야 합니다.


### Collection 이름 변경

```js
// users collection을 customers로 변경
db.users.renameCollection("customers")
```

- collection 이름 변경은 metadata만 변경하므로 빠르게 수행됩니다.

- 같은 database 내에서만 이름을 변경할 수 있습니다.


---


## Capped Collection

- **capped collection**은 고정된 크기를 가지는 특수한 collection입니다.


### 특징

- 최대 크기가 정해져 있어, 한계에 도달하면 가장 오래된 document를 자동으로 삭제합니다.
    - circular buffer처럼 동작합니다.

- 삽입 순서가 보장됩니다.
    - `_id` index 없이도 삽입 순서대로 조회할 수 있습니다.

- 높은 write 성능을 제공합니다.
    - index update와 공간 재할당이 최소화됩니다.

- document를 개별적으로 삭제할 수 없습니다.
    - 오직 collection 전체만 삭제할 수 있습니다.


### 생성 방법

```js
// 5MB 크기, 최대 5000개 document를 가지는 capped collection
db.createCollection("logs", {
    capped: true,
    size: 5242880,     // byte 단위 (필수)
    max: 5000          // document 개수 제한 (선택)
})
```

- `capped: true` option을 설정합니다.
- `size`는 필수이며, byte 단위로 지정합니다.
- `max`는 선택 사항으로, document 개수 제한을 지정합니다.


### 사용 사례

- **Log data** : 최근 일정 기간의 log만 유지하고 싶을 때.
- **Cache data** : 고정된 크기의 cache를 유지할 때.
- **실시간 data** : sensor data나 실시간 analytics data.

```js
// application log를 capped collection에 저장
db.createCollection("appLogs", {
    capped: true,
    size: 104857600,  // 100MB
    max: 100000
})
```


### 제약 사항

- document 크기를 늘리는 update는 불가능합니다.
    - document가 더 커지면 collection 크기 제한을 초과할 수 있기 때문입니다.

- sharding이 불가능합니다.
    - capped collection은 sharding을 지원하지 않습니다.

- `findAndModify`로 document를 삭제할 수 없습니다.


---


## Schema Validation

- schema validation을 사용하여 collection에 삽입되는 document의 구조를 제한할 수 있습니다.


### Validation Rule 설정

```js
db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "name must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    pattern: "^.+@.+$",
                    description: "email must be a valid email address"
                },
                age: {
                    bsonType: "int",
                    minimum: 0,
                    maximum: 150,
                    description: "age must be an integer between 0 and 150"
                }
            }
        }
    }
})
```

- `$jsonSchema` operator를 사용하여 JSON Schema 형식으로 validation rule을 정의합니다.

- `required` array에 필수 field를 지정합니다.

- 각 field의 type, pattern, range 등을 제한할 수 있습니다.


### Validation Level

```js
db.createCollection("users", {
    validator: { /* validation rules */ },
    validationLevel: "moderate"  // "strict" 또는 "moderate"
})
```

- **strict** (기본값) : 모든 insert와 update에 validation을 적용합니다.

- **moderate** : 유효한 document에 대한 update만 validation을 적용합니다.
    - 기존에 invalid한 document는 그대로 유지됩니다.


### Validation Action

```js
db.createCollection("users", {
    validator: { /* validation rules */ },
    validationAction: "warn"  // "error" 또는 "warn"
})
```

- **error** (기본값) : validation 실패 시 insert/update를 거부합니다.

- **warn** : validation 실패 시 경고만 기록하고 작업을 허용합니다.
    - log에 validation 실패가 기록됩니다.


### 기존 Collection에 Validation 추가

```js
db.runCommand({
    collMod: "users",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email"]
        }
    },
    validationLevel: "moderate"
})
```

- `collMod` 명령으로 기존 collection에 validation rule을 추가하거나 수정할 수 있습니다.


---


## Collection 성능 최적화

- collection을 효율적으로 사용하기 위한 여러가지 전략이 있습니다.


### Index 전략

- 자주 조회하는 field에 index를 생성합니다.
    - query 성능이 크게 향상됩니다.

- index 개수는 적절하게 유지합니다.
    - 너무 많은 index는 write 성능을 저하시킵니다.
    - 일반적으로 collection당 5-10개 이내를 권장합니다.


### Document 크기 관리

- document 크기를 16MB 이하로 유지합니다.
    - 큰 file은 GridFS를 사용합니다.

- 불필요한 field를 제거하여 document 크기를 최소화합니다.


### Sharding 고려

- collection이 매우 크면 sharding을 고려합니다.
    - 여러 server에 data를 분산하여 저장합니다.

- 적절한 shard key를 선택하여 data를 균등하게 분산시킵니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/databases-and-collections/>
- <https://www.mongodb.com/docs/manual/core/capped-collections/>
- <https://www.mongodb.com/docs/manual/core/schema-validation/>

