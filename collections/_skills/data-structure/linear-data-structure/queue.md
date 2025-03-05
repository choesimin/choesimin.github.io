---
layout: skill
permalink: /207
title: 자료 구조 - Queue
description: Queue는 먼저 들어온 것을 먼저 내보내는 자료 구조로, 선입선출(FIFO, First In First Out) 원칙을 따릅니다.
date: 2024-05-31
---


## Queue - 먼저 들어온 것을 먼저 내보내기

- Queue는 data 구조에서 FIFO(First In, First Out) 방식으로 작동하는 구조입니다.
    - 즉, 먼저 들어간 data가 먼저 나오는 구조입니다.

- **배열**과 **연결 List**를 사용하여 Queue를 간단히 구현할 수 있습니다.
    - **배열 기반 Queue**는 구현이 간단하지만 크기가 고정되는 단점이 있고, **연결 List 기반 Queue**는 크기 제한이 없지만 memory 관리가 필요합니다.

- Queue는 주로 data가 순차적으로 처리될 필요가 있는 상황에서 사용됩니다.
    - 예를 들어, printer 작업 대기열, process scheduling, network packet 관리 등에서 Queue를 사용합니다.


### Queue의 주요 연산

- **enqueue(item)** : Queue의 끝에 새로운 요소를 추가합니다.
- **dequeue()** : Queue의 앞에서 요소를 제거하고 반환합니다.


