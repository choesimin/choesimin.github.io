---
layout: skill
title: Amazon EBS - EC2 Instance의 Root Volume 확장하기
date: 2023-07-23
---


- EC2 Instance의 root volume을 늘릴 수 있습니다.
- root volume은 additional volume과 달리 확장하고 나면 다시 줄일 수 없습니다.


---


## Root Volume 확장하는 방법

- EBS Dashboard에서 volume을 확장하고, Instance에 접속하여 확장한 volume을 적용합니다.


### 1. Volume 확장하기

1. root volume을 선택하고 작업(`Actions`)의 volume 수정(`Modify volume`)을 눌러 확장을 시작합니다.
2. 용량을 확장합니다.


### 2. 확장한 Volume을 Instance에 적용하기

- EC2 Instance에 접속하여 진행합니다.

1. `sudo growpart /dev/xvda 1` 명령어를 실행합니다.
    - `lsblk` 명령어로 root partition 크기가 늘어났는지 확인합니다.

3. `sudo xfs_growfs -d /` 명령어를 실행합니다.
    - `df -h` 명령어로 현재 사용 중인 용량을 확인합니다.


---


## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
