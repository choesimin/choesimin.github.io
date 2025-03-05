---
layout: skill
permalink: /187
title: netstat - Network 상태 조회하기
description: netstat은 network 상태를 조회하는 명령어입니다.
date: 2024-11-01
---


## `netstat` : Network 통계 조회 명령어

```sh
# LISTEN 상태의 TCP 연결 조회하기
netstat -tln
```

- `netstat`은 **system의 network 상태를 확인**할 수 있게 해주는 도구입니다.
    - "netstat"은 "Network Statistics"의 약자입니다.
    - **network 통계**를 출력하는 명령어로, 현재 system의 network 연결 상태, routing table, network interface 통계 등을 보여줍니다.
    - 주로 network 상태를 점검하거나 문제를 해결할 때 많이 사용되며, 특히 port 점유 현황을 파악할 때 자주 사용합니다.
        - 성능 monitoring과 보안 점검에도 사용합니다.


