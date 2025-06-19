---
layout: note
permalink: /339
title: EML File - Email Message 저장 표준 형식
description: EML file은 email message를 저장하는 표준 형식으로, RFC 표준을 따르는 plain text 기반의 file 형식입니다.
date: 2025-06-19
---


## EML File 개요

- EML file은 **email message를 저장하는 표준 형식**으로, RFC 822와 RFC 2822 표준을 따르는 plain text 기반의 file 형식입니다.
- 대부분의 email client에서 email을 export하거나 저장할 때 사용하는 형식이며, email의 header 정보와 본문 내용을 모두 포함합니다.
- file 확장자는 `.eml`이며, text editor로도 열어볼 수 있는 human-readable 형식입니다.
- MIME(Multipurpose Internet Mail Extensions) 표준을 지원하여 다양한 content type과 encoding을 처리할 수 있습니다.


---


## EML File 구조

- EML file은 **header section과 body section**으로 구분되어 있습니다.
- header section에는 email의 metadata 정보가 포함되고, body section에는 실제 email 내용이 들어갑니다.
- header와 body는 빈 줄 하나로 구분됩니다.
- 각 section은 특정한 규칙과 형식을 따라 구성됩니다.


### Header Section

- header section은 email의 metadata를 포함하는 영역입니다.
- 각 header field는 name과 value로 구성되며, colon(`:`)으로 구분합니다.
- 긴 header 값은 여러 줄에 걸쳐 작성할 수 있으며, 다음 줄은 공백이나 tab으로 시작합니다.
- 주요 header field는 email의 발송자, 수신자, 제목, 날짜 등을 나타냅니다.
    - **From** : 발신자의 email address와 이름을 포함합니다.
    - **To** : 수신자의 email address와 이름을 포함합니다.
    - **Subject** : email의 제목을 나타냅니다.
    - **Date** : email이 작성된 날짜와 시간을 RFC 2822 형식으로 표시합니다.
    - **Message-ID** : email을 고유하게 식별하는 identifier입니다.
    - **Content-Type** : email의 내용 형식을 지정합니다.
    - **MIME-Version** : MIME protocol의 version을 표시합니다.


### Body Section

- body section은 실제 email content가 포함되는 영역입니다.
- content type에 따라 plain text, HTML, 또는 multipart 형식으로 구성됩니다.
- multipart인 경우 boundary string으로 각 part를 구분합니다.
- 첨부 file은 base64 encoding되어 body section에 포함됩니다.
    - **Plain Text Content** : 일반 text 형식의 email 내용입니다.
    - **HTML Content** : HTML 형식으로 작성된 email 내용입니다.
    - **Attachment** : email에 첨부된 file들이 base64 encoding되어 포함됩니다.
    - **Multipart Content** : 여러 형식의 내용이 함께 포함된 경우 boundary로 구분됩니다.


---


## MIME 및 Multipart 처리

- EML file은 **MIME(Multipurpose Internet Mail Extensions) 표준**을 사용하여 다양한 형식의 content를 지원합니다.
- multipart message는 여러 부분으로 나뉘어 각각 다른 content type을 가질 수 있습니다.
- MIME을 통해 text, image, audio, video, application file 등 다양한 형식의 data를 email에 포함할 수 있습니다.
- 각 part는 독립적인 header와 content를 가지며, 전체 message 내에서 구조적으로 조직됩니다.


### Multipart Type

- multipart type은 email이 여러 부분으로 구성될 때 각 부분의 관계를 정의합니다.
- Content-Type header의 multipart 값을 통해 어떤 방식으로 part를 해석해야 하는지 결정됩니다.
- client는 multipart type에 따라 적절한 rendering 방식을 선택합니다.
    - **multipart/mixed** : text와 attachment가 함께 포함된 경우 사용됩니다.
    - **multipart/alternative** : 같은 내용을 plain text와 HTML 두 형식으로 제공하는 경우 사용됩니다.
    - **multipart/related** : HTML content와 관련 image file들이 함께 포함된 경우 사용됩니다.


### Boundary 구분 방식

- multipart message에서 각 부분을 구분하기 위해 **boundary string**을 사용합니다.
- boundary는 Content-Type header에서 정의되고, message body에서 `--boundary_string` 형태로 사용됩니다.
- 각 part는 고유한 Content-Type과 Content-Transfer-Encoding을 가집니다.
- boundary string은 message 내용에서 중복되지 않는 고유한 문자열이어야 합니다.


---


## Content Encoding 처리

