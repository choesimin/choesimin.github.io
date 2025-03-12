---
layout: skill
permalink: /116
title: OSI Model (OSI 7 계층)
description: OSI Model은 network 통신 과정을 7개의 계층으로 나눈 것으로, 각 계층은 특정 기능을 수행하도록 정의된 framework입니다.
date: 2024-09-22
---


## OSI 7 계층 : Network에서 통신이 일어나는 과정을 7단계로 나눈 것

- **OSI Model**(Open Systems Interconnection Reference Model)은 국제 표준화 기구(ISO)에서 개발한 model로, **computer network protocol design과 통신을 계층으로 나누어 개념적으로 설명한 것**입니다.
    - 일반적으로 OSI 7 계층이라 불리기도 합니다.
    - data 통신을 **7개의 추상적인 계층으로 분리**하고, protocol을 networking 기능으로 적절히 묶어 **표준화**합니다.

- OSI 7 계층 model은 network 통신 과정을 **7개의 추상적인 계층**으로 나누어 **각 계층이 특정 기능을 수행하도록 정의한 개념적 framework**입니다.
    - 이는 복잡한 network 통신 과정을 단계별로 이해하고, 문제 발생 시 해당 계층만 집중적으로 분석하여 해결할 수 있도록 돕습니다.
    - 또한, 다양한 vendor와 기술 간의 상호 운용성을 보장하여 효율적인 통신 환경을 구축할 수 있도록 합니다.
 
- network 문제가 발생했을 때, OSI model은 **다른 계층에 있는 장비나 software를 건드리지 않고 문제를 해결**할 수 있도록 돕습니다.
    - 만약 회사에서 업무를 보는데 internet 연결이 끊겼다면, 문제의 원인이 어디에 있는지 알아봐야 할 것입니다.
    - 모든 PC에 문제가 있다면, router의 문제(L3 Network 계층)이거나 광랜을 제공하는 회사의 회선(L1 물리 계층) 문제일 가능성이 높습니다.
    - 한 PC만 문제가 있다면, 문제 PC가 사용하는 software(L7 application 계층)의 문제일 수 있습니다.
    - software에 문제가 없다면, switch(L2 Data Link 계층)의 문제일 수 있습니다.

- 각 계층은 **하위 계층의 기능만을 이용**하고, **상위 계층에게 기능을 제공**합니다.
    - protocol stack은 hardware나 software 혹은 둘의 혼합으로 구현될 수 있습니다.
        - protocol stack : 상위와 하위 계층들로 구성되는 protocol system이 구현된 system.
    - 이러한 protocol stack은 일반적으로 **하위 계층들은 hardware로, 상위 계층들은 software로 구현**됩니다.

| 계층 | 특징 | 주요 Protocol/기술 |
| --- | --- | --- |
| **L7. 응용 계층 (Application)** | data 표현 및 변환. 사용자 interface 제공(network software UI, 사용자의 입출력 I/O). | HTTP, FTP, IRC, SSH, DNS. |
| **L6. 표현 계층 (Presentation)** | 사용자의 명령어 완성 및 결과 표현. data 포장(형식 변환), 압축, 암호화. | SSL, SSH, IMAP, FTP, MPEG, JPEG. |
| **L5. Session 계층 (Session)** | 통신 session 설정(확립), 관리(유지), 종료(중단). 운영 체제가 해줌. | API, Sockets, WinSock. |
| **L4. 전송 계층 (Transport)** | data 신뢰성 및 흐름 제어. port 번호 사용. Packet 생성(Assembly, Sequencing, Deassembly, Error detection, Request repeat, Flow control). | TCP, UDP. |
| **L3. Network 계층 (Network)** | 논리 주소(IP) 부여, 경로 설정(Route). | IP, ICMP, IPSec, IGMP. |
| **L2. Data Link 계층 (Data Link)** | frame에 물리적 주소(MAC) 부여. 오류 검출, 재전송, 흐름 제어. | Ethernet, PPP, Switch, Bridge. |
| **L1. 물리 계층 (Physical)** | data bit 전송. 물리적 연결 및 신호 변환. | Coax, Fiber, Wireless, Hubs, Repeaters. |


### OSI 7 계층과 Header

- data가 계층을 지날 때마다 각 계층의 전송 측에서 header가 붙게 되고, 수신 측은 역순으로 header를 분석합니다.
    - OSI model의 각 계층은 data 전송을 위해 각기 다른 기능을 수행하며, 각 계층을 지날 때마다 추가 정보(header)가 붙습니다.
        - 예를 들어, 택배 포장 박스에 쓰는 내용인 송신자 주소와 수신자 주소 같은 것들이 header에 들어가고, 이외의 다른 필요한 정보도 포함합니다.

- 각 계층의 protocol이 할 수 있는 것과 할 수 없는 것이 header에 의해 결정됩니다.
    - 따라서 각 protocol에서 전달하는 data는 "header + data" 형태입니다.

| 계층 | Data 단위 | Data 구성 |
| --- | --- | --- |
| **L7. 응용 계층** | Message or Data | 실제 사용자 data |
| **L6. 표현 계층** | Message or Data | encoding, 압축, 암호화 등이 적용된 형태의 data |
| **L5. Session 계층** | Message or Data | session 정보가 추가된 data |
| **L4. 전송 계층** | Segment | Data / **TCP Header** (또는 **UDP Header**) |
| **L3. Network 계층** | Packet | Data / TCP Header / **IP Header** |
| **L2. Data Link 계층** | Frame | Data / TCP Header / IP Header / **MAC 주소** |
| **L1. 물리 계층** | Bit | 101010101010... (전기 신호, 광신호 등) |

- Header는 network 통신에서 data가 올바르게 전송되고 수신될 수 있도록, 각 계층에서 data를 처리하는 데 필요한 **제어 정보**를 포함하는 부분입니다.
    - **header**는 data에 추가되는 **metadata**로, data를 어떻게 처리하고 전송해야 하는지에 대한 정보를 담고 있습니다.
        - header는 data를 전송할 때 **발신자**와 **수신자** 간에 원활하게 소통할 수 있도록 정보를 제공합니다.
    - data를 **어디로 보낼지**, **어떤 방법으로 전송할지**, **오류가 발생하면 어떻게 처리할지** 등의 다양한 제어 정보를 포함합니다.
    - 각 계층에서 header는 특정한 역할을 수행하며, 이러한 정보가 없다면 data는 목적지에 제대로 도착하지 않거나, 도착하더라도 올바르게 해석될 수 없습니다. 

- 각 계층에서 header는 다른 역할을 하지만, 공통적으로 다음과 같은 **제어 정보**를 포함합니다.
    - **주소 정보** : data가 어디로 보내져야 하는지, 그리고 어디에서 왔는지를 알려주는 정보입니다.
        - 예를 들어, Network 계층의 header에는 IP 주소가 포함되어 있어, data가 정확한 목적지로 전달되도록 도와줍니다.
    - **오류 처리 정보** : data 전송 중에 발생할 수 있는 오류를 탐지하고 처리할 수 있는 정보입니다.
        - 예를 들어, 전송 계층의 TCP header는 **checksum**과 같은 오류 감지 code를 포함해 data 손상이 있는지 확인합니다.
    - **전송 및 흐름 제어 정보** : data가 수신자에게 어떻게 도달해야 하는지, 그리고 얼마나 빠르게 전송되어야 하는지를 제어하는 정보입니다.
        - 예를 들어, TCP header에는 **sequence 번호**가 포함되어 있어 data가 순서대로 전송되도록 보장합니다.
    - **Protocol 정보** : 상위 계층에서 사용하는 protocol이 무엇인지 알려주는 정보입니다.
        - 예를 들어, IP header에는 **상위 protocol 번호**가 있어, 해당 Packet이 TCP, UDP 등의 어떤 protocol을 사용하는지 알려줍니다.

