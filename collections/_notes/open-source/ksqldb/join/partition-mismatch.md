---
layout: note
permalink: /272
title: ksqlDB Join의 Partition 수 일치 요구 조건
description: ksqlDB에서 Stream과 Table을 Join할 때 partition 수가 다르면 Join이 실패하게 됩니다.
date: 2025-11-20
---


## ksqlDB Join과 Partition 수 일치 조건

- ksqlDB에서 Stream이나 Table을 Join할 때 **두 data source는 반드시 동일한 수의 partition을 가져야** 합니다.
    - 이 조건을 만족하지 않으면 Join query는 실패합니다.
    - ksqlDB의 Join mechanism이 partition 기반으로 동작하기 때문에 동일한 partition 수를 요구합니다.


---


## partition의 개념

- partition은 **kafka topic의 data를 분산 저장하기 위한 논리적 단위**입니다.
    - kafka는 message들을 여러 partition에 분산하여 저장하며, 각 partition은 순서가 보장되는 message queue입니다.
    - 각 partition은 순차적으로 번호가 매겨집니다. (partition 0, partition 1, partition 2, ...)

- partition의 핵심 특성입니다.
    - **순서 보장** : 한 partition 내의 message는 저장된 순서대로 처리됩니다.
    - **분산 처리** : 여러 partition이 있으면 병렬로 처리할 수 있습니다.
    - **key 기반 분배** : message의 key로 결정되는 partition에 저장됩니다.
        - 동일한 key를 가진 모든 message는 **동일한 partition에 저장**됩니다.

- partition 수는 topic 생성 시 결정되며, 나중에 변경할 수 있습니다.
    - 각 Stream/Table은 kafka topic을 기반으로 하므로, ksqlDB의 Stream/Table도 topic과 동일한 partition 수를 가집니다.


---


## ksqlDB Join과 Partition의 역할

- ksqlDB Join은 **key 기반으로 동작**합니다.
    - Join 조건 `ON stream1.id = stream2.id`에서 `id`를 **Join key**라고 부릅니다.
    - Join이 성공하려면, **같은 id를 가진 record들이 같은 partition에 위치**해야 합니다.

- **같은 Join key를 가진 record들이 같은 partition에 있어야 하는 이유**입니다.
    - ksqlDB는 각 partition을 독립적으로 처리합니다.
    - partition 0에서 처리 중인 stream1의 record A (id=100)와 stream2의 record B (id=100)를 Join하려면, 둘 다 partition 0에 있어야 합니다.
    - 만약 stream1의 record A는 partition 0에, stream2의 record B는 partition 1에 있다면, 같은 partition에서 처리되지 않으므로 Join할 수 없습니다.

- **두 source의 partition 수가 다르면 문제가 발생**합니다.
    - stream1이 3개 partition을 가지고 stream2가 6개 partition을 가지는 상황을 생각해봅시다.
    - stream1의 id=100은 `hash(100) % 3 = partition 1`로 분배됩니다.
    - stream2의 id=100은 `hash(100) % 6 = partition 4`로 분배될 가능성이 높습니다.
    - (hash function 결과가 다른 modulo 값으로 계산되므로)
    - 결과적으로 같은 id를 가진 record들이 다른 partition에 위치하게 되어 Join이 불가능합니다.


---


## Partition 수 불일치로 인한 문제

- partition 수 불일치는 **Join key 기반 분배의 핵심 mechanism을 무너뜨립니다.**


### 문제 상황

```sql
-- stream1 : 3개 partition
CREATE STREAM orders (
    order_id VARCHAR KEY,
    user_id VARCHAR,
    order_time TIMESTAMP
) WITH (
    kafka_topic='orders',
    value_format='json',
    partitions=3
);

-- stream2 : 6개 partition
CREATE STREAM shipments (
    shipment_id VARCHAR KEY,
    order_id VARCHAR,
    status VARCHAR,
    shipment_time TIMESTAMP
) WITH (
    kafka_topic='shipments',
    value_format='json',
    partitions=6
);

-- Join이 실패합니다!
CREATE STREAM order_shipments AS
SELECT
    o.order_id,
    s.status
FROM orders o
    INNER JOIN shipments s
    WITHIN 1 HOUR
    ON o.order_id = s.order_id
EMIT CHANGES;
```

- 위 query는 실행 시 error를 발생시킵니다.
    - 또는 실행되더라도 예상한 대로 record들이 join되지 않을 수 있습니다.
    - ksqlDB는 partition 수 불일치를 감지하고 query를 거부합니다.


### Join 실패 원인

- **hash-based partitioning의 한계**입니다.
    - kafka는 key의 hash 값을 partition 수로 나눈 나머지로 partition을 결정합니다.
    - 두 source의 partition 수가 다르면, 같은 key라도 다른 partition에 저장될 수 있습니다.

```plaintext
stream1 (3 partitions):
order_id='ORD-001' → hash(ORD-001) % 3 = partition 1
order_id='ORD-002' → hash(ORD-002) % 3 = partition 2
order_id='ORD-003' → hash(ORD-003) % 3 = partition 0

stream2 (6 partitions):
order_id='ORD-001' → hash(ORD-001) % 6 = partition 4
order_id='ORD-002' → hash(ORD-002) % 6 = partition 5
order_id='ORD-003' → hash(ORD-003) % 6 = partition 3

결과: 같은 order_id를 가진 record들이 다른 partition에 위치
```

