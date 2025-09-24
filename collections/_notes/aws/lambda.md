---
layout: note
permalink: /305
title: AWS Lambda - Cloud Computing PaaS
description: AWS Lambda는 server 관리 없이 code를 실행할 수 있는 serverless computing service로, event 발생 시 자동으로 code가 실행되며, 사용한 computing time에 대해서만 요금을 지불하는 pay-per-use 방식을 제공합니다.
date: 2025-09-21
---


## AWS Lambda

- AWS Lambda는 server를 관리할 필요 없이 code를 실행할 수 있는 serverless computing service입니다.
- event가 발생했을 때 자동으로 code가 실행되며, 사용한 computing time에 대해서만 요금을 지불하면 됩니다.
- Java, Python, Node.js, C#, Go, Ruby 등 다양한 programming 언어를 지원합니다.


### Serverless Computing의 핵심 개념

- AWS Lambda는 Function as a Service(FaaS) model을 기반으로 하는 serverless computing platform입니다.
- 개발자는 server infrastructure 관리 없이 business logic에만 집중할 수 있습니다.
- AWS가 자동으로 server provisioning, scaling, patching, monitoring을 처리합니다.

#### 주요 특징

- **자동 확장** : traffic 증가에 따라 자동으로 instance를 생성하여 수천 개의 동시 실행을 처리합니다.
- **고가용성** : AWS infrastructure 내에서 자동으로 fault tolerance와 high availability를 보장합니다.
- **pay-per-use 요금제** : code가 실행되는 시간과 memory 사용량에 따라서만 요금이 부과됩니다.
- **zero administration** : server 관리, OS update, runtime patching이 모두 자동화됩니다.

#### 지원 언어 및 Runtime

- **Node.js** : JavaScript 및 TypeScript application 개발에 사용됩니다.
- **Python** : data processing, machine learning, automation script에 널리 활용됩니다.
- **Java** : enterprise application 및 대규모 system integration에 적합합니다.
- **C#** : .NET ecosystem과의 seamless integration을 제공합니다.
- **Go** : 높은 성능이 필요한 application에 최적화되어 있습니다.
- **Ruby** : web application 및 API development에 사용됩니다.
- **Custom runtime** : container image를 통해 다른 언어도 지원 가능합니다.


---


## Lambda Function 구조

- Lambda function은 handler function을 중심으로 구성되며, event와 context 객체를 parameter로 받습니다.
- event 객체에는 function을 trigger한 service로부터 전달된 data가 포함됩니다.
- context 객체는 runtime 정보와 AWS 환경에 대한 metadata를 제공합니다.


### Handler Function 형태

- **Python 예시** : `lambda_handler(event, context)` 형태로 정의됩니다.
- **Node.js 예시** : `exports.handler = async (event, context)` 형태로 작성됩니다.
- **Java 예시** : `RequestHandler<InputType, OutputType>` interface를 구현합니다.


### Event 처리 방식

- **동기식 처리** : API Gateway, Application Load Balancer 등에서 즉시 응답이 필요한 경우 사용됩니다.
- **비동기식 처리** : S3, SNS, CloudWatch Events 등에서 event를 queue에 저장한 후 처리됩니다.
- **stream 처리** : DynamoDB Streams, Kinesis 등에서 연속적인 data stream을 실시간으로 처리합니다.


---


## 실행 환경 및 제한 사항

- AWS Lambda는 안전하고 격리된 실행 환경에서 code를 실행하며, 여러 보안 및 성능 제한이 적용됩니다.
- 이러한 제한 사항을 이해하고 설계에 반영하는 것이 성공적인 serverless application 구축의 핵심입니다.


### Memory 및 CPU 할당

- **memory 범위** : 128MB부터 10,240MB(10GB)까지 1MB 단위로 설정 가능합니다.
- **CPU 성능** : memory 할당량에 비례하여 CPU 성능이 자동으로 조정됩니다.
- **vCPU 제한** : 1,769MB memory에서 1 vCPU, 10,240MB에서 6 vCPU가 할당됩니다.


### 실행 시간 제한

- **최대 실행 시간** : function 당 최대 15분까지 실행 가능합니다.
- **timeout 설정** : 1초부터 15분까지 자유롭게 설정할 수 있습니다.
- **cold start** : 새로운 container 생성 시 추가적인 initialization 시간이 소요됩니다.


### 동시 실행 제한

- **기본 동시 실행 한도** : AWS account 당 1,000개의 동시 실행이 기본 제한입니다.
- **reserved concurrency** : 특정 function에 전용 동시 실행 용량을 예약할 수 있습니다.
- **provisioned concurrency** : cold start를 방지하기 위해 미리 container를 준비해둘 수 있습니다.


### Storage 및 Network 제한

