---
layout: note
permalink: /328
title: Email Protocol - SMTP, POP3, IMAP
description: email을 발송할 때는 SMTP를 사용하고, 수신할 때는 POP3나 IMAP을 사용하게 됩니다.
date: 2025-05-22
published: false
---









# Email Protocol 기본 구조

- email system은 **발송**, **수신**, **동기화**를 담당하는 세 가지 핵심 protocol로 구성됩니다.
    - SMTP는 email을 보내는 역할을 담당합니다.
    - POP3와 IMAP는 email을 받는 역할을 담당하지만 동작 방식이 다릅니다.
    - 각 protocol은 독립적으로 작동하면서도 완전한 email 시스템을 구성합니다.

## SMTP Protocol 개요

- **SMTP(Simple Mail Transfer Protocol)**는 email 발송 전용 protocol입니다.
    - 사용자가 email을 보낼 때 email client에서 mail server로 전달합니다.
    - mail server 간에도 email을 relay하여 최종 목적지까지 전송합니다.
    - 편지를 우체통에 넣어 우체국으로 보내는 과정과 유사합니다.

### SMTP 작동 과정

- email 발송은 단계별로 진행됩니다.
    - 사용자가 email client에서 메시지를 작성하고 전송 버튼을 누릅니다.
    - email client가 SMTP server에 연결하여 사용자 인증을 수행합니다.
    - 발신자와 수신자 정보를 server에 전달합니다.
    - 실제 email 내용을 server로 전송합니다.
    - SMTP server가 수신자의 mail server로 email을 전달합니다.

### SMTP 사용 환경

- SMTP는 outgoing mail server 설정에서 사용됩니다.
    - Gmail, Outlook 등 email service의 발송 설정에 필요합니다.
    - 기업 email system의 outbound mail 처리에 사용됩니다.
    - web application에서 notification email 발송에 활용됩니다.

## POP3 Protocol 개요

- **POP3(Post Office Protocol 3)**는 email을 다운로드하여 저장하는 protocol입니다.
    - mail server에서 사용자 device로 email을 완전히 옮겨옵니다.
    - 다운로드 후 server에서 email을 삭제하는 것이 기본 동작입니다.
    - 우체국에서 편지를 가져와 집에 보관하는 방식과 유사합니다.

### POP3 특징

- POP3는 offline 중심의 email 관리 방식입니다.
    - 한 번 다운로드하면 internet 연결 없이도 email을 확인할 수 있습니다.
    - 주로 하나의 device에서만 email을 관리할 때 적합합니다.
    - server storage 용량을 절약할 수 있습니다.
    - email backup과 관리 책임이 사용자에게 있습니다.

### POP3 사용 사례

- POP3는 특정 상황에서 유용합니다.
    - 개인용 컴퓨터 한 대에서만 email을 확인하는 경우에 적합합니다.
    - internet 연결이 불안정한 환경에서 유리합니다.
    - mail server의 storage 제한이 있을 때 효과적입니다.
    - 단순한 email 사용 패턴을 가진 사용자에게 권장됩니다.

## IMAP Protocol 개요

- **IMAP(Internet Message Access Protocol)**는 email을 server에서 관리하는 protocol입니다.
    - email을 server에 보관하면서 여러 device에서 동일하게 접근할 수 있습니다.
    - 모든 device에서 같은 email 상태를 확인할 수 있습니다.
    - 은행 금고에 물건을 보관하고 여러 장소에서 접근하는 방식과 유사합니다.

### IMAP 특징

- IMAP는 online 중심의 email 관리 방식입니다.
    - 여러 device에서 동시에 같은 mailbox를 사용할 수 있습니다.
    - email을 읽거나 삭제하면 모든 device에 즉시 반영됩니다.
    - folder 구조와 email 분류가 모든 device에서 동기화됩니다.
    - server에서 email을 검색하고 정렬할 수 있습니다.

### IMAP 사용 사례

- IMAP는 현대적인 email 사용 환경에 적합합니다.
    - smartphone, tablet, 컴퓨터에서 동시에 email을 확인하는 경우에 필수입니다.
    - 팀이나 가족이 shared mailbox를 사용할 때 유용합니다.
    - email을 체계적으로 분류하고 관리해야 하는 업무 환경에 적합합니다.
    - 대용량 email archive를 유지해야 하는 경우에 효과적입니다.

## Protocol 간 관계와 역할 분담

