---
layout: note
permalink: /369
title: AWS CLI - AWS를 command line으로 사용하기
description: AWS CLI는 Amazon Web Service의 모든 service를 command line에서 직접 제어할 수 있는 도구로, 복잡한 AWS resource 관리 작업을 자동화하고 효율적으로 수행할 수 있게 해줍니다.
date: 2025-08-03
---


## AWS CLI

- AWS CLI는 Amazon Web Service의 다양한 service를 command line에서 관리할 수 있는 통합 도구입니다.
- 이 도구를 통해 EC2 instance 관리, S3 bucket 조작, IAM 사용자 관리 등 대부분의 AWS 작업을 자동화할 수 있습니다.
- local 환경에서 script를 작성하여 AWS resource를 효율적으로 관리하고, CI/CD pipeline에 통합하여 배포 자동화도 구현할 수 있습니다.


---


## 설치 및 기본 설정

- AWS CLI를 사용하기 위해서는 먼저 설치와 기본 인증 설정이 필요합니다.
- 설치 방법은 운영 체제별로 다르며, 설치 후 AWS 계정 정보를 등록해야 합니다.


### 설치하기

- 운영 체제에 따라 다른 설치 방법을 사용합니다.

- **Windows 설치** : AWS CLI installer를 download하여 설치합니다.
    - AWS 공식 website에서 Windows용 MSI installer를 download합니다.
    - installer를 실행하고 안내에 따라 설치를 완료합니다.
    - PowerShell 또는 Command Prompt에서 `aws --version` 명령으로 설치를 확인합니다.

- **macOS 설치** : Homebrew를 사용하거나 공식 installer를 사용할 수 있습니다.
    - Homebrew 사용 시 : `brew install awscli`.
    - 공식 installer 사용 시 : AWS website에서 macOS용 installer를 download하여 설치합니다.
    - Terminal에서 `aws --version` 명령으로 설치를 확인합니다.

- **Linux 설치** : package manager 또는 pip를 사용하여 설치합니다.
    - Ubuntu/Debian : `sudo apt update && sudo apt install awscli`.
    - CentOS/RHEL : `sudo yum install awscli`.
    - pip 사용 시 : `pip install awscli`.
    - 설치 후 `aws --version` 명령으로 확인합니다.


### 인증 설정하기

- AWS CLI를 사용하기 위해서는 AWS 계정의 access key와 secret key가 필요합니다.
- 보안을 위해 root 계정이 아닌 IAM 사용자의 key를 사용하는 것을 권장합니다.

- **IAM 사용자 생성 및 Key 발급** : 사용자를 생성하고 필요한 권한을 부여합니다.
    - AWS Management Console에서 IAM service로 이동합니다.
    - 새 사용자를 생성하고 programmatic access를 선택합니다.
    - 필요한 권한을 부여한 후 사용자를 생성합니다.
        - 최소 권한 원칙에 따라 필요한 service만 접근 가능하도록 권한을 제한합니다.
    - 생성 완료 후 access key ID와 secret access key를 안전한 곳에 저장합니다.

- **CLI 설정** : `aws configure` 명령을 실행하여 인증 정보를 설정합니다.
    - Access Key ID : IAM 사용자에게 발급된 access key를 입력합니다.
    - Secret Access Key : IAM 사용자에게 발급된 secret key를 입력합니다.
    - Default region name : 주로 사용할 AWS region을 입력합니다.
        - 한국은 `ap-northeast-2`을 사용합니다.
    - Default output format : 출력 형식을 선택합니다.
        - `json`, `text`, `table` 중 하나를 선택합니다.
    - 설정이 완료되면 `~/.aws/credentials` file에 인증 정보가 저장됩니다.

- **Profile 관리** : 여러 AWS 계정이나 환경을 사용하는 경우 profile을 활용합니다.
    - `aws configure --profile [profile-name]` 명령으로 새로운 profile을 생성합니다.
    - `aws --profile [profile-name] [command]` 형식으로 특정 profile을 사용하여 명령을 실행합니다.
    - `export AWS_PROFILE=[profile-name]` 명령으로 기본 profile을 변경할 수 있습니다.


---


## 주요 Service별 사용법

- AWS CLI는 각 service마다 고유한 명령어 구조를 가지고 있습니다.


### EC2 Instance 관리

- EC2는 AWS의 핵심 computing service로, instance 생성부터 종료까지 모든 작업이 가능합니다.

