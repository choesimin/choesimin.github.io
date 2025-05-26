---
published: false
---





## email server 구조

- email system은 **MTA(Mail Transfer Agent)**와 **MDA(Mail Delivery Agent)**로 구성됩니다.
    - MTA는 email 전송을 담당하는 server component입니다.
        - 발신자의 email을 받아 수신자의 domain으로 routing합니다.
        - DNS MX record를 조회하여 목적지 server를 찾습니다.
        - SMTP protocol을 사용하여 다른 MTA와 통신합니다.
        - spam filtering과 virus scanning을 수행합니다.
    - MDA는 email 전달을 담당하는 server component입니다.
        - MTA에서 받은 email을 최종 사용자의 mailbox에 저장합니다.
        - user authentication과 quota 관리를 수행합니다.
        - email filtering rule과 forwarding rule을 적용합니다.



## 이메일 시스템 구성 요소

### MDA(Mail Delivery Agent)

- 수신된 이메일을 사용자의 mailbox에 최종 전달하는 program입니다.
- Procmail, Dovecot, Cyrus 등이 대표적인 예시입니다.
- MTA로부터 받은 메시지를 filtering하고 적절한 사용자의 mailbox에 저장합니다.
- spam 필터링, 바이러스 검사, 자동 분류 등의 역할을 수행할 수 있습니다.

### Mail Server

- 이메일을 처리하는 중앙 system으로 MTA와 MDA를 포함합니다.
- 사용자 mailbox를 관리하고 client의 접속 요청을 처리합니다.
- 대형 조직에서는 load balancing과 redundancy를 위해 여러 mail server를 운영합니다.
- Exchange Server, G Suite Gmail, Zimbra 등이 대표적인 mail server solution입니다.

