---
layout: note
title: Homebrew - MacOS Package Manager
version: 2023-04-01
---

## Command

- `brew update`
    - tab 되어있는 모든 저장소를 최신 version으로 update한다.

- brew upgrade
    - update로 최신화 된 저장소를 기반으로 upgrade가 필요한 항목을 upgrade함
    - upgrade를 하면 알아서 update가 선행됨
        - update가 된 항복이 어떤 것인지 확인하고 upgrade하는 것이 좋음

- brew upgrade A B C ...
    - 지정된 항목을 최신 version으로 upgrade

- brew search A
    - package 탐색

- brew install A
    - package 설치

- brew install A@1.0
    - 특정 version 설치

- brew list [--formula | --cask]
    - == brew ls
    - homebrew로 설치된 application 조회

- brew uninstall | remove | rm
    - 삭제

- brew cleanup
    - upgrade를 하며 누적된 최신 version이 아닌 package 혹은 부속 file들을 삭제함
        - package installer 등

- brew outdated
    - update하고 난 후, update 되지 않은 항목 확인

- brew leaves
    - 설치된 항목을 부속 항목을 제외하고 조회
        - == 'brew list --formula' - 'dependencies(부속 항목)'
        - 'brew list'는 dependencies 항목이 함께 출력됨

- brew deps --tree --installed A
    - 지정된 package의 dependencies 조회

- brew doctor
    - homebrew에 관련된 문제를 진단함
    - 결과로 나온 추쳔 명령어들을 참고해 문제를 해결할 수 있음

- brew services
    - services 조회

- brew services start
    - services 시작

- brew services stop
    - services 중지

- brew services restart
    - services 재시작




---




# Reference

- https://docs.brew.sh/FAQ
- https://sukvvon.tistory.com/7
