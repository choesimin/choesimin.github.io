---
layout: skill
permalink: /135
title: 사용자 접속 상태 표시 System 설계
description: 접속 상태 server를 통해 사용자의 상태를 관리하고, 접속 상태를 표시하는 방법과 접속 장애에 대응하는 방법을 설계합니다.
date: 2024-02-22
---


## 사용자의 접속 상태 표시하기

- 사용자의 접속 상태를 표시하는 것은 SNS 또는 chatting application의 핵심적 기능힙니다.

- 접속 상태 server(presense server)를 통해 사용자의 상태를 관리합니다.
    - 접속 상태 server는 client와 WebSocket으로 통신하는 실시간(real-time) service입니다.


