---
layout: skill
permalink: /100
title: 자료 구조 - Stack
description: Stack은 data를 순서대로 쌓아 올리는 자료 구조로, 후입선출(LIFO, Last In First Out) 원칙을 따릅니다.
date: 2024-05-31
---


## Stack - 쌓아 올려서 저장하기

- Stack은 **data를 순서대로 쌓아 올리는 자료 구조**입니다.
    - 간단한 구조와 효율적인 연산 덕분에 많은 algorithm과 system에서 중요하게 사용됩니다.

- Stack은 **후입선출(LIFO, Last In First Out) 원칙**을 따릅니다
    - 마지막에 삽입된 data가 가장 먼저 제거됩니다.
        - `push`와 `pop` 연산이 상수 시간(`O(1)`)에 수행되어 효율적입니다.
    - 물리적으로 쌓아 올린 접시나 책과 같은 형태입니다.

- Stack은 **배열**이나 **연결 List**를 사용하여 간단하게 구현할 수 있으며, 두 구현 방식은 memory 사용, 동적 크기 조정, 접근 속도 등의 측면에서 차이가 있습니다.
    - **배열**은 연결 List보다 구현하기 더 쉽고 접근이 더 빠르지만(`O(1)`), 최대 크기가 제한됩니다.
    - **연결 List**가 동적 크기 조정이 가능해 더 유연하고 memory 효율적이지만, 동적 memory 할당과 해제가 필요해 구현이 배열보다 복잡합니다.

| 특징 | 배열로 구현한 Stack | 연결 List로 구현한 Stack |
| 