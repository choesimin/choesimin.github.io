---
layout: skill
title: nslookup - Domain 이름으로 IP 주소 확인하기
date: 2024-10-02
---


## `nslookup` : DNS Server Query Tool

```bash
nslookup example.com
nslookup google.com
nslookup naver.com
```

- `nslookup`은 **domain 이름(domain name)을 IP 주소로 변환**하거나 **IP 주소에서 domain 이름을 검색**하기 위해 사용되는 network 진단 명령어입니다.
    - "nslookup"은 "Name Server Lookup"의 약자입니다.
    - 주로 DNS(Domain 이름 System) server의 응답을 확인하거나 network 문제를 debuging할 때 사용됩니다.

- `nslookup`은 1983년에 개발된 오래된 도구로, `dig`나 `host`와 같은 최신 도구를 사용할 수도 있습니다.


---


## `nslookup`의 응답 구조

- `nslookup`은 기본적으로 운영 체제에 설정된 DNS server를 사용하여 조회합니다.
    - 예를 들어, `nslookup google.com`을 실행하면, 운영 체제의 DNS 설정에 따라 해당 DNS server를 사용하여 Google의 domain 이름을 IP 주소로 변환합니다.

```bash
# input
nslookup google.com    # domain 이름으로 IP 주소를 조회

# output
Server:	168.126.63.1    # DNS server
Address: 168.126.63.1#53    # DNS server address and port

Non-authoritative answer:    # 비권위적 응답
Name: google.com    # domain 이름
Address: 142.251.42.174    # IPv4 주소
Name: google.com    # domain 이름
Address: 2404:6800:4004:801::200e    # IPv6 주소
```

- 반환되는 응답에는 권위적 응답(`Authoritative answer`)과 비권위적 응답(`Non-authoritative answer`)이 있습니다.


### 권위적 응답과 비권위적 응답

- `Authoritative answer`는 **권위적 응답**입니다.
    - **DNS server가 해당 domain에 대한 권한이 있을 때 나타나는 응답**입니다.
        - 즉, 이 server는 domain의 권위 있는 정보(정확하고 공식적인 정보)를 제공합니다.
        - domain의 이름 server(권위 있는 DNS server)로부터 직접 응답을 받는 경우입니다.
    - domain의 권위 있는 DNS server에서 직접 조회한 경우 나타납니다.
        - 예를 들어, 특정 domain에 대한 권한을 가진 name server에 직접 질의를 하면, `Authoritative answer`가 반환됩니다.

- `Non-authoritative answer`는 **비권위적 응답**입니다.
    - **DNS server가 요청에 대한 정보를 제공하지만, 해당 server가 직접적으로 domain의 권한을 가지고 있지 않을 때 나타나는 응답**입니다.
        - 즉, 이 응답은 임시 저장된(cached) data를 기반으로 제공되는 경우가 많습니다.
        - DNS server는 다른 권위 있는 server로부터 받은 정보를 임시 저장(caching)하고 있다가, 이후에 동일한 요청이 있을 때 그 data를 반환합니다.
    - 보통 사용자가 일반 DNS server(공용 DNS server 등)를 사용하여 조회할 때 나타나는 응답입니다.


#### 권위 있는 Name Server 조회하기

- `-type=ns` option을 사용하여 권위 있는 name server를 조회합니다.

```bash
# input
nslookup -type=ns google.com

# output
Server:	168.126.63.1
Address: 168.126.63.1#53

Non-authoritative answer:
google.com nameserver = ns1.google.com.
google.com nameserver = ns3.google.com.
google.com nameserver = ns2.google.com.
google.com nameserver = ns4.google.com.

Authoritative answers can be found from:    # 권위 있는 name server 정보
ns1.google.com internet address = 216.239.32.10
ns2.google.com internet address = 216.239.34.10
ns3.google.com internet address = 216.239.36.10
ns4.google.com internet address = 216.239.38.10
ns1.google.com has AAAA address 2001:4860:4802:32::a
ns2.google.com has AAAA address 2001:4860:4802:34::a
ns3.google.com has AAAA address 2001:4860:4802:36::a
ns4.google.com has AAAA address 2001:4860:4802:38::a
```


---


## `nslookup` 사용법

- `nslookup` 명령어 뒤에 조회할 domain 이름 또는 IP 주소를 입력합니다.

```bash
nslookup [domain-name]    # domain 이름으로 IP 주소를 조회
nslookup [ip-address]    # IP 주소로 domain 이름을 조회
nslookup [domain-name] [dns-server]    # 특정 DNS server를 지정하여 domain 이름으로 IP 주소를 조회
nslookup [ip-address] [dns-server]    # 특정 DNS server를 지정하여 IP 주소로 domain 이름을 조회
```


### Domain 이름으로 IP 주소 조회하기

- domain 이름을 입력하면, 해당 domain의 IP 주소를 반환합니다.
    - website server의 IP 주소를 알 수 있습니다.

- domain 이름을 입력할 때는, `http://` 또는 `https://` 등의 protocol 정보를 입력하지 않습니다.

```bash
nslookup [domain-name]

nslookup naver.com
nslookup google.com
```


### IP 주소로 Domain 이름 조회하기 (Reverse Lookup)

- IP 주소를 입력하면, 해당 IP에 연결된 domain 이름을 반환합니다.
    - website server의 domain 이름을 알 수 있습니다.

```bash
nslookup [ip-address]

nslookup 142.250.207.46
```

- IP 주소를 domain 이름으로 변환할 수 없는 경우도 있습니다.
    - **PTR Record 미설정** : IP 주소에 대한 PTR record가 없으면 domain 이름으로 변환할 수 없습니다.
        - PTR record는 IP 주소를 domain 이름으로 변환하는 데 필수적인 요소이며, 모든 network 환경에서 반드시 설정되는 것은 아닙니다.
    - **공유 IP 주소** : 여러 domain이 동일한 IP 주소를 공유할 경우, PTR record가 설정되지 않을 수 있습니다.
    - **Privacy 설정** : 보안 또는 privacy 정책에 따라 Reverse DNS가 의도적으로 비활성화될 수 있습니다.
    - **IP 주소 Block 관리 문제** : IP 주소를 관리하는 ISP나 network 관리자가 PTR record를 설정하지 않으면 변환이 불가능합니다.


### 특정 DNS Server를 직접 지정하여 조회하기

- `nslookup`은 기본적으로 운영 체제에 설정된 DNS server를 사용하지만, 다른 DNS server를 직접 명시하여 그 name server로 조회할 수도 있습니다.

```bash
nslookup [domain-name] [dns-server]
nslookup [ip-address] [dns-server]

nslookup google.com 8.8.8.8
nslookup naver.com 8.8.8.8

nslookup 142.250.207.46 8.8.8.8
```

- `8.8.8.8`은 Google의 public DNS server IP 주소입니다.


### 대화형 방식으로 조회하기 (Interactive Mode)

- 파라미터 없이 `nslookup` 명령어만 실행하면 대화형 질의 방식으로 전환되며, 여러 domain 이름이나 IP 주소를 연속적으로 조회할 수 있습니다.

```bash
nslookup
> google.com
> naver.com
> example.com
> 142.250.207.46
> exit
```

- `exit` 명령어를 입력하여 대화형 질의를 종료합니다.
