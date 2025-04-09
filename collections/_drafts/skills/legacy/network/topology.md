---
layout: note
title: Network 주요 장비
date: 2024-09-27
---




<!-- # Network를 구성하는 장비의 종류

- Cable, Repeater, Hub, Lan Card(NIC), Modem, Antenna, Bridge, Router, Switch, Gateway, Firewall, WAP(Wireless Access Point) -->


Repeater, Hub, Lan Card(NIC), Modem, Bridge, Router, Switch, Gateway, Firewall




## Network 장비의 필요성

- **network**는 두 대 이상의 computer나 장치가 상호 연결되어 data를 주고받을 수 있는 구조를 말합니다.
    - 이 연결을 통해 사용자들은 정보 공유, 자원 이용, communication 등을 효율적으로 할 수 있습니다.

- 효율적이고 안정적인 network를 구축하기 위해서는 다양한 **network 장비**가 필요합니다.
    - 각 장비는 특정한 역할을 수행하며, **network의 성능과 보안을 유지**하는 데에 중요한 역할을 합니다.
    - network 장비는 **OSI 7 계층 model에 따라 각기 다른 계층에서 작동**하며, 이를 통해 복잡한 network 구조를 체계적으로 관리할 수 있습니다.


---

## 주요 Network 장비




# 대표적인 네트워크 장비들

네트워크 인프라를 구축하고 관리하는 데 사용되는 다양한 네트워크 장비들이 있습니다. 이들 장비는 서로 다른 기능을 수행하며, 효율적이고 안전한 네트워크 운영을 위해 필수적입니다. 아래에서는 대표적인 네트워크 장비들을 소개합니다.

## 1. 라우터 (Router)

라우터는 서로 다른 네트워크 간의 트래픽을 전달하고, 최적의 경로를 선택하여 데이터 패킷을 전송하는 장비입니다. 주로 인터넷과 내부 네트워크를 연결하는 데 사용되며, IP 주소 기반으로 패킷을 라우팅합니다.

- **주요 기능:**
  - 패킷 포워딩
  - 경로 선택 및 라우팅 테이블 관리
  - NAT(Network Address Translation) 지원
  - 방화벽 기능 통합 가능

## 2. 스위치 (Switch)

스위치는 네트워크 내에서 장치들을 연결하고, 데이터 프레임을 목적지 장치로 전달하는 역할을 합니다. LAN(Local Area Network) 환경에서 주로 사용되며, 각 포트를 통해 연결된 장치 간의 통신을 관리합니다.

- **주요 기능:**
  - MAC 주소 기반 프레임 전달
  - VLAN(Virtual LAN) 설정 지원
  - 포트 보안 기능
  - 트래픽 관리 및 스패닝 트리 프로토콜 지원

## 3. 방화벽 (Firewall)

방화벽은 네트워크 보안을 강화하기 위해 사용되는 장비로, 허용되지 않은 트래픽을 차단하고 허용된 트래픽만 통과시킵니다. 외부 위협으로부터 내부 네트워크를 보호하는 중요한 역할을 합니다.

- **주요 기능:**
  - 패킷 필터링
  - 상태 기반 검사
  - 애플리케이션 레벨 필터링
  - 침입 탐지 및 방지 시스템(IDS/IPS) 통합

## 4. 액세스 포인트 (Access Point)

무선 네트워크를 제공하기 위해 사용되는 장비로, 무선 디바이스들이 네트워크에 접속할 수 있도록 무선 신호를 전송합니다. 와이파이 네트워크 환경에서 필수적인 요소입니다.

- **주요 기능:**
  - 무선 신호 송수신
  - SSID 설정 및 관리
  - 무선 보안 프로토콜 지원 (WPA3 등)
  - 트래픽 관리 및 대역폭 조절

## 5. 모뎀 (Modem)

모뎀은 디지털 신호를 아날로그 신호로, 또는 그 반대로 변환하여 인터넷 서비스 제공업체(ISP)와의 통신을 가능하게 하는 장비입니다. 주로 DSL, 케이블, 광섬유 인터넷 연결에 사용됩니다.

- **주요 기능:**
  - 신호 변환 및 모듈레이션
  - ISP와의 연결 관리
  - 다중 프로토콜 지원
  - 내장 라우터 기능 포함 가능