- **temporary storage** : `/tmp` directory에 최대 10GB까지 temporary file을 저장할 수 있습니다.
- **deployment package** : zip file로 50MB, uncompressed로 250MB까지 허용됩니다.
- **environment variable** : 총 4KB까지 environment variable을 설정할 수 있습니다.


---


## Event Source 및 Integration

- AWS Lambda는 다양한 AWS service 및 외부 system과 seamless하게 연동되어 event-driven architecture를 구현합니다.
- 각 event source는 고유한 event format과 처리 방식을 가지고 있어 적절한 integration pattern을 선택하는 것이 중요합니다.


### AWS Service Integration

- **API Gateway** : RESTful API 및 WebSocket API의 backend로 사용되어 HTTP request를 처리합니다.
- **S3** : object 생성, 삭제, 수정 event에 반응하여 file processing pipeline을 구축합니다.
- **DynamoDB** : table의 data 변경 사항을 실시간으로 감지하여 downstream processing을 수행합니다.
- **SNS/SQS** : message queue system과 연동하여 비동기 message processing을 구현합니다.
- **CloudWatch Events** : scheduled event나 AWS service의 state 변화에 대응합니다.
- **Kinesis** : real-time streaming data를 처리하여 analytics 및 monitoring system을 구축합니다.


### External Integration

- **HTTP endpoint** : API Gateway를 통해 external system에서 HTTP request로 function을 호출할 수 있습니다.
- **third-party webhook** : GitHub, Slack 등의 service에서 발생하는 event를 처리합니다.
- **custom application** : AWS SDK를 사용하여 직접 function을 invoke할 수 있습니다.


### Event 처리 Pattern

- **request-Response pattern** : API Gateway를 통한 synchronous 처리에서 사용됩니다.
- **event-driven pattern** : S3, SNS 등에서 발생하는 asynchronous event 처리에 활용됩니다.
- **stream processing pattern** : Kinesis, DynamoDB Streams에서 연속적인 data 처리에 사용됩니다.


---


## 보안 및 권한 관리

- AWS Lambda는 IAM(Identity and Access Management)을 중심으로 한 comprehensive security model을 제공합니다.
- function 실행에 필요한 최소한의 권한만 부여하는 최소 권한 원칙(principle of least privilege)을 준수하는 것이 좋습니다.


### IAM Role 및 Policy

- **execution role** : Lambda function이 AWS service에 접근하기 위한 권한을 정의합니다.
- **resource-based policy** : 다른 AWS service나 account에서 function을 호출할 수 있는 권한을 설정합니다.
- **managed policy** : AWS에서 제공하는 pre-defined policy template을 활용할 수 있습니다.


### VPC 및 Network 보안

- **VPC integration** : private subnet 내의 resource에 접근하기 위해 VPC 환경에서 function을 실행할 수 있습니다.
- **security group** : network traffic을 제어하여 inbound/outbound connection을 관리합니다.
- **NAT Gateway** : internet 접근이 필요한 경우 NAT Gateway를 통해 outbound traffic을 routing합니다.


### 환경 변수 및 비밀 관리

- **environment variable encryption** : KMS를 사용하여 environment variable을 암호화할 수 있습니다.
- **AWS Secrets Manager** : database credential, API key 등의 민감한 정보를 안전하게 관리합니다.
- **AWS Systems Manager Parameter Store** : configuration data를 중앙화하여 관리할 수 있습니다.


---


## Monitoring 및 Debugging

- AWS Lambda는 built-in monitoring 및 debugging tool을 제공하여 function의 성능과 동작을 실시간으로 추적할 수 있습니다.
- 효과적인 monitoring strategy는 production 환경에서 안정적인 service 운영을 위해 필수적입니다.


### CloudWatch Integration

- **자동 logging** : function 실행 중 발생하는 모든 log가 CloudWatch Logs에 자동으로 저장됩니다.
- **metric 수집** : invocation count, duration, error rate, throttle 등의 핵심 지표를 수집합니다.
- **custom metric** : business logic에 특화된 metric을 직접 정의하여 monitoring할 수 있습니다.


### AWS X-Ray Tracing

- **distributed tracing** : microservice architecture에서 request의 전체 경로를 추적합니다.
- **performance analysis** : function의 실행 시간과 bottleneck을 시각적으로 분석할 수 있습니다.
- **dependency mapping** : downstream service와의 연결 관계를 자동으로 mapping합니다.


### Error 처리 및 재시도

- **dead letter queue** : 처리 실패한 event를 별도 queue에 저장하여 후속 처리를 가능하게 합니다.
- **retry mechanism** : asynchronous event의 경우 자동으로 재시도를 수행합니다.
- **error alarm** : CloudWatch Alarm을 통해 error rate threshold 초과 시 알림을 받을 수 있습니다.


