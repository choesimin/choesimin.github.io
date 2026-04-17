---
layout: note
permalink: /348
title: SVN - 중앙 집중형 Version Management System
description: SVN은 중앙 server에 모든 version history를 저장하는 집중형 version management system입니다.
date: 2025-06-26
---


## SVN : 중앙 집중형 Version Management System

- SVN(Subversion)은 중앙 집중형 version management system으로, file과 directory의 변경 사항을 추적하고 관리합니다.
- Apache Software Foundation에서 개발하여 무료로 제공되며, 대규모 project에서 안정적인 version 관리를 위해 널리 사용됩니다.
- 중앙 server에 모든 version history를 저장하고, 여러 개발자가 동시에 작업할 수 있도록 협업 환경을 제공합니다.


---


## SVN의 핵심 개념

- SVN은 **중앙 집중형 architecture**를 기반으로 하여 단일 중앙 repository에서 모든 version 정보를 관리합니다.
- **revision 번호**를 통해 각 변경 사항을 추적하며, 전체 repository에 대해 순차적으로 증가하는 숫자를 부여합니다.
- **atomic commit**을 지원하여 여러 file의 변경 사항을 하나의 단위로 처리하고, 실패 시 모든 변경 사항을 rollback합니다.


### Repository 구조

```plaintext
svn_repository/
├── trunk/
├── branches/
└── tags/
```

- **trunk** : 주요 개발이 이루어지는 main branch 역할을 하며, 최신 stable code를 포함합니다.
- **branches** : feature 개발이나 실험적인 작업을 위한 별도 분기를 저장하는 directory입니다.
- **tags** : 특정 시점의 snapshot을 저장하여 release version이나 milestone을 표시합니다.


### Working Copy

- 개발자의 local machine에 존재하는 repository의 복사본으로, 실제 작업이 이루어지는 공간입니다.
- `.svn` directory를 통해 metadata와 version 정보를 유지하며, 중앙 repository와의 동기화 상태를 추적합니다.
- local 변경 사항과 repository의 최신 상태를 비교하여 conflict를 감지하고 해결할 수 있습니다.


---


## 주요 Command

- SVN은 command line interface를 통해 다양한 version 관리 작업을 수행할 수 있습니다.
- 각 command는 특정 목적에 따라 repository와 working copy 간의 상호 작용을 처리합니다.


### 기본 작업 Command

- `svn checkout` : 중앙 repository에서 working copy를 생성하여 local environment에 project를 복사합니다.
- `svn update` : 중앙 repository의 최신 변경 사항을 working copy에 반영하여 동기화합니다.
- `svn commit` : local 변경 사항을 중앙 repository에 저장하고 새로운 revision을 생성합니다.
- `svn add` : 새로운 file이나 directory를 version control 대상에 추가합니다.
- `svn delete` : file이나 directory를 삭제하고 다음 commit에서 repository에서 제거합니다.


### 정보 조회 Command

- `svn status` : working copy의 변경 상태를 확인하고 modified, added, deleted file을 표시합니다.
- `svn diff` : local 변경 사항과 repository의 기존 version 간의 차이점을 비교하여 보여줍니다.
- `svn log` : repository의 commit history와 각 revision의 변경 내용을 시간순으로 조회합니다.
- `svn info` : working copy나 repository의 기본 정보와 현재 revision 상태를 확인합니다.


### Branch 관리 Command

- `svn copy` : trunk에서 branch를 생성하거나 tag를 만들 때 사용하며, 효율적인 복사를 수행합니다.
- `svn switch` : working copy를 다른 branch나 tag로 변경하여 작업 대상을 전환합니다.
- `svn merge` : 다른 branch의 변경 사항을 현재 branch에 병합하여 code를 통합합니다.


---


## SVN의 장점과 단점

- SVN은 중앙 집중형 architecture로 인해 특정 환경에서 유리한 점과 불리한 점이 있습니다.


### 장점

- **중앙 집중형 관리**로 인해 관리자가 권한과 접근을 쉽게 제어할 수 있습니다.
- **atomic commit**을 통해 data 무결성을 보장하고 부분적인 변경으로 인한 오류를 방지합니다.
- **directory version 관리**를 지원하여 file뿐만 아니라 directory 구조 변경도 추적합니다.
- **binary file 처리**에 최적화되어 있어 image, document 등의 binary file을 효율적으로 관리합니다.


