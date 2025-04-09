---
layout: note
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


---


## 4가지 격리 수준

- 격리 수준은 크게 `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE` 4가지로 구분됩니다.
    - 각 격리 수준은 data의 일관성, 동시성, 성능 간의 균형을 다르게 맞추고 있습니다.
    - `READ UNCOMMITTED`에서 `SERIALIZABLE`로 갈수록 transaction 간 고립 정도가 높아지며 성능이 떨어지는 것이 일반적입니다.

- **각 격리 수준은 성능과 일관성 간의 절충점을 제공**하기 때문에, 상황에 따라 적절한 수준을 선택하는 것이 중요합니다.
    - 성능이 중요하다면 낮은 수준의 격리(`READ UNCOMMITTED`, `READ COMMITTED`)를 선택할 수 있지만, data 일관성이 더 중요하다면 높은 수준의 격리(`REPEATABLE READ`, `SERIALIZABLE`)를 선택해야 합니다.
    - **data 무결성**이 가장 중요한 경우에는 `SERIALIZABLE`이 필요하고, **동시성**이 중요할 때는 `READ COMMITTED`나 `REPEATABLE READ`를 선택하는 것이 일반적입니다.

- 일반적인 online service에서는 `READ COMMITTED`나 `REPEATABLE READ` 중 하나를 사용합니다.
    - 예를 들어, Oracle의 default option은 `READ COMMITTED`이고, MySQL의 default option은 `REPEATABLE READ`입니다.

| 수준 | 특징 | 문제점 | 사용 상황 |
| --- | --- | --- | --- |
| **1. `READ UNCOMMITTED`** | transaction에서 commit되지 않은 변경 사항도 다른 transaction에서 읽을 수 있음 | Dirty Read 문제 발생 가능 | 주로 성능이 중요한 환경에서 사용되지만, data의 일관성이 중요한 경우에는 권장되지 않음 |
| **2. `READ COMMITTED`** | 한 transaction에서 commit된 data만 다른 transaction에서 읽을 수 있음 | 반복 불가능한 읽기(Non-repeatable Read) 발생 가능 | 대부분의 database system에서 기본적으로 사용하는 격리 수준 (적절한 동시성과 일관성) |
| **3. `REPEATABLE READ`** | 한 transaction에서 같은 data를 여러 번 읽더라도 다른 transaction에 의해 그 data가 변경되지 않도록 보장함 | Phantom Read 문제 발생 가능 | MySQL과 같은 일부 system에서 기본적으로 사용하는 격리 수준 (data의 일관성을 더 강하게 보장) |
| **4. `SERIALIZABLE`** | transaction이 마치 순차적으로 실행되는 것처럼 보이게 만듬 | 성능에 큰 영향을 미치며, 동시성이 매우 낮아질 수 있음 | data 일관성이 매우 중요한 환경에서 사용되며, transaction이 외부에서 간섭받지 않고 실행되는 것이 필요한 경우에 사용됨 |


### Level 1. READ UNCOMMITTED

- `READ UNCOMMITTED` 격리 수준에서는 **transaction에서 commit되지 않은 변경 사항도 다른 transaction에서 읽을 수 있습니다.**
    - 이는 아직 transaction이 끝나지 않은, 불완전한 data를 읽을 수 있다는 것을 의미합니다.

- database가 **data를 읽는 속도를 최우선**으로 하기 때문에, 동시성 제어를 거의 하지 않고 data를 최대한 빠르게 읽어오는 것이 가능합니다.
    - data의 일관성은 전혀 보장하지 않습니다.

- **Dirty Read 문제**가 발생할 수 있습니다.
    - `READ UNCOMMITTED` 격리 수준에서는 commit되지 않은 data도 읽을 수 있어, **data 수정이나 rollback 시 잘못된 data를 참조하게 될 수 있습니다.**
    - 예를 들어, transaction A가 data를 수정하고 있지만 아직 commit하지 않았을 때, transaction B가 그 수정된 data를 읽을 수 있습니다.
        - 그러나 transaction A가 나중에 rollback되면, transaction B는 잘못된 data를 읽게 됩니다.
    - Dirty Read 문제는 system의 data 일관성에 매우 부정적인 영향을 미칩니다.

- **성능이 매우 중요한 경우**, 즉 읽기 작업이 빠르게 이루어져야 하는 system에서 사용하면 좋습니다.
    - 예를 들어, data 일관성이 중요하지 않은 log data나 임시 data 분석에 사용될 수 있습니다.

- **data 일관성이 중요한 경우에는 절대 사용하지 말아야 합니다.**


### Level 2. READ COMMITTED

- `READ COMMITTED` 격리 수준에서는 **transaction에서 commit된 data만 다른 transaction에서 읽을 수 있습니다.**
    - 한 transaction이 완료되기 전에 해당 transaction의 변경 사항은 다른 transaction에서 접근할 수 없습니다.
        - commit되지 않은 data는 읽을 수 없습니다.
    - 이는 `READ UNCOMMITTED`의 **Dirty Read** 문제를 해결합니다.

