---
layout: skill
permalink: /95
title: Transaction 격리 수준 (Isolation Level)
description: Database transaction의 격리 수준(Isolation Level)은 동시성 제어를 위한 설정으로, 여러 transaction이 동시에 실행될 때 서로의 영향을 얼마나 고립시키는지를 나타냅니다.
date: 2024-10-13
---


## 격리 수준 : 동시성 제어를 위한 설정

- database에서 **격리 수준(Isolation Level)**은 **동시에 여러 transaction이 처리될 때 transaction끼리 얼마나 서로 고립되어 있는지를 나타내는 개념**입니다.
    - 여러 transaction이 동시에 실행될 때, **각 transaction이 서로의 영향을 받지 않도록 격리하는 정도**를 정의합니다.
    - 격리 수준 설정을 통해 특정 transaction이 다른 transaction에 변경한 data를 볼 수 있도록 허용할지 말지를 결정할 수 있습니다.

- 격리 수준은 **data 무결성과 동시성 제어를 위해 필요**합니다.
    - **Data 무결성 보장** : transaction이 동시에 실행될 때 발생할 수 있는 data 불일치나 충돌을 방지합니다.
    - **동시성 제어** : 여러 사용자가 동시에 data를 조작하는 상황에서 예측 가능한 동작을 보장합니다.
    - **성능과 무결성의 균형** : 너무 엄격한 격리 수준은 성능을 저하시키고, 너무 느슨한 격리 수준은 data 무결성을 보장하지 못합니다.

- database는 ACID(Atomicity, Consistency, Isolation, Durability) 원칙을 따르며, **격리 수준은 그 중 Isolation을 구현하는 개념**입니다.
    - Isolation(격리성)은 여러 transaction이 동시에 실행될 때 서로의 작업에 영향을 주지 않도록 독립적으로 수행되도록 보장하는 원칙이며, 이를 통해 data의 일관성과 무결성을 유지합니다.


### Isolation과 Locking

- 격리성(isolation)을 보장하기 위해, database는 **Locking** mechanism을 기반으로 격리 수준을 조정합니다.
    - transaction이 data에 접근할 때 lock을 걸어 다른 transaction이 해당 data에 동시에 접근하거나 수정하지 못하게 막습니다.
    - 즉, 하나의 transaction이 data에 대해 작업하는 동안 다른 transaction은 그 data에 접근하지 못하도록 하여 data 충돌을 방지하는 것입니다.

- 하지만 모든 transaction에 lock을 무조건적으로 걸어 순차적으로 처리하게 되면 성능이 크게 저하될 수 있습니다.
    - 동시에 많은 transaction이 발생하는 system에서는 transaction들이 서로 대기하는 시간이 길어지고, 이로 인해 성능 병목이 발생합니다.

- 반대로, 성능을 높이기 위해 locking의 범위를 줄이거나 완화하게 되면 transaction 간의 충돌이 발생할 수 있습니다.
    - transaction이 작업 중인 data에 다른 transaction이 접근하게 되어, 잘못된 값이 처리되거나 data 일관성이 깨질 수 있습니다.

- 따라서 database system은 **성능과 data 무결성 간의 균형**을 위해 **다양한 locking 전략**을 사용하여 transaction 간 동시성과 data 일관성을 최적화합니다.
	- **Row-level Locking** : 특정 행(row)에만 lock을 걸어 다른 transaction이 다른 행에 대해 동시에 작업할 수 있도록 허용하여 성능을 높입니다.
	- **Optimistic Locking** : 충돌이 발생할 가능성이 낮을 때는 lock을 걸지 않고 작업을 진행하고, 마지막에 충돌이 발생하면 다시 시도하는 방식입니다.
	- **Pessimistic Locking** : 충돌 가능성이 높을 때는 transaction 초기에 lock을 걸고 다른 transaction의 접근을 막는 방식입니다.


