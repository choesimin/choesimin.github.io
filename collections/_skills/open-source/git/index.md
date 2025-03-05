---
layout: skill
permalink: /15
title: Git - Source Code의 Version 관리하기
description: Git은 source code의 version을 관리하는 system으로, 여러 개발자가 동시에 작업할 수 있도록 협업 기능을 제공합니다.
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


