---
layout: note
permalink: /297
title: Test Code - 오류 먼저 발견하기
description: test code는 program의 오류를 빠르게 발견하게 해주어, program의 안정성과 개발 속도를 높여줍니다.
date: 2025-03-06
---


## Test Code

- test code는 **software의 기능, 성능, 안전성을 검증하기 위한 code**입니다.
    - main code와 분리되어 독립적으로 실행되어 오류를 조기에 발견합니다.

- test code를 작성하는 것은 software 품질 향상을 위한 중요한 과정입니다.


### Test Code의 이점

1. **software의 안정성과 신뢰성을 향상**시킵니다.
    - bug를 조기에 발견하고 수정할 수 있습니다.
    - regression(기존 기능의 오작동)을 방지할 수 있습니다.

2. **code의 품질과 유지 보수성을 개선**합니다.
    - 명확한 interface와 책임 분리를 유도합니다.
    - legacy code 수정 시 안전망 역할을 합니다.

3. **개발 속도와 생산성을 향상**시킵니다.
    - 변경 사항에 대한 즉각적인 feedback을 제공합니다.
    - debugging 시간을 줄여줍니다.

4. **documentation 역할**을 합니다.
    - code의 사용 방법과 의도를 알려주는 살아있는 문서가 됩니다.
    - 새로운 개발자의 온보딩 시간을 단축시킵니다.


---


## Test의 유형

- test는 크게 **unit test**, **integration test**, **end-to-end test**로 구분됩니다.
    - test 유형에 따라 작성해야 할 test code도 다릅니다.


### Unit Test : 단위 검증

- unit test는 code의 가장 작은 단위인 **함수, method, class 등을 검증**합니다.
    - 각 component가 설계대로 **독립적으로 작동하는지 확인**합니다.
    - 다른 component나 외부 system에 의존하지 않고 **격리된 환경**에서 test합니다.

- 실행 속도가 빠르고 **즉각적인 feedback**을 제공합니다.
    - 개발자가 code를 수정하자마자, 바로 test를 실행하여 오류를 발견할 수 있습니다.

- unit test는 개발자가 직접 작성하며, 일반적으로 **자동화된 test 도구**를 사용합니다.
    - 예를 들어, JUnit, NUnit, PyTest 등이 있습니다.


### Integration Test : 통합 검증

- integration test는 **여러 unit이 함께 올바르게 작동하는지 검증**합니다.
    - component 간의 상호작용과 interface 연결이 제대로 동작하는지 test합니다.
    - database, file system, network 등 외부 resource와의 연동을 test합니다.

- integration test는 **unit test보다 복잡**하고 실행 시간이 오래 걸립니다.

- integration test는 **실제 환경과 유사한 조건에서 진행**되어 현실적인 오류를 발견할 수 있습니다.


### End-to-End Test : 전체 검증

- end-to-end test는 **사용자 관점에서 전체 system의 workflow를 검증**합니다.
    - 실제 user scenario를 simulation하여 전체 system이 올바르게 작동하는지 확인합니다.
    - 모든 component와 외부 system을 포함한 전체 application을 test합니다.

- 실행 시간이 가장 길지만, **사용자 경험에 가장 가까운 test**를 할 수 있습니다.

- 주로 QA team이나 전문 test engineer가 담당하여 진행합니다.
    - QA는 quality assurance의 약자로, software의 품질을 보증하는 역할을 가지고 있습니다.


---


## Test Code 작성 원칙

- test code를 작성 시 권장되는 원칙들이 있습니다.
    - **FIRST** : Fast, Independent, Repeatable, Self-validating, Timely.
    - **TDD** : Test Driven Development.


### FIRST 원칙

- **Fast** : test는 빠르게 실행되어야 합니다.
    - 개발자가 자주 실행할 수 있도록 실행 시간이 짧아야 합니다.

- **Independent** : 각 test는 독립적이어야 합니다.
    - 다른 test에 의존하지 않고 독립적으로 실행될 수 있어야 합니다.

- **Repeatable** : test는 어떤 환경에서도 반복 가능해야 합니다.
    - 환경에 상관없이 항상 같은 결과를 도출해야 합니다.

- **Self-validating** : test는 스스로 결과를 검증해야 합니다.
    - 성공 또는 실패를 명확하게 나타내야 합니다.

- **Timely** : test는 적시에 작성되어야 합니다.
    - 이상적으로는 production code 이전이나, 개발과 동시에 작성되어야 합니다.


### Test Driven Development (TDD)

- TDD는 **test code를 먼저 작성하고 이후에 실제 code를 개발하는 방법론**입니다.
    - **Red** : 실패하는 test를 먼저 작성합니다.
    - **Green** : test를 통과하는 최소한의 code를 작성합니다.
    - **Refactor** : code 품질을 개선하면서 test가 계속 통과하는지 확인합니다.

- TDD는 명확한 요구 사항 정의와 검증 가능한 code 작성에 도움을 줍니다.

- TDD는 code coverage를 자연스럽게 높이고 설계를 개선하는 효과가 있습니다.