### 단점

- **중앙 server 의존성**으로 인해 network 연결이 없으면 대부분의 작업이 불가능합니다.
- **offline 작업 제한**이 있어 commit, update, log 조회 등의 주요 기능을 사용할 수 없습니다.
- **branch 생성 비용**이 상대적으로 높아 빈번한 branching이 어렵습니다.
- **merge 처리**가 복잡하고 conflict 해결 과정에서 오류가 발생할 가능성이 높습니다.


---


## Git과의 비교

- SVN과 Git은 서로 다른 architecture와 workflow를 가진 version management system입니다.
- 각각의 특성에 따라 project의 규모와 팀의 작업 방식에 적합한 선택이 달라집니다.


### Architecture 차이점

| 구분 | SVN | Git |
| --- | --- | --- |
| **구조** | 중앙 집중형으로 단일 repository에서 모든 history 관리 | 분산형으로 각 개발자가 완전한 repository 복사본 보유 |
| **version 식별** | revision 번호를 순차적으로 부여하여 전체 project에 대한 일관된 version 관리 제공 | hash 기반 commit ID를 사용하여 분산 환경에서의 고유성 보장 |


### 작업 방식 차이점

| 구분 | SVN | Git |
| --- | --- | --- |
| **commit 방식** | 중앙 server에 직접 commit하여 즉시 다른 개발자와 변경 사항 공유 | local repository에 commit 후 push를 통해 remote repository에 변경 사항 전송 |
| **branch 관리** | branch 생성과 merge가 상대적으로 복잡하고 비용이 높음 | 가벼운 branch 생성과 빠른 merge를 통해 유연한 workflow 지원 |


---


## 사용 사례

- SVN은 특정 환경과 요구 사항에서 Git보다 적합한 선택이 될 수 있습니다.
- 조직의 정책과 project 특성을 고려하여 적절한 version management system을 선택해야 합니다.


### SVN이 적합한 경우

- **중앙 집중형 관리**가 필요한 기업이나 조직에서 엄격한 접근 제어를 요구하는 경우입니다.
- **binary file**이 많은 project에서 효율적인 저장과 관리가 필요한 경우입니다.
- **linear development**를 선호하고 복잡한 branching strategy가 필요하지 않은 경우입니다.
- **기존 SVN infrastructure**가 구축되어 있어 migration 비용이 부담스러운 경우입니다.


### Git이 적합한 경우

- **분산 개발**이 필요하고 offline 작업이 빈번한 환경에서 사용하는 경우입니다.
- **frequent branching**과 experimental feature 개발이 활발한 project에서 사용하는 경우입니다.
- **open source project**나 외부 contributor가 많은 환경에서 사용하는 경우입니다.
- **modern development workflow**를 도입하고 CI/CD pipeline과 통합이 필요한 경우입니다.


---


## 실무 사용 예시

- 실무에서는 매일 출근 후 최신 code를 받고, 퇴근 전 작업 내용을 commit하는 pattern이 일반적입니다.
- release 시점에 tag를 생성하고, 긴급 수정이 필요하면 해당 tag에서 branch를 만들어 hotfix를 진행합니다.


### Project 최초 Checkout

- 신규 입사자나 새 PC 환경에서 처음 project를 받을 때 `svn checkout`을 사용합니다.
- checkout 후에는 `svn update`만으로 최신 code를 받습니다.

```bash
# repository 주소 확인 후 checkout
svn checkout https://svn.company.com/repos/payment-api/trunk payment-api
# A    payment-api/src
# A    payment-api/src/service
# A    payment-api/src/service/PaymentService.java
# ...
# Checked out revision 1542.

cd payment-api

# 현재 상태 확인
svn info
# Path: .
# Working Copy Root Path: /home/dev/payment-api
# URL: https://svn.company.com/repos/payment-api/trunk
# Revision: 1542
```


### 일일 작업 흐름

- 개발자는 출근 후 `svn update`로 다른 팀원의 변경 사항을 받고, 작업 완료 후 `svn commit`으로 반영합니다.

