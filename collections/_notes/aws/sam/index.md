---
layout: note
permalink: /370
title: AWS SAM을 활용한 Serverless Application 개발
description: AWS SAM은 Lambda, API Gateway, DynamoDB 등의 serverless resource를 간소화된 문법으로 정의하고 Infrastructure as Code 방식으로 체계적으로 관리할 수 있게 해주는 CloudFormation 기반의 open source framework입니다.
date: 2025-08-04
---


## AWS SAM : Serverless Application Model

- AWS SAM은 **CloudFormation의 확장**으로서 serverless application에 특화된 template 문법을 제공합니다.
- **transform 기능**을 통해 간소화된 SAM 문법을 표준 CloudFormation template으로 변환합니다.
- **개발자 친화적인 추상화**를 통해 복잡한 AWS resource 설정을 단순화합니다.


### SAM Template 구조

- **SAM template**은 YAML 또는 JSON 형식으로 작성되는 Infrastructure as Code file입니다.
    - `Transform: AWS::Serverless-2016-10-31` 선언으로 SAM 문법을 활성화합니다.
    - CloudFormation template의 모든 기능을 포함하면서 serverless resource에 특화된 기능을 추가합니다.

- **Globals section**을 통해 공통 설정을 한 곳에서 관리할 수 있습니다.
    - function timeout, memory size, environment variable 등을 전역으로 설정합니다.
    - 개별 resource에서 필요시 전역 설정을 override할 수 있습니다.

- **Parameters와 Outputs**를 통해 template의 재사용성을 높입니다.
    - 환경별로 다른 값을 주입할 수 있는 parameter를 정의합니다.
    - 다른 stack에서 참조할 수 있는 output 값을 export합니다.


### Serverless Resource Type

- **AWS::Serverless::Function**으로 Lambda function을 간소화하여 정의합니다.
    - 복잡한 IAM role 설정을 자동으로 생성합니다.
    - event source mapping을 선언적으로 정의할 수 있습니다.
    - dead letter queue, reserved concurrency 등의 고급 설정도 지원합니다.

- **AWS::Serverless::Api**로 API Gateway를 쉽게 구성할 수 있습니다.
    - OpenAPI specification과 연동하여 API를 정의합니다.
    - CORS, authentication, throttling 설정을 간단히 구성합니다.
    - custom domain과 SSL certificate 설정도 포함합니다.

- **AWS::Serverless::HttpApi**로 HTTP API를 효율적으로 구성합니다.
    - REST API보다 빠르고 저렴한 HTTP API를 지원합니다.
    - JWT authorizer와 Lambda authorizer를 쉽게 설정할 수 있습니다.


---


## SAM Ecosystem 구성 요소

- AWS SAM은 **다양한 도구와 service**로 구성된 포괄적인 생태계(ecosystem)를 제공합니다.
- **개발부터 배포까지** 전체 lifecycle을 지원하는 통합된 환경을 구축할 수 있습니다.


### SAM CLI

- **Command line interface**로서 SAM application의 개발과 배포를 지원합니다.
    - local 개발 환경에서 Lambda function과 API를 test할 수 있습니다.
    - project 초기화, build, 배포까지 전체 workflow를 관리합니다.
    - Docker container 기반으로 AWS Lambda runtime을 local에서 시뮬레이션합니다.

- **IDE 통합**을 통해 개발 생산성을 향상시킵니다.
    - VS Code AWS Toolkit과 긴밀하게 연동됩니다.
    - IntelliJ, PyCharm 등의 JetBrains IDE도 지원합니다.
    - Debugging과 profiling 도구를 제공합니다.


### SAM Accelerate

- **rapid development**를 위한 실시간 sync 기능을 제공합니다.
    - code 변경 사항을 AWS 환경에 즉시 반영합니다.
    - infrastructure 변경과 code 변경을 구분하여 최적화된 배포를 수행합니다.
    - hot reload 방식으로 개발 cycle time을 단축시킵니다.

- **Cloud-based development**를 가능하게 합니다.
    - local Docker 없이도 AWS 환경에서 직접 개발할 수 있습니다.
    - team 협업 시 일관된 개발 환경을 제공합니다.


### Application Repository

- **AWS Serverless Application Repository**와 연동하여 template을 공유합니다.
    - 검증된 serverless application pattern을 재사용할 수 있습니다.
    - 자체 application을 repository에 publish하여 조직 내 공유가 가능합니다.
    - third-party application을 쉽게 통합할 수 있습니다.

- **community contribution**을 통한 지속적인 생태계 확장이 이루어집니다.
    - open source project로서 community feedback을 적극 반영합니다.
    - best practice와 reference architecture를 공유합니다.


---


## 주요 활용 사례

- AWS SAM은 **다양한 serverless application pattern**에서 효과적으로 활용됩니다.
- **enterprise 수준의 요구 사항**을 충족하는 scalable한 architecture 구축이 가능합니다.


### API 기반 Application

- **RESTful API service**를 빠르게 구축할 수 있습니다.
    - microservice architecture의 각 service를 독립적으로 배포합니다.
    - API versioning과 backward compatibility를 관리합니다.
    - rate limiting과 authentication을 template에서 선언적으로 설정합니다.

- **GraphQL API**도 Lambda function과 연동하여 구현할 수 있습니다.
    - Apollo Server나 AWS AppSync와 함께 사용합니다.
    - schema-first development 방식을 지원합니다.


### Event-driven Architecture