- OSI 7 계층에서 각 계층마다 header는 각기 다른 역할을 수행하며, 이를 통해 전체 data 전송 과정이 원활하게 이루어집니다.
    - **응용 계층(L7)** : 사용자가 사용하는 응용 program에 관련된 정보(HTTP 요청, email protocol 등)를 포함할 수 있습니다.
    - **전송 계층(L4)** : TCP나 UDP header는 data가 올바른 순서로 전송되고, 손실 없이 도착하도록 제어합니다.
        - 여기에는 port 번호, sequence 번호, 오류 검출 정보 등이 포함됩니다.
    - **Network 계층(L3)** : IP header는 data가 올바른 network 주소로 전달되도록 하는데, 발신지와 목적지의 IP 주소를 포함합니다.
    - **Data Link 계층(L2)** : ethernet header는 network 내에서 물리적인 장치 간 data를 전달하는 역할을 하며, MAC 주소와 같은 정보가 들어 있습니다.

- 수신 측에서는 data를 받으면 각 계층에서 header를 분석하여 data를 해석하고 처리합니다.
    - 수신 측에서는 물리 계층(L1)부터 data를 받아오며, 각 계층에서 이전 계층의 header를 하나씩 제거하면서 data를 처리합니다.
        - 마지막으로 응용 계층(L7)에서 최종적으로 사용자에게 data를 보여줍니다.
    - 수신자는 header에 포함된 제어 정보를 바탕으로 **data가 손상되었는지 확인**하고, **어느 응용 program으로 data를 전달해야 하는지 결정**하며, **data의 순서를 맞추는** 등 올바른 처리를 할 수 있게 됩니다.


### OSI 7 계층에 대한 오해 : 이론과 실무의 괴리

- **network 참조 model(OSI 7 계층, TCP/IP 4 계층)에 대한 여러가지 오해**가 존재합니다.
    1. "network 지식 = network 참조 model"이라는 오해.
    2. 모든 protocol/장비가 network 참조 model에 정확히 대응된다는 오해.
    3. network 참조 model이 반드시 지켜야 할 규칙이라는 오해.

- 그러나 network 참조 model은 **network 구성 및 설계를 돕는 '참조' model일 뿐**입니다.
    - 새로운 protocol과 장비는 계속해서 만들어지며, 모든 것이 model에 완벽히 대응되지는 않습니다.
    - OSI model, TCP/IP model처럼 계층의 이름과 개수가 다양하게 기술되는 것은 규칙이 아니기 때문입니다.
        - 특히, TCP/IP model은 유연한 참조 model이기 때문에, 계층 구조가 다양하게 표현될 수 있습니다.

- network 통신의 실질적인 동작 주체이자 규칙은 **protocol과 network 장비**입니다.
    - network 참조 model이나 특정 계층이 network를 작동시키는 것이 아닙니다.
    - 따라서 개발자에게는 실제 통신에 사용되는 protocol/장비의 규칙성을 이해하는 것이 더 중요합니다.

- 결국 **network 참조 model은 network 구성 및 설계를 위한 '밑그림'**일 뿐, 반드시 지켜야 할 규칙이나 실제 동작하는 주체가 아닙니다.
    - network 참조 model은 중요한 배경 지식이지만, 실무에서는 각 계층과 역할에 대한 암기보다 protocol과 장비에 대한 이해가 중요합니다.
    - 예를 들어, web 개발 시 HTTP/HTTPS와 같은 protocol 이해가 중요하며, 실무 관점에서 계층별 암기는 상대적으로 덜 중요합니다.


---


## 1 계층 - 물리 계층 (Physical Layer)

| 특징 | 설명 |
| --- | --- |
| **전송 단위** | Bit (1과 0) |
| **대표 장치** | Cable, Antenna, AMP(Amplifier), Network Hub, Repeater 등 |
| **Protocol** | Ethernet, Cable(USB 등), Bluetooth, Wi-Fi, Antenna(LTE, 5G 등) |

- 물리 계층은 **실제 장치들을 연결하기 위해 필요한 전기적, 물리적 세부 사항들을 정의**합니다.
    - 예를 들어, pin들의 배치나 전압, 전선의 명세 등이 이 계층에 포함됩니다.

- 물리 계층은 network상에서 **data bit를 전송하는 계층**이며, **data를 전기적인 analog 신호(1/0, on/off)로 변환해서 주고받는 기능**을 합니다.
    - 1과 0으로 이루어진 bit만 전달하면 되기 때문에 주로 전기적, 기계적, 기능적인 특성을 이용한 **통신 cable로 data를 전송**합니다.
        - 물리 계층에서 유일하게 사용되는 통신 단위는 1과 0으로 나뉘는 bit이며, 1과 0은 전기적으로 on, off 상태입니다.
    - 따라서 물리 계층에서 쓰이는 대표적인 장비는 통신 cable, repeater, hub 등의 전기 신호 전송 매체이며, 신호를 보내는 방법은 이러한 전송 매체에 의해 결정됩니다.

- 물리 계층에서는 단지 **data를 전달만 할 뿐**, 전송하거나 받으려는 data가 무엇인지, 어떤 오류가 있는지 등에는 전혀 신경 쓰지 않습니다.
    - 물리 계층은 단순히 전기적 신호나 빛 신호를 전송하는 역할만 담당합니다.
    - Data Link 계층 개체 간의 bit 전송을 위한 물리적 연결을 설정하고 유지하고 해제하기 위한 수단만을 제공합니다.


### 물리 계층에서 수행되는 중요한 일들

1. 물리적인 정보 전달 매개체에 대한 연결의 성립 및 종료.

2. 여러 사용자들 간의 통신 자원을 효율적으로 분배하는 데 관여.
    - 예를 들어, 경쟁 상태의 해소나 흐름 제어(congestion control) 등.

3. 통신 chennal을 통해 전송되는 사용자 장치의 digital data를 이에 상응하는 analog 신호들로 변환, 변조.
    - 이 신호들은 유선 통신(구리선, 광섬유 등), 무선 통신을 통해 전달되는 신호들입니다.
    - 예를 들어, SCSI가 여기에 속합니다.


---


## 2 계층 - Data Link 계층 (Data Link Layer)

| 특징 | 설명 |
| --- | --- |
| **전송 단위** | Frame (Preamble+DA+SA+DATA+fcs+....) |
| **대표 장치** | L2 Switch, Modem, 기지국, AP |
| **Protocol** | CSMA/CD, CSMA/CA, Slott Aloha, DAC/ADC, Multiplexer, Demultiplexer, MAC 주소 관리 등 |

- Data Link 계층은 물리 계층 위에서 동작하며, **같은 network 내 장치들 간의 data 전송을 담당**하는 계층입니다.
    - 물리적인 신호 전달을 넘어, **안정적이고 효율적인 data 전송을 가능하게 하는 핵심적인 역할**을 수행합니다.
        - **물리 계층을 통해 송수신되는 정보의 오류와 흐름을 관리**하여 안전한 정보의 전달을 수행할 수 있도록 도와줍니다.
        - parity bit 검사, hamming 부호 검사 등의 방법으로 통신에서의 오류를 검출하고, 오류가 있다면 data를 재전송합니다.
    - **network 통신의 기본 토대**를 제공하며, 상위 계층들이 원활하게 동작할 수 있도록 지원합니다. 

