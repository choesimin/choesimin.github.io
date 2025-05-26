---
layout: note
permalink: /330
title: Email Header의 기능, 구성, 분류
description: email header는 email message의 발신자, 수신자, 전송 경로, 날짜, 제목 등 email 처리에 필요한 모든 metadata 정보를 key-value 형태로 담고 있는 영역입니다.
date: 2025-05-22
---


## Email Header

- email header는 email message의 **metadata 정보**를 담고 있는 영역입니다.
    - message의 routing, 전송 경로, 발신자와 수신자 정보, 전송 시간 등 email 처리에 필요한 모든 기술적 정보가 포함됩니다.

- email client에서는 일반적으로 사용자에게 보이지 않지만, email의 전송과 처리 과정에서 핵심적인 역할을 담당합니다.


### Header의 기본 구조

```txt
From: "김철수" <kim.chulsoo@company.com>
To: park.younghee@partner.co.kr, lee.minho@team.com
CC: manager@company.com
BCC: hr@company.com
Reply-To: support@company.com
Subject: [프로젝트 A] 2차 회의 일정 안내
Date: Thu, 22 May 2025 14:30:00 +0900 (KST)
Message-ID: <20250522143000.abc123@company.com>
In-Reply-To: <20250521120000.xyz789@partner.co.kr>
References: <20250520100000.def456@team.com> <20250521120000.xyz789@partner.co.kr>
Return-Path: <bounce@company.com>
Received: from mail.company.com (mail.company.com [192.168.1.100])
   by mx.partner.co.kr (Postfix) with ESMTP id 1A2B3C4D5E
   for <park.younghee@partner.co.kr>; Thu, 22 May 2025 14:30:05 +0900 (KST)
User-Agent: Mozilla/5.0 (compatible; Thunderbird/115.0)
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8
```

- email header는 **field name**과 **field value**로 구성된 key-value 형태의 구조를 가집니다.
- 각 **header field는 새로운 줄로 구분**되며, 줄 바꿈 후 공백이나 tab으로 시작하는 경우 이전 field의 연속으로 해석됩니다.
- header와 message body 사이에는 빈 줄이 하나 위치하여 구분됩니다.
- **RFC 5322 표준**에 따라 정의되며, 각 field는 대소문자를 구분하지 않습니다.
    - RFC 5322는 email message format을 정의하는 IETF의 표준 문서입니다.

#### Header Field 형식

```txt
From: sender@example.com
Subject: 회의 안건 공유
Date: Mon, 22 May 2025 10:30:00 +0900
```

- field name과 field value는 **colon으로 구분**됩니다.
- **field name**은 ASCII 문자로만 구성되며, 공백을 포함할 수 없습니다.
- **field value**에는 UTF-8 encoding된 문자가 포함될 수 있습니다.

#### Header 순서

- header field의 순서는 일반적으로 중요하지 않지만, **관례적인 순서**가 있습니다.
- `Received` field는 가장 위쪽에, `From`, `To`, `Subject` 등은 상단에 위치합니다.
- 같은 이름의 field가 여러 개 있는 경우에는 순서가 의미를 가질 수 있습니다.

#### Header 크기 제한

- 각 header field의 길이는 일반적으로 **998자**를 초과하지 않아야 합니다.
- 전체 header 크기도 server별로 제한이 있을 수 있습니다.
- 긴 내용은 folding을 사용하여 여러 줄로 나누어 표현합니다.


---


## Email Header 분류

| 분류 | Field | 이름 | 설명 |
| --- | --- | --- | --- |
| **수신자 정보** | **From** | 발신자 | email을 보낸 사람의 주소 |
|  | **To** | 수신자 | email을 받을 사람의 주소 |
|  | **CC** | 참조 수신자 | email을 참조로 받는 사람의 주소 |
|  | **BCC** | 숨은 참조 수신자 | email을 숨은 참조로 받는 사람의 주소 |
|  | **Reply-To** | 답장 주소 | 답장을 받을 주소 (From과 다를 수 있음) |
|  | **Sender** | 실제 발송자 | 실제로 email을 발송한 주소 (From과 다를 수 있음) |
| **Message 정보** | **Subject** | 제목 | email의 주제를 나타내는 제목 |
|  | **Date** | 날짜 | email이 발송된 날짜와 시간 |
|  | **Message-ID** | Message ID | email의 고유 식별자 |
|  | **References** | 참조 ID | thread 연결을 위한 이전 message들의 ID |
|  | **In-Reply-To** | 답장 대상 ID | 직접 답장하는 message의 ID |
| **전송 정보** | **Return-Path** | 반송 주소 | email이 반송될 경우 돌아오는 주소 |
|  | **Received** | 수신 경로 | email이 거친 server 정보 |
|  | **User-Agent** | User Agent | email client 정보 |
| **Content 정보** | **MIME-Version** | MIME Version | MIME 표준의 version 번호 |
|  | **Content-Type** | 내용 형식 | email content의 형식 (Text, HTML 등) |


