---
layout: note
permalink: /
title: 
description: 
date: 2025-03-18
published: false
---


## Connector를 Kafka Connect Framework에 등록하기 위한 SPI(Service Provider Interface) 설정

- `src/main/resources/META-INF/services/org.apache.kafka.connect.sink.SinkConnector` file을 생성하고 connector class 이름을 등록합니다.
    - 이 file이 없으면 Kafka Connect에서 custom connector class를 찾지 못해 실행할 수 없습니다.

```txt
com.example.opensearch.OpenSearchSinkConnector
```

- 여러 connector를 제공하는 경우 각 class 경로를 새 줄에 추가하면 됩니다.


### Service Provider 설정이 필요한 이유

- service provider 설정은 Kafka Connect framework에서 필수입니다.
    - 이 설정을 통해 Kafka Connect framework가 custom connector class를 자동으로 발견하고 load할 수 있습니다.

- `META-INF/services/org.apache.kafka.connect.sink.SinkConnector` file은 Java의 **ServiceLoader** mechanism을 사용하는데 필요합니다.
    - ServiceLoader mechanism은 Java에서 plugin과 같은 확장 module을 구현할 때 광범위하게 사용되는 표준 방식입니다.

- Kafka Connect는 시작 시 class path에서 이 service provider 설정 file을 검색하여 사용 가능한 모든 connector class를 등록합니다.

- file 내부에는 구현한 connector의 전체 class 경로(fully qualified class name)만 있으면 됩니다.

