---
layout: skill
title: Amazon RDS - 완전 관리형 RDB 사용하기
date: 2023-07-23
---




## RDS : Relational Database Service

- 관계형 database에 대한 완전 관리형 service입니다.
    - 가용성 유지, 자동 backup, autoscaling 등의 service를 제공합니다.

- RDS는 Instance를 생성합니다.
    - EC2 Instance는 computing에, RDS Instance는 storage에 초첨이 맞춰져 있습니다.




---




## RDS를 만드는 과정


### 1. DB Engine 선택하기

- DB Engine과 version을 선택합니다.
    - e.g., Aurora, MySQL, MariaDB, PostgreSQL, Oracle 등.


### 2. Template을 선택하기

- Template을 선택합니다.
- `운영`, `개발`, `Free Tier` 등이 있습니다.
- template에 따라서 기본 spec이 다르므로, 용도에 맞추어 선택합니다.


### 3. Availability(가용성)과 Durability(내구성) 기능 설정하기

- `Single DB`를 선택하면 standby DB 없이 하나의 Instance만 만듭니다.
- `Multi-AZ DB`를 선택하면 primary DB와 standby DB를 나누어 Instance를 여러 가용 영역에 생성합니다.
    - e.g., 한 가용 영역의 data center가 재난에 의해 망가지면, standby DB를 사용합니다.


### 4. DB의 이름 정하기

- Instance의 식별값이기 때문에 해당 region에서 유일한 이름이어야 합니다.


### 5. 자격 증명 설정하기

- database에 접속할 수 있는 사용자의 username과 password를 설정합니다.


### 6. DB Instance 선택하기

- Instance를 선택합니다.
- Instance마다 CPU, RAM, network 속도 등이 다릅니다.
    - EC2 Instance의 유형과 유사합니다.


### 7. 용량 설정하기

- 저장 장치 종류를 선택합니다.
    - e.g., SSD, HDD.

- autoscaling 여부를 선택합니다.
    - autoscaling을 사용하면 storage를 모두 사용했을 때, 추가 storage를 자동으로 증설합니다.
    - autoscaling을 사용하면 system이 자동으로 늘릴 수 있는 최대 용량을 함께 설정합니다.

- IOPS(Input Output Per Second)를 설정합니다.


### 8. Connectivity(연결성) 설정하기

- EC2에 연결하면, 
- EC2에 연결하지 않으면, VPC나 Subnet 등의 다른 network 설정은 자동으로 해줍니다.
- 사용할 VPC, Subnet, AZ, Security group 등을 선택합니다.
    - 이미 있는 방화벽을 사용해도 무관하지만, DB용 Security group을 새로 만드는 것을 권장합니다.
- `Public access`는 보안상 사용하지 않는 것을 권장합니다.
    - `Public access`를 사용하면 외부에서 DB에 접속할 수 있습니다.


### 9. 추가 구성(`Additional configuration`) 설정하기

- 초기에 생성할 database를 설정할 수 있습니다.
    - 지정하지 않으면 Instance 내에 database가 생성되지 않으므로, DB Instance 생성을 마치고, DB에 접속하여 만들어야 합니다.

- 자동 backup 기능 활성화 여부를 선택합니다.
    - snapshot을 만드는 주기와 시간을 설정할 수 있습니다.

- 암호화(`Encryption`) 여부를 설정합니다.
    - 통신하는 data가 도청당했을 때, 쉽게 해석할 수 없도록 합니다.

- Log 정책(Amazon CloudWatch Logs)을 설정합니다.

- minor version 자동 upgrade 여부를 설정합니다.




---




## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
