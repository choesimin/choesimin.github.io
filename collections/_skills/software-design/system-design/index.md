---
layout: skill
title: System 설계 - 전체 구조 정의하기
date: 2024-02-22
---




## System Design : 요구 사항을 만족시키는 전체 구조를 체계적으로 정의하는 과정

- System Design(system 설계)란, 복잡한 **system의 구조, 구성 요소, interface, data, process 등을 정의하는 과정**입니다.
    - system이 특정 요구 사항을 만족시키기 위해 어떻게 작동해야 하는지 결정합니다.

- system 설계는 **개발 process의 초기 단계에서 수행**되며, project의 성공적인 완수를 위한 기초를 마련합니다.
    - 대규모 system과 software 개발 project에서 핵심적인 단계로, **효율적이고 신뢰할 수 있는 system을 구축하기 위한 청사진**을 제공합니다.

- 효과적인 system 설계는 사용자의 **요구 사항을 충족**시키고, **기술적 제약 사항을 고려**하며, 시장에서 경쟁력을 유지할 수 있는 software 및 hardware solution을 구축하는 데 필수적입니다.

- System 설계는 크게 **개념 설계**와 **상세 설계**로 나눌 수 있습니다.
    1. 개념 설계(conceptual design)는 system의 초기 개념을 정의하고, 주요 기능과 작동 원리, system 구성 요소 간의 관계를 개략적으로 설계합니다.
        - 추상화된 고수준의 idea를 구체화하고, system의 전체 구조와 흐름을 결정합니다.
    2. 상세 설계(detailed design)는 개념 설계를 바탕으로, system의 모든 세부 사항을 구체적으로 설계합니다.
        - data model, algorithm, interface, 통신 mechanism 등을 포함하며, 실제 구현을 위한 명확한 지침을 제공합니다.


### System 설계의 목표

- **성능 최적화** : system이 요구 사항에 맞게 최적의 성능을 발휘하도록 설계합니다.
- **신뢰성 향상** : system이 장애나 오류에도 불구하고 정상적으로 작동하도록 보장합니다.
- **확장성 제공** : 사용자 수나 data 양의 증가에 따라 system을 유연하게 확장할 수 있도록 합니다.
- **유지 보수 용이성** : system을 쉽게 update하고 유지 보수할 수 있도록 구조화합니다.
- **보안 강화** : system과 data를 보호하기 위한 보안 조치를 설계에 포함시킵니다.
