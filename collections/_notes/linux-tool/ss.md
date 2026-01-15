---
layout: note
permalink: /446
title: Linux ss 명령어
description: ss(socket statistics) 명령어는 netstat을 대체하는 현대적인 network socket 정보 조회 도구로, kernel의 netlink interface를 직접 사용하여 더 빠르고 상세한 정보를 제공합니다.
date: 2025-06-04
---


## ss 명령어

- `ss`(socket statistics)는 **network socket 정보를 조회**하는 Linux 명령어입니다.
    - `netstat`을 대체하는 현대적인 도구입니다.
    - `iproute2` package에 포함되어 있습니다.
    - kernel의 netlink interface를 직접 사용하여 `/proc/net`을 parsing하는 `netstat`보다 빠릅니다.


---


## 주요 Option

- `ss` 명령어는 **socket type, 상태 filter, 출력 형식**을 지정하는 option을 조합하여 사용합니다.


### Socket Type Option

- socket 유형을 지정하는 option입니다.

| Option | 설명 |
| --- | --- |
| `-t` | TCP socket만 표시 |
| `-u` | UDP socket만 표시 |
| `-w` | RAW socket만 표시 |
| `-x` | Unix domain socket만 표시 |
| `-d` | DCCP socket만 표시 |


### 상태 Filter Option

- socket 상태를 filtering하는 option입니다.

| Option | 설명 |
| --- | --- |
| `-l` | LISTEN 상태만 표시 |
| `-a` | 모든 상태 표시 (LISTEN 포함) |
| `-e` | 확장 정보 표시 |


### 출력 형식 Option

- 출력 형식을 지정하는 option입니다.

| Option | 설명 |
| --- | --- |
| `-n` | port와 address를 숫자로 표시 |
| `-p` | socket을 사용하는 process 정보 표시 |
| `-o` | timer 정보 표시 |
| `-m` | memory 사용량 표시 |
| `-i` | 내부 TCP 정보 표시 |


---


## 자주 사용하는 조합

- 실무에서는 **열린 port 확인, TCP 연결 상태 확인, 특정 port filtering** 등의 용도로 option을 조합합니다.


### 열린 Port 확인

- LISTEN 상태의 모든 TCP/UDP port를 확인합니다.

```bash
ss -tulnp
```

- `-t` : TCP socket.
- `-u` : UDP socket.
- `-l` : LISTEN 상태만.
- `-n` : 숫자로 표시.
- `-p` : process 정보 표시.


### 모든 TCP 연결 확인

- 모든 상태의 TCP 연결을 확인합니다.

```bash
ss -tanp
```

- `-t` : TCP socket.
- `-a` : 모든 상태.
- `-n` : 숫자로 표시.
- `-p` : process 정보 표시.


### 특정 Port 확인

- 특정 port를 사용하는 socket을 확인합니다.

```bash
ss -tlnp 'sport = :8080'
```

- `sport` : source port filtering.
- `dport` : destination port filtering.


### 특정 상태 확인

- 특정 상태의 socket만 확인합니다.

```bash
ss -t state established
ss -t state time-wait
ss -t state close-wait
```


### 연결 통계 확인

- socket 상태별 통계를 확인합니다.

```bash
ss -s
```

```
Total: 342
TCP:   45 (estab 12, closed 8, orphaned 0, timewait 5)

Transport Total     IP        IPv6
RAW       1         0         1
UDP       8         5         3
TCP       37        25        12
INET      46        30        16
FRAG      0         0         0
```


---


## 출력 항목

- `ss` 명령어는 **Netid, State, Recv-Q, Send-Q, Local/Peer Address** 등의 항목을 출력합니다.

| 항목 | 설명 |
| --- | --- |
| Netid | protocol type (tcp, udp, unix 등) |
| State | socket 상태 (LISTEN, ESTAB, TIME-WAIT 등) |
| Recv-Q | 수신 대기 중인 byte 수 (LISTEN일 때는 backlog) |
| Send-Q | 송신 대기 중인 byte 수 (LISTEN일 때는 backlog 최대값) |
| Local Address:Port | local address와 port |
| Peer Address:Port | remote address와 port |

```bash
$ ss -tlnp
State    Recv-Q   Send-Q   Local Address:Port   Peer Address:Port   Process
LISTEN   0        128      0.0.0.0:22           0.0.0.0:*           users:(("sshd",pid=1234,fd=3))
LISTEN   0        511      0.0.0.0:80           0.0.0.0:*           users:(("nginx",pid=5678,fd=6))
```


---


## netstat과의 비교

- `ss`는 `netstat`보다 **빠르고 상세한 정보**를 제공합니다.

| 항목 | ss | netstat |
| --- | --- | --- |
| 속도 | 빠름 (netlink 사용) | 느림 (/proc parsing) |
| 정보량 | 상세함 | 기본적 |
| 유지 상태 | 활발히 개발 중 | deprecated |
| package | iproute2 | net-tools |


### `netstat`에서 `ss`로의 명령어 전환 예시

| netstat | ss |
| --- | --- |
| `netstat -tlnp` | `ss -tlnp` |
| `netstat -an` | `ss -an` |
| `netstat -s` | `ss -s` |
| `netstat -r` | `ip route` |
| `netstat -i` | `ip -s link` |


---


## Reference

- <https://man7.org/linux/man-pages/man8/ss.8.html>
- <https://www.redhat.com/sysadmin/ss-command>

