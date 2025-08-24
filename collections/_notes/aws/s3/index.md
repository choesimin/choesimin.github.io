---
layout: note
permalink: /203
title: Amazon S3 - 저렴한 대용량 저장소
description: Amazon S3는 대용량 객체 저장을 위한 Cloud Service입니다.
date: 2023-08-06
---


## Amazon S3 : Simple Storage Service

- Amazon의 Cloud 객체 저장 service입니다.
    - 'S3'는 'Simple Storage Service'의 약자로, 'S'가 3번 반복되어 'S3'로 이름이 지어졌습니다.

- 기본적으로, S3는 data를 외부에 공개하는 것에 대해 보수적입니다.
    - data를 외부에 노출시키는 것은 보안 문제가 발생할 수 있기 때문입니다.
    - 따라서 file의 외부 접근을 혀용할 때는 항상 경고 문구가 표시되고, 사용자는 이에 동의해야 합니다.


---


## S3 Bucket 생성 과정

- 이름과 지역을 제외한 모든 설정은 생성이 완료된 후에도 변경이 가능합니다.


### 1. Bucket의 이름 입력

- Bucket의 이름은 AWS의 모든 Bucket들을 통틀어 고유해야 합니다.


### 2. 지역 선택

- Region을 선택합니다.


### 3. 객체 소유권(`Object Ownership`) 설정

- ACL의 활성화 여부를 선택합니다.
- ACL를 비활성화하면 외부 접근이 차단되며, 보안상 비활성화하는 것을 권장합니다.
- 그러나 S3의 data를 외부에 노출시켜야 하는 상황이라면, ACL을 활성화하고 Public Access 차단 설정(`Block Public Access settings for this bucket`)을 허용합니다.
    - 예를 들어, S3로 정적 Web site를 구축하는 경우.


### 4. Bucket Version 관리(`Bucket Versioning`) 여부 선택

- 활성화하면 file을 upload하거나 삭제할 때마다 다른 공간에 복사본을 저장합니다.


### 5. 기본 암호화(`Default encryption`) 설정

- 암호화 유형을 선택합니다.
- Bucket Key 활성화 여부를 선택합니다.


---


## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
