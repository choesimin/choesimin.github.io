
# KSQL의 Table과 Data Retention 전략

## 1. Non-Windowed Table의 특성

### 기본 정책
- Cleanup Policy가 자동으로 'compact'로 설정됨
- RETENTION_MS가 기본값으로 604800000(7일)로 설정됨
- WITH 절에서 RETENTION_MS를 직접 설정하는 것은 불가능

### 데이터 보관 방식
- Log Compaction이 적용되어 각 키의 최신 상태만 영구 보관
- RETENTION_MS가 7일로 설정되어 있어도, compaction 정책으로 인해 각 키의 최신 데이터는 삭제되지 않음
- 이전 상태 데이터는 삭제될 수 있음

예시:
```sql
CREATE TABLE user_table AS
SELECT * FROM user_raw_stream
GROUP BY id;
```

## 2. Windowed Table의 특성

### 설정 가능한 정책
- WINDOW 절을 사용하여 시간 단위로 데이터 관리
- RETENTION_MS 설정 가능
- Cleanup Policy는 'delete'가 적용됨

### 데이터 보관 방식
- 설정된 RETENTION_MS 기간이 지난 데이터는 완전히 삭제
- 키의 최신 상태도 보존되지 않음
- 순수하게 시간 기반으로 데이터가 관리됨

예시:
```sql
CREATE TABLE chat_table WITH (
    RETENTION_MS = 2592000000  /* 30일 */
) AS
SELECT * FROM chat_raw_stream
WINDOW TUMBLING (SIZE 30 DAYS)
GROUP BY id;
```

## 3. 사용 시나리오

### Non-Windowed Table 적용
- 마스터 데이터나 참조 데이터(예: 사용자 정보, 상품 정보)
- 각 키의 최신 상태만 중요한 경우
- 이력 관리가 필요 없는 경우

### Windowed Table 적용
- 시계열 데이터(예: 채팅 메시지, 로그 데이터)
- 일정 기간 동안만 데이터를 보관하면 되는 경우
- 저장 공간을 효율적으로 관리해야 하는 경우

## 4. 데이터 관리 전략

### 영구 보관이 필요한 경우
- Non-Windowed Table 사용
- Log Compaction으로 최신 상태 유지

### 임시 보관이 필요한 경우
- Windowed Table 사용
- RETENTION_MS로 보관 기간 설정
- 필요시 아카이빙 전략 수립 (예: 오래된 데이터는 다른 저장소로 이관)

### 하이브리드 전략
- 중요 데이터는 Non-Windowed Table로 관리
- 대량의 트랜잭션 데이터는 Windowed Table로 관리
- 필요에 따라 두 테이블을 조인하여 사용

이러한 특성들을 이해하고 적절히 활용하면, 데이터의 특성에 맞는 효율적인 저장 전략을 구현할 수 있습니다.