- Data Link 계층은 **MAC 주소(MAC address)를 가지고 통신**하며, 주소 체계는 계층이 없는 단일 구조입니다.
    - 주소 값은 물리적으로 할당 받는데, 이는 **network card가 만들어질 때부터 MAC 주소가 정해져 있다는 뜻**입니다.
    - Data Link 계층의 대표적인 장비인 bridge와 switch 등에서 MAC 주소를 활용합니다.

- Data Link 계층의 대표적인 protocol로는 Ethernet, Wi-Fi, PPP 등이 있습니다.
    - 이 외에도 HDLC나 ADCCP 같은 point-to-point protocol이나 packet switching network나 LLC, ALOHA 같은 근거리 network용 protocol이 있습니다.

- Data Link 계층의 대표적인 장비로는 switch, bridge 등이 있습니다.
    - Data Link 계층 장비는 **물리적으로 직접 연결된 장치들끼리만 통신을 가능하게 해주는 장비**입니다.
        - 같은 network 선에 연결된 장치들끼리만 data를 주고받을 수 있고, 다른 network에 있는 장치와는 직접 통신할 수 없습니다. 
    - 따라서 bridge, switch도 물리적으로 직접 이어진 곳에만 연결할 수 있습니다.

- Data Link 계층은 **network 연결의 핵심**이며, **상위 계층들이 효과적으로 기능할 수 있는 기반**을 제공합니다. 
    - Data Link 계층이 network 연결의 핵심이라고 불리는 이유는 **물리적인 연결 위에서 실질적인 data 전송을 가능하게 하는 다리 역할**을 하기 때문입니다.
        - Data Link 계층이 없다면, 상위 계층들은 물리적인 신호를 해석하고 처리할 수 없어 network 통신 자체가 불가능해집니다.
    - Data Link 계층은 물리 계층과 Network 계층 사이의 핵심 연결 고리 역할을 하는 **network 연결의 기본**입니다.
    - 오류 검출 및 수정, 흐름 제어 등을 통해 data 손실을 최소화하고 안정적인 통신을 가능하게 하여 **data 전송의 신뢰성**을 책임집니다.


### Data Link 계층의 주요 기능

1. **물리 주소 지정 (MAC 주소)** : 물리 계층으로부터 받은 신호들이 network 상의 장치에 올바르게 안착할 수 있게 합니다.
    - 각 network interface card(NIC)에 고유한 MAC 주소를 할당하여 data의 출발지와 목적지를 식별합니다.
    - 이를 통해 network 내 여러 장치들이 서로를 구분하고 통신할 수 있게 합니다.

2. **Frame 구성 및 전송** : Network 계층에서 받은 data를 frame이라는 단위로 나누고, header와 trailer를 추가하여 전송 준비를 합니다.
    - header에는 MAC 주소, 오류 검출 code 등 제어 정보가 포함되고, trailer에는 오류 검출을 위한 정보가 담깁니다.

3. **오류 검출 및 수정** : 전송 과정에서 발생할 수 있는 오류를 감지하고, 필요한 경우 재전송을 요청하여 data의 신뢰성을 보장합니다.
    - 대표적인 오류 검출 방식으로 CRC(Cyclic Redundancy Check)가 있습니다.

4. **흐름 제어** : 송신 측과 수신 측의 data 처리 속도 차이를 조절하여 data 손실을 방지합니다.
    - 수신 측의 buffer overflow를 막고, 원활한 data 흐름을 유지합니다.

5. **매체 접근 제어 (MAC)** : 여러 장치가 동시에 data를 전송하려 할 때 충돌을 방지하고, 효율적인 통신을 가능하게 합니다.
    - CSMA/CD, token ring 등 다양한 매체 접근 제어 방식이 사용됩니다.


### 다른 계층과의 차이를 통해 Data Link 계층 이해하기

#### 물리 계층과의 차이 : 신호 vs Data

- **물리 계층** : 단순히 전기적 신호나 빛 신호를 전송하는 역할만 담당합니다.
- **Data Link 계층** : 물리적인 신호를 의미 있는 data 단위(frame)로 구성하고, 주소 정보, 오류 검출 code 등을 추가하여 안정적인 data 전송을 가능하게 합니다.

#### Network 계층과의 차이 : Local vs Global

- Network 계층이 '큰 그림'을 그린다면, Data Link 계층은 그 그림을 실제로 구현하는 '붓'과 같습니다.

- **Network 계층** : 다른 network로 data를 전달하는 routing 기능을 담당하며, 논리적인 주소(IP 주소)를 사용합니다. 
- **Data Link 계층** : 같은 network 내 장치들 간의 통신을 담당하며, 물리적인 주소(MAC 주소)를 사용합니다.

#### 전송 계층과의 차이 : 연결 vs 신뢰성

- **전송 계층** : data의 순서 보장, 흐름 제어, 오류 복구 등을 통해 종단 간(end-to-end) 신뢰성 있는 data 전송을 보장합니다.
- **Data Link 계층** : 물리적인 link 상에서의 오류 검출 및 재전송을 통해 data의 신뢰성을 보장하지만, 종단 간 신뢰성까지는 책임지지 않습니다.


### Data Link 계층의 MAC 주소 : Network 장치를 식별하는 고유한 주소

- MAC은 **Media Access Control**의 약자로, MAC 주소(address)는 **network에 연결된 각 장치에 할당되는 고유한 식별자**입니다.
    - network 상에서 각 장치를 구분하기 위한 '주민등록번호'와 같은 역할을 합니다. 

- MAC 주소는 **전세계에서 고유한 물리적 주소**입니다.
    - **고유성** : 각 장치는 제조 과정에서 부여받은 MAC 주소를 가지며, 이는 전 세계에서 유일합니다. 
    - **물리적 주소** : MAC 주소는 network interface card(NIC)와 같은 hardware에 내장되어 있어 변경할 수 없습니다.
    - **형식** : 일반적으로 6쌍의 16진수로 표현되며, `00:1A:2B:3C:4D:5E`와 같은 형태입니다.

- MAC 주소는 **local network 통신**, network 관리 및 보안에 사용됩니다.
    - **local network 통신** : 같은 network에 연결된 장치들은 MAC 주소를 사용하여 서로 data를 주고받습니다.
    - **network 관리** : network 관리자는 MAC 주소를 이용하여 특정 장치를 식별하고 관리할 수 있습니다.
    - **보안** : MAC 주소 filtering을 통해 특정 장치만 network에 접근하도록 제한할 수 있습니다.

- MAC 주소는 IP 주소와 완전히 다른 특성과 용도를 가집니다.
    - **MAC 주소** : hardware에 내장된 물리적 주소, local network 내에서 사용.
    - **IP 주소** : network 상에서 할당되는 논리적 주소, internet 통신에 사용.


---


## 3 계층 - Network 계층 (Network Layer)

| 특징 | 설명 |
| --- | --- |
| **전송 단위** | Packet |
| **대표 장치** | Router, L3 Switch |
| **Protocol** | IP, ARP/NDP, RIP, RIP v2, OSPF, IGRP, EIGRP, BGP 등등의 Routing Protocol, AS번호, NAT 등 |

- Network 계층은 Internet Protocol Suite(TCP/IP)의 핵심 계층 중 하나로, **서로 다른 network에 있는 장치들 간의 data 전송을 가능하게 하는 역할**을 합니다.
    - 경로를 선택하고 주소를 정한 뒤, 경로에 따라 packet을 전달합니다.