### 수신자 정보

- 수신자 정보는 **email의 발송과 수신에 관련된 주체들을 명시**하는 field들입니다.

#### 기본 수신자 : `From`, `To`

- **`From` field**는 발신자의 신원과 연락처를 명시합니다.
    - 실제 email 주소와 함께 발신자의 이름을 표시할 수 있습니다.
    - `"홍길동" <hong@example.com>` 형식으로 친근한 이름과 기술적 주소를 결합합니다.
    - 발신자 인증과 spam 방지를 위한 중요한 검증 대상입니다.
        - 발신자가 실제로 존재하는지, domain이 정상적인지 확인하여 spam 여부를 판단할 수 있습니다.

- **`To` field**는 주요 수신자의 email 주소를 지정합니다.
    - email의 주된 대상이 되는 사람들의 목록입니다.
    - 여러 명의 수신자를 쉼표로 구분하여 동시에 지정할 수 있습니다.
    - 모든 수신자가 서로의 email 주소를 볼 수 있습니다.
    - 주요 action이나 응답을 기대하는 대상자들을 포함합니다.

#### 참조 수신자 : `CC`, `BCC`

- **`CC`(Carbon Copy) field**는 참조용으로 email을 받는 수신자를 지정합니다.
    - 직접적인 action은 필요하지 않지만 내용을 알아야 하는 사람들을 포함합니다.
    - 모든 수신자가 `CC` 목록을 볼 수 있어 투명한 communication이 가능합니다.
    - team 협업이나 상급자 보고 시 자주 활용됩니다.
    - `To` field 수신자와 동일한 email 내용을 받습니다.

- **`BCC`(Blind Carbon Copy) field**는 숨은 참조 수신자를 지정합니다.
    - 다른 모든 수신자에게는 `BCC` 목록이 보이지 않아 개인 정보를 보호합니다.
    - 대량 발송 시 수신자 목록을 숨기거나 비밀리에 정보를 공유할 때 사용됩니다.
    - privacy 보호와 공식적인 communication에 중요한 기능입니다.
    - newsletter나 marketing email에서 개인 정보 보호를 위해 필수적으로 사용됩니다.

#### 특수 수신자 : `Reply-To`, `Sender`

- **`Reply-To` field**는 답장을 받을 주소를 별도로 지정합니다.
    - `From` field와 다른 주소로 답장을 받고 싶을 때 사용합니다.
    - `noreply@company.com`으로 발송하고 `support@company.com`으로 답장 받는 경우에 활용됩니다.
    - newsletter나 marketing email에서 피드백을 별도 부서로 받을 때 유용합니다.
    - 개인 email을 회사 계정으로 발송하면서 답장은 개인 계정으로 받고 싶을 때 사용됩니다.

- **`Sender` field**는 실제로 email을 발송한 주체를 명시합니다.
    - `From` field와 다를 수 있으며, 대리 발송 시 실제 발송자를 구분하기 위해 사용됩니다.
    - mailing list나 대량 발송 service에서 실제 발송 system을 표시할 때 활용됩니다.
    - email 인증과 spam 방지를 위한 추가적인 검증 요소로 사용됩니다.
        - `From` field와 일치하지 않을 경우 의심스러운 email일 가능성을 확인해야 합니다.


### Message 정보

- Message 정보는 **email의 식별과 관리에 필요한 metadata**를 제공합니다.

#### 식별 정보 : `Subject`, `Date`, `Message-ID`

- **`Subject` field**는 email의 주제와 내용을 요약합니다.
    - 수신자가 email의 중요도와 긴급성을 판단하는 첫 번째 기준입니다.
    - 명확하고 구체적인 제목이 email 처리 효율성을 높입니다.
    - spam filter가 email을 분류하는 중요한 판단 기준 중 하나입니다.
    - 검색과 정리를 위한 핵심 keyword 역할을 합니다.

- **`Date` field**는 email이 작성되고 발송된 정확한 시간을 기록합니다.
    - time zone 정보를 포함하여, 전 세계 어디서든 정확한 시간 파악이 가능합니다.
    - email의 시간순 정렬과 관리에 필수적인 정보입니다.
    - 법적 증거나 business record로 활용 시 중요한 timestamp 역할을 합니다.

