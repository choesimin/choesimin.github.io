# Protocol

- 통신 규약(通信規約)
- 복수의 computer 사이나 중앙 computer와 단말기 사이에서 data 통신을 원활하게 하기 위해 필요한 통신 규약
- 신호 송신의 순서, 데이터의 표현법, 오류(誤謬) 검출법 등을 정함
- computer와 computer, 장비와 장비 간에 서로 통신을 하려할 때, 이해할 수 없는 언어를 사용한다면 통신이 되는 것이 아님
    - 한국어를 사용하는 한국인과 다른 언어를 사용하는 외국인이 서로 이해할 수 없는 언어를 사용한다면 연결이 되어있다고 말할 수 없음
- network 용어에서 나오는 'P'는 'Protocol의 약자'가 대부분임
    - TCP/IP; Transmission Control Protocol / Internet Protocol
        - computer와 computer가 통신 회선 등으로 연결하기 위한 통신 규약
    - 그외 HTTP, ARP, ICMP, SNMP, SMTP, POP, FTP, TFTP, DHCP 등

## protocal의 요소

- 구문(Syntax) : data의 형식이나 신호. 부호화 방법 등을 정의
- 의미(Sementics) : 오류 제어, 동기 제어, 흐름 제어 같은 각종 제어 절차에 관한 제어 정보를 정의
- 순서(Timing) : 송/수신자 간 혹은 양단(end-to-end)의 통신 system과 망 사이의 통신 속도나 순서 등을 정의

## protocol의 기능

- 세분화(or 단편화)와 재합성
    - 대용량 크기의 file은 그대로 전송할 수가 없어서 작은 단위로 나누어 보내고 수신 측에서는 재조합해야함
        - data의 크기와 종류가 다양하기 때문
- 캡슐화
    - PDU는 SDU; Service Data Unit와 PCI; Protocal Control Information로 구성됨
        - PDU : protocal data 단위로, data가 전송될 때 일정 크기의 data block을 의미
        - SDU : 전송하려는 data를 의미
        - PCI : 보통은 제어 정보를 의미함. 주소, 오류 검출 code, protocol 제어 정보 등. 이러한 정보를 붙이는 것을 캡슐화라고 함 
- 연결제어
    - 연결 지향형 data 전송 (Connected Oriented Data Transfer)
        - 두 system이 서로 data를 교환할 때 연결을 설정하는 경우, 연결 설정, data 전송, 연결 해제 3단계로 구성됨
        - ex) TCP
    - 비연결 지향형 data 전송 (Connectionless Data Transfer)
        - 연결을 설정하지 않는 경우로 이렇게 전송되는 data를 datagram이라고 함 
        - ex) UDP
- 오류제어
    - SDU나 PCI가 잘못되었을 경우 이를 발견하는 기법
    - parity bit, 잉여도 검사(CRC; Cyclic Rebundancy Check)를 통해 발견할 수 있음
    - 순서 검사나 일정 시간 안에 packet을 받지 봇하면 재전송을 요구하는 방식으로 이루어짐
- 흐름제어
    - 송신측 개체로부터 오는 data의 양이나 속도를 조절하는 기능
    - 두가지 방법
        - 정지-대기(Stop and Wait) : packet에 대한 응답 후에 다음 packet을 보냄
        - Sliding Window : 가용 data 분량의 packet을 한꺼번에 보낸 후 응답 packet을 받으면 다시 그만큼 data를 한꺼번에 보내는 방식
- 동기화
    - data를 전송할 때 각 개체는 timer값이나 window 크기등을 기억해야 함
    - 이런 값들을 공유하는 것을 의미
- 순서 결정
    - protocol data 단위(PDU; Protocol Data Unit)가 전송될 때 보내지는 순서를 명시하는 기능
    - 연결 지향형(connection-oriented)에만 사용됨
    - 순서를 지정하는 이유는 흐름제어, 오류제어를 위해서임
        - PDU(protocol data 단위)를 상대한테 보내면 상대는 순서에 맞게 data를 재구성하고 오류가 있을 씨에는 재전송을 요청함
- 주소 설정
    - 한 개체가 상대 개체에 data를 전송하려면 상대의 이름을 알아야 함
    - protocol에는 각 전송 계층에 맞는 주소를 지정하는 기능이 있음
- 다중화
    - 통신 선로 하나에서 여러 system이 동시에 통신할 수 있는 것을 의미
- 전송 service
    - 우선순위 결정, service 등급과 보안 요구 등을 제어하는 service

## Protocol의 특성 및 분류

1. 직접/간접(Direct/Indirect) Protocol
    1. 직접 방식 : 2개의 entity 사이에 직접 정보를 교환하는 방식
        - 점대점 방식
        - multipoint/방송망(다점) 방식
    2. 간점 방식 : 교환망이나 다른 network를 통해서 간접적으로 정보를 교환하는 방식
        - 교환망 방식

2. 단일체/구조적(Monolithic/Structured) Protocol
    1. 단일체
        - entity 사이에 통신 작업이 하나의 protocol에서 이루어짐
        - 모든 기능들이 하나의 protocol로 연관됨
    2. 구조체
        - 통신 작업은 워낙 복잡하기 때문에 protocol층을 이루는 구조를 사용함
        - 전체적인 기능을 몇개의 작은 기능들로 구분

3. 표준/비표준(Standard/Nonstandard) Protocol
    1. 표준 : computer model에 관계없이 protocol을 공유
    2. 비표준 : 특정한 통신 상황의 특정한 computer model에서 사용
    - protocol 표준화의 필요성
        - 표준 protocol을 사용할 경우 누가 만들더라도 서로 통신이 가능함
    - 대표적인 표준화 기구
        1. ISO; International Standardization Organization : 국제 표준화 기구
            - 공업 규격의 국제적 통일과 조정을 목적으로 하는 비조약 기구
        2. ITU; International Telecommunication Union : 국제 전기 통신 연합
            - UN의 자문기구로 전기통신 업무에 관한 규칙을 제정하고 권고안을 작성하는 연합
        3. ANSI; American National Standard Institute; 미국 표준 협회
            - 미국의 공업 분야에 있어서 규격의 통일과 표준화를 목적으로 설립됨
        4. EIA; Electronic Industries Association : (미국의) 전자 공업 연맹
            - 주로 통신용 hardware에 관한 규격을 제정
        5. IEEE; Institute of Electronical Electronics Engineers : (미국의) 전기 전자 기술자 협회
            - 미국의 전기, 전자 기술자로 구성된 협의체
            - 통신 분야에서는 주로 LAN 표준을 제정

---

# Reference

- https://ko.wikipedia.org/wiki/통신_프로토콜
- https://usefultoknow.tistory.com/entry/프로토콜Protocol이란-or-통신규약