- Network 계층은 **routing**이라는 과정을 통해 data가 출발지에서 목적지까지 최적의 경로를 찾아 전달될 수 있도록 합니다.
    - router는 Network 계층의 핵심 장비로, IP 주소를 기반으로 data packet을 다음 목적지로 전달하는 역할을 합니다.
    - internet은 수많은 network들이 복잡하게 연결되어 있기 때문에, routing은 data가 효율적으로 전달되도록 하는 데 필수적입니다.
    - 최근에는 2계층 장비인 switch에 routing 기능을 장착한 Layer 3 switch도 있습니다.

- Network 계층은 상위 계층(전송 계층)에서 받은 data를 **packet**이라는 작은 단위로 분할합니다.
    - 각 packet에는 출발지 및 목적지 IP 주소, 전송 순서 등의 정보가 포함되어 있어, packet들이 목적지에 도착한 후 원래의 data로 재조립될 수 있습니다.
    - packet 단위로 data를 전송하면 network 자원을 효율적으로 사용하고, 전송 중 오류가 발생했을 때 손실된 부분만 재전송하여 복구할 수 있습니다.


### Network 계층과 Internet Protocol(IP)

- Network 계층의 핵심 protocol은 **IP(Internet Protocol)**입니다.
    - IP는 data를 packet 형태로 캡슐화하고, 각 packet에 출발지 및 목적지 IP 주소를 포함시켜 router들이 packet을 목적지까지 전달할 수 있도록 합니다.

- 현재 흔하게 사용되고 있는 **internet**이 기본적으로 Network 계층에 속하는 망이며, Network 계층이 **internet**이라는 거대한 network를 구축하고 운영하는 데 핵심적인 역할을 합니다. 
    - internet은 **수많은 computer와 network들이 서로 연결되어 정보를 주고받는 공간**이며, Network 계층은 이러한 연결을 가능하게 하는 핵심 기술입니다.
    - L3(Network 계층), L4(전송 계층), L5(Session 계층)는 보통 국제 internet 표준화 기구(IETF)에서 규격을 관리합니다.

- Network 계층은 각각의 computer와 network에 **IP 주소**라는 고유한 식별자를 부여합니다.
    - **IP 주소**는 **internet에 연결된 모든 장치에 할당되는 고유한 식별자**이며, Network 계층에서 각 장치를 식별하고 data를 전달하는 데 사용됩니다.
        - IP 주소를 통해 internet에 연결된 모든 장치들은 서로를 구별하고 data를 정확하게 주고받을 수 있습니다.
    - **IP 주소는 우편 주소와 유사하게 계층적으로 작동**하며, data가 목적지까지 도달하기 위한 경로를 찾는 데 사용됩니다.
        - 사람들이 서로 다른 집 주소를 가지고 있는 것처럼, 각 computer와 network 장비는 고유한 IP 주소를 통해 구분됩니다.

- IP 주소는 주로 장치 식별, data 전달, network 관리의 역할을 합니다.
    - **장치 식별** : internet에 연결된 수많은 장치들을 구별하여 통신을 가능하게 합니다.
        - 각 장치에 고유한 논리적인 주소 체계(IP 주소)를 부여하여 internet 상에서 식별 가능하도록 합니다.
    - **Data 전달** : data가 정확한 목적지에 도달할 수 있도록 경로 정보를 제공합니다.
    - **Network 관리** : network 관리자는 IP 주소를 통해 network traffic을 monitoring하고 제어할 수 있습니다.

- IP 주소는 크게 IPv4와 IPv6 두 가지 버전으로 나뉩니다.
    - **IPv4** : 32bit 주소 체계로, 약 43억 개의 주소를 생성할 수 있습니다.
        - internet 초기에 설계되어 현재까지 널리 사용되고 있지만, 주소 고갈 문제가 발생하고 있습니다.
    - **IPv6** : 128bit 주소 체계로, 거의 무한대에 가까운 주소를 생성할 수 있습니다.
        - IPv4의 주소 고갈 문제를 해결하고, 향후 internet 확장에 대비하기 위해 개발되었습니다.


### IP 주소의 계층적 구조 : 효율적인 Internet 주소 체계

- IP 주소의 계층적 구조(hierarchical addressing)는 **internet 주소 체계를 효율적으로 관리**하고 **routing을 용이**하게 하기 위한 중요한 설계 원칙입니다.

- IP 주소는 우편 주소 체계와 유사한 방식으로 작동합니다. 
    - **우편 주소**에서 국가, 도시, 구 등 상위 정보는 해당 지역을 큰 범위에서 좁은 범위로 점차 세분화하여 특정 위치를 나타냅니다.
        - `국가` - `도시` - `구` - `동` - `번지` - `상세 주소`.
    - **IP 주소**도 마찬가지로, network ID는 internet 상의 큰 network를, subnet ID는 해당 network 내의 작은 network를, host ID는 특정 장치를 나타냅니다. 
        - `network ID` - `subnet ID` - `host ID`.

#### 계층적 구조의 장점

1. **효율적인 주소 관리**가 가능합니다.
   - 각 network는 자신의 network ID를 기반으로 하위 network에 subnet ID를 할당할 수 있습니다. 
   - 이를 통해 중앙 집중식 관리 없이도 각 network가 자율적으로 주소를 할당하고 관리할 수 있습니다.

2. **routing 효율성을 증대**시킵니다.
   - router는 IP 주소의 network ID 부분을 기반으로 data를 전달할 network를 결정합니다. 
   - 계층적 구조 덕분에 router는 모든 개별 host의 주소를 알 필요 없이, network ID를 기준으로 data를 해당 network로 전달하면 됩니다. 
   - 이는 routing table의 크기를 줄이고 routing 속도를 향상시킵니다.

3. **확장성**이 높습니다.
   - 새로운 network가 추가될 때, 상위 network로부터 새로운 network ID를 할당받고, 하위 network에 subnet ID를 할당하는 방식으로 쉽게 확장할 수 있습니다.
   - 이러한 유연성이 internet의 빠른 성장을 가능하게 했습니다.


---


## 4 계층 - 전송 계층 (Transport Layer)

| 특징 | 설명 |
| --- | --- |
| **전송 단위** | Segment, Datagram |
| **대표 장치** | L4 Switch |
| **Protocol** | TCP, UDP |

- 전송 계층은 **양 끝단(End to end)의 사용자(응용 program 또는 process) 간에 신뢰성 있는 data를 주고받을 수 있도록** 하여, 상위 계층들이 data 전달의 유효성이나 효율성을 생각하지 않아도 되게 합니다.
    - **종단간(end-to-end) 통신을 다루는 최하위 계층**이며, 오류 검출 및 복구와 흐름 제어, 중복 검사 등의 기능을 사용하여 신뢰성 있고 효율적인 data 전송을 보장합니다.
        - data를 전송하고, 전송 속도를 조절하며, 오류가 발생한 부분은 재전송하여 다시 맞춥니다.
    - packet들의 전송이 유효한지 확인하고, 전송 실패한 packet들을 다시 전송하여 연결의 유효성을 보장합니다.

- 전송 계층은 주로 **TCP, UDP protocol을 사용**하며, header에 송신지와 수신지의 **port 번호를 포함**하여 전달합니다.
    - TCP의 data 전송 단위는 segment, UDP의 data 전송 단위는 datagram이라고 부릅니다.

