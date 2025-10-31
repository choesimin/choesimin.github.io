---
layout: note
permalink: /244
title: MongoDB Replication - 고가용성과 Data 복제
description: Replication은 여러 server에 data를 복제하여 고가용성과 장애 복구를 제공합니다.
date: 2025-10-31
---


## Replication : Data 복제와 고가용성

- **replication**은 같은 data를 여러 server에 복제하여 저장하는 기능입니다.
    - 고가용성(High Availability)과 data 안정성을 제공합니다.

- MongoDB는 **replica set**을 통해 replication을 구현합니다.
    - replica set은 primary node 하나와 여러 secondary node로 구성됩니다.

- primary가 장애를 일으키면 자동으로 secondary 중 하나가 새로운 primary로 선출됩니다.


---


## Replica Set 구조

- replica set은 primary node, secondary node, member 역할 등으로 구성되며, MongoDB replication의 핵심 단위입니다.


### 기본 구성

```
         ┌─────────────┐
         │   Primary   │  ← client의 모든 write
         └──────┬──────┘
                │
        ┌───────┴───────┐
        │               │
   ┌────▼────┐     ┌────▼────┐
   │Secondary│     │Secondary│  ← Primary로부터 data 복제
   └─────────┘     └─────────┘
```

- **Primary node** : 모든 write 작업을 처리합니다.
    - client의 write 요청은 primary에서만 처리됩니다.

- **Secondary node** : primary로부터 data를 복제합니다.
    - read preference 설정 시, read 요청을 처리할 수 있습니다.


### Member 역할

- replica set의 member는 다양한 역할을 가질 수 있습니다.

| 역할 | 설명 |
| --- | --- |
| Primary | Write와 read를 처리하는 주 node |
| Secondary | Primary로부터 data를 복제하는 node |
| Arbiter | 투표에만 참여하고 data는 저장하지 않음 |
| Hidden | Data를 복제하지만 client 요청은 받지 않음 |
| Delayed | 지정된 시간만큼 지연되어 복제 |


---


## Replication 동작 원리

- replica set이 oplog를 통해 data를 복제하고, 새로운 member 추가 시 initial sync를 수행하는 방식으로 동작합니다.


### Oplog (Operation Log)

- **oplog**는 primary에서 발생한 모든 write 작업을 기록하는 capped collection입니다.
    - `local.oplog.rs` collection에 저장됩니다.

- secondary는 oplog를 읽어서 동일한 작업을 수행합니다.

```js
// oplog entry 예시
{
    ts: Timestamp(1635724800, 1),
    t: NumberLong("1"),
    h: NumberLong("1234567890"),
    v: 2,
    op: "i",  // insert
    ns: "mydb.users",
    o: { _id: ObjectId("..."), name: "Alice", age: 25 }
}
```

| Field | 설명 |
| --- | --- |
| `ts` | field: 작업 발생 시간 (Timestamp) |
| `t` | term (election term) |
| `h` | hash (oplog entry 고유 식별자) |
| `v` | version (oplog format 버전) |
| `op` | 작업 type (`i`: insert, `u`: update, `d`: delete) |
| `ns` | namespace (database.collection) |
| `o` | operation detail |


### 복제 과정

1. client가 primary에 write 요청을 보냅니다.
2. primary가 작업을 수행하고 oplog에 기록합니다.
3. secondary들이 primary의 oplog를 polling합니다.
4. secondary들이 oplog의 작업을 자신의 database에 적용합니다.
5. secondary들도 자신의 oplog에 같은 작업을 기록합니다.


### Initial Sync

- 새로운 member가 replica set에 추가되면 **initial sync**를 수행합니다.

1. 다른 member로부터 전체 data를 복사합니다.
2. Oplog를 적용하여 최신 상태로 만듭니다.
3. Secondary로 전환되어 정상 복제를 시작합니다.


---


## Replica Set 설정

- replica set을 구성하고 관리하기 위해 replica set 초기화, member 추가/제거, member 상태 확인 등의 방법을 제공합니다.


### Replica Set 초기화

```js
// mongod instance 3개를 각각 다른 port로 실행
// mongod --replSet rs0 --port 27017 --dbpath /data/db1
// mongod --replSet rs0 --port 27018 --dbpath /data/db2
// mongod --replSet rs0 --port 27019 --dbpath /data/db3

// Primary가 될 node에 접속하여 초기화
rs.initiate({
    _id: "rs0",
    members: [
        { _id: 0, host: "localhost:27017" },
        { _id: 1, host: "localhost:27018" },
        { _id: 2, host: "localhost:27019" }
    ]
})
```


### Member 추가

```js
// Secondary 추가
rs.add("localhost:27020")

// option과 함께 추가
rs.add({
    host: "localhost:27020",
    priority: 0,     // primary가 될 수 없음
    hidden: true     // client 요청 받지 않음
})
```


