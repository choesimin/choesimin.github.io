---
layout: skill
date: 2024-05-29
title: Git - Remote Branch 삭제하기
description: Git 명령어를 사용하여 원격에 있는 저장소의 branch를 삭제할 수 있습니다.
---


## 원격 저장소의 Branch 삭제하기

- 일반적으로 `git push` 명령어에 `--delete` option을 사용하거나, `:`을 사용하여 원격 branch를 삭제할 수 있습니다.


### 1. 원격 Branch 목록 확인하기

```bash
git branch -r
```


### 2. 원격 Branch 삭제하기

- 원격 branch를 삭제하는 방법에는 **`git push --delete`을 사용하는 방법**과 **`:`(colon)을 사용하는 방법**이 있습니다.

#### `git push --delete` 사용하여 삭제하기

```bash
git push origin --delete <branch_name>
git push origin --delete feature-branch    # 'feature-branch'라는 원격 branch를 삭제
```

#### `:`(colon) 사용하여 삭제하기

```bash
git push origin :<branch_name>
git push origin :feature-branch    # 'feature-branch'라는 원격 branch를 삭제
```


### 3. Local 저장소에 삭제된 원격 branch 반영하기

```bash
git fetch -p
```


### 4. Local Branch 삭제하기

- 필요한 경우 local branch도 함께 삭제합니다.

```bash
git branch -d <branch_name>
git branch -d feature-branch    # 'feature-branch'라는 local branch를 삭제
```