- **port 번호**는 전송 계층이 **data를 정확한 application에게 전달하기 위해 사용하는 핵심적인 식별자**입니다.
    - port 번호 : 하나의 computer에서 동시에 실행되고 있는 **process들이 서로 겹치지 않게 가져야 하는 정수 값**.
    - 전송 계층은 IP 주소와 port 번호를 조합하여 data를 정확한 목적지 application에게 전달합니다.
        - **IP 주소**는 **network 상의 특정 computer**를 찾아가는 데 사용됩니다.
        - **port 번호**는 해당 computer 내에서 실행 중인 **여러 application 중 특정 application을 찾아가는 데 사용**됩니다.
    - 전송 계층은 port 번호를 통해 여러 application의 data를 구분하고 관리합니다.
        - 하나의 computer에서 여러 application이 동시에 network 통신을 할 수 있습니다.
        - 각 application은 **고유한 port 번호를 할당받아 서로 간섭 없이 통신**합니다.
    - 자주 사용되는 service들은 **표준화된 port 번호**를 사용하며, 이를 통해 client는 특정 service에 접속할 때 해당 port 번호를 사용하여 쉽게 연결할 수 있습니다.
        - 예를 들어, web server는 `80`, FTP server는 `21`, SSH server는 `22`.

- Network 계층은 host 간의 논리적 통신을 돕지만, **전송 계층은 응용 process 간의 논리적인 통신**을 돕습니다.
    - 실제 data 통신에서는 두 계층이 협력하여 작동합니다.
        - Network 계층이 data를 목적지 host까지 전달하면, 전송 **계층이 해당 host 내에서 정확한 응용 process에게 data를 전달**하는 역할을 수행합니다. 
    - **Network 계층** : **host 간 연결**을 맡아, 서로 다른 network에 있는 **host**(computer, server 등) 간에 data를 전달합니다.
    - **전송 계층** : **응용 process 간 연결**을 맡아, 같은 host 내 또는 다른 host에 있는 **응용 process**(실행 중인 program) 간에 data를 전달합니다.


### 전송 계층의 Sequence Number 기반 오류 제어 방식

- 전송 계층, 특히 TCP와 같은 연결 지향 protocol은 data의 신뢰성 있는 전송을 보장하기 위해 **sequence number 기반의 오류 제어 방식**을 사용합니다. 
    - 이 방식은 data의 순서를 보장하고, 손실되거나 손상된 data를 감지하여 재전송을 요청함으로써 data의 정확한 전달을 가능하게 합니다. 
    - 이를 통해 응용 program은 data 전송의 세부적인 과정을 신경 쓰지 않고, 안정적으로 data를 주고받을 수 있습니다. 

#### Sequence Number 기반 오류 제어 방식의 핵심 원리

- **Sequence Number 부여** : 송신 측은 전송하는 각 data segment에 고유한 sequence number를 부여합니다.
    - 이 sequence number는 data의 순서를 나타내는 역할을 합니다.
- **확인 응답 (ACK, Acknowledgement)** : 수신 측은 data segment를 받으면, 다음에 받고 싶은 segment의 sequence number를 담은 확인 응답(ACK)을 송신 측에 보냅니다.
    - 이를 통해 송신 측은 data가 정상적으로 수신되었는지 확인할 수 있습니다.
- **재전송** : 송신 측은 일정 시간 내에 확인 응답을 받지 못하면, 해당 data segment가 손실되었거나 손상되었다고 판단하고 재전송을 수행합니다.
- **순서 재조립** : 수신 측은 sequence number를 기반으로 data segment를 순서대로 재조립하여 원래의 data를 복원합니다.

#### Sequence Number 기반 오류 제어 방식의 장점

- **신뢰성** : data 손실이나 손상을 감지하고 재전송을 통해 data의 정확한 전달을 보장합니다.
- **순서 보장** : sequence number를 통해 data의 순서를 유지하여, 순서에 민감한 응용 program(동영상 streaming 등)에서도 문제없이 사용할 수 있습니다.

#### sequence number 기반 오류 제어 방식 활용 예시 (TCP)

1. 송신 측은 data를 segment로 분할하고 각 segment에 sequence number를 부여하여 전송합니다.
2. 수신 측은 segment를 받고, 다음에 받고 싶은 segment의 sequence number를 담은 ACK를 보냅니다.
3. 송신 측은 ACK를 통해 data가 정상적으로 수신되었는지 확인합니다.
4. 만약 송신 측이 일정 시간 내에 ACK를 받지 못하면, 해당 segment를 재전송합니다.
5. 수신 측은 sequence number를 기반으로 segment를 순서대로 재조립하여 원래의 data를 복원합니다.


### 수신 측 전송 계층에서 일어나는 일 : Data 합산 및 Session 계층으로 전달

- 전송 계층은 data를 작은 단위(segment 또는 datagram)로 분할하여 전송하고, 수신 측에서는 이러한 분할된 data를 다시 원래의 data로 합치는 역할을 수행합니다.
    - 전송 계층에서 이 과정을 도맡아 하기 때문에, 상위 계층들은 data 전송의 세부적인 과정을 신경 쓰지 않고 data를 주고받을 수 있습니다. 

- **data 합산 과정은 수신 측의 전송 계층에서 수행**되며, 송신 측에서는 data를 분할하여 전송하는 역할만 담당합니다.
    - data를 받는 쪽의 전송 계층에서만 data를 합산하여 Session 계층으로 전달하게 됩니다.

#### Data를 합산하여 Session 계층으로 전달하는 과정

1. **분할된 Data 수신** : 수신 측의 전송 계층은 Network 계층으로부터 분할된 data(segment 또는 datagram)를 받습니다.
    - 각 segment/datagram에는 순서 정보와 함께 data가 포함되어 있습니다.

2. **Data 재조립** : 전송 계층은 수신한 segment/datagram의 순서 정보를 확인하고, 순서에 맞게 data를 buffer에 저장합니다.
    - 만약 순서에 맞지 않는 segment/datagram이 도착하거나, 손실된 segment/datagram이 있다면, 재전송을 요청하거나 buffer에 빈 공간을 남겨둡니다.

3. **Data 합산** : 모든 segment/datagram이 도착하고 순서대로 정렬되면, 전송 계층은 buffer에 저장된 data를 합쳐서 원래의 data를 복원합니다.

4. **Session 계층으로 전달** : 합쳐진 data는 Session 계층으로 전달됩니다.
    - Session 계층은 연결 설정, 유지, 종료 등을 담당하며, 전송 계층에서 받은 data를 응용 계층으로 전달하기 전에 필요한 처리를 수행합니다.


### TCP와 UDP : 연결 방식과 신뢰성의 차이

- TCP(Transmission Control Protocol)와 UDP(User Datagram Protocol)는 모두 전송 계층 protocol이지만, data 전송 방식과 특징에서 중요한 차이를 보입니다.
    - **TCP**와 같은 연결 지향 protocol은 data의 순서와 신뢰성을 보장하기 위해 segment 번호, 확인 응답(ACK) 등을 사용하여 data 재조립 과정을 수행합니다.
    - **UDP**와 같은 비연결형 protocol은 datagram 단위로 data를 전송하며, data의 순서나 신뢰성을 보장하지 않습니다.
        - 따라서 UDP는 data 재조립 과정이 필요하지 않을 수 있습니다.

- TCP와 UDP는 각각의 장단점을 가지고 있으며, 사용 목적에 따라 적합한 protocol을 선택해야 합니다.
    - **신뢰성 있는 data 전송이 중요한 경우 TCP**를, **빠른 전송 속도가 중요하고 약간의 data 손실은 허용되는 경우 UDP**를 사용하는 것이 좋습니다. 

