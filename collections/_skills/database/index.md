---
layout: skill
date: 2024-10-07
title: Database
description: Database는 data를 체계적으로 저장하고 관리하는 system입니다.
---


## Database : Data 저장소

- database는 **data를 체계적으로 저장하고 관리하는 system**입니다.
    - 여러 사용자가 동시에 data를 조회하고 수정할 수 있습니다.
    - data의 무결성과 일관성을 보장합니다.


### Database의 특징

- data 중복을 최소화하여 storage 공간을 효율적으로 사용합니다.
    - 정규화를 통해 data의 중복을 제거합니다.
    - 참조 무결성을 통해 data의 일관성을 유지합니다.

- transaction을 통해 data의 안정성을 보장합니다.
    - **ACID**(Atomicity, Consistency, Isolation, Durability) 속성을 준수합니다.
    - 동시성 제어를 통해 여러 사용자의 동시 접근을 관리합니다.

- backup과 recovery 기능을 제공합니다.
    - data 손실을 방지하기 위한 backup 전략을 수립합니다.
    - system 장애 시 data를 복구할 수 있는 recovery 방안을 마련합니다.


### Database 종류

- **relational database**는 table 형태로 data를 저장하고 관리합니다.
    - Oracle, MySQL, PostgreSQL이 대표적입니다.
    - SQL을 사용하여 data를 조작합니다.

- **NoSQL database**는 비정형 data를 저장하고 관리합니다.
    - MongoDB, Cassandra, Redis가 대표적입니다.
    - 대용량 data 처리에 적합합니다.

- **in-memory database**는 memory에 data를 저장하여 빠른 처리 속도를 제공합니다.
    - Redis, Memcached가 대표적입니다.
    - 캐싱 용도로 많이 사용합니다.


### Database 관리 시스템

- DBMS(Database Management System)는 database를 관리하는 software입니다.
    - data의 저장, 수정, 삭제, 조회 기능을 제공합니다.
    - 보안과 접근 제어 기능을 제공합니다.
    - database 성능 최적화 도구를 제공합니다.
