---
layout: note
title: grep - File에서 문자열 검색하기
date: 2023-04-03
---




## grep : 문자열 검색 명령어

- 특정 file에서 지정한 문자열이나 정규표현식을 포함한 행을 출력해주는 명령어입니다.
- `tail`, `ls` 등 다양한 명령어와 조합하여 응용하는 경우가 많습니다.


## 사용법

```sh
grep [option] [pattern] [file_name]
```


## grep option

| Option | 설명 |
| --- | --- |
| -c | 일치하는 행의 수를 출력합니다. |
| -i | 대소문자를 구별하지 않습니다. |
| -v | 일치하지 않는 행만 출력합니다. |
| -n | 포함된 행의 번호를 함께 출력합니다. |
| -l | pattern이 포함된 file의 이름을 출력합니다. |
| -w | 단어와 일치하는 행만 출력합니다. |
| -x | line과 일치하는 행만 출력합니다. |
| -r | 하위 directory를 포함한 모든 file에서 검색합니다. |
| -m [number] | 최대로 표시할 수 있는 결과를 제한합니다. |
| -E | 정규표현식 pattern으로 찾습니다. |
| -F | 문자열 pattern으로 찾습니다. |
| -A [number] | 결과부터 아래로 몇줄까지 표시할지 설정합니다. |
| -B [number] | 결과부터 위로 몇줄까지 표시할지 설정합니다. |


## grep의 종류

| 명령어 | 설명 | 정규표현식 사용 가능 여부 |
| --- | --- | --- |
| grep | 다중 pattern 검색 | O |
| egrep | 정규표현식 pattern 검색 (`grep -E`와 동일) | O |
| fgrep | 문자열 pattern 검색 (`grep -F`와 동일) | X |




---




## grep의 다양한 사용 예시


### 실시간 log 보기

```sh
tail -f mylog.log | grep 192.168.15.86
```


### 특정 file에서 문자열 여러 개 찾기

```sh
cat mylog.txt | grep 'Apple' | grep 'Banana'
```


### grep한 결과 값 txt file로 저장하기

```sh
grep -n 'Apple' mylog.txt > result.txt
```


### 문자열로 찾기

```sh
# 특정 file에서 'error' 문자열을 찾습니다.
grep 'error' [file_name]

# 여러 개의 file에서 'error' 문자열을 찾습니다.
grep 'error' [file_name_1] [file_name_2]

# 현재 directory 내에 있는 모든 file에서 'error' 문자열을 찾습니다.
grep 'error' *

# 특정 확장자를 가진 모든 file에서 'error' 문자열을 찾습니다.
grep 'error' *.log
```


### 정규표현식으로 찾기

```sh
# 특정 file에서 'a'로 시작하는 모든 단어를 찾습니다.
grep 'a*' [file_name]

# 특정 file에서 'a'로 시작하고 'z'로 끝나는 5자리 단어를 찾습니다.
grep 'a...z' [file_name]

# 특정 file에서 'a', 'b', 'c'로 시작하는 단어를 모두 찾습니다.
grep [a-c] [file_name]

# 특정 file에서 'apple' 또는 'Apple'로 시작하는 단어를 모두 찾습니다.
grep [aA]pple [file_name]
```




---




# Reference

- <https://coding-factory.tistory.com/802>
