---
layout: note
title: Homebrew - package 설치하기
version: 2023-04-01
---




## 1. 설치하고자 하는 package를 검색합니다.

```sh
brew search [package_name]
```


## 2. 설치합니다.

```sh
brew install [package_name]
brew install [package_name]@[version]    # 특정 version 설치
```
- 검색 결과의 package 이름을 그대로 입력해야 합니다.
- 특정 version을 설치하려면, package 이름 뒤에 version을 추가합니다.
    - version을 입력하지 않으면, 최신 version으로 설치됩니다.


## 3. package가 설치되었는지 확인합니다.

```sh
brew list
```



