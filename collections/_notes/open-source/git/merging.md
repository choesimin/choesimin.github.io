---
layout: note
permalink: /454
title: Git Branch 병합
description: Git에서 branch 병합은 merge, squash merge, fast-forward 등의 전략을 사용하며, 충돌 발생 시 수동으로 해결한 후 commit하여 완료합니다.
date: 2025-06-05
---


## Git Branch 병합하기

- Git에서 branch 병합은 여러 개발자가 작업한 code를 하나의 branch로 통합하는 핵심 기능입니다.
- develop branch에서 작업한 내용을 master branch로 병합하는 과정과 다양한 merge 전략이 있습니다.
- merge 과정에서 발생할 수 있는 충돌 상황과 해결 방법도 포함됩니다.


### 기본적인 Merge 방식

- Git에서 branch를 병합하는 기본적인 절차는 4단계로 구성됩니다.

1. `git checkout master` : 병합할 대상 branch인 master branch로 전환합니다.
2. `git pull origin master` : 원격 repository의 최신 변경 사항을 local에 반영합니다.
3. `git merge develop` : develop branch의 모든 변경 사항을 master branch로 병합합니다.
4. `git push origin master` : 병합된 결과를 원격 repository에 반영합니다.


---


## Merge 전략

- Git은 세 가지 주요 merge 전략을 제공하며, 각각 다른 commit history 구조를 만듭니다.
- project의 특성과 team의 작업 흐름에 따라 적절한 전략을 선택할 수 있습니다.

- **Fast-Forward Merge** : Git의 기본 merge 방식으로, 별도의 merge commit을 생성하지 않습니다.
    - develop branch의 commit들이 master branch에 직접 추가되어 선형 이력을 유지합니다.
    - master branch에 새로운 commit이 없고 develop branch가 앞서 있을 때 사용됩니다.
    - `git merge develop` 명령어를 사용합니다.

- **No-Fast-Forward Merge** : 항상 merge commit을 생성하여 branch 병합 이력을 명확하게 기록합니다.
    - develop branch의 존재와 병합 시점을 commit history에서 명확히 확인할 수 있습니다.
    - **협업 환경에서 권장되는 방식**으로, branch 간의 작업 구분이 명확해집니다.
    - `git merge --no-ff develop` 명령어를 사용합니다.

- **Squash Merge** : develop branch의 모든 commit을 하나의 commit으로 압축하여 master branch에 병합합니다.
    - 복잡한 개발 과정을 단순화하여 깔끔한 commit history를 유지할 수 있습니다.
    - feature branch의 세부적인 commit 이력을 master branch에서 제거하고 싶을 때 유용합니다.
    - `git merge --squash develop && git commit` 명령어를 사용합니다.


### Default Merge 전략 설정

- `git pull` 실행 시 적용할 기본 merge 전략을 설정할 수 있습니다.
- 설정하지 않으면 Git이 경고 메시지를 출력합니다.

```bash
# merge를 기본 전략으로 설정
git config pull.rebase false

# rebase를 기본 전략으로 설정
git config pull.rebase true

# fast-forward만 허용 (불가능하면 실패)
git config pull.ff only
```

- `--global` option을 추가하면 모든 repository에 적용됩니다.


---


## 충돌 해결 과정

- merge 과정에서 같은 file의 같은 부분이 두 branch에서 다르게 수정되었을 때 충돌이 발생합니다.
- 충돌은 수동으로 해결해야 하며, Git이 자동으로 해결할 수 없는 상황입니다.

- **충돌 발생 시 상황 확인** : `git status` 명령어로 충돌이 발생한 file 목록을 확인합니다.
    - 충돌이 발생한 file은 "both modified" 상태로 표시됩니다.

- **충돌 File 수정** : 충돌이 발생한 file을 editor로 열어 충돌 marker를 확인합니다.
    - `<<<<<<<`, `=======`, `>>>>>>>` marker 사이의 내용을 적절히 수정합니다.
    - 필요한 code만 남기고 충돌 marker는 모두 제거합니다.

