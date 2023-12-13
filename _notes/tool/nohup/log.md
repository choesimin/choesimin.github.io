---
layout: note
title: nohup - Log를 원하는 형식으로 쌓기
date: 2023-04-05
---




## nohup의 log

- nohup을 사용하면 기본적으로 `nohup.out`에 표준 출력을 쌓습니다.

| Code | Name |
| --- | --- |
| 0 | 표준 입력 |
| 1 | 표준 출력 |
| 2 | 표준 오류 |


### 표준 출력을 원하는 곳에 쌓기

```sh
nohup ./my_shellscript.sh > nohup_script.out
```
- log를 다른 file에 출력할 수 있습니다.
    - redirection(`>`, `>>`)을 이용합니다.


### 표준 출력과 표준 오류를 각각 다른 file에 쓰기

```sh
nohup ./my_shellscript.sh 1 > my_shellscript.out 2 > my_shellscript.err &
```
- 표준 출력(1)은 my_shellscript.out file로 redirection합니다.
- 표준 오류(2)는 my_shellscript.err file로 redirection합니다.


### 표준 출력과 표준 오류를 같은 file에 쓰기

```sh
nohup ./my_shellscript.sh > my_shellscript.log 2>&1 &
```
- 표준 출력(1)을 my_shellscript.log에 씁니다.
- 표준 오류(2)도 표준 출력(1)이 쓰여지는 file에 redirection합니다.


### 표준 출력(log)을 기록하고 싶지 않을 때

```sh
nohup ./my_shellscript.sh > /dev/null
```




---




## Reference

- <https://joonyon.tistory.com/entry/%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85%ED%95%9C-nohup-%EA%B3%BC-%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%82%AC%EC%9A%A9%EB%B2%95>
