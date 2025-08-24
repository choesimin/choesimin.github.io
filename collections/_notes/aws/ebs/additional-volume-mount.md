---
layout: note
permalink: /25
title: Amazon EBS - 새로운 Volume을 만들어 EC2 Instance에 연결하기
description: Amazon EBS의 새로운 Volume을 만들어 EC2 Instance에 추가할 수 있습니다.
date: 2023-07-23
---


## Elastic Block Store : EC2 Instance Volume

- EBS의 새로운 Volume을 만들어 EC2 Instance에 추가(mount)할 수 있습니다.

- EBS Volume을 늘리는 것은 On-premise 장비에 disk를 추가하는 것과 동일합니다.
    - 예를 들어, Windows OS에 HDD나 SSD를 추가하여 D drive, E drive를 추가합니다.

- EBS는 장비를 종료하지 않고 Volume(storage)을 증설할 수 있기 때문에, On-premise보다 저장 공간 운영이 더 유연합니다.


---


## Volume 추가하는 방법

- EBS Web Console에서 volume을 추가하고, EC2 Instance에 접속하여 mount합니다.


### 1. Volume 유형 선택

- 사용 목적에 적합한 유형을 선택합니다.
    - 예를 들어, backup용 storage라면 높은 성능이 필요없기 때문에 용량 대비 저렴한 HDD를 선택합니다.
- IOPS(Input Out Per Second) 수치가 클수록 IO 성능과 비용이 높아집니다.


### 2. Size(용량) 설정

- 용량을 설정합니다.


### 3. Availability Zone(가용 영역) 선택

- storage를 추가하려는 Instance의 가용 영역과 같은 가용 영역을 선택합니다.


### 4. (Optional) Tag 추가

- Volume을 식별할 수 있도록 tag를 추가합니다.
- `Name` tag는 Volume 이름입니다.
- 예를 들어, `Name`에 추가 용량을 의미하는 `web-add` tag를 추가합니다. 


### 5. Volume 최종 생성

- 추가 volume을 최종적으로 생성합니다.


### 6. 생성한 Volume을 Instance에 연결하기

1. 생성한 Volumn의 작업(`Actions`)에서 volume 연결(`Attach volume`)을 시작합니다.
2. 연결할 Instance를 선택합니다.
3. (Optional) `Device name`을 설정합니다.
4. Volume 연결을 완료합니다.


### 7. Volume의 상태 확인

- 사용 중(`In-use`)으로 바뀌었는지 확인합니다.


### 8. Instance에 Volume Mount

- Instance에 접속하여 명령어로 진행합니다.

1. `lsblk` 명령어로 storage가 추가되었는지 확인합니다.
    - `lsblk`는 block storage list를 확인하는 명령어입니다.

2. (Optional) `sudo mkfs -t ext4 /dev/xvdf` 명령어를 실행하여 새로 생성한 volume을 format합니다.
    - 만약 snapshot으로 volume을 만들어 그대로 사용할 목적이라면 이 과정은 수행하지 않습니다.
    - `mkfs`는 make file system의 준말입니다.
    - `-t ext4`는 format 방식입니다.
    - `/dev`는 장치 folder입니다.
    - `/xvdf`는 새로 만든 volume의 이름입니다.

3. `sudo mount /dev/xvdf /mnt` 명령어로 volume을 mount합니다.
    - `/mnt`는 mount storage의 위치입니다.

4. `lsblk` 명령어를 다시 실행하여 mount 상태가 되었는지 확인합니다.


### 9. Mount한 Storage 사용

- `/mnt`에 추가된 directory에 file을 저장하여 mount한 storage를 사용할 수 있습니다.


---


## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
