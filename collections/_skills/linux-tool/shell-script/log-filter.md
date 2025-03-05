---
layout: skill
permalink: /195
title: Linux에서 Log Filter 만들기
description: log file에서 keyword를 간편하게 검색할 수 있는 log filter script를 작성합니다.
date: 2024-05-18
---


## Log에서 Keyword를 간편하게 검색하기

- 오류 조치, 장애 대응, CS 처리 등의 운영 업무를 진행할 때 **운영 server의 log 확인**이 필요한 경우가 많습니다.
- 단순히 `grep` 명령어를 사용하여 file 내의 내용을 검색할 수 있지만, 한 project를 **여러 server**에서 운영하거나 대상의 **정확한 시간을 알 수 없는 경우**에는 확인하는 데에 시간이 오래 걸리게 됩니다.
- log 확인은 **규칙적이고 반복적인 업무**이기 때문에, **지정한 날짜의 log file을 대상으로 검색 keyword가 포함된 내용을 출력**해주는 program으로 정의할 수 있습니다.


