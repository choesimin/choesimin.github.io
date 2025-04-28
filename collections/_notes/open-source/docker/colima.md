---
layout: note
permalink: /320
title: Colima - Docker Desktop 대안
description: Colima는 macOS와 Linux 환경에서 Docker container를 간편하게 실행할 수 있는 command line tool입니다.
date: 2025-04-16
---


## Colima : Docker Desktop 대신 사용할 수 있는 Docker Runtime

- Colima는 **macOS와 Linux 환경에서 container와 Kubernetes를 간편하게 실행할 수 있는 command line tool**입니다.
    - "Container in Lima"의 약어로, Lima를 기반으로 하는 lightweight virtual machine에서 container runtime을 실행합니다.

- **Docker Desktop의 대안**으로 활용할 수 있으며, **license 제한 없이 무료로 사용**할 수 있습니다.

| 특징 | Colima | Docker Desktop |
| --- | --- | --- |
| **License** | 무료 Open Source (제한 없음) | 대규모 기업에서 사용 시 유료 license 필요 |
| **Interface** | Command line interface만 제공 | GUI 관리 도구 제공 |
| **Resource** | 가볍고 resource 사용량이 적음 | 다양한 기능 제공으로 resource를 더 많이 사용 |

- Colima는 기본적으로 **containerd**를 container runtime으로 사용합니다.
    - containerd란 Docker의 핵심 구성 요소로, container를 관리하는 데 필요한 기능을 제공하는 open source project입니다.


---


## 설치 방법

- Colima는 macOS와 Linux에서 사용할 수 있으며, 각 운영 체제에 따라 설치 방법이 다릅니다.


### macOS

```bash
# Homebrew를 통해 설치
brew install colima
```

- Homebrew를 통해 간편하게 설치할 수 있습니다.
- Lima는 Colima의 종속성으로 자동 설치됩니다.


### Linux

- Linux 환경에서는 GitHub release page에서 직접 binary를 download하여 설치합니다.
    - GitHub에서 최신 release를 download합니다.
    - download한 binary file에 실행 권한을 부여합니다.
    - system path가 지정된 위치로 binary를 이동시킵니다.

- 또는 package manager를 통해 설치할 수 있습니다.
    - Arch Linux : `yay -S colima`을 실행합니다.
    - Ubuntu/Debian : apt repository를 추가한 후 `apt install colima`를 실행합니다.


---


## 기본 사용법

- Colima는 command line interface를 통해 사용합니다.


### Colima 시작

```bash
colima start
colima start --cpu 4 --memory 8
colima start <instance-name>
```

- `colima start` 명령으로 기본 설정의 Colima instance를 시작합니다.
    - 기본적으로 2 CPU, 2GB memory, 60GB disk로 설정됩니다.

- resource 설정을 변경하여 시작할 수 있습니다.
    - `colima start --cpu 4 --memory 8` 명령으로 4 CPU, 8GB memory로 설정할 수 있습니다.

- 특정 이름의 instance를 시작할 수 있습니다.
    - `colima start <instance-name>` 형식으로 실행합니다.


### Colima 상태 확인

```bash
colima status
colima status <instance-name>

# INFO[0000] colima is running using macOS Virtualization.Framework 
# INFO[0000] arch: aarch64                                
# INFO[0000] runtime: docker                              
# INFO[0000] mountType: sshfs                             
# INFO[0000] socket: unix:///Users/brahms/.colima/default/docker.sock 
```

- `colima status` 명령으로 현재 실행 중인 Colima instance의 상태를 확인합니다.
    - CPU, memory 사용량, IP 주소 등의 정보를 확인할 수 있습니다.

- 특정 instance의 상태를 확인하려면 `colima status <instance-name>`와 같이 instance 이름을 지정합니다.


### Colima 중지

```bash
colima stop
colima stop <instance-name>
colima stop --all
```

- `colima stop` 명령으로 실행 중인 Colima instance를 중지합니다.
    - 특정 instance를 중지하려면 `colima stop <instance-name>` 형식으로 실행합니다.

- 모든 instance를 중지하려면 `colima stop --all` 명령을 사용합니다.


### Colima 삭제

```bash
colima delete
colima delete <instance-name>
colima delete --all
```

- `colima delete` 명령으로 Colima instance를 완전히 삭제합니다.

- 특정 instance를 삭제하려면 `colima delete <instance-name>` 형식으로 실행합니다.

- 모든 instance를 삭제하려면 `colima delete --all` 명령을 사용합니다.


---


## 고급 사용법

- Colima는 다양한 고급 기능을 제공합니다.


### Instance 관리

```bash
colima start <instance-name>
colima list
```

- Colima는 여러 개의 독립적인 instance를 실행할 수 있습니다.
    - `colima start dev` 명령으로 "dev"라는 이름의 instance를 시작합니다.
    - `colima start prod` 명령으로 "prod"라는 이름의 instance를 시작합니다.

- `colima list` 명령으로 모든 instance 목록을 확인할 수 있습니다.


### SSH Access

```bash
colima ssh
colima ssh <instance-name>
```

- `colima ssh` 명령으로 Colima VM에 직접 SSH 접속할 수 있습니다.
    - 특정 instance에 접속하려면 `colima ssh <instance-name>` 형식으로 실행합니다.


### Template 사용

```bash
colima template
colima template <instance-name>
```

- Colima template에 접속하여 instance의 설정을 더 세부적으로 변경할 수 있습니다.
    - CPU, memory, disk size, mount option 등을 설정할 수 있습니다.
    - 내부적으로 `~/.colima/<instance-name>/colima.yaml` file을 편집합니다.


---


## Resource 문제 해결 방법

- Colima VM에 할당된 resource가 부족한 경우 성능 문제가 발생할 수 있습니다.
    - Docker가 제대로 작동하지 않거나, container가 느리게 실행된다면, resource 부족이 원인일 수 있습니다.

- 이 경우 더 많은 resource를 할당하여 Colima를 다시 시작해야 합니다.

```bash
colima stop
colima start --cpu 4 --memory 8 --disk 100
```

1. `colima stop` 명령으로 Colima를 중지한 후 더 많은 resource를 할당하여 다시 시작합니다.
2. `colima start --cpu 4 --memory 8 --disk 100` 명령으로 resource를 증가시킬 수 있습니다.


---


## 도움말 보기 : `colima --help`

- Colima의 자세한 사용법과 option은 `colima --help` 명령어로 확인할 수 있습니다.


### 도움말 출력 결과

```bash
Colima provides container runtimes on macOS with minimal setup.

Usage:
  colima [command]

Available Commands:
  completion  Generate completion script
  delete      delete and teardown Colima
  help        Help about any command
  kubernetes  manage Kubernetes cluster
  list        list instances
  nerdctl     run nerdctl (requires containerd runtime)
  prune       prune cached downloaded assets
  restart     restart Colima
  ssh         SSH into the VM
  ssh-config  show SSH connection config
  start       start Colima
  status      show the status of Colima
  stop        stop Colima
  template    edit the template for default configurations
  update      update the container runtime
  version     print the version of Colima

Flags:
  -h, --help             help for colima
  -p, --profile string   profile name, for multiple instances (default "default")
  -v, --verbose          enable verbose log
      --version          version for colima
      --very-verbose     enable more verbose log

Use "colima [command] --help" for more information about a command.
```
