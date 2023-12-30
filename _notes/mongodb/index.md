---
layout: note
title: MongoDB
date: 2023-12-29
---




- MongoDB는 고성능, 고가용성 및 쉬운 확장성을 제공하는 NoSQL, 문서 지향(document-oriented) database입니다.
    - NoSQL은 "Not Only SQL"의 약자로, 전통적인 SQL database와는 다른 특징을 가집니다.



## BSON 형식으로 Data 저장

- MongoDB는 **BSON(Binary JSON)** 형식으로 data를 저장하고 전송합니다.

- BSON은 "Binary JSON"의 줄임말로, 이진 형식 data 직렬화를 위해 설계된 format입니다.
    - BSON은 이진 data로 표현되어 있어 JSON보다 더 효율적으로 저장하고 전송할 수 있습니다.

- BSON은 JSON과 유사하며, JSON에서 사용되는 data 유형에 몇 가지를 추가적으로 제공합니다.
    - e.g., binary data, 날짜, 정규 표현식 등.


## 자유로운 Schema
    
- MongoDB는 schema가 고정되어 있지 않습니다.
    - table 구조에 맞추어 data를 넣어야 하는 SQL database와는 반대되는 특징입니다.

- 동일한 collection 내에 다양한 schema를 가진 문서를 포함할 수 있습니다.
    - 그러나 이는 주로 특수한 경우에 사용되며, 일반적으로는 한 collection 내에서는 동일한 유형의 문서를 유지하는 것이 좋습니다.
    - 동일한 schema를 유지해야 query와 indexing이 더 효율적으로 수행되기 때문입니다.

- 이러한 유연성 덕에 개발자는 application의 요구 사항에 맞추어 data model을 쉽게 변경하고 확장할 수 있습니다.
    - shema를 변경할 때는 data의 일관성이 깨지지 않도록 주의해야 합니다.




---




## MongoDB의 구조 : Database ⊃ Collection ⊃ Document

```js
"database": {
    "collection": [
        {
            "_id": ObjectId("id"),
            "field": "value",
            "field": "value"
        },
        {
            "_id": ObjectId("id"),
            "field": "value",
            "field": "value"
        },
        // ...
    ],
    "users": [    // 다른 schema의 document들을 포함하는 collection 예시
        {    
            "_id": ObjectId("5ffdf95c4707303c4d6f57a0"),
            "username": "john_doe",
            "email": "john@example.com",
            "age": 30
        },
        {
            "_id": ObjectId("5ffdf95c4707303c4d6f57a1"),
            "name": "Jane Doe",
            "email": "jane@example.com",
            "address": {
                "city": "New York",
                "state": "NY"
            }
        },
        {
            "_id": ObjectId("5ffdf95c4707303c4d6f57a2"),
            "username": "bob_smith",
            "age": 25,
            "skills": ["JavaScript", "Python", "MongoDB"]
        }
    ],
    // ...
},
"database": {
    // ...
},
// ...
```


### Database

- MongoDB는 여러 개의 database를 지원합니다.
- 각 database는 별개의 공간을 가지며, 서로 독립적으로 관리됩니다.
- database는 collection의 집합체입니다.


### Collection

- MongoDB의 collection은 RDBMS에서의 table에 해당합니다.
- collection은 document의 집합체입니다.


### Document

- document는 MongoDB에서의 기본 data 단위입니다.
    - RDBMS에서의 row에 해당합니다.
- 각 document는 collection에 저장되고, 고유한 식별자인 `ObjectId`를 가지고 있습니다.
- document는 JSON 형식으로 표현되며, field(key-value)의 집합체입니다.
    - field는 document 내의 data를 나타내며, key와 value 쌍으로 이루어진 data 단위입니다.

| Field의 구성 요소 | 설명 |
| --- | --- |
| key | field의 고유한 이름이며, 해당 field를 식별하는 데에 사용됩니다. |
| value | key에 연결되는 값이며, 다양한 data 유형일 수 있습니다. |




---




## Reference

- <https://colevelup.tistory.com/45>
