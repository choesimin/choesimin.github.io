---
layout: note
title: Git - 과거의 commit을 수정하는 방법
version: 2023-04-06
---




## 1. `git log`

- 변경하려는 commit 이전 commit의 hash 값을 확인합니다.


## 2. `git rebase -i [past_commit_hash]`

- 수정하고 싶은 commit의 맨 앞 pick을 edit으로 수정하고 rebase interface에서 나오기


## 3. 수정

- 수정하려 했던 file을 수정합니다.


## 4. `git add [modified_file_name]`


## 5. `git commit --amend`


## 6. `git rebase --continue`

- 충돌이 발생하면 해결해야 합니다.




---




# Reference

- [https://git-scm.com/book/ko/v2](https://git-scm.com/book/ko/v2)
