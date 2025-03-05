---
layout: skill
permalink: /116
title: OSI Model (OSI 7 계층)
description: OSI Model은 network 통신 과정을 7개의 계층으로 나눈 것으로, 각 계층은 특정 기능을 수행하도록 정의된 framework입니다.
date: 2024-09-22
---


## OSI 7 계층 : Network에서 통신이 일어나는 과정을 7단계로 나눈 것

- **OSI Model**(Open Systems Interconnection Reference Model)은 국제 표준화 기구(ISO)에서 개발한 model로, **computer network protocol design과 통신을 계층으로 나누어 개념적으로 설명한 것**입니다.
    - 일반적으로 OSI 7 계층이라 불리기도 합니다.
    - data 통신을 **7개의 추상적인 계층으로 분리**하고, protocol을 networking 기능으로 적절히 묶어 **표준화**합니다.

- OSI 7 계층 model은 network 통신 과정을 **7개의 추상적인 계층**으로 나누어 **각 계층이 특정 기능을 수행하도록 정의한 개념적 framework**입니다.
    - 이는 복잡한 network 통신 과정을 단계별로 이해하고, 문제 발생 시 해당 계층만 집중적으로 분석하여 해결할 수 있도록 돕습니다.
    - 또한, 다양한 vendor와 기술 간의 상호 운용성을 보장하여 효율적인 통신 환경을 구축할 수 있도록 합니다.
 
- network 문제가 발생했을 때, OSI model은 **다른 계층에 있는 장비나 software를 건드리지 않고 문제를 해결**할 수 있도록 돕습니다.
    - 만약 회사에서 업무를 보는데 internet 연결이 끊겼다면, 문제의 원인이 어디에 있는지 알아봐야 할 것입니다.
    - 모든 PC에 문제가 있다면, router의 문제(L3 Network 계층)이거나 광랜을 제공하는 회사의 회선(L1 물리 계층) 문제일 가능성이 높습니다.
    - 한 PC만 문제가 있다면, 문제 PC가 사용하는 software(L7 application 계층)의 문제일 수 있습니다.
    - software에 문제가 없다면, switch(L2 Data Link 계층)의 문제일 수 있습니다.

- 각 계층은 **하위 계층의 기능만을 이용**하고, **상위 계층에게 기능을 제공**합니다.
    - protocol stack은 hardware나 software 혹은 둘의 혼합으로 구현될 수 있습니다.
        - protocol stack : 상위와 하위 계층들로 구성되는 protocol system이 구현된 system.
    - 이러한 protocol stack은 일반적으로 **하위 계층들은 hardware로, 상위 계층들은 software로 구현**됩니다.

| 계층 | 특징 | 주요 Protocol/기술 |
| 