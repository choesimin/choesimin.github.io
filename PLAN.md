# 미완성 문서 작성 계획


## 작성 규칙 요약

- 영어 용어는 영어로 표기 (type, parameter, code, null check, matching 등)
- 모든 문장은 `-`로 시작하는 list 형식
- 제목 아래에는 반드시 bullet point 설명
- 금지 표현 : "다음과 같은", "이를 통해", "다룹니다", "소개합니다"
- 콜론 앞뒤 공백 (` : `)
- 이모지 사용 금지
- Mermaid.js 적극 활용


---


## 사용 가능한 Permalink 번호

- 비어있는 번호 : 252, 269, 270, 328 (4개)
- 새로운 번호 : 402~ (73개)


---


## 작성 예정 문서 (총 77개)


### ai/ (2개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /252 | ai/machine-learning.md | Machine Learning | **완료** |
| /269 | ai/mcp.md | MCP | **완료** |


### aws/bedrock/ (2개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /270 | aws/bedrock/chatbot.md | AI Chatbot 구축 |
| /328 | aws/bedrock/multi-agent.md | Multi-Agent |


### database/ (5개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /402 | database/count-distinct.md | Count Distinct |
| /403 | database/rocksdb.md | RocksDB |
| /404 | database/mysql/gtid.md | MySQL GTID |
| /405 | database/mysql/limit-offset.md | MySQL LIMIT와 OFFSET |
| /406 | database/mongodb/index/compound-index/esr-rule.md | ESR Rule |


### domain/email/ (5개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /407 | domain/email/protocol.md | Email Protocol |
| /408 | domain/email/mime.md | MIME |
| /409 | domain/email/law.md | Email 관련 법률 |
| /410 | domain/email/security.md | Email 보안 |
| /411 | domain/email/server.md | Email Server |


### domain/payment/ (6개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /412 | domain/payment/banking.md | 은행 결제 |
| /413 | domain/payment/cash-recript.md | 현금 영수증 |
| /414 | domain/payment/cms-wbs.md | CMS와 WBS |
| /415 | domain/payment/payment-process.md | 카드 결제 과정 |
| /416 | domain/payment/settlement.md | 정산 |
| /417 | domain/payment/slip.md | 전표 |


### economics/asset/ (4개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /418 | economics/asset/safe-vs-risky.md | 안전 자산과 위험 자산 |
| /419 | economics/asset/classes.md | 자산 클래스 |
| /420 | economics/asset/liquidity.md | 유동성 |
| /421 | economics/asset/return-profile.md | 수익률 프로필 |


### framework/ (4개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /422 | framework/mybatis.md | MyBatis |
| /423 | framework/spring/bean-validation.md | Bean Validation |
| /424 | framework/spring/excel-download.md | Excel Download |
| /425 | framework/spring/pageable.md | Spring Pageable |


### frontend/ (1개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /426 | frontend/css-size-unit.md | CSS 크기 단위 |


### language/java/ (17개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /427 | language/java/ip-extractor.md | IP Extractor |
| /428 | language/java/apache-poi/index.md | Apache POI |
| /429 | language/java/apache-poi/excel/index.md | Apache POI Excel |
| /430 | language/java/apache-poi/excel/large.md | 대용량 Excel 처리 |
| /431 | language/java/collection-empty.md | Collection Empty 검사 |
| /432 | language/java/enum.md | Enum |
| /433 | language/java/garbage-collection.md | Garbage Collection |
| /434 | language/java/generic.md | Generic |
| /435 | language/java/history.md | Java 역사 |
| /436 | language/java/identity-equality.md | Identity와 Equality |
| /437 | language/java/reflection.md | Reflection |
| /438 | language/java/resource-management.md | Resource 관리 |
| /439 | language/java/servlet.md | Servlet |
| /440 | language/java/stream.md | Stream |
| /441 | language/java/switch-if.md | Switch와 If |
| /442 | language/java/throwable-error-exception.md | Throwable, Error, Exception |
| /443 | language/java/unchecked-warning.md | Unchecked Warning |


### language/javascript/ (2개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /444 | language/javascript/node-js.md | Node.js |
| /445 | language/javascript/syntax.md | JavaScript 문법 |


### linux-tool/ (1개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /446 | linux-tool/ss.md | ss 명령어 |


### open-source/debezium/ (7개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /447 | open-source/debezium/avro.md | Debezium Avro |
| /448 | open-source/debezium/capture.md | Debezium Capture |
| /449 | open-source/debezium/log-position.md | Debezium Log Position |
| /450 | open-source/debezium/mysql-gtid-mode.md | MySQL GTID Mode |
| /451 | open-source/debezium/snapshot/lock.md | Snapshot Lock |
| /452 | open-source/debezium/snapshot/process.md | Snapshot Process |
| /453 | open-source/debezium/snapshot/stability.md | Snapshot Stability |


### open-source/git/ (1개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /454 | open-source/git/merge-branch.md | Git Branch 병합 |


### open-source/kafka/ (7개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /455 | open-source/kafka/consumer-group.md | Kafka Consumer Group | **완료** |
| /456 | open-source/kafka/replication-factor.md | Kafka Replication Factor |
| /457 | open-source/kafka/fault-tolerance.md | Kafka Fault Tolerance |
| /458 | open-source/kafka/page-cache.md | Kafka Page Cache |
| /459 | open-source/kafka/rest-proxy.md | Kafka REST Proxy |
| /460 | open-source/kafka/log-compaction/index.md | Kafka Log Compaction |
| /461 | open-source/kafka/log-compaction/tompstone.md | Kafka Tombstone |


### open-source/kafka-connect/ (1개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /462 | open-source/kafka-connect/opensearch-sink-connector.md | OpenSearch Sink Connector |


### open-source/ksqldb/ (3개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /463 | open-source/ksqldb/collection.md | ksqlDB Collection |
| /464 | open-source/ksqldb/rest-api.md | ksqlDB REST API |
| /465 | open-source/ksqldb/window-limitation.md | ksqlDB Window 제한 |


### paradigm/ (2개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /466 | paradigm/ci-cd.md | CI/CD |
| /467 | paradigm/layered-architecture.md | Layered Architecture |


### software-design/ (7개)

| 번호 | 파일 | 제목 |
| --- | --- | --- |
| /468 | software-design/anti-pattern.md | Anti Pattern |
| /469 | software-design/design-pattern/command-pattern.md | Command Pattern |
| /470 | software-design/design-pattern/composit-pattern.md | Composite Pattern |
| /471 | software-design/design-pattern/iterator-pattern.md | Iterator Pattern |
| /472 | software-design/design-pattern/template-method-pattern.md | Template Method Pattern |
| /473 | software-design/saga-pattern.md | Saga Pattern |
| /474 | software-design/system-design/cdc-pipeline.md | CDC Pipeline |


---


## 작성 우선순위

1. **Kafka 관련** (455~461) - 연관성 높음, 함께 작성
2. **Debezium 관련** (447~453) - Kafka와 연계
3. **Java 기본** (427~443) - 기초 문서
4. **Design Pattern** (469~472) - 기존 pattern과 연계
5. **나머지** - 필요에 따라 순서 조정


---


## 진행 상황

- 총 77개 문서
- 완료 : 3개
- 대기 : 74개

