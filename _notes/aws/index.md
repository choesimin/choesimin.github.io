---
layout: note
title: AWS
date: 2023-07-16
---




## AWS : Amazon Web Services

- AWS는 Amazon에서 제공하는 Cloud service입니다.




---




## AWS의 장점


### 종량 과금제

- 초기 비용 없이 사용한 만큼만 지불하는 종량 과금제 방식입니다.


### 빠른 Infra 구축 속도

- On-premise server 구축 기간과 비교하여 infra 구축 속도가 빠릅니다.


### 사전 Resource 확보 불필요

- AWS는 확장을 위한 사전 resource를 확보할 필요가 없습니다.
    - resource를 원하는 때에 원하는 만큼 늘리거나 줄일 수 있기 때문입니다.
- On-premise server 환경에서는 보통 resource를 확장할 때를 대비하여 사전에 spare resource를 확보해두어야 합니다.


### Instance life cycle의 쉬운 관리

- Instance(VM)의 life cycle을 쉽게 관리할 수 있습니다.
- e.g., Black Friday 행사 기간 동안에 server를 잠시 늘렸다가, 행사가 끝났을 때 다시 줄이는 작업을 쉽게 할 수 있습니다.


### 고가용성 System 구축에 필요한 Service 제공

- 고가용성 System 구축에 필요한 Service를 제공합니다.


### Service 관리 자동화가 용이함

- API를 제공하기 때문에 Service 관리를 자동화하기 좋습니다.
- AWS에서 해야 할 작업의 내용을 API를 이용한 script로 작성하여 실행할 수 있습니다.




---




## Cloud Service

- Cloud Service는 computing 자원의 공유 pool에 network(internet)로 접근할 수 있게 하는 model입니다.
    - 어디서든 필요한 시점에 접근할 수 있습니다.
    - computing 자원에는 CPU, RAM, network, server, storage, application, service 등이 있습니다.


### Cloud Service의 종류

- Cloud Service는 사용자와 Vender가 관리하는 영역에 따라서 **Packaged Software(On-premise)**, **IaaS(Infrastructure as a Service)**, **PaaS(Plarform as a Service)**, **SaaS(Software as a Service)**로 나뉩니다.

| 관리 영역 | Packaged Software | IaaS | PaaS | SaaS |
| --- | --- | --- | --- | --- |
| Applications | User | User | User | Vender |
| Data | User | User | User | Vender |
| Runtime | User | User | Vender | Vender |
| Middleware | User | User | Vender | Vender |
| O/S | User | User | Vender | Vender |
| Virtualization | User | Vender | Vender | Vender |
| Servers | User | Vender | Vender | Vender |
| Storage | User | Vender | Vender | Vender |
| Networking | User | Vender | Vender | Vender |




---




## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
