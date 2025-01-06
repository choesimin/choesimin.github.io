---
layout: skill
date: 2025-01-06
title: ksqlDB - Stream과 Table
---




## Stream & Table : ksqlDB Data Model

- ksqlDB의 Stream과 Table은 데이터를 처리하는 두 가지 주요 추상화 모델입니다.

| 특성 | Stream | Table |
| --- | --- | --- |
| **데이터 성격** | 이벤트 기반 (Event-based) | 상태 기반 (State-based) |
| **변경 가능성** | 변경 불가능 (Immutable) | 변경 가능 (Mutable) |
| **데이터 저장** | 모든 이벤트 기록 | 각 키의 최신 값만 유지 |
| **지원 연산** | INSERT만 가능 | INSERT, UPDATE, DELETE 가능 |
| **사용 사례** | 트랜잭션 로그, 센서 데이터, 로그 데이터 | 사용자 프로필, 재고 현황, 계좌 잔액 |
| **시간 관점** | 시간에 따른 모든 변경 이력 보존 | 현재 시점의 상태만 표현 |
| **다른 유형으로 변환** | Table로 변환 가능 | Stream으로 변환 불가 |
| **데이터 처리 방식** | 순차적 이벤트 처리 | 상태 업데이트 및 조회 |


### Stream

- 무한히 지속되는 이벤트의 흐름을 나타내며, 시간에 따라 계속 추가되는 변경 불가능한(immutable) 레코드들의 시퀀스입니다.
- 각 레코드는 고유한 타임스탬프를 가지며, 한번 추가된 레코드는 수정되거나 삭제될 수 없습니다.
- 예를 들어, 신용카드 거래 내역, 센서 데이터, 로그 데이터 등이 Stream으로 표현하기 적합합니다.
- INSERT 연산만 가능하며, UPDATE나 DELETE는 지원되지 않습니다.


### Table

- 특정 시점의 상태를 나타내는 뷰로, 각 키에 대한 최신 값을 유지합니다.
- 레코드는 변경 가능(mutable)하며, 동일한 키에 대한 새로운 값이 들어오면 기존 값이 업데이트됩니다.
- 예를 들어, 사용자 프로필, 재고 현황, 계좌 잔액 등이 Table로 표현하기 적합합니다.
- INSERT, UPDATE, DELETE 연산이 모두 가능합니다.





### Stream과 Table의 변환

1. Stream을 Table로 변환 가능:
   ```sql
   -- Stream을 Table로 변환 (집계 예시)
   CREATE TABLE daily_totals AS
       SELECT user_id,
              SUM(amount) AS total_amount
       FROM payment_stream
       WINDOW TUMBLING (SIZE 24 HOURS)
       GROUP BY user_id;
   ```

2. Table을 Stream으로 변환 불가:
   - Table은 상태 기반으로 각 키의 최신 값만 유지
   - Stream은 이벤트 기반으로 모든 변경 이벤트를 순서대로 기록
   - 이러한 근본적인 특성 차이로 인해 Table에서 Stream으로의 변환은 불가능합니다.



