---
layout: note
permalink: /4
title: Git Commit을 가져와 현재 Branch 뒤에 붙이기 (cherry-pick)
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


---


## `cherry-pick` 충돌이 발생하는 경우

- `cherry-pick`을 사용할 때 **대상 commit이 현재 branch의 기반 code와 크게 다르다면** 충돌이 발생할 수 있습니다.
    - 충돌이 발생하는 경우, Git은 사용자에게 충돌을 해결하라고 요청하며, 충돌을 해결하고 commit을 완료해야 합니다.

1. **충돌 확인** : 먼저 충돌이 발생한 file을 확인합니다.
    - Git은 충돌이 발생한 file을 명령어 출력을 통해 알려줍니다.

2. **충돌 해결** : 충돌이 발생한 file을 열고, Git이 표시한 충돌 부분을 찾습니다.
    - Git은 충돌하는 부분을 `<<<<<<<`, `=======`, `>>>>>>>`로 감싸 표시합니다.
    - 표시된 부분에서 현재 branch의 변경 사항과 `cherry-pick`하려는 commit의 변경 사항을 비교하여 적절히 수정합니다.

3. **충돌 해결 후 file 추가** : 충돌을 해결한 후, 수정된 file을 staging area에 추가합니다.
    - file을 staging area에 추가하는 작업은 `git add <file_name>` 명령어로 수행합니다.

4. **cherry-pick 완료** : 충돌이 해결되고 모든 file이 staging area에 추가되면, `git cherry-pick --continue`를 실행하여 cherry-pick 과정을 완료합니다.
    - `git cherry-pick --continue` 명령은 충돌 없이 적용할 수 있었던 변경 사항을 현재 branch에 commit합니다.

5. **충돌 해결 확인** : 충돌을 해결한 후에 원래 의도했던 변경 사항이 정확하게 적용되었는지 확인합니다.
    - 충돌 해결 과정에서 의도치 않게 code가 누락될 수 있으므로, 충돌 해결 후에는 반드시 변경 사항을 검토해야 합니다.


### 충돌 해결 중 `cherry-pick` 작업을 중단하고 싶을 때

- `git cherry-pick --abort` : `cherry-pick` 작업을 중단합니다.
    - `cherry-pick` 시도를 취소하고, **작업을 시작하기 전 상태로 branch를 복원**합니다.

- `git cherry-pick --quit` : `cherry-pick` 작업을 일시적으로 중단합니다.
    - `cherry-pick` 과정을 중단하지만, 현재까지의 변경 사항은 유지합니다.

