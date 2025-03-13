---
layout: skill
permalink: /301
title: mysqlbinlog - MySQL Binary Log 보기
description: mysqlbinlog는 MySQL의 binary log file을 분석하고 text 형태로 변환해주는 utility 명령어입니다.
date: 2025-03-13
---


## `mysqlbinlog` : MySQL의 Binary Log를 출력하는 명령어

- `mysqlbinlog`는 **MySQL server가 생성한 binary log file**의 내용을 **사람이 읽을 수 있는 형태로 출력**합니다.
    - file을 읽어서 출력하는 것이기 때문에, file system에 대한 접근 권한이 필요합니다.

- 명령어를 사용할 때, binary log file은 용량이 클 수 있으므로 system resource 사용에 주의해야 합니다.
    - 따라서 `mysqlbinlog binlog.000001 > output.sql`처럼, 출력 내용을 file(`output.sql`)로 redirection(`>`)하는 것이 좋습니다.


### MySQL의 Binary Log

- **binary log**는 **database에 변경을 가한 모든 statement나 event를 기록**합니다.
    - INSERT, UPDATE, DELETE와 같은 DML statement를 포함합니다.
    - table 구조 변경과 같은 DDL statement도 포함합니다.

- binary log는 주로 backup 및 복구, replication, point-in-time recovery의 목적으로 사용됩니다.
    - database 장애 후 특정 시점으로 복구(point-in-time recovery)할 때 사용합니다.
    - database 변경 사항을 감시(audit)하거나 debugging할 때 사용합니다.
    - replication 문제 해결을 위한 binary log 내용 확인 과정에서 사용합니다.
    - binary log를 SQL statement로 변환하여 다른 server에 적용할 수 있습니다.


### `mysqlbinlog`의 출력 형식

- `mysqlbinlog`는 binary log를 **text 형태로 출력**합니다.
    - event 시간 정보 , server ID , event 위치 정보 , event 유형 , 실행된 SQL statement나 변경 내용 등의 정보를 포함합니다.

```sql
-- at 4
-- 230101 12:00:00 server id 1  end_log_pos 124 CRC32 0x7d68b0b3  Start: binlog v 4, server v 8.0.28
-- at 124
-- 230101 12:01:00 server id 1  end_log_pos 195 CRC32 0x12a457f9  Query   thread_id=10    exec_time=0    error_code=0
SET TIMESTAMP=1609459260/*!*/;
INSERT INTO mytable VALUES (1, 'example')/*!*/;
```

#### Log에 `/*!*/`가 있는 이유

- MySQL의 binary log(binlog) file에서는 `/*!*/` 구문을 사용하여 각 event를 구분합니다.
    - binary log file을 `mysqlbinlog` 도구로 해석할 때, 표시되는 **구문 종료 표시**입니다.
    - **binlog event의 끝**을 표시하며, **다음 event의 시작**을 나타냅니다.
    - MySQL이 내부적으로 각 binlog event를 구분하기 위해 사용하는 marker입니다.
        - marker는 실제 query 실행 시에는 무시됩니다.

- `/*!*/` 표기를 통해, MySQL은 복제나 복구 과정에서 각 명령문의 경계를 명확히 구분할 수 있습니다.

- binary log의 각 event는 `/*!*/` marker로 끝나며, 다음 event는 새로운 timestamp와 위치 정보로 시작됩니다.


---


## `mysqlbinlog` 사용법

```bash
mysqlbinlog [options] log_file
```

- `mysqlbinlog` 명령어에는 **log file path를 parameter로 전달**하여 binary log 내용을 출력할 수 있습니다.

- 다양한 **option을 사용**하여 특정 시간 범위나 위치 범위, database 등을 지정할 수도 있습니다.

| Option | 설명 |
| --- | --- |
| `--start-datetime` | 특정 시간 이후의 event만 출력 |
| `--stop-datetime` | 특정 시간 이전의 event만 출력 |
| `--start-position`, `-j` | 특정 위치 이후의 event만 출력 |
| `--stop-position` | 특정 위치 이전의 event만 출력 |
| `--short-form`, `-s` | BINLOG statement를 간략하게 출력 |
| `--database`, `-d` | 특정 database의 event만 출력 |
| `--verbose`, `-v` | event에 대한 더 자세한 정보 출력 |
| `--base64-output` | BINLOG statement 출력 방식 제어 |
| `--help` | 도움말 출력 |
| `--version`, `-V` | version 정보 출력 |


