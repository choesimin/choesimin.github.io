---
layout: note
permalink: /316
title: Docker의 여러 Container들 한 번에 삭제하기
description: Docker의 조회 명령어와 삭제 명령어를 조합하여, 여러 container들을 한 번에 삭제할 수 있습니다.
date: 2025-04-21
---


## Docker Container 일괄 삭제 방법

- 원래 Docker container를 삭제할 때, `docker stop`과 `docker rm` 명령어를 사용하여 하나씩 삭제하는 것이 일반적입니다.
    - `docker rm` 명령어는 container를 삭제, `docker stop` 명령어는 container를 중지하는 명령어입니다.
    - `docker rm` 명령어는 중지된 container만 삭제할 수 있으므로, `docker stop` 명령어로 먼저 중지해야 합니다.
    - 또는 `docker rm -f` 명령어를 사용하여, 실행 상태에서 강제로 삭제합니다.
- 그러나 여러 개의 container를 일괄로 삭제해야 하는 경우, 매번 하나씩 중지하고 삭제하는 작업은 번거롭습니다.
- 이때, Docker의 조회 명령어와 삭제 명령어를 조합하여 여러 container를 한 번에 삭제할 수 있습니다.
    - `docker rm` 명령어와 `docker ps` 명령어를 조합하여 사용합니다.

```bash
docker rm -f $(docker ps -aq)
```

- container를 삭제할 때는 정말로 삭제해도 되는지 먼저 확인해야 합니다.
    - 모든 container 삭제 명령어는 복구가 불가능합니다.
    - container 내부에 저장된 data는 volume을 사용하지 않았다면 함께 삭제됩니다.
    - 중요한 data가 있는 경우 삭제 전 backup이 필요합니다.
    - 운영 환경에서는 실행 중인 container를 강제 종료하면 service 중단이 발생할 수 있습니다.


### 모든 Container 삭제 명령어

- Docker system에 존재하는 모든 container를 한 번에 삭제합니다.
    - 실행 중인 container와 중지된 container를 포함하여 모든 container를 삭제합니다.

```bash
docker rm -f $(docker ps -aq)
```

- `docker rm -f` : container를 강제로 삭제합니다.
    - `-f` flag는 실행 중인 container도 강제 종료하고 삭제합니다.
- `docker ps -aq` : 모든 container ID를 출력합니다.
    - `-a` flag는 중지된 container를 포함하여 모든 container를 표시합니다.
    - `-q` flag는 container ID만 출력합니다.
- `$(...)` : command substitution으로, 내부 명령어의 출력을 외부 명령어의 인자로 사용합니다.


### 선택적 Container 삭제 방법

- 세부 option을 추가하여, container를 선택적으로 삭제할 수 있습니다.

#### 중지된 Container만 삭제

- 실행 중인 container는 보존하고 중지된 container만 삭제합니다.

```bash
docker rm $(docker ps -aq -f status=exited)
```

- `-f status=exited` : 종료된 상태의 container만 filtering합니다.

#### 시간 지정하여 Container 삭제

- 특정 시간 이전에 생성된 container만 삭제합니다.

```bash
docker rm $(docker ps -aq --filter "until=24h")
```

- `--filter "until=24h"` : 24시간 이전에 생성된 container만 filtering합니다.


---


## Container 및 Resource 관리를 위한 추가 명령어

```bash
# 사용하지 않는 모든 Docker resource(container, image, network, volume)를 삭제
docker system prune -a

# 중지된 container와 사용하지 않는 image만 삭제
docker system prune

# container와 함께 연결된 volume도 삭제
docker rm -v $(docker ps -aq)
```
