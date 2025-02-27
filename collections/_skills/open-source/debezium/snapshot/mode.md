---
layout: skill
title: Debezium Snapshot Mode - DB 복제 방식
date: 2025-02-03
---


## Snapshot Mode로 Database 복제 방식 설정하기

- `snapshot.mode`는 Debezium이 **connector 시작 시 수행할 snapshot의 기준을 지정하는 설정**입니다.
    - snapshot은 database의 구조와 data를 복제하는 작업입니다.
    - snapshot이 완료된 후에는 database의 변경 사항을 stream 형태로 전달합니다.

| Mode | Snapshot 실행 조건 | Schema 복제 | Data 복제 | Stream 처리 |
| --- | --- | --- | --- | --- |
| `always` | connector 시작 시마다 | O | O | O |
| `initial` | offset이 없는 경우 | O | O | O |
| `initial_only` | offset이 없는 경우 | O | O | X |
| `no_data` | connector 시작 시마다 | O | X | O |
| `when_needed` | offset이나 log 위치 사용 불가 시 | O | O | O |
| `configuration_based` | 설정에 따라 결정 | 설정에 따라 결정 | 설정에 따라 결정 | 설정에 따라 결정 |
| `custom` | 구현에 따라 결정 | 구현에 따라 결정 | 구현에 따라 결정 | 구현에 따라 결정 |
| `recovery` | schema history topic 복구 시 | O | X | O |

- database마다 지원하는 mode가 다르며, 일부 database는 특정 mode를 지원하지 않아 사용 시 주의가 필요합니다.


### Always Mode : `always`

- **connector가 시작할 때마다 snapshot을 수행**합니다.
    - table의 구조와 data를 모두 snapshot에 포함합니다.
    - snapshot이 완료된 후 변경 사항을 stream으로 전달합니다.

| 구분 | 내용 |
| --- | --- |
| **장점** | database의 현재 상태를 정확하게 복제, data 불일치 문제를 connector 재시작으로 해결 |
| **단점** | connector 시작마다 전체 복제로 인한 시간 소요, database 부하 증가, 대용량 database에 부적합 |
| **적합**한 상황 | 정확성이 중요한 소규모 database, 주기적인 전체 동기화가 필요한 경우 |
| **부적합**한 상황 | 대용량 database, 높은 가용성이 요구되는 환경, 실시간 처리가 중요한 경우 |


### Initial Mode : `initial`

- **connector가 처음 시작할 때만 snapshot을 수행**합니다.
    - offset이 기록되어 있지 않은 경우에만 snapshot을 수행합니다.
    - 대부분의 database에서 기본값으로 설정되어 있습니다.

| 구분 | 내용 |
| --- | --- |
| **장점** | 최초 한 번만 전체 snapshot 수행, database 부하 최소화, offset 기반 안정적 동기화 |
| **단점** | offset 손실 시 전체 재수행 필요, data 불일치 수동 해결 필요 |
| **적합**한 상황 | 대부분의 일반적인 CDC 환경, 안정적인 운영이 필요한 경우 |
| **부적합**한 상황 | 주기적인 전체 동기화가 필요한 경우, offset 관리가 어려운 환경 |


### Initial Only Mode : `initial_only`

- **connector가 시작할 때 snapshot만 수행하고 종료**합니다.
    - database의 변경 사항은 전달하지 않습니다.

| 구분 | 내용 |
| --- | --- |
| **장점** | 특정 시점 data 복제 가능, migration이나 backup에 적합 |
| **단점** | 실시간 동기화 불가, CDC 기능 사용 불가 |
| **적합**한 상황 | 일회성 data 복제, 전체 backup이 필요한 경우 |
| **부적합**한 상황 | 실시간 data 동기화가 필요한 경우, CDC가 필요한 환경 |


### No Data Mode : `no_data`

- **table의 구조만 snapshot으로 복제**합니다.
    - data는 snapshot에 포함하지 않습니다.
    - `schema_only` mode의 대체 mode입니다.

| 구분 | 내용 |
| --- | --- |
| **장점** | schema 동기화만 수행하여 부하 최소화, 불필요한 data 복제 방지 |
| **단점** | 기존 data 없이 변경 사항만 추적, 완전한 database 상태 구성 불가 |
| **적합**한 상황 | schema 변경 추적만 필요한 경우, database 부하를 최소화해야 하는 경우 |
| **부적합**한 상황 | 전체 data 동기화가 필요한 경우, 완전한 database 상태가 필요한 경우 |


### When Needed Mode : `when_needed`

- **offset을 찾을 수 없거나 기존의 log 위치를 사용할 수 없는 경우에만 snapshot을 수행**합니다.

