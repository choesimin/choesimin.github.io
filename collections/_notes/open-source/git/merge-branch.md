---
layout: note
permalink: /15
title: Git - Source Code Version 관리하기
description: Git은 source code의 version을 관리하는 system으로, 여러 개발자가 동시에 작업할 수 있도록 협업 기능을 제공합니다.
date: 2025-02-09
published: false
---


## Git Branch Merge(병합)하는 방법

- Git에서 branch 병합은 여러 개발자가 작업한 code를 하나의 branch로 통합하는 핵심 기능입니다.
- develop branch에서 작업한 내용을 master branch로 병합하는 과정과 다양한 merge 전략을 제공합니다.
- merge 과정에서 발생할 수 있는 충돌 상황과 해결 방법까지 체계적으로 다룹니다.


---


## 기본 Merge 수행 방법

- Git에서 branch를 병합하는 기본적인 절차는 4단계로 구성됩니다.
- 안전한 병합을 위해 각 단계를 순서대로 수행해야 합니다.

### Master Branch로 전환

- 병합할 대상 branch인 master branch로 먼저 전환합니다.

```bash
git checkout master
```

### Master Branch 최신 상태 동기화

- 원격 repository의 최신 변경 사항을 local master branch에 반영합니다.
- 다른 개발자의 변경 사항이 포함된 최신 상태로 업데이트하여 충돌을 미리 방지합니다.

```bash
git pull origin master
```

### Develop Branch Merge 실행

- develop branch의 모든 변경 사항을 master branch로 병합합니다.
- 충돌이 발생하지 않으면 자동으로 merge commit이 생성됩니다.

```bash
git merge develop
```

### 원격 Repository에 Push

- 병합된 결과를 원격 repository에 반영하여 다른 개발자들과 공유합니다.

```bash
git push origin master
```


---


## Merge 전략별 상세 방법

- Git은 세 가지 주요 merge 전략을 제공하며, 각각 다른 commit history 구조를 만듭니다.
- project의 특성과 team의 workflow에 따라 적절한 전략을 선택할 수 있습니다.

### Fast-Forward Merge

- Git의 기본 merge 방식으로, 별도의 merge commit을 생성하지 않습니다.
- develop branch의 commit들이 master branch에 직접 추가되어 linear한 history를 유지합니다.
- master branch에 새로운 commit이 없고 develop branch가 앞서 있을 때 사용됩니다.

```bash
git merge develop
```

### No-Fast-Forward Merge

- 항상 merge commit을 생성하여 branch 병합 이력을 명확하게 기록합니다.
- develop branch의 존재와 병합 시점을 commit history에서 명확히 확인할 수 있습니다.
- **협업 환경에서 권장되는 방식**으로, branch 간의 작업 구분이 명확해집니다.

```bash
git merge --no-ff develop
```

### Squash Merge

- develop branch의 모든 commit을 하나의 commit으로 압축하여 master branch에 병합합니다.
- 복잡한 개발 과정을 단순화하여 깔끔한 commit history를 유지할 수 있습니다.
- feature branch의 세부적인 commit 이력을 master branch에서 제거하고 싶을 때 유용합니다.

```bash
git merge --squash develop
git commit -m "Merge develop into master"
```


---


## 충돌 해결 과정

- merge 과정에서 같은 file의 같은 부분이 두 branch에서 다르게 수정되었을 때 충돌이 발생합니다.
- 충돌은 수동으로 해결해야 하며, Git이 자동으로 해결할 수 없는 상황입니다.

### 충돌 발생 시 상황 확인

- `git status` 명령어로 충돌이 발생한 file 목록을 확인합니다.
- 충돌이 발생한 file은 "both modified" 상태로 표시됩니다.

```bash
git status
```

### 충돌 File 수정

- 충돌이 발생한 file을 editor로 열어 충돌 marker를 확인합니다.
- `<<<<<<<`, `=======`, `>>>>>>>` marker 사이의 내용을 적절히 수정합니다.
- 필요한 code만 남기고 충돌 marker는 모두 제거합니다.

### 수정된 File Stage 및 Commit

