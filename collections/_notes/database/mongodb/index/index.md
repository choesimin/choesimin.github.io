---
layout: note
permalink: /388
title: MongoDB Index - 빠른 검색을 위한 색인 구조
description: MongoDB의 index는 query 성능을 향상시키기 위한 특별한 data 구조입니다.
date: 2025-10-30
---


## MongoDB Index : 빠른 검색을 위한 색인 구조

- MongoDB의 **index**는 query의 실행 속도를 높이기 위한 특별한 data 구조입니다.
    - index는 특정 field나 field 집합의 값을 효율적으로 검색할 수 있도록 정렬된 형태로 저장합니다.

- index가 없으면 MongoDB는 collection의 모든 document를 순차적으로 검색하는 **collection scan**을 수행합니다.
    - collection scan은 대량의 data가 있을 때 매우 느린 성능을 보입니다.
    - index를 사용하면 MongoDB는 검색 범위를 크게 줄여 빠르게 원하는 document를 찾을 수 있습니다.

- MongoDB는 B-tree 구조를 사용하여 index를 구현합니다.
    - B-tree는 정렬된 data를 유지하면서 효율적인 검색, 삽입, 삭제 연산을 지원하는 자료 구조입니다.


---


## Index의 필요성

- index는 query 성능을 크게 향상시키지만, 저장 공간과 write 성능 사이의 trade-off가 존재합니다.


### Query 성능 향상

- index를 사용하면 검색 시간이 O(n)에서 O(log n)으로 감소합니다.
    - collection에 수백만 개의 document가 있어도 빠르게 검색할 수 있습니다.

- 정렬 작업(`sort`)도 index를 활용하면 더 빠르게 수행됩니다.
    - index가 이미 정렬된 순서로 data를 유지하기 때문입니다.


### 저장 공간 사용

- index는 추가 저장 공간을 필요로 합니다.
    - 각 index는 해당 field의 값과 document 위치 정보를 저장합니다.

- 너무 많은 index를 생성하면 disk 공간이 낭비될 수 있습니다.
    - 실제로 사용되는 query pattern을 분석하여 필요한 index만 생성해야 합니다.


### Write 성능 영향

- document를 삽입, 수정, 삭제할 때마다 관련된 모든 index도 함께 update됩니다.
    - index가 많을수록 write 작업의 성능이 저하됩니다.

- read 중심의 application에서는 index가 유리하지만, write 중심의 application에서는 신중하게 설계해야 합니다.


---


## Index 종류

- MongoDB는 다양한 유형의 index를 지원하여 여러 검색 요구 사항을 충족합니다.


### Single Field Index

- **single field index**는 collection의 단일 field에 대한 index입니다.
    - 가장 기본적이고 많이 사용되는 index 유형입니다.

```js
// name field에 오름차순 index 생성
db.users.createIndex({ name: 1 });

// age field에 내림차순 index 생성
db.users.createIndex({ age: -1 });
```

- `1`은 오름차순, `-1`은 내림차순을 의미합니다.
    - single field index에서는 정렬 방향이 크게 중요하지 않습니다.
    - MongoDB는 index를 양방향으로 탐색할 수 있기 때문입니다.


### Compound Index

- **compound index**는 여러 field를 조합한 index입니다.
    - 두 개 이상의 field를 함께 검색하는 query에 유용합니다.

```js
// name과 age field를 조합한 index 생성
db.users.createIndex({ name: 1, age: -1 });
```

- compound index의 field 순서가 매우 중요합니다.
    - index는 첫 번째 field로 먼저 정렬되고, 그 다음 두 번째 field로 정렬됩니다.
    - `{ name: 1, age: -1 }` index는 name으로 검색하는 query와 name과 age를 함께 검색하는 query에 모두 사용됩니다.
    - 그러나 age만으로 검색하는 query에는 효율적으로 사용되지 않습니다.

- **prefix rule**에 따라 compound index는 왼쪽부터 시작하는 field 조합에 사용될 수 있습니다.
    - `{ a: 1, b: 1, c: 1 }` index는 `{ a: 1 }`, `{ a: 1, b: 1 }`, `{ a: 1, b: 1, c: 1 }` 조합의 query에 사용됩니다.


### Multikey Index

- **multikey index**는 array field의 각 요소에 대해 index entry를 생성합니다.
    - array 내부의 값을 검색할 때 사용됩니다.

```js
// tags array field에 index 생성
db.articles.createIndex({ tags: 1 });

// tags에 "mongodb"가 포함된 document 검색
db.articles.find({ tags: "mongodb" });
```

- MongoDB는 array field에 index를 생성하면 자동으로 multikey index로 처리합니다.
    - array의 각 요소가 별도의 index entry로 저장됩니다.

- compound index에서 최대 하나의 array field만 multikey index로 사용할 수 있습니다.


### Text Index

