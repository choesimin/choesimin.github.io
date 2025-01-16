---
layout: skill
title: ksqlDB Window - 시간 기준으로 데이터 그룹 만들기
date: 2025-01-16
---




## ksqlDB Window

- Window는 시간을 기준으로 데이터를 그룹화하는 방법입니다.

- Window를 통해 무한한 스트림 데이터를 유한한 시간 단위로 나누어 분석할 수 있게 됩니다.
    - 스트리밍 데이터는 계속해서 들어오기 때문에, 특정 시점의 집계나 분석이 어렵습니다.
    - Window는 이렇게 실시간으로 흘러들어오는 데이터 스트림을 시간 단위로 잘라서 분석할 수 있게 해줍니다.
    - 예를 들어, "최근 1시간 동안의 주문량은 얼마인가?", "지난 30분간 가장 많이 팔린 상품은?" 등의 질문에 답하기 위해서는 시간을 기준으로 데이터를 나누어 처리해야 합니다.

- Window는 시간 범위, 시작/종료 시간, 데이터 그룹로 이루어집니다.??????????????
    1. 시간 범위 : 각 Window가 포함하는 시간의 길이.
    2. 시작/종료 시간 : Window의 경계를 나타내는 시점.
    3. 데이터 그룹화 : 해당 시간 범위에 속하는 데이터들의 모음.




---



## Window의 종류


### 1. Tumbling Window (고정 크기 윈도우)

고정된 크기로 시간을 나누어 데이터를 처리하는 윈도우 타입입니다. 시계처럼 일정한 간격으로 구간을 나누며, 각 구간은 서로 겹치지 않습니다.

주요 특징:
- 모든 윈도우의 크기가 동일하며 연속적입니다
- 한 이벤트는 반드시 하나의 윈도우에만 속합니다
- 시작 시간과 종료 시간이 명확합니다
- 메모리 사용이 효율적입니다

활용 사례: - 시간당 판매량 집계
- 일일 사용자 접속 통계
- 주간/월간 리포트 생성

```sql
-- 기본 문법
SELECT column_name, aggregate_function
FROM stream_name
WINDOW TUMBLING (SIZE size [GRACE PERIOD duration])
GROUP BY column_name;

-- 예시: 5분마다 상품별 판매량 집계
SELECT itemId, COUNT(*) as sales_count,
       WINDOWSTART as window_start, 
       WINDOWEND as window_end
FROM orders
WINDOW TUMBLING (SIZE 5 MINUTES, GRACE PERIOD 10 MINUTES)
GROUP BY itemId;
```


### 2. Hopping Window (홉핑 윈도우)

일정 크기의 윈도우가 지정된 간격으로 이동하면서 데이터를 처리합니다. Tumbling Window와 달리 윈도우가 겹칠 수 있어 더 세밀한 분석이 가능합니다.

주요 특징:
- 윈도우 크기(SIZE)와 이동 간격(ADVANCE BY)을 별도로 지정합니다
- 하나의 이벤트가 여러 윈도우에 포함될 수 있습니다
- 겹치는 구간에 대한 분석이 가능합니다
- Tumbling Window보다 더 많은 메모리를 사용합니다

활용 사례:
- 실시간 트렌드 분석
- 이동 평균 계산
- 연속적인 패턴 감지

```sql
-- 기본 문법
SELECT column_name, aggregate_function
FROM stream_name
WINDOW HOPPING (
    SIZE size, 
    ADVANCE BY advance_by 
    [GRACE PERIOD duration]
)
GROUP BY column_name;

-- 예시: 5분 윈도우를 1분마다 이동하며 판매량 집계
SELECT itemId, COUNT(*) as sales_count,
       WINDOWSTART as window_start, 
       WINDOWEND as window_end
FROM orders
WINDOW HOPPING (
    SIZE 5 MINUTES, 
    ADVANCE BY 1 MINUTE, 
    GRACE PERIOD 10 MINUTES
)
GROUP BY itemId;
```


### 3. Session Window (세션 윈도우)

사용자의 활동 패턴에 따라 동적으로 윈도우가 생성되는 타입입니다. 지정된 시간 동안 활동이 없으면 세션이 종료되고, 새로운 활동이 시작되면 새 세션이 시작됩니다.

주요 특징:
- 활동 기반으로 윈도우가 동적 생성됩니다
- 세션 간격(gap)으로 세션을 구분합니다
- 윈도우 크기가 가변적입니다
- 사용자 행동 분석에 적합합니다

활용 사례:
- 웹사이트 사용자 세션 분석
- 사용자 참여도 측정
- 장바구니 분석

```sql
-- 기본 문법
SELECT column_name, aggregate_function
FROM stream_name
WINDOW SESSION (
    duration 
    [GRACE PERIOD duration]
)
GROUP BY column_name;

-- 예시: 30분 간격으로 사용자별 세션 분석
SELECT userId, 
       COUNT(*) as event_count,
       WINDOWSTART as session_start,
       WINDOWEND as session_end
FROM user_actions
WINDOW SESSION (
    30 MINUTES,
    GRACE PERIOD 10 MINUTES
)
GROUP BY userId;
```

### 4. Sliding Window (슬라이딩 윈도우)

실시간으로 연속적으로 이동하는 윈도우 타입입니다. 새로운 이벤트가 발생할 때마다 윈도우가 이동하며, 실시간 분석에 매우 적합합니다.

주요 특징:
- 이벤트 발생마다 윈도우가 연속적으로 이동합니다
- 실시간 집계가 가능합니다
- 가장 최신의 데이터에 중점을 둡니다
- 리소스 사용량이 높을 수 있습니다

