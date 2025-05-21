---
layout: note
permalink: /220
title: AWS Instance에 대한 접근 제어 - Security group, Network ACL
description: AWS Instance에 대한 접근 제어를 위해 Security group과 Network ACL을 사용할 수 있습니다.
date: 2023-07-31
---


## Security Group과 Network ACL 비교

| Security Group | Network ACL |
| --- | --- |
| **약자** |  |
| Security Group | Network Access Contorl List |
| **설정** |  |
| 설정이 비교적 간단하며, 설정에 대한 접근성이 좋음 | 설정이 비교적 까다로움 |
| EC2와 VPC 등 여러 곳에서 설정 interface로 진입할 수 있음 | VPC로만 설정 interface에 진입할 수 있음 |
| **운영** |  |
| instance level에서 운영됨 | subnet level에서 운영됨 |
| instance level은 subnet level의 하위 level이기 때문에 subnet level에서 막았다면, instance level에서도 접근할 수 없음 | subnet level은 instance level보다 상위 level |
| **IP 규칙** |  |
| 허용 규칙만 지원 | 허용 규칙과 거부 규칙을 지원 |
| 특정 IP를 막을 수 없음 | 특정 IP만을 막을 수도 있음 |
| **상태 저장 여부** |  |
| 상태를 저장 | 상태를 저장하지 않음 |
| 규칙에 관계없이 traffic이 자동으로 허용됨 | 반환 traffic이 규칙에 의해 명시적으로 허용되어야 함 |
| **Traffic 허용 여부** |  |
| traffic 허용 여부를 결정하기 전에 모든 규칙을 평가함 | traffic 허용 여부를 결정할 때 번호가 가장 낮은 규칙부터 순서대로 규칙을 처리함 |
| 예를 들어, 같은 port에 다른 규칙이 적용되어 있다면, 모든 규칙이 적용됨 | 예를 들어, 같은 port에 다른 규칙이 적용되어 있다면, 번호가 더 낮은 규칙만 적용됨 |
| **접근 제어** |  |
| instance에 security group이 연결되어야만 접근 제어 규칙이 instance에 적용됨 | 연결된 subnet의 모든 instance에 자동 적용됨 |
| instance에 연결해야 접근 제어가 적용되며, 일반적으로 첫 번째 방어선으로 사용됨 | security group 규칙이 지나치게 허용적일 경우 추가 보안 계층을 제공함 |