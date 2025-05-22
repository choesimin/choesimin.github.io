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
