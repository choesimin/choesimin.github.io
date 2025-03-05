---
layout: skill
permalink: /45
title: Amazon VPC - 격리된 가상 Network
description: VPC는 사용자의 AWS 계정 전용 가상 network입니다.
date: 2023-07-18
---


## VPC : Virtual Private Cloud

- **VPC를 만드는 것**은 **IP 주소 범위를 설정하는 것**입니다.

- AWS에서 기본으로 제공되는 VPC가 있습니다.
    - 따라서 VPC를 직접 만들지 않아도 Instance는 기본 VPC로 생성할 수 있습니다.
        - 그러나 custom VPC를 만들어 사용하는 것이 일반적으로 더 낫습니다.
    - 기본 VPC의 전체 network 주소 범위는 `172.31.0.0`부터 `172.31.255.255`까지입니다.

- VPC는 일반적으로 보안을 위해 AWS resource 간의 허용을 최소화하고, 네트워크를 손쉽게 group으로 구성하기 위해 사용합니다.

|  | VPC 관련 Service |
| --- | --- |
| VPC Peering | 독립적인 VPC간의 network 통신을 가능하게 합니다. |
| AWS Diarect Connect | 기존의 On-premise와 VPC를 연결합니다. |
| VPC FLow Logs | VPC에서 발생하는 log를 기록합니다. |


---


## Custom VPC 설정하는 과정


### 1. VPC 만들기

- IP CIDR(IP 주소 범위)를 설정하고 VPC를 생성합니다.


### 2. Subnet 만들기

- Subnet을 만들 VPC를 선택하고, AZ(가용 영역)과 CIDR을 설정하여 Subnet을 생성합니다.

- Subnet을 생성한 후에, Public IP 자동 생성 option을 활성화합니다.
    - Subnet 설정에서 `Auto-assign IP settings`의 `Enable auto-assign public IPv4 address`을 활성화합니다.
    - 활성화하지 않으면, 자동 생성되어 무료로 제공되는 Public IP를 받을 수 없습니다.


## 3. Internet gateway 만들기

- VPC를 새로 만들었다면 Internet gateway도 생성해야 합니다.
    - VPC 하나에 Internet gateway 하나를 1대1로 연결해야 하기 때문입니다.
    - Internet gateway는 VPC에 연결해야 사용할 수 있습니다.


## 4. Routing table 만들기

- routing table은 VPC를 만들 때 자동으로 만들어집니다.
    - 이미 생성된 routing table에 이름만 설정해주면 됩니다.

- routing table에 Anyware(`0.0.0.0/0`) route를 추가합니다.
    - destination에 `0.0.0.0/0`, target에 `Internet Gateway`를 선택하여 만들어 둔 Internet gateway를 연결합니다.

- routing table을 Subnet에 연결합니다.
    - `Edit subnet associations`에서 연결합니다.


---


## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
