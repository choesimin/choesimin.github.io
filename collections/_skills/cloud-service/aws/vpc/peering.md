---
layout: skill
permalink: /210
title: Amazon VPC Peering - VPC끼리 연결하기
description: Amazon VPC Peering을 사용하여 서로 다른 VPC를 연결할 수 있습니다.
date: 2023-07-16
---


## VPC Peering

- peering이란 서로 다른 VPC에 있는 Instance 간의 통신을 가능하게 해주는 것입니다.
    - region이 달라도 peering할 수 있습니다.
    - 서로의 Private IP로 통신할 수 있게 해줍니다.

- Public IP 통신에는 peering이 필요하지 않습니다.
    - Security group의 Inbound 규칙에 `모든 ICMP`를 등록하면, Public IP로 연결할 수 있습니다.

- 같은 IP 대역을 사용하고 있다면 peering할 수 없습니다.
    - IP가 충돌하기 때문입니다.


