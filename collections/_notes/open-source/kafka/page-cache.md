---
layout: note
permalink: /251
title: Kafka Page Cache - OS를 활용한 고성능 I/O
description: Kafka는 OS의 page cache를 활용하고 sequential I/O, zero-copy 등의 최적화 기법을 사용하여 매우 빠른 message 처리 성능을 제공합니다.
date: 2024-01-01
published: false
---


## Kafka의 고성능 I/O 전략

- Kafka는 높은 throughput과 낮은 latency를 달성하기 위해 OS level의 최적화를 적극 활용합니다.
- page cache, sequential I/O, zero-copy, batch processing 등의 기법을 조합하여 탁월한 성능을 제공합니다.
- application level cache 대신 OS의 page cache를 활용하여 memory를 효율적으로 사용합니다.


---


## Page Cache 활용

- **page cache**는 OS가 disk I/O 성능을 향상시키기 위해 제공하는 memory caching mechanism입니다.
    - OS는 최근에 읽거나 쓴 disk block을 memory에 caching합니다.
    - 동일한 data에 대한 반복 접근 시 disk I/O 없이 memory에서 직접 읽습니다.

- Kafka는 자체 application cache를 구현하지 않고 OS의 page cache에 의존합니다.
    - message를 disk에 쓸 때, 실제로는 OS의 page cache에 먼저 기록됩니다.
    - OS가 적절한 시점에 page cache의 내용을 disk에 flush합니다.
    - consumer가 message를 읽을 때도 page cache에서 직접 읽는 경우가 많습니다.

- page cache 활용의 장점은 다음과 같습니다.
    - **memory 효율성**: JVM heap 대신 OS page cache를 사용하여 garbage collection overhead를 피합니다.
    - **warm cache 유지**: process 재시작 후에도 OS page cache는 유지되어 성능 저하가 최소화됩니다.
    - **자동 관리**: OS가 자동으로 memory를 관리하므로 tuning이 간단합니다.

- producer와 consumer의 처리 속도가 비슷하면, message가 page cache에 머물러 disk I/O가 거의 발생하지 않습니다.
    - 이는 Kafka가 실시간 streaming에 최적화된 이유입니다.


---


## Sequential I/O 최적화

- Kafka는 **sequential I/O** pattern을 사용하여 disk 성능을 극대화합니다.
    - message는 partition의 끝에 순차적으로 append됩니다.
    - consumer는 offset 순서대로 순차적으로 읽습니다.

- sequential I/O는 random I/O에 비해 훨씬 빠릅니다.
    - modern disk(HDD)는 sequential read/write 시 100MB/s 이상의 성능을 제공합니다.
    - random I/O는 seek time으로 인해 수백 KB/s 수준으로 느려집니다.
    - SSD의 경우에도 sequential I/O가 더 빠르고 수명이 연장됩니다.

- sequential I/O는 OS의 read-ahead와 write-behind 최적화를 극대화합니다.
    - **read-ahead**: OS가 sequential read pattern을 감지하고 미리 다음 block을 page cache에 load합니다.
    - **write-behind**: OS가 여러 write를 batch로 묶어 한 번에 disk에 기록합니다.

- Kafka의 log segment file 구조는 sequential I/O를 자연스럽게 지원합니다.
    - append-only log 구조로 항상 file의 끝에 쓰기가 발생합니다.
    - retention policy에 따라 오래된 segment file 전체를 삭제합니다.


---


## Zero-Copy 최적화

- **zero-copy**는 data를 kernel space에서 user space로 복사하지 않고 직접 network로 전송하는 기법입니다.

- 일반적인 data 전송 과정(zero-copy 미사용)은 다음과 같습니다.
    1. disk에서 OS buffer로 data 읽기 (kernel space)
    2. OS buffer에서 application buffer로 복사 (kernel → user space)
    3. application buffer에서 socket buffer로 복사 (user → kernel space)
    4. socket buffer에서 network로 전송 (kernel space)

- zero-copy를 사용하면 과정이 단순해집니다.
    1. disk에서 OS buffer로 data 읽기 (kernel space)
    2. OS buffer에서 socket buffer로 직접 전송 (kernel space 내에서만)
    3. socket buffer에서 network로 전송

- Kafka는 `sendfile()` system call을 사용하여 zero-copy를 구현합니다.
    - Java NIO의 `FileChannel.transferTo()` method를 통해 사용합니다.
    - CPU overhead와 memory copy를 대폭 줄여 성능을 향상시킵니다.