- **Join 처리의 분산 특성**입니다.
    - ksqlDB의 worker process들은 각 partition을 독립적으로 처리합니다.
    - partition 1을 처리하는 worker는 stream1의 partition 1과 stream2의 partition 1만 접근합니다.
    - stream1의 partition 1에 있는 record를 stream2의 partition 4나 5와 Join할 수 없습니다.


---


## Partition 분배 전략

- partition 수가 같아도 분배 전략이 다르면 문제가 발생할 수 있습니다.
    - 예를 들어, stream1은 kafka default hash algorithm을 사용하고, stream2는 custom partition strategy를 사용하는 경우입니다.
    - 두 source가 동일한 partition 수를 가지더라도, 같은 key에 대해 다른 partition 할당이 될 수 있습니다.

- **동일한 hash algorithm 사용이 중요**합니다.
    - kafka의 default partitioner인 `DefaultPartitioner`는 `murmur2` hash를 사용합니다.
    - 두 producer가 동일한 hash algorithm을 사용해야 같은 key가 같은 partition에 저장됩니다.
    - custom partitioner를 사용하는 경우, 반드시 동일한 로직을 양쪽 source에 적용해야 합니다.


---


## 해결 방법 : Repartition

- partition 수가 다른 경우, **repartition을 통해 한쪽 source의 partition 수를 다른 쪽과 일치**시킬 수 있습니다.


### 기존 Partition Key 유지하며 Partition 수 조정

```sql
CREATE STREAM shipments_repartitioned
    WITH (PARTITIONS=3) AS
    SELECT *
    FROM shipments;
```

- `shipments`의 partition 수를 3으로 변경하면서, 기존 partition key를 그대로 유지합니다.
- `PARTITION BY` 절을 생략하면 기존 key로 repartition됩니다.
- 이제 `orders`와 `shipments_repartitioned` 모두 3개 partition을 가지므로 Join이 가능합니다.


### 새로운 Partition Key 지정 (기본)

```sql
CREATE STREAM shipments_repartitioned
    WITH (PARTITIONS=3) AS
    SELECT *
    FROM shipments
    PARTITION BY order_id;
```

- 새로운 partition key(`order_id`)를 명시적으로 지정합니다.
- Join 조건의 key와 동일한 column을 partition key로 사용합니다.
- 다만 `order_id`가 null인 경우, 예측 불가능한 partition에 할당될 수 있습니다.


### 새로운 Partition Key 지정 (권장)

```sql
CREATE STREAM shipments_repartitioned
    WITH (PARTITIONS=3) AS
    SELECT *
    FROM shipments
    PARTITION BY COALESCE(order_id, 'unknown');
```

- `COALESCE` 함수를 사용하여 null 값을 처리합니다.
- `order_id`가 null이면 'unknown'으로 대체하여 일관된 partitioning을 보장합니다.
- 이 방법이 **null handling 측면에서 가장 안전**합니다.


### 실제 적용 예제

```sql
-- 원래 설정 : orders (3 partitions), shipments (6 partitions)
-- 문제 : partition 수가 다르므로 Join 불가능

-- Step 1. shipments를 orders와 동일한 partition 수로 repartition
CREATE STREAM shipments_repartitioned
    WITH (PARTITIONS=3) AS
    SELECT *
    FROM shipments
    PARTITION BY COALESCE(order_id, 'unknown');

-- Step 2. 이제 동일한 partition 수이므로 Join 가능
CREATE STREAM order_shipments AS
SELECT
    o.order_id,
    o.user_id,
    o.order_time,
    s.status,
    s.shipment_time
FROM orders o
    INNER JOIN shipments_repartitioned s
    WITHIN 1 HOUR
    ON o.order_id = s.order_id
EMIT CHANGES;
```


---


## Repartition 고려 사항

- repartition은 **추가 shuffling 과정이 필요**합니다.
    - 따라서 처리 지연이 증가합니다.
    - 가능하면 upstream에서 미리 동일한 partition 수를 가지도록 설정하는 것이 좋습니다.

- repartition은 **intermediate data를 유지**해야 합니다.
    - 이로 인해 memory 사용량이 증가합니다.

- 추가적인 **compute resource가 필요**합니다.
    - processing cost가 증가하므로, 특히 높은 throughput의 stream을 repartition하는 경우 주의가 필요합니다.

- repartition 후의 **partition 수는 신중하게 선택**해야 합니다.
    - 일반적으로 throughput이 더 높은 source의 partition 수에 맞추는 것이 좋습니다.
    - 또는 두 source의 partition 수의 최소공배수(LCM)를 사용하는 것도 방법입니다.


---


## 설계 단계에서의 예방

- 여러 kafka topic을 생성할 때, **나중에 Join할 예정이라면 미리 동일한 partition 수로 설정**합니다.
    - upstream에서 일관된 partition 수를 유지하면 repartition의 필요성을 줄일 수 있습니다.

- topic의 **partition 수 변경은 신중**해야 합니다.
    - 나중에 partition 수를 변경하면, 기존 data의 partition 할당이 변경되지 않습니다.
    - 따라서 새로 들어오는 data와 기존 data의 분배 전략이 달라질 수 있습니다.

- **replication factor와 partition의 균형**을 고려합니다.
    - partition 수가 많으면 병렬성은 높아지지만 overhead도 증가합니다.
    - replication factor와 partition 수를 함께 고려하여 설계해야 합니다.


---


## Reference

- <https://docs.confluent.io/platform/current/ksqldb/developer-guide/joins/join-streams-and-tables.html>
- <https://kafka.apache.org/documentation/#intro_partitions>

