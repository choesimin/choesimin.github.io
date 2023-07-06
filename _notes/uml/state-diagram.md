---
layout: note
title: State Diagram - 상태의 변화를 분석하기
version: 2023-06-19
---




- State Diagram이란 하나의 객체가 생명 주기(life cycle) 동안 가질 수 있는 상태의 변화를 분석한 diagram입니다.




---




## 구성 요소


### 시작 상태와 종료 상태

```mermaid
stateDiagram-v2
direction LR

[*] --> [*]
```

|  | 시작 상태 (Initial state) | 종료 상태 (Final state) |
| - | - | - |
| 표기법 | 속이 채워진 원으로 표기합니다. | 속이 채워진 원의 바깥에 다른 원이 둘러싸고 있는 모양으로 표기합니다. |
| 설명 | 시작 상태는 객체의 상태 변화가 시작되는 곳을 의미합니다. 보통 객체의 생성 시점이 시작 상태가 됩니다. | 종료 상태는 객체 상태 변화가 종료되는 곳을 의미합니다. 보통 객체의 소멸 시점이 종료 상태가 됩니다. |


### 상태

```mermaid
stateDiagram-v2

state "State 1" as state1
state "State 2" as state2
state "State 3" as state3
```

|  | 상태 (State) |
| - | - |
| 표기법 | 모서리가 둥근 사각형으로 표기합니다. 상태의 이름은 사각형 안에 표기합니다. |
| 설명 | 상태란 객체가 가질 수 있는 조건이나 상황입니다. 생명 주기 동안 객체의 상태는 변화하며, 상태는 객체의 특정한 속성의 값으로 표현됩니다. |


### 전이

```mermaid
stateDiagram-v2
direction LR

state "State 1" as state1
state "State 2" as state2
state "State 3" as state3
state "State 4" as state4

state1 --> state2
state2 --> state3 : 행동
state3 --> state4 : 행동[조건]
```

|  | 전이 (Transition) |
| - | - |
| 표기법 | 전이는 상태와 상태 사이에 화살표가 달린 실선으로 표기합니다. 행동과 조건은 선 위에 표기하며, 필요에 따라 생략할 수 있습니다. 하나의 전이로는 하나의 단방향만 표현할 수 있습니다. |
| 설명 | 전이란 하나의 상태에서 다른 상태로 변화하는 것이며, 상태 간의 관계를 의미합니다. |


### 선택

```mermaid
stateDiagram-v2
direction LR

state "State 1" as state1
state "State 2" as state2
state "State 3" as state3
state "State 4" as state4
state if <<choice>>

state1 --> state2
state2 --> if : 행동
if --> state3 : 조건 1
if --> state4 : 조건 2
```

|  | 선택 (Choice) |
| - | - |
| 표기법 | 마름모로 표기합니다. |
| 설명 | 조건에 따라 다음 상태가 달라지는 경우에 사용합니다. 전이의 실선 위에 표기하는 조건과 의미가 같습니다. |




---




## State Diagram 작성 주의 사항


### 하나의 객체에 대한 상태 변화를 표현하기

- 상태에 집중하다 보면, 객체라는 한계를 벗어나는 경우가 있습니다.
- 하나의 State Diagram은 하나의 객체에 대한 상태를 정의해야 합니다.


### Black Hole State

- 들어오는 전이만 있고 나가는 전이가 없는 경우 Black Hole 상태가 됩니다.
- Black Hole 상태가 있으면, 객체가 종료 상태에 이르지 못하고 무한 loop를 수행하게 됩니다.
- 상태는 들어오는 전이와 나가는 전이가 모두 정의되어야 합니다.




---




## Example


### 집

- 행동과 조건은 필요에 따라 생략할 수 있습니다.

```mermaid
---
title: 행동을 작성하기
---

stateDiagram-v2
direction LR

state "문 열림" as opened
state "문 닫힘" as closed

[*] --> opened : 들어가기
opened --> closed : 문 닫기
closed --> opened : 문 열기
closed --> [*] : 2층 가기
```

```mermaid
---
title: 행동을 생략하기
---

stateDiagram-v2
direction LR

state "문 열림" as opened
state "문 닫힘" as closed

[*] --> opened
opened --> closed
closed --> opened
closed --> [*]
```


### 돈

- 조건은 전이나 선택에 작성할 수 있습니다.

