---
layout: skill
permalink: /306
title: Docker - 실행 환경 쉽게 구축하기
description: Docker는 application을 개발, 배포, 실행하기 위한 open source platform입니다.
date: 2025-04-07
---


## Docker : Application 실행 환경 구축을 위한 Container Platform

- Docker는 application과 그 실행 환경을 container라는 독립된 단위로 묶어 관리합니다.

- container는 격리된 실행 환경으로, host system과 다른 container들로부터 분리됩니다.

- Docker는 Linux container 기술을 기반으로 하며, 가상화 기술의 일종입니다.
    - 기존 virtual machine(VM)과 달리 host OS 위에서 바로 실행되어 더 가볍고 빠릅니다.

- 2013년 Solomon Hykes가 설립한 dotCloud(후에 Docker Inc로 변경)에서 처음 공개되었습니다.


### Docker의 주요 특징

- **이식성**이 뛰어납니다.
    - 어떤 환경에서든 동일하게 실행되어 "내 장비에서는 잘 돌아가는데" 문제를 해결합니다.

- **실행 환경**이 가볍습니다.
    - VM과 달리 host OS의 kernel을 공유하므로 resource 효율성이 높습니다.

- **시작 시간**이 빠릅니다.
    - container는 몇 초 내에 시작할 수 있어 개발 및 배포 cycle이 단축됩니다.

- **일관된 환경**을 보장합니다.
    - 개발, test, 운영 환경을 동일하게 유지할 수 있습니다.

- **확장성**이 좋습니다.
    - 필요에 따라 container를 쉽게 생성하고 제거할 수 있습니다.


---


## Docker 핵심 구성 요소

- Docker는 여러 구성 요소로 이루어져 있으며, 각 구성 요소는 서로 협력하여 container를 관리합니다.


### Docker Engine

- Docker의 핵심 component로 container를 생성하고 관리합니다.
- client-server 구조로 작동합니다.
    - Docker daemon : server 역할을 하며 container를 관리합니다.
    - REST API : daemon과 통신하기 위한 interface를 제공합니다.
    - Docker CLI : command line interface로 사용자가 Docker와 상호 작용합니다.


### Docker Image

- container 실행에 필요한 모든 것을 포함하는 불변의 template입니다.
- application code, runtime, library, 환경 변수, 설정 file 등을 포함합니다.
- layer 구조로 되어 있어 효율적인 저장과 전송이 가능합니다.
    - 각 layer는 이전 layer에서 변경된 부분만 포함합니다.


### Docker Container

- Docker image의 실행 가능한 instance입니다.
- application과 그 의존성을 포함한 독립적인 실행 환경입니다.
- 각 container는 서로 격리되어 있어 한 container의 문제가 다른 container에 영향을 주지 않습니다.


### Docker Registry

- Docker image를 저장하고 배포하는 repository입니다.
- Docker Hub는 가장 널리 사용되는 public registry입니다.
- private registry를 구축하여 조직 내부에서 image를 관리할 수도 있습니다.


---


## Docker 작동 방식

- Docker는 `Dockerfile`이라는 text file을 통해 image를 정의합니다.
- `Dockerfile`에는 application을 실행하기 위한 모든 명령어가 포함됩니다.
- `docker build` 명령으로 `Dockerfile`을 기반으로 image를 생성합니다.
- 생성된 image는 `docker run` 명령으로 container로 실행됩니다.
- container는 독립된 환경에서 application을 실행합니다.


---


## Docker 사용 사례

- **MicroService Architecture** : 각 service를 독립적인 container로 실행하여 개발 및 배포를 단순화합니다.
- **CI/CD Pipeline** : 일관된 build 및 test 환경을 제공하여 자동화된 배포를 가능하게 합니다.
- **DevOps 문화 지원** : 개발과 운영 환경의 차이를 줄여 협업을 촉진합니다.
- **Multi-cloud 및 Hybrid-cloud 환경** : 다양한 infrastructure에서 일관된 application 실행을 보장합니다.
- **Legacy Application 현대화** : 기존 application을 container화하여 관리 및 확장성을 개선합니다.


---


## Docker 관련 기술

- **Docker Compose** : 여러 container로 구성된 application을 정의하고 실행하는 도구.
    - YAML file을 사용하여 multi-container application을 구성합니다.

- **Docker Swarm** : Docker의 native clustering 및 orchestration solution.
    - 여러 Docker host를 하나의 가상 Docker host로 관리합니다.

- **Kubernetes** : Google에서 개발한 container orchestration platform.
    - Docker container를 large scale로 관리하기 위한 강력한 기능을 제공합니다.


---


## Docker 사용의 이점

- **개발 생산성 향상** : 일관된 개발 환경을 제공하여 "works on my machine" 문제를 해결합니다.
- **자원 효율성** : VM에 비해 자원 사용량이 적어 더 많은 application을 동일한 hardware에서 실행할 수 있습니다.
- **빠른 배포** : 가벼운 container로 application을 빠르게 배포하고 확장할 수 있습니다.
- **격리와 보안** : container 간 격리를 통해 보안을 강화하고 문제 발생 시 영향 범위를 제한합니다.
- **비용 절감** : hardware 활용도를 높이고 infra 비용을 절감합니다.


---


## Docker 한계 및 고려 사항

- **GUI application**에 대한 지원이 제한적입니다.
    - Docker는 CLI 기반의 application에 최적화되어 있습니다.
    - GUI application을 실행하려면 추가적인 설정이 필요합니다.

- **자원 공유 model**로 인한 보안 위험이 있을 수 있습니다.
    - host kernel을 공유하므로 VM보다 격리 수준이 낮습니다.

- **영구적인 data 관리**에는 추가적인 고려가 필요합니다.
    - 기본적으로 container는 일시적이므로, volume을 통한 data 관리가 필요합니다.

- **복잡한 network 구성**이 필요할 수도 있습니다.
    - container 간의 network 설정 및 보안 group 관리가 필요합니다.
    - Docker Compose나 Kubernetes를 사용하여 복잡한 network 구성을 관리할 수 있습니다.

- **Windows container**는 Linux container에 비해 기능이 제한적입니다.
    - Windows container는 Linux container와 호환되지 않으므로, Windows 환경에서 Docker를 사용할 때 주의가 필요합니다.
    - Windows Server 2016 이상에서 Windows container를 지원합니다.
