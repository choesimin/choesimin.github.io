---
layout: note
permalink: /11
title: ksqlDB Value Format - Data 직렬화 방식
description: ksqlDB의 Value Format을 설정하여, Data를 직렬화하고 역직렬화하는 방식을 결정할 수 있습니다.
date: 2025-01-13
---


## Value Format : ksqlDB에서 Data를 직렬화하고 역직렬화하는 방식

- ksqlDB의 Value format은 **data가 어떻게 저장/전송/처리되는지를 결정하는 설정**입니다.
- value format은 크게 **JSON, AVRO, PROTOBUF**로 나뉩니다.
    - JSON, AVRO, PROTOBUF 모두 ksqlDB에 종속된 것이 아닌, 별개의 data 처리 format/system입니다.
    - ksqlDB에서 지원하는 data 형식이 JSON, AVRO, PROTOBUF일 뿐입니다.

| 특징 | JSON | AVRO | PROTOBUF |
| --- | --- | --- | --- |
| **개발사** | - | Apache | Google |
| **형식** | Text | Binary | Binary |
| **가독성** | 매우 높음 | 낮음 | 낮음 |
| **Schema Registry** | 불필요 | 필수 | 필수 |
| **Data 크기** | 큼 | 작음 | 매우 작음 |
| **설정 복잡도** | 낮음 | 중간 | 높음 |
| **Schema 관리** | 수동 | 자동화 | 자동화 |
| **Type 검증** | 느슨함 | 엄격함 | 매우 엄격함 |
| **성능** | 낮음 | 높음 | 매우 높음 |
| **학습 곡선** | 낮음 | 중간 | 높음 |
| **Code 생성** | 미지원 | 지원 | 강력 지원 |
| **주요 장점** | 직관적, 설정 간단, 유연한 구조, 범용성 | 자동 schema 관리, version 관리, 호환성 check, 우수한 성능 | 최고 성능, 최소 data 크기, 다양한 언어 지원, 엄격한 type check |
| **주요 단점** | 큰 용량, 수동 schema 관리, 낮은 성능, parsing overhead | registry server 필수, 복잡한 초기 설정, 운영 비용, 낮은 가독성 | 복잡한 설정/관리, 가파른 학습 곡선, registry 필수, 낮은 가독성 |
| **권장 사용 환경** | 개발/Test 환경, 잦은 구조 변경, 소규모 data | 운영 환경, 체계적 schema 관리, 대용량 data | 극도의 성능 필요, 다중 언어 환경, 대규모 data |

- ksqlDB에서 **Value Format은 Stream과 Table에 대해 지정**할 수 있습니다.
    - `CREATE STREAM` 또는 `CREATE TABLE` 문의 `WITH` 절에서 `VALUE_FORMAT` 속성에 `'JSON'`, `'AVRO'`, `'PROTOBUF'` 중 하나를 지정하면 됩니다.

```sql
-- Stream 생성 시
CREATE STREAM stream_name (
    field1 INTEGER,
    field2 STRING
) WITH (
    KAFKA_TOPIC = 'topic_name',
    VALUE_FORMAT = 'JSON'    -- 또는 'AVRO', 'PROTOBUF'
);

-- Table 생성 시
CREATE TABLE table_name (
    field1 INTEGER,
    field2 STRING
) WITH (
    KAFKA_TOPIC = 'topic_name',
    VALUE_FORMAT = 'JSON'    -- 또는 'AVRO', 'PROTOBUF'
);
```


### JSON (JavaScript Object Notation)

- JSON은 key-value 쌍으로 이루어진 text 기반의 data format입니다.

```json
{
  "string_value": "Hello World",
  "number_value": 42,
  "boolean_value": true,
  "null_value": null,
  "array_value": [1, 2, 3],
  "object_value": {
    "nested": "value"
  }
}
```

#### JSON의 특징

- data가 **text 형식으로 저장**됩니다.
- **중괄호(`{}`)로 객체를 표현하고, 대괄호(`[]`)로 배열을 표현**합니다.
- **key는 반드시 문자열**이어야 합니다.
- 값은 문자열, 숫자, 객체, 배열, boolean, null이 가능합니다.

#### JSON의 장점

- **사람이 읽고 쓰기 쉽습니다.**
    - text editor로 직접 내용 확인이 가능합니다.
    - debugging이 용이합니다.

- **설정이 매우 간단합니다.**
    - schema registry가 필요하지 않습니다.
    - 추가 service 구성이 불필요합니다.

- **유연한 schema 변경이 가능합니다.**
    - field 추가/삭제가 자유롭습니다.
    - 하위 호환성 걱정이 없습니다.

- **개발 도구 지원이 풍부합니다.**
    - 대부분의 programming 언어에서 기본 지원합니다.
    - 다양한 JSON 처리 library가 존재합니다.

#### JSON의 단점

- **data 용량이 큽니다.**
    - 모든 field명이 문자열로 반복 저장됩니다.
    - 공백, 따옴표 등 부가적인 문자가 포함됩니다.

- **schema 관리가 어렵습니다.**
    - 명시적인 schema 정의가 없습니다.
    - version 관리가 수동으로 이루어져야 합니다.
    - type 불일치 문제가 runtime에 발견됩니다.

- **성능상의 제약이 있습니다.**
    - 매번 parsing 작업이 필요합니다.
    - 대량의 data 처리 시 CPU 사용량이 증가합니다.

- **data 정합성 검증이 어렵습니다.**
    - 필수 field check가 runtime에 이루어집니다.
    - type 검증이 느슨합니다.


### AVRO (Apache Avro)

- AVRO는 compact한 직렬화와 풍부한 data 구조를 제공하는 format입니다.

