---
layout: skill
title: Amazon NAT Gateway - Private Instance의 Internet 연결 제어하기
date: 2023-08-06
---




- Private Instance는 보안 상의 이유로 Private Subnet에 생성되어 Private Route Table에 연결되어 외부에서 접속할 수 없도록 설정한 server를 의미합니다.
- Private Instance에 internet 연결이 필요한 작업(예를 들어, program install/update.)을 해야할 때, NAT Gateway를 사용하여 internet 연결을 제어할 수 있습니다.




## NAT Gateway

- 송신 전용 gateway입니다.
- NAT Gateway는 반드시 Public Subnet에 위치해야 합니다.




---




## NAT Gateway를 이용하여 Private Instance Setting하는 과정


### 1. Private Subnet 만들기

1. VPC를 선택합니다.
2. 가용 영역(Availability Zone) 하나 당 하나의 private subnet을 만들어줍니다.
    2. Subnet 이름을 설정합니다.
        - private subnet은 `pvt`라는 접두어를 많이 사용합니다.
    3. IP 대역(IPv4 CIDR block)을 설정합니다.
        - 예를 들어, `10.0.64.0/20`


### 2. Private Route Table을 만들어 Private Subnet과 연결하기

1. 이름과 VPC를 지정하여 Route Table을 생성합니다.
2. 생성한 Route Table에 명시적 Subnet 연결(`Explicit subnet associations`) 기능으로 Private Subnet들과 연결합니다.


### 3. Public Instance와 Private Instance 만들기

- 나중에 NAT Gateway를 이용하여 Public Subnet의 Instance에서 Private Subnet의 Instance에 접근할 수 있도록 합니다.

1.  Public Instance는 Public Subnet에 연결하여 생성합니다.
    - 이미 생성해 둔 Public Instance가 있다면, 그대로 사용할 수 있습니다.
2.  Private Instance(RDS, EC2)는 과정 중에 만든 Private Subnet에 연결하여 생성합니다.
    - Private Instance의 Security Group에 `SSH`와 


### 4. NAT Gateway 만들기

1. 이름을 입력합니다.
2. Subnet은 Public Subnet 중 하나를 선택하고, 연결 유형(Connectivity type)을 `Public`으로 설정합니다.
    - NAT Gateway에 Public Subnet을 연결해야, Private Instance에 internet이 연결됩니다.
3. 탄력적 IP(Elastic IP) ID를 연결합니다.
    - 탄력적 IP 할당(`Allocate Elastic IP`) 기능을 사용하여 자동으로 할당하고 연결합니다.


### 5. Private Route Table에 NAT Gateway 연결하기

- 이전 과정에서 만든 Private Route Table에 Destination을 `0.0.0.0/0`로, Target을 `NAT Gateway`로 설정하여 추가합니다.


### 6. Private Instance에 접속하여 Internet 연결이 필요한 작업하기

- Public Instance를 경유하여 Private Instance에 접속한 뒤, `ping` 명령어로 internet 연결을 확인합니다.
- Public Instance가 Private Instance의 경유 server(bastion host) 역할을 합니다.
    - 따라서 Public Instance에 key pair의 key를 옮기고, `ssh` 명령어로 Private Instance에 접속합니다.
- NAT Gateway를 만들어 연결하기 전에는 Private Instance에서는 internet에 연결할 수 없습니다.


### 7. NAT Gateway 삭제하기

- 비용이 청구되지 않도록, NAT Gateway를 제거하고 탄력적 IP를 release합니다.
- NAT Gateway를 지우면 Private Instance는 internet 연결이 끊어지고, 내부 통신만 가능한 상태가 됩니다.




---




## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
