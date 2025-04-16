---
layout: note
permalink: /313
title: Kafka Offset - Message 위치 기억하기
description: Kafka는 자신이 message를 어디까지 읽었는지 기억하기 위해 offset을 사용합니다.
date: 2025-04-16
---


## Kafka Offset

- offset은 Kafka에서 **message의 위치를 나타내는 순차적인 ID 번호**입니다.
    - partition 내에서 유일한 식별자 역할을 합니다.
    - log segment file에 물리적으로 저장됩니다.
    - offset을 통해 특정 message에 직접 접근이 가능합니다.
    - offset은 불변(immutable) 값으로 한번 할당되면 변경되지 않습니다.

- **각 partition 내에서 message마다 고유한 offset 값**을 가집니다.
    - partition A의 offset 5와 partition B의 offset 5는 서로 다른 message입니다.
    - partition 간에는 offset 값의 연속성이나 관계가 없습니다.
    - 하나의 topic에 여러 partition이 있을 경우 전체 message의 순서는 보장되지 않습니다.
    - partition 내에서만 순서가 보장됩니다.

- offset은 **0부터 시작**하여 **message가 추가될 때마다 1씩 증가**합니다.
    - offset의 값은 64bit 정수(long)로 표현됩니다.
    - 이론적으로 한 partition에 저장할 수 있는 최대 message 수는 2^63-1개입니다.
    - offset 값의 차이를 통해 두 시점 사이에 추가된 message 수를 계산할 수 있습니다.
    - 실제 disk에 저장될 때는 base offset + delta 형태로 압축되어 저장됩니다.

- consumer는 offset을 통해 **자신이 어디까지 message를 소비했는지 추적**합니다.
    - 이를 consumer position 또는 current offset이라고 합니다.
    - consumer는 읽은 마지막 offset + 1 위치를 바라봅니다.
    - 이 값은 다음에 읽을 message의 offset을 의미합니다.
    - consumer가 재시작되더라도 이 값을 기억하여 연속적으로 처리합니다.


---


## Offset 저장 및 관리

- consumer offset은 기본적으로 **`__consumer_offsets`라는 내부 topic에 저장**됩니다.
    - 이 topic은 Kafka 내부에서 자동으로 생성됩니다.
    - key-value 형태로 저장되며, key는 `[group.id, topic, partition]`입니다.
    - value는 offset 값과 metadata(timestamp 등)입니다.
    - 이전 version에서는 Zookeeper에 저장되었으나 현재는 Kafka 내부 topic에 저장됩니다.

- offset 정보는 **broker의 cache에 임시 저장**되어 성능을 향상시킵니다.
    - memory에 유지되는 정보는 `offsets.retention.minutes` 설정에 따라 달라집니다.
    - 기본값은 7일(10080분)입니다.
    - 이 기간이 지나면 offset 정보가 삭제되어 consumer가 재시작할 때 reset policy를 따릅니다.
    - offset은 압축(compaction)되어 저장 공간을 절약합니다.

- **consumer group은 partition 별로 offset을 개별적으로 관리**합니다.
    - 동일한 group 내 서로 다른 consumer가 동일한 partition을 처리하게 되면 offset 충돌이 발생합니다.
    - 이를 방지하기 위해 Kafka는 rebalancing mechanism을 제공합니다.
    - consumer group 내에서 partition 할당이 변경되면 offset도 함께 이전됩니다.
    - consumer가 group에서 제거되면 해당 consumer가 처리하던 partition은 다른 consumer에게 재할당됩니다.

- offset은 **consumer group별로 독립적으로 유지**됩니다.
    - 서로 다른 consumer group은 같은 topic의 동일한 partition을 각자 다른 offset으로 처리할 수 있습니다.
    - 이를 통해 서로 다른 application이 동일한 데이터를 독립적으로 처리할 수 있습니다.
    - 같은 topic을 다른 방식으로 처리하는 다양한 consumer group 구성이 가능합니다.
    - message 재처리나 다목적 data 활용에 유용합니다.


---


## Offset Commit 방식

- **auto commit**은 일정 시간 간격으로 자동으로 offset을 commit합니다.
    - `enable.auto.commit=true`로 설정합니다.
    - `auto.commit.interval.ms` 설정으로 commit 간격을 지정할 수 있습니다.
        - 기본값은 5000ms입니다.
    - 구현이 간단하고 개발자가 직접 관리할 필요가 없습니다.
    - 그러나 처리 중 실패 시 중복 처리나 message 유실 가능성이 있습니다.
    - `poll()` method 호출 시 commit이 진행됩니다.

