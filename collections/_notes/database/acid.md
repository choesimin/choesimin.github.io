---
layout: note
permalink: /337
title: ACID - Database Transaction의 핵심 특성
description: ACID는 database transaction의 안전한 수행을 보장하기 위한 네 가지 핵심 특성입니다.
date: 2025-06-17
---


## ACID : Atomicity, Consistency, Isolation, Durability

- ACID는 **Atomicity**(원자성), **Consistency**(일관성), **Isolation**(독립성), **Durability**(지속성)의 첫 글자를 따서 만든 약어입니다.
- 은행 계좌 이체처럼 여러 단계로 구성된 작업을 하나의 논리적 단위로 처리할 때 반드시 지켜져야 하는 원칙입니다.


---


## Atomicity : 원자성

- transaction과 관련된 모든 작업이 완전히 수행되거나 전혀 수행되지 않음을 보장하는 특성입니다.
- 물리학의 원자처럼 더 이상 분해할 수 없는 최소 단위로 동작합니다.
- **All or Nothing** 원칙에 따라 성공 또는 실패만 존재합니다.
    - 모든 연산이 정상적으로 완료되면 transaction이 commit됩니다.
    - 하나라도 실패하면 전체 transaction이 rollback되어 원래 상태로 돌아갑니다.
- 중간 단계에서 실행이 중단되더라도 부분적으로 적용된 변경 사항은 모두 취소됩니다.
    - 계좌 이체 중 송금자 계좌에서 금액이 차감된 후 수취인 계좌 입금이 실패하면, 송금자 계좌도 원래 상태로 복구됩니다.


---


## Consistency : 일관성

- transaction 실행 전후에 database가 항상 유효한 상태를 유지하도록 보장하는 특성입니다.
- database에 정의된 모든 제약 조건과 규칙을 위반하지 않습니다.
- 무결성 제약 조건을 만족하지 않는 transaction은 실행되지 않습니다.
    - 계좌 잔고가 음수가 될 수 없다는 제약이 있다면, 잔고 부족 시 이체 transaction이 거부됩니다.
- 참조 무결성, domain 무결성 등 database의 모든 제약 사항을 준수합니다.


---


## Isolation : 독립성

- 동시에 실행되는 여러 transaction이 서로 간섭하지 않도록 보장하는 특성입니다.
- 각 transaction은 다른 transaction의 중간 결과를 볼 수 없습니다.
- 동시성 제어를 통해 여러 사용자가 같은 data에 접근할 때 발생할 수 있는 문제를 방지합니다.
    - Dirty Read, Non-repeatable Read, Phantom Read 등의 문제를 해결합니다.
- 성능과 일관성 사이의 균형을 맞추기 위해 격리 수준을 조정할 수 있습니다.
    - Read Uncommitted, Read Committed, Repeatable Read, Serializable 등 네 가지 격리 수준이 있습니다.


---


## Durability : 지속성

- 성공적으로 완료된 transaction의 결과가 영구적으로 저장됨을 보장하는 특성입니다.
- system 장애가 발생하더라도 commit된 transaction의 변경 사항은 유지됩니다.
- database log file에 모든 변경 사항을 기록하여 복구 가능성을 보장합니다.
    - transaction은 log에 완전히 기록된 후에만 commit 상태로 간주됩니다.
- power fail(전원 장애), system crash, hardware 오류 등 예기치 못한 상황에서도 data 손실을 방지합니다.
- database 일관성 검사나 system 점검 후에도 commit된 변경 사항은 그대로 유지됩니다.


---


## Reference

- <https://ko.wikipedia.org/wiki/ACID>
- <https://covenant.tistory.com/85>