- **수정된 File Stage 및 Commit** : 충돌을 해결한 file을 staging 영역에 추가합니다.
    - `git add <충돌_해결_파일>` 명령어로 staging 후 `git commit`으로 merge를 완료합니다.


---


## 권장 사항 및 Best Practice

- merge 전 PR/MR로 code review를 거치고, 충분한 test를 수행하며, merge 후에는 branch를 정리합니다.

- **Pull Request/Merge Request 활용** : GitHub, GitLab 등의 web interface를 통해 PR/MR을 사용합니다.
    - code review 과정을 거쳐 품질을 보장하고 team member 간의 소통을 원활하게 합니다.
    - 자동화된 test와 CI/CD pipeline을 통해 merge 전 품질 검증이 가능합니다.

- **충분한 Test 수행** : develop branch에서 모든 기능이 정상 동작하는지 확인한 후 merge를 진행합니다.
    - unit test, integration test, manual test를 통해 regression을 방지합니다.
    - production 환경과 유사한 staging 환경에서의 검증도 필요합니다.

- **Branch 정리 및 관리** : merge 완료 후 불필요한 local branch를 삭제하여 repository를 깔끔하게 유지합니다.
    - feature branch는 merge 후 즉시 삭제하는 것이 일반적입니다.
    - `git branch -d develop`으로 local branch를, `git push origin --delete develop`으로 remote branch를 삭제합니다.

- **Commit Message 규칙 준수** : merge commit의 message는 명확하고 일관된 형식으로 작성합니다.
    - 어떤 기능이나 수정 사항이 병합되었는지 간단명료하게 기술합니다.
    - `git merge --no-ff develop -m "Merge feature/user-authentication into master"` 형식을 사용합니다.


---


## 고급 Merge 기법

- Interactive Rebase, Cherry-Pick, Three-Way Merge Strategy는 복잡한 상황에서 유용한 고급 기법입니다.

- **Interactive Rebase 후 Merge** : commit history를 정리한 후 merge하여 깔끔한 이력을 만듭니다.
    - 불필요한 commit을 squash하거나 commit message를 수정할 수 있습니다.
    - `git rebase -i master` 후 `git merge develop` 명령어를 사용합니다.

- **Cherry-Pick을 통한 선택적 Merge** : 특정 commit만 선택하여 다른 branch로 가져옵니다.
    - 전체 branch를 merge하지 않고 필요한 변경 사항만 적용할 때 유용합니다.
    - `git cherry-pick <commit-hash>` 명령어를 사용합니다.

- **Three-Way Merge Strategy** : 복잡한 충돌 상황에서 merge strategy를 명시적으로 지정합니다.
    - `recursive`, `octopus`, `ours`, `subtree` 등의 전략을 선택할 수 있습니다.
    - `git merge -s recursive develop` 명령어를 사용합니다.


---


## Merge 작업 시 주의 사항

- merge 작업 전 backup을 생성하고, team과 소통하며, production branch는 보호 정책을 설정합니다.

- **Backup 및 복구 준비** : 중요한 merge 작업 전에는 반드시 backup을 생성합니다.
    - `git reflog`를 활용하여 문제 발생 시 이전 상태로 복구할 수 있습니다.
    - `git reset --hard HEAD@{n}` 명령어로 특정 시점으로 되돌릴 수 있습니다.

- **Team과의 소통** : merge 전에 team member들과 충분한 소통을 진행합니다.
    - 동시에 같은 branch에서 작업하는 경우 조율이 필요합니다.
    - merge 시점과 방법에 대해 사전에 합의하여 충돌을 방지합니다.

- **Production Branch 보호** : master branch나 main branch에 대한 보호 정책을 설정합니다.
    - direct push를 금지하고 PR/MR을 통해서만 변경할 수 있도록 제한합니다.
    - 관리자 승인 없이는 중요한 branch를 수정할 수 없도록 권한을 관리합니다.


---


## Reference

- <https://git-scm.com/docs/git-merge>
- <https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request>
- <https://docs.gitlab.com/ee/user/project/merge_requests/>

