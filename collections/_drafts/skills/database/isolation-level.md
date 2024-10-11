---
title: Transaction 격리 수준 - 동시성 제어를 위한 설정
layout: skill
date: 2024-10-11
---




## Transaction 격리 수준 (Isolation Level) : 동시성 제어를 위한 설정

- 격리 수준(Isolation Level)은 **ACID 중 Isolation(독립성, 고립성)을 구현하는 개념**으로, 동시에 여러 트랜잭션이 처리될 때 **트랜잭션끼리 얼마나 서로 고립되어 있는지를 나타내는 개념**입니다.
    - 격리 수준 설정을 통해 특정 트랜잭션이 다른 트랜잭션에 변경한 데이터를 볼 수 있도록 허용할지 말지를 결정합니다.

- 격리 수준은 크게 `READ UNCOMMITTED`, `READ COMMITED`, `REPEATABLE READ`, `SERIALIZABLE` 4가지로 구분됩니다.
    - `READ UNCOMMITTED`에서 `SERIALIZABLE`로 갈수록 트랜잭션 간 고립 정도가 높아지며 성능이 떨어지는 것이 일반적입니다.
    - 일반적인 온라인 서비스에서는 `READ COMMITED` 나 `REPEATABLE READ` 중 하나를 사용합니다.
        - 예를 들어, Oracle의 default option은 `READ COMMITED`이고, MySQL의 default option은 `REPEATABLE READ`입니다.


### 트랜잭션 격리 수준의 필요성

- DB는 ACID 특징과 같이 트랜잭션이 독립적인 수행을 하도록 설계되어 있습니다.
- 따라서 Locking을 통해 트랜잭션이 DB를 다루는 동안 다른 트랜잭션이 관여하지 못하도록 막는 것이 필요합니다.
- 하지만 무조건 Locking으로 동시에 수행되는 수많은 트랜잭션들을 순서대로 처리하는 방식으로 구현하게 되면, DB의 성능은 떨어지게 됩니다.
- 그렇다고 성능을 높이기 위해 Locking의 범위를 줄인다면 잘못된 값이 처리될 문제가 발생하게 되므로, 최대한 효율적인 Locking 방법이 필요합니다.




---




## 격리 수준의 종류


### Isolation Level 1. READ UNCOMMITTED



### Isolation Level 2. READ COMMITTED



### Isolation Level 3. REPEATABLE READ



### Isolation Level 4. SERIALIZABLE




---




## Reference

- <https://velog.io/@shasha/Database-transaction-정리>