## 6. 허브 (Hub)

허브는 네트워크 장치들을 단순히 연결하는 장비로, 수신된 데이터를 연결된 모든 포트로 전송하는 기능을 합니다. 하지만 트래픽 관리가 불가능하고 보안에 취약하여 현대 네트워크에서는 스위치에 의해 대체되는 경우가 많습니다.

- **주요 기능:**
  - 데이터 브로드캐스트
  - 단순한 네트워크 연결
  - 트래픽 관리 기능 부재

## 7. 로드 밸런서 (Load Balancer)

로드 밸런서는 다수의 서버에 부하를 분산시켜 서버 과부하를 방지하고, 서비스의 가용성과 확장성을 높이는 역할을 합니다. 주로 웹 서버, 애플리케이션 서버 등에 사용됩니다.

- **주요 기능:**
  - 트래픽 분산
  - 헬스 체크 및 장애 조치
  - 세션 유지 지원
  - SSL 종료 처리

이 외에도 다양한 네트워크 장비들이 존재하며, 각 장비는 네트워크의 규모와 요구 사항에 따라 선택적으로 사용됩니다. 적절한 네트워크 장비의 선택과 구성은 안정적이고 효율적인 네트워크 운영에 필수적입니다.























---



<!-- ## OSI 7 계층과 각 계층의 Network 장비

- 각 계층의 장비는 해당 계층의 기능을 수행하기 위해 필요한 역할을 합니다.


### Layer 1. Physical 계층

- **장비** : Hub, Repeater, Cable.

- Physical 계층은 data의 실제 전송을 담당합니다.
    - 신호의 전달 매체와 전기적인 특성을 관리하며, data가 물리적으로 전송될 수 있는 환경을 제공합니다.

- Hub와 Repeater는 신호를 증폭하거나 분배하는 역할을 합니다.


### Layer 2. Data Link 계층

- **장비** : Switch, Bridge.

- Data Link 계층은 Physical 계층에서 전송된 data의 신뢰성을 보장합니다.
    - frame 단위로 data를 관리하며, MAC 주소를 기반으로 장치 간의 통신을 조정합니다.

- Switch는 network 내에서 data packet을 효율적으로 전달하는 역할을 합니다.


### Layer 3. Network 계층

- **장비** : Router, L3 Switch, 공유기.

- Network 계층은 data가 올바른 목적지로 전달될 수 있도록 경로를 설정합니다.
    - IP 주소를 기반으로 packet을 routing하며, 서로 다른 network 간의 통신을 가능하게 합니다.

- Router는 경로를 설정하는 대표적인 장비입니다.


### Layer 4. Transport 계층

- **장비** : Load Balancer, L4 Switch.

- Transport 계층은 data의 전송 신뢰성을 관리하고, 연결의 설정과 종료를 담당합니다.
    - 또한, data의 흐름을 제어하여 network traffic을 최적화합니다.

- Load Balancer는 server 간의 traffic 분산을 통해 system의 효율성을 높입니다.


### Layer 5. Session 계층

- **장비** : Gateway, Proxy Server.

- Session 계층은 통신 session의 설정, 관리, 종료를 담당합니다.
    - 두 장치 간의 연결을 유지하고, data 교환이 원활하게 이루어지도록 지원합니다.

- Gateway는 서로 다른 network protocol 간의 변환을 도와주며, Proxy Server는 client와 server 간의 중계 역할을 수행합니다.


### Layer 6. Presentation 계층

- **장비** : SSL Accelerator, Encryption 장비.

- Presentation 계층은 data의 암호화, 복호화, 압축 등을 처리하여 data의 형식을 관리합니다.
    - 이를 통해 data가 안전하게 전송되고, 다양한 형식의 data가 원활하게 처리될 수 있습니다.

- SSL Accelerator는 보안 communication을 지원하여 data의 안전성을 높입니다.


### Layer 7. Application 계층

- **장비** : Application Gateway, Web Server, L7 Switch.

- Application 계층은 사용자가 직접 상호작용하는 application service를 제공합니다.
    - 다양한 network service가 이 계층에서 동작하며, 사용자 요청을 처리하고 응답을 전달합니다.

- Web Server는 web application을 제공하며, Application Gateway는 특정 application에 대한 접근을 제어합니다. -->
