---
layout: note
permalink: /212
title: MySQL - 가장 많이 사용되는 RDBMS
description: MySQL은 전 세계적으로 가장 널리 사용되는 RDBMS입니다.
date: 2024-10-09
---


## MySQL : Famous Open Source RDBMS

- MySQL은 전 세계적으로 가장 널리 사용되는 **관계형 database 관리 system(RDBMS)**로, 무료로 사용할 수 있는 open source software입니다.
    - RDBMS는 data를 구조화된 방식(table 형태)으로 저장하고 관리할 수 있는 도구이며, SQL(Structured Query Language)을 사용하여 database와 상호작용합니다.

- 특히 **web application에서 인기**가 많으며, 소규모부터 대규모까지 많은 service들이 MySQL을 사용해 data를 처리하고 있습니다.
    - MySQL은 **LAMP(Linux, Apache, MySQL, PHP) stack**의 database로 사용됩니다.
    - WordPress, Joomla, Drupal과 같은 **CMS(Content Management System)에서도 흔히 사용**됩니다.

- MySQL은 비교적 안정적이고 무료로 사용할 수 있기 때문에 **중소규모의 project에서 매우 효과적인 database solution**입니다.
    - 그러나 대규모 data traffic 처리나 복잡한 transaction 처리에서 제한이 있기 때문에, 대규모 project에서는 이를 보완할 추가 solution이나 database system이 필요합니다.
        - 또는 MySQL에 대해 Oracle이 제공하는 상업적 지원 option을 선택하여 enterprise 수준에서의 안정적인 운영을 보장받을 수도 있습니다.


### MySQL의 특징

1. **관계형 Database(RDBMS)**이기 때문에 data를 table로 저장하고, table 간의 관계를 통해 data를 연결할 수 있습니다.
    - 각 table은 행(row)과 열(column)로 구성되며, 열은 data의 속성을 나타내고 행은 실제 data를 포함합니다.

2. **SQL(Structured Query Language)**이라는 언어를 사용하여 data를 조작합니다.
    - SQL은 data를 조회, 삽입, 변경, 삭제하는 데 사용됩니다.
    - 주요 SQL 명령어로는 `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE`, `DROP`, `ALTER` 등이 있습니다.

