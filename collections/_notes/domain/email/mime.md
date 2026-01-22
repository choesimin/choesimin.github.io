---
layout: note
permalink: /408
title: MIME - Multipurpose Internet Mail Extensions
description: MIME은 email에서 text 외에 첨부 file, image, 다국어 문자를 전송할 수 있게 해주는 internet 표준입니다.
date: 2026-01-21
---


## MIME

- **MIME(Multipurpose Internet Mail Extensions)**은 email에서 **다양한 형식의 data를 전송**할 수 있게 해주는 표준입니다.
    - 원래 SMTP는 7-bit ASCII text만 전송할 수 있었습니다.
    - MIME을 통해 첨부 file, image, 한글 등 다양한 content를 email로 전송할 수 있게 되었습니다.

- MIME은 email뿐 아니라 **HTTP에서도 Content-Type header**로 사용됩니다.
    - web에서 `Content-Type: text/html`, `Content-Type: application/json` 등이 모두 MIME type입니다.

```
MIME-Version: 1.0
From: sender@example.com
To: receiver@example.com
Subject: =?UTF-8?B?7YWM7Iqk7Yq4IOuplOydvA==?=
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: base64

7JWI64WV7ZWY7IS47JqULg==
```


### MIME 등장 배경

- MIME 이전에는 **UUEncode(Unix-to-Unix Encoding)**를 사용하여 binary file을 전송했습니다.
    - 1980년에 만들어진 encoding 방식으로, binary data를 ASCII text로 변환합니다.

```
begin 644 hello.txt
#0V%T
`
end
```

- UUEncode는 여러 한계가 있었습니다.
    - file type을 지정하는 표준 방법이 없습니다.
    - 문자 encoding(charset)을 지정할 수 없습니다.
    - 여러 첨부 file을 보내는 표준 구조가 없습니다.
    - 구현마다 호환성 문제가 발생했습니다.

- **MIME(1992년)**은 이러한 UUEncode의 한계를 해결했습니다.
    - `Content-Type`으로 file type을 명시합니다.
    - `charset`으로 문자 encoding을 지정합니다.
    - `multipart`로 여러 content를 구조화합니다.
    - 표준화된 header로 호환성을 확보했습니다.


---


## MIME Header

- MIME은 email header에 추가 field를 정의하여 content 정보를 전달합니다.


### 주요 MIME Header

| Header | 설명 | 예시 |
| --- | --- | --- |
| `MIME-Version` | MIME 버전 | `1.0` |
| `Content-Type` | content의 type과 subtype | `text/plain; charset=utf-8` |
| `Content-Transfer-Encoding` | encoding 방식 | `base64`, `quoted-printable` |
| `Content-Disposition` | content 처리 방식 | `attachment; filename="report.pdf"` |
| `Content-ID` | content 식별자 | `<image001@example.com>` |


### Content-Type 구조

- `Content-Type`은 **type/subtype** 형식으로 구성됩니다.
    - `text/plain` : 일반 text.
    - `text/html` : HTML 문서.
    - `image/png` : PNG image.
    - `application/pdf` : PDF 문서.

- **parameter**를 추가하여 세부 정보를 지정합니다.
    - `text/plain; charset=utf-8` : UTF-8 encoding된 text.
    - `multipart/mixed; boundary="----=_Part_123"` : 여러 part의 구분자 지정.


---


## MIME Type 분류

- MIME type은 **`type/subtype` 형식**이며, type은 대분류를 나타냅니다.
    - `text/plain`, `image/jpeg`, `application/pdf` 등.


### 주요 Type

| Type | 설명 | 예시 |
| --- | --- | --- |
| `text` | 사람이 읽을 수 있는 text | `text/plain`, `text/html`, `text/csv` |
| `image` | image | `image/png`, `image/jpeg`, `image/gif` |
| `audio` | audio | `audio/mpeg`, `audio/wav` |
| `video` | video | `video/mp4`, `video/webm` |
| `application` | binary data, application 전용 | `application/pdf`, `application/json` |
| `multipart` | 여러 content를 포함 | `multipart/mixed`, `multipart/alternative` |


### 자주 사용되는 MIME Type

| MIME Type | 용도 |
| --- | --- |
| `text/plain` | 일반 text |
| `text/html` | HTML email |
| `application/pdf` | PDF 첨부 |
| `application/zip` | ZIP 압축 file |
| `application/octet-stream` | binary file (type 미지정) |
| `image/png` | PNG image |
| `image/jpeg` | JPEG image |


---


## Content-Transfer-Encoding

- email은 원래 7-bit ASCII만 지원하므로, binary data나 다국어 문자는 **encoding**이 필요합니다.


### Encoding 방식

| Encoding | 설명 | 용도 |
| --- | --- | --- |
| `7bit` | encoding 없음, ASCII text 그대로 | 영문 text |
| `8bit` | 8-bit 문자 허용 | 일부 server에서만 지원 |
| `quoted-printable` | 특수 문자만 encoding | 대부분 ASCII인 text (한글 일부 포함) |
| `base64` | binary를 ASCII로 변환 | 첨부 file, image |

- **base64**는 binary data를 ASCII 문자로 변환하며, 원본 대비 약 33% 크기가 증가합니다.
- **quoted-printable**은 `=XX` 형식으로 특수 문자를 표현합니다.


### Base64 Encoding 예시

- 첨부 file은 base64로 encoding되어 email body에 포함됩니다.

```
Content-Type: application/pdf; name="report.pdf"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="report.pdf"

JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIg
MCBSci9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNSAwIFI+Pj4+L01lZGlhQm94
WzAgMCA2MTIgNzkyXS9Db250ZW50cyA0IDAgUj4+CmVuZG9iago...
```


---


## Multipart Message

- **multipart**는 하나의 email에 **여러 content를 포함**할 때 사용합니다.
    - text와 HTML 본문을 함께 보내거나, 첨부 file을 포함할 때 필요합니다.


### Multipart Type

| Type | 용도 |
| --- | --- |
| `multipart/mixed` | 본문 + 첨부 file |
| `multipart/alternative` | 같은 내용의 다른 형식 (text + HTML) |
| `multipart/related` | 본문에서 참조하는 resource (inline image) |
| `multipart/form-data` | HTML form 데이터 (HTTP에서 주로 사용) |


### Multipart 구조

- **boundary**로 각 part를 구분합니다.

```
Content-Type: multipart/mixed; boundary="----=_Part_123"

------=_Part_123
Content-Type: text/plain; charset=utf-8

안녕하세요, 첨부 파일을 보내드립니다.

------=_Part_123
Content-Type: application/pdf; name="report.pdf"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="report.pdf"

JVBERi0xLjQKJeLjz9MK...

------=_Part_123--
```

- `boundary`는 `--`로 시작하고, 마지막 part 뒤에는 `--`로 끝납니다.
    - 시작 : `------=_Part_123`.
    - 끝 : `------=_Part_123--`.


### Alternative Message (Text + HTML)

- `multipart/alternative`는 같은 내용을 여러 형식으로 제공합니다.
    - email client는 지원하는 형식 중 하나를 선택하여 표시합니다.
    - 일반적으로 text를 먼저, HTML을 나중에 배치합니다.

```
Content-Type: multipart/alternative; boundary="----=_Alt_456"

------=_Alt_456
Content-Type: text/plain; charset=utf-8

안녕하세요, 일반 텍스트 버전입니다.

------=_Alt_456
Content-Type: text/html; charset=utf-8

<html><body><h1>안녕하세요</h1><p>HTML 버전입니다.</p></body></html>

------=_Alt_456--
```


---


## Inline Image

- **multipart/related**를 사용하면 HTML 본문에서 image를 참조할 수 있습니다.
    - `Content-ID`로 image를 식별하고, HTML에서 `cid:` scheme으로 참조합니다.

```
Content-Type: multipart/related; boundary="----=_Rel_789"

------=_Rel_789
Content-Type: text/html; charset=utf-8

<html><body>
<p>아래는 로고 이미지입니다.</p>
<img src="cid:logo@example.com">
</body></html>

------=_Rel_789
Content-Type: image/png
Content-Transfer-Encoding: base64
Content-ID: <logo@example.com>
Content-Disposition: inline; filename="logo.png"

iVBORw0KGgoAAAANSUhEUgAA...

------=_Rel_789--
```


---


## 한글 처리

- 한글 등 non-ASCII 문자는 **charset**과 **encoding**을 함께 지정해야 합니다.


### 본문에서 한글

- `Content-Type`에 charset을 명시합니다.

```
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: base64

7JWI64WV7ZWY7IS47JqULCDthYzsiqTtirgg66mU7J28?
```


### Header에서 한글

- header field(`Subject` 등)에 한글을 사용하려면 **RFC 2047 encoding**이 필요합니다.
    - `=?charset?encoding?encoded_text?=` 형식을 사용합니다.

```
Subject: =?UTF-8?B?7ZWc6riAIOygnOuqqQ==?=
```

- `B`는 base64, `Q`는 quoted-printable을 의미합니다.


---


## Reference

- <https://datatracker.ietf.org/doc/html/rfc2045>
- <https://datatracker.ietf.org/doc/html/rfc2046>
- <https://datatracker.ietf.org/doc/html/rfc2047>

