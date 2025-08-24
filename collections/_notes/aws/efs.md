---
layout: note
permalink: /68
title: Amazon EFS - 탄력적인 완전 관리형 NFS
description: Amazon EFS는 탄력적인 완전 관리형 NFS(Network File System)입니다.
date: 2023-08-06
---


## EFS : Elastic File System

- NFS와 동일합니다.
- auto scaling, auto backup, multi AZ 기능을 지원합니다.
- 여러 가용 영역에 중복으로 저장할 수 있기 때문에 가용성이 높습니다.
    - 하나의 가용 영역이 망가져도 다른 가용 영역의 data를 사용할 수 있습니다.

- Instance의 가용 영역이 달라도 같은 EFS를 공유할 수 있습니다.


---


## EFS를 생성하여 EC2 Instance에 연결하기


### 1. EFS를 위한 Security Group 만들기

1. Security Group의 이름, 설명, VPC를 설정합니다.
2. Inbound 규칙에 `NFS` Type을 `Anywhere` Source로 추가합니다.
    - file storage를 위한 Security Group이기 때문에 `NFS`만 추가하면 됩니다.
3. Outbound 규칙은 기본 값(`All traffic`)을 유지합니다.


### 2. EFS File System 생성하기

- EFS의 생성 기능의 사용자 지정(`Customize`) 기능을 사용하여 더 구체적으로 설정합니다.

1. 이름을 입력합니다.
2. Storage Class를 선택합니다.
    - EFS는 어느 한 곳이 망가져도 복구할 수 있도록 data를 여러 곳에 중복 저장합니다.
    - `Standard`는 여러 가용 영역에 data를 중복 저장하고, `One Zone`은 단일 가용 영역에 data를 중복 저장합니다.
    - 하나의 가용 영역(Zone) 내에서도 data를 저장하는 곳이 나뉘어져 있기 때문에, `One Zone`을 선택하더라도 낮은 수준의 가용성은 보장됩니다.
3. 자동 Backup 기능의 사용 여부를 선택합니다.
4. Network Access를 설정합니다.
    1. VPC를 선택합니다.
    2. 탑재 대상(Mount target)의 가용 영역과 Subnet에 대한 Security Group을 이전 과정에서 EFS를 위해 만든 Security Group으로 지정합니다.
        - Subnet은 Public Subnet과 Private Subnet 중 어느 것을 선택해도 상관없습니다.
5. 생성합니다.


### 3. Instance에 File System 연결하기

1. Instance에 접속합니다.
2. mount하고 싶은 directory로 이동하여 `mkdir efs` 명령어로 EFS에 mount할 folder를 생성합니다.
3. 명령어를 입력하여 mount합니다.
    - 명령어는 File System 상세 console의 연결(`Attach`) 기능에 있는 NFS Client 사용(`Using the NFS client`) 항목을 복사하여 그대로 사용할 수 있습니다.
    - 예를 들어, `sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport [efs_public_domain_address]:/ efs`


---


## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