- **반복 불가능한 읽기(Non-repeatable Read)** 문제가 발생할 수 있으며, 이는 data 일관성에 부정적인 영향을 미칩니다.
    - 한 transaction이 동일한 data를 여러 번 읽을 때, 중간에 다른 transaction에서 해당 data가 변경되면, 이전과 다른 값을 읽을 수 있습니다.
        - transaction의 처음과 나중의 읽기 결과가 달라질 수 있기 때문에 일관성이 깨집니다.
    - 예를 들어, transaction A가 처음 data X를 읽었을 때 값이 100이었지만, transaction B가 중간에 X를 200으로 변경한 후, transaction A가 다시 X를 읽으면 값이 200으로 바뀝니다.

- **대부분의 관계형 database system에서 기본적으로 사용**하는 격리 수준이며, 적절한 동시성과 일관성을 제공합니다.
    - **동시성과 data 일관성 간의 균형**을 잘 맞추며, OLTP(Online Transaction Processing) 환경에서 자주 사용됩니다.

- business logic에서 **반복 불가능한 읽기가 크게 문제가 되지 않는 경우에 사용**됩니다.


### Level 3. REPEATABLE READ

- `REPEATABLE READ` 격리 수준에서는 transaction이 시작된 이후로 같은 data를 여러 번 읽어도 **항상 같은 결과**를 반환합니다.
    - transaction 내에서 같은 data를 여러 번 읽더라도 다른 transaction에 의해 그 data가 변경되지 않도록 보장합니다.
        - transaction이 종료될 때까지 해당 data는 다른 transaction에 의해 수정되거나 삭제되지 않습니다.
    - 이로 인해 **반복 불가능한 읽기** 문제가 해결됩니다.

- **Phantom Read** 문제가 발생할 수 있습니다.
    - transaction이 한 번 조회한 **data 집합에 대해** 다른 transaction이 **삽입** 또는 **삭제**를 할 수 있습니다.
        - 한 transaction이 일정 범위의 data를 여러 번 조회할 때, **중간에 다른 transaction이 새로운 data를 추가하거나 삭제**할 수 있어서 **조회 결과에 변화**가 생깁니다.
    - 예를 들어, transaction A가 "나이 30 이상"인 직원들을 조회했을 때, transaction B가 나이 30인 새로운 직원을 추가하면, transaction A가 다시 같은 조건으로 조회했을 때 결과에 추가된 직원이 나타날 수 있습니다.
        - 이는 **data 집합의 변경을 의미**하며, 일관성을 깨뜨립니다.

- transaction 내에서 **동일한 data를 반복적으로 읽는 작업**이 필요한 상황에서 사용됩니다.
    - transaction 도중 data의 변경이 발생하지 않아야 하는 경우 적합하며, **재고 관리 system** 등에서 자주 사용됩니다.
    - `REPEATABLE READ` 격리 수준에서는 Phantom Read를 방지하는 mechanism은 없지만, `READ COMMITTED`보다는 data의 일관성을 더 강하게 보장합니다.
    - MySQL에서 기본적으로 사용되는 격리 수준입니다.


### Level 4. SERIALIZABLE

- `SERIALIZABLE` 격리 수준은 **가장 엄격한 격리 수준**입니다.
    - 모든 transaction을 순차적으로 처리하는 것처럼 동작하여 **transaction 간의 충돌 가능성을 완전히 배제**합니다.
        - 마치 각 transaction이 다른 transaction이 전혀 없는 상태에서 실행되는 것처럼 보입니다.
    - transaction이 **완벽하게 고립되어** 실행되기 때문에, **Dirty Read, Non-repeatable Read, Phantom Read 문제가 모두 발생하지 않습니다.**

- transaction 간의 동시성을 거의 허용하지 않기 때문에 **성능이 저하**됩니다.
    - 특히, 동시성 요구가 높은 system에서 성능에 큰 영향을 줄 수 있습니다.
        - 동시성이 떨어져 처리량(throughput)이 낮아지므로, **transaction이 많을수록 system이 느려집니다.**
    - transaction 간의 **lock**이 발생하는 빈도가 높아져 대기 시간이 길어지거나 **deadlock**이 발생할 가능성이 있습니다.

- **transaction의 완벽한 일관성**이 요구되는 경우에 사용됩니다.
    - **transaction 간 간섭이 없어야 하는** 복잡한 business logic이 필요한 경우, 또는 **transaction이 외부에서 간섭받지 않고** 실행되는 것이 필요한 경우에 적합합니다.
    - 예를 들어, 금융 system, 회계 system, 은행 system과 같이 **data의 오류나 모순이 절대로 발생해서는 안 되는** 중요한 system에서 사용됩니다.
        - 특히 돈과 관련된 system에서는 data 일관성이 매우 중요합니다.


---


## Reference

- <https://velog.io/@shasha/Database-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EC%A0%95%EB%A6%AC>
