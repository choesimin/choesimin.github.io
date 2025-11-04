---
layout: note
permalink: /309
title: Database Lock - Data 잠그기
description: database는 transaction 간의 간접을 제어하기 위해 lock mechanism을 사용합니다.
date: 2025-04-10
---


## Database Lock : Transaction 처리의 순차성을 보장하기 위한 방법

- DB lock은 user 다수의 동시 접근 상황에서 data 일관성과 무결성을 보장하기 위한 핵심 mechanism입니다.
- transaction 간 간섭을 제어하여 ACID 특성 중 isolation을 구현합니다.
- 적절한 lock 전략 선택은 성능과 data 무결성 사이의 균형을 유지하는 데 중요합니다.


### Lock의 필요성

- DBMS는 다수의 transaction이 동시에 data에 접근할 수 있도록 설계되었습니다.
- 그러나 동시에 여러 transaction이 data를 수정하면 data 일관성이 깨질 수 있습니다.
- 이를 방지하기 위해 DBMS는 lock을 사용하여 transaction 간의 data 접근을 제어합니다.

- lock은 특정 data에 대한 접근을 제한하여 transaction 간의 간섭을 방지합니다.
    - transaction은 lock을 통해 data를 안전하게 읽고 쓸 수 있습니다.
    - lock은 transaction이 완료될 때까지 유지되며, transaction이 commit되면 lock이 해제됩니다.


---


## 잠금 수준에 따른 분류

- database lock은 잠금 수준에 따라 공유 잠금(shared lock)과 배타 잠금(exclusive lock)으로 나뉩니다.


### Shared Lock(S-Lock)

- 읽기 잠금(read lock)이라고도 불리며, 동시에 여러 transaction이 획득할 수 있습니다.
- data를 읽을 때 사용하는 lock으로 다른 transaction의 읽기는 허용합니다.
- 다른 transaction의 쓰기 작업은 차단하여 읽는 동안 data 변경을 방지합니다.
- SELECT 문 실행 시 기본적으로 적용됩니다.


### Exclusive Lock(X-Lock)

- 쓰기 잠금(write lock)이라고도 하며, 한 번에 하나의 transaction만 획득할 수 있습니다.
- data 변경(INSERT, UPDATE, DELETE) 작업 시 사용합니다.
- 다른 transaction의 read와 write 모두를 차단합니다.
- data 일관성과 무결성을 보장하는 가장 강력한 lock 형태입니다.


---


## Lock 범위에 따른 분류

- database lock은 범위에 따라 row-level lock, page-level lock, table-level lock 등으로 나눌 수 있습니다.


### Row-level Lock

- 개별 data row에 lock을 적용합니다.
- 다른 row에 대한 접근은 제한하지 않아 동시성이 높습니다.
- 세밀한 lock 관리로 data 접근 경합을 최소화합니다.
- Oracle, PostgreSQL, MySQL(InnoDB) 등에서 지원합니다.


### Page-level Lock

- database page 단위로 lock을 적용합니다.
    - page는 일반적으로 여러 row를 포함하는 물리적 storage 단위입니다.
- row-level lock보다 관리 overhead가 적지만, 불필요한 경합이 발생할 수 있습니다.
- Microsoft SQL Server에서 사용했던 방식입니다.
    - 현재는 row-level lock 지원.


### Table-level Lock

- table 전체에 lock을 적용합니다.
- 구현이 단순하지만 동시성이 크게 저하됩니다.
- 전체 table scan이나 대규모 data 변경 작업에 유용합니다.
- 모든 DBMS에서 지원하며, MySQL의 MyISAM과 같은 engine에서 주로 사용합니다.


### Database-level Lock

- database 전체에 대한 lock을 설정합니다.
- 주로 schema 변경이나 database backup 작업에 사용됩니다.
- 모든 data 접근을 차단하므로 매우 제한적인 상황에서만 사용합니다.


---


## 특수 목적 Lock

- 특수 목적 잠금은 특정 상황이나 목적에 맞춰 설계된 lock입니다.


### Intent Lock

- 상위 level에 하위 level의 lock 의도를 표시하는 lock입니다.
    - 예를 들어, 상위 level이 table lock, 하위 level이 row lock이라면, intent lock은 table lock을 획득하기 전에 row lock을 획득하겠다는 의도를 나타냅니다.
