---
layout: note
permalink: /245
title: MongoDB Sharding - 수평적 확장과 분산 저장
description: Sharding은 대용량 data를 여러 server에 분산하여 저장하고 처리하는 기술입니다.
date: 2025-10-31
---


## Sharding : 수평적 확장

- **sharding**은 data를 여러 server(shard)에 분산하여 저장하는 수평적 확장 기법입니다.
    - 단일 server의 한계를 넘어 무한대로 확장할 수 있습니다.

- MongoDB는 자동으로 data를 분산하고 query를 routing합니다.
    - application은 sharding을 의식하지 않고 단일 database처럼 사용할 수 있습니다.

- sharding은 대용량 data와 높은 throughput이 필요한 경우 사용됩니다.


---


## Sharding Architecture

- sharded cluster는 mongos(query router), shard(data 저장), config server(metadata 저장) 등의 여러 component로 구성됩니다.


### Component 구성

```
                ┌─────────────┐
                │   mongos    │  ← Client 연결점, Query Router
                └──────┬──────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
   │ Shard 1 │    │ Shard 2 │    │ Shard 3 │  ← Data 저장
   │(Replica │    │(Replica │    │(Replica │
   │  Set)   │    │  Set)   │    │  Set)   │
   └─────────┘    └─────────┘    └─────────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
                ┌──────▼───────┐
                │Config Servers│  ← Metadata 저장
                │ (Replica Set)│
                └──────────────┘
```


### mongos (Query Router)

- **mongos**는 client의 진입점 역할을 하는 routing process입니다.
    - client 요청을 받아 적절한 shard로 전달합니다.

- 여러 mongos instance를 실행하여 고가용성을 확보할 수 있습니다.

```bash
# mongos 실행
mongos --configdb configReplSet/localhost:27019,localhost:27020,localhost:27021
```


### Shard

- **shard**는 실제 data를 저장하는 MongoDB instance 또는 replica set입니다.
    - 각 shard는 전체 data의 일부분(subset)을 저장합니다.

- production 환경에서는 각 shard를 replica set로 구성합니다.
    - 고가용성과 data 안정성을 보장합니다.


### Config Server

- **config server**는 sharded cluster의 metadata를 저장합니다.
    - Shard key 범위, chunk 위치, cluster 설정 등.

- config server는 반드시 replica set으로 구성되어야 합니다.
    - metadata 손실은 cluster 전체의 장애로 이어집니다.


---


## Shard Key

- **shard key**는 data를 분산하는 기준이 되는 field로, shard key 선택, cardinality, frequency, monotonically changing, hashed shard key, compound shard key 등의 개념이 있습니다.


### Shard Key 선택

```js
// users collection을 userId로 sharding
sh.shardCollection("mydb.users", { userId: 1 })

// orders collection을 customerId와 orderDate로 sharding
sh.shardCollection("mydb.orders", { customerId: 1, orderDate: 1 })
```

- shard key는 collection의 모든 document에 존재해야 합니다.
- shard key는 index되어 있어야 합니다.
- shard key는 변경할 수 없습니다. (MongoDB 4.2 이상에서는 일부 변경 가능)


### 좋은 Shard Key 특성

1. High Cardinality : shard key 값의 종류가 많아야 합니다.
    - shard key로 사용하기에 `userId`는 좋고, `country`는 안 좋습니다.

```js
// 나쁜 예 : cardinality가 낮음
sh.shardCollection("mydb.users", { status: 1 })  // "active", "inactive" 두 값만

// 좋은 예 : cardinality가 높음
sh.shardCollection("mydb.users", { userId: 1 })  // 수백만 개의 고유 값
```

2. Low Frequency (낮은 빈도) : 특정 shard key 값이 너무 자주 나타나지 않아야 합니다.
    - data가 특정 shard에 집중되는 것을 방지합니다.

3. Non-Monotonically Changing (비단조 증가) : shard key 값이 순차적으로 증가하면 안 됩니다.
    - `_id`, `timestamp`는 단독 사용하면 좋지 않습니다.

```js
// 나쁜 예 : _id는 계속 증가
sh.shardCollection("mydb.users", { _id: 1 })
// → 모든 새 document가 마지막 shard에만 삽입됨

// 좋은 예 : hashed shard key 사용
sh.shardCollection("mydb.users", { _id: "hashed" })
// → document가 균등하게 분산됨
```


### Hashed Shard Key

```js
// Hashed shard key 생성
sh.shardCollection("mydb.users", { _id: "hashed" })
```

- shard key 값의 hash를 기준으로 분산합니다.
    - data가 균등하게 분산됩니다.

- 단, 범위 query는 비효율적입니다.
    - 모든 shard를 검색해야 합니다.


### Compound Shard Key

```js
// 복합 shard key
sh.shardCollection("mydb.orders", { customerId: 1, orderDate: 1 })
```

