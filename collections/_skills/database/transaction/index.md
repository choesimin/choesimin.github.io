---
layout: skill
title: Transaction - DB 작업의 논리적 단위
date: 2024-10-11
---


## Transaction : DB의 상태를 변경시키는 작업의 단위

- database에서 transaction은 database 내에서 수행되는 **작업의 논리적 단위**로, **여러 개의 작업(query)이 하나의 단위로 묶여 처리되는 것**을 의미합니다.
    - transaction은 DB의 상태를 변경시키는 작업의 단위이고, 한꺼번에 수행되어야 할 연산을 모아놓은 것입니다.
    - 연산들을 모두 처리하지 못 한 경우에는 원래 상태로 복구하기 때문에, 작업의 일부만 적용되는 현상이 발생하지 않습니다.
        - 이를 통해 transaction은 작업의 완전성을 보장해줍니다.
    - 사용자의 입장에서는 **작업의 논리적 단위**이고, system의 입장에서는 **data에 접근하고 data를 변경하는 program의 단위**가 됩니다.

- 예를 들어, **은행 계좌 간의 이체 작업**은 여러 개의 작업(출금, 입금)이 하나의 단위로 묶여 처리되어야만 합니다.
    - A 계좌에서 B 계좌로 100원을 이체할 때는 "A 계좌에서 100원을 출금하고, B 계좌에 100원을 입금하는 작업"이 하나의 transaction입니다.
    - 두 작업 모두가 성공해야 transaction이 완전히 완료되며, 만약 두 번째 작업(입금)에 실패한다면 첫 번째 작업(출금) 또한 무효화되어야 합니다.


### Transaction의 주요 특성 : ACID

- **Atomicity (원자성)** : transaction의 모든 작업은 전부 성공하거나, 전부 실패해야 합니다.
    - 일부 작업만 성공하고 나머지는 실패하는 상황은 허용되지 않습니다.
    - 예를 들어, 은행 계좌 간의 이체에서, 돈을 출금한 뒤 입금 과정에서 오류가 발생하면 transaction 전체가 취소되어야 하며, 출금 또한 무효화되어야 합니다.

- **Consistency (일관성)** : transaction이 완료된 후 database는 일관된 상태를 유지해야 합니다.
    - 이는 transaction 전후에 database의 상태가 지정된 제약 조건을 항상 만족해야 함을 의미합니다.
    - 예를 들어, database에 무결성 제약 조건이 적용되어 있다면, transaction이 수행된 후에도 그 조건이 여전히 충족되어야 합니다.

- **Isolation (격리성)** : 여러 transaction이 동시에 실행되더라도 각각의 transaction은 독립적으로 수행된 것처럼 보장되어야 합니다.
    - 즉, 하나의 transaction이 완료되기 전까지 다른 transaction은 그 결과에 접근할 수 없어야 합니다.
    - database는 격리 수준을 통해 transaction 간의 상호 간섭을 어느 정도까지 허용할지 설정할 수 있습니다.

- **Durability (지속성)** : transaction이 성공적으로 완료되면 그 결과는 영구적으로 database에 저장되어야 합니다.
    - system에 장애가 발생하더라도, transaction이 완료된 내용은 손실되지 않도록 보장되어야 합니다.


---


## Reference

- <https://velog.io/@shasha/Database-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EC%A0%95%EB%A6%AC>
