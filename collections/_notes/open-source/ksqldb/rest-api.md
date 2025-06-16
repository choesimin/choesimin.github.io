---
published: false
---

ksqlDB에서 생성한 테이블 결과를 외부에서 API로 조회할 수 있는지 알아보겠습니다.

네, ksqlDB에서 만들어진 테이블 결과를 외부에서 REST API를 통해 조회할 수 있습니다.

ksqlDB는 REST API를 제공하며, 이를 통해 외부 애플리케이션에서 테이블 데이터에 접근할 수 있습니다. 주요 내용은 다음과 같습니다:

## ksqlDB REST API를 통한 테이블 조회 방법

1. **기본 REST API 엔드포인트**:
   - 기본 엔드포인트는 `http://localhost:8088/`입니다 기본 REST API 엔드포인트는 http://localhost:8088/입니다.

2. **쿼리 엔드포인트**:
   - 테이블을 조회할 때는 `/query` 엔드포인트를 사용합니다.
   - The /query 리소스는 SELECT 문의 출력 레코드를 chunked transfer encoding을 통해 스트리밍할 수 있게 해줍니다.

3. **테이블 쿼리 요청 방법**:
   ```
   POST /query HTTP/1.1
   Accept: application/vnd.ksql.v1+json
   Content-Type: application/vnd.ksql.v1+json
   
   {
     "ksql": "SELECT * FROM your_table;",
     "streamsProperties": {
       "ksql.streams.auto.offset.reset": "earliest"
     }
   }
   ```

4. **데이터 형식**:
   - 응답은 JSON 형식으로 받을 수 있습니다.
   - curl --http2 -X "POST" "http://localhost:8088/query-stream" 엔드포인트를 사용하여 결과를 JSON 형식으로 받을 수 있습니다.

## 주요 고려사항

1. **materialized view 필요**:
   - 테이블이 materialized view로 생성되어야 조회가 가능합니다. "ksqlDB에서 테이블은 materialized되거나 되지 않을 수 있습니다. Kafka 토픽 위에 직접 생성된 테이블은 materialized되지 않으며, 이런 경우 비효율적이기 때문에 쿼리할 수 없습니다."

2. **Point-in-time 쿼리**:
   - materialized view는 "persistent query"로 정의되며, 이 쿼리는 테이블을 사용하여 증분 업데이트된 결과를 유지하기 때문에 "persistent"라고 불립니다.
   - SELECT 쿼리를 통해 요청 시점의 데이터를 가져올 수 있습니다.

3. **클라이언트 라이브러리**:
   - 다양한 언어로 된 클라이언트 라이브러리가 있습니다:
     - Java 클라이언트: ksqlDB Java 클라이언트를 사용하여 서버와 상호작용하고 테이블을 생성하고, 집계 쿼리를 실행하고, 다양한 쿼리를 실행할 수 있습니다.
     - C# 클라이언트: ksqlDB.RestApi.Client는 C# LINQ 지원 클라이언트 API로, ksqlDB push 및 pull 쿼리를 발행하고 소비할 수 있게 해줍니다.
     - Python 클라이언트: Python 래퍼를 통해 'client.query('select * from table1', use_http2=True)'와 같은 방식으로 테이블을 조회할 수 있습니다.

ksqlDB REST API를 사용하면 외부 애플리케이션에서 테이블 데이터에 접근하여 대시보드나 다른 시스템과 통합하는 등의 다양한 용도로 활용할 수 있습니다.