---
layout: skill
title: Message Queue Event 처리를 보장하는 여러가지 방법
date: 2024-12-24
---




## 이벤트 처리 보장 방식 (Event Delivery Guarantees)

- 이벤트 처리 보장 방식이란 ~~~~~~~~

- 각 방식은 사용 사례와 요구 사항에 따라 적절히 선택하여 사용해야 합니다.
    - 데이터의 중요도, 시스템의 복잡성, 성능 요구 사항 등을 고려하여 결정하면 됩니다.

```mermaid
sequenceDiagram
    participant p as Producer
    participant q as Message Queue
    participant c as Consumer
    
    Note over p,c: At-most-once delivery
    p->>q: Send Message
    q->>c: Forward Message
    Note right of c: Message might be lost
    
    Note over p,c: At-least-once delivery
    p->>+q: Send Message A
    q->>+c: Forward Message A
    c-->>-q: No Ack (timeout)
    q->>+c: Retry Message A
    c-->>-q: Ack
    q-->>-p: Delivery Complete
    Note right of c: Might receive duplicates
    
    Note over p,c: Exactly-once delivery
    p->>+q: Send Message (with ID)
    q->>+c: Forward Message
    c->>c: Check Message ID
    c-->>-q: Ack with ID
    q-->>-p: Delivery Complete
    Note right of c: Deduplication based on ID
```


### At-most-once (최대 한 번 전달)

```mermaid
flowchart TD
    p[Producer] --> q[Queue]
    q --> c[Consumer]
```

- 메시지가 한 번만 전송되며, 수신 확인을 하지 않습니다.
- 처리 속도가 빠르고 구현이 단순하지만, 메세지 손실 가능성이 있습니다.
- 로그 데이터와 같이 일부 손실이 허용되는 경우에 사용합니다.


### At-least-once (최소 한 번 전달)

```mermaid
flowchart TD
    p[Producer] --> q[Queue]
    q --> c[Consumer]
    c -- No Ack --> q
    q -- Retry --> c
```

- 수신 확인이 올 때까지 메시지를 계속 재전송합니다.
- 메시지 손실을 방지할 수 있고, 구현이 비교적 단순하지만, 메시지를 중복 전달할 가능성이 있습니다.
- 데이터 손실이 중요하고 중복 처리가 가능한 경우에 사용합니다.


### Exactly-once (정확히 한 번 전달)

```mermaid
flowchart TD
    p[Producer] --> |Message + ID| q[Queue]
    q --> c[Consumer]
    c --> |Check ID| dedup[Deduplication]
    dedup --> |If new| process[Process Message]
    dedup --> |If duplicate| skip[Skip Message]
    process --> |Ack| q
    skip --> |Ack| q
```

- 메시지를 정확히 한 번만 전달합니다.
- 메시지를 손실과 중복 없이 완벽히 전달할 수 있지만, 구현이 매우 복잡합니다.
    - Producer와 Consumer 모두 상태를 저장하여 관리합니다.
