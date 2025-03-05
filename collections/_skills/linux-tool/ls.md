---
layout: skill
permalink: /162
title: ls - File 목록 보기
description: ls는 terminal에서 file list을 출력하는 명령어입니다.
date: 2023-04-04
---


## `ls` : Terminal에서 File 목록을 출력하는 명령어

- 'list'의 줄임말입니다.
- directory에 있는 file 목록 정보를 확인합니다.




## 사용법

```sh
ls [optoin] [directory]
```

| Option | 의미 | 설명 |
| --- | --- | --- |
| `-a` | all | 경로안의 모든 file을 출력합니다. 숨겨진 file, directory까지 보여줍니다. |
| `-l` | long | 자세한 내용을 출력합니다. (권한, 포함된 file 수, file size, 소유자, group, 수정일자, file 이름 등) |
| `-r` | reverse | 출력 결과를 내림차순으로 정렬합니다. default option은 alphabet 순서 입니다. |
| `-R` | recursive | 하위 directory까지 출력합니다. |
| `-h` | human | file size를 'K', 'M', 'G'를 사용하여 사람이 보기 좋게 출력합니다. |
| `-t` | time | 출력 결과를 file이 수정된 시간을 기준으로 정렬합니다. |


### Option을 조합하여 사용하기

#### 숨겨진 file을 포함하여(`a`) 자세히(`l`) 출력하기

```sh
ls -al
```

#### 숨겨진 file을 포함해서(`a`) file size(`S`) 역순(`r`)으로 보기 좋게(`h`) 자세히(`l`) 출력하기

```sh
ls -alSrh
```


---


## 사용 예시


### 현재 위치의 File 목록 출력하기

```sh
ls
ls -l
```


### Directory 안의 File 출력하기

```sh
ls /
ls /home
ls -l /home
```


### Directory 내용을 File에 저장하기

```sh
ls > file.txt
```
- redirection 연산자(`>`, `>>`)를 사용합니다.


### 검색하기

```sh
ls v*.c
```
- 'v'로 시작하고 '.c'로 끝나는 directory 내용을 출력합니다.


---


## Reference

- <https://withcoding.com/89>
