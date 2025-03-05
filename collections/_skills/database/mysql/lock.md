---
layout: skill
permalink: /151
title: MySQL Lock 조회 및 해제하기
description: MySQL의 process list와 InnoDB transaction을 확인하여 lock을 해제할 수 있습니다.
date: 2023-09-06
---


## 잠금을 조회하고 해제하는 방법

- DB 또는 table lock이 걸렸을 때, 먼저 두 가지 경우를 확인해야 합니다.
    1. **Slow Query** : query가 너무 오래 걸려서 table을 잠그고 있는 경우.
    2. **Transactional Lock** : transaction이 종료되지 않아 table을 계속 잠그고 있는 경우.

- 먼저 process list를 학인하여 slow query가 있는지 확인하고, slow query가 없다면 table lock transaction을 확인합니다.


