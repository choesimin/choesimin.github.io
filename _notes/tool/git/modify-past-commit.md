---
layout: note
title: Git - 과거의 Commit을 수정하는 방법
version: 2023-04-06
---




## 1. `git log`

- 변경하려는 commit의 바로 이전 commit의 hash 값을 확인합니다.


## 2. `git rebase -i [past_commit_hash]`

- rebase할 때, `i` option으로 rebase interface에 진입할 수 있습니다.
- 수정하고 싶은 commit의 keyword를 `pick`에서 `edit`으로 수정하고, rebase interface에서 나옵니다.


## 3. File 수정

- 수정하려 했던 file을 수정합니다.


## 4. `git add [modified_file_name]`


## 5. `git commit --amend`


## 6. `git rebase --continue`

- 충돌이 발생하면 해결해야 합니다.




---




# Reference

- <https://git-scm.com/book/ko/v2>
