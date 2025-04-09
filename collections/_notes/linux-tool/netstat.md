---
layout: note
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


---


## `netstat` 명령어 사용법

```bash
netstat [option]
```

| Option | 설명 |
| --- | --- |
| ` ` (`netstat`만 입력) | network 연결 상태를 요약해서 조회 |
| `-a` (All) | 모든 연결 상태를 조회 |
| `-l` (Listen) | `LINTEN` 상태인 service port를 조회 |
| `-n` (Numeric) | host 이름과 port 이름을 lookup하여 변환하지 않고, 그대로 숫자 형식(IP 주소, port 번호)으로 조회 |
| `-p` (Program) | 각 연결에 대해 어떤 process가 사용 중인지 조회 |
| `-r` (Routing) | 현재 routing table을 조회 |
| `-s` (Statistics) | protocol별 통계를 출력 |
| `-t` (TCP) | TCP와 관련된 연결만 조회 |
| `-u` (UDP) | UDP와 관련된 연결만 조회 |
| `-c` (Continuous) | 1초 단위로 결과를 연속적으로 조회 |

- 최근에는 `ss`라는 명령어가 `netstat`을 대체하는 경우도 많습니다.
    - `ss`는 `netstat`보다 더 빠르고 효율적인 network 상태 확인 도구로, Linux system에서 자주 사용됩니다.


### TCP 연결로 Listening 중인 IP와 Port 번호를 확인하기

```bash
netstat -tln
```


### 모든 Network 연결과 Port 확인하기

```bash
netstat -a
```


### Routing Table 정보 확인하기

```bash
netstat -r
```