- **Instance 조회하기** : 현재 계정에 있는 모든 EC2 instance를 조회합니다.
    - `aws ec2 describe-instances` : 모든 instance의 상세 정보를 출력합니다.
    - `aws ec2 describe-instances --query "Reservations[*].Instances[*].[InstanceId,State.Name,PublicIpAddress]" --output table` : instance ID, 상태, 공인 IP만 table 형태로 출력합니다.
    - `aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"` : 실행 중인 instance만 filtering하여 조회합니다.

- **Instance 시작/중지하기** : 기존 instance의 상태를 변경합니다.
    - `aws ec2 start-instances --instance-ids i-1234567890abcdef0` : 지정된 instance를 시작합니다.
    - `aws ec2 stop-instances --instance-ids i-1234567890abcdef0` : 지정된 instance를 중지합니다.
    - `aws ec2 reboot-instances --instance-ids i-1234567890abcdef0` : 지정된 instance를 rebooting합니다.
    - `aws ec2 terminate-instances --instance-ids i-1234567890abcdef0` : 지정된 instance를 영구 삭제합니다.

- **Instance 생성하기** : 새로운 EC2 instance를 생성합니다.
    - AMI ID, instance type, key pair, security group 등의 정보가 필요합니다.
    - `aws ec2 run-instances --image-id ami-0abcdef1234567890 --count 1 --instance-type t2.micro --key-name my-key-pair --security-group-ids sg-903004f8`.
    - `--user-data file://userdata.sh` option을 사용하여 instance 시작 시 실행할 script를 지정할 수 있습니다.


### S3 Bucket 및 Object 관리

- S3는 AWS의 객체 저장 service로, file upload/download 및 bucket 관리가 가능합니다.

- **Bucket 관리하기** : S3 bucket의 생성, 조회, 삭제 작업을 수행합니다.
    - `aws s3 ls` : 계정 내 모든 bucket 목록을 조회합니다.
    - `aws s3 mb s3://my-new-bucket` : 새로운 bucket을 생성합니다.
    - `aws s3 rb s3://my-bucket --force` : bucket을 삭제합니다 (`--force` option은 bucket 내 모든 object도 함께 삭제).

- **File Upload/Download** : local file과 S3 간 data를 전송합니다.
    - `aws s3 cp localfile.txt s3://my-bucket/` : local file을 S3 bucket에 upload합니다.
    - `aws s3 cp s3://my-bucket/remotefile.txt ./` : S3의 file을 local로 download합니다.
    - `aws s3 sync ./local-folder s3://my-bucket/remote-folder` : local folder와 S3 folder를 동기화합니다.
    - `aws s3 rm s3://my-bucket/file.txt` : S3의 특정 file을 삭제합니다.

- **대용량 전송 최적화** : 큰 file이나 많은 file을 효율적으로 전송할 수 있습니다.
    - `--recursive` option을 사용하여 folder 전체를 처리합니다.
    - `--exclude` 및 `--include` option으로 특정 file pattern을 제외하거나 포함시킵니다.
    - multipart upload가 자동으로 활성화되어 대용량 file 전송이 최적화됩니다.


### IAM 사용자 및 권한 관리

- IAM은 AWS의 identity 및 access 관리 service로, 사용자와 권한을 제어합니다.

- **사용자 관리하기** : IAM 사용자의 생성, 조회, 삭제 작업을 수행합니다.
    - `aws iam list-users` : 모든 IAM 사용자 목록을 조회합니다.
    - `aws iam create-user --user-name newuser` : 새로운 IAM 사용자를 생성합니다.
    - `aws iam delete-user --user-name olduser` : 기존 IAM 사용자를 삭제합니다.
    - `aws iam get-user --user-name username` : 특정 사용자의 상세 정보를 조회합니다.

- **권한 관리하기** : 사용자나 group에 policy를 연결하여 권한을 부여합니다.
    - `aws iam list-attached-user-policies --user-name username` : 사용자에게 연결된 policy 목록을 조회합니다.
    - `aws iam attach-user-policy --user-name username --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess` : 사용자에게 policy를 연결합니다.
    - `aws iam detach-user-policy --user-name username --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess` : 사용자에서 policy를 분리합니다.

- **Access Key 관리하기** : programmatic access를 위한 access key를 관리합니다.
    - `aws iam create-access-key --user-name username` : 사용자에게 새로운 access key를 생성합니다.
    - `aws iam list-access-keys --user-name username` : 사용자의 access key 목록을 조회합니다.
    - `aws iam delete-access-key --user-name username --access-key-id AKIA...` : 특정 access key를 삭제합니다.


---


## 고급 사용법 및 최적화

