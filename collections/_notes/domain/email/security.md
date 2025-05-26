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


### 이메일 보안 기술

#### SPF(Sender Policy Framework)

- 특정 도메인의 이메일이 승인된 mail server에서 발송되었는지 확인하는 방법입니다.
- DNS record에 SPF 정보를 등록하여 인증된 발송 server를 명시합니다.
- 발신자 주소 위조를 방지하여 spam과 phishing을 줄이는 데 도움을 줍니다.

#### DKIM(DomainKeys Identified Mail)

- 이메일 메시지에 전자 서명을 추가하여 발신자의 신원과 메시지 내용의 무결성을 검증합니다.
- 발신 server는 private key로 메시지에 서명하고, 수신 server는 public key로 서명을 검증합니다.
- DNS record에 DKIM public key를 등록하여 검증 과정을 지원합니다.

#### DMARC(Domain-based Message Authentication, Reporting & Conformance)

- SPF와 DKIM을 기반으로 한 이메일 인증 정책입니다.
- 발신자 도메인은 인증 실패 시 취할 action(none, quarantine, reject)을 지정할 수 있습니다.
- 인증 결과에 대한 보고서를 받을 수 있어 모니터링과 정책 조정이 가능합니다.

#### TLS(Transport Layer Security)

- 이메일 전송 과정의 암호화를 담당합니다.
- SMTP over TLS(SMTPS), POP3 over TLS(POP3S), IMAP over TLS(IMAPS)로 구현됩니다.
- 이메일 내용의 도청을 방지하고 통신 보안을 강화합니다.

## 이메일 시스템 구성 요소

### MUA(Mail User Agent)

- 사용자가 이메일을 작성하고 읽는 데 사용하는 client program입니다.
- Microsoft Outlook, Gmail web interface, Apple Mail 등이 대표적인 예시입니다.
- 이메일 작성, 읽기, 회신, 전달, 정리 등의 기능을 제공합니다.

### MTA(Mail Transfer Agent)

- 이메일을 다른 server로 전송하는 server program입니다.
- Postfix, Sendmail, Microsoft Exchange 등이 대표적인 예시입니다.
- SMTP protocol을 사용하여 domain 간 이메일을 routing합니다.