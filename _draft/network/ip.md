---
layout: note
---

# IP : Internet Protocol

- internet에 연결되어 있는 모든 장치들(computer, server device, smart phone, etc..)을 식별할 수 있도록 각가의 장비에 보여되는 고유 주소

## IPv4, IPv6

- IPv4 : IP version 4
    - 전 세계적으로 사용된 첫 번째 internet protocol
    - 32bit
        - 2^32(약 42억 9천)개의 주소를 가질 수 있음
        - internet 사용자 수가 급증하면서 주소가 고갈되어가고 있음
            - IPv6가 등장한 배경
    - 8bit씩 4자리로 되어 있음
    - 각 자리는 온점(.)으로 구분
    - ex) 115.68.24.88
- IPv6 : IP version 6
    - IPv4의 주소 체계를 128bit 크기로 확장한 차세대 internet protocol 주소
    - 16bit씩 8자리
    - 각 자리는 colon(:)으로 구분
    - ex) 2001:0DB8:1000:0000:0000:0000:1111:2222
    - network 속도, 보안적인 부분 뿐만 아니라 여러 면이서 IPv4보다 뛰어남
    - 기존의 주소 체계를 변경하는 데에 비용이 많이 들어서 아직 완전히 상용화되지 않음

## Static IP, Dinamic IP

- Static(고정) IP
    - 변하지 않고 computer에 고정적으로 부여된 IP
    - 한번 부여되면 IP 반납을 하기 전까지는 다른 장비에 부여할 수 없는 고유의 IP
    - 보안성이 우수하기 때문에 보안이 필요한 업체나 기관에서 사용함
- Dinamic(유동) IP
    - 고정되지 않은 변하는 IP
        - internet 사용자 모두에게 고정 IP를 부여해 주기는 힘듬
        - 따라서 일정한 주기 또는 사용자들이 인터넷에 접속하는 매 순간마다 사용하고 있지 않은 IP 주소를 임시로 발급해 줌
    - 대부분의 사용자는 유동 IP를 사용함
 
## Public IP, Private IP

- Public(공인) IP
    - IP 주소는 임의로 우리가 부여하는 것이 아니라 전 세계적으로 ICANN이라는 기관이 국가별로 사용할 IP 대역을 관리함
        - 한국은 '한국 Internet 진흥원(KISA)'에서 국내 IP 주소들을 관리함
    - IP 대역을 ISP가 부여받고 사용자는 ISP에 가입을 통해 IP를 제공받아 internet을 사용할 수 있음
        - ISP : Internet Service Provider : KT, LG, SKT와 같이 internet을 제공하는 통신 업체
    - 이렇게 사용자가 발급받은 IP를 Public IP라고 함
    - 전 세계에서 유일한 IP
        - 외부, 내부 상관없이 해당 IP에 접속할 수 있음
- Private(사설) IP
    - 공유기를 사용한 internet 접속 환경일 경우 공유기까지는 공인 IP 할당을 하지만, 공유기에 연결되어 있는 가정이나 회사의 각 network 기기에는 사설 IP를 할당함
    - 사설 IP는 어떤 network 안에서 내부적으로 사용되는 고유한 주소
    - 하나의 network 안에서 유일함
        - 내부에서만 접근 가능

---

# Reference

- https://study-recording.tistory.com/7
