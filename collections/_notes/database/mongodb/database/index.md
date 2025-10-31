---
layout: note
permalink: /241
title: MongoDB Database - Collection을 담는 최상위 Container
description: Database는 MongoDB에서 collection을 grouping하여 관리하는 최상위 단위입니다.
date: 2025-10-31
---


## Database : Collection의 Container

- **database**는 MongoDB에서 collection을 grouping하여 관리하는 최상위 단위입니다.
    - 관계형 database system의 database(또는 schema)에 해당합니다.

- 하나의 MongoDB server는 여러 database를 가질 수 있습니다.
    - 각 database는 독립적으로 관리되며, 별도의 file로 저장됩니다.

- database는 여러 collection을 포함하며, collection은 여러 document를 포함합니다.


---


## Database 구조

- MongoDB의 data 계층 구조는 database, collection, document로 구성됩니다.


### 계층 구조

```
MongoDB Server
├── Database 1
│   ├── Collection A
│   │   ├── Document 1
│   │   ├── Document 2
│   │   └── Document 3
│   └── Collection B
│       └── Document 4
├── Database 2
│   └── Collection C
│       └── Document 5
└── Database 3
```

- **Server** : MongoDB instance가 실행되는 단위입니다.
- **Database** : collection을 grouping하는 논리적 단위입니다.
- **Collection** : document를 grouping하는 단위입니다.
- **Document** : 실제 data를 저장하는 기본 단위입니다.


### 기본 Database

- MongoDB는 기본적으로 system database를 제공합니다.

| Database | 설명 |
| --- | --- |
| `admin` | 인증 및 권한 관리를 위한 database |
| `local` | replication에 사용되는 data를 저장하는 database |
| `config` | sharded cluster의 metadata를 저장하는 database |

- 이들 system database는 MongoDB 내부에서 사용되므로, 직접 수정하지 않는 것이 좋습니다.


---


## Database 명명 규칙

- database 이름은 특정 규칙을 따라야 합니다.


### 기본 규칙

- 빈 문자열("")은 사용할 수 없습니다.

- 특정 특수 문자를 포함할 수 없습니다.
    - slash `/`.
    - backslash `\`.
    - dot `.`.
    - double quote `"`.
    - dollar sign `$`.
    - 공백(space) ` `.
    - `null` 문자 `\0`.

- database 이름은 대소문자를 구분합니다.
    - `MyDB`와 `mydb`는 서로 다른 database입니다.

- Windows에서는 최대 64자, Linux/macOS에서는 최대 128자까지 사용할 수 있습니다.


### 권장 사항

- 소문자만 사용합니다.
    - 대소문자를 구분하므로 혼란을 피하기 위해 소문자만 사용하는 것이 좋습니다.

- 의미 있고 명확한 이름을 사용합니다.
    - `myapp`, `blog`, `ecommerce` 등.

- snake_case를 사용합니다.
    - `my_app`, `user_service` 등.


---


## Database 작업

- database를 조회, 생성, 사용, 삭제하는 기본 작업이 있습니다.


### Database 조회

```js
// 모든 database 목록 조회
show dbs

// 또는
show databases

// 현재 사용 중인 database 확인
db

// 현재 database의 이름 조회
db.getName()
```

- `show dbs`는 server의 모든 database를 나열합니다.
    - 단, 최소 하나 이상의 collection이 있는 database만 표시됩니다.

- `db`는 현재 선택된 database를 반환합니다.


### Database 생성 및 사용

```js
// database 선택 (없으면 생성)
use mydb
```

- `use` 명령어는 database가 존재하지 않으면 생성하고, 존재하면 선택합니다.

- database는 첫 document가 삽입될 때까지 실제로 생성되지 않습니다.
    - `use` 명령만으로는 `show dbs`에 나타나지 않습니다.

```js
// mydb database 선택
use mydb

// collection과 document 생성 (이때 database가 실제 생성됨)
db.users.insertOne({ name: "Alice" })

// 이제 show dbs에 mydb가 표시됨
show dbs
```


### Database 삭제

```js
// 삭제할 database 선택
use mydb

// 현재 database 삭제
db.dropDatabase()
```

- `db.dropDatabase()`는 현재 선택된 database와 그 안의 모든 collection, document, index를 삭제합니다.

- 삭제된 database는 복구할 수 없으므로 주의해야 합니다.


### Database 통계 조회

```js
// 현재 database의 통계 정보 조회
db.stats()

// 또는
db.stats(1024 * 1024)  // MB 단위로 표시
```

- `db.stats()`는 database 크기, collection 개수, index 크기 등의 정보를 반환합니다.


---


## Database 권한 관리

- MongoDB는 database별로 사용자 권한을 관리할 수 있습니다.


### 사용자 생성

```js
// admin database로 전환
use admin

// 관리자 사용자 생성
db.createUser({
    user: "admin",
    pwd: "password123",
    roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        { role: "readWriteAnyDatabase", db: "admin" }
    ]
})

// 특정 database 사용자 생성
use mydb
db.createUser({
    user: "myapp",
    pwd: "password123",
    roles: [
        { role: "readWrite", db: "mydb" }
    ]
})
```

- `admin` database에서 전체 system의 사용자를 관리할 수 있습니다.

