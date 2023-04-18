---
layout: note
title: Homebrew - Package 삭제하기
version: 2023-04-01
---




## 1. package 이름 확인

```sh
brew list
```


## 2. 삭제

```sh
brew uninstall [package_name]
brew remove [package_name]
brew rm [package_name]
```
- `uninstall`, `remove`, `rm` 명령어를 사용합니다.
    - 모두 package를 삭제하는 명령어입니다.
- 목록 조회 결과로 출력된 이름을 그대로 넣어야 합니다.
