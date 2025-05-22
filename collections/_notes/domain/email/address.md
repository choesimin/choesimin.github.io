---
layout: note
permalink: /329
title: Email 주소 - Internet에서의 개인 식별 주소
description: email 주소는 email을 송수신하기 위해 각 사용자를 고유하게 식별하는 문자열입니다.
date: 2025-05-22
---


## Email Address

```txt
nickname@company.com
```

- email 주소는 internet 상에서 전자 우편을 주고받기 위한 고유한 식별자입니다.
- 전 세계적으로 표준화된 형식을 따르며, 각 개인이나 조직이 고유한 주소를 가질 수 있습니다.
- email 통신의 기본이 되는 요소로, 발신자와 수신자를 명확하게 구분하는 역할을 합니다.


---


## Email 주소의 기본 구조

- email 주소는 `local@domain` 형태의 구조를 가집니다.
- `@` 기호를 기준으로 local part와 domain part로 나뉘며, 각각 고유한 역할을 담당합니다.


### Local Part

- `@` 기호 앞부분으로, **특정 domain 내에서 개별 사용자나 mailbox를 식별**합니다.
- 사용자가 직접 선택할 수 있는 부분으로, 일반적으로 이름이나 nickname을 사용합니다.
- 대소문자를 구분하지 않는 것이 일반적이지만, 일부 system에서는 구분할 수 있습니다.
- 다양한 문자와 기호를 사용할 수 있지만, 실제로는 제한된 문자만 권장됩니다.
    - 영문자, 숫자, 마침표(`.`), hyphen(`-`), 밑줄(`_`) 등이 일반적으로 사용됩니다.
    - 공백이나 특수 문자는 피하는 것이 좋습니다.


### Domain Part

- `@` 기호 뒷부분으로, **email server의 위치를 나타내는 domain name**입니다.
- DNS(Domain Name System)를 통해 실제 mail server의 IP 주소로 변환됩니다.
- 일반적으로 회사명, 조직명, 또는 email service provider의 이름을 포함합니다.
- subdomain과 top-level domain으로 구성되어 계층적 구조를 가집니다.
    - 예를 들어, `gmail.com`에서 `gmail`은 subdomain, `com`은 top-level domain입니다.
- 최상위 domain(TLD)으로 끝나야 합니다.


---


## Email 주소 유효성 검증

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
