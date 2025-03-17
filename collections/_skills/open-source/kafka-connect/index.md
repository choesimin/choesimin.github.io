---
layout: skill
permalink: /
title: Kafka Connect - 
description: Kafka Connect는 Apache Kafka와 다양한 data system 간의 손쉬운 연결을 제공하는 tool입니다.
date: 2025-03-17
published: false
---




## 기본 개념

- Kafka Connect는 Kafka와 외부 system 간의 data 이동을 표준화하고 간소화합니다.
- Kafka Connect는 확장 가능한 plugin 기반 framework로 설계되었습니다.
- Kafka Connect는 독립 실행형(standalone) 또는 분산(distributed) mode로 실행할 수 있습니다.
    - 독립 실행형 mode는 단일 process에서 모든 connector를 실행합니다.
    - 분산 mode는 여러 worker node에 connector task를 분산하여 실행합니다.
- Kafka Connect는 fault-tolerance와 확장성을 제공합니다.
- Kafka Connect는 REST API를 통해 관리 및 모니터링이 가능합니다.

## 주요 구성 요소

- **Connector** : 특정 system과 Kafka 간의 연결을 담당하는 high-level abstraction입니다.
    - Source Connector : 외부 system에서 Kafka로 data를 가져옵니다.
    - Sink Connector : Kafka에서 외부 system으로 data를 내보냅니다.
- **Task** : connector의 실제 data 복사 작업을 수행하는 단위입니다.
    - connector는 여러 task로 분할되어 병렬 처리가 가능합니다.
- **Worker** : connector와 task를 실행하는 process입니다.
- **Converter** : data format 변환을 담당합니다.
    - JSON, Avro, Protobuf 등 다양한 format을 지원합니다.
- **Transform** : data를 변형하는 단순한 logic을 적용할 수 있습니다.
    - field 이름 변경, 특정 field 필터링 등의 작업이 가능합니다.

## 작동 방식

- Source Connector는 외부 system의 data를 주기적으로 polling하거나 변경 사항을 감지합니다.
- 수집된 data는 Kafka topic으로 전송됩니다.
- Sink Connector는 Kafka topic의 data를 구독하여 외부 system에 기록합니다.
- offset 관리는 Kafka Connect가 자동으로 처리합니다.
- connector 구성 정보는 Kafka topic에 저장되어 worker 간에 공유됩니다.

## 장점

- **표준화된 interface** : data 통합을 위한 일관된 방법을 제공합니다.
- **code 없는 data 통합** : 대부분의 경우 custom code 작성 없이 configuration만으로 data 연결이 가능합니다.
- **분산 처리** : 확장성과 fault-tolerance를 제공합니다.
- **monitoring과 관리의 용이성** : REST API를 통해 connector의 상태와 metric을 쉽게 확인할 수 있습니다.
- **다양한 connector 생태계** : 많은 open source 및 상용 connector가 존재합니다.
- **data transformation** : 간단한 transformation을 설정할 수 있습니다.

## 주요 Connector 예시

- **JDBC Connector** : database와 Kafka 간의 data 연결을 제공합니다.
- **Elasticsearch Connector** : Kafka data를 Elasticsearch로 전송합니다.
- **HDFS Connector** : Hadoop HDFS와 Kafka 간의 data 연결을 제공합니다.
- **S3 Connector** : Amazon S3와 Kafka 간의 data 연결을 제공합니다.
- **MongoDB Connector** : MongoDB와 Kafka 간의 data 연결을 제공합니다.
- **Debezium** : database의 변경 data를 capture하여 Kafka로 전송하는 CDC(Change Data Capture) connector입니다.

## 구성 방법

- connector는 key-value 형태의 configuration으로 정의됩니다.
- 주요 설정 항목은 다음과 같습니다:
    - `name` : connector의 고유 이름입니다.
    - `connector.class` : 사용할 connector의 class 이름입니다.
    - `tasks.max` : 최대 task 수를 지정합니다.
    - `key.converter`, `value.converter` : data의 직렬화/역직렬화 format을 지정합니다.
    - connector 특정 configuration : 각 connector에 따라 다른 추가 설정이 필요합니다.

## 실행 예시

```bash
# standalone mode 실행
bin/connect-standalone.sh config/connect-standalone.properties connector1.properties

# distributed mode 실행
bin/connect-distributed.sh config/connect-distributed.properties
```

## REST API 사용 예시

```bash
# connector 목록 조회
curl -X GET http://localhost:8083/connectors

# 새 connector 생성
curl -X POST -H "Content-Type: application/json" --data @connector-config.json http://localhost:8083/connectors

# connector 상태 확인
curl -X GET http://localhost:8083/connectors/my-connector/status
```

## 사용 사례

- **Data Integration** : 다양한 data source의 통합과 ETL(Extract, Transform, Load) 작업에 활용됩니다.
- **실시간 data pipeline** : 실시간 data 처리 및 분석을 위한 pipeline 구축에 사용됩니다.
- **Change Data Capture** : database의 변경 사항을 실시간으로 탐지하고 전파하는 데 활용됩니다.
- **Event Sourcing** : event 기반 architecture에서 다양한 system 간 event 전파에 활용됩니다.
- **Cloud Migration** : on-premise에서 cloud로의 data 이전 과정에서 활용됩니다.