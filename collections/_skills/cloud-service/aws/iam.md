---
layout: skill
permalink: /93
title: Amazon IAM - 사용자의 접근 권한 제어하기
description: AWS의 IAM을 사용하여 사용자의 접근 권한을 제어할 수 있습니다.
date: 2023-07-23
---


## IAM : Identify and Access Management

- IAM은 AWS의 여러 기능에 대한 사용자의 접근을 제어합니다.

- root 사용자는 하위 사용자와 사용자 group을 만들어 권한을 관리할 수 있습니다.
    - 사용자에게 권한을 부여할 수 있습니다.
    - group에 권한을 설정하고, 사용자를 group에 추가하여 관리할 수도 있습니다.

```mermaid
mindmap
    root((Root 계정))
        user_infra(Infra 개발자 : EC2 모든 권한, RDS 모든 권한, S3 모든 권한, Route53 모든 권한)
        group_sales[영업 Team : Athena 모든 권한, QuickSight 모든 권한]
            user_sales_1(영업 사원 1)
            user_sales_2(영업 사원 2)
        group_development[개발 Team : S3 조회 수정 권한, EC2 조회 권한]
            user_development_1(개발자 1)
            user_development_2(개발자 1)
```