3. data의 무결성을 보장하기 위한 **다양한 제약 조건**을 제공합니다
    - 예를 들어, `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `NOT NULL`, `CHECK` 등의 제약 조건을 사용하여 data의 일관성과 정확성을 유지할 수 있습니다

4. ACID(Atomicity, Consistency, Isolation, Durability) 속성을 준수하는 **transaction 처리 기능**을 지원합니다.
    - 이를 통해 data 일관성을 유지하면서 **여러 query를 하나의 작업 단위로 처리**할 수 있습니다.
    - 예를 들어, 은행 계좌 간 송금 작업에서 data가 중간에 손실되지 않도록 하는 것이 가능합니다.

5. **다양한 Storage Engine**을 지원하며, 대표적인 engine으로는 InnoDB와 MyISAM이 있습니다.
    - **InnoDB**는 ACID를 지원하는 transaction 기능과 외래 key(FOREIGN KEY)를 제공하는 storage engine입니다.
        - 대부분의 경우 기본 storage engine으로 사용됩니다.
    - **MyISAM**은 transaction을 지원하지 않지만, InnoDB보다 더 빠른 읽기 성능을 제공하는 storage engine입니다.
        - data 무결성보다는 성능이 중요한 경우에 사용됩니다.

6. **index**를 지원하여 data 조회 성능을 최적화할 수 있습니다.
    - `PRIMARY KEY`, `UNIQUE`, `FULLTEXT`, `INDEX`와 같은 다양한 index를 지원합니다.
    - index는 data를 빠르게 조회할 수 있도록 도와주는 data 구조입니다.

7. database를 여러 server에 **복제(replication)**할 수 있는 기능을 제공합니다.
    - 이를 통해 고가용성(high availability) system을 구축하고, database의 읽기 작업 부하를 여러 server로 분산할 수 있습니다.
    - 주로 master-slave 복제 구조가 사용됩니다.

8. data의 손실을 방지하기 위한 **backup과 복구 기능을 지원**합니다.
    - `mysqldump`와 같은 도구를 사용하여 data를 backup해두고, 필요시 data를 복구할 수 있습니다.

9. database의 크기가 커지더라도 효율적으로 처리할 수 있는 **확장성**을 제공합니다.
    - 특히 **partitioning**을 통해 data를 분리하여 더 큰 database를 처리할 수 있습니다.
        - partitioning은 data를 여러 partition으로 나누어 database를 관리하는 방법입니다.
        - 날짜나 ID 범위에 따라 data를 나누거나(범위 partitioning), 특정 값 목록에 따라 data를 분할하거나(list partitioning), hash 함수를 사용하여 data를 균등하게 분산하거나(hash partitioning), MySQL이 내부적으로 hash 함수를 사용하여 data를 분할하도록(key partitioning) 하는 등의 다양한 방법으로 partitioning을 구현할 수 있습니다.

10. 사용자의 접근을 제어하고 data를 안전하게 보호하기 위한 **다양한 보안 기능**을 제공합니다.
    - 사용자 권한 관리 : 세분화된 권한 system을 통해 database, table, column 수준에서 사용자 접근을 제어할 수 있습니다.
        - `GRANT`와 `REVOKE` 명령을 사용하여 특정 사용자에게 필요한 최소한의 권한만 부여할 수 있습니다.
    - SSL/TLS 암호화 : client와 server 간의 통신을 SSL/TLS로 암호화하여 data 전송 중 보안을 강화합니다.
        - 이를 통해 중간자 공격(man-in-the-middle attack)을 방지할 수 있습니다.
    - 외부 접근 제어 : 특정 IP 주소나 host에서만 접근을 허용하도록 설정할 수 있습니다.
        - 또한, 방화벽 설정과 연계하여 database server에 대한 불필요한 접근을 차단할 수도 있습니다.
    - 암호화 기능 : `AES_ENCRYPT()`와 `AES_DECRYPT()` 함수를 제공하여 중요한 data를 암호화하여 저장할 수 있습니다.
        - MySQL 5.7 이상 버전에서는 data file 자체를 암호화하는 기능도 제공합니다.
    - 사용자 비밀번호 정책 : 강력한 비밀번호 정책을 설정하여 MySQL을 사용하는 계정의 보안을 강화할 수 있습니다.
        - 비밀번호 복잡성 요구사항, 비밀번호 만료 기간 등을 설정할 수 있습니다.
        - 예를 들어, `ALTER USER 'username'@'localhost' PASSWORD EXPIRE INTERVAL 90 DAY;`는 비밀번호 만료 기간을 90일로 설정하는 명령어입니다.
    - 감사 logging : MySQL Enterprise Edition에서는 database 활동을 monitoring하고 logging하는 고급 감사 기능을 제공합니다.
        - database 관리자는 system 보안 강화, 문제 대응, 보안 위협 탐지, 규정 준수를 위한 증거 수집, 성능 최적화 등의 다양한 목적으로 고급 감사 기능을 활용할 수 있습니다.
        - 주요 기능으로는 활동 기록(login/logout, query 실행, data 변경 등), 유연한 구성(flexible configuration), 성능 최적화를 위한 비동기 logging, log file 보안, 규정 준수 지원(GDPR, HIPAA, SOX 등), 분석 및 보고 기능 등이 있습니다.
            - 유연한 구성(flexible configuration)이란 특정 사용자, database, table, 또는 특정 유형의 query(`SELECT`, `INSERT`, `UPDATE`)에 대해서만 감사를 수행하도록 설정할 수 있는 기능입니다.

11. 활발한 **대규모 community**를 보유하고 있어, 문제를 해결하거나 새로운 기능을 도입하는 데 있어 많은 도움을 받을 수 있습니다.
    - community forum, blog, online document 등을 통해 다양한 해결책을 찾을 수 있으며, 최신 trend와 함께 지속적으로 update되는 tutorial이나 guide가 많습니다.

