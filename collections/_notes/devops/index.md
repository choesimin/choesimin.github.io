---
layout: note
permalink: /476
title: DevOps
description: DevOps는 개발과 운영의 벽을 허물고, 자동화와 협업을 통해 software delivery 속도와 안정성을 높이는 문화이자 방법론입니다.
date: 2025-01-13
---


## DevOps가 해결하는 문제

- 전통적인 조직에서는 **development team과 operations team이 분리**되어 있습니다.
    - development team은 빠른 기능 출시를 원하고, operations team은 system 안정성을 원합니다.
    - 서로 다른 목표로 인해 충돌이 발생합니다.
    - development team이 code를 던지면 operations team이 받아서 배포하는 구조입니다.
    - 배포는 수동으로 진행되어 **느리고 실수가 잦습니다.**
    - 배포 주기가 길어져 한 번에 많은 변경이 포함됩니다.
    - 문제가 발생하면 원인 파악이 어렵고, 서로 책임을 떠넘깁니다.

- DevOps는 **두 team의 협업과 자동화**로 이 문제를 해결합니다.
    - Development(개발)와 Operations(운영)의 합성어입니다.
    - 공통의 목표를 공유하고 함께 책임집니다.
    - build, test, 배포를 자동화하여 속도와 안정성을 모두 확보합니다.


---


## 핵심 원칙

- DevOps는 단순히 도구를 도입하는 것이 아니라 **문화적 변화**를 수반합니다.

- **자동화** : 반복적인 작업을 자동화하여 사람의 실수를 줄입니다.
    - build, test, 배포, infrastructure provisioning을 자동화합니다.
    - 자동화된 작업은 일관성 있고 재현 가능합니다.

- **측정** : data를 기반으로 의사 결정합니다.
    - 배포 빈도, 장애 복구 시간, 변경 실패율 등을 측정합니다.
    - 측정 없이는 개선 여부를 알 수 없습니다.

- **공유** : 지식과 경험을 team 간에 공유합니다.
    - 장애 발생 시 blame 대신 postmortem을 작성합니다.
    - 문서화와 지식 공유가 문화로 자리 잡습니다.

- **feedback** : 빠른 feedback loop를 구축합니다.
    - code 변경 후 몇 분 내에 test 결과를 확인합니다.
    - production 배포 후 monitoring으로 문제를 즉시 감지합니다.


---


## 핵심 Practice

- **CI/CD** : code 변경을 자동으로 build, test, 배포합니다.
    - 개발자가 code를 push하면 자동으로 pipeline이 실행됩니다.
    - 작은 단위로 자주 배포하여 위험을 줄입니다.
    - test가 실패하면 배포가 중단되어 품질을 보장합니다.
    - Jenkins, GitHub Actions, GitLab CI 등을 사용합니다.

- **Infrastructure as Code** : infrastructure를 code로 정의합니다.
    - server, network, database 설정을 code로 관리합니다.
    - version control로 변경 이력을 추적하고 rollback이 가능합니다.
    - 동일한 환경을 반복적으로 재현할 수 있습니다.
    - Terraform, Ansible, CloudFormation 등을 사용합니다.

- **Containerization** : application을 container로 packaging합니다.
    - application과 실행 환경을 함께 packaging하여 일관성을 보장합니다.
    - 개발 환경에서 동작하면 production에서도 동작합니다.
    - Docker로 container를 만들고, Kubernetes로 orchestration합니다.

- **Monitoring과 Observability** : system 상태를 지속적으로 관찰합니다.
    - metrics, logs, traces를 수집하여 system 상태를 파악합니다.
    - 문제를 조기에 발견하고 원인을 빠르게 파악합니다.
    - 장애 발생 시 alert를 보내 빠른 대응이 가능합니다.
    - Prometheus, Grafana, Datadog, ELK Stack 등을 사용합니다.


---


## 도입 시 고려 사항

- **문화 변화**가 먼저입니다.
    - 도구만 도입하고 일하는 방식이 바뀌지 않으면 효과가 없습니다.
    - development team과 operations team이 함께 목표를 설정하고 책임을 공유해야 합니다.

- **점진적**으로 도입합니다.
    - 모든 practice를 한 번에 도입하려 하면 실패합니다.
    - CI부터 시작하여 CD, IaC, Monitoring 순으로 확장합니다.

- **측정 지표**를 정의합니다.
    - 배포 빈도, lead time, 장애 복구 시간, 변경 실패율을 측정합니다.
    - 이 지표들이 개선되는지 확인하며 진행합니다.


---


## Reference

- <https://aws.amazon.com/devops/what-is-devops/>
- <https://www.atlassian.com/devops>

