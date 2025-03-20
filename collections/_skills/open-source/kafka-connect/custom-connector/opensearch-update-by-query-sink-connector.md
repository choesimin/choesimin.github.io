---
layout: skill
permalink: /
title: Custom OpenSearch Sink Connector 개발해서 Kafka Connect에 추가하기 (Update by Query)
description: OpenSearch index를 대상으로 update by query logic을 실행하는 custom sink connector를 개발하여 Kafka Connect에 추가합니다.
date: 2025-03-18
pubilshed: false
---


## Custom OpenSearch Sink Connector

- Custom OpenSearch Sink Connector는 Kafka Connect framework를 확장하여 Kafka의 data를 OpenSearch로 전송하는 기능을 맡습니다.
    - connector 개발을 위해서는 Kafka Connect API의 `SinkConnector`와 `SinkTask` class를 확장하여 구현해야 합니다.
    - 핵심 구현 요소는 data 변환, bulk API 사용, error 처리 등이 있습니다.

- custom sink connector의 등록은 **source code를 작성**하고, **JAR file로 packaging**하여, **Kafka Connect의 plugin directory에 배포**하는 과정으로 진행됩니다.
    1. **Connector 구현** : Kafka Connect API를 활용하여 custom sink connector를 구현합니다.
    2. **OpenSearch 연동** : OpenSearch index에 update by query를 실행하는 logic을 custom connector에서 처리합니다.
    3. **Connector 등록** : Kafka Connect framework에 custom sink connector를 등록하여 사용합니다.
    4. **Connector 배포** : JAR file로 packaging하여 Kafka Connect의 plugin directory에 배포합니다.
    5. **Connector 관리** : 배포된 custom connector는 Kafka Connect REST API를 통해 등록/수정/삭제 등의 관리를 할 수 있습니다.

- 이 글은 OpenSearch index를 대상으로 `update by query`를 실행하는 logic을 custom connector에서 처리할 수 있도록 구현하는 방법을 다룹니다.


---


## 개발 환경 준비

- Maven 또는 Gradle 기반 Java project를 설정합니다.
- Kafka Connect API, OpenSearch client library를 dependency로 추가합니다.
    - Maven project의 경우, `pom.xml`, Gradle project의 경우, `build.gradle`에 dependency를 추가합니다.

```xml
<dependencies>
    <!-- Kafka Connect API -->
    <dependency>
        <groupId>org.apache.kafka</groupId>
        <artifactId>connect-api</artifactId>
        <version>3.5.0</version>
        <scope>provided</scope>
    </dependency>
    
    <!-- OpenSearch Client -->
    <dependency>
        <groupId>org.opensearch.client</groupId>
        <artifactId>opensearch-rest-high-level-client</artifactId>
        <version>2.7.0</version>
    </dependency>
</dependencies>
```


---


## 핵심 Class 구현

- custom sink connector를 개발하기 위해 필요한 핵심 class를 구현합니다.
    - `OpenSearchSinkConnector` : sink connector의 설정과 관리를 담당하는 class.
    - `OpenSearchSinkTask` : 실제 data 처리와 OpenSearch로의 전송을 담당하는 class.
    - `OpenSearchSinkConfig` : connector의 설정을 관리하는 class.
    - `OpenSearchClientFactory` : OpenSearch client를 생성하는 utility class.
    - `DataConverter` : Kafka record의 data를 OpenSearch 문서로 변환하는 utility class.


### 1. SinkConnector Class 구현

- connector의 설정과 관리를 담당하는 class를 구현합니다.

