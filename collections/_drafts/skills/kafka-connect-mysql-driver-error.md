# Kafka Connect JDBC 드라이버 문제 해결 가이드

## 문제: "No suitable driver found for jdbc:mysql"

Kafka Connect에서 JDBC 소스 또는 싱크 커넥터를 사용할 때 다음과 같은 오류가 발생할 수 있습니다:

```
org.apache.kafka.connect.errors.ConnectException: java.sql.SQLException: No suitable driver found for jdbc:mysql://hostname:port/database
```

이 오류는 Kafka Connect가 JDBC 드라이버를 찾지 못할 때 발생합니다.

## 원인

1. JDBC 드라이버 JAR 파일이 설치되지 않았거나 올바른 위치에 없음
2. Kafka Connect의 플러그인 경로가 JDBC 드라이버를 포함하지 않음
3. 드라이버 버전이 데이터베이스 버전과 호환되지 않음
4. 클래스로더 문제로 드라이버를 로드할 수 없음

## 해결 방법

### 1. 올바른 JDBC 드라이버 설치

#### Docker 환경에서 Dockerfile 수정 예시:

```dockerfile
# JDBC 커넥터 설치
RUN confluent-hub install --no-prompt confluentinc/kafka-connect-jdbc:10.8.2

# MySQL JDBC 드라이버 설치 (여러 위치에 배치하여 확실히 로드되도록 함)
RUN wget https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.0.33/mysql-connector-j-8.0.33.jar \
    -O /usr/share/java/kafka-connect-jdbc/mysql-connector-java.jar && \
    # 주 클래스패스에도 배치
    cp /usr/share/java/kafka-connect-jdbc/mysql-connector-java.jar /usr/share/java/
```

#### 데이터베이스별 권장 드라이버:

- **MySQL**: 
  - MySQL 8.x: `mysql-connector-j-8.0.33.jar`
  - MySQL 5.7: `mysql-connector-java-5.1.49.jar`
- **PostgreSQL**: `postgresql-42.5.1.jar`
- **SQL Server**: `mssql-jdbc-11.2.1.jre11.jar`
- **Oracle**: `ojdbc8-19.18.0.0.jar`

### 2. 플러그인 경로 설정

Kafka Connect가 JDBC 드라이버를 찾을 수 있도록 플러그인 경로를 설정합니다:

#### Docker 환경에서:

```dockerfile
# 플러그인 경로 설정
ENV CONNECT_PLUGIN_PATH="/usr/share/java,/usr/share/confluent-hub-components,/usr/share/java/kafka-connect-jdbc"
```

#### 독립 실행형 모드:

`connect-standalone.properties` 또는 `connect-distributed.properties` 파일에서:

```properties
plugin.path=/usr/share/java,/usr/share/confluent-hub-components,/usr/share/java/kafka-connect-jdbc
```

### 3. 드라이버 호환성 확인

데이터베이스 버전과 호환되는 JDBC 드라이버를 사용하세요:

| 데이터베이스 버전 | 권장 JDBC 드라이버 버전 |
|-----------------|----------------------|
| MySQL 8.x       | 8.0.x                |
| MySQL 5.7       | 5.1.x 또는 8.0.x     |
| PostgreSQL 14+  | 42.5.x               |
| PostgreSQL 13-  | 42.3.x               |

### 4. 설치 확인

설치 후 다음 명령을 실행하여 드라이버가 올바른 위치에 있는지 확인하세요:

```bash
# Docker 컨테이너 내부에서
ls -la /usr/share/java/kafka-connect-jdbc/
ls -la /usr/share/java/
```

### 5. 커넥터 설정 검증

커넥터 설정에서 JDBC URL이 올바른지 확인하세요:

```json
{
  "name": "mysql-source-connector",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "connection.url": "jdbc:mysql://hostname:3306/database?useSSL=false",
    "connection.user": "username",
    "connection.password": "password",
    "topic.prefix": "mysql-",
    "mode": "incrementing",
    "incrementing.column.name": "id",
    "table.whitelist": "mytable"
  }
}
```

## 데이터베이스별 JDBC URL 형식

- **MySQL**: `jdbc:mysql://hostname:port/database?useSSL=false`
- **PostgreSQL**: `jdbc:postgresql://hostname:port/database`
- **SQL Server**: `jdbc:sqlserver://hostname:port;databaseName=database`
- **Oracle**: `jdbc:oracle:thin:@hostname:port:SID` 또는 `jdbc:oracle:thin:@//hostname:port/service`

## 일반적인 추가 문제 해결 단계

1. **로그 확인**: 오류의 정확한 원인을 파악하기 위해 Kafka Connect 로그를 확인하세요.

2. **컨테이너 재시작**: 드라이버 설치 후 Kafka Connect 컨테이너를 재시작하세요.

3. **클래스로더 정책 설정**: 플러그인 분리(isolation)가 문제가 될 경우 다음 설정을 시도하세요:
   ```properties
   plugin.client.isolation.class.loader.replication=PARENT_FIRST
   ```

4. **커넥터 삭제 및 재생성**: 설정 변경 후 기존 커넥터를 삭제하고 다시 생성하세요.

## 성공적인 연결 확인

다음과 같은 로그 메시지가 표시되면 연결이 성공적으로 설정된 것입니다:

```
[YYYY-MM-DD HH:MM:SS,SSS] INFO Database connection established. (io.confluent.connect.jdbc.util.CachedConnectionProvider)
```


문서를 작성했습니다. 이 가이드는 Kafka Connect에서 JDBC 드라이버 관련 문제, 특히 "No suitable driver found" 오류를 해결하는 방법을 상세히 설명합니다. 

가이드에는 다음 내용이 포함되어 있습니다:
- 문제의 원인 설명
- Docker 환경에서의 해결 방법
- 데이터베이스별 권장 드라이버
- 플러그인 경로 설정 방법
- 호환성 확인 방법
- 설치 확인 및 커넥터 설정 검증 방법
- 데이터베이스별 JDBC URL 형식
- 추가 문제 해결 단계

이 문서는 향후 비슷한 문제가 발생했을 때 참고자료로 활용하실 수 있습니다. 추가 질문이 있으시면 알려주세요.




- <https://wecandev.tistory.com/111>