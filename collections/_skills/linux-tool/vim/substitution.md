---
layout: skill
permalink: /10
title: Vim에서 문자열 치환하기
description: Vim의 치환 명령어를 사용하여 문자열을 원하는 문자열로 바꿀 수 있습니다.
date: 2025-01-04
---


## Vim 문자열 치환 명령어 : `:s`

```txt
:[range]s/pattern/replacement/[options]
```

- Vim에서 문자열을 치환하는 명령어에는 `s` keyword를 사용합니다.
    - 치환을 의미하는 'substitution'의 약자입니다.

- 기본적으로 `:s/pattern/replacement/[options]`의 형태의 명령어를 사용합니다.
    - `:s/hello/world/g`는 현재 줄의 모든 'hello'를 'world'로 바꿉니다.

- 기본 치환 명령어에 범위를 추가한 `:[range]s/pattern/replacement/[option]` 형태로 치환 범위를 지정할 수 있습니다.
    - `:%s` : 파일 전체 범위에서 치환합니다.
    - `:1,10s` : 1번째 줄부터 10번째 줄까지 치환합니다.
    - `:'<,'>s` : visual mode로 선택한 범위에서 치환합니다.

- 일부 특수 문자를 사용할 때는 back slash(`\`)를 사용합니다.

| 특수 문자 | 의미 |
| --- | --- |
| `\ ` (`\` + Empty) | Space (공백) |
| `\.` | Full Stop (마침표) |
| `\t` | Tab (들여쓰기) |
| `\n` | New Line (줄바꿈) |
| `\r` | Carriage Return |


### 치환 Option 적용하기

- `options` 항목에 치환 시 적용할 option을 설정할 수 있습니다.

| 특수 문자 | 의미 |
| --- | --- |
| `g` (global) | 해당 줄에서 발견되는 모든 패턴 치환 |
| `c` (confirm) | 치환 시 사용자 확인 요청 |
| `i` (ignore case) | 대소문자 구분 없이 치환 |
| `I` (no ignore case) | 대소문자를 구분하여 치환 |

- 특히 전체 문자열을 치환하는 `g` option은, 일반적으로 대부분의 치환 명령어에 사용합니다.
    - `g` option을 사용하지 않으면 해당 줄에서 발견하는 첫 번째 문자열만 치환하기 때문입니다.
        - 두 번째 문자열 부터는 치환하지 않게 됩니다.

- 여러 option을 주어 조합 option으로 사용할 수도 있습니다.
    - `gc`는 전체 검색하되 각각 확인하며 치환합니다.
    - `gi`는 대소문자 구분 없이 전체 치환합니다.


---


## `vimtutor`의 문자열 치환 설명

- `vimtutor`는 Vim의 기초적인 사용법부터 고급 기능까지 단계적으로 학습할 수 있도록 설계된 대화형 tutorial program입니다.
    - terminal에서 `vimtutor` 명령어를 입력하면, 실습을 시작할 수 있습니다.

```txt
		      Lesson 4.4: THE SUBSTITUTE COMMAND


	** Type  :s/old/new/g  to substitute 'new' for 'old'. **

  1. Move the cursor to the line below marked --->.

  2. Type  :s/thee/the <ENTER>  .  Note that this command only changes the
     first occurrence of "thee" in the line.

  3. Now type  :s/thee/the/g .  Adding the  g  flag means to substitute
     globally in the line, change all occurrences of "thee" in the line.

---> thee best time to see thee flowers is in thee spring.

  4. To change every occurrence of a character string between two lines,
     type   :#,#s/old/new/g    where #,# are the line numbers of the range
                               of lines where the substitution is to be done.
     Type   :%s/old/new/g      to change every occurrence in the whole file.
     Type   :%s/old/new/gc     to find every occurrence in the whole file,
     			       with a prompt whether to substitute or not.
```


---


## 실전 사용 예시 ('오타'를 '수정'으로 치환)


### 1. 기본적인 문자열 치환 예시

- `:s/오타/수정` : 현재 줄에서 맨 앞에 있는 첫 '오타'를 '수정'으로 변경합니다.
- `:s/오타/수정/g` : 현재 줄의 모든 '오타'를 '수정'으로 변경합니다.


### 2. 범위 지정 문자열 치환 예시

- `:%s/오타/수정/g` : 문서 전체의 '오타'를 '수정'으로 변경합니다.
- `:1,10s/오타/수정/g` : 1행부터 10행까지의 모든 '오타'를 '수정'으로 변경합니다.
- `:.,$s/오타/수정/g` : 현재 행에서 마지막 행 까지의 모든 '오타'를 '수정'으로 변경합니다.
- `:'<,'>s/오타/수정/g` : 선택한 범위의 '오타'를 '수정'으로 변경합니다.
    - visual mode로 범위를 선택한 뒤 `:`를 입력하면 `'<,'>`는 자동으로 입력됩니다.


### 3. 대화형 문자열 치환 예시

- `:%s/오타/수정/gc` : 문서 전체의 '오타'를 '수정'으로 하나씩 확인하며 치환합니다.
    - 변경하려면 `y`를, 변경하지 않으려면 `n`을 입력합니다.
    - 모든 확인할 문자열에 대해 변경 수락(`y`)과 거절(`n`) 작업을 진행합니다.


---


## Reference

- <https://harryp.tistory.com/736>

