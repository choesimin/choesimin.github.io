---
layout: skill
permalink: /123
title: tail - File의 마지막 부분 출력하기
description: tail은 file의 마지막 부분을 출력하는 명령어입니다.
date: 2023-04-03
---


## tail : File의 꼬리

- file의 마지막 행을 기준으로 지정한 행까지의 내용을 출력해주는 명령어입니다.
- 기본 값으로는 마지막 10줄을 출력합니다.
- 주로 `grep` 명령어와 조합해서 실시간으로 갱신되는 file log를 확인할 때 사용합니다.


### 사용법

```sh
tail [option] [file_name]
```

| Option | 설명 |
| 