### 기본 실행

- binary log file을 parameter로 전달하여 기본적인 binary log 내용을 출력합니다.

```bash
mysqlbinlog /var/lib/mysql/binlog.000001
```


### 특정 시간 범위 지정

- `--start-datetime`, `--stop-datetime` option을 사용하여 특정 시간 범위의 event만 출력할 수 있습니다.

```bash
mysqlbinlog --start-datetime="2023-01-01 00:00:00" --stop-datetime="2023-01-02 00:00:00" /var/lib/mysql/binlog.000001
```


### 특정 위치 범위 지정

- `--start-position`, `--stop-position` option을 사용하여 특정 위치 범위의 event만 출력할 수 있습니다.

```bash
mysqlbinlog --start-position=256 --stop-position=1024 /var/lib/mysql/binlog.000001
```


### 특정 Database 지정

- `--database` option을 사용하여 특정 database의 event만 출력할 수 있습니다.

```bash
mysqlbinlog --database=mydb /var/lib/mysql/binlog.000001
```


### Verbose Mode

- row 기반 replication 형식의 binary log는 해석하기 어려울 수 있으므로, `-v` 또는 `--verbose` option을 사용하는 것이 좋습니다.

```bash
mysqlbinlog -v /var/lib/mysql/binlog.000001
mysqlbinlog --verbose /var/lib/mysql/binlog.000001
```


---


## MySQL Binlog File 경로 확인하기

- `mysqlbinlog` 명령어를 사용하기 위해서는 **binary log file의 경로와 이름**을 알아야 합니다.

- **log file의 경로**와 **현재 활성화된 log file**을 확인하고 조합하여, 전체 경로를 알아낼 수 있습니다.
    1. `log_bin_basename` : binary log file의 기본 경로와 이름을 확인합니다.
    2. `SHOW MASTER STATUS` : 현재 활성화된 binary log file의 이름을 확인합니다.


### 1. Log File 경로 확인

```sql
SHOW VARIABLES LIKE 'log_bin_basename';
```

- `log_bin_basename` 변수의 값을 조회하여, binary log file의 전체 경로와 기본 이름을 확인합니다.

```txt
+------------------+------------------------+
| Variable_name    | Value                  |
+------------------+------------------------+
| log_bin_basename | /var/lib/mysql/binlog  |
+------------------+------------------------+
```

- 결과에서 `/var/lib/mysql/binlog`는 binary log file의 기본 경로와 이름입니다.
- 실제 file은 `binlog.000001`, `binlog.000002` 등의 형식으로 저장됩니다.


### 2. 현재 Binary Log File 확인

```sql
SHOW MASTER STATUS;
```

- `SHOW MASTER STATUS` 명령어를 사용하여 현재 활성화된 binary log file의 이름과 log position를 확인합니다.

```txt
+---------------+----------+--------------+------------------+-------------------+
| File          | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+---------------+----------+--------------+------------------+-------------------+
| binlog.000003 | 1234     |              |                  |                   |
+---------------+----------+--------------+------------------+-------------------+
```

- 결과에서 `binlog.000003`은 현재 활성화된 binary log file일의 이름입니다.
- `Position`은 현재 쓰고 있는 log의 위치를 나타냅니다.


### 추가 확인 : 모든 Log File 목록

```sql
SHOW BINARY LOGS;
```

- 현재 server에 존재하는 모든 binary log file 목록을 확인합니다.

```txt
+---------------+-----------+-----------+
| Log_name      | File_size | Encrypted |
+---------------+-----------+-----------+
| binlog.000001 | 177       | No        |
| binlog.000002 | 1250      | No        |
| binlog.000003 | 1234      | No        |
+---------------+-----------+-----------+
```


### 추가 확인 : MySQL Data Directory

```sql
SHOW VARIABLES LIKE 'datadir';
```

- MySQL data directory 위치를 확인할 수 있습니다.

- binary log file이 기본 경로에 저장된 경우 이 directory에 위치합니다.

```txt
+---------------+----------------+
| Variable_name | Value          |
+---------------+----------------+
| datadir       | /var/lib/mysql/ |
+---------------+----------------+
```

