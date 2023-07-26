---
layout: note
title: Amazon EC2 - Instance 생성하기
date: 2023-07-16
---




- 사용 목적과 운영 환경에 따라서 여러가지 option들을 설정하여 적합한 Instance를 만듭니다.




---




## Instance 생성하는 방법

- EC2 Web Console에서 생성합니다.


### 1. (Optional) Instance 이름 지정

- 이름을 반드시 입력할 필요는 없지만, 다른 server와의 구별을 위해 명시적으로 지어주는 것이 좋습니다.
- 생성을 완료한 후에도 수정할 수 있습니다.


### 2. Instance 유형 선택

- CPU, Memory(RAM), AMI(운영 체제)을 선택합니다.
- 사용 목적에 맞게 CPU 갯수와 Memory 용량을 선택합니다.
- AMI(Amazon Machine Image)는 운영 체제를 의미합니다.
    - 실제 업무에는 가장 최신 version의 OS보다는 최신 바로 전의 검증된 version을 사용하는 것을 권장합니다.
    - Amazon Linux는 CentOS와 유사한 AWS에 특화된 OS입니다.
    - Windows는 license가 있기 때문에 Linux보다 시간 당 비용이 더 비쌉니다.


### 3. Key pair 설정

- Key pair가 없다면 새 Key pair를 생성합니다.
    - Key pair 유형은 `RSA`, key file 형식은 `.pem`으로 지정하는 것이 일반적입니다.


### 4. Network 설정

- 수정하지 않으면, 기본 network로 설정되기 때문에 아래의 상세 설정은 건너뛰고 그대로 사용해도 됩니다.

1. VPC를 설정합니다.
    - 기본 VPC를 사용해도 됩니다.
    - 이전에 기본 VPC를 삭제했다면, VPC 설정 console로 들어가 기본 VPC를 생성할 수 있습니다.

2. Subnet을 설정합니다.
    - AZ(Availability Zone, 가용 영역)에 대한 Subnet을 선택합니다.

3. Public IP 자동 할당 여부를 설정합니다.
    - 활성화하면 공인 IP를 생성할 Instance에 자동으로 할당할 수 있습니다.
    - 비활성화하면 공인 IP를 직접 구매하여 연결해야 합니다.

4. 방화벽을 설정합니다.
    - Security group을 지정합니다.
        - Security group는 VPC 별로 존재합니다.
        - VPC마다 default Security group이 있지만, 새로 만들어 사용하는 것을 권장합니다.
    - 기존의 Security group이 없다면 새로 만듭니다.
        - Security group 규칙을 추가해야 합니다.
        - Web server를 만드는 것이라면, Inbound 규칙에 `HTTP`, `HTTPS`를 Source 유형 `Anyware`로 추가합니다.
        - `ping` test를 위해 Inbound 규칙에 `모든 ICMP`를 Source 유형 `Anyware`로 추가합니다.
            -  `ping` 명령은 ICMP(Internet Control Message Protocol)을 통해 동작하기 때문입니다.


### 5. Storage 선택

- 용량과 종류를 선택하고 새로운 volume을 추가합니다.
- 종류는 목적에 맞게 선택합니다.
    - e.g., `gp`는 General Purpost를 의미합니다.


### 6. (Optional) 고급 세부 정보 설정

- `User data` 설정 항목에 Instance를 가동할 때 실행할 script를 지정할 수도 있습니다.
    - e.g., `yum install -y httpd`.


### 7. Instance 최종 생성

- 만약 Free tier Instance 생성에 실패했다면, 선택한 Subnet이 Free tier를 지원하는 Subnet인지 확인합니다.
    - e.g., seoul region의 경우, Free tier는 'a'와 'c'로 끝나는 Subnet만 사용할 수 있습니다.




---




# Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
