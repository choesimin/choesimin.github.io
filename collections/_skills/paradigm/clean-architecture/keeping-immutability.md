---
layout: skill
permalink: /13
title: Clean Architecture - 불변성 유지하기
description: 불변성을 유지하면 동시성 문제를 해결할 수 있습니다.
date: 2023-11-16
---


## 불변성을 유지하여 동시성 문제를 해결하기

- **race condition(경합 조건), deadlock(교착 상태), concurrent update(동시 갱신) 문제는 모두 가변 변수로 인해 발생**합니다.
    - 만약 어떠한 변수도 갱신되지 않는다면 application에서 마주치는 모든 동시성 문제는 발생하지 않습니다.

- 따라서 불변성을 유지하는 것이 architecture에 더 이롭습니다.


