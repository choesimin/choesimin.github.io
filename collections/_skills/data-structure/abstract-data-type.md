---
layout: skill
permalink: /225
title: 추상 자료형 (ADT, Abstract Data Type)
description: 추상 자료형은 data와 data에 대한 연산을 정의하지만, data가 실제로 어떻게 구현되는지는 숨깁니다.
date: 2024-05-21
---


## 추상 자료형 : Interface와 구현을 분리하여 추상화 계층을 둔 것

- 추상 자료형(Abstract Data Type, ADT)은 **data와 data에 대한 연산을 정의**하지만, **data가 실제로 어떻게 구현되는지는 숨깁니다.**
    - 이는 사용자가 data 구조의 내부 구현을 알 필요 없이, data와 상호작용할 수 있게 해줍니다.

- 추상 자료형은 구현 방법을 명시하지 않다는 점에서 자료 구조와 다릅니다.


### 추상 자료형의 개념

- **추상화** : ADT는 data와 data를 조작하는 연산들을 추상화합니다.
    - 예를 들어, Stack ADT는 `push`, `pop`, `isEmpty`와 같은 연산을 정의할 수 있습니다.

- **캡슐화** : ADT는 data를 숨기며, data가 실제로 어떻게 저장되고 관리되는지는 사용자에게 보이지 않습니다.
    - 사용자는 제공된 연산을 통해서만 data와 상호작용할 수 있습니다.

- **Interface** : ADT는 data와 data를 조작하는 방법을 정의하는 interface입니다.
    - interface는 data type과 그 연산의 명세(specification)를 포함합니다.


