---
layout: skill
title: Text Chatting System 설계
date: 2024-02-19
---




- text chatting system을 설계합니다.
    - chatting은 크게 1:1 chatting, group chatting으로 나뉩니다.
    - 대표적인 text chatting service로 KakaoTalk, Line, Slack, Facebook messenger 등이 있습니다.

- chatting system은 Chatting Service, API Service, Third-Party Service로 이루어집니다.
    1. Chatting Service는 'client 간의 통신'과 'message 저장' 등의 기능을 제공합니다.
        - 이 중 client 간의 통신을 위해 client와 server 사이의 연결을 유지하는 것은 상태 유지(stateful) service입니다.
    2. API Service는 'Login', '회원 가입', '사용자 Profile 표시', 'Service 탐색' 등의 무상태(stateless) service 기능을 제공합니다.
        - Service 탐색(service discovery)은 client가 접속할 chatting server의 DNS hostname을 client에게 알려주는 역할을 합니다.
            - client의 geographical location(위치), server의 capacity(용량) 등을 기준으로 client에게 가장 적합한 chatting server를 추천해줍니다.
            - client는 해당 chatting server에 연결되어 message를 송수신합니다.
    3. Third-Party Service는 'message push 알림' 등의 추가적인 기능을 제공합니다.
        - 수신자가 미접속 중일 때 message에 대해 push 알림을 보내야 합니다.

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

- 이 글은 Chatting Service 설계에 대해 설명합니다.
    - API Service는 일반적인 Web Application과 같고, Third-Party Service는 기능을 연동하여 사용하기만 하면 됩니다.




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
id_generator[Message ID 생성기]
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




## Client ~ Chatting Server : 연결 유지하기

- **HTTP**는 Request/Response 기반의 Stateless Protocol이며, **client가 server와의 연결을 생성하는** 가장 대중적인 통신 방식입니다.
    - 대부분의 client/server application은 **client가 server에 요청을 보내고 server가 응답**하는 단방향의 HTTP 통신으로도 충분합니다.

- 따라서 송신 client가 message를 chatting server에 보낼 때에는 일반적인 HTTP 통신을 사용할 수 있습니다.
    - 송신 client가 server에게 요청하는 것이기 때문에 일반적인 application과 비슷합니다.

- 그러나 **server에서 수신 client로 message를 전송**하는 것은 일반적인 HTTP 통신만으로 구현할 수 없습니다.
    - HTTP 통신의 상태를 유지하지 않는(Stateless) 특성 때문에 연속된 data의 실시간 갱신에 한계가 있기 때문입니다.
    - 새로운 message 송신 요청을 받으면, **chatting server는 임의 시점에 수신 client에게 상태 변경(data update)을 요청**해야 합니다.
        - 이는 client가 server에 요청하던 일반적인 HTTP 사용 방식과 차이가 있습니다.
    - server가 수많은 client 중 임의의 client를 찾아서 요청하는 것은 어렵고 비효율적이기 때문에, **client가 server에 요청하면 client와 server 간의 network 연결(connection)을 끊지 않고 유지하는 방식을 사용**합니다.
        - server는 client와 server 사이에 유지되고 있는 connection을 통해 원하는 시점에 client에게 data를 전달할 수 있습니다.

- server가 수신 client에 message를 보내기 위해서 client와 server 간의 연결을 유지할  임의 시점에 server가 연결을 만들 수 있는 방법엔 크게 3가지가 있습니다.
    1. Polling : 주기적으로 server에 data를 요청하는 방식.
    2. Long Polling : server에 새로운 data가 생길 때까지 요청을 유지하는 방식.
    3. WebSocket : 양방향 통신을 가능하게 하는 protocol로, 실시간 data 교환에 최적화되어 있음.

- chatting server과 client 간의 통신에는 **WebSocket Protocol을 권장**합니다.


### 1. Polling

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

- Polling은 **client가 정해진 시간 간격으로 server에게 최신 data를 요청**하여 상태를 동기화하는 기법입니다.
    - HTTP를 사용합니다.

- Polling은 구현이 간단하지만, **server에 불필요한 부하**를 줄 수 있고, **data을 실시간으로 갱신하는 데에 한계**가 있습니다.
    - Polling 주기를 짧게 하여 요청을 자주할수록, network 통신 비용이 올라갑니다.
        - 또한 동기화할 필요가 없는 경우에도 요청하기 때문에, server 자원이 불필요하게 낭비됩니다.
    - Polling의 주기를 길게 하는 경우, 실시간성에 위배됩니다.


### 2. Long Polling

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

- Long Polling은 Polling의 효율성, 실시간성에 대한 한계를 극복하기 위한 방법입니다.
    - 일반 Polling과 마찬가지로 HTTP를 사용합니다.

