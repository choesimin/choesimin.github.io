---
layout: note
---

# mysqldump

- MySQL의 대표적인 Logical backup program
- storage engine에 상관없이 backup을 받을 수 있는 tool
- mysqldump는 기본적으로 dump를 하려고 하는 table에 대한 SELECT 권한, dump하려는 view에 대한 SHOW VIEW 권한, dump하려는 trigger에 대한 TRIGGER 권한을 가지고 있어야 합니다.
    - 만약, --single-transaction option을 사용할 수 없는 스토리지 엔진이라면 LOCK TABLES 권한이 추가적으로 필요합니다.
    - 만약, 다른 option을 추가적으로 사용한다면 추가적인 다른 권한도 필요하게 됩니다.
- dump file을 reload하기 위해, 계정은 dump file을 생성했을 때 가졌던 권한을 다 가지고 있어야 합니다.




# dmup 명령어 기본 규칙

- 하나의 databse 안의 table들을 dump
    ```sh
    mysqldump [option ...] [db_name] [table_name ...]
    ```

- 하나의 instance 안의 여러 database들을 dump
    ```sh
    mysqldump [option ...] --databases [db_name ...]
    ```
 
- 전체 dump
    ```sh
    mysqldump [option ...] --all-databases
    ```




# Option

## 접속 Option

- `G-host=[host_name]`, `-h [host_name]`
    - 접속하려는 server의 host 정보 입력
    - default 값 : localhost

- `--password=[password]`, `-p [password]`
    - 접속하려는 server의 user password 입력

- `--port=[port_num]`, `-P [port_num]`
    - 접속하려는 server의 port 지정

- `--socket=[path]`, `-S [path]`
    - localhost로 접속하는 경우, 접속에 사용할 socket file을 지정

- `--user=[user_name]`, `-u [user_name]`
    - 접속하려는 server의 user 지정


## DDL Option

- `--events`, `-E`
    - dump file에 event 관련 정보도 같이 dump받음

- `--ignore-table=[db_name].[table_name]`
    - backup하지 않을 table을 명시함
    - 여러 번 사용 가능

- `--no-data`, `-d`
    - data를 입력하지 않음
    - create 구문 전부 제외

- `--routines`, `-R`
    - stored routines 정보를 모두 포함하여 dump

- `--triggers`
    - trigger 정보를 모두 포함하여 dump

- `--where=[where_condition]`, `-w [where_condition]`
    - where 구문에 맞는 data만 dump

- `--add-drop-database`
    - create database 구문 전에 drop database 구문 추가

- `--add-drop-table`
    - create table 구문 전에 drop table 구문 추가

- `--add-drop-trigger`
    - create trigger 구문 전에 drop trigger 구문 추가

- `--create-options`
    - create table 구문 안에 모든 table option을 추가

- `--no-create-db`, `-n`
    - create database 구문을 추가하지 않음

- `--no-create-info`, `-t`
    - create table 구문을 작성하지 않음

- `--replace`
    - `INSERT` 구문 대신에 `REPLACE` 구문을 사용하여 insert하도록 설정


## Data Option

- `--events`, `-E`
    - dump file에 event 관련 정보도 같이 dump

- `--ignore-table=[db_name].[table_name]`
    - backup하지 않을 table을 명시함
    - 여러 번 사용 가능

- `--no-data`, `-d`
    - data를 입력하지 않음

- `--routines`, `-R`
    - stored routines 정보를 모두 포함하여 dump

- `--triggers`
    - trigger 정보를 모두 포함하여 dump

- `--where=[where_condition]`, `-w [where_condition]`
    - where 구문에 맞는 data만 dump


## 성능 Option

- `--delayes-insert`
    - transaction을 지원 하지 않는 table(MyISAM)을 위한 지원 option
    - `INSERT` 대신 `INSERT_DELAYED`를 사용하여 dump file을 작성함

- `--disable-keys`, `-K`
    - table의 `INSERT` 구문을 작성할 때 `/*!40000 ALTER TABLES tbl_name DISABLE KEYS */;`, `/*!40000 ALTER TABLE tbl_name ENABLE KETS */;`를 추가하여 작성함
    - loading할 때, key에 대한 제약사항을 check하지 않게 하여 더 빨리 loading할 수 있게 함
        - nonunique index를 사용하는 MyISAMtable에 효과가 좋음

- `--extended-insert`, `-e`
    - 여러 data를 한 문장의 `INSERT` 구문으로 insert하도록 구문 작성