- **manual commit**은 application이 명시적으로 offset을 commit해야 합니다.
    - `enable.auto.commit=false`로 설정합니다.
    - `commitSync()` 또는 `commitAsync()` method를 사용합니다.
    - message 처리 logic과 commit 시점을 세밀하게 제어할 수 있습니다.
    - transaction과 함께 사용하여 exactly-once 처리를 구현할 수 있습니다.
    - 개발자가 명시적으로 관리해야 하므로 복잡성이 증가합니다.

- **synchronous commit**은 broker로부터 commit 완료 응답을 기다립니다.
    - `commitSync()` method를 사용합니다.
    - 응답을 기다리는 동안 blocking 상태가 되어 처리량이 감소할 수 있습니다.
    - 하지만 commit 실패 시 즉시 알 수 있고 재시도할 수 있습니다.
    - 중요한 처리에서는 이 방식을 권장합니다.
    - 특정 offset만 지정하여 commit할 수도 있습니다.

- **asynchronous commit**은 응답을 기다리지 않고 처리를 계속 진행합니다.
    - `commitAsync()` method를 사용합니다.
    - callback을 통해 commit 결과를 비동기적으로 처리할 수 있습니다.
    - 처리량이 높지만 실패 시 즉각적인 재시도가 어렵습니다.
    - 일반적으로 처리량이 중요한 경우에 사용합니다.
    - 종료 전 마지막 commit은 synchronous 방식을 사용하는 것이 안전합니다.


---


## Offset Reset Policy

- **`earliest` 설정**은 partition의 가장 첫 offset부터 message를 소비합니다.
    - consumer group이 처음 시작될 때 유용합니다.
    - 모든 historical data를 처리하고자 할 때 사용합니다.
    - data 손실을 방지하지만 처리해야 할 message 양이 많을 수 있습니다.
    - 특히 batch processing이나 전체 data 재처리 scenario에 적합합니다.
    - log segment가 삭제된 경우 가장 오래된 남아있는 offset부터 시작합니다.

- **`latest` 설정**은 consumer가 시작된 시점에서 가장 최근 offset부터 message를 소비합니다.
    - 실시간 처리에 유용합니다.
    - consumer가 오랜 시간 다운된 후 재시작할 때 최신 data만 처리하려는 경우에 적합합니다.
    - 이전 message는 건너뛰므로 data 손실이 발생할 수 있습니다.
    - log나 metric 수집 scenario에서 자주 사용됩니다.
    - 처리 지연이 발생하더라도 최신 message부터 처리하려는 경우에 적합합니다.

- **`none` 설정**은 저장된 offset이 없으면 예외를 발생시킵니다.
    - consumer group이 반드시 이전에 commit된 offset이 있어야 작동합니다.
    - 엄격한 data 처리가 필요한 환경에서 사용됩니다.
    - 개발자의 명시적인 관리가 필요합니다.
    - consumer가 처음 시작될 때는 사용할 수 없습니다.
    - 운영 환경에서 예상치 못한 동작을 방지하는 데 도움이 됩니다.

- **특정 시점으로 offset을 수동 조정**할 수도 있습니다.
    - `kafka-consumer-groups.sh --reset-offsets` 명령을 사용합니다.
    - 특정 timestamp, offset 값, shift 값 등을 기준으로 조정할 수 있습니다.
    - 잘못된 data를 처리한 경우 롤백하거나 특정 시점부터 재처리할 때 유용합니다.
    - topic migration이나 consumer 변경 시 offset 조정에 활용됩니다.
    - Kafka API를 통해 programming 방식으로도 조정할 수 있습니다.


---


## 처리 보장 수준과 Offset

- **at-least-once 처리**는 message 처리 후 commit하는 방식입니다.
    - message 처리 완료 후 offset을 commit합니다.
    - 처리 후 commit 전에 실패하면 재시작 시 동일한 message를 다시 처리합니다.
    - 따라서 중복 처리 가능성이 있지만 message 유실은 방지됩니다.
    - 멱등성(idempotent) 처리가 가능한 system에서 주로 사용됩니다.
    - 대부분의 application에서 기본적으로 사용되는 방식입니다.

- **at-most-once 처리**는 message 읽은 후 바로 commit하는 방식입니다.
    - message를 가져온 즉시 offset을 commit합니다.
    - 처리 중 실패하면 해당 message는 다시 처리되지 않습니다.
    - message 유실 가능성이 있지만 중복 처리는 방지됩니다.
    - 일부 data 손실이 허용되는 환경(logging, metric 등)에서 사용됩니다.
    - 처리 성능이 중요한 경우 선택될 수 있습니다.