### Member 제거

```js
// Member 제거
rs.remove("localhost:27020")
```


### Replica Set 상태 확인

```js
// 전체 상태 확인
rs.status()

// 간략한 상태 확인
rs.isMaster()

// 설정 확인
rs.conf()
```


---


## Automatic Failover

- primary 장애 시 자동으로 새로운 primary를 선출하는 과정으로, failover 과정, election 규칙, priority 설정 등을 포함합니다.


### Failover 과정

1. primary가 응답하지 않으면 secondary들이 감지합니다.
2. secondary들이 투표를 시작합니다.
3. 과반수 투표를 받은 secondary가 새로운 primary가 됩니다.
4. client는 자동으로 새로운 primary에 연결됩니다.

```
Before Failover:
   Primary (장애)
   Secondary A
   Secondary B

Election:
   Secondary A → votes for A
   Secondary B → votes for A

After Failover:
   Primary (A) ← 새로운 primary
   Secondary (B)
   Secondary (장애 복구 대기)
```


### Election (선출)

- primary 선출은 투표를 통해 이루어집니다.

- 투표 조건에는 member, priority, oplog 등에 대한 규칙이 있습니다.
    - 과반수의 member가 투표에 참여해야 합니다.
    - 더 높은 priority를 가진 member가 우선권을 가집니다.
    - 더 최신의 oplog를 가진 member가 우선권을 가집니다.


### Priority 설정

```js
// Member의 priority 설정 (0~1000)
cfg = rs.conf()
cfg.members[0].priority = 2  // 높은 priority
cfg.members[1].priority = 1
cfg.members[2].priority = 0  // primary가 될 수 없음
rs.reconfig(cfg)
```

- priority가 0이면 primary가 될 수 없습니다.
- priority가 높을수록 primary로 선출될 가능성이 높습니다.


---


## Read Preference

- client가 어느 member에서 data를 읽을지 지정하는 설정으로, primary, primaryPreferred, secondary, secondaryPreferred, nearest 등의 mode와 tag를 사용한 read preference를 제공합니다.


### Read Preference Mode

| Mode | 설명 |
| --- | --- |
| `primary` | primary에서만 읽음 (기본값) |
| `primaryPreferred` | primary에서 읽되, 불가능하면 secondary |
| `secondary` | secondary에서만 읽음 |
| `secondaryPreferred` | secondary에서 읽되, 불가능하면 primary |
| `nearest` | network 지연이 가장 낮은 member |


### 설정 방법

```js
// Connection string에 설정
mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0&readPreference=secondary

// Code에서 설정
db.collection.find().readPref("secondary")
```


### Tag를 사용한 Read Preference

```js
// Member에 tag 설정
cfg = rs.conf()
cfg.members[0].tags = { dc: "east", usage: "production" }
cfg.members[1].tags = { dc: "west", usage: "production" }
cfg.members[2].tags = { dc: "east", usage: "reporting" }
rs.reconfig(cfg)

// Tag를 이용한 read preference
db.collection.find().readPref("secondary", [
    { dc: "east" },
    { usage: "reporting" }
])
```

- 특정 data center나 용도의 member에서 읽을 수 있습니다.


---


## Write Concern

- write 작업이 성공으로 간주되는 조건을 정의하기 위해 write concern level과 journal 설정을 사용합니다.


### Write Concern Level

| Level | 설명 |
| --- | --- |
| `w: 0` | Write 확인 안 함 (fire-and-forget) |
| `w: 1` | Primary에 write되면 성공 (기본값) |
| `w: "majority"` | 과반수 member에 복제되면 성공 |
| `w: <number>` | 지정된 개수의 member에 복제되면 성공 |

```js
// Write concern 설정
db.collection.insertOne(
    { name: "Alice" },
    { writeConcern: { w: "majority", wtimeout: 5000 } }
)
```

- `w: "majority"` : 가장 안전한 설정으로, data 손실 위험이 낮습니다.
- `wtimeout` : write 작업의 timeout (millisecond).


### Journal 설정

```js
db.collection.insertOne(
    { name: "Alice" },
    { writeConcern: { w: 1, j: true } }
)
```

- `j: true` : journal에 기록된 후에 성공으로 간주합니다.
    - 장애 시 data 손실을 방지합니다.


---


## Replica Set 특수 Member

- replica set에는 arbiter, hidden member, delayed member 등의 특별한 역할을 가진 member들이 있습니다.


### Arbiter

- **arbiter**는 투표에만 참여하고 data를 저장하지 않는 member입니다.
    - 홀수 개의 member를 유지하기 위해 사용됩니다.

```js
// Arbiter 추가
rs.addArb("localhost:27020")
```