- zero-copy는 특히 consumer가 message를 읽을 때 큰 효과를 발휘합니다.
    - page cache의 data를 직접 network socket으로 전송합니다.
    - 수천 개의 consumer에게 동일한 message를 전송할 때도 효율적입니다.


---


## Batch Processing

- Kafka는 개별 message가 아닌 **batch 단위로 처리**하여 효율성을 높입니다.

- **producer batching**
    - producer는 여러 message를 하나의 batch로 묶어 broker에게 전송합니다.
    - `batch.size`와 `linger.ms` 설정을 통해 batch 크기와 대기 시간을 조절합니다.
    - network round trip 횟수를 줄여 throughput을 향상시킵니다.

- **broker batching**
    - broker는 수신한 batch를 그대로 disk에 기록합니다.
    - 개별 message를 parsing하지 않고 batch 전체를 처리하여 CPU overhead를 줄입니다.

- **consumer batching**
    - consumer는 한 번의 fetch request로 여러 message를 가져옵니다.
    - `fetch.min.bytes`와 `fetch.max.wait.ms` 설정으로 fetch 동작을 조절합니다.
    - network overhead를 줄이고 처리 효율을 높입니다.

- batch processing의 장점은 다음과 같습니다.
    - network overhead 감소 (packet 수 감소)
    - disk I/O 효율 향상 (larger sequential write)
    - compression 효율 증가 (larger batch일수록 압축률 향상)


---


## Data Compression

- Kafka는 message compression을 지원하여 network와 storage 사용량을 줄입니다.

- **지원되는 compression algorithm**
    - **gzip**: 높은 압축률, 높은 CPU 사용량
    - **snappy**: 균형잡힌 압축률과 속도 (기본 권장)
    - **lz4**: 매우 빠른 압축/해제 속도, 낮은 CPU 사용량
    - **zstd**: 높은 압축률과 빠른 속도의 균형

- producer에서 `compression.type` 설정으로 compression을 활성화합니다.
    - batch 단위로 압축되므로 batch 크기가 클수록 압축 효율이 높습니다.
    - 압축된 batch는 broker와 consumer 간 전송 시에도 압축 상태를 유지합니다.

- broker는 압축된 message를 그대로 저장하고 전송합니다.
    - broker가 압축을 해제하지 않으므로 CPU overhead가 없습니다.
    - consumer가 최종적으로 압축을 해제하여 message를 처리합니다.

- compression을 사용하면 다음의 이점이 있습니다.
    - network bandwidth 절약 (특히 WAN 환경에서 유용)
    - disk storage 절약
    - 더 많은 message를 batch에 포함 가능


---


## Memory Mapped Files (mmap)

- Kafka는 index file 접근 시 **memory mapped file**(mmap)을 사용합니다.

- mmap은 file을 process의 address space에 직접 mapping하는 기법입니다.
    - file read/write가 memory access처럼 동작합니다.
    - OS가 자동으로 page cache를 통해 caching합니다.

- Kafka는 offset index와 time index file에 mmap을 사용합니다.
    - consumer가 특정 offset의 message를 찾을 때 index file을 빠르게 검색합니다.
    - binary search를 통해 효율적으로 원하는 위치를 찾습니다.

- mmap의 장점은 다음과 같습니다.
    - file I/O overhead 감소
    - OS가 자동으로 page cache 관리
    - code가 간결해짐 (file I/O API 불필요)


---


## Kafka 성능 최적화 Best Practice

- **적절한 batch size 설정**
    - `batch.size=16384` (16KB, producer 기본값)
    - `linger.ms=10-100` (throughput 우선 시)

- **compression 활성화**
    - `compression.type=snappy` 또는 `lz4` (균형잡힌 선택)
    - `compression.type=zstd` (높은 압축률 필요 시)

- **충분한 OS page cache 확보**
    - JVM heap은 작게 (6-8GB 권장)
    - 나머지 memory는 OS page cache에 할당

- **partition 수 적절히 설정**
    - consumer 병렬성을 고려하여 설정
    - 너무 많은 partition은 metadata overhead 증가

- **retention 정책 적절히 설정**
    - `log.retention.hours` 또는 `log.retention.bytes`
    - 불필요한 data를 빠르게 삭제하여 disk 공간 확보


---


## Reference

- <https://kafka.apache.org/documentation/#design>
- <https://www.confluent.io/blog/configure-kafka-to-minimize-latency/>
- <https://engineering.linkedin.com/kafka/benchmarking-apache-kafka-2-million-writes-second-three-cheap-machines>

