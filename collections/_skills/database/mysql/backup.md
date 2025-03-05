---
layout: skill
permalink: /179
title: MySQL Backup - Data를 Backup하고 복원하기
description: MySQL의 data를 미리 backup해두고, 필요할 때 다시 복원할 수 있습니다.
date: 2023-08-04
---


## MySQL Backup

- `mysqldump`는 MySQL의 대표적인 Logical backup program미여, storage engine에 상관없이 data를 backup할 수 있습니다.

- `mysqldump`는 기본적으로 dump를 하려고 하는 table에 대한 `SELECT` 권한, dump하려는 View에 대한 `SHOW VIEW` 권한, dump하려는 Trigger에 대한 `TRIGGER` 권한을 가지고 있어야 합니다.
    - 만약, `--single-transaction option`을 사용할 수 없는 storage engine이라면, `LOCK TABLES` 권한이 추가적으로 필요합니다.
    - 만약, 다른 option을 추가적으로 사용한다면 해당 option에 권한이 필요합니다.

- dump file을 복원할 때도, 복원 계정은 dump file을 생성했을 때 가졌던 모든 권한을 가지고 있어야 합니다.