- email system에서 각 protocol은 명확한 역할 분담을 가집니다.
    - **SMTP**는 email 발송만 담당하며 받는 것과는 무관합니다.
    - **POP3 또는 IMAP**는 email 수신만 담당하며 보내는 것과는 무관합니다.
    - 완전한 email 사용을 위해서는 SMTP와 POP3/IMAP를 모두 설정해야 합니다.

### 일반적인 조합

- 실제 email 환경에서는 protocol을 조합하여 사용합니다.
    - **SMTP + POP3** 조합은 단일 device 환경에서 사용됩니다.
        - 집이나 사무실의 고정 컴퓨터에서만 email을 확인하는 경우에 적합합니다.
        - email client 설정이 간단하고 server 부하가 적습니다.
    - **SMTP + IMAP** 조합은 다중 device 환경에서 사용됩니다.
        - smartphone, tablet, 노트북 등 여러 기기에서 email을 확인하는 현대적 사용 패턴입니다.
        - Gmail, Outlook 등 대부분의 현대 email service가 이 방식을 사용합니다.

## Email Client 설정 예시

- email client에서는 발송과 수신을 별도로 설정합니다.
    - **발송 설정(SMTP)**에는 outgoing mail server 정보를 입력합니다.
        - server 주소 : smtp.gmail.com
        - port : 587 또는 465
        - 보안 : TLS 또는 SSL
        - 인증 : 사용자명과 password
    - **수신 설정(IMAP/POP3)**에는 incoming mail server 정보를 입력합니다.
        - server 주소 : imap.gmail.com 또는 pop.gmail.com
        - port : 993(IMAP), 995(POP3)
        - 보안 : SSL/TLS
        - 인증 : 사용자명과 password

### 설정 시 고려사항

- email client 설정 시 주의할 점들입니다.
    - 보안 연결(SSL/TLS)을 반드시 활성화해야 합니다.
    - 사용 환경에 맞는 적절한 protocol을 선택해야 합니다.
    - email service provider의 권장 설정을 확인해야 합니다.
    - two-factor authentication 사용 시 app password가 필요할 수 있습니다.














































































































## Email 전송 Protocol

- email 전송은 **SMTP**, **POP3**, **IMAP** 등 여러 protocol이 협력하여 완성되는 복합적인 통신 system입니다.
    - 각 protocol은 email 생명 주기의 특정 단계를 담당하며, 서로 다른 역할과 특성을 가집니다.
    - 현대 email system은 이들 protocol의 조합으로 안정적이고 효율적인 messaging 환경을 구현합니다.
    - protocol 선택은 사용 목적, 보안 요구사항, network 환경에 따라 결정됩니다.


---


## SMTP Protocol 구조

- **SMTP(Simple Mail Transfer Protocol)**는 email 발송 전용 protocol로 현대 email system의 핵심 구성요소입니다.
    - email client에서 mail server로, 그리고 server 간 message 전송을 담당합니다.
    - text 기반 command-response 구조로 설계되어 단순하면서도 효과적입니다.
    - relay 기능을 통해 복잡한 network 환경에서도 email 전달이 가능합니다.

### Port 구성 체계

- SMTP는 용도와 보안 수준에 따라 서로 다른 port를 사용합니다.
    - **Port 25**는 server 간 통신을 위한 표준 port입니다.
        - mail server가 다른 mail server로 message를 relay할 때 사용합니다.
        - ISP에서 spam 방지를 위해 일반 사용자의 port 25 사용을 차단하는 경우가 많습니다.
        - 암호화되지 않은 plain text 통신이 기본입니다.
    - **Port 587**은 mail submission을 위한 표준 port입니다.
        - email client가 outgoing mail server로 message를 제출할 때 사용합니다.
        - STARTTLS를 통한 암호화와 authentication이 필수적으로 요구됩니다.
        - 현대 email client에서 가장 권장되는 설정입니다.
    - **Port 465**는 SMTPS(SMTP over SSL)를 위한 port입니다.
        - 연결 시점부터 SSL/TLS 암호화가 적용되는 implicit TLS 방식입니다.
        - 일부 legacy system에서 여전히 사용되지만 공식적으로는 deprecated 상태입니다.

### Command 체계 분석

