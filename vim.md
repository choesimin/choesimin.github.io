# Vim

- linux의 대표적인 편집기인 vi와 호환되는 텍스트 편집기

### Vim의 mode

- 명령 mode (Command mode, 일반모드)
	- 입력하는 모든 키는 명령으로 수행
- 명령줄 mode (Command Line mode)
	- 화면 하단에 :(colon) prompt에 명령문장을 입력하거나 /prompt에 단어를 입력
- 입력 mode : Insert mode, 편집 mode
	- 입력하는 모든 키는 문서의 내용을 작성함
- Visual mode : 선택 mode

### Commands

- set expandtab : tab을 공백으로 바꾸기
- set tabstop=2 : tab 너비 2칸으로 설정
- set autoindent & set smartindent : 자동 들여쓰기
	- autoindent : 줄바꿈할 때 바로 아래로 cursor를 떨어뜨림 (선호)
	- smartindent : 줄바꿈할 때 tabstop만금 자동으로 더 띄어서 cursor를 위치시킴
- set shiftwidth=2 : ">>" 또는 "<<" 로 들여쓰기 할때 공백의 갯수 (기본값 8)

### Move Cursor

- '(쉴표) 2번 : 이전 위치로 이동
- control + o : 이전 위치로 이동 (stack)
- control + i : 다음 위치로 이동 (stack)

### 화면 단위 이동

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

---

# Reference

- https://www.lesstif.com/system-admin/vim-tab-space-4-18220149.html
- https://velog.io/@qkqhqhrh11/Vim%EC%9D%B4%EB%9E%80
- https://velog.io/@qkqhqhrh11/Vim-Command-mode
	- command mode
- https://velog.io/@qkqhqhrh11/Vim-Command-Line-mode
	- command line mode
- https://booolean.tistory.com/345
  - cursor move
