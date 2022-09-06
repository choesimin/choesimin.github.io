# Vim

- Linux의 대표적인 편집기인 vi와 호환되는 텍스트 편집기

## Mode

- Command Mode
    - 입력하는 모든 key는 명령으로 수행
- Command Line Mode
    - 화면 하단에 ':(colon) prompt'에 명령 문장을 입력하거나 /prompt에 단어를 입력
- Insert Mode or Edit Mode
    - 입력하는 모든 key는 문서의 내용을 작성함
- Visual Mode
    - 선택 mode

## Move Cursor

- '(쉴표) 2번 : 이전 위치로 이동
- control + o : 이전 위치로 이동 (stack)
- control + i : 다음 위치로 이동 (stack)

## Move Display

- control + f : 한 회면 밑으로 이동
- control + f (forward) : 한화면 밑으로 이동
- control + b (backward) : 한화면 위로 이동
- control + d (down) : 반쪽화면 밑으로 이동
- control + u (upon) : 반쪽화면 위로 이동
- control + e : cursor는 현재위치 그대로 화면만 한줄씩 위로 이동
- control + y : cursor는 현재위치 그대로 화면만 한줄씩 아래로 이동 
- zt : cursor의 위치와 함께, 화면상의 맨위로 
- nz : n번 line을 화면상의 맨위로 
- z : cursor의 위치와 함께, 화면상의 중간으로 
- z- : cursor의 위치와 함께, 화면상의 맨아래로 

## Setting Command

- set expandtab : tab을 공백으로 바꾸기
- set tabstop=2 : tab 너비 2칸으로 설정
- set autoindent & set smartindent : 자동 들여쓰기
    - autoindent : 줄바꿈할 때 바로 아래로 cursor를 떨어뜨림 (선호)
    - smartindent : 줄바꿈할 때 tabstop만금 자동으로 더 띄어서 cursor를 위치시킴
- set shiftwidth=2 : ">>" 또는 "<<" 로 들여쓰기 할때 공백의 갯수 (기본값 8)
- set encoding=utf-8 : encoding 방식
- set fileencodings=utf-8,cp949 : file encoding 방식

## My .vimrc setting

```
set nocompatible
filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'

Plugin 'suan/vim-instant-markdown'

call vundle#end()
filetype plugin indent on


set cursorline
set autoindent
set expandtab
set tabstop=4
set shiftwidth=4

syntax on

colorscheme slate
```

## Turning off markdown underscore syntax error

- '~/.vim/after/syntax/markdown.vim'에 추가
    ```
    " New error pattern without the underscore
    syn match markdownError "\w\@<=\w\@="
    ```

## nvim 사용시 vimrc를 통해 설정하기

- vim과 nvim의 config file 경로가 다름
    - vim : ~/.vimrc
    - nvim : ~/.config/nvim/init.vim
- nvim의 config file에 아래 세 줄을 적으면 ```~/.vimrc```에서 nvim 설정을 할 수 있음
    ```
    set runtimepath+=~/.vim,~/.vim/after
    set packpath+=~/.vim
    source ~/.vimrc
    ```

---

# Reference

- https://devanix.tistory.com/62
    - .vimrc options
- https://www.lesstif.com/system-admin/vim-tab-space-4-18220149.html
- https://velog.io/@qkqhqhrh11/Vim%EC%9D%B4%EB%9E%80
- https://velog.io/@qkqhqhrh11/Vim-Command-mode
    - command mode
- https://velog.io/@qkqhqhrh11/Vim-Command-Line-mode
    - command line mode
- https://booolean.tistory.com/345
    - cursor move
- https://exchangetuts.com/turn-off-highlighting-a-certain-pattern-in-vim-1640071384657173
    - Turning off markdown underscore syntax error
- https://jinmay.github.io/2020/05/18/linux/vimrc-to-nvimrc/
    - nvim에서 vim과 같은 설정 사용하기
