# Debezium Historical Data Capture Configuration Guide

## Overview
Debezium은 기본적으로 커넥터 구동 시점부터의 데이터 변경사항을 캡처합니다. 하지만 특정 과거 시점부터 데이터를 캡처해야 하는 경우가 있습니다. 이 문서에서는 Debezium에서 historical data를 캡처하는 방법을 설명합니다.

## 구성 방법

### 1. Snapshot Mode 설정

#### timestamp 기반 설정
특정 타임스탬프부터 데이터를 캡처하려면 다음과 같이 설정합니다:

```json
{
    "snapshot.mode": "initial",
    "snapshot.from.timestamp": "1642521600000"
}
```

- `snapshot.from.timestamp`: Unix timestamp in milliseconds
- 지정된 시간부터의 변경사항을 캡처합니다
- 타임스탬프는 binary log retention period 내에 있어야 합니다

### 2. 데이터베이스별 상세 설정

#### MySQL 설정
MySQL의 경우 binlog 파일과 position을 직접 지정할 수 있습니다:

```json
{
    "database.history.store.only.monitored.tables.ddl": "true",
    "database.history.skip.unparseable.ddl": "true",
    "database.server.id": "1",
    "database.server.name": "mysql-server-1",
    "database.whitelist": "target_database",
    "snapshot.mode": "schema_only",
    "database.history.mysql.binlog.filename": "mysql-bin.000123",
    "database.history.mysql.binlog.position": "54321"
}
```

주요 설정값 설명:
- `database.history.mysql.binlog.filename`: 시작할 binlog 파일명
- `database.history.mysql.binlog.position`: 시작 위치
- `snapshot.mode`: "schema_only"로 설정하여 스키마만 스냅샷

#### PostgreSQL 설정
PostgreSQL에서는 LSN(Log Sequence Number)을 사용하여 시작 위치를 지정할 수 있습니다:

```json
{
    "snapshot.mode": "custom",
    "snapshot.custom.class": "io.debezium.connector.postgresql.snapshot.FromLSNSnapshot",
    "snapshot.lsn": "0/1234567"
}
```

## 구현 단계

1. 시작 위치 확인
   - MySQL: `SHOW MASTER STATUS` 명령으로 현재 binlog 정보 확인
   - PostgreSQL: `pg_current_wal_lsn()` 함수로 현재 LSN 확인

2. 스키마 상태 검증
   - 선택한 시점의 스키마가 현재 스키마와 호환되는지 확인
   - 필요시 스키마 변경 히스토리 검토

3. 커넥터 설정
   - 데이터베이스 유형에 맞는 설정 적용
   - 필요한 권한 확인 및 부여

4. 모니터링
   - 커넥터 상태 모니터링
   - 데이터 캡처 정상 여부 확인

## 주의사항

1. Binary Log 보존 기간
   - 설정한 시작 시점의 로그가 아직 보존되어 있어야 함
   - 데이터베이스의 log retention policy 확인 필요

2. 성능 고려사항
   - 과거 데이터 양에 따라 초기 캡처 시간이 길어질 수 있음
   - 시스템 리소스 사용량 모니터링 필요

3. 데이터 정합성
   - 스키마 변경이 있었던 경우 주의 필요
   - 필요시 테스트 환경에서 먼저 검증

## 문제 해결

### 일반적인 문제

1. Binary log 없음 오류
   ```
   해결방법:
   - binary log retention period 확인
   - 백업에서 필요한 로그 복구
   ```

2. 스키마 불일치
   ```
   해결방법:
   - 해당 시점의 스키마 복원
   - 현재 스키마와 호환되도록 마이그레이션
   ```

3. 권한 문제
   ```
   해결방법:
   - REPLICATION SLAVE 권한 확인
   - SUPER 또는 REPLICATION_CLIENT 권한 부여
   ```

## 참고 사항

- Debezium 버전별로 지원하는 기능이 다를 수 있으므로 공식 문서 참조 필요
- 대량의 historical data를 캡처할 경우 시스템 부하 고려
- 주기적인 모니터링과 백업 필요