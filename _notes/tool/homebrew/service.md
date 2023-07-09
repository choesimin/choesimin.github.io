---
layout: note
title: Homebrew - Service 관리하기
date: 2023-04-01
---


## service 조회

```sh
brew services
brew services list
```
- user 권한으로 등록/실행된 service 목록을 조회합니다.
    - `sudo`를 붙여 실행하면 root 권한 기준으로 조회합니다.


## service 시작

```sh
brew services start [service_name]
```
- 한 service에 대한 여러 user의 등록을 방지하기 위해, 현재 user를 먼저 확인하는 것이 좋습니다.
    - service가 user와 root에 모두 실행될 수도 있습니다.


## service 중지

```sh
brew services stop [service_name]
```


## service 재시작

```sh
brew services restart [service_name]
```