- **exactly-once 처리**는 transaction을 사용하여 정확히 한 번 처리를 보장합니다.
    - Kafka transactions API를 사용하여 구현합니다.
    - message 처리와 offset commit을 원자적으로(atomically) 수행합니다.
    - 처리 결과와 offset commit이 모두 성공하거나 모두 실패합니다.
    - 구현이 복잡하고 overhead가 있지만 정확한 처리를 보장합니다.
    - 금융 거래나 중요한 business process에서 필요합니다.
    - Kafka Streams나 transaction 기능을 사용하여 구현합니다.

- consumer 재시작 시 **offset 복구 전략이 중요**합니다.
    - `isolation.level` 설정으로 transaction message 가시성을 제어할 수 있습니다.
    - `group.instance.id`를 설정하여 static membership을 구성할 수 있습니다.
    - static membership은 일시적 장애 시 consumer 재참여 시간을 단축시킵니다.
    - consumer 장애 시 offset 정보 손실을 방지하기 위한 backup 전략이 필요합니다.
    - consumer 종료 전 마지막 offset commit은 반드시 동기식으로 수행하는 것이 안전합니다.


---


## 고급 Offset 관리 기법

- **`seek()` method**를 사용하여 특정 offset으로 직접 이동할 수 있습니다.
    - seek은 '찾다', '구하다' 등의 의미를 가진 영어 단어입니다.
    - `consumer.seek(partition, offset)` method를 호출합니다.
    - 특정 시점부터 message를 다시 처리하거나 건너뛸 수 있습니다.
    - 복구 scenario나 특수한 처리 pattern에 유용합니다.
    - 마지막으로 처리된 offset을 외부 system에 저장하고 이를 기반으로 seek할 수도 있습니다.
    - 단, 너무 오래된 offset으로 seek하면 해당 offset이 이미 삭제되어 예외가 발생할 수 있습니다.

- **`seekToBeginning()`과 `seekToEnd()` method**로 partition의 처음이나 끝으로 이동할 수 있습니다.
    - `consumer.seekToBeginning(partitions)` 또는 `consumer.seekToEnd(partitions)`를 호출합니다.
    - 전체 data 재처리나 최신 message만 처리하려는 경우에 유용합니다.
    - 여러 partition을 한 번에 지정할 수 있습니다.
    - 실행 중인 consumer의 동작을 동적으로 변경할 수 있습니다.
    - 장애 복구 scenario에서 자주 사용됩니다.

- **offset 관리를 외부 system에 위임**할 수도 있습니다.
    - Kafka 내부 topic 대신 database나 다른 저장소에 offset을 저장합니다.
    - transaction과 함께 사용하여 data 처리와 offset 저장을 원자적으로 수행할 수 있습니다.
    - 복잡한 비즈니스 logic과 offset 관리를 결합할 수 있습니다.
    - Kafka Connect 같은 tool은 connector 내부에서 offset을 관리합니다.
    - message와 offset을 함께 저장하여 멱등성을 보장할 수 있습니다.

- **timestamp 기반 offset 조회를 활용**할 수 있습니다.
    - `consumer.offsetsForTimes()` method를 사용합니다.
    - 특정 시간대의 message부터 처리하고자 할 때 유용합니다.
    - 장애 복구 시 특정 시점으로 돌아가 재처리할 수 있습니다.
    - 시간 기반 data 분석이나 재처리에 활용됩니다.
    - 각 partition별로 다른 timestamp를 지정할 수도 있습니다.

- **partition assignment protocol과 offset의 관계**를 이해해야 합니다.
    - consumer group rebalance 발생 시 offset 관리에 주의해야 합니다.
    - `partition.assignment.strategy` 설정으로 할당 방식을 지정합니다.
    - cooperative rebalance를 사용하면 전체 중단 없이 partition을 재할당할 수 있습니다.
    - static group membership을 사용하면 일시적 장애 시 partition 재할당을 방지할 수 있습니다.
    - consumer group coordinator는 offset commit 요청을 조정합니다.


---


## Offset Monitoring 및 운영

- **lag monitoring**은 consumer의 **처리 지연을 측정**하는 중요한 지표입니다.
    - `lag` = `최신 produced offset` - `마지막으로 commit된 consumer offset`.
    - lag가 지속적으로 증가하면 consumer 처리량이 충분하지 않다는 신호입니다.
    - Kafka JMX metrics, Kafka AdminClient API, Burrow 등의 tool로 monitoring할 수 있습니다.
    - 적절한 alarm 임계값을 설정하여 문제를 조기에 발견합니다.
    - 각 consumer group, topic, partition별로 lag를 추적해야 합니다.