- SMTP protocol은 정해진 순서의 command를 통해 email 전송 과정을 제어합니다.
    - **HELO/EHLO** command는 session 시작과 server 능력 확인을 담당합니다.
        - HELO는 기본적인 SMTP 기능만 사용할 때 전송됩니다.
        - EHLO는 확장 SMTP 기능을 지원하는 server와 통신할 때 사용됩니다.
        - server는 지원하는 extension list를 response로 반환합니다.
    - **AUTH** command는 사용자 인증 과정을 처리합니다.
        - PLAIN, LOGIN, CRAM-MD5 등 다양한 authentication mechanism을 지원합니다.
        - 보안을 위해 TLS 연결 상태에서만 authentication을 허용하는 것이 일반적입니다.
    - **MAIL FROM** command는 발신자 주소를 지정합니다.
        - envelope sender address를 설정하며, bounce message의 수신 주소가 됩니다.
        - header의 From 필드와 다를 수 있어 spoofing 방지를 위한 검증이 필요합니다.
    - **RCPT TO** command는 수신자 주소를 지정합니다.
        - 여러 수신자가 있는 경우 각 수신자마다 별도의 RCPT TO command를 전송합니다.
        - server는 각 수신자 주소의 유효성을 확인하고 수락 여부를 결정합니다.
    - **DATA** command는 실제 message 내용을 전송합니다.
        - header와 body를 포함한 전체 message를 전송합니다.
        - message 종료는 단독 line의 마침표(.)로 표시됩니다.


---


## POP3 Protocol 특성

- **POP3(Post Office Protocol version 3)**는 단순한 email 수신 protocol로 offline 환경에 최적화되어 있습니다.
    - mail server에서 client로 message를 download하는 단방향 동기화를 수행합니다.
    - download 완료 후 server에서 message를 삭제하는 것이 기본 동작입니다.
    - 단일 device 환경에서 효율적이며 server storage 부담을 최소화합니다.

### Port 및 보안 구성

- POP3는 보안 수준에 따라 두 가지 port를 사용합니다.
    - **Port 110**은 암호화되지 않은 표준 POP3 연결에 사용됩니다.
        - username과 password가 plain text로 전송되어 보안상 취약합니다.
        - 내부 network 환경이나 test 목적으로만 사용해야 합니다.
    - **Port 995**는 SSL/TLS 암호화가 적용된 POP3S 연결에 사용됩니다.
        - 연결 시점부터 암호화가 적용되는 implicit TLS 방식입니다.
        - 모든 인증 정보와 message 내용이 암호화되어 전송됩니다.

### 동작 방식 상세

- POP3 session은 세 단계로 구분되어 진행됩니다.
    - **Authorization 단계**에서는 사용자 인증을 수행합니다.
        - USER command로 username을 전송하고 PASS command로 password를 전송합니다.
        - APOP command를 사용하면 MD5 hash를 통한 안전한 인증이 가능합니다.
    - **Transaction 단계**에서는 message 조회와 download를 처리합니다.
        - STAT command로 mailbox의 message 개수와 총 크기를 확인합니다.
        - LIST command로 각 message의 크기 정보를 조회합니다.
        - RETR command로 특정 message를 download합니다.
        - DELE command로 message 삭제를 예약합니다.
    - **Update 단계**에서는 session 종료와 변경사항 적용을 처리합니다.
        - QUIT command로 session을 종료하면서 삭제 예약된 message들을 실제로 제거합니다.


---


## IMAP Protocol 고급 기능

- **IMAP(Internet Message Access Protocol)**는 server 중심의 email 관리 protocol로 다중 device 환경에 적합합니다.
    - message를 server에 보관하면서 client는 필요한 부분만 선택적으로 download합니다.
    - folder 구조, message flag, search 기능 등 풍부한 mailbox 관리 기능을 제공합니다.
    - 여러 client가 동시에 같은 mailbox에 접근하여 동기화된 상태를 유지합니다.

### Port 및 연결 방식

- IMAP는 보안 수준에 따라 서로 다른 port와 연결 방식을 제공합니다.
    - **Port 143**은 암호화되지 않은 표준 IMAP 연결에 사용됩니다.
        - STARTTLS command를 통해 연결 도중 암호화로 전환할 수 있습니다.
        - 초기 연결은 plain text이지만 실제 인증과 data 전송은 암호화됩니다.
    - **Port 993**은 SSL/TLS 암호화가 적용된 IMAPS 연결에 사용됩니다.
        - 연결 시점부터 암호화가 적용되는 implicit TLS 방식입니다.
        - 모든 통신 내용이 처음부터 끝까지 암호화됩니다.

### Folder 및 Message 관리

