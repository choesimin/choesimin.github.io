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

## .vimrc

```
set nocompatible

filetype off 

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
Plugin 'vim-airline/vim-airline'
Plugin 'othree/html5.vim'
Plugin 'pangloss/vim-javascript'
Plugin 'elzr/vim-json'
Plugin 'Valloric/YouCompleteMe'  "auto complate
Plugin 'vim-syntastic/syntastic'  "syntax check
Plugin 'mhinz/vim-signify'  "view git history
Plugin 'nanotech/jellybeans.vim'
call vundle#end()

filetype on

set number
set showmatch
set cursorline
set cursorcolumn

set cindent
set autoindent
set expandtab
set tabstop=2
set shiftwidth=2

set hlsearch
set ignorecase

set encoding=utf-8
set fileencoding=utf-8

if has("syntax")
  syntax on
endif
colorscheme jellybeans
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
