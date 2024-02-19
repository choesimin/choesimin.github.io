---
layout: skill
title: Text Chatting System 설계
date: 2024-02-19
---




- text chatting system을 설계합니다.
    - chatting은 크게 1:1 chatting, group chatting으로 나뉩니다.
    - 대표적인 text chatting service로 KakaoTalk, Line, Slack, Facebook messenger 등이 있습니다.

- chatting system의 server는 **chatting server**와 **API server**로 이루어집니다.
    1. chatting server는 'client 간의 통신'과 'message 저장'을 위해 존재합니다.
        - 이 중 client 간의 통신을 위한 client-server 간의 연결 유지는 상태 유지(stateful) service입니다.
    2. API server는 'login', '회원 가입', '사용자 profile 표시', 'service 탐색' 등의 무상태(stateless) service를 위해 존재합니다.
        - service 탐색(discovery)은 client가 접속할 chatting server의 DNS Hostname을 client에게 알려주는 역할을 합니다.

- message push 알림 등의 추가적인 기능은 제 3자(third-party) service를 사용합니다.

```mermaid
---
title : 전체 구조
---
flowchart TD

stateless -.- stateful -.- third_party

subgraph stateless[Stateless : 무상태]
    client([Client])
    lb[/Load Balancer\]
    auth[사용자 인증]
    user[사용자 Profile 관리]
    group[Group 관리]
    discovery[사용자에게 적합한\nChatting Server 탐색]

    client -->|HTTP| lb
    lb --> auth
    lb --> user
    lb --> group
    lb --> discovery
end

subgraph stateful[Stateful : 상태 유지]
    chatting[[Chatting Service]]
    sender([송신 Client])
    recipient([수신 Client])

    chatting <-->|WebSocket| sender
    chatting <-->|WebSocket| recipient
end

subgraph third_party[Third Party : 제 3자 Service 연동]
    push[Push 알림]
end
```




---




## Chatting Message 처리 흐름

- 송신 Client가 message를 보내면, chatting service에서는 message를 저장하고, 수신 client에게 message를 전달합니다.

```mermaid
flowchart LR

sender([송신 Client])
service[[Chatting Service\n1. Message 저장\n2. Message 전달]]
recipient([수신 Client])

sender -->|Message| service -->|Message| recipient
```


### 1:1 Chatting Message 처리 흐름

```mermaid
flowchart LR

sender([송신 Client])
recipient([수신 Client])

chatting_server_1[Chatting Server 1]
chatting_server_2[Chatting Server 2]
message_sync_queue>Message 동기화 Queue]

key_value_storage[(Key-Value 저장소)]
id_generator[ID 생성기]
push_notification_service[Push 알림 Service]

if_online{수신 Client\n접속 여부}


sender -->|1| chatting_server_1
chatting_server_1 -->|2| id_generator
id_generator --> chatting_server_1
chatting_server_1 -->|3| message_sync_queue
message_sync_queue -->|4| key_value_storage
message_sync_queue -->|5| if_online
if_online -->|접속| chatting_server_2
if_online -->|미접속| push_notification_service
chatting_server_2 -->|6| recipient
```

1. `송신 Client`가 `Chatting Server 1`로 message를 전송합니다.
2. `Chatting Server 1`은 `ID 생성기`를 사용해 'message ID'를 결정합니다.
3. 해당 message를 `Message 동기화 Queue`로 전송합니다.
4. message를 `Key-Value 저장소`에 보관합니다.
5. `수신 Client`의 접속 여부에 따라 message 전송 방식을 결정하고 처리합니다.
    - `수신 Client`가 접속 중인 경우, `수신 Client`가 사용 중인 `Chatting Server 2`로 message를 전송합니다.
    - `수신 Client`가 접속 중이 아닌 경우, `Push 알림 Service`로 message를 전송합니다.
6. `수신 Client`와 `Chatting Server 2` 사이에 연결된 WebSocket을 통해 message를 전송합니다.


### Group Chatting Message 처리 흐름

- group chatting은 1:1 chatting과 달리 송신 client나 수신 client가 여러 개입니다.
- 그래서 client와 connection을 유지하는 chatting server와 그에 따라 관리되는 message queue가 1:1 chatting보다 더 많습니다.
- 상세한 message 처리 흐름은 1:1 chatting과 동일합니다.

#### Group Chatting : Message를 여러 Client에게 송신하는 경우

- group chatting에서 message를 송신할 때는 모든 수신 client에게 message를 보내야 합니다.

```mermaid
flowchart LR

sender([송신 Client])
recipient_1([수신 Client 1])
recipient_2([수신 Client 2])

chatting_server[Chatting Server]
message_sync_queue_1>Message 동기화 Queue 1]
message_sync_queue_2>Message 동기화 Queue 2]

sender --> chatting_server
chatting_server --> message_sync_queue_1
chatting_server --> message_sync_queue_2
message_sync_queue_1 --> recipient_1
message_sync_queue_2 --> recipient_2
```

#### Group Chatting : Message를 여러 Client로부터 수신하는 경우

- group chatting에서 message를 수신할 때는 모든 송신 client의 message를 받을 수 있어야 합니다.

```mermaid
flowchart LR

sender_1([송신 Client 1])
sender_2([송신 Client 2])
recipient([수신 Client])

chatting_server_1[Chatting Server 1]
chatting_server_2[Chatting Server 2]
message_sync_queue>Message 동기화 Queue]

sender_1 --> chatting_server_1
sender_2 --> chatting_server_2
chatting_server_1 --> message_sync_queue
chatting_server_2 --> message_sync_queue
message_sync_queue --> recipient
```




---




## Client와 Chatting Server 간의 연결 유지하기

- 송신 client가 수신 client에게 전달할 message를 chatting server에 보낼 때에는 client가 server에게 요청하는 것이기 때문에 일반적인 HTTP Protocol을 사용합니다.
    - 대부분의 client/server application에서 요청을 보내는 것은 client입니다.
    - client가 server와의 통신을 위한 연결을 생성할 때 일반적으로 HTTP Protocol을 사용하여 통신합니다.

- 그러나 수신 client가 message를 전달받을 때는 server가 client와의 요청해야 하기 때문에, 일반적인 HTTP Protocol?????????????????????????


### Polling

```mermaid
sequenceDiagram

actor c as Client
participant s as Server

loop 매초마다 실행
    c ->> s : 새 Message가 있습니까?
    activate s
    alt 예
        s -->> c : 새 Message 반환
    else 아니오
        s -->> c : 빈 값 반환
    end
    s --> c : 연결 종료
    deactivate s
end
```


### Long Polling

```mermaid
sequenceDiagram

actor c as Client
participant s as Server

loop 연결을 종료할 때마다 실행
    c ->> s : 새 Message가 있습니까?
    activate s
    note over c, s : 새 Message 대기
    alt 예
        s -->> c : 새 Message 반환
    else TimeOut
        s -->> c : TimeOut 상태 반환
    end
    s --> c : 연결 종료
    deactivate s
end
```


### Web Socket

```mermaid
sequenceDiagram

actor c as Client
participant s as Server

c ->> s : HTTP HandShake
s ->> c : ACK(acknowledgement)
c --> s : Message 양방향 전송
```




---




## Database 설계


### Database 종류


### Data Model

#### Message의 식별값 : `message_id`





---






## Reference

- <https://jjingho.tistory.com/161>