- 계층적 lock 구조에서 lock 호환성 검사를 효율화합니다.
- Intent Shared(IS), Intent Exclusive(IX), Shared Intent Exclusive(SIX) 등 여러 유형이 있습니다.


### Update Lock

- read 후 write가 예상되는 상황에서 사용합니다.
- 초기에는 shared lock처럼 동작하지만, 필요시 exclusive lock으로 쉽게 upgrade됩니다.
- deadlock 가능성을 줄이는 데 도움이 됩니다.


### Schema Lock

- table schema 변경 시 사용됩니다.
- DDL(Data Definition Language) 명령어 실행 시 적용됩니다.
- 일반적으로 높은 수준의 제한을 가지며 다른 접근을 차단합니다.


### Predicate Lock

- 특정 조건(predicate)에 부합하는 data에 대한 lock입니다.
- phantom read 문제를 해결하기 위해 도입되었습니다.
- 실제 구현은 복잡하여 많은 DBMS에서는 index lock이나 range lock으로 대체합니다.


---


## Lock 기법

- lock 기법은 DBMS에서 transaction 간 data 접근을 제어하는 구체적인 방법입니다.


### Optimistic Lock

- 충돌이 드물다고 가정하고, 실제 update 시점에만 충돌을 감지합니다.
- 일반적으로 version 번호나 timestamp를 사용하여 구현합니다.
- 높은 동시성을 제공하지만, 충돌 시 transaction을 재시도해야 합니다.
- 읽기 작업이 많고 쓰기 충돌이 적은 환경에 적합합니다.


### Pessimistic Lock

- 항상 충돌이 발생할 것으로 가정하고 사전에 lock을 획득합니다.
- 전통적인 DBMS에서 사용하는 기본적인 lock 방식입니다.
- 충돌 가능성이 높은 환경에서 data 일관성을 보장합니다.
- 동시성이 저하될 수 있지만 transaction 충돌로 인한 재시도가 없습니다.


---


## Lock 관련 문제

- lock 관련 문제는 DBMS의 성능과 안정성에 큰 영향을 미칩니다.


### Deadlock

- 두 개 이상의 transaction이 서로가 보유한 lock을 기다리는 상황입니다.
- DBMS는 deadlock detection, prevention, timeout 등의 방법으로 해결합니다.
- 발생 시 일부 transaction을 강제 종료(rollback)하는 방식으로 해소합니다.


### Lock Escalation

- 다수의 작은 lock이 더 큰 단위의 lock으로 확장되는 현상입니다.
    - 예를 들어, row-level lock(작은 lock)이 너무 많아지면 DBMS가 이를 table-level lock(더 큰 단위의 lock)으로 변경합니다.
- system 내 lock 관리 overhead를 줄이기 위해 DBMS가 자동으로 수행합니다.
- 동시성이 저하될 수 있으나 resource 사용 효율성은 높아집니다.


### Blocking

- 한 transaction이 보유한 lock으로 인해 다른 transaction이 대기하는 상황입니다.
- 장시간 blocking은 system 성능을 심각하게 저하시킬 수 있습니다.
- 적절한 transaction 설계와 lock timeout 설정으로 관리합니다.


---


## DBMS별 Lock 특성

- DBMS에 따라 lock 처리 방식과 전략이 다릅니다.


### Oracle

- row-level lock을 기본으로 사용합니다.
- MVCC(Multi-Version Concurrency Control)를 통해 읽기 작업에 lock이 불필요합니다.
- SELECT FOR UPDATE 구문으로 명시적 row lock을 지원합니다.


### MySQL

- storage engine에 따라 lock 방식이 다릅니다.
    - InnoDB : row-level lock과 MVCC 지원.
    - MyISAM : table-level lock만 지원.
- transaction 격리 수준에 따라 lock 전략이 달라집니다.


### PostgreSQL

- row-level lock과 MVCC를 지원합니다.
- 명시적 lock 명령어(LOCK TABLE)와 FOR UPDATE 등 다양한 lock option을 제공합니다.
- 자동 deadlock 감지 기능을 갖추고 있습니다.


### SQL Server

- row-level, page-level, table-level lock을 상황에 따라 사용합니다.
- lock hint를 통해 lock 동작을 세밀하게 제어할 수 있습니다.
- lock escalation 임계값 조정이 가능합니다.


---


## Reference

- <https://velog.io/@koo8624/Database-데이터베이스-락Lock의-종류와-역할>
