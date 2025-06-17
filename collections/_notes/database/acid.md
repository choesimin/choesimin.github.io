---
layout: note
permalink: /337
title: ACID - Atomicity, Consistency, Isolation, Durability
description: ACID는 database transaction의 안전한 수행을 보장하기 위한 네 가지 핵심 특성입니다.
date: 2025-06-17
---


## ACID - Transaction의 핵심 속성

- ACID는 Atomicity, Consistency, Isolation, Durability의 첫 글자를 따서 만든 약어이며, database transaction의 안전성을 보장하기 위한 4가지 핵심 속성입니다.

- 이 속성들은 database system이 data의 무결성과 일관성을 유지하면서 동시성을 제어할 수 있도록 합니다.


---


## Atomicity (원자성)

- 원자성은 **transaction의 모든 operation이 완전히 실행되거나 전혀 실행되지 않아야 한다**는 속성입니다.

- transaction 내의 여러 operation 중 하나라도 실패하면, 전체 transaction이 취소되고 database는 transaction 실행 이전 상태로 복구됩니다.

- "All or Nothing" 원칙이라고도 불리며, data의 부분적 변경을 방지합니다.
    - 예를 들어, 계좌 이체 transaction에서 출금과 입금이 모두 성공하거나 모두 실패해야 합니다.
    - 출금만 성공하고 입금이 실패하는 경우, 출금도 취소되어 원래 상태로 복구됩니다.

- database system은 rollback 기능을 통해 원자성을 보장합니다.


---


## Consistency (일관성)

- 일관성은 **transaction 실행 전후에 database가 항상 유효한 상태를 유지해야 한다**는 속성입니다.

- database에 정의된 모든 제약 조건, 규칙, 관계가 transaction 완료 후에도 만족되어야 합니다.

- 일관성은 business logic과 database schema의 무결성을 보장합니다.
    - 예를 들어, 계좌 잔액이 음수가 될 수 없다는 제약 조건이 있다면, transaction 후에도 이 조건이 유지되어야 합니다.
    - foreign key 관계, unique 제약 조건, check 제약 조건 등이 모두 만족되어야 합니다.

- database system은 제약 조건 검사를 통해 일관성을 보장합니다.


---


## Isolation (격리성)

- 격리성은 **동시에 실행되는 여러 transaction이 서로 간섭하지 않고 독립적으로 실행되어야 한다**는 속성입니다.

- 각 transaction은 다른 transaction의 중간 결과를 볼 수 없으며, 마치 혼자 실행되는 것처럼 동작해야 합니다.

- 격리성은 동시성 제어를 통해 구현되며, 여러 격리 수준이 존재합니다.
    - **Read Uncommitted** : 가장 낮은 격리 수준으로, dirty read가 발생할 수 있습니다.
    - **Read Committed** : committed된 data만 읽을 수 있어 dirty read를 방지합니다.
    - **Repeatable Read** : 동일한 query를 반복 실행해도 같은 결과를 보장합니다.
    - **Serializable** : 가장 높은 격리 수준으로, transaction이 순차적으로 실행되는 것과 같은 결과를 보장합니다.

- lock, timestamp, multiversion concurrency control 등의 기법을 사용합니다.


---


## Durability (지속성)

- 지속성은 **성공적으로 완료된 transaction의 결과가 영구적으로 database에 저장되어야 한다**는 속성입니다.

- system 장애나 전원 차단 등의 문제가 발생해도 commit된 transaction의 변경 사항은 손실되지 않아야 합니다.

- 지속성은 database의 신뢰성을 보장하는 핵심 요소입니다.
    - transaction이 commit된 후에는 해당 변경 사항이 비휘발성 저장 장치에 안전하게 기록됩니다.
    - write-ahead logging(WAL) 기법을 사용하여 변경 사항을 먼저 log에 기록한 후 실제 data를 변경합니다.
    - checkpoint와 recovery 메커니즘을 통해 system 재시작 시 committed transaction을 복구합니다.


---


## ACID 속성의 trade-off

- ACID 속성을 모두 만족하면 database의 안전성은 높아지지만, 성능과 동시성에는 제약이 따릅니다.

- 특히 **격리성을 높이면 동시성이 감소**하고, **지속성을 보장하면 write 성능이 저하**될 수 있습니다.

- 따라서 application의 요구 사항에 따라 적절한 격리 수준을 선택하고 성능을 최적화해야 합니다.
    - OLTP system(Online Transaction Processing)에서는 높은 격리성과 지속성이 중요합니다.
    - 대용량 data 처리나 분석 system에서는 성능을 위해 일부 ACID 속성을 완화하기도 합니다.

- NoSQL database 중 일부는 성능과 확장성을 위해 ACID 속성을 부분적으로 지원하기도 합니다.


---


## Reference

- <https://en.wikipedia.org/wiki/ACID>
- <https://www.ibm.com/docs/en/cics-ts/5.4?topic=processing-acid-properties-transactions>