---


## 비용 최적화 전략

- AWS Lambda의 pay-per-use 요금 모델을 최대한 활용하기 위해서는 적절한 비용 최적화 전략이 필요합니다.
- memory 할당, 실행 시간, architecture 설계 등 다양한 요소가 전체 비용에 영향을 미칩니다.


### 요금 구조 이해

- **request 요금** : function 호출 횟수에 따라 부과되며, 월 100만 회까지 무료입니다.
- **duration 요금** : GB-second 단위로 계산되며, memory 할당량과 실행 시간의 곱으로 결정됩니다.
- **data transfer** : AWS service 간 data 전송은 대부분 무료이지만, internet으로의 outbound transfer는 요금이 부과됩니다.


### Memory 최적화

- **적정 memory 설정** : function의 실제 memory 사용량에 맞춰 할당량을 조정합니다.
- **CPU 성능 고려** : memory가 증가하면 CPU 성능도 향상되어 실행 시간이 단축될 수 있습니다.
- **benchmark 수행** : 다양한 memory 설정에서 성능과 비용을 측정하여 최적점을 찾습니다.


### Architecture 최적화

- **function 분리** : 단일 function에 모든 logic을 구현하지 않고 적절히 분리하여 효율성을 높입니다.
- **cold start 최소화** : provisioned concurrency 사용 여부를 신중히 결정합니다.
- **caching 활용** : DynamoDB, ElastiCache 등을 활용하여 반복적인 computation을 줄입니다.


---


## 개발 모범 사례

- AWS Lambda 개발 시 따라야 할 best practice는 성능, 보안, 유지 보수성을 모두 고려한 종합적인 접근 방식을 요구합니다.
- 이러한 원칙들을 준수하면 scalable하고 reliable한 serverless application을 구축할 수 있습니다.


### Code 구조화

- **single responsibility** : 하나의 function은 하나의 명확한 책임만 가져야 합니다.
- **stateless design** : function 간에 state를 공유하지 않고 external storage를 활용합니다.
- **error handling** : 예외 상황에 대한 적절한 처리 logic을 구현합니다.
- **dependency 최소화** : 필요한 library만 포함하여 deployment package 크기를 줄입니다.


### 성능 최적화

- **connection pooling** : database connection을 function 외부에서 관리하여 재사용합니다.
- **lazy loading** : 실제 필요한 시점에 resource를 초기화합니다.
- **cache 활용** : 자주 사용되는 data는 memory나 external cache에 저장합니다.
- **warm-up strategy** : critical function의 경우 provisioned concurrency를 고려합니다.


### Test 및 배포

- **unit test** : function의 core logic에 대한 독립적인 test를 작성합니다.
- **integration test** : AWS service와의 연동 부분을 검증합니다.
- **blue-green deployment** : alias와 version을 활용하여 안전한 배포를 수행합니다.
- **canary release** : traffic의 일부만 새 version으로 routing하여 점진적으로 배포합니다.


---


## 사용 사례 및 활용 분야

- AWS Lambda는 다양한 business scenario에서 활용되며, 특히 event-driven processing과 real-time data 처리에 강점을 보입니다.
- 각 사용 사례별로 적합한 architecture pattern과 design consideration이 달라집니다.


### Web Application Backend

- **API 구축** : API Gateway와 연동하여 RESTful API나 GraphQL endpoint를 구현합니다.
- **authentication** : JWT token 검증, OAuth 처리 등의 보안 logic을 처리합니다.
- **file upload** : S3와 연동하여 file upload processing pipeline을 구축합니다.


### Data Processing

- **ETL pipeline** : S3에 저장된 raw data를 변환하여 analytics-ready format으로 처리합니다.
- **real-time analytics** : Kinesis를 통해 streaming data를 실시간으로 분석합니다.
- **image processing** : 업로드된 image의 thumbnail 생성, format 변환 등을 자동화합니다.


### Automation 및 DevOps

- **CI/CD pipeline** : code 배포 과정에서 automated testing, notification 등을 수행합니다.
- **infrastructure monitoring** : CloudWatch event를 기반으로 system health check를 자동화합니다.
- **backup automation** : 정기적인 database backup, log archiving 등을 스케줄링합니다.


### IoT 및 Real-time Processing

- **sensor data processing** : IoT device에서 전송되는 sensor data를 실시간으로 처리합니다.
- **alerting system** : threshold 초과 시 즉시 notification을 발송하는 system을 구축합니다.
- **edge computing** : AWS IoT Greengrass를 통해 edge device에서 Lambda function을 실행합니다.


---


## Reference

- <https://docs.aws.amazon.com/lambda/>
- <https://aws.amazon.com/lambda/>