- IMAP는 hierarchical folder 구조를 통해 체계적인 email 관리를 지원합니다.
    - **INBOX**는 모든 IMAP server에서 기본 제공되는 표준 folder입니다.
        - 새로 수신된 message가 자동으로 저장되는 위치입니다.
        - 다른 folder는 server 설정이나 client 요청에 따라 생성됩니다.
    - **NAMESPACE** command는 folder 구조의 root 정보를 제공합니다.
        - personal namespace, shared namespace, public namespace를 구분합니다.
        - folder name의 separator character와 prefix 정보를 포함합니다.
    - **LIST/LSUB** command는 사용 가능한 folder 목록을 조회합니다.
        - LIST는 모든 folder를 표시하고 LSUB는 구독된 folder만 표시합니다.
        - wildcard pattern을 사용하여 특정 조건의 folder만 검색할 수 있습니다.

### Message Flag System

- IMAP는 각 message에 다양한 flag를 설정하여 상태 관리를 수행합니다.
    - **System flag**는 IMAP protocol에서 표준으로 정의된 flag입니다.
        - `\Seen` flag는 message를 읽었음을 표시합니다.
        - `\Answered` flag는 message에 답장을 보냈음을 표시합니다.
        - `\Flagged` flag는 중요한 message임을 표시합니다.
        - `\Deleted` flag는 삭제 예정인 message를 표시합니다.
        - `\Draft` flag는 임시 저장된 message를 표시합니다.
    - **Custom flag**는 client나 server에서 임의로 정의하여 사용할 수 있습니다.
        - `$Forwarded`, `$MDNSent` 등 확장 기능을 위한 flag입니다.
        - client 간 호환성을 위해 표준화된 custom flag를 사용하는 것이 권장됩니다.

### Search 및 Filtering 기능

- IMAP의 server-side search 기능은 대용량 mailbox에서 효율적인 message 검색을 제공합니다.
    - **SEARCH** command는 다양한 criteria를 조합하여 복합 검색을 수행합니다.
        - DATE, FROM, TO, SUBJECT, BODY 등 message의 모든 부분을 검색 대상으로 할 수 있습니다.
        - AND, OR, NOT 연산자를 사용하여 복잡한 검색 조건을 구성할 수 있습니다.
        - server에서 검색을 수행하므로 network traffic을 최소화합니다.
    - **SORT** extension은 검색 결과를 특정 기준으로 정렬하여 반환합니다.
        - DATE, FROM, SIZE, SUBJECT 등의 기준으로 오름차순/내림차순 정렬이 가능합니다.
        - client-side 정렬보다 효율적이며 일관된 결과를 보장합니다.

## Protocol 비교 및 선택 기준

- email protocol 선택은 사용 환경과 요구사항에 따라 결정해야 합니다.
    - **단일 device 환경**에서는 POP3가 적합합니다.
        - server storage 사용량을 최소화하고 offline access가 완전히 보장됩니다.
        - message backup과 archive 관리를 client에서 직접 수행해야 합니다.
        - 간단한 설정과 낮은 server 부하가 장점입니다.
    - **다중 device 환경**에서는 IMAP가 필수적입니다.
        - 모든 device에서 동일한 mailbox 상태를 확인할 수 있습니다.
        - server에서 중앙화된 message 관리와 backup이 가능합니다.
        - 고급 검색과 filtering 기능을 활용할 수 있습니다.
    - **기업 환경**에서는 IMAP와 함께 추가적인 고려사항이 필요합니다.
        - shared mailbox와 delegation 기능이 중요합니다.
        - compliance와 retention policy 적용을 위한 server-side rule이 필요합니다.
        - high availability와 clustering을 통한 서비스 연속성이 요구됩니다.

### 보안 강화 방안

- 현대 email system에서는 protocol level 보안이 필수적입니다.
    - **Transport 암호화**는 모든 email 통신에서 기본으로 적용되어야 합니다.
        - TLS 1.2 이상의 강력한 암호화 algorithm을 사용합니다.
        - certificate validation을 통해 man-in-the-middle attack을 방지합니다.
        - HSTS(HTTP Strict Transport Security) 정책을 email protocol에도 적용합니다.
    - **Authentication 강화**는 unauthorized access를 방지합니다.
        - OAuth 2.0이나 SASL mechanism을 통한 modern authentication을 구현합니다.
        - two-factor authentication을 email client access에도 적용합니다.
        - app-specific password를 사용하여 main account password 노출을 방지합니다.
    - **Message integrity**는 email 변조와 spoofing을 방지합니다.
        - SPF, DKIM, DMARC 등의 email authentication standard를 구현합니다.
        - S/MIME이나 PGP를 통한 end-to-end encryption을 적용합니다.
        - message header 분석을 통한 phishing 탐지 system을 구축합니다.


























---


## Reference

- <https://ddongwon.tistory.com/77>
