---
layout: skill
title: ksqlDB
date: 2025-01-02
---




## ksqlDB : Streaming Database

- ksqlDB는 Apache Kafka를 위한 스트리밍 데이터베이스이자 이벤트 스트리밍 플랫폼으로, 스트림 처리와 실시간 분석을 위한 강력한 도구입니다.
- SQL과 유사한 문법을 사용하여 스트리밍 데이터를 쉽게 처리할 수 있게 해주는 시스템입니다.
- ksqlDB를 사용하면 복잡한 스트리밍 애플리케이션을 간단한 SQL 문으로 구현할 수 있어, 개발자의 생산성을 크게 향상시킬 수 있습니다.
- ksqlDB는 Kafka의 스트림 데이터를 처리하고, 이를 통해 실시간으로 데이터를 분석하고 처리할 수 있습니다.


### 주요 특징

- 스트림 처리를 위한 SQL 스타일 인터페이스
- 실시간 데이터 처리 및 분석
- Kafka와의 원활한 통합
- 상태 저장 스트림 처리
- 이벤트 기반 애플리케이션 개발 지원


### 주요 개념

#### KSQL

- ksqlDB에서 사용하는 SQL 스타일의 쿼리 언어입니다.


#### 스트림 (Stream)

- ksqlDB에서 데이터는 스트림(Stream) 단위로 처리됩니다.
- 스트림은 Kafka 토픽의 메시지 스트림을 나타내며, 실시간으로 데이터가 추가되는 무한한 시퀀스입니다.
- 스트림은 데이터의 흐름을 나타내며, 이를 통해 실시간으로 데이터를 처리하고 분석할 수 있습니다.

#### 테이블 (Table)

- 테이블(Table)은 스트림의 상태를 나타내는 뷰(View)입니다.
- 스트림의 데이터를 테이블 형태로 변환하여 상태를 유지하고, 이력을 추적할 수 있습니다.
- 테이블은 스트림의 데이터를 쿼리하여 실시간으로 조회하거나 분석할 수 있습니다.


## 주요 용어

- **kSQL CLI** : ksqlDB의 명령줄 인터페이스 도구
- **kSQLDB UI** : ksqlDB의 웹 기반 사용자 인터페이스
- **kSQLDB REST API** : ksqlDB의 REST API
- **kSQLDB Streams** : ksqlDB에서 처리되는 데이터 스트림
- **kSQLDB Tables** : ksqlDB에서 처리되는 데이터 테이블
- **kSQLDB Connectors** : ksqlDB와 외부 시스템 간의 연결을 위한 플러그인
- **kSQLDB UDFs** : 사용자 정의 함수 (User-Defined Functions)
- **kSQLDB UDAFs** : 사용자 정의 집계 함수 (User-Defined Aggregate Functions)



