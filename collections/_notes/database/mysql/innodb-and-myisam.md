---
layout: note
permalink: /311
title: MySQL InnoDB와 MyISAM 비교
description: InnoDB는 transaction과 row-level 잠금을 지원하는 안전한 engine이고, MyISAM은 읽기에 최적화된 단순한 table-level 잠금 engine입니다.
date: 2024-04-10
---


## InnoDB vs MyISAM

- InnoDB와 MyISAM은 MySQL에서 사용되는 대표적인 storage engine이며, 설계 철학과 기능에서 명확한 차이를 보입니다.

- InnoDB는 MySQL 5.5 이후 기본 engine으로 지정되었으며, 대부분의 enterprise application에 권장됩니다.
    - memory 사용량이 상대적으로 많습니다.

- MyISAM은 과거 MySQL의 기본 engine이었습니다.
    - full-text search를 MySQL 5.6 이전 version에서 지원했습니다.
    - disk 공간과 memory 사용량이 상대적으로 적습니다.

| 특성 | InnoDB | MyISAM |
| --- | --- | --- |
| **INSERT 성능** | 상대적으로 느림 | 빠름 |
| **UPDATE 성능** | 빠름 | 느림 |
| **SELECT 성능** | 보통 | 빠름 |
| **동시성 처리** | 우수함 | 제한적 |
| **Memroy 사용량** | 높음 | 낮음 |
| **Disk 공간** | 많이 사용 | 적게 사용 |
| **Backup 중 가용성** | 가능 | 제한적 |
| **충돌 복구** | 자동, 완전 | 수동, 불완전 |

- application 요구 사항에 따라 적절한 engine을 선택하는 것이 중요합니다.
    - InnoDB는 높은 동시성이 요구되는 OLTP 환경, transaction 처리가 필요한 application, data 무결성이 중요한 system, primary key 기반 검색이 많은 system에서 적합합니다.
    - MyISAM는 읽기 위주의 작업이 대부분인 환경, transaction이 필요 없는 단순한 system, `COUNT(*)` 같은 통계 쿼리가 많은 경우, 제한된 system resource 환경에서 적합합니다.


### Transaction 지원의 차이

- InnoDB는 ACID 호환 transaction을 완벽하게 지원합니다.
    - `COMMIT`, `ROLLBACK` 등 transaction 제어가 가능합니다.
    - 복구 기능이 강력하여 crash 발생 시 data 복구가 가능합니다.

- MyISAM은 transaction을 지원하지 않습니다.
    - 모든 query는 즉시 실행되고 개별 statement 단위로 처리됩니다.
    - transaction 롤백이 불가능합니다.


### 잠금 Mechanism의 차이

- InnoDB는 row-level locking을 지원합니다.
    - 특정 row에만 lock을 설정하여 동시성이 높습니다.
    - 복잡한 OLTP 환경에 적합합니다.

- MyISAM은 table-level locking만 지원합니다.
    - table 전체에 lock이 적용되어 동시성이 낮습니다.
    - 읽기 위주 작업에는 효율적이지만 쓰기 경합이 발생하면 성능이 저하됩니다.


### Foreign Key 제약 조건의 차이

- InnoDB는 foreign key 제약 조건을 지원합니다.
    - 참조 무결성을 database 수준에서 보장합니다.
    - `CASCADE`, `SET NULL` 등의 참조 동작을 지원합니다.

- MyISAM은 foreign key를 지원하지 않습니다.
    - 참조 무결성을 application logic에서 처리해야 합니다.
    - database 설계가 단순해지는 장점은 있습니다.


### 성능 특성의 차이

- InnoDB는 data와 index를 함께 저장하는 clustered index 방식을 사용합니다.
    - primary key 검색이 매우 빠릅니다.
    - buffer pool을 통한 cache 최적화가 뛰어납니다.

- MyISAM은 data와 index를 별도로 저장합니다.
    - key buffer를 사용하여 index만 cache합니다.
    - `COUNT(*)` 같은 전체 record count 작업이 빠릅니다.


### Data 무결성의 차이

- InnoDB는 crash recovery 기능을 제공합니다.
    - 비정상 종료 후에도 transaction 일관성을 유지합니다.
    - double-write buffer와 redo log를 통해 data 손상을 방지합니다.

- MyISAM은 crash 발생 시 data 손상 위험이 있습니다.
    - table 복구가 필요할 수 있으며 data 손실 가능성이 있습니다.
    - 복구 작업에는 REPAIR TABLE 명령이 필요합니다.