| 특징 | TCP | UDP |
| --- | --- | --- |
| **연결 방식** | 연결형 | 비연결형 |
| **신뢰성** | 높음 (data 순서 보장, 오류 검출 및 재전송) | 낮음 (data 순서 보장 X, 오류 검출 및 재전송 X) |
| **속도** | 상대적으로 느림 (연결 설정 및 유지, 오류 처리 등으로 인해) | 상대적으로 빠름 (연결 설정 없이 data 전송) |
| **용도** | file 전송, web browsing, email 등 신뢰성 있는 data 전송이 필요한 경우 | 실시간 streaming, online game, VoIP 등 빠른 전송이 중요하고 약간의 data 손실은 허용되는 경우 |
| **Data 단위** | Segment | Datagram |
| **흐름 제어** | 있음 (송신자와 수신자 간 data 전송 속도 조절) | 없음 |
| **혼잡 제어** | 있음 (network 혼잡 발생 시 data 전송 속도 조절) | 없음 |

#### TCP (Transmission Control Protocol)

- **연결형 Protocol** : data 전송 전에 3-way handshake 과정을 통해 연결을 설정하고, 전송 완료 후 연결을 해제합니다.
- **높은 신뢰성** : data 순서를 보장하고, 오류 검출 및 재전송 기능을 통해 data 손실을 최소화합니다.
- **흐름 제어 및 혼잡 제어** : 송신자와 수신자 간의 data 전송 속도를 조절하고, network 혼잡을 방지합니다.

#### UDP (User Datagram Protocol)

- **비연결형 Protocol** : 연결 설정 없이 data를 전송합니다.
- **낮은 신뢰성** : data 순서 보장이나 오류 검출 및 재전송 기능이 없어 data 손실 가능성이 있습니다.
- **빠른 속도** : 연결 설정 및 오류 처리 과정이 없어 TCP보다 빠른 전송 속도를 제공합니다.


---


## 5 계층 - Session 계층 (Session Layer)

| 특징 | 설명 |
| --- | --- |
| **대표 장치** | L4 Switch |
| **Protocol** | RPC, NetBIOS |

- **session**이란 일정 시간 동안 같은 사용자로부터 들어오는 일련의 요구를 하나의 상태로 보고 그 상태를 일정하게 유지하는 기술입니다.
    - 여기서 일정 시간이란, 방문자가 "web browser를 통해 web server에 접속한 시점"으로부터 "web browser를 종료함으로써 연결을 끝내기까지"의 기간을 의미합니다.
    - 즉, 방문자가 web server에 접속해 있는 상태를 하나의 단위로 보고 session이라고 합니다.

- Session 계층은 **통신하는 두 장치 간의 연결을 설정, 관리, 종료하는 역할**을 담당합니다.
    - 쉽게 말해, 통신 session을 열고 닫는 과정을 책임지는 층이라고 볼 수 있습니다.
    - 양 끝단의 응용 process가 통신을 관리하기 위한 방법을 제공하며, network상 양쪽 연결을 관리하고 연결을 지속시켜 주는 계층입니다.

- Session 계층은 **data 동기화** 및 **check pointing**을 통해 **안정적인 연결을 유지**하고, 장시간 통신이나 다중 연결 환경에서도 효율적인 data 전송을 보장합니다.
    - 덕분에 대용량 file 전송이나 실시간 streaming과 같은 service를 안정적으로 이용할 수 있습니다. 

- Session 계층에서 사용되는 주요 protocol로는 RPC, NetBIOS 등이 있습니다.
    - **RPC (Remote Procedure Call)** : 원격 computer에서 program을 실행할 수 있도록 하는 protocol입니다.
    - **NetBIOS** : Windows OS 환경에서 file 및 printer 공유 등을 위해 사용되는 Session 계층 protocol입니다.


### Session 계층의 주요 기능

- **Session 설정** : 통신하고자 하는 두 응용 program 간에 논리적인 연결을 설정합니다.
- **Session 유지 및 관리** : 연결된 session을 통해 data 교환이 원활하게 이루어질 수 있도록 관리하고, 필요에 따라 session을 재설정하거나 복구합니다.
- **Session 종료** : 통신이 완료되면 session을 안전하게 종료합니다.
- **동기화 및 check pointing** : data 전송 중 오류 발생 시, 오류가 발생한 지점부터 data 전송을 재개할 수 있도록 check point를 설정하고 동기화합니다.
- **Multiplexing** : 여러 응용 program이 동시에 통신할 수 있도록 하나의 물리적 연결을 여러 개의 논리적 연결로 분할합니다.


### Session 계층의 TCP/IP Session 관리 기능

- Session 계층은 TCP/IP session을 설정하고 관리하며, 통신 중 발생하는 문제를 해결하는 데 중요한 역할을 합니다.
    - 특히, TCP/IP 기반의 internet 통신 환경에서 필수적입니다.

#### TCP/IP Session 설정

- **Session 연결 설정** : client와 server 간의 통신을 시작하기 위해 TCP 3-way handshake 과정을 통해 연결을 설정합니다.
- **Session 식별자 할당** : 각 session에 고유한 식별자를 할당하여 여러 session을 동시에 관리할 수 있도록 합니다.
- **Session Parameter 협상** : 통신 양쪽 system 간에 data 전송 방식, 오류 처리 방법 등 session 관련 parameter를 협상하여 최적의 통신 환경을 구성합니다.

#### TCP/IP Session 유지

- **Data 흐름 제어** : data 전송 속도를 조절하여 수신 측 system이 data를 처리할 수 있도록 합니다.
    - 혼잡 제어 기능을 통해 network 혼잡을 방지합니다.
- **오류 감지 및 복구** : data 전송 중 발생하는 오류를 감지하고, 손실된 data를 재전송하여 안정적인 통신을 보장합니다.
- **Session 상태 관리** : session의 연결 상태, data 전송 상태 등을 지속적으로 관리하여 session이 정상적으로 유지되도록 합니다.

#### TCP/IP Session 종료 및 복구

- **정상적인 Session 종료** : 통신이 완료되면 TCP 4-way handshake 과정을 통해 session을 정상적으로 종료합니다.
- **비정상적인 Session 종료** : network 오류, system 장애 등으로 session이 비정상적으로 종료될 경우, Session 계층은 이를 감지하고 필요한 조치를 취합니다.
- **Session 복구** : session이 비정상적으로 종료된 경우, 가능하다면 session을 복구하여 data 전송을 재개합니다.
    - 복구가 불가능한 경우, 상위 계층에 오류를 전달하여 적절한 처리를 수행하도록 합니다.


### Session 계층에서의 Multiplexing

- Session 계층은 여러 응용 program 간의 통신 session을 관리하고, multiplexing을 통해 각 session이 독립적으로 data를 주고받을 수 있도록 보장합니다.

- Session 계층에서 **multiplexing**은 **하나의 물리적인 연결을 여러 개의 논리적인 session으로 분할**하여, 여러 응용 program이 동시에 통신할 수 있도록 하는 기능입니다. 
    - computer가 여러 개의 program을 동시에 실행하는 것처럼, Session 계층은 하나의 network 연결을 통해 여러 개의 통신 session을 동시에 관리하고, 각 session이 서로 간섭 없이 data를 주고받을 수 있도록 합니다.

- multiplexing은 OSI model의 여러 계층에서 사용되지만, 특히 Session 계층에서 중요한 역할을 합니다.
    - **효율적인 자원 활용** : 하나의 물리적 연결을 여러 session이 공유하므로, 각 session마다 별도의 연결을 설정할 필요가 없어 network 자원을 효율적으로 사용할 수 있습니다.
        - 여러 session이 하나의 연결을 공유하므로, 연결 설정 및 유지에 필요한 자원을 절약할 수 있습니다.
    - **동시 통신 지원** : 여러 응용 program이 동시에 통신할 수 있도록 하여, 사용자 편의성을 높이고 system 성능을 향상시킵니다.
        - 예를 들어, web browser에서 여러 개의 web page를 동시에 열거나, file 전송 program으로 여러 개의 file을 동시에 download하는 것이 가능해집니다.
        - 여러 응용 program이 동시에 통신할 수 있으므로, system 처리량을 높이고 응답 시간을 단축할 수 있습니다.
    - **혼선 방지** : 각 session에 고유한 식별자를 부여하고, data를 session별로 분리하여 전송함으로써 data 혼선을 방지합니다. 
    - **사용자 편의성 증대** : 여러 작업을 동시에 수행할 수 있도록 하여 사용자 편의성을 높입니다.