```java
package com.example.opensearch;

import org.apache.kafka.common.config.ConfigDef;
import org.apache.kafka.connect.connector.Task;
import org.apache.kafka.connect.sink.SinkConnector;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OpenSearchSinkConnector extends SinkConnector {
    
    private Map<String, String> configProps;
    
    @Override
    public void start(Map<String, String> props) {
        configProps = props;
    }
    
    @Override
    public Class<? extends Task> taskClass() {
        return OpenSearchSinkTask.class;
    }
    
    @Override
    public List<Map<String, String>> taskConfigs(int maxTasks) {
        List<Map<String, String>> taskConfigs = new ArrayList<>();
        for (int i = 0; i < maxTasks; i++) {
            taskConfigs.add(new HashMap<>(configProps));
        }
        return taskConfigs;
    }
    
    @Override
    public void stop() {
        // connector 종료 시 필요한 resource 정리
    }
    
    @Override
    public ConfigDef config() {
        return OpenSearchSinkConfig.CONFIG_DEF;
    }
    
    @Override
    public String version() {
        return "1.0.0";
    }
}
```


### 2. SinkTask Class 구현

- 실제 data 처리와 OpenSearch로의 전송을 담당하는 class를 구현합니다.

```java
package com.example.opensearch;

import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.connect.sink.SinkRecord;
import org.apache.kafka.connect.sink.SinkTask;
import org.opensearch.action.bulk.BulkRequest;
import org.opensearch.action.bulk.BulkResponse;
import org.opensearch.action.index.IndexRequest;
import org.opensearch.client.RequestOptions;
import org.opensearch.client.RestHighLevelClient;
import org.opensearch.common.xcontent.XContentType;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;

public class OpenSearchSinkTask extends SinkTask {

    private RestHighLevelClient client;
    private OpenSearchSinkConfig config;
    
    @Override
    public void start(Map<String, String> props) {
        config = new OpenSearchSinkConfig(props);
        client = OpenSearchClientFactory.createClient(config);
    }
    
    @Override
    public void put(Collection<SinkRecord> records) {
        if (records.isEmpty()) {
            return;
        }
        
        BulkRequest bulkRequest = new BulkRequest();
        
        for (SinkRecord record : records) {
            Map<String, Object> jsonMap = DataConverter.convertToMap(record.value());
            String documentId = extractDocumentId(record, jsonMap);
            
            IndexRequest indexRequest = new IndexRequest(config.getIndexName())
                .id(documentId)
                .source(jsonMap, XContentType.JSON);
                
            bulkRequest.add(indexRequest);
        }
        
        try {
            BulkResponse bulkResponse = client.bulk(bulkRequest, RequestOptions.DEFAULT);
            if (bulkResponse.hasFailures()) {
                handleFailures(bulkResponse, records);
            }
        } catch (IOException e) {
            throw new RuntimeException("OpenSearch에 데이터 전송 중 오류 발생", e);
        }
    }
    
    private String extractDocumentId(SinkRecord record, Map<String, Object> jsonMap) {
        // ID 필드 추출 로직 구현
        String idField = config.getIdField();
        if (idField != null && jsonMap.containsKey(idField)) {
            return jsonMap.get(idField).toString();
        }
        // 기본값으로 topic+partition+offset 사용
        return record.topic() + "-" + record.kafkaPartition() + "-" + record.kafkaOffset();
    }
    
    private void handleFailures(BulkResponse response, Collection<SinkRecord> records) {
        // 에러 처리 로직 구현
    }
    
    @Override
    public void flush(Map<TopicPartition, OffsetAndMetadata> offsets) {
        // 필요시 구현
    }
    
    @Override
    public void stop() {
        try {
            if (client != null) {
                client.close();
            }
        } catch (IOException e) {
            // 오류 로깅
        }
    }
    
    @Override
    public String version() {
        return new OpenSearchSinkConnector().version();
    }
}
```


### 3. Configuration Class 구현

- connector의 설정을 관리하는 class를 구현합니다.

