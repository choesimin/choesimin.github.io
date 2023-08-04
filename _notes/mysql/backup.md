---
layout: note
title: MySQL Backup - Data를 Backup하고 복원하기
date: 2023-08-04
---




- `mysqldump`는 MySQL의 대표적인 Logical backup program미여, storage engine에 상관없이 data를 backup할 수 있습니다.

- `mysqldump`는 기본적으로 dump를 하려고 하는 table에 대한 `SELECT` 권한, dump하려는 View에 대한 `SHOW VIEW` 권한, dump하려는 Trigger에 대한 `TRIGGER` 권한을 가지고 있어야 합니다.
    - 만약, `--single-transaction option`을 사용할 수 없는 storage engine이라면, `LOCK TABLES` 권한이 추가적으로 필요합니다.
    - 만약, 다른 option을 추가적으로 사용한다면 해당 option에 권한이 필요합니다.

- dump file을 복원할 때도, 복원 계정은 dump file을 생성했을 때 가졌던 모든 권한을 가지고 있어야 합니다.




---




## Backup하기

- `mysqldump` 명령어를 사용합니다.


### 전체 Dump하기

```sh
mysqldump [option] --all-databases
```


### Instance 내의 Database들을 Dump하기

```sh
mysqldump [option] --databases [db_name_1] [db_name_2] [db_name_3] ...
```


### Databse 내의 Table들을 Dump하기

```sh
mysqldump [option] [database_name] [table_name_1] [table_name_2] [table_name_3] ...
```




---




## 복원하기

- `mysqldump` 명령어로 생성한 backup file을 이용하여, data를 복원할 수 있습니다.


### DB 복원하기

```sh
mysql -u [user_id] -p [password] [database_name_to_restore] < [backup_database].sql

# example
mysql -u test_user -p test_db < backup_test_db.sql
passowrd : 123456
```


### Table 복원하기

```sh
mysql -u [user_id] -p [password] [database_name_to_restore] < [backup_table].sql

# example
mysql -u test_user -p 123456 test_db < backup_test_table.sql
passowrd : 123456
```




---




## Backup Option

- backup할 때, `mysqldump`에 여러가지 option을 적용할 수 있습니다.


### Access Option

| Option | Short Option | 설명 |
| - | - | - |
| `G-host=[host_name]` | `-h [host_name]` | 접속하려는 server의 host 정보를 입력합니다. 가본 값은 localhost입니다. |
| `--password=[password]` | `-p [password]` | 접속하려는 server의 user password를 입력합니다. |
| `--port=[port_number]` | `-P [port_number]` | 접속하려는 server의 port를 지정합니다. |
| `--socket=[path]` | `-S [path]` | localhost로 접속하는 경우, 접속에 사용할 socket file을 지정합니다. |
| `--user=[user_name]` | `-u [user_name]` | 접속하려는 server의 user를 지정합니다. |


### Data Option

| Option | Short Option | 설명 |
| - | - | - |
| `--events` | `-E` | dump file에 event 관련 정보도 저장합니다. |
| `--ignore-table=[db_name].[table_name]` |  | backup하지 않을 table을 명시합니다. 여러 번 사용하여 여러 table을 제외할 수 있습니다. |
| `--no-data` | `-d` | data를 입력하지 않습니다.<br>`CREATE` 구문을 전부 제외합니다. |
| `--routines` | `-R` | stored routines 정보를 모두 포함하여 dump합니다. |
| `--triggers` |  | trigger 정보를 모두 포함하여 dump합니다. |
| `--where=[condition]` | `-w [condition]` | `WHERE` 구문의 조건에 맞는 data만 dump합니다. |
| `--add-drop-database` |  | `CREATE DATABASE` 구문 전에 `DROP DATABASE` 구문을 추가합니다. |
| `--add-drop-table`|   | `CREATE TABLE` 구문 전에 `DROP TABLE` 구문을 추가합니다. |
| `--add-drop-trigger` |  | `CREATE TRIGGER` 구문 전에 `DROP TRIGGER` 구문을 추가합니다. |
| `--create-options` |  | `CREATE TABLE` 구문 안에 모든 table option을 추가합니다. |
| `--no-create-db`|  `-n` | `CREATE DATABASE` 구문을 추가하지 않습니다. |
| `--no-create-info` | `-t` | `CREATE TABLE` 구문을 작성하지 않습니다. |
| `--replace` |  | `INSERT` 구문 대신에 `REPLACE` 구문을 사용하여 insert하도록 설정합니다. |


### Performance Option

