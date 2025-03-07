---
layout: skill
permalink: /
title: Kafka의 Topic과 Partition
description: 
date: 2025-03-07
---


## Topic, Partition : Kafka가 Data를 저장하는 방식

- topic은 Kafka에서 data를 분류하는 논리적 단위입니다.

- topic은 하나 이상의 partition으로 구성됩니다.
    - partition은 topic의 data를 물리적으로 분할한 단위입니다.
    - partition은 순서가 보장된 message의 sequence입니다.

- partition은 병렬 처리를 위한 기본 단위입니다.
    - 각 partition은 독립적으로 처리되므로 확장성을 제공합니다.
    - partition 수를 늘리면 throughput을 높일 수 있습니다.

- partition은 immutable한 log file로, append-only 방식으로 데이터를 저장합니다.
    - 새로운 message는 항상 log의 끝에 추가됩니다.
    - 한번 저장된 message는 변경할 수 없습니다.

- 각 message는 partition 내에서 고유한 번호인 offset을 가집니다.

- partition 내의 message는 순서가 보장되지만, partition 간에는 순서가 보장되지 않습니다.

- producer는 message를 특정 partition에 보내기 위해 key를 사용할 수 있습니다.
    - key가 없는 경우 round-robin 방식으로 partition에 분배됩니다.
    - 동일한 key를 가진 message는 항상 같은 partition으로 전송됩니다.