- **text index**는 문자열 field에서 text 검색을 지원합니다.
    - 형태소 분석과 불용어 제거 등의 기능을 제공합니다.

```js
// content field에 text index 생성
db.articles.createIndex({ content: "text" });

// text 검색 수행
db.articles.find({ $text: { $search: "mongodb index" } });
```

- text index는 자연어 검색에 최적화되어 있습니다.
    - 단어를 token화하고 stemming을 적용하여 검색 정확도를 높입니다.

- collection당 하나의 text index만 생성할 수 있습니다.
    - 그러나 여러 field를 포함하는 복합 text index는 생성 가능합니다.


### Geospatial Index

- **geospatial index**는 지리적 위치 data를 효율적으로 검색하기 위한 index입니다.
    - 2D 평면 좌표와 지구 표면의 구형 좌표를 모두 지원합니다.

```js
// 2dsphere index 생성 (지구 표면 좌표)
db.places.createIndex({ location: "2dsphere" });

// 특정 위치 근처의 장소 검색
db.places.find({
    location: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [127.0, 37.5]
            },
            $maxDistance: 1000
        }
    }
});
```

- `2dsphere` index는 GeoJSON 형식의 위치 data를 지원합니다.
- `2d` index는 평면 좌표계를 사용하는 legacy index입니다.


### Hashed Index

- **hashed index**는 field 값의 hash 값을 기반으로 index를 생성합니다.
    - 주로 hash 기반 sharding에 사용됩니다.

```js
// userId field에 hashed index 생성
db.users.createIndex({ userId: "hashed" });
```

- hashed index는 등호 비교(`==`) query에만 사용할 수 있습니다.
    - 범위 검색(`$gt`, `$lt` 등)에는 사용할 수 없습니다.

- hashed index는 data를 균등하게 분산시키는 데에 유용합니다.


---


## Index 생성 및 관리

- MongoDB는 다양한 명령어를 통해 index를 생성, 조회, 삭제할 수 있습니다.


### Index 생성

```js
// 기본 index 생성
db.collection.createIndex({ field: 1 });

// unique index 생성 (중복 값 허용 안 함)
db.collection.createIndex({ email: 1 }, { unique: true });

// background에서 index 생성 (MongoDB 4.2 이전 버전)
db.collection.createIndex({ field: 1 }, { background: true });

// sparse index 생성 (field가 존재하는 document만 index에 포함)
db.collection.createIndex({ field: 1 }, { sparse: true });

// TTL index 생성 (일정 시간 후 document 자동 삭제)
db.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

- **unique index**는 중복된 값을 허용하지 않습니다.
    - email이나 username과 같은 고유 식별자에 사용됩니다.

- **sparse index**는 해당 field가 존재하는 document만 index에 포함합니다.
    - field가 없는 document는 index에서 제외되어 저장 공간을 절약할 수 있습니다.

- **TTL index**는 시간 기반으로 document를 자동 삭제합니다.
    - log data나 임시 data를 관리할 때 유용합니다.
    - TTL index는 single field index이며, Date 타입이나 Date 배열 field에만 생성할 수 있습니다.


### Index 조회

```js
// collection의 모든 index 조회
db.collection.getIndexes();

// index 사용 통계 확인
db.collection.aggregate([{ $indexStats: {} }]);
```

- `getIndexes()`는 collection에 생성된 모든 index의 정보를 반환합니다.
    - index 이름, field 구성, 옵션 등을 확인할 수 있습니다.

- `$indexStats`는 각 index의 사용 빈도와 성능 통계를 제공합니다.
    - 사용되지 않는 index를 찾아 제거하는 데에 유용합니다.


### Index 삭제

```js
// 특정 index 삭제
db.collection.dropIndex("index_name");
db.collection.dropIndex({ field: 1 });

// _id를 제외한 모든 index 삭제
db.collection.dropIndexes();
```

- index 이름이나 index 정의를 사용하여 삭제할 수 있습니다.
    - `_id` field의 index는 자동으로 생성되며 삭제할 수 없습니다.

- 사용되지 않는 index는 정기적으로 확인하고 삭제해야 합니다.
    - 불필요한 index는 write 성능을 저하시키고 저장 공간을 낭비합니다.


---


## Index 성능 최적화

- index를 효과적으로 사용하려면 query pattern을 분석하고 적절한 index 전략을 수립해야 합니다.


### Query Plan 분석

```js
// query 실행 계획 확인
db.collection.find({ name: "John" }).explain("executionStats");
```

- `explain()` method는 MongoDB가 query를 어떻게 실행하는지 보여줍니다.
    - index를 사용했는지, collection scan을 수행했는지 확인할 수 있습니다.
    - `executionStats` mode는 실제 실행 시간과 검사한 document 수를 포함한 상세 정보를 제공합니다.

- `executionStats`에서 확인해야 할 주요 지표가 있습니다.
    - `totalDocsExamined` : 검사한 document 수.
    - `totalKeysExamined` : 검사한 index entry 수.
    - `executionTimeMillis` : query 실행 시간.

- 효율적인 query는 `totalDocsExamined`와 반환된 document 수가 비슷해야 합니다.


### Index Selectivity

- **index selectivity**는 index가 얼마나 효과적으로 data를 필터링하는지를 나타냅니다.
    - selectivity가 높을수록 index가 더 효율적입니다.

- unique 값이 많은 field일수록 selectivity가 높습니다.
    - 예를 들어, email field는 selectivity가 높고, gender field는 selectivity가 낮습니다.

- compound index를 설계할 때는 selectivity가 높은 field를 앞쪽에 배치하는 것이 좋습니다.


### Covered Query

- **covered query**는 query가 필요로 하는 모든 field가 index에 포함된 경우를 말합니다.
    - MongoDB는 document를 읽지 않고 index만으로 query를 처리할 수 있습니다.

```js
// name과 age field를 포함하는 compound index 생성
db.users.createIndex({ name: 1, age: 1 });