| Option | Short Option | 설명 |
| - | - | - |
| `--delayes-insert` |  | transaction을 지원하지 않는 table(MyISAM)을 위한 지원 option입니다.<br>`INSERT` 대신 `INSERT_DELAYED`를 사용하여 dump file을 작성합니다. |
| `--disable-keys` | `-K` | table의 `INSERT` 구문을 작성할 때 `/*!40000 ALTER TABLES tbl_name DISABLE KEYS */;`, `/*!40000 ALTER TABLE tbl_name ENABLE KETS */;`를 추가하여 작성합니다.<br>key에 대한 제약 사항을 검사하지 않도록 해 loading을 더 빠르게 할 수 있게 합니다.<br>nonunique index를 사용하는 MyISAM table에 효과가 좋습니다. |
| `--extended-insert` | `-e` | 여러 data를 한 문장의 `INSERT` 구문으로 insert하도록 구문을 작성합니다. |
| `--insert-ignore` |  | dump file 작성 시, `INSERT` 대신에 `INSERT IGNORE` 구문을 작성합니다. |
| `--quick` | `-q` | `mysqldump` 실행 시 data를 memory에 loading하지 않고, 직접 읽어서 작성합니다..<br>성능을 향상 시킬 수 있습니다. |
| `--opt` |  | `-add-drop-table`, `--add-locks`, `--create-options`, `--disable-keys`, `--extended-insert`, `--lock-tables`, `--quick`, `--set-charset`의 기능을 하는 option입니다.<br>일반적으로 많이 사용하는 option들을 모아 놓은 것입니다.<br>default option이기 때문에 명시하지 않아도 사용됩니다. |
| `--skip-opt` |  | `--opt` option을 사용하고 싶지 않은 경우 사용합니다. |


### Transaction Option

| Option | Short Option | 설명 |
| - | - | - |
| `--add-locks` |  | dump 작성 시, 각 table의 앞 뒤에 `LOCK TABLES` 구문과 `UNLOCK TABLES` 구문을 삽입합니다.<br>reload 성능을 향상시킵니다. |
| `--flush-logs` | `-F` | dump 작업을 시작하기 전에 MySQL의 log file들을 flush합니다.<br>이 option은 `RELOAD` 권한이 있어야 실행할 수 있습니다.<br>`--all-databases` option과 같이 사용하는 경우, 각 database를 dump할 때마다 flush가 일어납니다.<br>`--lock-all-tables`, `--master-data`, `--single-transaction` option과 같이 실행하는 경우, 정확히 같은 시점에 flush와 dump가 일어납니다. |
| `--flush-privileges` |  | database를 dump한 후, dump file에 `FLUSH PRIVILEGES` 구문을 추가합니다. |
| `--lock-all-tables` | `-x` | 모든 database의 모든 table들을 lock합니다.<br>dump가 진행되는 동안 global read lock을 실행합니다.<br>`--single-transaction`과 `--lock-tables` option을 동시에 사용하는 경우, 이 option은 자동적으로 disable 처리됩니다. |
| `--lock-tables` | `-l` | 각 database를 dump하기 전, 대상 table들을 모두 잠급니다.<br>database별로 각각 `LOCK TABLES`를 실행하기 때문에 database는 서로 다른 시점의 data를 가지고 있게 되며, 따라서 전체 snapshot은 지원하지 않습니다.<br>transaction을 지원하는 table은 이 option을 사용할 필요가 없습니다. |
| `--skip-lock-tables` |  | `--lock-tables` option을 사용하지 않습니다.<br>option 목록의 가장 마지막에 작성합니다. |
| `--no-autocommit` |  | dump하는 각 table의 앞 뒤에 `SET autocommit=0`과 `COMMIT` 구문을 넣습니다. |
| `--order-by-primary` |  | data를 primary key 또는 가장 첫 번째 unique index에 맞게 정렬하여 작성합니다.<br>MyISAM이나 InnoDB에서 유용하게 사용됩니다.<br>dump 작업 시간이 길어집니다. |
| `--single-transaction` |  | dump하기 전에 transaction isolaton level을 `REPEATABLE READ`로 변경하고, `START TRANSACTION`을 실행합니다.<br>block 없이 snapshot data를 dump할 수 있도록 해주며, InnoDB와 같은 transaction을 지원하는 table을 dump하기에 좋습니다.<br>무결한 dump file을 만들기 위해서, 이 option을 사용하여 dump하는 동안은 다른 접속을 통해 DDL 작업을 진행해서는 안 됩니다.<br>`--lock-tables` option과 함께 사용하면 안 됩니다.<br>data의 크기가 크다면, `--quick` option을 함께 사용하는 것을 권장합니다. |


### Output Format Option

