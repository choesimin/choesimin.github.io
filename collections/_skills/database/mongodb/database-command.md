---
layout: skill
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