- 여러 field를 조합하여 shard key를 만들 수 있습니다.
    - 더 나은 분산과 query 성능을 달성할 수 있습니다.


---


## Chunk

- **chunk**는 연속된 shard key 범위의 data 집합으로, chunk split, chunk migration, balancer 제어 등의 개념이 있습니다.


### Chunk 개념

```
Shard 1:
  Chunk A: userId [0, 1000)
  Chunk B: userId [1000, 2000)

Shard 2:
  Chunk C: userId [2000, 3000)
  Chunk D: userId [3000, 4000)
```

- 각 chunk는 기본적으로 64MB입니다.
    - `chunkSize` 설정으로 변경 가능합니다.
        - 1MB ~ 1024MB.

- chunk가 너무 커지면 자동으로 split됩니다.


### Chunk Split

```js
// Chunk가 64MB를 초과하면 자동 split
Chunk A: [0, 2000) → Split → Chunk A1: [0, 1000)
                             Chunk A2: [1000, 2000)
```

- split은 metadata만 변경하므로 빠릅니다.
    - 실제 data 이동은 없습니다.


### Chunk Migration (Balancing)

- **balancer**는 shard 간 chunk를 이동하여 균형을 맞춥니다.

```
Before Balancing:
  Shard 1: 10 chunks
  Shard 2: 3 chunks

After Balancing:
  Shard 1: 6-7 chunks
  Shard 2: 6-7 chunks
```

- balancer는 background에서 자동으로 실행됩니다.
- chunk 이동 중에도 read/write 작업이 가능합니다.


### Balancer 제어

```js
// balancer 상태 확인
sh.getBalancerState()

// balancer 중지
sh.stopBalancer()

// balancer 시작
sh.startBalancer()

// balancing window 설정 (특정 시간대에만 실행)
db.settings.update(
    { _id: "balancer" },
    { $set: { activeWindow: { start: "23:00", stop: "06:00" } } },
    { upsert: true }
)
```


---


## Sharded Collection 생성

- collection을 sharding하는 과정으로 sharding 활성화와 sharding 전략 선택을 포함합니다.


### Sharding 활성화

```js
// 1. database에 sharding 활성화
sh.enableSharding("mydb")

// 2. shard key에 index 생성
db.users.createIndex({ userId: 1 })

// 3. collection sharding
sh.shardCollection("mydb.users", { userId: 1 })
```


### Sharding 전략 선택

```js
// range-based sharding (범위 기반)
sh.shardCollection("mydb.orders", { orderDate: 1 })

// hash-based sharding (hash 기반)
sh.shardCollection("mydb.users", { _id: "hashed" })

// compound shard key
sh.shardCollection("mydb.events", { userId: 1, timestamp: 1 })
```


---


## Query Routing

- mongos가 query를 적절한 shard로 routing하는 방식으로, targeted query, broadcast query, query 최적화 등의 방법이 있습니다.


### Targeted Query

```js
// shard key를 포함한 query → 특정 shard만 검색
db.users.find({ userId: 12345 })
```

- shard key를 포함하면 mongos가 정확히 어느 shard에 data가 있는지 알 수 있습니다.
    - 한 개 또는 소수의 shard만 검색합니다.


### Broadcast Query

```js
// shard key를 포함하지 않은 query → 모든 shard 검색
db.users.find({ name: "Alice" })
```

- shard key가 없으면 mongos가 모든 shard에 query를 broadcast합니다.
    - 성능이 저하될 수 있습니다.


### Query 최적화

```js
// 좋은 예 : shard key 포함
db.orders.find({ customerId: 12345, status: "pending" })

// 나쁜 예 : shard key 없음
db.orders.find({ status: "pending" })
```

- 가능한 한 query에 shard key를 포함해야 합니다.


---


## Zone Sharding

- **zone sharding**은 특정 shard key 범위를 특정 shard에 할당하는 기능으로, zone 설정과 zone sharding 사용 사례를 포함합니다.


### Zone 설정

```js
// shard에 tag 추가
sh.addShardTag("shard0000", "US")
sh.addShardTag("shard0001", "EU")

// zone 범위 정의
sh.addTagRange(
    "mydb.users",
    { country: "US", userId: MinKey },
    { country: "US", userId: MaxKey },
    "US"
)

sh.addTagRange(
    "mydb.users",
    { country: "EU", userId: MinKey },
    { country: "EU", userId: MaxKey },
    "EU"
)
```


### Zone Sharding 사용 사례

- **지리적 분산** : 특정 지역의 data를 해당 지역의 data center에 저장합니다.
    - 지연 시간을 줄이고 규정을 준수할 수 있습니다.

- **Hardware 계층화**  : 최신 data는 SSD shard에, 오래된 data는 HDD shard에 저장합니다.

