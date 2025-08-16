---
layout: note
permalink: /372
title: AWS CloudFormation - Infrastructure as Code
description: AWS CloudFormation은 AWS resource를 code로 정의하고 관리할 수 있는 service로, infra를 자동화하고 일관되게 배포할 수 있게 합니다.
date: 2025-08-16
---


## CloudFormation : Cloud Resource를 체계적으로 형성(Formation)하기

- CloudFormation은 AWS의 공식 Infrastructure as Code service로, JSON이나 YAML 형식의 template을 통해 AWS resource들을 code로 정의하고 관리할 수 있습니다.
- 수동으로 AWS console에서 resource를 하나씩 생성하는 대신, template 파일 하나로 전체 infrastructure를 일관되게 배포하고 관리할 수 있습니다.
- AWS에서 제공하는 모든 service를 지원하며, resource 간의 의존성을 자동으로 처리하여 올바른 순서로 생성하고 삭제합니다.
- stack, drift detection, rollback 등의 개념을 사용해 AWS resource를 효과적으로 관리할 수 있도록 합니다.


### Stack Management

- **Stack**은 CloudFormation template으로 생성된 resource들의 집합을 의미합니다.
- 하나의 stack은 논리적으로 연관된 resource들을 묶어서 관리하며, 생성, 수정, 삭제가 하나의 단위로 처리됩니다.
- stack 내의 모든 resource는 함께 생성되고 함께 삭제되므로, infrastructure의 일관성이 보장됩니다.


### Drift Detection

- **Drift**는 CloudFormation template에 정의된 상태와 실제 AWS resource 상태 간의 차이를 의미합니다.
- 누군가 AWS console에서 직접 resource를 수정하면 drift가 발생할 수 있습니다.
- CloudFormation은 drift detection 기능을 통해 이러한 차이를 감지하고 보고할 수 있습니다.


### Rollback Mechanism

- stack 생성이나 update 중 오류가 발생하면 CloudFormation이 자동으로 이전 상태로 되돌립니다.
- 이를 통해 부분적으로 생성된 resource로 인한 문제를 방지하고, infrastructure의 안정성을 보장합니다.
- rollback 과정에서 생성된 resource는 자동으로 삭제되거나 이전 설정으로 복원됩니다.


---


## CloudFormation Template 구조

- CloudFormation template은 **선언적 방식**으로 작성되며, 원하는 최종 상태를 정의하면 CloudFormation이 자동으로 필요한 작업을 수행합니다.
- template의 핵심 section들은 각각 고유한 역할을 담당하며, 체계적인 infrastructure 정의를 가능하게 합니다.


### Resources Section

- `Resources` section은 template의 **유일한 필수 항목**으로, 생성할 AWS resource들을 정의합니다.
- 각 resource는 고유한 논리적 ID와 resource type, 그리고 필요한 속성들을 포함합니다.
- resource type은 `AWS::ServiceName::ResourceType` 형식으로 표기됩니다.
    - EC2 instance는 `AWS::EC2::Instance`, S3 bucket은 `AWS::S3::Bucket`과 같이 정의합니다.

```yaml
Resources:
  MyWebServer:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0c02fb55956c7d316
      InstanceType: t2.micro
```


### Parameters Section

- `Parameters` section은 template을 실행할 때 사용자가 입력할 수 있는 값들을 정의합니다.
- template의 재사용성을 높이고, 환경별로 다른 설정을 적용할 때 유용합니다.
- parameter type, 기본값, 허용 값 범위 등을 지정할 수 있습니다.

```yaml
Parameters:
  EnvironmentName:
    Type: String
    Default: development
    AllowedValues:
      - development
      - staging
      - production
```


### Outputs Section

- `Outputs` section은 stack 생성 후 반환될 값들을 정의합니다.
- 다른 stack에서 참조하거나, 배포 완료 후 중요한 정보를 확인할 때 사용합니다.
- resource의 속성이나 참조 값을 외부로 노출할 수 있습니다.

```yaml
Outputs:
  WebServerPublicIP:
    Description: Public IP address of the web server
    Value: !GetAtt MyWebServer.PublicIp
    Export:
      Name: !Sub "${AWS::StackName}-WebServerIP"
```


---


## CloudFormation의 내장 함수

- CloudFormation은 template 작성을 돕는 다양한 내장 함수들을 제공합니다.
- 이러한 함수들을 활용하면 동적이고 유연한 template을 작성할 수 있습니다.


