---
layout: note
permalink: /231
title: MongoDB Database 명령어 (조회, 생성, 사용, 삭제)
description: MongoDB Database 명령어를 사용하여 Database를 조회, 생성, 사용, 삭제할 수 있습니다.
date: 2023-12-30
---


## Database 조회

- MongoDB의 모든 Database 목록을 출력하거나, 현재 사용하고 있는 Database를 출력할 수 있습니다.


### 모든 Database 목록 출력

```sh
show dbs
```


### 현재 사용하고 있는 Database 출력

```sh
db
```


### 현재 사용하고 있는 Database 정보 출력

```sh
db.status()
```


---


## Database 생성 및 사용

```sh
use database_name
```

- database가 **없으면 생성**하고, 이미 **있으면 사용**합니다.
    - 생성하는 경우, 생성 후 자동으로 사용까지 합니다.
- `use`를 통해 생성한 database는 그 안에 최소 한 개의 document가 있어야 `show dbs` 명령어를 통해 확인할 수 있습니다.


---


## Database 삭제

```sh
db.dropDatabase()
```

- database를 삭제하는 명령어는 지울 database가 미리 선택되어 있어야 합니다.
    - 지우기 전에 `use database_name` 명령어를 사용하여 database를 선택합니다.


---


## Reference

- <https://inpa.tistory.com/entry/MONGO-📚-몽고디비-쿼리-정리#데이터베이스_명령어>

