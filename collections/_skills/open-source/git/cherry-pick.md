---
layout: skill
permalink: /4
title: Git - Commit을 가져와 현재 Branch 뒤에 붙이기 (cherry-pick)
description: cherry-pick 명령어를 사용하여, 다른 Branch의 Commit을 현재 Branch에 적용할 수 있습니다.
date: 2024-03-21
---


## `cherry-pick` : 다른 Branch의 Commit을 현재 Branch에 적용하기

- `git cherry-pick`은 **다른 branch에서 commit을 선택하여 현재 branch에 적용하고 싶을 때 사용**합니다.
    - 특정 변경 사항만을 현재 작업 중인 branch로 가져오고 싶을 때 유용합니다.

- `cherry-pick` 결과는 code의 특정 부분을 다른 branch로 복사하는 것과 유사하지만, **commit 자체를 복사하여 붙여넣는다는 점**에서 차이가 있습니다.

- `cherry-pick`은 **새로운 commit을 생성**합니다.
    - 새로운 commit은 원본 commit과 동일한 변경 사항을 포함하지만, 실제로는 다른 hash 값을 가지게 됩니다.
    - 따라서 전체 commit history에 **다른 hash 값을 가지는 같은 내용의 commit이 두 번** 나타나게 됩니다.


### 하나의 Commit 가져오기

```bash
git cherry-pick <commit_hash>
```

- `<commit_hash>`는 **적용하고자 하는 commit의 hash**입니다.
- commit hash를 사용하여 commit을 특정하고, 해당 commit에 포함된 변경 사항을 현재 branch에 그대로 적용할 수 있습니다.


### 여러 Commit 가져오기

- 여러 commit을 순차적으로 적용하고 싶을 때는 **commit hash를 연속적으로 나열**합니다.
  
```bash
git cherry-pick <commit_hash_1> <commit_hash_2> <commit_hash_3>
```


### 범위 내의 Commit 가져오기

- commit 범위를 지정하여 여러 commit을 한 번에 적용할 수도 있습니다.
- **시작 commit의 바로 이전 commit**과 **마지막 commit**을 지정합니다.

```bash
git cherry-pick <first_commit_hash>^..<last_commit_hash>
```