활용 사례:
- 실시간 주가 이동평균 계산
- 센서 데이터 모니터링
- 실시간 이상 감지

```sql
-- 기본 문법
CREATE TABLE sliding_average AS
SELECT column_name,
       aggregate_function
FROM stream_name
WHERE WINDOWSTART >= (WINDOWEND - duration);

-- 예시: 최근 5분간의 이동 평균 계산
CREATE TABLE moving_average AS
SELECT itemId,
       AVG(price) as avg_price,
       COUNT(*) as trade_count
FROM trades
WHERE WINDOWSTART >= (WINDOWEND - INTERVAL '5' MINUTES)
EMIT CHANGES;
```





---







## ksqlDB Window의 공통 옵션

- Window의 공통 옵션들을 적절히 조합하여 사용하면 더욱 효과적인 윈도우 처리가 가능합니다.

```sql
-- 시간 단위
[SIZE|DURATION] n (MILLISECONDS|SECONDS|MINUTES|HOURS|DAYS)

-- Grace Period
GRACE PERIOD n (MILLISECONDS|SECONDS|MINUTES|HOURS|DAYS)

-- Retention Period (테이블 생성시)
CREATE TABLE table_name
    WITH (WINDOW_RETENTION_MS = n)
AS SELECT ...
```


### 1. 시간 단위 (Time Units)

- 시간을 지정할 때 사용할 수 있는 단위들입니다.

```sql
-- 시간 단위 지정 문법
[SIZE|DURATION] n (MILLISECONDS|SECONDS|MINUTES|HOURS|DAYS)
```

- MILLISECONDS: 밀리초 단위 (1/1000초)
- SECONDS: 초 단위
- MINUTES: 분 단위
- HOURS: 시간 단위
- DAYS: 일 단위


### 2. Grace Period (유예 기간)

- 늦게 도착하는 데이터를 처리하기 위한 추가 시간을 설정합니다.

```sql
-- Grace Period 설정 문법
GRACE PERIOD n (MILLISECONDS|SECONDS|MINUTES|HOURS|DAYS)

-- 예시: 10분의 유예 기간 설정
SELECT *
FROM stream_name
WINDOW TUMBLING (
    SIZE 5 MINUTES,
    GRACE PERIOD 10 MINUTES
);
```


### 3. Retention Period (보존 기간)

- 윈도우 결과를 얼마나 오래 유지할지 설정합니다.

```sql
-- Retention Period 설정 문법
CREATE TABLE table_name
  WITH (WINDOW_RETENTION_MS = n)
AS SELECT ...

-- 예시: 7일간 데이터 보존
CREATE TABLE weekly_stats
  WITH (WINDOW_RETENTION_MS = 604800000)  -- 7일을 밀리초로 표현
AS SELECT ...
```


### 4. Window Bounds

- 윈도우의 시작과 끝 시간을 참조할 수 있습니다.

```sql
-- Window Bounds 참조 문법
WINDOWSTART   -- 윈도우 시작 시간
WINDOWEND     -- 윈도우 종료 시간

-- 예시: 윈도우 경계 정보 포함
SELECT 
    WINDOWSTART as start_time,
    WINDOWEND as end_time,
    COUNT(*) as event_count
FROM stream_name
WINDOW TUMBLING (SIZE 5 MINUTES)
GROUP BY WINDOWSTART, WINDOWEND;
```


### 5. Timestamp 설정

- 이벤트 시간을 기준으로 윈도우를 생성할 때 사용합니다.

```sql
-- Timestamp 컬럼 지정 문법
CREATE STREAM stream_name (
    ...,
    event_time TIMESTAMP
) WITH (
    TIMESTAMP = 'event_time'
);

-- 예시: 특정 포맷의 타임스탬프 처리
CREATE STREAM orders (
    order_id STRING,
    order_time TIMESTAMP
) WITH (
    KAFKA_TOPIC = 'orders',
    VALUE_FORMAT = 'JSON',
    TIMESTAMP = 'order_time'
);
```


### 6. 집계 함수 옵션

- 윈도우와 함께 사용할 수 있는 집계 함수들입니다.

```sql
-- 주요 집계 함수
COUNT(*)
SUM(column)
AVG(column)
MIN(column)
MAX(column)
TOPK(column, k)
BOTTOMK(column, k)

-- 예시: 다양한 집계 함수 활용
SELECT 
    itemId,
    COUNT(*) as total_count,
    SUM(amount) as total_amount,
    AVG(price) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price,
    TOPK(price, 3) as top_3_prices
FROM orders
WINDOW TUMBLING (SIZE 1 HOUR)
GROUP BY itemId;
```

### 7. 파티션 키 설정

- 성능 최적화를 위한 파티션 키를 지정할 수 있습니다.

```sql
-- 파티션 키 설정 문법
CREATE STREAM stream_name (
    ...,
    partition_key STRING KEY
) WITH (
    KAFKA_TOPIC = 'topic_name',
    VALUE_FORMAT = 'FORMAT_NAME',
    KEY = 'partition_key'
);

-- 예시: 사용자 ID를 파티션 키로 사용
CREATE STREAM user_events (
    user_id STRING KEY,
    event_type STRING,
    event_time TIMESTAMP
) WITH (
    KAFKA_TOPIC = 'user_events',
    VALUE_FORMAT = 'JSON',
    KEY = 'user_id'
);
```




---




## Reference

- <https://ojt90902.tistory.com/1206>