- **asynchronous processing**을 위한 event-driven system을 구축합니다.
    - S3 event, DynamoDB stream, Kinesis data stream 등 다양한 event source를 지원합니다.
    - event routing과 filtering을 EventBridge와 연동하여 구현합니다.
    - dead letter queue와 retry logic을 통한 robust한 error handling을 제공합니다.

- **Stream processing application**을 효율적으로 개발할 수 있습니다.
    - real-time data processing pipeline을 구축합니다.
    - Kinesis Analytics와 연동하여 complex event processing을 수행합니다.


### Data Processing Workflow

- **ETL(Extract, Transform, Load) pipeline**을 serverless로 구현합니다.
    - Step Functions와 연동하여 복잡한 data processing workflow를 orchestration합니다.
    - S3, RDS, DynamoDB 간의 data 이동과 변환을 자동화합니다.
    - error handling과 monitoring을 통합하여 관리합니다.

- **Machine Learning inference**를 위한 serverless endpoint를 제공합니다.
    - SageMaker model을 Lambda function에서 호출합니다.
    - real-time prediction API를 cost-effective하게 운영합니다.


---


## DevOps 통합

- AWS SAM은 **modern DevOps practice**와 자연스럽게 통합됩니다.
- **CI/CD pipeline**과 **Infrastructure as Code** 방식을 통해 안정적인 배포를 보장합니다.


### CI/CD Pipeline 통합

- **GitHub Actions, Jenkins** 등의 CI/CD 도구와 seamless하게 연동됩니다.
    - SAM template validation, security scanning, unit test를 pipeline에 통합합니다.
    - 환경별 배포 전략(strategy)을 구현합니다.
    - Blue/Green 배포와 canary 배포를 지원합니다.

- **AWS CodePipeline**과의 native 통합을 제공합니다.
    - CodeCommit, CodeBuild, CodeDeploy와 함께 완전한 AWS native pipeline을 구성합니다.
    - CloudFormation ChangeSet을 활용한 안전한 배포를 수행합니다.


### Monitoring 및 Observability

- **CloudWatch**와 통합된 monitoring 설정을 자동화합니다.
    - Lambda function의 성능 metric과 error rate를 추적합니다.
    - custom metric과 alarm을 template에서 정의합니다.
    - X-Ray tracing을 통한 distributed tracing을 설정합니다.

- **Application Insights**를 통한 종합적인 application monitoring을 제공합니다.
    - 성능 bottleneck과 error pattern을 자동으로 감지합니다.
    - 비용 최적화(cost optimization)을 위한 resource 사용량 분석을 수행합니다.


### Security 및 Compliance

- **security best practice**를 template level에서 강제할 수 있습니다.
    - 최소 권한 원칙(least privilege principle)을 적용한 IAM role을 자동 생성합니다.
    - VPC 설정과 security group rule을 체계적으로 관리합니다.
    - encryption at rest와 in transit를 기본으로 설정합니다.

- **compliance 요구 사항**을 code로 관리할 수 있습니다.
    - AWS Config rule을 통한 compliance 검증을 자동화합니다.
    - audit trail을 위한 CloudTrail 설정을 포함합니다.


---


## 제약 사항 및 고려 사항

- AWS SAM 사용 시 **architecture 설계**와 **운영 관리** 측면에서 고려해야 할 사항들이 있습니다.
- **성능 최적화**와 **비용 관리**를 위한 전략적 접근이 필요합니다.


### Architecture 제약 사항

- **CloudFormation의 한계**를 그대로 상속합니다.
    - stack당 resource 개수 제한(500개)이 적용됩니다.
    - 복잡한 application은 nested stack이나 multiple stack으로 분리해야 합니다.
    - cross-stack reference를 통한 dependency 관리가 필요합니다.

- **Lambda function의 특성**을 고려한 설계가 필요합니다.
    - cold start latency를 최소화하는 설계를 고려해야 합니다.
    - 15분 execution timeout 제한을 고려한 작업 분할이 필요합니다.
    - memory와 CPU 제한을 고려한 workload 설계가 중요합니다.


### 운영 관리 고려 사항

- **Multi-environment 관리**를 위한 체계적인 접근이 필요합니다.
    - 환경별 parameter 관리 strategy를 수립해야 합니다.
    - configuration drift를 방지하기 위한 governance가 필요합니다.
    - secret과 credential 관리를 위한 AWS Secrets Manager 연동을 고려해야 합니다.

- **cost optimization**을 위한 지속적인 monitoring이 필요합니다.
    - Lambda function의 memory 할당 최적화를 정기적으로 수행해야 합니다.
    - unused resource와 zombie function을 식별하여 정리해야 합니다.
    - reserved capacity와 provisioned concurrency 설정을 적절히 조정해야 합니다.


### Team 협업 고려 사항

- **template 관리**를 위한 coding standard를 수립해야 합니다.
    - naming convention과 resource tagging 규칙을 정의합니다.
    - code review process에 SAM template 검토를 포함합니다.
    - template의 modular design을 통한 재사용성을 높입니다.

- **knowledge sharing**을 위한 documentation과 training이 필요합니다.
    - SAM best practice와 troubleshooting guide를 문서화합니다.
    - team member 간의 serverless 개발 역량을 균등하게 향상시킵니다.


---


## Reference

- <https://docs.aws.amazon.com/serverless-application-model/>
- <https://aws.amazon.com/serverless/sam/>
- <https://github.com/aws/serverless-application-model>

