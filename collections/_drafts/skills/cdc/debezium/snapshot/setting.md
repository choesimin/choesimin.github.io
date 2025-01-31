

## Snapshot 설정

- Debezium connector의 설정을 통해 snapshot 동작을 세밀하게 제어할 수 있습니다.
    - snapshot mode, isolation level, lock 전략, filtering, 성능 관련 설정 등이 가능합니다.

- 설정을 통해 snapshot의 성능을 최적화해야 합니다.


### 기본 설정 항목

- `snapshot.mode` : snapshot의 수행 방식을 결정합니다.
    - `initial`, `initial_only`, `never`, `schema_only`, `when_needed`, `custom` 중 선택이 가능합니다.
    - production 환경에서는 `initial` mode가 권장됩니다.

- `snapshot.isolation.mode` : transaction isolation level을 설정합니다.
    - `repeatable_read`, `read_committed`, `read_uncommitted`, `serializable` 중 선택이 가능합니다.
    - database의 종류에 따라 지원되는 level이 다릅니다.

- `snapshot.include.collection.list` : snapshot 대상 table을 지정합니다.
    - regular expression을 사용하여 pattern 지정이 가능합니다.
    - 지정되지 않은 table은 snapshot에서 제외됩니다.


### Lock 설정 항목

- `snapshot.locking.mode` : lock의 사용 방식을 결정합니다.
    - `minimal`은 schema capture 시에만 lock을 사용합니다.
    - `extended`는 전체 snapshot 과정에서 lock을 유지합니다.
    - `none`은 lock을 사용하지 않습니다.

- `snapshot.locking.timeout.ms` : lock 획득 대기 시간을 설정합니다.
    - Millisecond 단위로 설정합니다.
    - 시간 초과 시 snapshot이 실패합니다.


### Filtering 설정 항목

- `snapshot.select.statement.overrides` : custom SELECT query를 지정합니다.
    - table별로 다른 query를 사용할 수 있습니다.
    - WHERE 절을 통해 특정 record만 선택할 수 있습니다.

- `snapshot.maximum.column.length` : column data의 최대 길이를 제한합니다.
    - 지정된 길이를 초과하는 data는 잘라서(truncate) 저장합니다.
    - memory 사용량을 제어할 수 있습니다.


### 성능 관련 설정 항목

- `snapshot.fetch.size` : 한 번에 읽어오는 record 수를 설정합니다.
    - database의 memory 사용량에 영향을 미칩니다.
    - network 대역폭 사용량을 조절할 수 있습니다.

- `snapshot.delay.ms` : snapshot 시작 전 대기 시간을 설정합니다.
    - system 부하가 적은 시간대를 선택할 수 있습니다.
    - cluster 환경에서 node 간 snapshot 시작 시간을 분산시킬 수 있습니다.

- `snapshot.chunk.size` : snapshot의 분할 단위를 설정합니다.
    - 큰 table을 작은 단위로 나누어 처리할 수 있습니다.
    - memory 사용량을 분산시킬 수 있습니다.




---

