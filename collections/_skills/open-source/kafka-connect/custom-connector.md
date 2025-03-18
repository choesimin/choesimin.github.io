---
layout: skill
permalink: /303
title: Kafka Connect의 Custom Connector
description: 기본적으로 제공되는 connector로 요구 사항이 만족되지 않을 때는, custom connector를 직접 개발하여 사용할 수 있습니다.
date: 2025-03-18
---


## Custom Connector : Connector 직접 개발하기

- Kafka Connect는 외부 system과 Kafka 간의 data 연동을 쉽게 해주는 framework이며, **Connector는 Kafka Connect에서 실제 data를 이동시키는 plugin** 역할을 합니다.

- **custom connector**는 기존에 제공되는 connector로 충족할 수 없는 요구 사항을 위해 **직접 개발한 connector**입니다.
    - **Kafka Connect API를 활용**하여 connector를 직접 구현할 수 있습니다.

- custom connector는 표준 connector와 동일하게 **source connector와 sink connector로 구분**됩니다.
    - source connector : 외부 system에서 data를 가져와 Kafka topic으로 전송합니다.
    - sink connector : Kafka topic의 data를 외부 system으로 전송합니다.

- 개발한 custom connector는 **Kafka Connect framework에 등록하여 사용**할 수 있습니다.
    - **JAR file로 packaging**하여 Kafka Connect의 **plugin directory에 배포**합니다.
    - 배포된 custom connector는 표준 connector와 동일하게 Kafka Connect REST API를 통해 관리합니다.

- **표준 connector로 해결할 수 없는 특수한 data 연동 scenario에 custom connector가 사용**됩니다.
    - 특정 database의 CDC(Change Data Capture) 구현.
    - 비표준 API를 가진 system과의 연동.
    - 복잡한 data 변환 logic이 필요한 경우.
    - IoT device나 sensor에서 data를 수집하는 경우.
    - 특정 business logic이 포함된 data 처리가 필요한 경우.


### Custom Connector의 장점

- 특정 requirement에 최적화된 connector를 개발하여 custom business 요구 사항을 정확히 충족할 수 있습니다.
- 기존 connector ecosystem에서 지원하지 않는 legacy system, 내부 개발 system, 또는 특수 protocol을 사용하는 platform과의 data 연동이 가능합니다.
- ETL(Extract, Transform, Load) process 중 transform 단계에서 복잡한 data 변환, filtering, enrichment 등의 logic을 connector 내부에 직접 구현할 수 있습니다.
- business domain에 특화된 error handling을 구현하여 data 손실 방지, 재시도 전략, dead letter queue 관리 등 세밀한 제어가 가능합니다.
- 조직 내 특화된 보안 정책이나 compliance 요구 사항을 connector 수준에서 구현할 수 있습니다.
- 성능 최적화를 위한 batch 처리, connection pooling, data 압축 등의 기술을 적용할 수 있습니다.
- 내부 monitoring system과 통합하여 custom metric을 수집하고 운영 가시성을 높일 수 있습니다.
- 조직의 knowledge base를 활용하여 특정 domain에 최적화된 solution을 구현할 수 있습니다.


### Custom Connector의 단점

- 초기 개발 비용이 높고, 지속적인 유지 보수와 bug fix를 위한 전담 engineer resource가 필요합니다.
- 잘 설계되지 않은 custom connector는 code 복잡성 증가와 함께 기술 부채로 이어질 수 있습니다.
- 표준 connector와 달리 community support가 없어 모든 issue를 내부적으로 해결해야 합니다.
- 보안 취약점 발견 시 즉각적인 대응과 patch 배포에 대한 책임이 전적으로 개발 조직에 있습니다.
- Kafka Connect API의 major version이 update되는 경우, custom connector 전체를 호환되도록 수정해야 합니다.
- 개발자 이직 등으로 인한 knowledge gap 발생 시 유지 보수가 어려워질 수 있습니다.
- 자체 개발 test 및 검증 infra를 구축하고 유지해야 하므로 추가 비용이 발생합니다.
- Kafka Connect의 distributed mode 환경에서 발생할 수 있는 복잡한 분산 system 문제를 자체적으로 해결해야 합니다.
- 다양한 환경(development, staging, production)에서의 configuration 관리와 배포 pipeline 구축이 필요합니다.
- 동시 실행되는 task 수, memory 사용량, CPU 사용률 등 resource 사용에 대한 최적화 작업을 직접 수행해야 합니다.


---


## Custom Connector 개발 방법

- **Java를 사용**하여 **Kafka Connect API를 구현**합니다.
    - Kafka Connect API는 **Kafka Connect framework와 connector 간의 통신을 위한 interface**를 제공합니다.
    - project의 dependency에 Kafka Connect API를 추가하여 사용합니다.
        - Maven이나 Gradle을 사용하여 `kafka-connect-api` artifact를 dependency로 추가합니다.

- custom connector는 반드시 **Kafka Connect framework의 `Connector` class와 `Task` class를 상속받아 구현**해야 합니다.
    - **`Connector` class는 connector의 설정과 task 생성**을, **`Task` class는 실제 data 처리**를 담당합니다.
    - Source Connector 개발 시, `SourceConnector` class와 `SourceTask` class를 구현합니다.
    - Sink Connector 개발 시, `SinkConnector` class와 `SinkTask` class를 구현합니다.

- 개발이 완료되면, **JAR file로 packaging**하여 **Kafka Connect의 plugin directory에 배포**합니다.
    - 이때 JAR file에는 connector의 구현 class와 필요한 library가 포함되어 있어야 합니다.
        - **fat JAR**로 packaging하여 모든 dependency를 하나의 JAR가 포함하도록 하는 것이 좋습니다.
    - Kafka Connect의 plugin directory는 `plugin.path` configuration으로 설정할 수 있습니다.


