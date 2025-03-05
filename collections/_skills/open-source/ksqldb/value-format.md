---
layout: skill
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
| 