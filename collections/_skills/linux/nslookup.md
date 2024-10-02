---
layout: skill
title: nslookup - Domain으로 IP 주소 확인하기
date: 2024-10-02
---




## `nslookup` : DNS Server Query Tool

```bash
nslookup google.com
```

- `nslookup`은 **domain name을 IP 주소로 변환**하거나 **IP 주소에서 domain name을 검색**하기 위해 사용되는 network 진단 명령어입니다.
    - "nslookup"은 "Name Server Lookup"의 약자입니다.
    - 주로 DNS(Domain Name System) server의 응답을 확인하거나 network 문제를 debuging할 때 사용됩니다.

- `nslookup`은 1983년에 개발된 오래된 도구로, `dig`나 `host`와 같은 최신 도구를 사용할 수도 있습니다.




---




## 사용법

```bash
nslookup
nslookup [domain-name]
nslookup [ip-address]
```


### Domain Name으로 IP 주소 조회

- domain name을 입력하면, 해당 domain의 IP 주소를 반환합니다.
    - website server의 IP 주소를 알 수 있습니다.

```bash
nslookup example.com
```


### IP 주소로 Domain Name 조회 (Reverse Lookup)

- IP 주소를 입력하면, 해당 IP에 연결된 domain name을 반환합니다.
    - website server의 domain name을 알 수 있습니다.

```bash
nslookup 8.8.8.8
```


### 특정 DNS를 지정하여 조회

- `nslookup`은 기본적으로 운영 체제에 설정된 DNS server를 사용하지만, 다른 DNS server를 명시하여 그 server로 조회할 수도 있습니다.

```bash
nslookup example.com 8.8.8.8
```


### 대화형 방식 (Interactive Mode)

- 파라미터 없이 `nslookup` 명령어만 실행하면 대화형 질의 방식으로 전환되며, 여러 domain name이나 IP 주소를 연속적으로 조회할 수 있습니다.
- `exit` 명령어를 입력하여 대화형 방식을 종료합니다.

```bash
nslookup
> example.com
> google.com
> naver.com
> exit
```