```avro
{
  "type": "record",
  "name": "Example",
  "fields": [
    {"name": "string_value", "type": "string"},
    {"name": "number_value", "type": "int"},
    {"name": "boolean_value", "type": "boolean"},
    {"name": "array_value", "type": {"type": "array", "items": "int"}},
    {"name": "object_value", "type": {
      "type": "record",
      "name": "NestedObject",
      "fields": [
        {"name": "nested", "type": "string"}
      ]
    }}
  ]
}
```

#### AVRO의 특징

- **schema가 JSON으로 정의**됩니다.
- **data는 binary 형식으로 저장**됩니다.
- **schema version 관리를 지원**합니다.
- **동적/정적 type binding이 모두 가능**합니다.

#### AVRO의 장점

- **효율적인 data 저장이 가능합니다.**
    - schema를 별도로 관리하여 중복을 제거합니다.
    - binary 형식으로 저장하여 용량이 작습니다.
    - field 이름을 index로 대체하여 저장합니다.

- **체계적인 schema 관리를 제공합니다.**
    - schema registry를 통한 중앙 관리가 가능합니다.
    - schema version 간 호환성을 자동으로 확인합니다.
    - schema 변경 이력을 추적할 수 있습니다.

- **data type 안정성이 보장됩니다.**
    - compile 시점에 type check가 가능합니다.
    - 필수 field 누락을 사전에 방지합니다.
    - 잘못된 data 형식을 즉시 발견할 수 있습니다.

- **성능이 우수합니다.**
    - 직렬화/역직렬화 속도가 빠릅니다.
    - schema caching으로 반복 작업을 최소화합니다.
    - network 대역폭 사용이 효율적입니다.

#### AVRO의 단점

- **초기 설정이 복잡합니다.**
    - schema registry server 구축이 필요합니다.
    - schema 정의 file을 관리해야 합니다.
    - 개발자들의 추가 학습이 필요합니다.

- **운영 부담이 있습니다.**
    - schema registry server를 관리해야 합니다.
    - schema 변경 시 호환성 검토가 필요합니다.
    - version 관리에 주의가 필요합니다.

- **debugging이 어렵습니다.**
    - binary data를 직접 읽을 수 없습니다.
    - 전용 도구가 필요합니다.
    - log 분석이 JSON보다 복잡합니다.


### PROTOBUF (Protocol Buffers)

- PROTOBUF는 Google이 개발한 언어 중립적인 data 직렬화 format입니다.

```protobuf
// Protocol Buffer
message Example {
  string string_value = 1;
  int32 number_value = 2;
  bool boolean_value = 3;
  repeated int32 array_value = 4;
  message NestedObject {
    string nested = 1;
  }
  NestedObject object_value = 5;
}
```

#### PROTOBUF의 특징

- **`.proto` file에 schema를 정의**합니다.
- **binary 형식으로 data를 저장**합니다.
- **자동화된 code 생성을 지원**합니다.
- **IDL(Interface Definition Language)을 제공**합니다.

#### PROTOBUF의 장점

- **data 크기가 가장 작습니다.**
    - 최적화된 encoding 방식을 사용합니다.
    - field 번호로 식별자를 대체합니다.
    - 불필요한 metadata를 제거합니다.

- **다양한 programming 언어를 지원합니다.**
    - 언어별 native code를 생성합니다.
    - RPC(Remote Procedure Call) 지원이 내장되어 있습니다.
    - cross platform 호환성이 우수합니다.

- **성능이 매우 우수합니다.**
    - parsing overhead가 최소화됩니다.
    - memory 사용이 효율적입니다.
    - network 전송이 빠릅니다.

#### PROTOBUF의 단점

- **설정이 가장 복잡합니다.**
    - `.proto` file 작성이 필요합니다.
    - code 생성 단계가 build 과정에 포함되어야 합니다.
    - schema registry 구성이 필요합니다.

- **학습 곡선이 가파릅니다.**
    - Proto3 문법을 익혀야 합니다.
    - code 생성 도구 사용법을 알아야 합니다.
    - version 관리 전략을 수립해야 합니다.

- **data 확인이 어렵습니다.**
    - binary 형식이라 직접 읽을 수 없습니다.
    - debugging 도구가 제한적입니다.
    - logging과 monitoring이 복잡합니다.


---


## Value Format 선택 기준

- **JSON은 빠른 개발과 간단한 운영이 필요한 소규모 project**에, **AVRO는 안정적인 production 환경의 대용량 data 처리**에, **PROTOBUF는 극도의 성능과 type 안정성이 필요한 대규모 다중 언어 system**에 적합합니다.


### JSON을 선택해야 하는 경우

- 빠른 prototyping이 필요한 경우.
- 개발/Test 환경을 구축하는 경우.
- data 구조가 자주 변경되는 경우.
- 운영 복잡도를 최소화하고 싶은 경우.
- debugging과 data 확인이 빈번한 경우.
- 소규모 data를 처리하는 경우.


### AVRO를 선택해야 하는 경우

- production 환경에서 운영하는 경우.
- 대용량 data를 처리하는 경우.
- schema 변경 관리가 중요한 경우.
- data 정합성이 중요한 경우.
- network 대역폭을 최적화해야 하는 경우.
- 장기적인 data 호환성이 필요한 경우.


### PROTOBUF를 선택해야 하는 경우

- 극도의 성능 최적화가 필요한 경우.
- 다양한 언어로 된 service가 연동되는 경우.
- RPC 기능이 필요한 경우.
- 매우 큰 규모의 system을 구축하는 경우.
- data 크기를 최소화해야 하는 경우.
- 강력한 type 안정성이 요구되는 경우.

