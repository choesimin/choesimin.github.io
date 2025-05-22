---
published: false
---



## email 전송 protocol

- email 전송은 여러 **protocol**을 통해 이루어지며, 각각 다른 역할을 담당합니다.
    - SMTP(Simple Mail Transfer Protocol)는 email 발송을 담당하는 protocol입니다.
        - port 25, 587, 465를 주로 사용합니다.
        - client에서 server로, server 간 email 전송을 처리합니다.
        - authentication과 encryption을 지원하여 보안성을 높입니다.
    - POP3(Post Office Protocol 3)는 email 수신을 담당하는 protocol입니다.
        - port 110 또는 995(SSL/TLS)를 사용합니다.
        - server에서 client로 email을 download하여 local에 저장합니다.
        - download 후 server에서 email을 삭제하는 것이 기본 동작입니다.
    - IMAP(Internet Message Access Protocol)는 email 동기화를 담당하는 protocol입니다.
        - port 143 또는 993(SSL/TLS)를 사용합니다.
        - server에 email을 보관하면서 여러 device에서 동기화됩니다.
        - folder 구조와 email 상태를 server와 client 간에 동기화합니다.









## 이메일 기술 구조

### 이메일 Protocol

#### SMTP(Simple Mail Transfer Protocol)

- 이메일 발송에 사용되는 표준 protocol입니다.
- 기본적으로 포트 25를 사용하지만, 보안을 위해 포트 587이나 465를 사용하기도 합니다.
- 발신자의 mail client에서 수신자의 mail server로 메시지를 전달합니다.
- SMTP는 command와 response 형태로 통신합니다.
    - HELO/EHLO, MAIL FROM, RCPT TO, DATA 등의 command를 사용합니다.

#### POP3(Post Office Protocol version 3)

- 이메일 수신에 사용되는 protocol 중 하나입니다.
- 기본적으로 포트 110을 사용하며, 보안 연결에는 포트 995를 사용합니다.
- mail server에서 사용자의 client로 메시지를 다운로드하고 일반적으로 server에서 메시지를 삭제합니다.
- 단순한 구조로 offline 환경에서 이메일 확인에 적합합니다.

#### IMAP(Internet Message Access Protocol)

- 이메일 수신에 사용되는 또 다른 protocol입니다.
- 기본적으로 포트 143을 사용하며, 보안 연결에는 포트 993을 사용합니다.
- mail server에 메시지를 보관하면서 여러 device에서 동기화된 access를 제공합니다.
- 메시지 folder 구조와 flag 관리 등 POP3보다 다양한 기능을 제공합니다.

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








---


## Reference

- <https://ddongwon.tistory.com/77>