```java
package com.example.opensearch;

import org.apache.kafka.common.config.AbstractConfig;
import org.apache.kafka.common.config.ConfigDef;
import org.apache.kafka.common.config.ConfigDef.Importance;
import org.apache.kafka.common.config.ConfigDef.Type;

import java.util.Map;

public class OpenSearchSinkConfig extends AbstractConfig {

    public static final String OPENSEARCH_HOSTS = "opensearch.hosts";
    public static final String OPENSEARCH_INDEX = "opensearch.index";
    public static final String OPENSEARCH_ID_FIELD = "opensearch.document.id.field";
    public static final String OPENSEARCH_USERNAME = "opensearch.username";
    public static final String OPENSEARCH_PASSWORD = "opensearch.password";
    
    public static final ConfigDef CONFIG_DEF = new ConfigDef()
        .define(OPENSEARCH_HOSTS, Type.STRING, "localhost:9200", Importance.HIGH, 
                "OpenSearch 호스트 주소")
        .define(OPENSEARCH_INDEX, Type.STRING, Importance.HIGH, 
                "데이터를 저장할 OpenSearch 인덱스 이름")
        .define(OPENSEARCH_ID_FIELD, Type.STRING, null, Importance.MEDIUM, 
                "문서 ID로 사용할 필드 이름 (없으면 자동 생성)")
        .define(OPENSEARCH_USERNAME, Type.STRING, "", Importance.MEDIUM, 
                "OpenSearch 연결에 사용할 사용자 이름")
        .define(OPENSEARCH_PASSWORD, Type.PASSWORD, "", Importance.MEDIUM, 
                "OpenSearch 연결에 사용할 비밀번호");
    
    public OpenSearchSinkConfig(Map<String, String> props) {
        super(CONFIG_DEF, props);
    }
    
    public String getHosts() {
        return getString(OPENSEARCH_HOSTS);
    }
    
    public String getIndexName() {
        return getString(OPENSEARCH_INDEX);
    }
    
    public String getIdField() {
        return getString(OPENSEARCH_ID_FIELD);
    }
    
    public String getUsername() {
        return getString(OPENSEARCH_USERNAME);
    }
    
    public String getPassword() {
        return getString(OPENSEARCH_PASSWORD);
    }
}
```

### 4. OpenSearch Client Factory 구현

- OpenSearch client를 생성하는 utility class를 구현합니다.

```java
package com.example.opensearch;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.opensearch.client.RestClient;
import org.opensearch.client.RestHighLevelClient;

import java.util.Arrays;

public class OpenSearchClientFactory {

    public static RestHighLevelClient createClient(OpenSearchSinkConfig config) {
        String[] hosts = config.getHosts().split(",");
        HttpHost[] httpHosts = Arrays.stream(hosts)
            .map(host -> {
                String[] parts = host.trim().split(":");
                String hostname = parts[0];
                int port = parts.length > 1 ? Integer.parseInt(parts[1]) : 9200;
                return new HttpHost(hostname, port, "http");
            })
            .toArray(HttpHost[]::new);
        
        RestClient.Builder builder = RestClient.builder(httpHosts);
        
        // 인증 정보 설정
        String username = config.getUsername();
        String password = config.getPassword();
        if (username != null && !username.isEmpty()) {
            CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(AuthScope.ANY,
                new UsernamePasswordCredentials(username, password));
                
            builder.setHttpClientConfigCallback(httpClientBuilder ->
                httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider));
        }
        
        return new RestHighLevelClient(builder);
    }
}
```


### 5. Data Converter 구현

- Kafka record의 data를 OpenSearch 문서로 변환하는 utility class를 구현합니다.

