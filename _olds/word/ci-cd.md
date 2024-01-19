---
layout: note
---

# CI/CD

- CI; Continuous Integration : 지속적인 통합
- CD
    - Continuous Delivery : 지속적인 service 제공
    - Continuous Deployment : 지속적인 배포
    - 두 용어가 상호 교환적으로 사용됨
- application 개발 단계를 자동화하여 application을 보다 짧은 주기로 고객에게 제공하는 방법
- 기본 개념
    - 지속적인 통합 : CI
    - 지속적인 service 제공 : CD
    - 지속적인 배포 : CD
- CI/CD는 새로운 code 통합으로 인해 개발 및 운영 team에 발생하는 문제(integration hell)을 해결하기 위한 solution

## CI : Continuous Integration

- 현대적인 application 개발에서는 여러 개발자들이 동일한 application의 각기 다른 기능을 동시에 작업할 수 있도록 하는 것을 목표로 함
    - 그러나 조직에서 특정한 날(병합하는 날: merge day)을 정해 모든 분기 source code를 병합하는 경우, 결과적으로 반복적인 수작업에 많은 시간을 소모하게 됨
        - 독립적으로 작업하는 개발자가 application에 변경 사항을 적용할 때 다른 개발자가 동시에 적용하는 변경 사항과 충돌할 가능성이 있기 때문

- CI(지속적 통합)를 통해 개발자들은 code 변경 사항을 공유 branch 또는 "trunk"로 다시 병합하는 작업을 더욱 수월하게 자주 수행할 수 있음
    - 개발자가 application에 적용한 변경 사항이 병합되면 이러한 변경 사항이 application을 손상시키지 않도록 자동으로 application을 구축하고 각기 다른 level의 자동화 test(단위 test 및 통합 test) 실행을 통해 변경 사항이 제대로 적용되었는지를 확인
        - class와 기능에서부터 전체 application을 구성하는 서로 다른 module에 이르기까지 모든 것에 대한 test 수행
        - 자동화된 test에서 기존 code와 신규 code 간의 충돌이 발견되면 CI를 통해 이러한 bug를 더욱 빠르게 자주 수정할 수 있음

## CD : Continuous Delivery

- CI의 build 자동화, 단위 및 통합 test 수행 후, 이어지는 지속적 제공(CD; Continuous Delivery) process에서는 유효한 code를 repository에 자동으로 release
    - 효과적인 지속적 제공 process를 실현하기 위해서는 개발 pipeline에 CI가 먼저 구축되어 있어야 함
    - 지속적 제공의 목표는 production 환경으로 배포할 준비가 되어 있는 codebase를 확보하는 것
- 지속적 제공의 경우, code 변경 사항 병합부터 production에 적합한 build 제공에 이르는 모든 단계에는 test 자동화와 code release 자동화가 포함됨
    - 이 process를 완료하면 운영팀이 보다 빠르고 쉽게 application을 production으로 배포할 수 있음

## CD : Continuous Deployment

- CI/CD pipeline의 마지막 단계는 지속적 배포
    - production 준비가 완료된 build를 code repository에 자동으로 release하는 지속적 제공의 확장된 형태
    - application을 production으로 release하는 작업을 자동화
    - production 이전의 pipeline 단계에는 수동 작업 과정이 없으므로, 지속적 배포가 제대로 이루어지려면 test 자동화가 제대로 설계되어 있어야 함
- 실제 사례에서의 지속적 배포
    - 개발자가 application에 변경 사항을 작성한 후, 몇 분 이내에 application을 자동으로 실행할 수 있는 것을 의미
        - 자동화된 test를 통과한 것으로 간주
    - 이를 통해 사용자 feedback을 지속적으로 수신하고 통합하는 일이 훨씬 수월해짐
    - 이러한 모든 CI/CD 적용 사례는 애플리케이션 배포의 위험성을 줄여줌
        - application 변경 사항을 한 번에 모두 release하지 않고 작은 조각으로 세분화하여 더 쉽게 release할 수 있음
    - 자동화된 test는 CI/CD pipeline의 여러 test 및 release 단계를 수행할 수 있어야 하기 때문에 많은 선행 투자가 필요함

## CI/CD pipeline

- 새 version의 software를 제공하기 위해 수행해야 할 일련의 단계
- 지속적 통합/ 지속적 배포(CI/CD) pipeline은 DevOps 또는 site 신뢰성 engineer(SRE) 방식을 통해 더 효과적으로 software를 제공하는 데에 초점을 맞춘 방법
- 통합 및 test 단계와 제공 및 배포 단계에서 monitoring 및 자동화를 도입하여 application 개발 process를 개선함

## CI/CD pipeline stage

1. Build : application을 compile하는 단계
2. Test : code를 test하는 단계. 자동화 가능
3. Release : application을 repository에 제공하는 단계
4. Deploy : code를 production에 배포하는 단계
5. Validation & Compliance : build 검증 단계
- 꼭 이 단계들을 따르지는 않음
    - 위의 단계들은 흔히 볼 수 있는 단계의 예일 뿐, 조직의 필요에 따라 고유한 pipeline을 구성

---

## Reference

- https://www.redhat.com/ko/topics/devops/what-is-ci-cd
    - CI/CD
- https://itholic.github.io/qa-cicd/
    - 이해를 돕기 위한 추가 설명
- https://www.redhat.com/ko/topics/devops/what-cicd-pipeline
    - pipeline