- Long Polling 방식에서 client는 **새 message가 반환되거나 timeout될 때까지 연결을 유지**합니다.
    - **client가 새 message를 받으면** 기존 연결을 종료하고, server에 새로운 요청을 보내어 모든 절차를 다시 시작합니다.
        - server는 새로운 data가 있을 때까지 요청을 보류하고, 새로운 data가 생기면 그제서야 응답을 반환합니다.
    - **connection timeout이 발생하면** client는 즉시 새로운 요청을 보내어 연결을 유지합니다.

- Long Polling은 data가 존재할 때만 통신을 하므로 일반 Polling보다 효율적이지만, 몇 가지 단점이 있습니다.
    1. message를 보내는 client와 수신하는 client가 같은 chatting server에 접속하게 되지 않을 수도 있습니다.
        - load balancing을 위해 round robin algorithm을 사용하는 경우, message를 받은 server는 해당 message를 수신할 client와의 Long Polling 연결을 가지고 있지 않은 server일 수도 있습니다.
    2. server 입장에서는 client가 연결을 해제했는지 해제하지 않았는지 알 수 있는 방법이 없습니다.
        - HTTP을 사용하기 때문에 연결의 주체가 client이기 때문입니다.
    3. message를 많이 받지 않는 client도 timeout이 일어날 때마다 주기적으로 서버에 접속하기 때문에, 여전히 비효율적입니다.


### 3. WebSocket (권장)

```mermaid
sequenceDiagram

actor c as Client
participant s as Server

c ->> s : HTTP Handshake
s ->> c : ACK(acknowledgement)

loop 새 Message가 있을 때마다
    c --> s : Message 양방향 전송
end
```

- WebSocket은 **server와 client 간에 양방향 통신(Full-Duplex)을 가능하게 하는 통신 Protocol**로, 연결(connection)을 유지해서 지속적으로 data를 주고받을 수 있습니다.
    - **WebSocket의 연결은 영구적**이기 때문에, message를 전송할 때 매번 새롭게 연결을 맺을 필요가 없어 빠르고 효율적입니다.
    - WebSocket 연결은 client의 HTTP 요청을 통해 시작되며, 특정 **Handshake 절차를 거쳐 HTTP 연결이 WebSocket 연결로 upgrade**됩니다.
        - HTTP 연결은 처음 접속 확립에만 사용되고, 일정 시간이 지나면 자동으로 끊어집니다.
    - WebSocket 연결 후의 통신은 독자적인 WebSocket Protocol로만 이루어집니다.

- WebSocket은 전통적인 HTTP 기반 통신 방식에 비해 server 부하와 지연 시간을 크게 줄일 수 있으며, 주로 **Real-Time(실시간) Web Application을 구현하기 위해 사용**됩니다.
    - WebSocket Protocol의 header는 HTTP의 header보다 작고 가벼워서, 더 비용(overhead)으로 통신할 수 있습니다.
    - HTTP 통신을 사용하는 **Polling이나 Long Polling보다 WebSocket이 양방향 data 교환에 있어서 더 효율적**입니다.

- WebSocket은 **상태 유지(Stateful) 통신을 제공**하며, 한 번 연결되면 해당 connection line을 사용하여 양방향으로 data를 주고받을 수 있습니다.
    - 기존의 HTTP 통신은 client가 server에 요청을 보내고 server가 응답하는 단방향 통신이었으며, 이는 상태를 유지하지 않는(Stateless) 특성 때문에 연속된 data의 실시간 update에 한계가 있었습니다.

- WebSocket은 **HTTP가 사용하는 기본 port number(80 or 443)를 그대로 사용**하기 때문에, 방화벽이 있는 환경에서도 문제 없이 동작합니다.
    - 평문 message 전송 방식이므로, SSL/TLS 보안 계층으로 암호화해야 data 탈취를 방지할 수 있습니다.

- 양방향 통신이 가능하기에, **수신 client 뿐만 아니라 송신 client에서도 사용**할 수 있습니다.
    - data의 송신과 수신에 connection을 각각 맺을 필요가 없어, 하나의 connection으로 data를 송신하고 수신할 수 있습니다.
    - message를 보낼 때와 받을 때 모두 같은 Protocol을 사용할 수 있게 되므로, 구현이 단순하고 직관적이게 됩니다.

- WebSocket Protocol은 TCP Socket과 이름만 유사할 뿐 browser의 Socket이며, HTTP와 동일한 Application Layer(Application 계층)에 위치합니다.
    - 또한 TCP의 양방향 전이중 통신을 사용하기 때문에 Transport Layer(전송 계층)에 의존하고 있기도 합니다.

- 유의할 점은 WebSocket 연결은 항구적으로 유지되어야 하기 때문에, server 측에서 연결 관리를 효율적으로 해야 한다는 점입니다.




---




## Chatting Message 저장소 설계

- chatting 이력(history)은 key-value 저장소(store)에 보관합니다.
    - system에 접속한 사용자는 이전 chatting 이력을 전부 볼 수 있어야 하기 때문입니다.


### Data Model

#### Message의 식별값 : `message_id`





---






## Reference

- <https://jjingho.tistory.com/161>