- Arbiter는 disk 공간과 computing resource를 절약합니다.
- 그러나 production 환경에서는 권장되지 않습니다.
    - data를 저장하는 member를 추가하는 것이 더 안전합니다.


### Hidden Member

- **hidden member**는 client 요청을 받지 않지만 data를 복제합니다.
    - reporting이나 backup 용도로 사용됩니다.

```js
cfg = rs.conf()
cfg.members[2].priority = 0
cfg.members[2].hidden = true
rs.reconfig(cfg)
```

- hidden member는 `rs.isMaster()`에 나타나지 않습니다.


### Delayed Member

- **delayed member**는 지정된 시간만큼 지연되어 복제합니다.
    - 실수로 삭제된 data를 복구하는 용도로 사용됩니다.

```js
cfg = rs.conf()
cfg.members[2].priority = 0
cfg.members[2].hidden = true
cfg.members[2].slaveDelay = 3600  // 1시간 지연
rs.reconfig(cfg)
```

- 1시간 전의 data 상태를 유지합니다.


---


## Replication Lag

- **replication lag**는 primary와 secondary 간의 data 동기화 지연으로, lag 확인, 발생 원인, 해결 방법 등을 포함합니다.


### Lag 확인

```js
// Replication 상태 확인
rs.printSlaveReplicationInfo()

// 또는
rs.status().members.forEach(m => {
    print(m.name + ": " + m.optimeDate);
})
```


### Lag 발생 원인

- **network 지연** : primary와 secondary 간 network가 느린 경우.
- **secondary 성능 부족** : secondary의 hardware 성능이 낮은 경우.
- **과도한 write 부하** : primary의 write 속도가 너무 빠른 경우.
- **index 부족** : secondary에서 작업 적용 시 index가 없어 느린 경우.


### Lag 해결 방법

- **hardware 업그레이드** : secondary의 CPU, memory, disk 성능 향상.
- **network 개선** : primary와 secondary 간 network 대역폭 증가.
- **write 속도 조절** : application에서 write 속도를 제한.
- **index 최적화** : 필요한 index를 모든 member에 생성.


---


## Replica Set Monitoring

- replica set의 상태를 monitoring하기 위해 상태 확인 명령어와 주요 monitoring 지표를 사용합니다.


### 상태 확인 명령어

```js
// 전체 상태
rs.status()

// Primary 확인
db.isMaster()

// Oplog 크기 확인
db.getReplicationInfo()

// Secondary 복제 상태
rs.printSlaveReplicationInfo()
```


### 주요 Monitoring 지표

| 지표 | 설명 |
| --- | --- |
| Replication lag | primary와 secondary 간 지연 시간 |
| Oplog window | oplog가 커버하는 시간 범위 |
| Member state | 각 member의 상태 (PRIMARY, SECONDARY 등) |
| Election count | election 발생 횟수 |
| Network traffic | member 간 network 사용량 |


---


## Replica Set Best Practice

- replica set을 운영할 때 홀수 개의 member 유지, 적절한 write concern 사용, 충분한 oplog 크기 설정, 지리적 분산 배치, 정기적인 backup 등의 권장 사항을 따릅니다.


### 홀수 개의 Member 유지

- 과반수 투표를 위해 홀수 개의 voting member를 유지합니다.
    - 3, 5, 7개 등.

- 짝수 개면 network partition 시 primary 선출이 어려울 수 있습니다.


### 적절한 Write Concern 사용

- 중요한 data는 `w: "majority"` 사용을 권장합니다.
    - Data 손실 위험을 최소화합니다.

```js
db.collection.insertOne(
    { /* document */ },
    { writeConcern: { w: "majority" } }
)
```


### 충분한 Oplog 크기 설정

- oplog 크기는 peak write 부하를 커버할 수 있어야 합니다.
    - 최소 24시간, 권장 72시간 이상의 작업을 저장할 수 있어야 합니다.

```js
// oplog 정보 확인
db.getReplicationInfo()
```


### 지리적으로 분산 배치

- primary와 secondary를 서로 다른 data center에 배치합니다.
    - 한 data center 장애 시에도 service 지속 가능.

```js
cfg = rs.conf()
cfg.members[0].tags = { dc: "dc1" }
cfg.members[1].tags = { dc: "dc2" }
cfg.members[2].tags = { dc: "dc3" }
rs.reconfig(cfg)
```


### 정기적인 Backup

- replication은 backup을 대체하지 않습니다.
    - 실수나 악의적 삭제로부터 보호하기 위해 별도 backup 필요.


---


## Reference

- <https://www.mongodb.com/docs/manual/replication/>
- <https://www.mongodb.com/docs/manual/core/replica-set-members/>
- <https://www.mongodb.com/docs/manual/core/replica-set-elections/>
- <https://www.mongodb.com/docs/manual/reference/read-preference/>

