---
layout: skill
permalink: /120
title: crontab - Linux Task Scheduler
description: crontab은 Linux에 기본 program으로 설치되어 있는 task scheduler입니다.
date: 2023-09-23
---


## `crontab` : Task Scheduler로 주기적인 작업 관리하기

- crontab은 Linux에 기본 program으로 설치되어 있는 작업 Scheduler입니다.

- crontab으로 작업을 주기적으로 실행하도록 할 수 있습니다.
    - 예를 들어, '매일 1시에 이 작업을 실행하라.', '10분마다 이 script를 실행하라.'

- 사용자는 작업을 등록하고, crontab은 작업을 실행합니다.
    - 따라서 사용자는 작업을 관리하는 script file을 작성하기만 합니다.


### 사용법

```sh
crontab [option]
```


### Option

| Option | 설명 |
| 