---
layout: skill
title: JMX - Java의 Monitoring API
date: 2025-02-07
---




## JMX : Java App Monitoring Spec 통일

- JMX(Java Management eXtensions)는 **Java application 관리와 monitoring을 위한 표준 framework**입니다.
    - 현재 Java SE platform의 필수 component로 포함되어 있으며, Java SE 5 version(JDK 1.5)부터 정식으로 제공되었습니다.

    - application과 system resource의 실시간 monitoring이 가능합니다.
    - application의 동작 상태를 변경할 수 있습니다.
    - application의 설정값을 동적으로 수정할 수 있습니다.




- JMX는 Java application에서 managing과 monitoring 기능을 표준화한 specification입니다.
    - Java application의 resource를 MBean(Managed Bean)으로 표현합니다.



    - application의 resource를 MBean으로 변환하여 관리하는 계층입니다.
    - MBean server를 중심으로 resource를 관리하는 계층입니다.
    - 원격 관리 application과의 통신을 담당하는 계층입니다.



---

## 구조적 특징

### Instrumentation Layer

- application의 resource를 MBean으로 변환하여 관리하는 계층입니다.
    - application의 기능과 상태를 MBean interface로 추상화합니다.
    - MBean을 통해 resource의 관리와 monitoring이 가능합니다.
    - service, component, device 등 다양한 resource를 MBean으로 구현할 수 있습니다.

### Agent Layer

- MBean server를 중심으로 resource를 관리하는 계층입니다.
    - MBean의 life cycle을 관리합니다.
    - MBean에 대한 naming service를 제공합니다.
    - client의 요청을 적절한 MBean으로 routing합니다.

### Remote Management Layer

- 원격 관리 application과의 통신을 담당하는 계층입니다.
    - protocol adapter를 통해 다양한 protocol을 지원합니다.
    - connector를 통해 원격 client와 통신합니다.
    - security 기능을 제공합니다.


---


## Architecture 특징

### Model-driven Architecture

- MBean을 통해 관리 대상을 모델링합니다.
    - resource의 interface를 명확하게 정의합니다.
    - 표준화된 방식으로 resource를 관리합니다.
    - design pattern을 적용하여 확장성을 확보합니다.

### Service-oriented Architecture

- service 단위로 관리 기능을 제공합니다.
    - 독립적인 service unit으로 구성됩니다.
    - service 간의 loose coupling을 유지합니다.
    - 필요한 service만 선택적으로 사용할 수 있습니다.

### Distributed Architecture

- 분산 환경에서의 관리를 지원합니다.
    - 원격지의 resource를 통합 관리할 수 있습니다.
    - 다양한 protocol을 통해 접근할 수 있습니다.
    - clustering 환경에서의 관리가 가능합니다.


---


## 표준화 범위

### Interface 표준화

- MBean interface 정의 방식이 표준화되어 있습니다.
    - attribute와 operation의 명명 규칙이 있습니다.
    - interface 구현 방식이 정형화되어 있습니다.
    - type 변환 규칙이 명확합니다.

### Protocol 표준화

- 관리 protocol이 표준화되어 있습니다.
    - JMX Remote API specification이 존재합니다.
    - connector와 adapter의 구현 방식이 정의되어 있습니다.
    - security 처리 방식이 규정되어 있습니다.

### Notification 표준화

- event 처리 방식이 표준화되어 있습니다.
    - notification 발생과 구독 방식이 정의되어 있습니다.
    - notification 전달 방식이 규정되어 있습니다.
    - notification filtering 방식이 표준화되어 있습니다.


















































---




## JMX의 주요 구성 요소






### MBean

- MBean(Managed Bean)은 JMX로 관리하고자 하는 resource를 나타내는 Java object입니다.
    - application의 주요 기능과 상태를 외부에 노출합니다.
    - monitoring과 관리가 필요한 대상을 MBean으로 구현합니다.
    - **Standard MBean**, **Dynamic MBean**, **Open MBean**, **Model MBean** 등의 type이 있습니다.

### MBean Server

- MBean server는 MBean을 관리하는 registry입니다.
    - MBean의 등록과 해제를 담당합니다.
    - MBean에 대한 원격 접근을 제공합니다.
    - client의 요청을 해당 MBean으로 전달합니다.

### JMX Agent

- JMX agent는 MBean server와 protocol connector를 포함하는 관리 agent입니다.
    - remote management application과 통신합니다.
    - MBean server를 통해 MBean을 관리합니다.
    - **RMI**, **IIOP**, **HTTP** 등 다양한 protocol을 지원합니다.

---

## JMX의 활용

### Monitoring

- application의 주요 metric을 실시간으로 monitoring합니다.
    - memory 사용량, thread 상태, CPU 사용률 등을 확인할 수 있습니다.
    - application의 성능 지표를 수집할 수 있습니다.
    - system의 전반적인 상태를 파악할 수 있습니다.

### 설정 관리

- application의 설정을 동적으로 변경할 수 있습니다.
    - logging level 조정이 가능합니다.
    - connection pool size 변경이 가능합니다.
    - cache 설정 변경이 가능합니다.

### 문제 해결

- application 운영 중 발생하는 문제를 해결하는 데 활용합니다.
    - thread dump 수집이 가능합니다.
    - heap dump 생성이 가능합니다.
    - GC(Garbage Collection) 상태 확인이 가능합니다.