- EML file에서는 **다양한 encoding 방식**을 사용하여 non-ASCII 문자와 binary data를 처리합니다.
- encoding 방식은 Content-Transfer-Encoding header로 지정됩니다.
- 적절한 encoding을 선택하여 data의 무결성을 보장하고 전송 효율성을 높입니다.
- email system의 제약 사항을 고려하여 7bit safe한 형태로 변환합니다.


### Transfer Encoding Type

- transfer encoding은 email content를 안전하게 전송하기 위한 변환 방식을 정의합니다.
- 각 encoding 방식은 특정한 data type과 용도에 최적화되어 있습니다.
- email server와 client 간의 호환성을 위해 표준화된 encoding을 사용합니다.
    - **7bit** : ASCII 문자만 포함된 plain text에 사용됩니다.
    - **8bit** : 확장 ASCII 문자가 포함된 경우 사용됩니다.
    - **quoted-printable** : 읽기 가능한 문자가 대부분이면서 일부 non-ASCII 문자가 포함된 경우 사용됩니다.
    - **base64** : binary file이나 image, attachment 등을 text로 변환할 때 사용됩니다.


### Character Set 지원

- **Character Set**은 Content-Type header의 charset parameter로 지정됩니다.
- UTF-8, ISO-8859-1, EUC-KR 등 다양한 character set을 지원합니다.
- 한국어 email의 경우 주로 UTF-8이나 EUC-KR encoding을 사용합니다.
- charset 정보가 없는 경우 ASCII로 해석되므로, 정확한 charset 지정이 중요합니다.


---


## Programming 언어별 처리 방법

- EML file은 **programming 언어별로 다양한 library**를 통해 parsing하고 처리할 수 있습니다.
- email의 header 정보 추출, attachment 분리, content 변환 등의 작업이 가능합니다.
- 각 언어마다 EML parsing에 특화된 library가 제공되어 개발 효율성을 높입니다.
- parsing 결과는 구조화된 object 형태로 반환되어 application에서 활용하기 용이합니다.


### Python 환경에서의 처리

- **email package**를 사용하여 EML file을 쉽게 parsing할 수 있습니다.
- Python의 표준 library이므로 별도 설치 없이 바로 사용할 수 있습니다.
- email object를 통해 header와 body에 대한 다양한 조작이 가능합니다.
    - `email.message_from_file()` function으로 EML file을 읽습니다.
    - `get()` method로 header 정보를 추출합니다.
    - `walk()` method로 multipart message의 각 part에 접근합니다.
    - `get_payload()` method로 content와 attachment를 추출합니다.


### JavaScript 환경에서의 처리

- **emailjs-mime-parser** 등의 library를 사용하여 browser나 Node.js에서 처리할 수 있습니다.
- parsing 결과는 JSON 형태로 변환되어 web application에서 활용하기 용이합니다.
- client-side에서 EML file을 처리할 수 있어 실시간 email parsing이 가능합니다.
- REST API와 연동하여 server-side processing과 결합할 수 있습니다.


---


## 활용 분야 및 호환성

- EML file은 **email forensics와 compliance** 목적으로 자주 사용됩니다.
- email backup, migration, archiving system에서 표준 형식으로 채택되고 있습니다.
- 법적 증거 수집, audit trail 생성, data 보존 정책 준수 등에 활용됩니다.
- 다양한 email client와 system 간의 상호 운용성을 제공합니다.


### Email Client 지원 현황

- 주요 email client들은 EML file format을 표준으로 지원합니다.
- import/export 기능을 통해 email data를 손쉽게 이관할 수 있습니다.
- client별로 지원 범위와 방식에 차이가 있으므로 확인이 필요합니다.
    - **Microsoft Outlook** : EML file을 직접 열고 저장할 수 있습니다.
    - **Thunderbird** : EML file import/export 기능을 제공합니다.
    - **Apple Mail** : EML file을 drag & drop으로 import할 수 있습니다.
    - **Gmail** : web interface에서는 직접 지원하지 않지만, IMAP를 통해 처리 가능합니다.


### 보안 고려 사항

- EML file에는 **sender의 IP address와 routing 정보**가 포함될 수 있습니다.
- attachment에 malicious code가 포함될 수 있으므로, 신뢰할 수 없는 출처의 EML file은 주의해서 열어야 합니다.
- email header 정보를 통해 발신자의 email server와 전송 경로를 추적할 수 있습니다.
- parsing 과정에서 buffer overflow나 injection 공격을 방지하기 위한 validation이 필요합니다.


---


## Reference

- <https://tools.ietf.org/html/rfc822>
- <https://tools.ietf.org/html/rfc2822>
- <https://tools.ietf.org/html/rfc2045>