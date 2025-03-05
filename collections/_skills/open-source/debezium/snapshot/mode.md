---
layout: skill
permalink: /146
title: Debezium Snapshot Mode - DB를 복제하는 여러 방식
description: Debezium의 Snapshot Mode를 설정하여 Database의 복제 방식을 지정할 수 있습니다.
date: 2025-02-03
---


## Snapshot Mode로 Database 복제 방식 설정하기

- `snapshot.mode`는 Debezium이 **connector 시작 시 수행할 snapshot의 기준을 지정하는 설정**입니다.
    - snapshot은 database의 구조와 data를 복제하는 작업입니다.
    - snapshot이 완료된 후에는 database의 변경 사항을 stream 형태로 전달합니다.

| Mode | Snapshot 실행 조건 | Schema 복제 | Data 복제 | Stream 처리 |
| 