---
layout: note
permalink: /376
title: Docker 기반 Node.js 환경 구축하기
description: Docker를 사용하면 nvm 설치나 local 환경 오염 없이 다양한 Node.js version을 즉시 전환하여 격리된 환경에서 안전하게 개발과 test를 진행할 수 있습니다.
date: 2025-09-10
---


## Docker로 특정 Version의 Node.js 실행하기

```sh
docker run -it --rm -v $(pwd):/app -w /app node:16 /bin/bash
```

- Node.js 개발 환경을 Docker container로 구축하면, local system에 Node.js를 직접 설치하지 않고도 다양한 version을 사용할 수 있습니다.

1. **환경 격리**를 통해 local system에 Node.js를 직접 설치하지 않고도 개발 환경을 구성할 수 있습니다.
2. **version 관리**가 간편하여 nvm 설정 없이도 다양한 Node.js version을 즉시 사용할 수 있습니다.
3. **의존성 충돌 방지**가 가능하여 project별로 독립적인 환경에서 package를 설치하고 test할 수 있습니다.
4. **빠른 정리**가 가능하여 `--rm` option으로 작업 완료 후 container가 자동으로 삭제됩니다.
5. **일회성 test**에 적합하여 간단한 script 실행이나 package 동작 확인에 유용합니다.


- 기본 명령어는 `docker run -it --rm -v $(pwd):/app -w /app node:16 /bin/bash` 형태로 구성됩니다.
    - 각 option은 특정한 역할을 담당하여 개발 환경 구성에 필요한 기능을 제공합니다.


### Option별 상세 기능

- **`-it`** option : interactive terminal을 활성화하여 사용자가 container 내부에서 명령어를 직접 입력할 수 있게 합니다.
    - `-i`는 표준 입력을 열어두고, `-t`는 가상 terminal을 할당합니다.
    - shell 환경에서 작업하려면 반드시 필요한 option입니다.

- **`--rm`** option : container 종료 시 자동으로 container를 삭제하여 disk 공간을 절약합니다.
    - 일회성 작업에서 container가 누적되어 저장 공간을 차지하는 것을 방지합니다.
    - 개발 과정에서 불필요한 container 관리 부담을 줄여줍니다.

- **`-v $(pwd):/app`** option : 현재 directory를 container 내부의 `/app` directory에 연결합니다.
    - local file 변경 사항이 container 내부에 실시간으로 반영됩니다.
    - Windows에서는 `$(pwd)` 대신 Command Prompt에서 `%cd%`, PowerShell에서 `${PWD}` 사용이 필요합니다.

- **`-w /app`** option : container 시작 시 working directory를 `/app`으로 설정합니다.
    - mount된 project directory에서 바로 작업을 시작할 수 있습니다.
    - `cd /app` 명령어를 별도로 입력할 필요가 없어집니다.

- **`node:16`** : 사용할 Docker image와 Node.js version을 지정합니다.
    - 필요에 따라 `node:14`, `node:18`, `node:20` 등으로 변경하여 다른 version을 사용할 수 있습니다.
    - Docker Hub의 공식 Node.js image를 기반으로 합니다.

- **`/bin/bash`** : container 시작 시 실행할 명령어를 지정합니다.
    - bash shell을 실행하여 interactive 환경을 제공합니다.
    - 특정 명령어로 대체하여 직접 script를 실행할 수도 있습니다.


---


## 다양한 사용 예시

- 다양한 상황에 맞춰 기본 명령어를 변형하여 사용할 수 있습니다.


### 기본 Shell 접속

```bash
docker run -it --rm -v $(pwd):/app -w /app node:16 /bin/bash
```

- 가장 기본적인 형태로 Node.js 16 환경의 bash shell에 접속합니다.
- container 내부에서 자유롭게 명령어를 실행하고 file을 편집할 수 있습니다.


### 특정 Script 직접 실행

```bash
docker run --rm -v $(pwd):/app -w /app node:16 npm test
```

- shell 접속 없이 `npm test` 명령어만 실행하고 container를 종료합니다.
- CI/CD 환경이나 자동화된 test 실행에 유용합니다.
- `-it` option이 제외되어 있어 background 실행에 적합합니다.


### 다른 Node.js version 사용

```bash
docker run -it --rm -v $(pwd):/app -w /app node:18 /bin/bash
```

- Node.js 18 version으로 환경을 구성합니다.
- version 호환성 test나 최신 기능 확인 시 활용할 수 있습니다.


### Port 연결과 함께 사용

```bash
docker run -it --rm -p 3000:3000 -v $(pwd):/app -w /app node:16 /bin/bash
```

- container 내부의 3000 port를 local 3000 port에 연결합니다.
- web server나 API server 개발 시 browser에서 `localhost:3000`으로 접근 가능합니다.


### 환경 변수 설정

```bash
docker run -it --rm -e NODE_ENV=development -v $(pwd):/app -w /app node:16 /bin/bash
```

- `NODE_ENV` 환경 변수를 `development`로 설정합니다.
- application의 환경별 설정을 test할 때 유용합니다.


### Package 설치와 Script 실행

```bash
docker run --rm -v $(pwd):/app -w /app node:16 sh -c "npm install && npm start"
```

- 의존성 설치 후 application을 시작하는 명령어를 연속으로 실행합니다.
- `sh -c`를 사용하여 여러 명령어를 하나의 문자열로 전달합니다.


### Alpine Linux 기반 경량 Image 사용

```bash
docker run -it --rm -v $(pwd):/app -w /app node:16-alpine /bin/sh
```

- 더 작은 크기의 Alpine Linux 기반 Node.js image를 사용합니다.
- `/bin/sh`를 사용하여 Alpine의 기본 shell에 접속합니다.
- 빠른 download와 실행이 필요한 경우에 적합합니다.

