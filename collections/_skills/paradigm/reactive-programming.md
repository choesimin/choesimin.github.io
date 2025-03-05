---
layout: skill
permalink: /46
title: Reactive Programming - 비동기적으로 Data Stream을 다루는 방법
description: Reactive Programming은 data stream과 변경 사항 전파를 중심으로하는 비동기 programming paradigm입니다.
date: 2024-07-29
---


## Reactive Programming : Data 변화에 반응하여 비동기적으로 처리하기

- Reactive Programming은 **data의 흐름과 변화에 대응**하여 **비동기적으로 data를 처리**하는 programming paradigm입니다.
	- event 기반 system을 구축하는 데 유용하며, 특히 사용자 interface(UI)와 같은 실시간 data stream을 처리하는데 적합합니다.

- 주요 framework 및 library로 Rx(ReactiveX), Project Reactor, Akka Streams 등이 있습니다.


### Reactive System의 특징

- **비동기성 (Asynchrony)** : reactive system은 **event 또는 data stream을 비동기적으로 처리**합니다.
	- 이를 통해 다른 작업을 동시에 수행하거나 blocking을 피할 수 있습니다.

- **반응성 (Responsiveness)** : reactive system은 **실시간으로 data의 변화에 반응**합니다.
	- 사용자 요청이나 외부 event에 빠르게 응답할 수 있습니다.

- **탄력성 (Elasticity)** : reactive system은 **부하나 실패에 유연하게 대응**할 수 있습니다.
	- system의 자원을 동적으로 조절하여 확장성과 가용성을 제공합니다.

- **Message 기반 (Messaging)** : reactive system은 **message 기반 architecture를 기반으로 동작**합니다.
	- component 간에 비동기적으로 message를 교환하여 상호작용합니다.


### Reactive Programming의 주요 개념

- **Data Stream** : 시간에 따라 변하는 **값의 연속적인 흐름**을 나타냅니다.
   - 예를 들어, mouse click event, sensor data, web socket message 등이 data stream이 될 수 있습니다.

- **Observer Pattern** : **Subject(주체)와 Observer(관찰자)의 관계**를 정의합니다.
   - Subject는 data의 변화를 감지하고, Observer는 그 변화를 받아 처리합니다.
   - Reactive Programming에서는 주로 Observable(주체)과 Observer(관찰자)의 형태로 구현됩니다.

- **연산자** : 연산자(operator)는 **data stream을 변환하고 조작하는 함수**들입니다.
	- `map`, `filter`, `reduce` 등의 연산자를 통해 stream의 data를 원하는 형태로 가공할 수 있습니다.

- **비동기 처리** : Reactive Programming은 **비동기 event를 처리하는 데 중점**을 둡니다.
	- callback이나 promise를 사용하는 대신, stream을 통해 data의 흐름을 관리합니다.


### Reactive Programming의 장점

- **성능 및 확장성** : **비동기 event 처리**를 통해 system의 확장성과 성능을 높일 수 있습니다.
	- 다수의 event를 동시에 처리할 수 있으며, 필요에 따라 system을 병렬로 확장할 수 있습니다.

- **응답성** : data의 변화에 실시간으로 반응하여 **빠른 응답 시간**을 제공합니다.
	- 사용자 경험을 향상시키는 데 도움이 됩니다.

- **유지 보수성** : **data 흐름과 처리가 명확하게 정의**됩니다.
	- code의 가독성과 유지 보수성이 향상됩니다.

- **장애 처리와 회복력** : **오류를 격리**시키고, **다른 component에 영향을 주지 않으면서 정상 동작을 유지**할 수 있습니다.
	- 장애가 발생하더라도 탄력적으로 대응할 수 있습니다.