- AWS CLI의 기본 기능 외에도 효율성을 높이는 다양한 고급 기능들이 있습니다.
- 이러한 기능들을 활용하면 더욱 생산적으로 AWS resource를 관리할 수 있습니다.


### Output 형식 및 Query 최적화

- AWS CLI의 출력을 원하는 형태로 가공하여 필요한 정보만 추출할 수 있습니다.

- **Output 형식 변경하기** : 다양한 출력 형식을 지원하여 용도에 맞게 선택할 수 있습니다.
    - `--output json` : JSON 형식으로 출력합니다.
        - 기본 설정 값입니다.
    - `--output table` : 사람이 읽기 쉬운 표 형식으로 출력합니다.
    - `--output text` : tab으로 구분된 text 형식으로 출력합니다.
    - `--output yaml` : YAML 형식으로 출력합니다.

- **JMESPath Query 사용하기** : `--query` option을 사용하여 JSON 응답에서 필요한 data만 추출합니다.
    - `aws ec2 describe-instances --query "Reservations[*].Instances[*].InstanceId"` : 모든 instance ID만 추출합니다.
    - `aws ec2 describe-instances --query "Reservations[*].Instances[?State.Name=='running'].PublicIpAddress"` : 실행 중인 instance의 공인 IP만 추출합니다.
    - `aws s3api list-objects --bucket my-bucket --query "Contents[?Size > 1000000].Key"` : 1MB 이상의 object만 추출합니다.

- **Filter 활용하기** : AWS service에서 제공하는 filter 기능을 사용하여 server 측에서 data를 filtering합니다.
    - EC2 filter : `--filters "Name=instance-type,Values=t2.micro" "Name=instance-state-name,Values=running"`
    - S3 filter : `--prefix "logs/" --start-after "logs/2023/"`
    - CloudWatch filter : `--log-group-name-prefix "/aws/lambda/"`


### Batch 작업 및 Automation

- 반복적인 작업이나 대량의 resource를 처리할 때 유용한 기능들입니다.

- **여러 Resource 동시 처리하기** : 하나의 명령으로 여러 resource를 동시에 처리할 수 있습니다.
    - `aws ec2 start-instances --instance-ids i-1234567890abcdef0 i-0987654321fedcba0` : 여러 instance를 동시에 시작합니다.
    - `aws s3 sync s3://source-bucket s3://destination-bucket --delete` : 두 bucket 간 동기화를 수행합니다.
    - `aws iam attach-user-policy --user-name user1 --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess` : 여러 사용자에게 같은 policy를 적용할 때는 script로 반복 실행합니다.

- **Script 작성하기** : shell script나 batch file을 작성하여 복잡한 작업을 자동화합니다.
    - 조건문과 반복문을 활용하여 동적인 작업을 수행합니다.
    - error handling을 포함하여 안정적인 script를 작성합니다.
    - 환경 변수를 활용하여 재사용 가능한 script를 만듭니다.

- **CLI 성능 최적화** : 대량 작업 시 성능을 향상시키는 방법들입니다.
    - `--cli-read-timeout` 및 `--cli-connect-timeout` option으로 timeout 값을 조정합니다.
    - `--max-concurrent-requests` option으로 동시 요청 수를 조정합니다.
    - pagination을 활용하여 대량 data를 효율적으로 처리합니다.


### 보안 및 Best Practice

- AWS CLI 사용 시 보안을 강화하고 효율성을 높이는 방법들이 있습니다.

- **인증 보안 강화하기** : access key 노출을 방지하고 안전하게 관리하는 방법입니다.
    - IAM role을 사용하여 EC2 instance에서 직접 권한을 부여합니다.
    - AWS SSO(Single Sign-On)를 활용하여 임시 자격 증명을 사용합니다.
    - MFA(Multi-Factor Authentication)를 활성화하여 추가 보안을 적용합니다.
    - 정기적으로 access key를 rotate하여 보안을 유지합니다.

- **권한 최소화 원칙** : 필요한 최소한의 권한만 부여하여 보안 위험을 줄입니다.
    - resource별로 세분화된 권한을 부여합니다.
    - 시간 제한이 있는 임시 권한을 활용합니다.
    - 정기적으로 권한을 검토하고 불필요한 권한을 제거합니다.

- **비용 최적화** : AWS CLI 사용 시 불필요한 비용을 방지하는 방법들입니다.
    - resource에 tag를 추가하여 비용 tracking을 개선합니다.
    - 사용하지 않는 resource를 자동으로 정리하는 script를 작성합니다.
    - billing alert를 설정하여 예상치 못한 비용 발생을 모니터링합니다.


