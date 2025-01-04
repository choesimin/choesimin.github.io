---
layout: skill
date: 2025-01-03
title: vim-plug
---




## vim-plug : Vim Plugin Manager

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




---





## vim-plug의 장점

- vim-plug는 단일 file로 구성되어 있습니다.
    - 설치 과정이 단순합니다.
    - 초기 설정이 최소화되어 있습니다.
    - system 의존성이 거의 없습니다.

- plugin 관리가 직관적입니다.
    - `.vimrc`(또는 `init.vim`) file에서 모든 plugin을 한눈에 확인할 수 있습니다.
    - 명령어가 단순하고 기억하기 쉽습니다.
    - plugin의 추가와 제거가 용이합니다.

- 병렬 설치를 지원합니다.
    - 여러 plugin을 동시에 download합니다.
    - 설치 시간이 크게 단축됩니다.
    - network 자원을 효율적으로 사용합니다.

- 지연(lazy) loading 기능을 제공합니다.
    - 필요한 시점에만 plugin을 load합니다.
    - Vim의 시작 시간이 단축됩니다.
    - Memory 사용량이 최적화됩니다.

- 조건부 loading을 설정할 수 있습니다.
    - 특정 file 형식에 대해서만 plugin을 load합니다.
    - 특정 명령어 실행 시에만 plugin을 load합니다.
    - system 환경에 따라 plugin을 선택적으로 load합니다.

- Vim과 NeoVim에 모두 사용할 수 있습니다.
    - vim-plug는 Vim과 NeoVim을 모두 지원합니다.
    - 따라서 Vim에서 NeoVim으로 migration할 때, 설정을 고치지 않고 그대로 가져갈 수 있습니다.
        - Vim의 `.vimrc` file 내용을 NeoVim의 `init.vim` file에 그대로 사용 가능합니다.




---




## 주요 명령어

- `:PlugInstall` : 설정된 plugin을 설치합니다.
    - 새로 추가한 plugin만 설치됩니다.
    - 이미 설치된 plugin은 건너뜁니다.

- `:PlugUpdate` : plugin을 최신 version으로 update합니다.
    - 모든 plugin의 update 상태를 확인합니다.
    - 변경 사항이 있는 plugin만 update합니다.

- `:PlugClean` : 제거된 plugin을 삭제합니다.
    - `.vimrc`에서 제거된 plugin을 찾습니다.
    - 해당 plugin의 directory를 삭제합니다.




---




## vim-plug 설정 예시

- Vim의 config file인 `~/.vimrc` file의 예시입니다.
    - NeoVim을 사용한다면 `~/.config/nvim/init.vim` file을 수정해야 합니다.

```vim
call plug#begin()
Plug 'chriskempson/base16-vim'
Plug 'scrooloose/nerdtree'
Plug 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install() }, 'for': ['markdown', 'vim-plug']}
call plug#end()

set hlsearch
set nu
set expandtab
set tabstop=4
set shiftwidth=4
set autoindent
set encoding=utf-8

colorscheme base16-default-dark
syntax on

nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>
```

