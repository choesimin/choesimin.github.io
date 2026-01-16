---
layout: note
permalink: /323
title: Docker Container Logging - 전체/범위/실시간 Log 확인하기
description: docker logs 명령어를 사용하여 container의 log를 확인할 수 있습니다.
date: 2025-04-30
---


## `docker logs` : Container Log 확인하기

- `docker logs`는 Docker container의 log 출력을 확인하는 명령어입니다.
- Docker engine이 수집한 container의 표준 출력(STDOUT)과 표준 오류(STDERR) stream을 검색하고 표시합니다.
- 실행 중인 container 또는 중지된 container의 log를 확인할 수 있습니다.
    - 삭제된 container의 log는 확인할 수 없습니다.
- container 내부에서 발생하는 error와 동작 상태를 실시간으로 monitoring하는 데 유용합니다.
    - Application 동작 확인, 문제 진단, debugging에 필수적인 도구입니다.


### `docker logs` 명령어 사용 방법

```bash
docker logs [options] container-identifier
```

- `container-identifier`에는 container ID 또는 container 이름을 지정합니다.
    - container ID는 전체 ID 또는 고유성이 보장되는 ID의 일부만 사용해도 됩니다.
    - `docker logs nginx-container` : nginx-container라는 이름의 container log를 출력합니다.
    - `docker logs 7d3f` : ID가 7d3f로 시작하는 container의 log를 출력합니다.

| Option | 설명 | 사용 예시 | 추가 설명 |
| --- | --- | --- | --- |
| `--details` | 추가적인 세부 정보 출력 | `docker logs --details my-container` | container logging driver에서 제공하는 추가 속성 표시 |
| `-f`, `--follow` | 실시간으로 log stream 계속 출력 | `docker logs -f my-container` | container에서 새로운 log 생성 시 실시간 표시, Ctrl+C로 종료 가능 |
| `--since` | 지정된 시간 이후의 log만 출력 | `docker logs --since 30m my-container` | Unix timestamp 또는 상대 시간(5m, 2h 등)으로 지정 가능 |
| `-n`, `--tail` | 최근 n줄의 log만 출력 | `docker logs --tail 100 my-container` | 기본값은 "all"로 모든 log 출력 |
| `-t`, `--timestamps` | 각 log line에 timestamp 추가 | `docker logs -t my-container` | 정확한 시간 정보가 필요할 때 유용 |
| `--until` | 지정된 시간 이전의 log만 출력 | `docker logs --until 1h my-container` | `--since`와 마찬가지로 Unix timestamp 또는 상대 시간 사용 |


---


## 실용 예제

- `docker logs` 명령어에 여러 option을 함께 사용하여 다양한 방식으로 log를 출력할 수 있습니다.


### 실시간 log 확인 (모든 log 출력)

```bash
docker logs -f my-container
```

- 실행 중인 application의 동작을 실시간으로 monitoring합니다.
    - `-f` option의 기본 값이 `all`이므로, 과거 log와 새로운 log를 모두 출력하게 됩니다.


### 실시간 log 확인 (과거 log는 출력하지 않음)

```bash
docker logs --tail 0 -f my-container
```

- 과거 log는 출력하지 않고, 새로운 log만 실시간으로 확인합니다.
    - `--tail 0` option을 사용하여 과거 log를 출력하지 않도록 설정합니다.
    - `-f` option은 기본적으로 모든 log를 출력하므로, log가 많이 쌓여 있는 경우에 system에 부하를 줄 수 있습니다.
    - 따라서 실시간 log만을 확인할 때는 `--tail 0` option을 사용하여 과거 log를 출력하지 않도록 설정하는 것이 좋습니다.


### 최근 log 확인

```bash
docker logs --tail 50 my-container
```

- 가장 최근 50줄의 log만 확인합니다.


### 특정 시간대 log 확인

```bash
docker logs --since 2023-04-01T10:00:00 my-container
```

- 지정한 날짜와 시간 이후의 log만 확인합니다.


### Timestamp 포함 log 확인

```bash
docker logs -t my-container
```

- 각 log entry가 발생한 정확한 시간을 함께 확인할 수 있습니다.


### 특정 기간 log 확인

```bash
docker logs --since 2h --until 1h my-container
```

- 2시간 전부터 1시간 전까지의 log만 확인합니다.


### 추가 세부 정보 확인

```bash
docker logs --details my-container
```

- 기본 log 출력과 함께 logging driver에서 제공하는 추가 속성을 표시합니다.


### Log Filtering (포함)

```bash
docker logs my-container | grep ERROR
```

- `grep` 명령어와 함께 사용하여 특정 pattern이 포함된 log만 filtering할 수 있습니다.
- 'ERROR'라는 text가 포함된 log line만 출력합니다.


### Log Filtering (제외)

```bash
docker logs my-container | grep -v DEBUG
```

- `grep -v` 명령어를 사용하여 특정 pattern을 제외한 log만 확인할 수 있습니다.
- 'DEBUG'라는 text가 포함되지 않은 log line만 출력합니다.


---


## Logging 명령어 도움말 보기 : `docker logs -h`

```bash
Flag shorthand -h has been deprecated, please use --help

Usage:  docker logs [OPTIONS] CONTAINER

Fetch the logs of a container

Aliases:
  docker container logs, docker logs

Options:
      --details        Show extra details provided to logs
  -f, --follow         Follow log output
      --since string   Show logs since timestamp (e.g. "2013-01-02T13:23:37Z") or relative (e.g. "42m" for 42 minutes)
  -n, --tail string    Number of lines to show from the end of the logs (default "all")
  -t, --timestamps     Show timestamps
      --until string   Show logs before a timestamp (e.g. "2013-01-02T13:23:37Z") or relative (e.g. "42m" for 42 minutes)
```


---


## Logging 주의 사항

- log volume이 큰 application의 경우 disk 공간을 빠르게 소모할 수 있습니다.
    - log rotation 설정을 반드시 고려해야 합니다.

- 보안에 민감한 정보가 log에 포함되지 않도록 주의해야 합니다.
    - password, API key, token 등이 log에 노출되지 않도록 application 설정을 확인해야 합니다.

- 실시간 log monitoring(`-f` option)은 CPU 자원을 소모하므로 production 환경에서는 주의해서 사용해야 합니다.

- container가 삭제되면 log도 함께 삭제되므로, 중요한 log는 외부 저장소에 backup해야 합니다.
