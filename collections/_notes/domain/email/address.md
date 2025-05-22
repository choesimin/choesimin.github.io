---
published: false
---




## Email Address

- email 주소는 internet 상에서 전자 우편을 주고받기 위한 고유한 식별자입니다.
- 전 세계적으로 표준화된 형식을 따르며, 각 개인이나 조직이 고유한 주소를 가질 수 있습니다.
- email 통신의 기본이 되는 요소로, 발신자와 수신자를 명확하게 구분하는 역할을 합니다.


---


## Email 주소의 기본 구조

- email 주소는 `local@domain` 형태의 구조를 가집니다.
- `@` 기호를 기준으로 local part와 domain part로 나뉘며, 각각 고유한 역할을 담당합니다.


### Local Part

- `@` 기호 앞부분으로, 특정 domain 내에서 개별 사용자나 mailbox를 식별합니다.
- 사용자가 직접 선택할 수 있는 부분으로, 일반적으로 이름이나 nickname을 사용합니다.
- 대소문자를 구분하지 않는 것이 일반적이지만, 일부 system에서는 구분할 수 있습니다.
- 다양한 문자와 기호를 사용할 수 있지만, 실제로는 제한된 문자만 권장됩니다.
    - 영문자, 숫자, 마침표(.), 하이픈(-), 밑줄(_) 등이 일반적으로 사용됩니다.
    - 공백이나 특수 문자는 피하는 것이 좋습니다.


### Domain Part

- `@` 기호 뒷부분으로, email server의 위치를 나타내는 domain name입니다.
- DNS(Domain Name System)를 통해 실제 mail server의 IP 주소로 변환됩니다.
- 일반적으로 회사명, 조직명, 또는 email service provider의 이름을 포함합니다.
- subdomain과 top-level domain으로 구성되어 계층적 구조를 가집니다.
    - 예를 들어, `gmail.com`에서 `gmail`은 subdomain, `com`은 top-level domain입니다.


---


## Email 주소 검증과 유효성

- email 주소의 유효성을 확인하는 것은 system 운영에서 중요한 과정입니다.


### 형식 검증

- email 주소가 올바른 형식을 갖추고 있는지 확인합니다.
- `@` 기호의 존재 여부와 위치를 검사합니다.
- local part와 domain part의 길이와 허용 문자를 검증합니다.
- 정규 표현식(Regular Expression)을 사용하여 자동화된 검증이 가능합니다.


### Domain 검증

- domain part가 실제로 존재하는지 DNS lookup을 통해 확인합니다.
- MX record의 존재 여부를 검사하여 mail server의 설정을 확인합니다.
- domain의 유효성과 mail 수신 가능 여부를 판단합니다.


### 실제 존재 여부 확인

- email 주소가 실제로 사용 가능한지 확인하는 과정입니다.
- verification email을 발송하여 사용자의 응답을 기다립니다.
- click 또는 회신을 통해 실제 사용자임을 확인합니다.
- spam이나 가짜 주소를 걸러내는 효과적인 방법입니다.


---


## Email 주소의 기술적 표준

- email 주소는 여러 국제 표준에 의해 정의되고 관리됩니다.

### RFC 표준

- RFC 5322가 email 주소의 기본 형식을 정의합니다.
- ASCII 문자 집합을 기본으로 하며, 특정 문자의 사용 규칙을 명시합니다.
- local part의 최대 길이는 64자, domain part는 253자로 제한됩니다.
- 전체 email 주소의 길이는 320자를 초과할 수 없습니다.

### 국제화 Domain Name

- IDN(Internationalized Domain Names)을 통해 다국어 domain 사용이 가능합니다.
- Punycode encoding을 사용하여 ASCII가 아닌 문자를 표현합니다.
- 사용자에게는 자국어로 표시되지만, system 내부에서는 ASCII로 변환됩니다.

### SMTP 관련 고려 사항

- SMTP(Simple Mail Transfer Protocol)에서 email 주소를 처리하는 방식을 이해해야 합니다.
- envelope address와 header address의 차이점을 인식합니다.
- mail routing과 delivery 과정에서의 주소 해석 방식을 파악합니다.
























































## 이메일 주소 체계

### 이메일 주소 구조

- local-part(사용자명)과 domain으로 구성됩니다.
- `@` 기호를 기준으로 왼쪽은 local-part, 오른쪽은 domain입니다.
- local-part는 대소문자를 구분할 수 있으나 일반적으로 구분하지 않는 경우가 많습니다.
- domain 부분은 대소문자를 구분하지 않습니다.

### 이메일 주소 규칙

- RFC 5322에 정의된 표준을 따릅니다.
- local-part는 최대 64자, domain은 최대 255자까지 사용할 수 있습니다.
- local-part에는 영문자, 숫자, 특수문자(`.`, `_`, `+`, `-`, `!` 등)를 사용할 수 있습니다.
    - 다만 많은 서비스에서 실제로는 제한된 특수문자만 허용합니다.
- domain 부분은 DNS host 이름 규칙을 따르며 영문자, 숫자, 하이픈(`-`)만 사용할 수 있습니다.

### 특수 주소 형식

- 별칭(alias) 주소: 하나의 실제 mailbox로 연결되는 여러 주소를 설정할 수 있습니다.
- 그룹 주소: 하나의 주소로 여러 수신자에게 메일을 전송할 수 있습니다.
- 지원하는 sub-addressing: Gmail에서는 `username+tag@gmail.com` 형식으로 필터링을 위한 태그를 추가할 수 있습니다.










## email 주소 체계

- email 주소는 **local part**와 **domain part**로 구성되며, `@` 기호로 구분됩니다.
    - local part는 `@` 기호 앞부분으로, 사용자를 식별하는 고유한 이름입니다.
        - 영문자, 숫자, 일부 특수문자를 사용할 수 있습니다.
        - 대소문자를 구분하지 않는 것이 일반적입니다.
        - 길이는 보통 64자 이하로 제한됩니다.
    - domain part는 `@` 기호 뒷부분으로, email server의 주소를 나타냅니다.
        - domain name system(DNS)에 등록된 유효한 domain이어야 합니다.
        - subdomain을 포함할 수 있으며, 점(`.`)으로 구분됩니다.
        - 최상위 domain(TLD)으로 끝나야 합니다.
