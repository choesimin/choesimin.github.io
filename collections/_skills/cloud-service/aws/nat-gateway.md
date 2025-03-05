---
layout: skill
permalink: /219
title: Amazon NAT Gateway - Private Instance의 Internet 연결 제어하기
description: NAT Gateway를 사용하여 Private Instance의 internet 연결을 제어할 수 있습니다.
date: 2023-08-06
---


## Private instance와 NAT Gateway

- Private Instance에 internet 연결이 필요한 작업(예를 들어, program install/update.)을 해야할 때, NAT Gateway를 사용하여 internet 연결을 제어할 수 있습니다.
    - Private Instance는 보안 상의 이유로 Private Subnet에 생성되어 Private Route Table에 연결되어 외부에서 접속할 수 없도록 설정한 server를 의미합니다.

- NAT Gateway는 송신 전용 gateway이며, 반드시 Public Subnet에 위치해야 합니다.


