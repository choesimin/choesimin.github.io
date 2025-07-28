---
layout: note
permalink: /363
title: Vim Tab 관리 명령어
description: Vim/Neovim의 tab 관리 명령어를 사용하여, 하나의 editor 창에서 여러 file을 효율적으로 관리할 수 있습니다.
date: 2025-07-28
---


## Tab 생성하기

- 새로운 tab을 생성하는 방법은 여러 가지가 있으며, 각각 다른 상황에서 유용합니다.

| 명령어 | 설명 | 특징 |
| --- | --- | --- |
| `:tabnew` | 빈 tab 생성 | file name 생략 시 빈 buffer 생성 |
| `:tabnew [filename]` | 특정 file을 새 tab에서 열기 | 존재하지 않는 file name 입력 시 새 file 생성 |
| `:tabedit [filename]` | 특정 file을 새 tab에서 편집 | file 편집에 특화된 명령어, 상대/절대 경로 지원 |
| `:tabfind [filename]` | file 검색 후 새 tab에서 열기 | `path` option 설정에 따라 검색 범위 결정 |


---


## Tab 간 이동하기

- tab 간 이동은 keyboard shortcut과 명령어 두 가지 방법으로 가능합니다.

| 명령어 | 설명 | 특징 |
| --- | --- | --- |
| `gt` | 다음 tab으로 이동 | 가장 기본적인 shortcut |
| `gT` | 이전 tab으로 이동 | `g + Shift + t` 조합 입력 |
| `{숫자}gt` | 특정 번호 tab으로 이동 | 예: `3gt`는 3번째 tab으로 이동 |
| `:tabnext`, `:tabn` | 다음 tab으로 이동 | 명령어 방식, 축약형 지원 |
| `:tabprevious`, `:tabp` | 이전 tab으로 이동 | 명령어 방식, 축약형 지원 |
| `:tabrewind`, `:tabr` | 첫 번째 tab으로 이동 | 명령어 방식, 축약형 지원 |
| `:tablast`, `:tabl` | 마지막 tab으로 이동 | 명령어 방식, 축약형 지원 |


---


## Tab 닫기

- 불필요한 tab을 정리하여 workspace를 깔끔하게 유지할 수 있습니다.
    - 일반적인 닫기 명령어인 `:q`를 통해서도 간단히 현재 tab을 닫을 수도 있습니다.

| 명령어 | 설명 | 특징 |
| --- | --- | --- |
| `:tabclose`, `:tabc`, `:q` | 현재 tab 닫기 | 마지막 tab 닫으면 Vim 종료, 저장되지 않은 변경 사항 경고 |
| `:tabclose {숫자}` | 특정 번호 tab 닫기 | 예: `:tabclose 2`는 2번째 tab 닫기 |
| `:tabonly`, `:tabo` | 현재 tab만 남기고 모든 tab 닫기 | 각 tab의 저장되지 않은 변경 사항 개별 확인 |


---


## Tab 위치 이동하기

- tab의 순서를 변경하여 workflow에 맞게 정렬할 수 있습니다.

| 명령어 | 설명 | 특징 |
| --- | --- | --- |
| `:tabmove` | 현재 tab을 마지막 위치로 이동 | 위치 번호 생략 시 마지막으로 이동 |
| `:tabmove 0` | 현재 tab을 첫 번째 위치로 이동 | 0이 첫 번째 위치 |
| `:tabmove {숫자}` | 현재 tab을 지정된 위치로 이동 | 숫자는 0부터 시작 |
| `:tabmove +{숫자}` | 현재 tab을 오른쪽으로 이동 | `:tabmove +2`는 오른쪽으로 2칸 이동 |
| `:tabmove -{숫자}` | 현재 tab을 왼쪽으로 이동 | 상대적 위치 이동 |


---


## Tab 관리 및 정보 확인

- 여러 tab을 효율적으로 관리하기 위한 utility 명령어들입니다.

| 명령어 | 설명 | 특징 |
| --- | --- | --- |
| `:tabs` | 모든 tab 목록 보기 | tab 번호, file name, cursor 위치 표시, 현재 tab은 `>`, 이전 tab은 `#`로 표시 |
| `:tabdo {명령어}` | 모든 tab에서 명령어 실행 | `:tabdo %s/old/new/g` (모든 tab에서 문자열 치환), `:tabdo w` (모든 tab 저장) |


---


## Reference

- <https://vimdoc.sourceforge.net/htmldoc/tabpage.html>
- <https://vim.fandom.com/wiki/Using_tab_pages>

