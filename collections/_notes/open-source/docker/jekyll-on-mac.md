---
layout: note
permalink: /307
title: Mac에서 Docker로 Jekyll 개발 환경 설정하기
description: Github Pages 등의 Jekyll 기반 site 개발 환경을 Docker로 구축하면, 다른 program과의 의존성 문제 없이 더 쉽게 구축할 수 있습니다.
date: 2025-04-07
---


## 사전 준비

- Mac에 Docker가 설치되어 있어야 합니다.
- 기본적인 terminal 명령어 사용법을 알고 있어야 합니다.
- GitHub repository가 생성되어 있어야 합니다.
- Git이 설치되어 있어야 합니다.


---


## 1. 기본 설정

- Jekyll 개발 환경을 위한 기본적인 설정을 진행합니다.


### Project Directory로 이동

- terminal을 열고 project directory로 이동합니다.

```bash
cd /project/directory
```


### Git 설정

- Mac에서 Docker로 Jekyll을 실행할 때 Git 소유권 문제가 발생할 수 있습니다.
- `git config` 명령으로 **Docker 내부 directory를 안전한 directory로 등록**합니다.

```bash
git config --global --add safe.directory /srv/jekyll
```


### Webrick 의존성 추가

- Jekyll 4.0 이상에서는 webrick library가 기본 포함되어 있지 않습니다.
- Gemfile에 webrick을 명시적으로 추가해야 합니다.

```bash
echo 'gem "webrick"' >> Gemfile
```

- `Gemfile`이 없는 경우 먼저 생성해야 합니다.


---


## 2. Jekyll 실행

- `docker run` 명령을 사용하여 Jekyll server를 시작합니다.

```bash
docker run --rm \
  --name my-blog \
  --volume="$PWD:/srv/jekyll:Z" \
  -p 4000:4000 \
  -it jekyll/jekyll \
  sh -c "bundle install && jekyll serve --force_polling"
```

| 명령어 구성 요소 | 설명 |
| --- | --- |
| `docker run` | Docker container 실행 명령어 |
| `--rm` | container 종료 시 자동으로 container 삭제 |
| `--name my-blog` | container에 식별 가능한 이름 부여 |
| `--volume="$PWD:/srv/jekyll:Z"` | 현재 directory를 container의 `/srv/jekyll`에 mount |
| `-p 4000:4000` | host의 4000 port를 container의 4000 port로 forwarding |
| `-it` | 대화형 terminal mode로 실행 |
| `sh -c "bundle install && jekyll serve --force_polling"` | 의존성 설치 후 Jekyll server를 실행 |
| `--force_polling` | file 변경 감지를 위해 polling 방식 사용 |


### Apple Silicon 사용 시 발생하는 Platform 경고

```bash
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8)
```

- Apple Silicon 사용 시, platform 경고가 발생할 수 있으나, 실행에는 영향을 주지 않으니 **일단 무시해도 괜찮습니다.**
    - Docker image의 architecture가 host system과 다를 때 발생합니다.

- 실행에는 영향을 주지 않지만 emulation으로 인해 성능이 저하될 수 있습니다.

- **해결을 위해서는 명시적으로 platform을 지정하여 실행**할 수 있습니다.
    - ARM architecture용 Jekyll image를 사용하거나 multiplatform image를 활용할 수 있습니다.


### `Permission denied` 오류 발생 시

- 실행 시, `_site`, `.jekyll-cache` directory에 대해 `Permission denied` 오류가 발생할 수 있습니다.

- 이 경우, `_site`, `.jekyll-cache` directory를 삭제하고 다시 실행하면 됩니다.
    - Jekyll이 자동으로 생성하는 directory이기 때문에, 삭제해도 상관없습니다.


---


## 3. Website Hosting 확인

- browser에서 `http://localhost:4000` 주소로 접속하여 Jekyll site를 확인할 수 있습니다.
- 실행 시 `--force_polling` option을 사용했기 때문에, local에서 변경 사항을 즉시 확인하며 개발할 수 있습니다.
    - docker가 **변경 사항을 자동으로 감지**하여, browser에서 새로고침 시 바로 반영합니다.