- `--insert-ignore`
    - dump file 작성시 `INSERT` 대신에 `INSERT IGNORE` 구문을 사용하도록 작성

- `--opt`
    - `-add-drop-table`, `--add-locks`, `--create-options`, `--disable-keys`, `--extended-insert`, `--lock-tables`, `--quick`, `--set-charset`의 기능을 하는 option
        - 일반적으로 dump받을 때, 사람들이 가장 많이 사용하는 option들을 모아 놓은 것
    - default option으로 명시하지 않아도 사용됨
    - 사용하고 싶지 않다면 `--skip-opt`를 사용

- `--quick`, `-q`
    - mysqldump 실행 시 data를 memory에 loading하지 않고, 직접 읽어서 작성함
    - 성능을 향상 시킬 수 있는 option

- `--skip-opt`
    - `--opt` option을 사용하고 싶지 않은 경우 사용
        - 대부분의 MySQL 5.x는 `--opt` option이 default로 enable되어 있음


## Transaction Option

- `--add-locks`
    - dump 작성 시, 각 table의 앞 뒤에 `LOCK TABLES`와 `UNLOCK TABLES` 구문을 삽입함
    - 이렇게 하면 reload 성능이 향상됨

- `--flush-logs`, `-F`
    - dump 작업을 시작하기 전에 MySQL의 log file들을 flush함
    - 이 option은 `RELOAD` 권한이 있어야 실행할 수 있음
    - `--all-databases` option과 같이 사용하는 경우 각 database를 dump할 때마다 flush가 일어남
    - `--lock-all-tables`, `--master-data`, `--single-transaction` option과 같이 실행되는 경우, 정확히 같은 순간에 flush와 dump가 같이 일어나게 됨

- `--flush-privileges`
    - database를 dump한 후, dump file에 `FLUSH PRIVILEGES` 구문을 추가함

- `--lock-all-tables`, `-x`
    - 모든 database의 모든 table들을 lock함
        - dump가 진행되는 동안 global read lock 실행
    - 이 option은 `--single-transaction`과 `--lock-tables` option을 동시에 사용하는 경우, 자동적으로 disable 처리됨
 
- `--lock-tables`, `-l`
    - 각 database를 dump하기 전, 대상 table들을 모두 lock시킴
    - MyISAM table의 경우 concurrent insert를 하기 위해 `READ LOCAL`로 lock을 검
    - InnoDB 같은 transaction을 지원하는 table인 경우 `--single-transaction option`을 사용해야 함
    - transaction을 지원하는 table은 굳이 이 option을 사용하지 않아도 됨
    - 이 option은 database별로 각각 lock tables를 진행하기 때문에 전체 snapshot은 지원하지 않음
        - 각각의 database는 각각 다른 시점의 data를 가지고 있게 됨
    - `--opt` option을 사용하게 되면 자동적으로 `--lock-tables`도 enable됨
        - enable을 원치 않는 경우, `--skip-lock-tables`를 option list의 가장 마지막에 작성하면 됨

- `--no-autocommit`
    - dump하는 각 table의 앞 뒤에 `SET autocommit=0`과 `COMMIT` 구문을 넣음

- `--order-by-primary`
    - data를 primary key 또는 가장 첫 번째 unique index에 맞게 정렬하여 작성함
    - MyISAM이나 InnoDB에서 유용하게 사용됨
    - dump 작업 시간이 길어짐

- `--single-transaction`
    - dump를 하기 전에 transaction isolaton level을 `REPEATABLE READ`로 변경하고, `START TRANSACTION`을 실행함
    - InnoDB와 같은 transaction을 지원하는 table을 dump하기에 좋음
    - block 없이 snapshot data를 dump 할 수 있도록 해줌
    - 이 option은 InnoDB만 snapshot이 가능함
    - 무결한 dump file을 만들기 위해서, 이 option을 사용하여 dump하는 동안 다른 접속을 통해 DDL 작업을 진행해서는 안 됨
    - 이 option은 `--lock -tables`와 함께 사용하면 안 됨
    - data의 크기가 크다면, `--quick` option을 추가하여 사용하는 것이 좋음


## 촐력 포멧 Options

- `--compact`
    - `--skip-add-drop-table`, `--skip-add-locks`, `--skip-comments`, `--skip-disable-keys`, `--skip-set-charset` option들을 enable함