### 1. 개발 환경 설정

- Java 개발 환경을 구축합니다.
- Maven이나 Gradle project를 생성하고 Kafka Connect API dependency를 추가합니다.

#### Maven Project Dependency

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>connect-api</artifactId>
    <version>3.9.0</version>
</dependency>
```

#### Gradle Project Dependency

```groovy
/* build.gradle */
dependencies {
    compileOnly 'org.apache.kafka:connect-api:3.9.0'
}
```


### 2. Connector class 구현

- source connector는 `SourceConnector`, sink connector는 `SinkConnector` class를 확장(`extends`)합니다.

- `config()` method를 통해 필요한 설정 항목을 정의합니다.
- `start()`, `stop()` method에서 resource 초기화 및 정리 작업을 구현합니다.
- `taskClass()`에서 처리할 task class를 지정합니다.
- `taskConfigs()`에서 병렬 처리를 위한 task 설정을 생성합니다.

```java
public class CustomSourceConnector extends SourceConnector {
/* public class CustomSinkConnector extends SinkConnector { */
    private Map<String, String> configProps;

    @Override
    public void start(Map<String, String> props) {
        this.configProps = props;
    }

    @Override
    public Class<? extends Task> taskClass() {
        return CustomSourceTask.class;
        /* return CustomSinkTask.class; */
    }

    @Override
    public List<Map<String, String>> taskConfigs(int maxTasks) {
        List<Map<String, String>> taskConfigs = new ArrayList<>();
        for (int i = 0; i < maxTasks; i++) {
            taskConfigs.add(configProps);
        }
        return taskConfigs;
    }

    @Override
    public void stop() {
        // clean up resources
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


### 3. Task class 구현

- Source Task는 `SourceTask`, Sink Task는 `SinkTask` class를 확장합니다.

- connector class와 마찬가지로, `start()`, `stop()` method에서 resource 초기화 및 정리 작업을 구현합니다.
- Source Task이냐, Sink Task이냐에 따라 `poll()` 또는 `put()` method를 구현합니다.
    - Source Task의 경우, `poll()` method에서 외부 system에서 data를 읽어 `SourceRecord`로 변환합니다.
    - Sink Task의 경우, `put()` method에서 Kafka에서 받은 data를 외부 system에 기록합니다.

```java
public class CustomSourceTask extends SourceTask {
/* public class CustomSinkTask extends SinkTask { */
    @Override
    public void start(Map<String, String> props) {
        // initialize resources
    }

    /* Source Task인 경우 */
    @Override
    public List<SourceRecord> poll() throws InterruptedException {
        // read data from external system
        // convert to SourceRecord
        return Collections.emptyList();
    }

    /* Sink Task인 경우 */
    @Override
    public void put(Collection<SinkRecord> records) {
        // write data to external system
    }

    @Override
    public void stop() {
        // clean up resources
    }

    @Override
    public String version() {
        return "1.0";
    }
}
```


### 4. JAR File Packaging

- Maven이나 Gradle을 사용하여 JAR file로 packaging합니다.
- JAR file에는 connector class와 필요한 library가 포함되어 있어야 합니다.
- 따라서 fat JAR로 packaging하여 모든 dependency를 포함하도록 합니다.
    - Maven의 `maven-assembly-plugin` 또는 Gradle의 `shadowJar` plugin을 사용하여 fat JAR를 생성합니다.

#### Maven Project Packaging

```xml
<!-- pom.xml -->
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-assembly-plugin</artifactId>
            <version>3.3.0</version>
            <configuration>
                <descriptorRefs>
                    <descriptorRef>jar-with-dependencies</descriptorRef>
                </descriptorRefs>
            </configuration>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>single</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

```bash
mvn clean package
```

#### Gradle Project Packaging

```groovy
/* build.gradle */
plugins {
    id 'com.github.johnrengelman.shadow' version '7.1.2'
}

shadowJar {
    archiveBaseName.set('custom-sink-connector')
}

artifacts {
    archives shadowJar
}
```

```bash
gradle clean shadowJar
```


### 5. Kafka Connect Plugin으로 배포

- 개발한 custom connector를 Kafka Connect의 plugin directory에 배포합니다.
    - plugin directory는 `plugin.path` configuration을 통해 지정한 경로입니다.

```bash
cp [path_to_jar_file] [kafka_connect_plugin_directory]
cp build/libs/custom-connector.jar /usr/share/java/
```


### 6. Custom Connector 등록

- 먼저 custom connector를 사용할 수 있도록, JSON 설정 file(`connector-config.json`)을 작성합니다.
    - connector의 이름, class, 설정 등을 포함합니다.

- Kafka Connect REST API를 통해 custom connector를 등록하고 실행합니다.
    - `POST /connectors` endpoint를 사용하여 connector를 등록합니다.
    - `PUT /connectors/{connector-name}/config` endpoint를 사용하여 connector의 설정을 변경합니다.
    - `DELETE /connectors/{connector-name}` endpoint를 사용하여 connector를 삭제합니다.

```json
// connector-config.json
{
    "name": "custom-source-connector",
    "config": {
        "connector.class": "com.example.CustomSourceConnector",
        "tasks.max": "1",
        "topic": "my-topic",
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "value.converter": "org.apache.kafka.connect.storage.StringConverter",
        "key.converter.schemas.enable": "false",
        "value.converter.schemas.enable": "false"
    }
}
```

```bash
# custom connector 등록
curl -X POST -H "Content-Type: application/json" --data @connector-config.json http://localhost:8083/connectors
```

