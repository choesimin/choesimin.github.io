---
layout: note
permalink: /340
title: Framework - IoC를 통한 일관된 개발 환경
description: framework는 software 개발 시 공통으로 사용되는 기능들을 미리 구현해 놓은 기반 구조로, 개발자가 특정 규칙과 pattern을 따라 code를 작성하도록 합니다.
date: 2025-06-19
---


## Framework

- framework는 software 개발 시 공통으로 사용되는 기능들을 미리 구현해 놓은 **기반 구조**입니다.
- framework는 개발자가 **특정 규칙과 패턴**을 따라 code를 작성하도록 하여, 일관성 있고 효율적인 개발을 가능하게 합니다.
- library와 달리 framework는 **제어의 역전(Inversion of Control, IoC)** 원칙을 통해 개발자의 code를 제어합니다.


---


## Framework의 핵심 특징

- framework는 application의 **전체적인 구조와 흐름**을 미리 정의해 놓습니다.
- 개발자는 framework가 제공하는 **template과 규칙**에 따라 code를 작성합니다.
- framework는 **재사용 가능한 component**들을 제공하여 개발 시간을 단축시킵니다.
- **일관된 code 구조**를 강제하여 team 개발 시 code의 가독성과 유지 보수성을 향상시킵니다.


### Framework의 동작 방식

- framework는 **미리 정의된 workflow**를 가지고 있으며, 개발자의 code는 이 workflow 내에서 실행됩니다.
- 개발자는 framework가 **callback으로 호출**할 method나 function을 구현합니다.
- framework가 **언제, 어떻게** 개발자의 code를 실행할지 결정합니다.
- 이러한 방식을 통해 framework는 application의 **생명 주기 전체**를 관리합니다.


### Framework 사용의 장점

- **개발 속도 향상**을 통해 반복적인 작업을 줄일 수 있습니다.
- **표준화된 구조**로 인해 code의 일관성이 보장됩니다.
- **검증된 pattern**을 사용하여 안정성이 높습니다.
- **community 지원**과 풍부한 documentation을 통해 학습 cost를 줄일 수 있습니다.


### Framework 사용의 단점

- framework의 **학습 cost**가 높을 수 있습니다.
- framework에 **종속성**이 생겨 migration이 어려울 수 있습니다.
- **유연성 제한**으로 인해 특수한 요구 사항 구현이 어려울 수 있습니다.
- framework의 **성능 overhead**가 발생할 수 있습니다.


---


## Framework와 Library의 차이점

- framework와 library의 가장 큰 차이점은 **제어권의 위치**입니다.
- **framework는 제어의 역전(IoC)을 통해 개발자의 code를 제어**하지만, **library는 개발자가 직접 호출**하여 사용합니다.
- 이러한 차이로 인해 framework와 library는 서로 다른 방식으로 사용됩니다.

| 구분 | Framework | Library |
| --- | --- | --- |
| **제어권** | framework가 개발자 code 호출 | 개발자가 library function 호출 |
| **사용 방식** | framework 규칙에 따라 code 작성 | 필요할 때 function 호출 |
| **구조** | 전체 application 구조 제공 | 특정 기능만 제공 |
| **자유도** | 제한적, framework 규칙 준수 필요 | 높음, 자유로운 사용 가능 |
| **학습 cost** | 높음, framework 전체 이해 필요 | 낮음, 필요한 부분만 학습 |

- **React framework** : component lifecycle을 React가 관리하며, 개발자는 render method를 구현합니다.
    - React가 **언제 render할지 결정**하고, 개발자의 render method를 호출합니다.
    - 개발자는 React의 **규칙과 pattern**을 따라 component를 작성해야 합니다.

- **jQuery library** : 개발자가 필요할 때 jQuery function을 직접 호출합니다.
    - `$('#button').click()`과 같이 개발자가 **원하는 시점**에 function을 사용합니다.
    - jQuery는 **단순히 utility function**만 제공하며, application 구조는 관여하지 않습니다.


### 제어의 역전(Inversion of Control, IoC)

- **전통적인 programming**에서는 개발자가 작성한 code가 library의 function을 호출합니다.
- **IoC pattern**에서는 framework가 개발자의 code를 호출하여 제어권이 역전됩니다.
- framework는 **언제 무엇을 호출할지** 결정하고, 개발자는 **호출될 code를 제공**합니다.
- 이를 통해 framework는 application의 **전체적인 흐름을 통제**할 수 있습니다.


### 의존성 주입(Dependency Injection, DI)

- **의존성 주입**은 IoC를 구현하는 대표적인 방법 중 하나입니다.
- framework가 **필요한 객체나 의존성**을 개발자의 code에 주입해 줍니다.
- 개발자는 **의존성을 직접 생성하지 않고** framework로부터 받아서 사용합니다.
- 이를 통해 **loose coupling**을 달성하고 code의 test 가능성을 높입니다.


### Framework와 Library 선택 기준

- **project 규모**가 크고 **표준화된 구조**가 필요하다면 framework를 선택합니다.
- **개발 속도**와 **일관성**이 중요하다면 framework가 적합합니다.
- **유연성**과 **자유도**가 중요하다면 library를 선택합니다.
- **특정 기능**만 필요하고 **가벼운 solution**을 원한다면 library가 적합합니다.


---


## 주요 Framework 종류

- 다양한 분야에서 사용되는 framework들이 존재하며, 각각 고유한 특징과 목적을 가지고 있습니다.
- framework는 **개발 영역**에 따라 web framework, mobile framework, backend framework 등으로 분류됩니다.


### Web Framework

- **React** : component 기반 UI library이지만 ecosystem 전체를 고려하면 framework 역할을 합니다.
- **Angular** : Google에서 개발한 full-featured web framework로 TypeScript 기반입니다.
- **Vue.js** : 점진적 도입이 가능한 유연한 web framework입니다.
- **Svelte** : compile time에 최적화되는 modern web framework입니다.


### Backend Framework

- **Spring** : Java 기반의 enterprise급 backend framework입니다.
- **Django** : Python 기반의 full-stack web framework로 rapid development를 지원합니다.
- **Express.js** : Node.js 기반의 minimalist web framework입니다.
- **Ruby on Rails** : Ruby 기반의 convention over configuration을 추구하는 framework입니다.


### Mobile Framework

- **React Native** : JavaScript로 native mobile app을 개발할 수 있는 framework입니다.
- **Flutter** : Google에서 개발한 cross-platform mobile framework로 Dart 언어를 사용합니다.
- **Xamarin** : Microsoft의 C# 기반 cross-platform mobile framework입니다.


---


## Reference

- <https://velog.io/@kwontae1313/제어-역전IoC과-의존성-주입DI>
- <https://velog.io/@kwontae1313/프레임워크와-라이브러리의-차이는>
