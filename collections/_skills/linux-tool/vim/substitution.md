---
layout: skill
permalink: /10
title: Vim에서 문자열 치환하기
description: Vim의 치환 명령어를 사용하여 문자열을 원하는 문자열로 바꿀 수 있습니다.
date: 2025-01-04
---


## Vim 문자열 치환 명령어 : `:s`

```txt
:[range]s/pattern/replacement/[options]
```

- Vim에서 문자열을 치환하는 명령어에는 `s` keyword를 사용합니다.
    - 치환을 의미하는 'substitution'의 약자입니다.

- 기본적으로 `:s/pattern/replacement/[options]`의 형태의 명령어를 사용합니다.
    - `:s/hello/world/g`는 현재 줄의 모든 'hello'를 'world'로 바꿉니다.

- 기본 치환 명령어에 범위를 추가한 `:[range]s/pattern/replacement/[option]` 형태로 치환 범위를 지정할 수 있습니다.
    - `:%s` : 파일 전체 범위에서 치환합니다.
    - `:1,10s` : 1번째 줄부터 10번째 줄까지 치환합니다.
    - `:'<,'>s` : visual mode로 선택한 범위에서 치환합니다.

- 일부 특수 문자를 사용할 때는 back slash(`\`)를 사용합니다.

| 특수 문자 | 의미 |
| 