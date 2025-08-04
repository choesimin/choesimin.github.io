---
layout: note
permalink: /371
title: AWS SAM CLI - SAM Framework 개발 도구
description: AWS SAM CLI는 serverless application을 local에서 개발, test, 배포할 수 있게 해주는 명령줄 도구입니다.
date: 2025-08-04
---


## AWS SAM CLI

- AWS SAM CLI는 SAM framework를 실제로 사용하기 위한 **명령줄 도구**입니다.
- local 환경에서 serverless application을 개발하고 test할 수 있는 **개발 환경**을 제공합니다.
- project 생성부터 배포까지 **전체 개발 workflow**를 command line에서 관리할 수 있습니다.


### Local 개발 환경

- `sam local start-api` command로 local 환경에서 API Gateway를 simulation할 수 있습니다.
    - Lambda function이 API endpoint로 연결되어 실제 AWS 환경과 동일하게 동작합니다.
    - hot reload 기능으로 code 변경 시 자동으로 function이 재시작됩니다.

- `sam local invoke` command로 개별 Lambda function을 직접 호출하여 test할 수 있습니다.
    - event data를 JSON file로 전달하여 다양한 scenario를 test할 수 있습니다.
    - debug mode를 활성화하여 IDE와 연동한 debugging이 가능합니다.

- Docker container 기반으로 AWS Lambda runtime 환경을 local에서 정확히 재현합니다.
    - 실제 배포 환경과 동일한 조건에서 개발할 수 있어 환경 차이로 인한 문제를 방지합니다.


### 핵심 Command 활용법

- **Project 초기화** : `sam init` command로 새로운 serverless project를 생성합니다.
    - 다양한 runtime(Python, Node.js, Java, Go 등)과 template을 선택할 수 있습니다.
    - Hello World, REST API, Event processing 등의 사전 정의된 template을 제공합니다.
    - `--no-interactive` option으로 script 환경에서 자동 생성이 가능합니다.

- **Build 처리** : `sam build` command로 Lambda function과 dependency를 build합니다.
    - source code와 dependency를 `.aws-sam/build/` directory에 package합니다.
    - 각 runtime에 맞는 build process를 자동으로 실행합니다.
    - `--use-container` option으로 Docker container에서 build하여 환경 일관성을 보장합니다.

- **배포 실행** : `sam deploy` command로 AWS 환경에 application을 배포합니다.
    - CloudFormation stack을 생성하거나 update합니다.
    - `--guided` option으로 interactive 배포 설정이 가능합니다.
    - `--confirm-changeset` option으로 변경 사항을 확인 후 배포할 수 있습니다.


### IDE 통합 개발 환경

- **VS Code AWS Toolkit**과의 긴밀하게 통합됩니다.
    - SAM template 문법 highlighting과 자동 완성 기능을 지원합니다.
    - local debugging 시 breakpoint 설정과 variable 검사가 가능합니다.
    - CloudFormation resource 시각화와 AWS service 탐색 기능을 제공합니다.

- **PyCharm, IntelliJ** 등의 JetBrains IDE와도 연동됩니다.
    - remote debugging 설정으로 local Lambda function을 step-by-step debugging할 수 있습니다.
    - unit test 실행과 coverage 측정이 IDE 내에서 가능합니다.


### CI/CD Pipeline 통합

- **GitHub Actions, Jenkins** 등의 CI/CD 도구와 자연스럽게 연동됩니다.
    - `sam build`, `sam deploy` command를 pipeline script에 직접 사용할 수 있습니다.
    - 환경별 배포를 위한 parameter 관리가 용이합니다.

- **AWS CodePipeline, CodeBuild**와의 native 통합을 지원합니다.
    - `buildspec.yml`에 SAM command를 정의하여 자동 build와 배포가 가능합니다.
    - Blue/Green 배포와 canary 배포 전략을 template에서 설정할 수 있습니다.


### 설치 및 설정

- **다양한 운영 체제**에서 설치 가능하며, AWS CLI와 독립적으로 동작합니다.
    - macOS : `brew install aws-sam-cli`로 Homebrew 설치.
    - Windows : MSI installer 또는 `pip install aws-sam-cli`.
    - Linux : pip 또는 각 배포판의 package manager 사용.

- **필수 dependency** 설정이 개발 환경 구축에 필요합니다.
    - Docker Desktop : Local Lambda runtime 실행을 위해 필수.
    - AWS CLI 설정 : 인증과 region 설정을 위해 필요.
    - Git : Project 관리와 template download를 위해 권장.


### 제약 사항

- **local 개발 환경의 한계**가 존재합니다.
    - AWS service와의 실제 network latency는 재현되지 않습니다.
    - VPC 설정이나 security group은 local에서 simulation되지 않습니다.

- **performance 최적화**를 위한 지속적인 관리가 필요합니다.
    - cold start 최적화를 위한 package 크기 관리가 중요합니다.
    - CloudWatch를 통한 지속적인 성능 monitoring 설정이 필요합니다.


---


## Reference

- <https://github.com/aws/aws-sam-cli>
- <https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli.html>