- **Multi-tenancy** : 각 tenant의 data를 별도 shard에 격리합니다.


---


## Sharding 성능 최적화

- sharded cluster의 성능을 향상시키기 위해 적절한 shard key 선택, mongos와 application 배치, chunk 크기 조정, index 전략, balancing window 설정 등의 전략을 적용합니다.


### 적절한 Shard Key 선택

- shard key는 성능의 핵심입니다.
    - 신중하게 선택하고, 변경하기 어려우므로 초기 설계가 중요합니다.


### mongos와 Application 배치

- mongos를 application server와 같은 위치에 배치합니다.
    - network 지연을 최소화합니다.

```
Application Server 1 → mongos 1 → Sharded Cluster
Application Server 2 → mongos 2 → Sharded Cluster
```


### Chunk Size 조정

```js
// Chunk 크기 변경 (MB 단위)
db.settings.save({ _id: "chunksize", value: 128 })
```

- 기본값은 64MB입니다.
- write가 많으면 크게, read가 많으면 작게 설정합니다.


### Index 전략

- 모든 shard에 동일한 index를 생성합니다.
    - 특히 shard key와 자주 query되는 field에 index를 생성합니다.

```js
// 모든 shard에 index 생성
db.users.createIndex({ email: 1 })
```


### Balancing Window 설정

- peak 시간을 피해 balancing을 실행합니다.
    - 야간이나 traffic이 낮은 시간대를 선택합니다.


---


## Sharding Monitoring

- sharded cluster를 monitoring하기 위해 기본 상태 확인, chunk 분포 확인, balancer monitoring, 성능 지표 등을 사용합니다.


### 기본 상태 확인

```js
// sharding 상태 확인
sh.status()

// database 목록
db.admincommand({ listdatabases: 1 })

// collection sharding 정보
db.collection.getsharddistribution()
```


### Chunk 분포 확인

```js
// collection의 chunk 분포
db.chunks.aggregate([
    { $group: { _id: "$shard", count: { $sum: 1 } } }
])
```


### Balancer Monitoring

```js
// balancer 실행 여부
sh.isBalancerRunning()

// 최근 balancing 활동
db.settings.find({ _id: "balancer" })
```


### 성능 지표

| 지표 | 설명 |
| --- | --- |
| chunk distribution | 각 shard의 chunk 개수 균형 |
| data size per shard | 각 shard의 data 크기 |
| query targeting ratio | targeted query와 broadcast query 비율 |
| balancer activity | chunk migration 빈도와 시간 |


---


## Sharding Best Practice

- sharded cluster 운영 시 shard를 replica set으로 구성, config server는 별도 hardware 사용, 충분한 shard 수 유지, pre-splitting, 정기적인 monitoring 등의 권장 사항을 따릅니다.


### Shard를 Replica Set으로 구성

- 모든 shard를 replica set으로 구성합니다.
    - 고가용성과 data 안정성을 보장합니다.


### Config Server는 별도 Hardware

- config server는 전용 hardware에 배치합니다.
    - metadata 손실은 cluster 전체 장애로 이어집니다.


### 충분한 Shard 수

- 최소 3개 이상의 shard를 권장합니다.
    - 2개는 균형 잡기가 어렵습니다.


### Pre-splitting

- 대량 data를 삽입하기 전에 chunk를 미리 split합니다.

```js
// 초기 chunk split
for (var i = 0; i < 100; i++) {
    sh.splitAt("mydb.users", { userId: i * 10000 })
}
```


### 정기적인 Monitoring

- shard 간 불균형을 주시합니다.
    - 필요시 shard key를 재평가합니다.


---


## Sharding vs Replication

- sharding과 replication은 서로 다른 목적을 가지며, production 환경에서는 두 기술을 함께 사용합니다.


### 목적의 차이

| 특징 | Replication | Sharding |
| --- | --- | --- |
| 목적 | 고가용성, data 안정성 | 수평적 확장, 대용량 처리 |
| Data 분산 | 모든 node가 전체 data 보유 | 각 shard가 일부 data 보유 |
| 확장성 | 수직적 확장 (read 분산) | 수평적 확장 (read/write 분산) |


### 함께 사용

```
Sharded Cluster with Replication:

Shard 1 (Replica Set):     Shard 2 (Replica Set):
  Primary                    Primary
  Secondary                  Secondary
  Secondary                  Secondary
```

- production 환경에서는 sharding과 replication을 함께 사용합니다.
    - sharding으로 확장성, replication으로 가용성 확보.


---


## Reference

- <https://www.mongodb.com/docs/manual/sharding/>
- <https://www.mongodb.com/docs/manual/core/sharded-cluster-components/>
- <https://www.mongodb.com/docs/manual/core/sharding-shard-key/>
- <https://www.mongodb.com/docs/manual/tutorial/deploy-shard-cluster/>

