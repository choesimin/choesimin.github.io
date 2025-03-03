---
layout: skill
date: 2024-05-18
title: Shell Script - 반복 작업 자동화하기
description: Shell Script를 사용하여 반복적인 작업을 자동화할 수 있습니다.
---


## Shell Script : Shell Command Programming

- Shell Script는 UNIX 계열 운영 체제에서 **명령어를 모아 놓은 Text File**입니다.
    - Shell Script는 **shell command를 사용하여 programming하는 것**을 의미합니다.

- Shell Script는 `.sh` 확장자를 가지며, script 내용은 `#!/bin/bash`로 시작합니다.

- Shell Script를 통해 사용자는 반복적인 작업을 자동화하고, system 관리 작업을 쉽게 할 수 있습니다.
    - 반복적인 명령어 입력을 script에 정의하여 **자동화**할 수 있습니다.
    - 복잡한 작업을 단순한 script로 해결할 수 있어 **효율적**입니다.
    - 다양한 UNIX 계열 system에서 동작하기 때문에 **이식성**이 좋습니다.
    - 다른 program과 쉽게 통합할 수 있기 때문에 **확장성**이 좋습니다.


---


## 예제 : Simple Backup script

- directory의 file을 backup하는 간단한 Shell Script입니다.
    - `SOURCE_DIR`의 모든 file을 `BACKUP_DIR`로 복사하여 backup합니다.

```sh
#!/bin/bash

SOURCE_DIR="/path/to/source"
BACKUP_DIR="/path/to/backup"

if [ ! -d "$BACKUP_DIR" ]; then
  mkdir -p "$BACKUP_DIR"
fi

cp -r "$SOURCE_DIR"/* "$BACKUP_DIR"

echo "Backup 성공."
```
