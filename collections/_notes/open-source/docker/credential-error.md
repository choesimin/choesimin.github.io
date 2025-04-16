---
layout: note
permalink: /314
title: Docker "error getting credentials" 오류 해결 방법
description: '자격 증명을 가져오는 과정에서 발생하는 "error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: ``" 오류는 docker config file의 credsStore option을 수정하여 해결할 수 있습니다.'
date: 2025-04-16
---


## Docker "error getting credentials" 해결 방법

- docker를 실행할 때 자격 증명을 가져오는 과정에서 `error getting credentials` 오류가 발생하는 경우가 있습니다.

```bash
error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, out: ``
```

- 이때는 `~/.docker/config.json` file을 열어 `credsStore` option을 `credStore`로 변경하고, docker 명령어를 다시 실행하여, 문제가 해결되는지 확인합니다.

```bash
vi ~/.docker/config.json
```

```json
/* ~/.docker/config.json */
{
    // "credsStore": "desktop"    // 수정 전
    "credStore": "desktop"    // 수정 후
}
```


---


## 오류의 원인 : Docker credential helper key 호환성 문제

- Docker는 registry에 접근할 때 credential helper를 사용하여 인증 정보를 관리합니다.

- 오류는 `config.json` file 내의 `credsStore` key와 Docker runtime(Docker Desktop, Colima 등)에서 실제로 사용하는 credential helper의 key가 일치하지 않을 때 발생합니다.
- Docker의 runtime인 "Docker Desktop"과 "Colima"는 version에 따라서 `credsStore`를 사용하기도, `credStore`를 사용하기도 합니다.
- 따라서 `config.json` file 내의 credential helper key 설정을 현재 Docker runtime의 version에 맞게 `credsStore`과 `credStore` 중 하나로 변경해야 합니다.
    - credential helper key는 version이나 program에 따라 완벽히 호환되지 않습니다.

- Docker update 후 legacy config file이 자동으로 update되지 않는 경우, 또는 Docker daemon을 실행하는 runtime program을 변경하는 경우에 이러한 호환성 문제가 발생할 수 있습니다.


---


## Reference

- <https://docs.docker.com/reference/cli/docker/#credential-store-options>
