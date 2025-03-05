---
layout: skill
permalink: /174
title: 자료 구조 - Deque
description: Deque는 양 끝에서 삽입과 삭제가 모두 가능한 Queue입니다.
date: 2024-05-31
---


## Deque - Stack과 Queue를 합친 것

- Deque(Double-ended Queue)는 양 끝에서 삽입과 삭제가 모두 가능한 자료 구조입니다.

- Deque는 Queue와 Stack의 특성을 모두 포함하고 있어, 유연한 data 처리를 가능하게 합니다.

- Deque는 배열이나 연결 List로 구현할 수 있습니다.
    - 배열을 이용한 Deque 구현은 고정된 크기의 배열을 사용하여 Deque를 구현합니다.
    - 연결 List를 이용한 Deque 구현은 동적으로 memory를 할당하여 크기의 제한 없이 Deque를 구현합니다.


### Deque의 주요 연산

- **insertFront(item)** : item을 Deque의 앞쪽에 삽입합니다.
- **insertLast(item)** : item을 Deque의 뒤쪽에 삽입합니다.
- **deleteFront()** : Deque의 앞쪽에서 item을 삭제합니다.
- **deleteLast()** : Deque의 뒤쪽에서 item을 삭제합니다.