- 각 database별로 사용자를 생성하고 권한을 부여할 수 있습니다.


### 주요 Role

| Role | 설명 |
| --- | --- |
| `read` | database의 모든 collection을 읽을 수 있음 |
| `readWrite` | database의 모든 collection을 읽고 쓸 수 있음 |
| `dbAdmin` | database 관리 작업 수행 (index 생성, 통계 조회 등) |
| `userAdmin` | database의 사용자 및 권한 관리 |
| `dbOwner` | database의 모든 권한 (read, readWrite, dbAdmin, userAdmin) |
| `readAnyDatabase` | 모든 database 읽기 (`admin` database에만 적용) |
| `readWriteAnyDatabase` | 모든 database 읽기/쓰기 (`admin` database에만 적용) |
| `userAdminAnyDatabase` | 모든 database의 사용자 관리 (`admin` database에만 적용) |
| `dbAdminAnyDatabase` | 모든 database 관리 (`admin` database에만 적용) |


### 사용자 조회 및 삭제

```js
// 현재 database의 사용자 조회
db.getUsers()

// 특정 사용자 삭제
db.dropUser("myapp")
```


---


## Database 설정

- database에 다양한 설정을 적용할 수 있습니다.


### Read/Write Concern

- **write concern** : write 작업의 성공 기준을 정의합니다.

```js
// write concern 설정
db.users.insertOne(
    { name: "Alice" },
    { writeConcern: { w: "majority", wtimeout: 5000 } }
)
```

- `w: "majority"` : replica set의 과반수 node에 복제되면 성공으로 간주합니다.
- `wtimeout` : write 작업의 timeout을 millisecond 단위로 지정합니다.


- **read concern** : read 작업의 격리 수준을 정의합니다.

```js
// read concern 설정
db.users.find().readConcern("majority")
```

- `local` : 최신 data를 읽지만, rollback될 수 있습니다. (기본값)
- `majority` : 과반수 node에 복제된 data만 읽습니다.
- `linearizable` : 가장 최신의 data를 읽으며, 강력한 일관성을 보장합니다.


### Profiler 설정

```js
// profiler 활성화 (느린 query 기록)
db.setProfilingLevel(1, { slowms: 100 })

// profiler 조회
db.getProfilingStatus()

// profiler data 조회
db.system.profile.find().limit(10).sort({ ts: -1 })
```

- profiling level은 `0`, `1`, `2` 중 하나로 설정할 수 있습니다.
    - `0` : profiling 비활성화 (기본값).
    - `1` : 느린 작업만 기록 (`slowms` 기준).
    - `2` : 모든 작업 기록.


---


## Database Backup 및 복원

- MongoDB는 다양한 방법으로 database를 backup하고 복원할 수 있습니다.


### mongodump를 사용한 Backup

```bash
# 전체 database backup
mongodump --out /backup

# 특정 database backup
mongodump --db mydb --out /backup

# 특정 collection backup
mongodump --db mydb --collection users --out /backup
```

- `mongodump`는 BSON 형식으로 data를 내보냅니다.


### mongorestore를 사용한 복원

```bash
# 전체 database 복원
mongorestore /backup

# 특정 database 복원
mongorestore --db mydb /backup/mydb

# 특정 collection 복원
mongorestore --db mydb --collection users /backup/mydb/users.bson
```


### mongoexport/mongoimport를 사용한 backup

```bash
# JSON/CSV 형식으로 export
mongoexport --db mydb --collection users --out users.json

# JSON/CSV 형식으로 import
mongoimport --db mydb --collection users --file users.json
```

- `mongoexport`/`mongoimport`는 JSON 또는 CSV 형식을 사용합니다.
    - 사람이 읽기 쉽지만, 일부 BSON type이 손실될 수 있습니다.


---


## Database 성능 최적화

- database를 효율적으로 사용하기 위한 전략을 적용할 수 있습니다.


### 적절한 Database 분리

- 용도별로 database를 분리합니다.
    - production, staging, development 환경별로 database를 분리합니다.
    - 서로 다른 application은 별도의 database를 사용합니다.

- 분리를 통해 여러가지 이점을 얻을 수 있습니다.
    - 권한 관리가 용이합니다.
    - backup 및 복구가 독립적으로 가능합니다.
    - 성능 문제 격리가 쉽습니다.


### Storage Engine 선택

- MongoDB는 여러 storage engine을 지원합니다.
    - **WiredTiger** : 기본 storage engine, 압축과 동시성 제어 지원.
    - **In-Memory** : 모든 data를 memory에 저장, 매우 빠른 성능.

```js
// database 생성 시 storage engine 지정 (server 시작 시 설정)
mongod --storageEngine wiredTiger
```


### Oplog 크기 관리

- replication을 사용하는 경우 oplog 크기를 적절히 설정합니다.
    - oplog는 replica set의 변경 사항을 기록하는 capped collection입니다.

```js
// oplog 크기 조회
use local
db.oplog.rs.stats()
```


---


## Reference

- <https://www.mongodb.com/docs/manual/core/databases-and-collections/>
- <https://www.mongodb.com/docs/manual/reference/method/db.createUser/>
- <https://www.mongodb.com/docs/manual/reference/built-in-roles/>
- <https://www.mongodb.com/docs/manual/tutorial/backup-and-restore-tools/>

