---
layout: note
permalink: /
title: Update by query logic 실행하는 Custom OpenSearch Sink Connector 개발하기
description: OpenSearch index를 대상으로 update by query logic을 실행하는 custom sink connector를 개발하여 Kafka Connect에 추가하면, 필요한 경우에 OpenSearch 기본 sink connector에서 제공하지 않는 query 기반 bulk update 기능을 사용할 수 있습니다.
date: 2025-03-18
published: false
---


## Update by query 기능을 가진 Custom OpenSearch Sink Connector 만들기

- 기존의 OpenSearch Sink Connector는 Kafka topic의 data를 OpenSearch로 전송하는 기능을 맡습니다.
    - OpenSearch document의 id를 기반으로, 단건에 대해 생성, 수정, 삭제 등의 작업을 수행합니다.
    - <https://aiven.io/docs/products/kafka/kafka-connect/howto/opensearch-sink> 참고.

- 기존의 OpenSearch sink connector는 bulk update 기능을 제공하지 않기 때문에, connector를 통해 bulk update를 하기 위해서는 OpenSearch bulk update API를 사용하는 custom sink connector를 개발하여 사용해야 합니다.

- custom sink connector는 **source code를 작성**하고, **JAR file로 packaging**하여, **Kafka Connect의 plugin directory에 배포**하는 과정으로 개발/등록됩니다.
    1. **Connector 구현** : Kafka Connect API를 활용하여 custom sink connector를 구현합니다.
    2. **OpenSearch 연동** : OpenSearch index에 update by query를 실행하는 logic을 custom connector에서 처리합니다.
    3. **Connector 등록** : Kafka Connect framework에 custom sink connector를 등록하여 사용합니다.
    4. **Connector 배포** : JAR file로 packaging하여 Kafka Connect의 plugin directory에 배포합니다.
    5. **Connector 관리** : 배포된 custom connector는 Kafka Connect REST API를 통해 등록/수정/삭제 등의 관리를 할 수 있습니다.

- 이 글은 OpenSearch index를 대상으로 `update by query`를 실행하는 logic을 custom connector에서 처리할 수 있도록 구현하는 방법을 다룹니다.
    - OpenSearch의 `update by query` API를 사용하여, 특정 조건에 맞는 document를 bulk update할 수 있습니다.

- custom connector 개발을 위해서는 Kafka Connect API의 `SinkConnector`와 `SinkTask` class를 확장하여 구현해야 합니다.
    - 핵심 구현 요소는 data 변환, bulk API 사용, error 처리 등이 있습니다.


---


## Project Source Code 준비

```txt
opensearch-sink-connector
├── README.md
├── settings.gradle
├── build.gradle
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           ├── UpdateByQuerySinkConnector.java
│   │   │           ├── UpdateByQuerySinkTask.java
│   │   │           ├── enums
│   │   │           │   └── UpdateFieldName.java
│   │   │           ├── util
│   │   │           │   └── VersionUtil.java
│   │   │           └── vo
│   │   │               └── UpdateField.java
│   │   └── resources
│   │       ├── META-INF
│   │       │   └── services
│   │       │       └── org.apache.kafka.connect.sink.SinkConnector
│   │       └── version.properties
│   └── test
│       ├── java
│       └── resources
└── build
    └── libs
        └── opensearch-sink-connector.jar
```

- Custom OpenSearch Sink Connector 개발에 필요한 Gradle Java project의 source code file을 준비합니다.
    - bulid.gradle[^1]





---


## Project Source Code File

- project 구성에 필요한 source code를 file 내용입니다.


### ddd

[^1]: buidld.gradle file.

[^2]: 두 번째 각주 내용입니다.

- `build.gradle` file에 dependency를 추가하여, Gradle 기반 Java project를 설정합니다.
- Kafka Connect API, OpenSearch client library를 dependency로 추가합니다.

```groovy
plugins {
    id 'java-library'
    id 'com.github.johnrengelman.shadow' version '7.1.2'
}

repositories {
    mavenCentral()
}

dependencies {
    // Kafka Connect
    compileOnly 'org.apache.kafka:connect-api:3.4.0'

    // OpenSearch
    implementation 'org.opensearch.client:opensearch-java:2.22.0'
    implementation 'org.opensearch.client:opensearch-rest-client:2.19.1'

    // JSON Processing
    implementation 'com.fasterxml.jackson.core:jackson-databind:2.14.2'
    implementation 'org.apache.kafka:connect-json:3.4.0'

    // Logging
    implementation 'org.slf4j:slf4j-api:1.7.36'
    implementation 'ch.qos.logback:logback-classic:1.2.11'
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

shadowJar {
    archiveBaseName.set('opensearch-sink-connector')
    archiveClassifier.set('')
    archiveVersion.set('')
}

artifacts {
    archives shadowJar
}
```


---











## SinkConnector와 SinkTask 구현

- custom sink connector를 개발하기 위해 필요한 핵심 class를 구현합니다.



---


## SPI(Service Provider Interface) 설정


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


---


## 배포 및 실행 방법

- Maven이나 Gradle로 JAR file을 빌드합니다.
- 빌드된 JAR file을 Kafka Connect의 plugin 경로에 복사합니다.
- Kafka Connect worker 설정에 plugin 경로를 지정합니다.
- REST API로 connector를 생성합니다.

```json
{
  "name": "opensearch-sink",
  "config": {
    "connector.class": "com.example.opensearch.OpenSearchSinkConnector",
    "tasks.max": "1",
    "topics": "my-topic",
    "opensearch.hosts": "localhost:9200",
    "opensearch.index": "my-index",
    "opensearch.document.id.field": "id",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable": "false"
  }
}
```
