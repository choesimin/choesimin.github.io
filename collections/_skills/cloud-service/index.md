---
layout: skill
permalink: /222
title: Cloud Service - Resource Networking
description: Cloud Service는 Network로 Computing Resource를 공유하는 model이며, Packaged Software, IaaS, PaaS, SaaS로 나뉩니다.
date: 2025-02-09
---


## Cloud Service : Network로 Computing Resource 같이 쓰기

- Cloud Service는 computing 자원의 공유 pool에 network(internet)로 접근할 수 있게 하는 model입니다.
    - 어디서든 필요한 시점에 접근할 수 있으며, 필요한 만큼만 resource를 사용하고 비용을 지불합니다.

- computing resource에는 CPU, RAM, network, server, storage, application, service 등이 있습니다.


---


## Cloud Service의 종류 : Packaged Software, IaaS, PaaS, SaaS

- Cloud Service는 사용자와 vender가 관리하는 영역에 따라서 **Packaged Software**(On-premise), **IaaS**(Infrastructure as a Service), **PaaS**(Plarform as a Service), **SaaS**(Software as a Service)로 나뉩니다.

| 관리 영역 | Packaged Software | IaaS | PaaS | SaaS |
| --- | --- | --- | --- | --- |
| **Applications** | User | User | User | Vender |
| **Data** | User | User | User | Vender |
| **Runtime** | User | User | Vender | Vender |
| **Middleware** | User | User | Vender | Vender |
| **O/S** | User | User | Vender | Vender |
| **Virtualization** | User | Vender | Vender | Vender |
| **Servers** | User | Vender | Vender | Vender |
| **Storage** | User | Vender | Vender | Vender |
| **Networking** | User | Vender | Vender | Vender |


### Packaged Software : On-premise

- Packaged Software는 **기존의 On-premise 방식**입니다.
    - 사용자가 applications부터 networking까지 모든 영역을 직접 관리합니다.
    - 초기 구축 비용이 높고 유지 보수에 많은 인력이 필요합니다.
    - 보안성이 높고 customization이 자유롭다는 장점이 있습니다.


### IaaS : Infrastructure as a Service

- IaaS는 **기본 computing infrastructure를 service로 제공**합니다.
    - vendor는 virtualization, servers, storage, networking을 관리합니다.
    - 사용자는 O/S, middleware, runtime, applications, data를 관리합니다.
    - AWS EC2, Google Compute Engine이 대표적인 예시입니다.


### PaaS : Platform as a Service

- PaaS는 **application 개발과 실행을 위한 platform을 제공**합니다.
    - vendor는 O/S, middleware, runtime까지 관리합니다.
    - 사용자는 applications와 data만 관리하면 됩니다.
    - Google App Engine, Heroku가 대표적인 예시입니다.


### SaaS : Software as a Service

- SaaS는 **완성된 software를 service로 제공**합니다.
    - vendor가 모든 영역을 관리합니다.
    - 사용자는 별도의 설치나 관리 없이 service를 이용할 수 있습니다.
    - Google Workspace, Microsoft 365가 대표적인 예시입니다.