- **offset 저장 설정은 성능과 복구 시간에 영향**을 미칩니다.
    - `offsets.retention.minutes` : offset 유지 기간 (기본값 7일).
    - `offsets.topic.replication.factor` : offset topic의 복제 계수 (기본값 3).
    - `offsets.topic.num.partitions` : offset topic의 partition 수 (기본값 50).
    - `offsets.commit.required.acks` : commit 확인 수준 (기본값 -1, 모든 replica).
    - 이러한 설정은 cluster 크기와 요구 사항에 따라 조정해야 합니다.

- **운영 관리를 위한 command line tool을 활용**할 수 있습니다.
    - `kafka-consumer-groups.sh --describe --group [group_id]` : consumer group 정보 확인.
    - `kafka-consumer-groups.sh --reset-offsets` : offset 재설정.
    - `kafka-dump-log.sh` : log segment file에서 offset 정보 추출.
    - `kafka-console-consumer.sh --from-beginning` : 처음부터 message 확인.
    - 이러한 tool들은 문제 해결과 운영 관리에 필수적입니다.

- **offset 재설정은 신중하게** 수행해야 합니다.
    - 운영 환경에서 offset 재설정은 data 처리에 영향을 미칩니다.
    - 재설정 전 현재 offset을 backup해두는 것이 좋습니다.
    - 가능하면 consumer를 중지한 상태에서 수행합니다.
    - dry-run option으로 미리 결과를 확인할 수 있습니다.
    - 특정 partition만 선택적으로 재설정할 수도 있습니다.

- **consumer group 설계**는 **offset 관리와 밀접한 관련**이 있습니다.
    - 동일한 logic으로 처리하는 consumer는 같은 group에 배치합니다.
    - 다른 목적으로 같은 data를 처리할 경우 별도의 group을 사용합니다.
    - consumer 수와 partition 수의 관계를 고려하여 설계합니다.
    - group 내 consumer 수가 partition 수보다 많으면 일부 consumer는 idle 상태가 됩니다.
    - 적절한 group 설계로 offset 관리 복잡성을 줄일 수 있습니다.


---


## 장애 처리와 복구 전략

- **graceful shutdown**을 구현하여 offset 동기화 문제를 방지합니다.
    - graceful shutdown은 consumer가 종료될 때 모든 작업을 안전하게 마무리하는 것입니다.
        - consumer 종료 전 처리 중인 모든 작업을 완료합니다.
    - 마지막 offset commit은 synchronous 방식으로 수행합니다.
    - `wakeup()` method로 blocking 중인 poll 호출을 안전하게 종료합니다.
    - shutdown hook을 등록하여 예기치 않은 종료 시에도 안전하게 처리합니다.
    - 재시작 시 중복 처리를 최소화하기 위해 명시적인 commit 처리가 필요합니다.

- **rebalance event 처리 전략**을 수립합니다.
    - `ConsumerRebalanceListener`를 구현하여 rebalance event를 처리합니다.
    - `onPartitionsRevoked()` : partition 해제 전에 현재 offset을 commit합니다.
    - `onPartitionsAssigned()` : 새 partition 할당 후 필요한 초기화 작업을 수행합니다.
    - rebalance 시 처리 중인 message의 commit 상태를 관리합니다.
    - 잦은 rebalance는 성능 저하를 가져오므로, consumer 안정성을 높이는 것이 중요합니다.

- **일시적 장애와 영구적 장애에 대한 대응 전략을 구분**합니다.
    - network 오류 같은 일시적 장애는 재시도 logic으로 처리합니다.
    - commit 실패 시 exponential backoff 전략으로 재시도합니다.
    - database 장애 같은 외부 system 문제는 circuit breaker pattern으로 관리합니다.
    - 영구적 장애는 DLQ(Dead Letter Queue)를 사용하여 문제 message를 별도로 저장합니다.
    - 심각한 장애 시 수동 개입이 필요한 alert system을 구축합니다.

- **Kafka version 변경이나 migration 시** offset 관리를 고려합니다.
    - broker version upgrade 시 offset storage format이 변경될 수 있습니다.
    - consumer client version 변경 시 offset commit 동작이 달라질 수 있습니다.
    - 중요한 변경 전에는 offset을 별도로 backup해두는 것이 안전합니다.
    - 새 cluster로 migration 시 offset 정보를 함께 이전하는 전략이 필요합니다.
    - version 변경 후 조기에 문제를 발견하기 위한 canary testing을 수행합니다.

- **멱등성 구현**으로 offset 문제의 영향을 최소화합니다.
    - message에 고유 identifier를 포함시켜 중복 처리를 감지합니다.
    - 대상 system에 upsert 방식으로 처리하여 중복 insert를 방지합니다.
    - 처리 결과를 cache하여 동일 작업 재수행을 방지합니다.
    - message 처리와 offset commit을 하나의 transaction으로 관리합니다.
    - message 순서 의존성이 있는 경우 순서 보장 mechanism을 구현합니다.