```java
package com.example.opensearch;

import org.apache.kafka.connect.data.Field;
import org.apache.kafka.connect.data.Schema;
import org.apache.kafka.connect.data.Struct;
import org.apache.kafka.connect.json.JsonConverter;
import org.apache.kafka.connect.sink.SinkRecord;

import java.util.HashMap;
import java.util.Map;

public class DataConverter {

    public static Map<String, Object> convertToMap(Object value) {
        if (value == null) {
            return new HashMap<>();
        }
        
        // 이미 Map 형태인 경우 직접 반환
        if (value instanceof Map) {
            return (Map<String, Object>) value;
        }
        
        // Struct 객체인 경우 Map으로 변환
        if (value instanceof Struct) {
            Map<String, Object> result = new HashMap<>();
            Struct struct = (Struct) value;
            for (Field field : struct.schema().fields()) {
                String fieldName = field.name();
                Object fieldValue = struct.get(field);
                result.put(fieldName, fieldValue);
            }
            return result;
        }
        
        // 기타 기본 타입인 경우 처리
        Map<String, Object> result = new HashMap<>();
        result.put("value", value);
        return result;
    }
}
```


---


## Service Provider 설정

- `src/main/resources/META-INF/services/org.apache.kafka.connect.sink.SinkConnector` file을 생성하고 connector class 이름을 등록합니다.
    - 이 file이 없으면 Kafka Connect에서 custom connector class를 찾지 못해 실행할 수 없습니다.

```txt
com.example.opensearch.OpenSearchSinkConnector
```

- 여러 connector를 제공하는 경우 각 class 경로를 새 줄에 추가하면 됩니다.


### Service Provider 설정이 필요한 이유

- service provider 설정은 Kafka Connect 프레임워크에서 필수입니다.
- service provider 설정을 통해 Kafka Connect 프레임워크가 custom connector class를 자동으로 발견하고 로드할 수 있습니다.

- `META-INF/services/org.apache.kafka.connect.sink.SinkConnector` 파일은 Java의 **ServiceLoader** 메커니즘을 사용하는데 필요합니다.

- ServiceLoader 메커니즘은 Java에서 plugin과 같은 확장 모듈을 구현할 때 광범위하게 사용되는 표준 방식입니다.

- Kafka Connect는 시작 시 classpath에서 이 service provider 설정 파일을 검색하여 사용 가능한 모든 connector class를 등록합니다.

- 파일 내부에는 구현한 connector의 전체 class 경로(fully qualified class name)만 있으면 됩니다.




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

## 주요 기능 확장 방안

- bulk 요청 최적화를 위한 batch size 설정 추가가 가능합니다.
- error 발생 시 retry 및 dead letter queue 처리 로직 추가가 가능합니다.
- 동적 index 이름 생성 기능 구현이 가능합니다.
- document mapping 자동 생성 기능 구현이 가능합니다.
- 다양한 인증 방식(API Key, AWS IAM 등) 지원 확장이 가능합니다.



---



## Source Code


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


```java
package com.hiworks;

import org.apache.kafka.common.config.ConfigDef;
import org.apache.kafka.connect.connector.Task;
import org.apache.kafka.connect.sink.SinkConnector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UpdateByQuerySinkConnector extends SinkConnector {
    private static final Logger log = LoggerFactory.getLogger(UpdateByQuerySinkConnector.class);
    private Map<String, String> configProps;

    @Override
    public void start(Map<String, String> props) {
        this.configProps = props;
    }

    @Override
    public Class<? extends Task> taskClass() {
        return UpdateByQuerySinkTask.class;
    }

    @Override
    public List<Map<String, String>> taskConfigs(int maxTasks) {
        final List<Map<String, String>> taskConfigs = new ArrayList<>(maxTasks);
        for (int i = 0; i < maxTasks; i++) {
            taskConfigs.add(configProps);
        }
        return taskConfigs;
    }

    @Override
    public void stop() {
        log.info("UpdateSinkConnector stopped");
    }

    @Override
    public ConfigDef config() {
        return new ConfigDef();
    }

    @Override
    public String version() {
        return "1.0";
    }
}
```

