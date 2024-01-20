---
layout: note
title: Git - 여러 Commit들을 하나로 합치기
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
    - 시작 hash (`commit_hash_before_start_commit`) : 처음 commit의 바로 전 commit의 hash.
    - 종료 hash (`end_commit_hash`) : 마지막 commit의 hash.


### 2. Rebase 하기

```sh
git rebase -i [commit_hash_before_start_commit] [end_commit_hash]

# 종료 Commit을 입력하지 않으면, 자동으로 현재 위치한 Commit이 지정됩니다.
git rebase -i [commit_hash_before_start_commit]
```

- rebase할 때, `-i` option으로 rebase interface에 진입할 수 있습니다.
- 가장 위에 위치한 첫 commit의 keyword는 그대로 `pick`으로 남겨두고, 나머지 commit들의 keyword를 `pick`에서 `squash`로 수정합니다.

```txt
pick df28kvd Commit1
squash lkvsj90 Commit2
squash qpalbk3 Commit3
```

- 수정이 끝나면 rebase interface에서 나옵니다.


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