- 충돌을 해결한 file을 staging area에 추가합니다.
- merge commit을 완료하여 충돌 해결 과정을 마무리합니다.

```bash
git add <충돌_해결_파일>
git commit
```


---


## 권장 사항 및 Best Practice

- 안전하고 효율적인 merge를 위한 실무 지침과 주의 사항을 제시합니다.
- team 협업 환경에서 발생할 수 있는 문제를 예방하는 방법을 다룹니다.

### Pull Request/Merge Request 활용

- **GitHub, GitLab 등의 web interface를 통한 PR/MR 사용을 강력히 권장합니다.**
- code review 과정을 거쳐 품질을 보장하고 team member 간의 소통을 원활하게 합니다.
- 자동화된 test와 CI/CD pipeline을 통해 merge 전 품질 검증이 가능합니다.

### 충분한 Test 수행

- develop branch에서 모든 기능이 정상 동작하는지 확인한 후 merge를 진행합니다.
- unit test, integration test, manual test를 통해 regression을 방지합니다.
- production 환경과 유사한 staging 환경에서의 검증도 필요합니다.

### Branch 정리 및 관리

- merge 완료 후 불필요한 local branch를 삭제하여 repository를 깔끔하게 유지합니다.
- feature branch는 merge 후 즉시 삭제하는 것이 일반적입니다.

```bash
# local branch 삭제
git branch -d develop

# remote branch 삭제
git push origin --delete develop
```

### Commit Message 규칙 준수

- merge commit의 message는 명확하고 일관된 형식으로 작성합니다.
- 어떤 기능이나 수정 사항이 병합되었는지 간단명료하게 기술합니다.

```bash
git merge --no-ff develop -m "Merge feature/user-authentication into master"
```


---


## 고급 Merge 기법

- 복잡한 개발 상황에서 활용할 수 있는 고급 merge 기법을 소개합니다.
- 특수한 상황에서 필요한 추가적인 option과 전략을 제공합니다.

### Interactive Rebase 후 Merge

- commit history를 정리한 후 merge하여 더욱 깔끔한 이력을 만듭니다.
- 불필요한 commit을 squash하거나 commit message를 수정할 수 있습니다.

```bash
git checkout develop
git rebase -i master
git checkout master
git merge develop
```

### Cherry-Pick을 통한 선택적 Merge

- 특정 commit만 선택하여 다른 branch로 가져오는 방법입니다.
- 전체 branch를 merge하지 않고 필요한 변경 사항만 적용할 때 유용합니다.

```bash
git cherry-pick <commit-hash>
```

### Three-Way Merge Strategy

- 복잡한 충돌 상황에서 merge strategy를 명시적으로 지정할 수 있습니다.
- `recursive`, `octopus`, `ours`, `subtree` 등의 전략을 선택할 수 있습니다.

```bash
git merge -s recursive develop
```


---


## Merge 작업 시 주의 사항

- merge 과정에서 발생할 수 있는 위험 요소와 예방 방법을 다룹니다.
- 실수를 방지하고 안전한 작업 환경을 구축하는 지침을 제공합니다.

### Backup 및 복구 준비

- 중요한 merge 작업 전에는 반드시 backup을 생성합니다.
- `git reflog`를 활용하여 문제 발생 시 이전 상태로 복구할 수 있습니다.

```bash
# 현재 상태 확인
git reflog

# 이전 상태로 복구
git reset --hard HEAD@{n}
```

### Team과의 Communication

- merge 전에 team member들과 충분한 소통을 진행합니다.
- 동시에 같은 branch에서 작업하는 경우 coordination이 필요합니다.
- merge 시점과 방법에 대해 사전에 합의하여 충돌을 방지합니다.

### Production Branch 보호

- master branch나 main branch에 대한 보호 정책을 설정합니다.
- direct push를 금지하고 PR/MR을 통해서만 변경할 수 있도록 제한합니다.
- 관리자 승인 없이는 중요한 branch를 수정할 수 없도록 권한을 관리합니다.


---


## Reference

- <https://git-scm.com/docs/git-merge>
- <https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request>
- <https://docs.gitlab.com/ee/user/project/merge_requests/>

