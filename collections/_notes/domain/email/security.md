---
published: false
---



## email 보안 mechanism

- email 보안은 **encryption**과 **authentication**을 통해 구현됩니다.
    - TLS/SSL encryption은 전송 중인 email을 암호화합니다.
        - SMTP over TLS(STARTTLS)는 기존 연결을 암호화로 upgrade합니다.
        - SMTP over SSL(SMTPS)는 처음부터 암호화된 연결을 사용합니다.
        - certificate 검증을 통해 server의 신원을 확인합니다.
    - SPF(Sender Policy Framework)는 발신자 domain의 유효성을 검증합니다.
        - DNS TXT record를 통해 허용된 발신 server를 명시합니다.
        - email spoofing을 방지하는 효과적인 방법입니다.
        - receiving server가 발신자의 IP 주소를 검증합니다.
    - DKIM(DomainKeys Identified Mail)은 email 내용의 무결성을 보장합니다.
        - digital signature를 사용하여 email이 변조되지 않았음을 증명합니다.
        - private key로 서명하고 public key로 검증하는 asymmetric 암호화를 사용합니다.
        - header와 body의 특정 부분에 대한 hash 값을 계산합니다.
    - DMARC(Domain-based Message Authentication)는 SPF와 DKIM을 보완합니다.
        - domain owner가 authentication 실패 시 처리 방법을 지정합니다.
        - quarantine 또는 reject 정책을 통해 suspicious email을 차단합니다.
        - reporting 기능을 통해 domain 남용 현황을 모니터링합니다.