- Session 계층에서는 multiplexing을 구현하기 위해 **각 session에 고유한 session ID를 부여**하고, **data를 전송할 때 session ID를 함께 전송**합니다.
    - **수신 측에서는 session ID를 기반으로 data를 해당 session에 전달**하여 혼선 없이 data를 처리할 수 있습니다.


### Session 계층의 동기화 기능

- Session 계층의 동기화 기능은 data 전송 중 발생할 수 있는 오류나 연결 끊김 등의 **문제 상황에서 data 손실을 최소화**하고, **통신을 효율적으로 재개**할 수 있도록 돕는 중요한 기능입니다. 
    - 통신하는 사용자들을 동기화하고 오류 복구 명령들을 일괄적으로 다룸으로써, 안정적인 data 전송 통신 재개를 가능하게 합니다.
    - 특히, 대용량 data 전송이나 실시간 통신과 같이 안정성과 효율성이 중요한 환경에서 필수적입니다.

- **동기**란 **통신 양단에서 서로 동의하는 논리적인 공통 처리 지점**으로써, 동기점(check point)을 설정하기 위해 사용됩니다.
    - 동기점이 설정된다는 의미는 그 이전까지의 통신은 서로 완벽하게 처리했다는 것을 의미합니다.

- 동기화의 핵심 개념은 **check point**이며, Session 계층은 data 전송 과정에서 **특정 지점들을 check point로 설정**합니다.
    - 이 check point들은 **data 전송의 진행 상황을 기록**하는 일종의 **중간 저장 지점** 역할을 합니다.
    - 만약 오류나 연결 끊김 등으로 인해 data 전송이 중단될 경우, Session 계층은 마지막으로 확인된 check point부터 data 전송을 재개합니다.
        - 이를 통해 이미 전송된 data를 다시 보낼 필요 없이, 중단된 지점부터 이어서 전송할 수 있으므로 불필요한 data 낭비를 방지할 수 있습니다.

#### 동기화 기능의 이점

- **Data 무결성 보장** : Session 계층의 동기화 기능은 network 상태가 불안정한 상황에서 data 손실을 최소화하고, data의 무결성을 보장합니다.
    - 대용량 file 전송이나 실시간 streaming과 같이 장시간 연결이 필요한 경우, network 불안정으로 인해 data 전송이 중단될 가능성이 높습니다.

- **효율적인 통신 재개** : 오류 발생 시 처음부터 data 전송을 다시 시작하는 것이 아니라, 마지막 check point부터 재개하므로 통신 효율성을 높일 수 있습니다.
    - 특히 대용량 data 전송 시 시간과 자원을 절약하는 데 큰 도움이 됩니다.

- **사용자 경험 향상** : data 전송 중단으로 인한 불편함을 최소화하고, 끊김 없는 service를 제공하여 사용자 경험을 향상시킵니다.

#### 동기화 기능의 사용 예시

- **대용량 File Download** : 1GB 크기의 file을 download하는 중 internet 연결이 잠시 끊겼을 때, 끊긴 지점부터 다시 download를 이어갈 수 있습니다.
    - Session 계층의 동기화 기능이 없다면 처음부터 다시 download해야 하지만, 동기화 기능이 있다면 끊긴 시점 이전까지 download된 data는 유지되고, 끊긴 지점부터 이어서 download를 재개할 수 있습니다.

- **화상 회의** : 화상 회의 중 network 문제로 잠시 연결이 끊겼을 때, 동기화 기능을 통해 끊긴 시점 이전까지의 대화 내용과 화면 공유 상태를 유지하고, 끊긴 지점부터 회의를 이어갈 수 있습니다.


### Session 계층의 세 가지 통신 방식

- Session 계층은 data 통신 방식에 따라 **동시 송수신 방식(duplex), 반이중 방식(half-duplex), 전이중 방식(full-duplex)**의 세 가지 방식을 지원합니다.

- Session 계층은 통신하는 application의 요구사항과 network 환경에 따라 적절한 통신 방식을 선택하여 사용합니다.
    - 실시간 양방향 통신이 필요한 경우 동시 송수신 방식이나 전이중 방식을 선택합니다.
    - 비용을 절감해야 하는 경우 반이중 방식을 선택할 수 있습니다.
    - network 대역폭이 충분하고 혼잡하지 않은 경우 동시 송수신 방식이나 전이중 방식을 사용할 수 있습니다.

#### 동시 송수신 방식 (Duplex)

- 동시 송수신 방식(duplex)는 두 개의 통신 장치가 동시에 data를 송수신할 수 있는 방식입니다. 
    - data 송수신이 동시에 이루어지므로 통신 효율이 높습니다.
    - 실시간 양방향 통신이 가능합니다.

- 예를 들어, 전화 통화, 화상 회의, internet 등이 동시 송수신 방식입니다.
    - **전화 통화** : 상대방과 동시에 말하고 들을 수 있습니다.
    - **화상 회의** : 여러 참가자가 동시에 음성과 영상 data를 주고받습니다.
    - **internet** : web browsing, file download 및 업로드 등 대부분의 internet 통신은 동시 송수신 방식을 사용합니다.

#### 반이중 방식 (Half-Duplex)

- 반이중 방식(half-duplex)은 두 개의 통신 장치가 data를 송수신할 수 있지만, 동시에는 불가능하고 한 번에 한쪽 방향으로만 통신이 가능한 방식입니다. 
    - 통신 효율은 동시 송수신 방식보다 낮지만, 구현이 간단하고 비용이 저렴합니다.
    - 송수신 방향 전환에 시간이 소요됩니다.

- 예를 들어, 무전기, fax 등이 반이중 방식입니다.
    - **무전기** : 한 사람이 말하는 동안 다른 사람은 들을 수만 있고, 말하려면 상대방이 말을 마칠 때까지 기다려야 합니다.
    - **Fax** : 문서를 보내는 동안 다른 fax를 받을 수 없고, 문서 전송이 완료된 후에야 다른 fax를 받을 수 있습니다.

#### 전이중 방식 (Full-Duplex)

- 전이중 방식(full-duplex)은 **동시 송수신 방식의 한 종류**로, 두 개의 통신 장치가 각각 독립된 chennal을 통해 동시에 data를 송수신할 수 있는 방식입니다.
    - 동시 송수신 방식 중에서도 가장 높은 통신 효율을 제공합니다.
    - 송수신 방향 전환 없이 data를 주고받을 수 있습니다.

- 예를 들어, 광섬유 통신, 일부 고속 network 장비 등이 전이중 방식입니다.
    - **광섬유 통신** : 두 개의 광섬유를 사용하여 각각 다른 방향으로 data를 동시에 전송합니다.
    - **일부 고속 Network 장비** : 전이중 방식을 지원하여 대용량 data를 빠르게 처리합니다. 


---


## 6 계층 - 표현 계층 (Presentation Layer)

| 특징 | 설명 |
| --- | --- |
| **Protocol** | ASCII, Unicode, MIME, EBCDIC, UTF-8, MBCS, EUC-KR, JPG, MP3, MPEG 등 |

