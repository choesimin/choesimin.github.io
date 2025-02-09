---
layout: skill
title: Git - Source Code의 Version 관리하기
date: 2025-02-09
---




## Git : 가장 보편적인 Version Control System

- git은 software 개발에서 **source code의 version을 관리하는 system**입니다.
    - git은 file의 변경 내역을 추적하고 저장합니다.
    - git은 여러 개발자가 동시에 작업할 수 있도록 협업 기능을 제공합니다.

- git은 **분산형 version 관리 system**입니다.
    - 각 개발자는 전체 repository의 복사본을 local에 가지고 있습니다.
    - 개발자는 internet 연결 없이도 local에서 version 관리가 가능합니다.
    - 중앙 server가 문제가 생겨도 local repository에서 data를 복구할 수 있습니다.

- git의 주요 기능은 **source code의 history 관리**입니다.
    - 언제, 누가, 어떤 변경을 했는지 추적합니다.
    - 이전 version으로 쉽게 되돌릴 수 있습니다.
    - 여러 version을 branch로 관리하여 독립적인 개발이 가능합니다.
    - 다른 개발자의 code와 병합하는 기능을 제공합니다.

- Git은 **3가지 작업 공간을 사용하여 file을 관리**합니다.
    - **Working Directory**는 실제 작업이 이루어지는 공간입니다.
    - **Staging Area**는 commit할 file을 선택적으로 저장하는 임시 공간입니다.
    - **Repository**는 version history가 저장되는 공간입니다.




---




## Git의 기본 명령어

- `git init` : 새로운 Git repository 생성.
    - 해당 directory에 `.git` directory가 생성됩니다.
    - `.git` directory에는 모든 version 정보가 저장됩니다.

- `git add` : 변경된 file을 staging area 추가.
    - 특정 file만 선택하여 추가할 수 있습니다.
    - 모든 변경 사항을 한 번에 추가할 수도 있습니다.

- `git commit` : staging area의 변경 사항 repository에 저장.
    - 각 commit은 고유한 hash 값을 가집니다.
    - commit message를 통해 변경 내용을 설명합니다.

- `git push` : local repository의 변경 사항을 remote repository에 upload.

- `git pull` : remote repository의 변경 사항을 local repository로 가져오기.




---




## Git의 Branch 관리

- branch는 **독립적인 작업 공간을 제공**합니다.
    - 각 branch는 서로 다른 version을 가질 수 있습니다.
    - 주로 새로운 기능 개발이나 bug 수정에 사용됩니다.

- `git merge` 명령은 branch를 통합합니다.
    - 서로 다른 branch의 변경 사항을 하나로 합칩니다.
    - 충돌(conflict)이 발생하면 수동으로 해결해야 합니다.




---




## Git의 기타 주요 기능

- Git은 충돌(conflict) 해결 도구를 제공합니다.
    - 같은 file을 여러 개발자가 동시에 수정할 때 발생하는 충돌을 관리합니다.
    - conflict marker를 통해 충돌 지점을 표시합니다.

- Git은 repository 복제 기능을 제공합니다.
    - `git clone` 명령으로 전체 repository를 복사할 수 있습니다.
    - 복제된 repository는 원본의 모든 history를 포함합니다.

- Git은 변경 이력 조회 기능을 제공합니다.
    - `git log` 명령으로 commit history를 확인할 수 있습니다.
    - `git diff` 명령으로 변경된 내용을 비교할 수 있습니다.




---




## Git의 고급 기능

- `git stash` : 작업 중인 변경 사항을 임시로 저장할 수 있습니다.
    - 다른 branch로 이동할 때 유용합니다.

- `git tag` : 특정 version에 이름(tag)을 붙여 관리할 수 있습니다.
    - 주로 release version 관리에 사용됩니다.

- `git rebase` : commit history를 깔끔하게 정리할 수 있습니다.
    - branch의 base를 변경할 수 있습니다.