| 구분 | 내용 |
| --- | --- |
| **장점** | 자동 문제 감지 및 복구, database 부하 최소화와 안정적 동기화 |
| **단점** | 예기치 않은 전체 snapshot 발생 가능, snapshot 시점 예측 어려움 |
| **적합**한 상황 | 자동 복구가 필요한 환경, 안정적인 운영이 중요한 경우 |
| **부적합**한 상황 | 정확한 snapshot 시점 제어가 필요한 경우, 예측 가능한 동작이 중요한 경우 |


### Configuration Based Mode : `configuration_based`

- **`snapshot.mode.configuration.based` prefix를 갖는 설정으로 snapshot 동작을 제어**합니다.

| 구분 | 내용 |
| --- | --- |
| **장점** | 유연한 정책 설정 가능, table별 최적화된 복제 전략 수립 가능 |
| **단점** | 복잡한 설정과 관리, 잘못된 설정으로 인한 문제 발생 가능 |
| **적합**한 상황 | 복잡한 snapshot 요구 사항, table별 다른 정책이 필요한 경우 |
| **부적합**한 상황 | 단순한 복제 환경, 관리 resource가 제한된 경우 |


### Custom Mode : `custom`

- **`snapshot.mode.custom.name` 설정으로 custom snapshot mode를 지정**할 수 있습니다.
    - `io.debezium.spi.snapshot.Snapshotter` interface를 구현하여 사용합니다.

| 구분 | 내용 |
| --- | --- |
| **장점** | 특수 요구 사항 구현 가능, 기존 mode로 해결 불가능한 문제 해결 |
| **단점** | 구현과 유지 보수 부담, 잘못된 구현으로 인한 문제 발생 가능 |
| **적합**한 상황 | 매우 특수한 복제 요구 사항, 기존 mode로 해결 불가능한 경우 |
| **부적합**한 상황 | 표준적인 복제 환경, 개발 resource가 제한된 경우 |


### Recovery Mode : `recovery`

- **database schema history topic이 손실되거나 손상된 경우에만 사용하는 특수 목적의 mode**입니다.
    - connector 재시작 시 source table에서 topic을 재구성합니다.
    - 예기치 않게 증가하는 database schema history topic을 정리할 때도 사용할 수 있습니다.
    - 일반적인 data나 schema 복제 과정에서는 사용하면 안 됩니다.
    - 마지막 connector 종료 후 schema 변경이 있는 경우에는 사용하면 안 됩니다.

| 구분 | 내용 |
| --- | --- |
| **장점** | schema history topic 복구 가능, topic size 관리 가능 |
| **단점** | 일반 복제 과정 사용 불가, schema 변경 후 사용 불가 |
| **적합**한 상황 | schema history topic 손상 복구, topic size 정리가 필요한 경우 |
| **부적합**한 상황 | 일반적인 data 복제, schema가 변경된 환경 |


---


## Database별 예외 사항

| Database | 지원하지 않는 Mode | 특이 사항 |
| --- | --- | --- |
| **PostgreSQL** | - | `no_data`는 WAL 참조 가능 시에만 사용 |
| **MongoDB** | `schema_only_recovery`, `recovery` | schema history topic 미사용 |
| **Cassandra** | `initial_only`, `no_data`, `when_needed`, `configuration_based`, `custom`, `recovery` | `INITIAL`, `ALWAYS`, `NEVER`만 지원 |
| **Vitess** | `always`, `initial_only`, `no_data`, `when_needed`, `configuration_based`, `custom`, `recovery` | `initial`, `never`만 지원 |
| **Spanner** | 전체 | snapshot mode 미지원 |


### PostgreSQL

- 모든 snapshot mode를 지원하지만 `no_data` mode는 제한 사항이 있습니다.

#### PostgreSQL의 `no_data` mode 사용 조건

- WAL(Write-Ahead Log)을 통해 모든 data를 참조할 수 있어야 합니다.
    - offset이 저장되어 있다면 해당 위치부터 stream을 시작합니다.
    - offset이 없다면 PostgreSQL logical replication slot이 생성된 시점부터 stream을 시작합니다.
    - WAL retention 기간이 충분히 길어야 합니다.


### MongoDB

- schema 기반 mode를 지원하지 않습니다.
    - MongoDB는 schema-less database이므로 schema history topic을 사용하지 않습니다.
    - `schema_only_recovery`와 `recovery` mode를 지원하지 않습니다.


### Cassandra

- 제한된 snapshot mode만 지원합니다.
    - `INITIAL` : connector 최초 시작 시에만 snapshot 수행.
    - `ALWAYS` : connector 시작 시마다 snapshot 수행.
    - `NEVER` : snapshot을 수행하지 않고 변경 사항만 stream으로 전달.


### Vitess

- 기본적인 snapshot mode만 지원합니다.
    - `initial` : connector 최초 시작 시에만 snapshot 수행.
    - `never` : snapshot을 수행하지 않고 binary log의 작업만 stream으로 전달.


### Spanner

- snapshot mode를 지원하지 않습니다.
    - Google Cloud Spanner의 특성상 별도의 snapshot 기능이 필요하지 않습니다.
