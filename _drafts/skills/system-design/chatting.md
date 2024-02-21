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




## Client <-> Chatting Server : 연결 유지하기

- HTTP는 **client가 연결을 만드는 Protocol**이며, 가장 대중적인 통신 방식입니다.
    - 대부분의 client/server application에서 요청을 보내는 쪽은 client이기 때문입니다.

- 따라서 송신 client가 message를 chatting server에 보낼 때에는 일반적인 HTTP Protocol을 사용할 수 있습니다.
    - 송신 client가 연결을 만들어 server에게 요청하기 때문입니다.

- 그러나 HTTP Protocol은 server에서 수신 client로 message를 보내는 데에는 쉽게 쓰일 수 없습니다.
    - **chatting server가 임의 시점에 수신 client와의 연결을 생성**해야 하기 때문입니다.
        - 이는 client가 server와의 연결을 만드는 일반적인 HTTP Protocol 사용 방식과 차이가 있습니다.

- server가 수신 client에 message를 보내기 위해서 임의 시점에 server가 연결을 만들 수 있는 방법엔 크게 3가지가 있습니다.
    1. Polling : 주기적으로 server에 data를 요청하는 방식.
    2. Long Polling : server에 새로운 data가 생길 때까지 요청을 유지하는 방식.
    3. WebSocket : 양방향 통신을 가능하게 하는 protocol로, 실시간 data 교환에 최적화되어 있음.


### 1. Polling

- Polling은 **client가 정해진 시간 간격으로 server에게 최신 data를 요청**하여 상태를 동기화하는 기법입니다.
    - HTTP Protocol을 사용합니다.

- Polling은 구현이 간단하지만, **server에 불필요한 부하**를 줄 수 있고, **data을 실시간으로 갱신하는 데에 한계**가 있습니다.
    - Polling 주기를 짧게 하여 요청을 자주할수록, network 통신 비용이 올라갑니다.
        - 또한 동기화할 필요가 없는 경우에도 요청하기 때문에, server 자원이 불필요하게 낭비됩니다.
    - Polling의 주기를 길게 하는 경우, 실시간성에 위배됩니다.

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


### 2. Long Polling

- Long Polling은 Polling의 효율성, 실시간성에 대한 한계를 극복하기 위한 방법입니다.
    - 일반 Polling과 마찬가지로 HTTP Protocol을 사용합니다.

- Long Polling 방식에서 client는 **새 message가 반환**되거나 **TimeOut**될 때까지 연결을 유지합니다.
    - client가 새 message를 받으면 기존 연결을 종료하고, server에 새로운 요청을 보내어 모든 절차를 다시 시작합니다.
        - server는 새로운 data가 있을 때까지 요청을 보류하고, 새로운 data가 생기면 그제서야 응답을 반환합니다.
    - connection timeout이 발생하면, client는 즉시 새로운 요청을 보내어 연결을 유지합니다.

- Long Polling은 data가 존재할 때만 통신을 하므로 일반 Polling보다 효율적이지만, 몇 가지 단점이 있습니다.
    1. server 입장에서는 client가 연결을 해제했는지 해제하지 않았는지 알 수 있는 방법이 없습니다.
        - HTTP Protocol을 사용하기 때문에 연결의 주체가 client이기 때문입니다.
    2. message를 많이 받지 않는 client도 timeout이 일어날 때마다 주기적으로 서버에 접속하기 때문에, 여전히 비효율적입니다.

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


### 3. WebSocket

- WebSocket은 클라이언트와 서버 간에 양방향 통신 채널을 제공하는 고급 프로토콜입니다.
- 한 번의 핸드셰이크를 통해 연결이 맺어진 후, 클라이언트와 서버는 연결이 끊어질 때까지 지속적으로 데이터를 주고받을 수 있습니다.
- WebSocket은 실시간 애플리케이션에 적합하며, 게임, 채팅 애플리케이션, 실시간 거래 플랫폼 등 다양한 분야에서 사용됩니다.
- 이 방식은 효율적인 데이터 교환을 가능하게 하며, Polling이나 Long Polling에 비해 서버 부하와 지연 시간을 크게 줄일 수 있습니다.


- 웹 소켓은 서버가 클라이언트에게 비동기 메시지를 보낼 때 가장 널리 사용하는 기술이다.

- 웹 소켓 연결은 클라이언트가 시작하며, 처음에는 HTTP 연결로 시작하지만 특정 핸드셰이크 절차를 거친 뒤 웹소켓 연결로 업그레이드된다.
    - 이렇게 한번 연결된 연결은 영구적이며, 양방향 통신이 가능하다.
    - 또한 웹 소켓은 HTTP 프로토콜이 사용하는 기본 포트번호를 그대로 사용하기에, 방화벽이 있는 환경에서도 일반적으로 잘 동작한다.

- 웹 소켓의 경우 양방향 통신이 가능하기에, 메시지를 수신하는 데서만 사용하는 것이 아닌 메시지를 전송하는데서도 사용할 수 있다.
    - 이는 메시지를 보낼 때나 받을 때나 같은 프로토콜을 사용할 수 있게 되므로, 구현이 단순해지고 직관적이게 된다.

```mermaid
sequenceDiagram

actor c as Client
participant s as Server

c ->> s : HTTP HandShake
s ->> c : ACK(acknowledgement)

loop 새 Message가 있을 때마다
    c --> s : Message 양방향 전송
end
```




---




## Database 설계


### Database 종류


### Data Model

#### Message의 식별값 : `message_id`





---






## Reference

- <https://jjingho.tistory.com/161>

