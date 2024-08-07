---
layout: skill
title: Git - 여러 Commit들을 하나로 합치기 (rebase)
date: 2023-04-06
---




- `rebase` 명령에 `-i` option을 주어 여러 개의 commit을 합칠 수 있습니다.
    - 여러 commit을 합치면, 새로운 hash 값을 가진 commit이 만들어집니다.




---




## Commit 합치기


### 1. Hash 확인하기

```sh
git log
```

- 합칠 commit들의 범위를 확인합니다.
- `rebase` 명령에 사용할 두 개의 hash 값을 기억해둡니다.
    - 시작 hash (`begin_commit_hash`) : 합칠 commit들 중 첫 commit의 hash 값.
    - 종료 hash (`end_commit_hash`) : 합칠 commit들 중 마지막 commit의 hash 값.


### 2. Rebase 하기

```sh
git rebase -i [begin_commit_hash]~1 [end_commit_hash]

# 마지막 commit(end_commit_hash)을 입력하지 않으면, 자동으로 마지막 commit이 현재 위치한 commit으로 지정됩니다.
git rebase -i [begin_commit_hash]~1
```

- rebase의 `i` option으로 rebase interface에 진입할 수 있습니다.
    - rebase interface에 진입할 때 합칠 commit들이 모두 나오게 하려면, 시작 commit 바로 이전의 commit hash 값을 인자에 넣어야 합니다.
    - 따라서 commit의 hash 값 뒤에 `~1`을 추가하여 '시작 commit의 이전 commit'의 hash 값을 가져옵니다.

- 가장 위에 위치한 첫 commit의 keyword는 그대로 `pick`으로 남겨두고, 나머지 commit들의 keyword를 `pick`에서 `squash`로 수정합니다.

```txt
pick df28kvd Commit1
squash lkvsj90 Commit2
squash qpalbk3 Commit3
```

- 수정이 끝나면 rebase interface에서 나옵니다.
    - Vim을 사용하는 경우는 `:wq`로 편진을 종료할 수 있습니다.


### 3. Commit Messsage 정하기

- rebase가 성공하면 commit message 편집기로 이동하게 됩며, 합친 commit의 message를 수정할 수 있습니다.
    - 위쪽에 commit message를 작성하고, 기존의 commit message들 앞에는 `#`를 붙여 수정합니다.

```txt
새로운 Commit Message를 여기 입력합니다.

# Commit1
# Commit2
# Commit3
```

- 수정을 끝내고 편집기에서 나오면 rebase가 완료됩니다.