```mermaid
---
title: 조건을 전이에 작성하기
---

stateDiagram-v2

state "돈 없음" as poor
state "돈 적당히 있음" as normal
state "돈 많음" as rich

[*] --> poor : 학교 졸업
poor --> poor : 열심히 일하기 [잔고 100만원 미만]
poor --> normal : 열심히 일하기 [잔고 100만원 이상 1000만원 미만]

normal --> poor : 일하기 [잔고 100만원 미만]
normal --> normal : 일하기 [잔고 100만원 이상 1000만원 미만]
normal --> rich : 일하기 [잔고 1000만원 이상]

rich --> normal : 놀면서 일하기 [잔고 1000만원 미만]
rich --> rich : 놀면서 일하기 [잔고 1000만원 이상 2000만원 미만]
rich --> [*] : 놀면서 일하기 [잔고 2000만원 이상]
```

```mermaid
---
title: 조건을 선택에 작성하기
---

stateDiagram-v2

state "돈 없음" as poor
state "돈 적당히 있음" as normal
state "돈 많음" as rich

state ifPoor <<choice>>
state ifNormal <<choice>>
state ifRich <<choice>>

[*] --> poor : 학교 졸업
poor --> ifPoor : 열심히 일하기
ifPoor --> poor : 잔고 100만원 미만
ifPoor --> normal : 잔고 100만원 이상 1000만원 미만

normal --> ifNormal : 일하기
ifNormal --> poor : 잔고 100만원 미만
ifNormal --> normal : 잔고 100만원 이상 1000만원 미만
ifNormal --> rich : 잔고 1000만원 이상

rich --> ifRich : 놀면서 일하기
ifRich --> normal : 잔고 1000만원 미만
ifRich --> rich : 잔고 1000만원 이상 2000만원 미만
ifRich --> [*] : 잔고 2000만원 이상
```


### 뽑기 기계

- 동전을 넣고 손잡이를 돌리면 알맹이가 1개 나오는 기계입니다.
- 10% 확률로 당첨되면 알맹이를 2개 받습니다.

```mermaid
stateDiagram-v2

state "동전 없음" as noQuarter
state "동전 있음" as hasQuarter
state "알맹이 판매" as sold
state "알맹이 매진" as soldOut
state "당첨" as winner

state ifSold <<choice>>
state ifWinner <<choice>>
state ifSoldOut <<choice>>
state ifHasQuarter <<choice>>


[*] --> noQuarter

noQuarter --> hasQuarter : 동전 투입

hasQuarter --> noQuarter : 동전 반환
hasQuarter --> ifHasQuarter : 손잡이 돌림
ifHasQuarter --> sold : 당첨되지 않음
ifHasQuarter --> winner : 당첨됨

sold --> ifSold : 알맹이 내보냄
ifSold --> noQuarter : 알맹이 > 0
ifSold --> soldOut : 알맹이 = 0

winner --> ifWinner : 알맹이 두 개 내보냄
ifWinner --> noQuarter : 알맹이 > 0
ifWinner --> soldOut : 알맹이 = 0

soldOut --> ifSoldOut : 알맹이 충전
ifSoldOut --> noQuarter : 여분 있음
ifSoldOut --> [*] : 여분 없음
```


### Mobile 청구서

- 발송할 수 있는 형태의 청구서입니다.
- 발송을 예약하면 예약 시간 전에는 발송할 수 없습니다.

```mermaid
stateDiagram-v2

state "작성 완료" as written
state "발송 예약" as reserved
state "발송 완료" as sent
state "결제 완료" as payed
state "결제 취소 완료" as paymentCanceled
state "파기 완료" as destroyed

state ifSendReservation <<choice>>


[*] --> written : 작성하기
written --> sent : 발송하기
written --> reserved : 발송 예약하기

reserved --> ifSendReservation : 발송하기
ifSendReservation --> sent : 발송 가능 (발송 예정 시각 ≥ 현재 시각)
ifSendReservation --> reserved : 발송 불가능 (발송 예정 시각 < 현재 시각)

sent --> payed : 결제하기
payed --> paymentCanceled : 결제 취소하기

sent --> destroyed : 파기하기
reserved --> destroyed : 파기하기

paymentCanceled --> [*]
destroyed --> [*]
```




---




# Reference

- <https://ko-de-dev-green.tistory.com/96>
- <https://5dol.tistory.com/169>
- <https://www.guru99.com/state-machine-transition-diagram.html>
- <https://www.lucidchart.com/pages/uml-state-machine-diagram>
- <https://mermaid.js.org/syntax/stateDiagram.html>