- **`Message-ID` field**는 각 email의 고유한 식별자를 제공합니다.
    - 전 세계에서 유일한 값으로, email을 구별할 수 있게 합니다.
    - 중복 제거, thread 관리, 응답 연결에 사용됩니다.
    - email server 간 동기화와 중복 방지에 핵심적인 역할을 합니다.
    - 기술적 문제 해결과 email 추적에 활용됩니다.
    - `1234567890@example.com` 형식으로 표시되며, 중복되거나 이상한 형식일 경우 의심할 필요가 있습니다.

#### Thread 관리 : `References`, `In-Reply-To`

- **`References` field**는 email thread의 연결 정보를 관리합니다.
    - 답장이나 전달 시 이전 message들의 `Message-ID`를 포함합니다.
    - email client가 관련된 message들을 하나의 conversation으로 묶어서 표시할 수 있게 합니다.
    - 긴 대화의 맥락을 추적하고 관련 message를 쉽게 찾을 수 있게 도와줍니다.
    - mailing list나 forum에서 topic별 thread 관리에 필수적입니다.

- **`In-Reply-To` field**는 직접 답장하는 message의 `Message-ID`를 명시합니다.
    - 바로 직전에 받은 email의 `Message-ID`를 하나만 포함합니다.
    - `References`가 전체 thread의 history를 담는 반면, `In-Reply-To`는 직접적인 답장 관계만 표시합니다.
    - email client가 답장 관계를 명확하게 파악하고 표시하는 데 사용됩니다.
    - thread의 분기점이나 복잡한 대화 구조를 이해하는 데 도움이 됩니다.


### 전송 정보

- 전송 정보는 email의 **delivery 과정**과 **기술적 처리**에 관련된 정보를 담습니다.

#### 경로 및 반송 : `Return-Path`, `Received`

- **`Return-Path` field**는 delivery 실패 시 반송될 주소를 지정합니다.
    - bounce message나 delivery failure notification이 전송될 목적지입니다.
    - `From` field와 다를 수 있어 기술적 관리와 실제 발신자를 분리할 수 있습니다.
    - email service provider가 delivery 상태를 monitoring하는 데 사용됩니다.
    - 대량 발송 시 반송 처리를 자동화하는 데 필요합니다.
    - `From` field의 주소와 일치하지 않을 경우 spam일 가능성을 의심해볼 수 있습니다.

- **`Received` field**는 email이 거쳐온 server들의 경로 정보를 기록합니다.
    - email이 전송되는 동안 거친 모든 mail server의 정보가 순서대로 저장됩니다.
    - 각 server는 자신의 정보와 처리 시간을 `Received` field에 추가합니다.
    - email의 전송 경로를 추적하고 delivery 문제를 진단하는 데 사용됩니다.
    - spam 탐지와 email 보안 분석에서 중요한 판단 자료가 됩니다.
    - 각 server의 IP 주소와 domain을 확인하여 정상적인 server인지 검증할 수 있습니다.

#### Client 정보 : `User-Agent`

- **`User-Agent` field**는 email을 작성한 client program의 정보를 표시합니다.
    - 사용된 email client의 이름과 version 정보를 포함합니다.
    - email의 호환성 문제나 formatting 이슈 해결에 도움이 됩니다.
    - 기술 지원이나 문제 해결 시, 유용한 참조 정보를 제공합니다.
    - email client의 특성에 따른 기능 차이를 이해하는 데 활용됩니다.


### Content 정보

- Content 정보는 **email body의 형식과 encoding**에 관한 기술적 정보를 제공합니다.

#### 형식 정보 : `MIME-Version`, `Content-Type`

- **`MIME-Version` field**는 사용된 MIME 표준의 version을 명시합니다.
    - 현재 대부분의 email에서 `MIME-Version: 1.0`이 사용됩니다.
    - email에 첨부 file이나 multimedia content가 포함될 때 필수적입니다.
    - email client가 message를 올바르게 해석하기 위한 기준 정보를 제공합니다.
    - text만 포함된 간단한 email에서도 호환성을 위해 포함되는 경우가 많습니다.

- **`Content-Type` field**는 email body의 형식과 encoding 정보를 지정합니다.
    - `text/plain`은 일반 text 형식을 나타내며 가장 기본적인 content type입니다.
    - `text/html`은 HTML 형식으로 formatting과 multimedia 요소를 지원합니다.
    - `charset` parameter를 통해 문자 encoding 방식을 명시합니다.
    - multipart message에서는 각 부분의 content type을 개별적으로 지정할 수 있습니다.