- `--compatible=[name]`
    - 다른 DBMS나 MySQL 이전 version에 맞게 dump file을 만들고자 하는 경우 사용함
        - MySQL : mysql323, mysql40
        - 다른 DBMS : postgresql, oracle, mssql, db2, maxdb
        - 그 외 : ansi, no_key_options, no_table_options, no_field_options
    - 여러 값들을 사용하기 위해, comma로 구분하여 사용
    - 이 option을 사용함으로서 호환성이 보장되는 것은 아니지만, 호환성을 높일 수는 있음

- `--complete-insert`, `-c`
    - `INSERT` 구문 작성시 column 이름을 전부 포함하여 작성

- `--hex-blob`
    - `BINARY`, `VARBINARY`, `BLOB`, `BIT` column에 대해서 값을 명시할 때, hexadecimal 형태로 기술하게 함

- `--quote-names`, `-O`
    - 식별자를 `'`를 사용하여 모두 감쌈
    - `ANSI_QUOTES SQL MODE`인 경우에는 `"`를 사용하여 감쌈
    - enable이 default option


## Replication Option

- `--apply-slave-statements`
    - `--dump-slaveoption` option과 같이 dump하는 경우에 `STOP SLAVE`, `CHANGE MASTER TO`, `START SLAVE` 구문을 같이 작성하게 함

- `--delete-master-logs`
    - master server인 경우, dump받은 후 binary log는 모두 삭제함
    - 자동으로 `--master-data` option을 enable함

- `--dump-slave=[value]`
    - `--master-data` option과 비슷한데, 또 다른 slave server를 만들기 위해 slave server를 dump한다는 점이 다름
    - `CHANGE MASTER TO` 구문을 dump file에 추가함

- `--master-data=[value]`
    - dump 받은 file이 '어느 binary log의 위치까지 사용한 것인지'를 dump file 안에 `CHANGE MASTER` 구문의 형태로 작성함
    - value : `1` or `2` (default는 `1`)
        - `1` : commnet로 남지 않음
        - `2` : comment로 남음
    - 이 option은 `RELOAD` 권한을 가지고 있어야 하고, binary log는 enable되어 있어야 함
        - 만약 binary log를 enable하지 않고 사용한다면 error 발생
    - 자동으로 `--lock-tables` option을 disable함
    - `--single-transaction` option을 사용하더라도, `--lock-all-tables`가 enable됨
        - 원래는 `--single-transaction` option을 사용하면, `--lock-all-tables`가 disable 됨
    - global read lock은 dump를 시작할 때 아주 짧은 시간 동안 걸림

- `--set-qtid-purqed=[value]`
    - global transaction ID(GTID)정보를 dump file에 작성함
    - `SET @@global.gtid purged` 구문으로 작성함
    - value (default는 `AUTO`)
        - `OFF` : Add no SET statement to the output.
        - `ON` : Add a SET statement to the output. An error occurs if GTIDs are not enabled on the server.
        - `AUTO` : Add a SET statement to the output if GTIDs are enabled on the server.


## 그 외 Option

- `--default-character-set=[charset_name]`
    - 기본 character set으로 charset_name을 사용하도록 설정
    - default 갑은 utf8

- `--no-set-names`, `-N`
    - `--set-names` option을 disable함

- `--set-charset`
    - `SET NAMES default_char_set`을 기술함

- `--help`, `-?`
    - 도움말

- `--version`, `-V`
    - version 정보

- `--verbose`, `-v`
    - verbose mode로 이 program의 정보를 자세히 보여줌

- `--force`, `-f`
    - error가 발생해도 계속 작업이 진행되게 함

- `--dump-date`
    - dump file의 생성일자를 comment로 추가함

- `--comments`
    - dump file에 추가적인 정보를 기술함

- `--allow-keywords`
    - column 이름으로 keyword를 사용하는 것을 허용함


## 관련 variables

- `max_allowed_packet`
    - client와 server 사이의 buffer의 max size를 결정하는 variable
    - MySQL과 mysqldump에도 적용됨
    - dump시에 큰 data를 받아야 하는 경우, 이 variable의 값을 크게 늘려줘야 함

- `net_buffer_length`
    - client와 server 사이 buffer의 initial size를 결정하는 variable
    - 여러 data를 하나의 `INSERT` 구문으로 작성하고자 하는 경우 늘려줘야 함



---

# Reference

- https://code-factory.tistory.com/21
    - backup option