| Option | Short Option | 설명 |
| - | - | - |
| `--compact` |  | `--skip-add-drop-table`, `--skip-add-locks`, `--skip-comments`, `--skip-disable-keys`, `--skip-set-charset` option들을 enable합니다. |
| `--compatible=[name]` |  | 다른 DBMS(postgresql, oracle, mssql, db2, maxdb), 옛날 version의 MySQL(mysql323, mysql40), 또는 `ANSI`, `NO_KEY_OPTIONS`, `NO_TABLE_OPTIONS`, `NO_FIELD_OPTIONS`에 맞게 dump file을 만들고자 하는 경우 사용합니다.<br>여러 값들을 comma로 구분하여 입력할 수 있습니다.<br>이 option을 사용함으로서 호환성이 보장되는 것은 아니지만, 호환성을 높일 수는 있습니다. |
| `--complete-insert` | `-c` | `INSERT` 구문 작성시 column 이름을 전부 포함하여 작성합니다. |
| `--hex-blob` |  | `BINARY`, `VARBINARY`, `BLOB`, `BIT` column에 대해서 값을 명시할 때, hexadecimal 형태로 기술합니다. |
| `--quote-names` | `-O` | 식별자를 `'`를 사용하여 모두 감쌉니다.<br>`ANSI_QUOTES SQL MODE`인 경우에는 `"`를 사용하여 감쌉니다.<br>enable이 default option입니다. |


### Replication Option


| Option  | 설명 |
| - | - |
| `--master-data=[value]` | dump 받은 file이 '어느 binary log의 위치까지 사용한 것인지'를 dump file 안에 `CHANGE MASTER` 구문의 형태로 작성합니다.<br>`value`에는 `1`(comment로 남지 않습니다.) 또는 `2`(comment로 남습니다.)를 지정할 수 있으며, 기본 값은 `1`입니다.<br>이 option은 `RELOAD` 권한을 가지고 있어야 하고, binary log는 enable되어 있어야 합니다.<br>만약 binary log를 enable하지 않고 사용하면 오류가 발생합니다.<br>자동으로 `--lock-tables` option을 disable합니다.<br>원래는 `--single-transaction` option을 사용하면 `--lock-all-tables` option이 disable되지만, 이 option을 사용했을 때에는 `--single-transaction` option을 사용하더라도 `--lock-all-tables`가 enable됩니다.<br>dump를 시작할 때, 아주 짧은 시간 동안 global read lock이 발생합니다. |
| `--delete-master-logs` | master server인 경우, dump받은 후 binary log는 모두 삭제합니다.<br>자동으로 `--master-data` option을 enable합니다. |
| `--dump-slave=[value]` | `--master-data` option과 비슷하지만, 다른 slave server를 만들기 위해 slave server를 dump한다는 점이 다릅니다.<br>`CHANGE MASTER TO` 구문을 dump file에 추가합니다. |
| `--apply-slave-statements` | `--dump-slave` option으로 dump하는 경우에 `STOP SLAVE`, `CHANGE MASTER TO`, `START SLAVE` 구문을 같이 작성하게 합니다. |
| `--set-qtid-purqed=[value]` | GTID(Global Transaction ID) 정보를 dump file에 `SET @@global.gtid purged` 구문으로 작성합니다.<br>`value`에는 `OFF`, `ON`, `AUTO` 중 하나가 지정할 수 있으며, 기본 값은 `AUTO`입니다.<br>`OFF` : Add no SET statement to the output.<br>`ON` : Add a SET statement to the output. An error occurs if GTIDs are not enabled on the server.<br>`AUTO` : Add a SET statement to the output if GTIDs are enabled on the server. |


### Etc Option

| Option | Short Option | 설명 |
| - | - | - |
| `--default-character-set=[charset_name]` |  | 기본 charset을 설정합니다. 기본 값은 `utf8`입니다. |
| `--no-set-names` | `-N` | `--set-names` option을 disable합니다. |
| `--set-charset` |  | `SET NAMES default_charset`을 기술합니다. |
| `--help` | `-?` | 도움말을 출력합니다. |
| `--version` | `-V` | version 정보를 출력합니다. |
| `--verbose` | `-v` | verbose mode로 이 program의 정보를 자세히 보여줍니다. |
| `--force` | `-f` | error가 발생해도 계속 작업이 진행되도록 합니다. |
| `--dump-date` |  | dump file의 생성 일자를 comment로 추가합니다. |
| `--comments` |  | dump file에 추가적인 정보를 기술합니다. |
| `--allow-keywords` |  | column 이름으로 keyword를 사용하는 것을 허용합니다. |


### Option Variable

| Variable | 설명 |
| - | - |
| `max_allowed_packet` | client와 server 사이의 buffer의 max size를 결정하는 variable입니다. MySQL과 `mysqldump`에도 적용됩니다.<br>dump시에 큰 data를 받아야 하는 경우, 이 variable의 값을 크게 늘려줘야 합니다. |
| `net_buffer_length` | client와 server 사이 buffer의 initial size를 결정하는 variable입니다.<br>여러 data를 하나의 `INSERT` 구문으로 작성하고자 하는 경우 늘려줘야 합니다. |




---




# Reference

- <https://server-talk.tistory.com/30>
- <https://code-factory.tistory.com/21>