### 참조 함수

- `!Ref` 함수는 parameter나 resource의 값을 참조할 때 사용합니다.
- parameter를 참조하면 parameter 값을, resource를 참조하면 해당 resource의 물리적 ID를 반환합니다.

```yaml
InstanceType: !Ref InstanceTypeParameter
SecurityGroups:
  - !Ref MySecurityGroup
```


### 속성 함수

- `!GetAtt` 함수는 resource의 특정 속성값을 가져올 때 사용합니다.
- 각 resource type마다 사용 가능한 속성들이 정의되어 있으며, 이를 통해 resource 간 연결이 가능합니다.

```yaml
DatabaseEndpoint: !GetAtt MyRDSInstance.Endpoint.Address
LoadBalancerDNS: !GetAtt MyLoadBalancer.DNSName
```


### 문자열 함수

- `!Sub` 함수는 문자열 내에서 변수 치환을 수행합니다.
- `${변수명}` 형식으로 parameter나 resource 참조를 포함할 수 있습니다.

```yaml
UserData: !Sub |
  #!/bin/bash
  echo "Instance ID: ${AWS::StackId}" > /tmp/info.txt
  yum update -y
```


### 조건 함수

- `!If`, `!Equals`, `!Not` 등의 함수를 통해 조건부 resource 생성이 가능합니다.
- 환경에 따라 다른 resource를 생성하거나, 특정 조건에서만 resource를 생성할 수 있습니다.

```yaml
Conditions:
  IsProduction: !Equals [!Ref Environment, production]

Resources:
  ProductionOnlyResource:
    Type: AWS::S3::Bucket
    Condition: IsProduction
```


---


## CloudFormation 장점과 한계

- CloudFormation은 AWS infrastructure 관리의 표준 도구로서 다양한 장점을 제공하지만, 동시에 몇 가지 한계점도 존재합니다.


### 장점

- **일관성 보장** : 동일한 template으로 여러 환경에 동일한 infrastructure를 배포할 수 있어 환경 간 차이를 최소화합니다.
- **Version 관리** : template을 Git 등의 version control system으로 관리하여 infrastructure 변경 이력을 추적할 수 있습니다.
- **의존성 관리** : resource 간 의존성을 자동으로 파악하여 올바른 순서로 생성하고 삭제합니다.
- **무료 Service** : CloudFormation 자체는 무료이며, 생성된 AWS resource에 대해서만 비용이 발생합니다.


### 한계점

- **학습 곡선** : YAML/JSON 문법과 AWS resource 속성들을 모두 숙지해야 하므로 초기 학습 부담이 큽니다.
- **제한된 programming 기능** : 반복문이나 복잡한 logic 구현이 어려워 동적인 template 작성에 한계가 있습니다.
- **verbose한 문법** : 간단한 resource도 많은 양의 code가 필요하여 template이 길어질 수 있습니다.
- **debugging 어려움** : 오류 발생 시 원인 파악과 해결이 복잡할 수 있습니다.


---


## 실제 사용 사례

- CloudFormation은 다양한 규모와 복잡도의 project에서 활용되고 있습니다.


### Web Application Infrastructure

- EC2 instance, Application Load Balancer, RDS database, S3 bucket 등을 포함하는 완전한 web application stack을 정의할 수 있습니다.
- Auto Scaling Group을 통한 자동 확장과 Multi-AZ 배포를 통한 고가용성을 구현합니다.
- Security Group과 IAM role 설정을 통해 보안 요구사항을 충족합니다.


### Multi-Environment 배포

- 동일한 template을 사용하여 development, staging, production 환경을 구성합니다.
- parameter를 통해 환경별로 다른 instance type, database 크기, network 설정을 적용합니다.
- environment별 naming convention과 tag 적용을 통해 resource 관리를 체계화합니다.


### 재해 복구 System

- 주 region과 보조 region에 동일한 infrastructure를 배포하여 재해 복구 환경을 구축합니다.
- Cross-region replication과 automated backup을 통해 data 보호를 실현합니다.
- Route 53과 연동하여 failover scenario를 자동화합니다.


---


## Reference

- <https://docs.aws.amazon.com/cloudformation/>
- <https://aws.amazon.com/cloudformation/resources/templates/>
- <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-reference.html>

