---
published: false
---


## EML File 형식과 구조

- EML file은 **email message를 저장하는 표준 형식**으로, RFC 822와 RFC 2822 표준을 따르는 plain text 기반의 file 형식입니다.
- 대부분의 email client에서 email을 export하거나 저장할 때 사용하는 형식이며, email의 header 정보와 본문 내용을 모두 포함합니다.
- file 확장자는 `.eml`이며, text editor로도 열어볼 수 있는 human-readable 형식입니다.


---


## EML File의 기본 구조

- EML file은 **header section과 body section**으로 구분되어 있습니다.
- header section에는 email의 metadata 정보가 포함되고, body section에는 실제 email 내용이 들어갑니다.
- header와 body는 빈 줄 하나로 구분됩니다.


### Header Section 구성 요소

- **From** : 발신자의 email address와 이름을 포함합니다.
- **To** : 수신자의 email address와 이름을 포함합니다.
- **Subject** : email의 제목을 나타냅니다.
- **Date** : email이 작성된 날짜와 시간을 RFC 2822 형식으로 표시합니다.
- **Message-ID** : email을 고유하게 식별하는 identifier입니다.
- **Content-Type** : email의 내용 형식을 지정합니다.
    - text/plain, text/html, multipart/mixed 등의 값을 가집니다.
- **MIME-Version** : MIME protocol의 version을 표시합니다.

### Body Section 구성 요소

- **Plain Text Content** : 일반 text 형식의 email 내용입니다.
- **HTML Content** : HTML 형식으로 작성된 email 내용입니다.
- **Attachment** : email에 첨부된 file들이 base64 encoding되어 포함됩니다.
- **Multipart Content** : 여러 형식의 내용이 함께 포함된 경우 boundary로 구분됩니다.


---


## MIME와 Multipart 구조

- EML file은 **MIME(Multipurpose Internet Mail Extensions) 표준**을 사용하여 다양한 형식의 content를 지원합니다.
- multipart message는 여러 부분으로 나뉘어 각각 다른 content type을 가질 수 있습니다.

### Multipart 유형

- **multipart/mixed** : text와 attachment가 함께 포함된 경우 사용됩니다.
- **multipart/alternative** : 같은 내용을 plain text와 HTML 두 형식으로 제공하는 경우 사용됩니다.
- **multipart/related** : HTML content와 관련 image file들이 함께 포함된 경우 사용됩니다.

### Boundary 구분자

- multipart message에서 각 부분을 구분하기 위해 **boundary string**을 사용합니다.
- boundary는 Content-Type header에서 정의되고, message body에서 `--boundary_string` 형태로 사용됩니다.
- 각 part는 고유한 Content-Type과 Content-Transfer-Encoding을 가집니다.


---


## Content Encoding 방식

- EML file에서는 **다양한 encoding 방식**을 사용하여 non-ASCII 문자와 binary data를 처리합니다.
- encoding 방식은 Content-Transfer-Encoding header로 지정됩니다.

### 주요 Encoding 유형

- **7bit** : ASCII 문자만 포함된 plain text에 사용됩니다.
- **8bit** : 확장 ASCII 문자가 포함된 경우 사용됩니다.
- **quoted-printable** : 읽기 가능한 문자가 대부분이면서 일부 non-ASCII 문자가 포함된 경우 사용됩니다.
- **base64** : binary file이나 image, attachment 등을 text로 변환할 때 사용됩니다.

### 문자 집합 처리

- **Character Set**은 Content-Type header의 charset parameter로 지정됩니다.
- UTF-8, ISO-8859-1, EUC-KR 등 다양한 character set을 지원합니다.
- 한국어 email의 경우 주로 UTF-8이나 EUC-KR encoding을 사용합니다.


---


## EML File 처리 방법

- EML file은 **programming 언어별로 다양한 library**를 통해 parsing하고 처리할 수 있습니다.
- email의 header 정보 추출, attachment 분리, content 변환 등의 작업이 가능합니다.

### Python에서의 처리

- **email package**를 사용하여 EML file을 쉽게 parsing할 수 있습니다.
    - `email.message_from_file()` function으로 EML file을 읽습니다.
    - `get()` method로 header 정보를 추출합니다.
    - `walk()` method로 multipart message의 각 part에 접근합니다.
    - `get_payload()` method로 content와 attachment를 추출합니다.

### JavaScript에서의 처리

- **emailjs-mime-parser** 등의 library를 사용하여 browser나 Node.js에서 처리할 수 있습니다.
- parsing 결과는 JSON 형태로 변환되어 web application에서 활용하기 용이합니다.


---


## 실제 활용 사례

- EML file은 **email forensics와 compliance** 목적으로 자주 사용됩니다.
- email backup, migration, archiving system에서 표준 형식으로 채택되고 있습니다.

### Email Client 호환성

- **Microsoft Outlook** : EML file을 직접 열고 저장할 수 있습니다.
- **Thunderbird** : EML file import/export 기능을 제공합니다.
- **Apple Mail** : EML file을 drag & drop으로 import할 수 있습니다.
- **Gmail** : web interface에서는 직접 지원하지 않지만, IMAP를 통해 처리 가능합니다.

### 보안 고려 사항

- EML file에는 **sender의 IP address와 routing 정보**가 포함될 수 있습니다.
- attachment에 malicious code가 포함될 수 있으므로, 신뢰할 수 없는 출처의 EML file은 주의해서 열어야 합니다.
- email header 정보를 통해 발신자의 email server와 전송 경로를 추적할 수 있습니다.


---


## Reference

- <https://tools.ietf.org/html/rfc822>
- <https://tools.ietf.org/html/rfc2822>
- <https://tools.ietf.org/html/rfc2045>