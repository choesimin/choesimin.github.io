---
layout: skill
permalink: /103
title: vim-plug - Simple Vim Plugin Manager
description: vim-plug는 Vim의 plugin을 관리하는 가장 간단한 plugin manager 중 하나입니다.
date: 2025-01-03
---


## vim-plug : 가장 간단한 Vim Plugin Manager

- **vim-plug**는 여러 Vim plugin들을 최소한의 설정으로 관리할 수 있게 해주는 **plugin manager 중 하나**입니다.
    - `.vimrc` file에서 plugin을 선언적으로 관리합니다.
    - 만약 plugin manager가 없다면, plugin을 추가할 때 file을 직접 download하여 Vim의 plugin directory에 넣어줘야 합니다.
    - plugin manager는 donwload와 file 관리를 알아서 해줍니다.
        - 사용자는 설정 file만 신경쓰면 됩니다.

- [vim-plug GitHub](https://github.com/junegunn/vim-plug)를 참고하여 설치할 수 있습니다.

- Vim plugin manager에는 vim-plug 뿐만 아니라, Vundle, Pathogen, Dein.vim 등이 있습니다.
    - 각 plugin manager의 특성이 다르므로, 개발 환경에 따라 선택하여 사용하는 것이 좋습니다.


### Vim Plugin : Vim의 확장 기능

- Vim plugin은 기본 Vim의 기능을 확장하는 외부 script입니다.

- Plugin을 통해 Vim의 기본 기능에 새로운 기능을 추가할 수 있습니다.
    - 사용자가 필요한 기능을 선택적으로 설치할 수 있습니다.

- VimScript 또는 Python, Ruby 등의 언어로 작성됩니다.
    - NeoVim은 Lua라는 언어로 작성됩니다.


