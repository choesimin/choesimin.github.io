---
layout: skill
permalink: /178
title: Clean Architecture
description: system 수명과 관련된 비용은 최소화하고, programmer의 생산성은 최대화할 수 있는 architecture가 좋은 architecture입니다.
date: 2023-11-02
---


## Architecture 설계 : 비용을 낮추고 품질을 높이기

- software system의 architecture란 **system을 구축했던 사람들이 만들어낸 system의 형태**입니다.
    - architecture는 system을 component로 분할하는 방법, 분할된 component를 배치하는 방법, component의 의사소통하는 방식에 따라 정해집니다.
        - system의 architecture는 system 내부에 그어진 architecture 경계와 경계를 넘나드는 의존성에 의해 정의됩니다.
        - system의 구성 요소가 통신하고 실행되는 물리적인 mechanism에 의해 architecture가 정의되는 것은 아닙니다.

- code와 설계의 구조를 깔끔하게 만들려는 생각을 하지 않으면, 시간이 지날수록 비용이 높아지고, 개발자의 생산성은 0에 수렴하게 됩니다.
    - 엉망이 된 상황에 대처하기 위한 노력이 들어가기 때문입니다.
    - 빨리 가는 유일한 방법은 제대로 가는 것입니다.

- 설계 품질을 재는 척도는 고객의 요구를 만족시키는 데에 드는 비용을 재는 척도와 같습니다.
    - system의 수명이 다할 때까지 **비용을 낮게 유지할 수 있는 설계는 좋은 설계**입니다.
    - 새로운 기능을 출시할 때마다 **비용이 증가하는 설계는 나쁜 설계**입니다.


### Architecture의 목표

- software architecture의 목표는 필요한 system을 만들고 유지 보수하는 데에 투입되는 인력을 최소화하는 것입니다.
    - 따라서 software system을 쉽게 개발하고, 쉽게 배포하고, 쉽게 운영하고, 쉽게 유지 보수할 수 있도록 architecture를 만들어야 합니다.


### 좋은 Architecture

- UseCase가 중심이 되어, framework나 도구 등에 구애받지 않고 UseCase를 지원하는 구조를 가집니다.
- framework, database, web server, 여타 개발 환경 문제나 도구에 대한 결정을 미룰 수 있습니다.
- project의 훨씬 후반까지 결정을 하지 않아도 되도록 도와줄 뿐만 아니라, 결정을 쉽게 번복할 수 있습니다.
- UseCase에 중점을 두며, 지엽적인 관심사에 대한 결합은 분리시킵니다.