```bash
# 출근 후 최신 code 받기
svn update
# Updating '.':
# U    src/service/UserService.java
# U    src/controller/OrderController.java
# Updated to revision 1542.

# 작업 수행 후 변경 사항 확인
svn status
# M       src/service/PaymentService.java
# M       src/dao/PaymentDao.java

# commit 전 변경 내용 검토
svn diff

# 퇴근 전 commit
svn commit -m "결제 취소 API 추가"
# Committed revision 1543.
```


### Release Tag 생성

- 운영 배포 전 현재 trunk 상태를 tag로 저장하여 배포 시점의 snapshot을 보관합니다.

```bash
# release tag 생성
svn copy https://svn.company.com/repos/payment-api/trunk \
         https://svn.company.com/repos/payment-api/tags/release-2.1.0 \
         -m "Release 2.1.0 배포"

# 생성된 tag 확인
svn list https://svn.company.com/repos/payment-api/tags/
# release-2.0.0/
# release-2.1.0/
```


### 운영 Hotfix 처리

- 운영 환경에서 긴급 버그가 발견되면 release tag에서 hotfix branch를 생성하여 수정합니다.
- trunk의 개발 중인 code와 분리하여 안전하게 hotfix를 진행합니다.

```bash
# release tag에서 hotfix branch 생성
svn copy https://svn.company.com/repos/payment-api/tags/release-2.1.0 \
         https://svn.company.com/repos/payment-api/branches/hotfix-2.1.1 \
         -m "Hotfix branch for critical payment bug"

# hotfix branch로 전환
svn switch https://svn.company.com/repos/payment-api/branches/hotfix-2.1.1

# bug 수정 후 commit
svn commit -m "결제 금액 소수점 반올림 오류 수정"

# hotfix 완료 후 tag 생성
svn copy https://svn.company.com/repos/payment-api/branches/hotfix-2.1.1 \
         https://svn.company.com/repos/payment-api/tags/release-2.1.1 \
         -m "Hotfix release 2.1.1"

# trunk에도 hotfix 반영
svn switch https://svn.company.com/repos/payment-api/trunk
svn merge https://svn.company.com/repos/payment-api/branches/hotfix-2.1.1
svn commit -m "Merge hotfix-2.1.1 into trunk"
```


### 동시 작업으로 인한 Conflict 해결

- 여러 개발자가 같은 file을 수정하면 `svn update` 시 conflict가 발생합니다.
- conflict marker를 확인하고 수동으로 병합한 뒤 `svn resolved`로 해결 완료를 표시합니다.

```bash
# update 시 conflict 발생
svn update
# Conflict discovered in 'src/service/UserService.java'.
# Select: (p) postpone, (df) diff-full, (e) edit, ...
# p 입력하여 나중에 해결

svn status
# C       src/service/UserService.java
# ?       src/service/UserService.java.mine
# ?       src/service/UserService.java.r1540
# ?       src/service/UserService.java.r1543

# file을 열어 conflict marker 확인 및 수정
# <<<<<<< .mine
# private int maxRetryCount = 5;
# =======
# private int maxRetryCount = 3;
# >>>>>>> .r1543

# 적절한 값으로 수정 후 conflict 해결 완료 표시
svn resolved src/service/UserService.java

svn commit -m "Merge conflict 해결 : maxRetryCount 값 통합"
```


### 장애 발생 시 Rollback

- 배포 후 장애가 발생하면 이전 revision으로 rollback하여 빠르게 복구합니다.

```bash
# 최근 commit 이력 확인
svn log -l 5
# r1543 | kim | 2024-01-15 14:30:00 | 결제 흐름 변경  <- 문제 발생
# r1542 | lee | 2024-01-15 11:20:00 | 주문 조회 개선
# r1541 | park | 2024-01-14 17:00:00 | 회원 API 수정

# r1543 변경 사항 되돌리기
svn merge -c -1543 .
# Reverse-merging r1543 into '.':
# U    src/service/PaymentService.java

# rollback commit
svn commit -m "Rollback r1543 : 결제 장애로 인한 긴급 복구"
```


---


## Reference

- <https://subversion.apache.org/>
- <https://svnbook.red-bean.com/>