// covered query 예시 (index만으로 처리 가능)
db.users.find(
    { name: "John" },
    { _id: 0, name: 1, age: 1 }
);
```

- covered query는 매우 빠른 성능을 제공합니다.
    - disk I/O가 최소화되고 memory 사용량도 줄어듭니다.

- projection에서 `_id: 0`을 명시해야 합니다.
    - `_id` field가 index에 포함되지 않은 경우, document를 읽어야 하기 때문입니다.


### Index Intersection

- **index intersection**은 MongoDB가 여러 index를 동시에 사용하여 query를 처리하는 기능입니다.
    - 복잡한 query에서 여러 조건을 효율적으로 처리할 수 있습니다.

```js
// 두 개의 single field index 생성
db.users.createIndex({ name: 1 });
db.users.createIndex({ age: 1 });

// MongoDB가 두 index를 동시에 사용할 수 있음
db.users.find({ name: "John", age: 30 });
```

- 대부분의 경우 compound index가 index intersection보다 성능이 우수합니다.
    - query pattern이 명확하다면 compound index를 사용하는 것이 좋습니다.


---


## Index 설계 Best Practice

- 효과적인 index 설계는 application의 성능을 크게 좌우합니다.


### ESR Rule

- **ESR Rule**은 compound index의 field 순서를 결정하는 지침입니다.
    - **E**quality : 등호 비교 조건의 field를 가장 앞에 배치합니다.
    - **S**ort : 정렬에 사용되는 field를 중간에 배치합니다.
    - **R**ange : 범위 검색 조건의 field를 마지막에 배치합니다.

```js
// 잘못된 순서
db.orders.createIndex({ date: 1, status: 1, customerId: 1 });

// ESR Rule을 따른 올바른 순서
// Equality: status, customerId / Range: date
db.orders.createIndex({ status: 1, customerId: 1, date: 1 });
```

- ESR Rule을 따르면 index의 효율성이 크게 향상됩니다.


### Query Pattern 분석

- application의 실제 query pattern을 분석하여 index를 설계해야 합니다.
    - 자주 실행되는 query와 느린 query를 파악합니다.

- MongoDB의 profiler를 활성화하여 느린 query를 기록할 수 있습니다.

```js
// profiler 활성화 (100ms 이상 걸리는 query 기록)
db.setProfilingLevel(1, { slowms: 100 });

// 기록된 느린 query 조회
db.system.profile.find().sort({ ts: -1 }).limit(10);
```

- profiler data를 분석하여 어떤 index가 필요한지 결정할 수 있습니다.


### Index 수 제한

- 각 collection에 너무 많은 index를 만들지 않도록 주의해야 합니다.
    - 일반적으로 collection당 5-10개 이내의 index를 권장합니다.

- write가 많은 collection일수록 index 수를 최소화해야 합니다.

- 정기적으로 `$indexStats`를 확인하여 사용되지 않는 index를 제거합니다.


---


## Default Index

- MongoDB는 모든 collection에 자동으로 `_id` field에 대한 unique index를 생성합니다.


### _id Index

- `_id` field는 MongoDB가 각 document를 고유하게 식별하는 기본 key입니다.
    - 모든 collection에 자동으로 생성되며 삭제할 수 없습니다.

- `_id` field의 index는 `ObjectId` 타입을 기본으로 사용합니다.
    - `ObjectId`는 생성 시간, machine 식별자, process ID, counter를 포함하는 12-byte 값입니다.

- 사용자가 명시적으로 `_id` 값을 지정할 수도 있습니다.
    - 그러나 unique 제약 조건을 위반하면 insert가 실패합니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/indexes/>
- <https://www.mongodb.com/docs/manual/core/index-compound/>
- <https://www.mongodb.com/docs/manual/applications/indexes/>
- <https://www.mongodb.com/docs/manual/tutorial/optimize-query-performance-with-indexes-and-projections/>

