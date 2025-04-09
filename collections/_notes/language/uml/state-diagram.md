---
layout: note
permalink: /104
title: State Diagram - 객체의 상태 변화 시각화하기
description: State Diagram은 객체의 상태 변화를 시각화하는 UML의 한 종류로, 상태, 전이, 선택으로 구성됩니다.
date: 2023-06-19
---


## State Diagram의 구성 요소

- State Diagram은 상태(State), 전이(Transition), 선택(Choice), 시작 상태(Initial state), 종료 상태(Final state)로 구성됩니다.


### 시작 상태와 종료 상태

```mermaid
stateDiagram-v2
direction LR

[*] --> [*]
```

|  | 시작 상태 (Initial state) | 종료 상태 (Final state) |
| ---| --- | --- |
| **표기법** | 속이 채워진 원으로 표기합니다. | 속이 채워진 원의 바깥에 다른 원이 둘러싸고 있는 모양으로 표기합니다. |
| **설명** | 시작 상태는 객체의 상태 변화가 시작되는 곳을 의미합니다. 보통 객체의 생성 시점이 시작 상태가 됩니다. | 종료 상태는 객체 상태 변화가 종료되는 곳을 의미합니다. 보통 객체의 소멸 시점이 종료 상태가 됩니다. |


### 상태

```mermaid
stateDiagram-v2

state "State 1" as state1
state "State 2" as state2
state "State 3" as state3
```

|  | 상태 (State) |
| --- | --- |
| **표기법** | 모서리가 둥근 사각형으로 표기합니다. 상태의 이름은 사각형 안에 표기합니다. |
| **설명** | 상태란 객체가 가질 수 있는 조건이나 상황입니다. 생명 주기 동안 객체의 상태는 변화하며, 상태는 객체의 특정한 속성의 값으로 표현됩니다. |


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
| --- | --- |
| **표기법** | 전이는 상태와 상태 사이에 화살표가 달린 실선으로 표기합니다. 행동과 조건은 선 위에 표기하며, 필요에 따라 생략할 수 있습니다. 하나의 전이로는 하나의 단방향만 표현할 수 있습니다. |
| **설명** | 전이란 하나의 상태에서 다른 상태로 변화하는 것이며, 상태 간의 관계를 의미합니다. |


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
| --- | --- |
| **표기법** | 마름모로 표기합니다. |
| **설명** | 조건에 따라 다음 상태가 달라지는 경우에 사용합니다. 전이의 실선 위에 표기하는 조건과 의미가 같습니다. |


---


## State Diagram 작성 주의 사항


### 하나의 객체에 대한 상태 변화를 표현하기

- 상태에 집중하다 보면, 객체라는 한계를 벗어나는 경우가 있습니다.
- 하나의 State Diagram은 하나의 객체에 대한 상태를 정의해야 합니다.


### Black Hole State 주의하기

- 들어오는 전이만 있고 나가는 전이가 없는 경우 Black Hole 상태가 됩니다.
- Black Hole 상태가 있으면, 객체가 종료 상태에 이르지 못하고 무한 loop를 수행하게 됩니다.
- 상태는 들어오는 전이와 나가는 전이가 모두 정의되어야 합니다.


---


## Example


### 자동차

- 행동과 조건은 필요에 따라 생략할 수 있습니다.

```mermaid
---
title: 행동 작성하기
---

stateDiagram-v2
direction LR

state "정지함" as still
state "움직이는 중" as moving
state "충돌함" as crash

[*] --> still
still --> [*]

still --> moving : 운전하기
moving --> still : 운전하기
moving --> crash : 운전하기
crash --> [*]
```

```mermaid
---
title: 행동 생략하기
---

stateDiagram-v2
direction LR

state "정지함" as still
state "움직이는 중" as moving
state "충돌함" as crash

[*] --> still
still --> [*]

still --> moving
moving --> still
moving --> crash
crash --> [*]
```


### 일

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
poor --> normal : 열심히 일하기 [잔고 100만원 이상]

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
ifPoor --> normal : 잔고 100만원 이상

normal --> ifNormal : 일하기
ifNormal --> poor : 잔고 100만원 미만
ifNormal --> normal : 잔고 100만원 이상 1000만원 미만
ifNormal --> rich : 잔고 1000만원 이상

rich --> ifRich : 놀면서 일하기
ifRich --> normal : 잔고 1000만원 미만
ifRich --> rich : 잔고 1000만원 이상 2000만원 미만
ifRich --> [*] : 잔고 2000만원 이상
```


---


## Reference

- <https://ko-de-dev-green.tistory.com/96>
- <https://5dol.tistory.com/169>
- <https://www.guru99.com/state-machine-transition-diagram.html>
- <https://www.lucidchart.com/pages/uml-state-machine-diagram>
- <https://mermaid.js.org/syntax/stateDiagram.html>