- **표현 계층**은 **응용 계층에서 주고받는 data를 서로 이해할 수 있는 형태로 변환**하는 역할을 담당합니다.
    - **code 간의 번역**을 담당하여 사용자 system에서 data의 형식상 차이를 다루는 부담을 응용 계층으로부터 덜어 줍니다.
    - 서로 다른 system 간의 **data 형식 차이를 해결**하여 원활한 통신을 가능하게 합니다.

- 표현 계층은 사용자가 직접 인지하지 못하는 경우가 많지만, 응용 program들이 서로 다른 system과 통신할 때 data를 올바르게 해석하고 처리할 수 있도록 중요한 역할을 수행합니다.

- MIME encoding이나 암호화 등의 동작이 이 계층에서 이루어집니다.
    - 예를 들면, EBCDIC로 encoding된 문서 file을 ASCII로 encoding된 file로 바꿔 주는 것은 표현 계층의 몫입니다.
    - 최근에는 문자 data 외에도 음성, 동영상 등 multimedea traffic, data도 포함됩니다.


### 표현 계층의 주요 기능

#### Data 형식 변환

- **Code 변환** : 서로 다른 문자 code(ASCII, EBCDIC, Unicode 등)를 변환하여 system 간 호환성을 보장합니다.
- **Data 압축 및 암호화** : data 크기를 줄이거나 보안을 강화하기 위해 압축 및 암호화를 수행합니다.
- **File 형식 변환** : image, 동영상, 문서 등 다양한 file 형식을 변환하여 다른 system에서도 열고 사용할 수 있도록 합니다.

#### Data 구조 표현

- **추상 구문 표기법 (ASN.1)** : data 구조를 표현하는 표준 방식으로, 서로 다른 system 간에 복잡한 data 구조를 교환할 때 사용됩니다.
- **XML, JSON** : data를 구조화하여 표현하는 데 널리 사용되는 markup 언어 및 data 교환 형식입니다.


### 표현 계층의 중요성

- **System 간 호환성** : 서로 다른 system 간의 data 형식 차이를 해결하여 원활한 통신을 가능하게 합니다.
- **Data 효율성** : data 압축을 통해 network 대역폭을 절약하고 전송 시간을 단축합니다.
- **Data 보안** : 암호화를 통해 data를 보호하고 무단 접근을 방지합니다.


### 표현 계층에서 사용되는 Protocol의 예시

- **ASCII, EBCDIC, Unicode** : 문자 code 변환.
- **JPEG, MPEG, GIF** : image 및 동영상 압축.
- **ZIP, RAR** : file 압축.
- **SSL, TLS** : data 암호화.
- **ASN.1, XML, JSON** : data 구조 표현.


### 표현 계층의 핵심적인 Data 표현 기술 : MIME

- 표현 계층은 OSI 7 계층 model에서 data 형식 변환, 압축, 암호화 등을 담당하여 서로 다른 system 간의 data 교환을 가능하게 하는 계층이며, **MIME**은 이러한 표현 계층의 기능을 실질적으로 구현하는 핵심 기술 중 하나입니다.
    - email, web browsing, file 전송 등 다양한 분야에서 MIME은 data를 정확하고 효율적으로 전송하는 데 핵심적인 역할을 합니다.

- MIME(Multipurpose Internet Mail Extensions)은 **internet에서 다양한 종류의 data를 전송하기 위한 표준 방식**입니다.
    - 원래는 email을 통해 text뿐만 아니라 image, 동영상, 음악 등 다양한 file을 전송하기 위해 개발되었지만, 현재는 web browser와 web server 간의 data 교환에도 널리 사용되고 있습니다.

#### MIME의 주요 기능

1. **File 형식 식별** : MIME은 각 file에 Content-Type header를 추가하여 file의 종류를 명시합니다.
    - 예를 들어, image/jpeg, text/html, audio/mpeg 등의 file 종류가 있습니다.
    - 이를 통해 수신 측은 file 형식을 정확히 파악하고 적절한 program으로 열 수 있습니다.

2. **Text encoding** : MIME은 text data의 문자 encoding 방식을 지정하여 다른 system에서도 text를 올바르게 표시할 수 있도록 합니다.
    - 예를 들어, UTF-8, EUC-KR 등의 encoding 방식이 있습니다.

3. **File 첨부** : MIME은 email이나 web form을 통해 file을 첨부하여 전송할 수 있도록 지원합니다.
    - 첨부 file은 Base64 encoding 등을 통해 text 형태로 변환되어 전송됩니다.

#### MIME의 중요성

- **다양한 Data 전송** : MIME은 text, image, 동영상, 음악 등 다양한 종류의 data를 internet을 통해 안전하고 효율적으로 전송할 수 있도록 합니다.
- **System 호환성** : MIME은 서로 다른 system 간의 data 교환을 위한 표준을 제공하여 호환성 문제를 해결합니다.
- **사용자 편의성** : MIME은 사용자가 다양한 종류의 file을 쉽게 주고받을 수 있도록 지원합니다.


---


## 7 계층 - 응용 계층 (Application Layer)

| 특징 | 설명 |
| --- | --- |
| **전송 단위** | Message 또는 Data |
| **대표 장치** | L7 Switch, 방화벽 |
| **Protocol** | FTP, HTTP, HTTPS, XML, Telnet, SSH, SMTP, POP3, IMAP 등 |

- 응용 계층은 **응용 process와 직접 관계하여 일반적인 응용 service를 수행**하며, 사용자 또는 application이 network에 접근할 수 있도록 합니다.
    - 응용 service의 예로, 가상 terminal(예를 들어, Telnet), JTM(Job transfer and Manipulation protocol, 표준 ISO/IEC 8832) 등이 있습니다.

- 사용자를 위한 interface(UI, User Interface)를 제공하며, **사용자에게 보이는 유일한 계층**이라고 할 수 있습니다.
    - computer나 smart phone으로 internet을 사용할 때 직접 마주하는 계층입니다.

- web browser, email client, file 전송 program 등이 모두 응용 계층에서 동작하며, 사용자가 원하는 작업을 수행할 수 있도록 다양한 기능을 제공합니다. 
    - web browser에서 web page를 열 때 **HTTP protocol**을 사용합니다.
        - WWW(World Wide Web)를 위한 HTTP는 L7에서 동작하는 protocol입니다.
    - email을 보낼 때 **SMTP protocol**을, email을 받을 때 **POP3 또는 IMAP protocol**을 사용합니다.
    - file을 전송할 때 **FTP protocol**을 사용합니다. 

- 응용 계층은 **port 번호를 통해 전송 계층과 통신**합니다.
    - port 번호는 응용 program들이 서로를 구별하고 통신하기 위해 사용하는 것으로, 주로 전송 계층에서 사용됩니다.
    - 응용 계층은 이 port 번호를 직접 다루지는 않지만, **응용 계층 protocol**이 **전송 계층 protocol(TCP 또는 UDP)**을 통해 data를 주고받으며, 이때 **전송 계층 protocol이 port 번호를 사용하여 통신**을 합니다.
    - 예를 들어, web browser가 web server에 접속할 때 응용 계층은 통신을 위해 간접적으로 port 번호를 사용합니다.
        - web browser(응용 계층)는 web server에 접속할 때 HTTP protocol(응용 계층)을 사용합니다.
        - HTTP protocol은 TCP protocol(전송 계층)을 통해 data를 주고받습니다.
        - TCP protocol은 web server의 80번 port(well-known port)로 연결하여 통신을 합니다.


---


## Reference

- <https://ko.wikipedia.org/wiki/OSI_모형>
- <https://namu.wiki/w/OSI%20모형>
- <https://khys.tistory.com/70>
- <https://www.youtube.com/watch?v=Oyit5eo4UsY&t=56s>
