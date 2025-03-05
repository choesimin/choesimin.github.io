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
| 