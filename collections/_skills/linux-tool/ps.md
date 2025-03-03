---
layout: skill
date: 2024-11-05
title: ps - Process 상태 확인
description: ps는 system에서 실행 중인 process의 상태를 확인하는 명령어입니다.
---


## `ps` : Process Status 확인하기

- `ps` 명령어는 **현재 system에서 실행 중인 process의 상태를 확인**할 수 있는 Unix 및 Linux 기반 system에서 사용되는 명령어입니다.
    - process의 PID, 사용자 정보, CPU 및 Memory 사용량, 실행된 명령어 등을 확인할 수 있어 system monitoring과 관리에 유용합니다.

- `ps`는 실행 시점의 process 상태를 보여주기 때문에 실시간으로 갱신되지 않습니다.
    - 실시간 process 정보를 원하면 `top` 또는 `htop` 명령어를 사용할 수 있습니다.


### 기본 사용법

```sh
ps [options]
```

- 각 option은 다른 목적에 따라 다양한 정보를 표시하며, 함께 조합하여 사용하기도 합니다.
- `--help` option을 사용하면 `ps` 명령어의 도움말을 표시할 수 있습니다.

```sh
ps --help
```


### 주요 Option

| Option | 설명 |
| --- | --- |
| `aux` (all, user, tty) | system의 모든 process를 사용자, CPU 및 Memory 사용량, 실행된 명령어와 함께 표시 |
| `-e` (every) | system의 모든 process를 표시 |
| `-A` (all) | system의 모든 process를 표시 (`-e`와 동일) |
| `-f` (full) | 상세한 형식(full format)으로 process 정보를 표시 |
| `-l` (long) | 긴 형식(long format)으로 process 정보를 표시 |
| `-c` (command) | CMD format을 축소하여 실행된 명령어와 관련된 간단한 정보 표시 |
| `-u` (user) | 현재 사용자가 실행한 process만 표시 |
| `-h` (hierarchical) | process를 tree 형태로 표시 |
| `--forest` | process를 tree 형태로 표시 |
| `--sort=[key]` | 지정한 key(`%cpu`, `%mem` 등)를 기준으로 정렬 |


---


## 사용 예시


### System의 모든 Process 보기

```sh
ps -e    # 모든 process 표시
ps -ef    # 모든 process를 더 상세하게 출력
ps aux    # 모든 process를 사용자, CPU 및 Memory 사용량, 실행된 명령어와 함께 출력
```


### CPU 또는 Memory 사용량 기준으로 정렬하기

```sh
ps aux --sort=%cpu    # CPU 사용량이 낮은 순서대로 정렬 (오름차순)
ps aux --sort=%mem    # Memory 사용량이 낮은 순서대로 정렬 (오름차순)

ps aux --sort=-%cpu    # CPU 사용량이 높은 순서대로 정렬 (내림차순)
ps aux --sort=-%mem    # Memory 사용량이 높은 순서대로 정렬 (내림차순)
```


### 모든 Process의 부모-자식 관계 보기

```sh
ps -ef --forest
```


### 모든 Process 중 특정 Keyword를 가진 행만 출력하기

- pipe 연산자(`|`)와 `grep` 명령어를 사용하여 특정 keyword를 가진 행만 출력할 수 있습니다.

```sh
ps aux | grep java
ps -ef | grep java
```