```java
package com.hiworks;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.apache.kafka.connect.sink.SinkRecord;
import org.apache.kafka.connect.sink.SinkTask;
import org.opensearch.client.RestClient;
import org.opensearch.client.json.JsonData;
import org.opensearch.client.json.jackson.JacksonJsonpMapper;
import org.opensearch.client.opensearch.OpenSearchClient;
import org.opensearch.client.opensearch._types.FieldValue;
import org.opensearch.client.opensearch._types.Time;
import org.opensearch.client.opensearch._types.query_dsl.TermQuery;
import org.opensearch.client.opensearch.core.UpdateByQueryRequest;
import org.opensearch.client.opensearch.core.UpdateByQueryResponse;
import org.opensearch.client.transport.rest_client.RestClientTransport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;

public class UpdateByQuerySinkTask extends SinkTask {
    private static final Logger log = LoggerFactory.getLogger(UpdateByQuerySinkTask.class);

    private OpenSearchClient client;
    private RestClient restClient;
    private ObjectMapper objectMapper;

    @Override
    public void start(Map<String, String> props) {
        final String host = props.getOrDefault("opensearch.host", "localhost");
        final int port = Integer.parseInt(props.getOrDefault("opensearch.port", "9200"));
        HttpHost httpHost = new HttpHost(host, port);

        this.restClient = RestClient.builder(httpHost).build();
        this.client = new OpenSearchClient(
                new RestClientTransport(restClient, new JacksonJsonpMapper()));
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public void put(Collection<SinkRecord> records) {
        if (records.isEmpty()) {
            return;
        }
        log.info("record 수신 성공 : {}개", records.size());

        for (SinkRecord record : records) {
            try {
                update(record);
            } catch (Exception e) {
                log.error("record update 중 오류 발생 : record = {}", record, e);
            }
        }
    }

    private void update(SinkRecord record) throws IOException {
        final UpdateField updateField = UpdateField.fromJson(record.value().toString(), objectMapper);

        try {
            updateByQuery(updateField);
        } catch (Exception e) {
            log.error("record update by query 중 오류 발생 : updateField = {}", updateField, e);
        }
    }

    private void updateByQuery(UpdateField updateField) throws IOException {
        final UpdateByQueryRequest request = new UpdateByQueryRequest.Builder()
                .index(updateField.indexName())
                .query(q -> q
                        .term(TermQuery.of(t -> t
                                .field(updateField.filterKey())
                                .value(FieldValue.of(updateField.filterValue())))
                        )
                )
                .script(s -> s
                        .inline(i -> i
                                .source("ctx._source." + updateField.updateKey() + " = params." + updateField.updateKey())
                                .params(Map.of(updateField.updateKey(), JsonData.of(updateField.updateValue())))
                        )
                )
                .timeout(Time.of(t -> t.time("2m")))
                .build();

        final UpdateByQueryResponse response = client.updateByQuery(request);
        log.info("document update 완료 : {}개 {} ms 소요", response.updated(), response.took());
    }

    @Override
    public void stop() {
        try {
            if (restClient != null) {
                restClient.close();
                log.info("UpdateSinkTask 및 OpenSearch client 중지");
            }
        } catch (IOException e) {
            log.error("OpenSearch client 중지 중 오류 발생", e);
        }
    }

    @Override
    public String version() {
        return "1.0";
    }
}
```

```java
package com.hiworks;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public record UpdateField(String indexName, String filterKey, String filterValue, String updateKey, String updateValue) {

    public static UpdateField fromJson(String recordStr, ObjectMapper objectMapper) throws JsonProcessingException {
        JsonNode recordNode = objectMapper.readTree(recordStr);

        if (
                !recordNode.has("index_name") ||
                !recordNode.has("filter_key") || !recordNode.has("filter_value") ||
                !recordNode.has("update_key") || !recordNode.has("update_value")
        ) {
            throw new IllegalArgumentException("필수 값 지정 필요 (index_name, filter_key, filter_value, update_key, update_value)");
        }

        return new UpdateField(
                recordNode.get("index_name").asText(),
                recordNode.get("filter_key").asText(),
                recordNode.get("filter_value").asText(),
                recordNode.get("update_key").asText(),
                recordNode.get("update_value").asText()
        );
    }
}
```