---


## 문제 해결 및 Debug

- 효과적인 debugging 방법을 알아두면 문제 발생 시 빠르게 대응할 수 있습니다.


### 일반적인 Error 및 해결 방법

- **인증 관련 Error** : 가장 흔하게 발생하는 인증 및 권한 관련 문제들입니다.
    - `Unable to locate credentials` : `aws configure` 명령으로 인증 정보를 설정하거나 IAM role을 확인합니다.
    - `Access Denied` : IAM 사용자나 role에 필요한 권한이 있는지 확인합니다.
    - `Invalid security token` : token이 만료되었거나 잘못된 경우이므로 새로운 token을 발급받습니다.
    - `Region not found` : 올바른 region code를 사용하고 있는지 확인합니다.

- **Network 관련 Error** : network 연결이나 timeout과 관련된 문제들입니다.
    - `Connection timeout` : network 연결 상태를 확인하고 timeout 값을 늘려봅니다.
    - `SSL Certificate verification failed` : certificate 문제일 수 있으므로 `--no-verify-ssl` option을 임시로 사용해봅니다.
    - `Endpoint not found` : 올바른 service endpoint를 사용하고 있는지 확인합니다.

- **Resource 관련 Error** : AWS resource 자체와 관련된 문제들입니다.
    - `Resource not found` : resource ID나 이름이 정확한지, 올바른 region에서 조회하고 있는지 확인합니다.
    - `Resource already exists` : 중복된 이름이나 ID로 resource를 생성하려고 할 때 발생합니다.
    - `Limit exceeded` : AWS service limit에 도달했을 때 발생하므로 limit 증가를 요청하거나 기존 resource를 정리합니다.


### Debug 및 Log 활용하기

- **Verbose Output 활성화하기** : 상세한 실행 정보를 확인하여 문제를 진단합니다.
    - `--debug` option을 사용하여 모든 HTTP 요청과 응답을 확인합니다.
    - `--cli-read-timeout 0` option으로 timeout을 비활성화하여 긴 작업을 기다립니다.
    - `--dry-run` option을 지원하는 명령에서는 실제 실행 없이 검증만 수행합니다.

- **Log 분석하기** : AWS CLI의 log를 분석하여 문제를 해결합니다.
    - AWS CLI는 기본적으로 `~/.aws/cli/cache` directory에 log를 저장합니다.
    - CloudTrail을 활용하여 API 호출 내역을 추적할 수 있습니다.
    - 각 service의 log group을 CloudWatch에서 확인하여 상세한 정보를 얻습니다.

- **Performance 문제 해결하기** : 느린 응답이나 timeout 문제를 해결하는 방법들입니다.
    - `--max-concurrent-requests` 값을 조정하여 동시 요청 수를 최적화합니다.
    - 큰 결과 set의 경우 pagination을 활용하여 부분적으로 처리합니다.
    - 불필요한 data를 제외하기 위해 filter와 query를 적극 활용합니다.


### CLI 환경 설정 최적화

- **Configuration File 관리하기** : AWS CLI 설정을 효율적으로 관리하는 방법입니다.
    - `~/.aws/config` file에서 region, output format, 기타 설정을 관리합니다.
    - `~/.aws/credentials` file에서 여러 profile의 인증 정보를 관리합니다.
    - 환경 변수를 활용하여 동적으로 설정을 변경할 수 있습니다.

- **Auto-completion 설정하기** : 명령어 자동 완성 기능을 설정하여 생산성을 향상시킵니다.
    - bash에서는 `complete -C aws_completer aws` 명령을 `.bashrc`에 추가합니다.
    - zsh에서는 `autoload -U +X compinit && compinit` 후 AWS completion을 활성화합니다.
    - 자주 사용하는 명령어에 대해서는 alias를 설정하여 입력을 간소화합니다.

- **CLI Version 관리하기** : AWS CLI version을 적절히 관리하여 호환성과 보안을 유지합니다.
    - 정기적으로 `aws --version`으로 현재 version을 확인합니다.
    - 새로운 기능이나 보안 update를 위해 정기적으로 update합니다.
    - 특정 project에서 특정 version이 필요한 경우 virtual environment를 활용합니다.


---


## Reference

- <https://docs.aws.amazon.com/cli/latest/userguide/>
- <https://awscli.amazonaws.com/v2/documentation/api/latest/index.html>
- <https://docs.aws.amazon.com/cli/latest/reference/>

