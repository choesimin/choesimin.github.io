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

```txt
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
- 각 command는 특정 목적에 따라 repository와 working copy 간의 상호작용을 처리합니다.


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


## Reference

- <https://subversion.apache.org/>
- <https://svnbook.red-bean.com/>
