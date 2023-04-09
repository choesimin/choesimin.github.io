---
layout: note
title: Vim - terminal text 편집기
version: 2023-04-06
---




## Vim : 개선된 Vi

- Linux의 대표적인 편집기인 Vi와 호환되는 text 편집기입니다.




## Vim의 mode

| Mode | 설명 |
| - | - |
| Command Mode | 명령을 수행됩니다. |
| Command Line Mode | 화면 하단에 colon(`:`) prompt에 명령 문장을 입력하거나, slash(`/`) prompt에 단어를 입력합니다. |
| Insert Mode or Edit Mode | 문서의 내용을 작성합니다. |
| Visual Mode | 선택합니다. |




---




## 검색하기

| 명령어 | 설명 |
| - | - |
| `/[keyword]` | 문자열을 검색합니다. |




## Cursor 이동하기

| 명령어 | 설명 |
| - | - |
| `h` | 왼쪽으로 이동합니다. |
| `l` | 오른쪽으로 이동합니다. |
| `j` | 아래로 이동합니다. |
| `k` | 위로 이동합니다. |
| `w` | 다음 단어로 이동합니다. |
| `b` | 이전 단어로 이동합니다. |
| `shift` + `h` | 화면 상단으로 이동합니다. |
| `shift` + `m` | 화면 중단으로 이동합니다. |
| `shift` + `l` | 화면 하단으로 이동합니다. |
| `0` | line의 왼쪽 끝(맨 앞)으로 이동합니다. |
| `shift` + `4` | line의 오른쪽 끝(맨 뒤)으로 이동합니다. |




## 화면 이동하기

| 명령어 | 설명 |
| - | - |
| `control` + `d` | 아래(down)로 이동합니다. |
| `control` + `u` | 위(up)로 이동합니다 |
| `control` + `e` | 한 줄씩 아래로 이동합니다. cursor의 위치는 유지합니다. |
| `control` + `y` | 한 줄씩 위로 이동합니다. cursor의 위치는 유지합니다. |
| `zz` | cursor의 위치가 화면 중단에 오도록 화면을 이동합니다. cursor의 위치는 유지합니다. |




## 설정하기

| 명령어 | 설명 |
| - | - |
| `:set hlsearch` | tab을 공백으로 바꿉니다. |
| `:set nu` | line number를 표시합니다. |
| `:set expandtab` | tab을 공백으로 바꿉니다. |
| `:set tabstop=2` | tab 너비를 2칸으로 설정합니다. |
| `:set shiftwidth=2` | `>>` 또는 `<<`로 들여쓸 때, 공백의 갯수를 2로 설정합니다. 기본값 8입니다. |
| `:set autoindent` | 자동으로 들여쓰기합니다. 줄을 바꿀 때, 바로 아래로 cursor를 떨어뜨립니다. |
| `:set smartindent` | 자동으로 들여쓰기합니다. 줄을 바꿀 때, tabstop만금 자동으로 더 띄어서 cursor를 위치시킵니다. |
| `:set encoding=utf-8` | encoding 방식을 utf-8로 설정합니다. |




---




# Reference

- <https://www.vim.org>