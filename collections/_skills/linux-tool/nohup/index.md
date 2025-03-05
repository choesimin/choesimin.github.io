---
layout: skill
permalink: /127
title: nohup - Background Program 실행시키기
description: nohup은 program을 background에서 실행시키는 명령어입니다.
date: 2023-04-05
---


## `nohup` : No Hang Up

- program을 daemon의 형태로 실행시킵니다.
    - logout으로 session과의 연결이 종료되어도 program이 종료되지 않습니다.


### `nohup` 사용법

```sh
nohup [program_command]
```

- 실행하고자 하는 program 명령어 앞에 `nohup`를 붙이면 됩니다.


