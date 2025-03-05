---
layout: skill
permalink: /172
title: Database 조작 명령어 - DDL, DML, DCL, TCL
description: Database를 조작하는 여러 SQL 명령어는 DDL, DML, DCL, TCL로 분류됩니다.
date: 2025-02-03
---


## Database를 조작하는 여러 SQL 명령어

- SQL 명령어는 database를 관리하고 조작하기 위한 표준화된 명령어 집합입니다.

- SQL 명령어는 각각의 역할과 특성에 따라 DDL, DML, DCL, TCL로 분류됩니다.
    - **DDL**은 database 구조를 정의합니다.
    - **DML**은 data를 조작합니다.
    - **DCL**은 접근 권한을 제어합니다.
    - **TCL**은 transaction을 관리합니다.

| 분류 | 주요 용도 | 대표 명령어 |
| --- | --- | --- |
| **DDL** | Database 구조 정의 | `CREATE`, `ALTER`, `DROP` |
| **DML** | Data 조작 | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **DCL** | 접근 권한 제어 | `GRANT`, `REVOKE`, `DENY` |
| **TCL** | Transaction 관리 | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |


### DDL : Data Definition Language

- DDL은 **database의 논리적 구조를 정의하는 명령어의 집합**입니다.

- DDL 명령어로 변경한 내용은 즉시 database에 적용됩니다.
    - transaction은 발생하지 않으므로 rollback이나 commit이 불가능합니다.

- DDL의 주요 명령어는 `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`입니다.
    - `CREATE` : table, view, index 등의 database 객체를 생성합니다.
    - `ALTER` : table의 column을 추가, 삭제, 변경합니다.
    - `DROP` : table을 삭제하고 저장 공간을 반환합니다.
    - `TRUNCATE` : table의 모든 data를 삭제하고 저장 공간을 반환합니다.
    - `RENAME` : database 객체의 이름을 변경합니다.


### DML : Data Manipulation Language

- DML은 **data를 조작하는 명령어의 집합**입니다.

- DML은 transaction이 발생하므로 rollback과 commit이 가능합니다.

- DML의 주요 명령어는 `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `MERGE`입니다.
    - `SELECT` : table의 data를 조회합니다.
    - `INSERT` : table에 새로운 data를 삽입합니다.
    - `UPDATE` : table의 data를 수정합니다.
    - `DELETE` : table의 data를 삭제합니다.
    - `MERGE` : 조건에 따라 `INSERT`, `UPDATE`, `DELETE`를 수행합니다.


### DCL : Data Control Language

- DCL은 **database의 접근 권한과 security를 관리하는 명령어의 집합**입니다.

- DCL은 database 관리자가 사용하는 명령어입니다.

- DCL의 주요 명령어는 `GRANT`, `REVOKE`, `DENY`입니다.
    - `GRANT` : user에게 특정 권한을 부여합니다.
    - `REVOKE` : user에게 부여한 권한을 회수합니다.
    - `DENY` : user의 특정 권한을 명시적으로 거부합니다.


## TCL : Transaction Control Language

- TCL은 **transaction을 제어하는 명령어의 집합**입니다.

- transaction은 database의 논리적 작업 단위입니다.
    - transaction의 특성은 **ACID**를 보장합니다.
    - **A**tomicity : transaction은 모두 실행되거나 모두 실행되지 않습니다.
    - **C**onsistency : transaction은 database의 일관성을 유지합니다.
    - **I**solation : transaction은 다른 transaction과 독립적으로 실행됩니다.
    - **D**urability : transaction이 완료되면 결과는 영구적으로 반영됩니다.

- TCL의 주요 명령어는 `COMMIT`, `ROLLBACK`, `SAVEPOINT`입니다.
    - `COMMIT` : transaction의 변경 사항을 database에 영구적으로 반영합니다.
    - `ROLLBACK` : transaction의 변경 사항을 취소하고 이전 상태로 되돌립니다.
    - `SAVEPOINT` : transaction 내에 checkpoint를 설정하여 rollback 시점을 지정합니다.