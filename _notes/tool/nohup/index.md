---
layout: note
title: nohup - Background에서 Program 실행시키기
date: 2023-04-05
---




## nohup : No Hang Up

- program을 daemon의 형태로 실행시킵니다.
    - logout으로 session과의 연결이 종료되어도 program이 종료되지 않습니다.




## 사용법

```
nohup [program_command]
```

- 실행하고자 하는 program 명령어 앞에 `nohup`를 붙이면 됩니다.




---




## `nohup` + `&` : 가장 안전하게 background에서 실행하는 방법

```sh
nohup ./my_shellscript.sh &
```
- program을 종료 없이 background에서 실행시키고 싶다면 `nohup`과 `&`(background)를 조합해서 쓰는 것이 가장 확실하고 안전합니다.


### `&` (ampersand)

- program 실행 시에 명령어 맨 끝에 붙이면 foreground가 아니라 background로 실행됩니다.

```sh
./my_shellscript.sh & 
```

- logout으로 session과 연결이 끊어지면, `&`로 실행되고 있던 program도 함께 종료됩니다.
    - program을 단지 사용자 눈에 보이지 않는 background 형태로 돌리고 있는 것이기 때문입니다.
    - 예외적으로, 연결이 끊어져도 `nohup`처럼 program은 계속 실행되는 경우가 있습니다.
        - 특정 version 이상부터 session이 끊어져도 program이 종료되지 않는 option이 default로 바뀌었기 때문입니다.


### `shopt` : `&`의 default option을 확인하기

```sh
shopt | grep huponexit
```

- `shopt`: shell option을 조회해 볼 수 있는 명령어입니다.
- `huponexit off`라고 나오면 `&`만으로만 program을 실행해도 session 연결 종료 시에 program이 종료되지 않습니다.




---




## background에 떠 있는 process 종료하는 방법

1. `ps` 명령어로 `process_id`를 알아냅니다.
    - `ps -ef | grep my_shellscript.sh`

2. `kill` 명령어로 process를 종료시킵니다.
    - `kill -9 [process_id]`




---




# Reference

- <https://joonyon.tistory.com/entry/%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85%ED%95%9C-nohup-%EA%B3%BC-%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%82%AC%EC%9A%A9%EB%B2%95>
