---
layout: note
permalink: /127
title: nohup - Background Program 실행시키기
description: nohup은 program을 background에서 실행시키는 명령어입니다.
date: 2023-04-05
---


## `nohup` : No Hang Up

- program을 daemon의 형태로 실행시킵니다.
    - logout으로 session과의 연결이 종료되어도 program이 종료되지 않습니다.


### `nohup` 사용법

```sh
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


### `shopt` : `&`의 Default Option 확인하기

```sh
shopt | grep huponexit
```

- `shopt`: shell option을 조회해 볼 수 있는 명령어입니다.
- `huponexit off`라고 나오면 `&`만으로만 program을 실행해도 session 연결 종료 시에 program이 종료되지 않습니다.


---


## Process와 Directory 확인

- Linux 기본 명령어를 사용해 `nohup`으로 실행한 process가 어느 directory에서 실행되고 있는지 확인할 수 있습니다.


### `nohup`으로 실행한 Process 확인하기

- `nohup`으로 띄운 program을 제어하기 위해선 PID(Process ID)를 알아야 합니다.

```bash
ps -ef | grep my_shellscript.sh
ps -ef | grep node
ps -ef | grep java
```

- `ps -ef` 명령어는 system의 모든 process를 상세하게 출력합니다.
- 그리고 `grep` 명령어를 pipe 연산자로 연결해서, 특정 program을 찾아냅니다.


### `nohup`으로 실행한 실행 Directory 확인하기

- `nohup`으로 실행한 process의 실행 directory를 확인하는 몇 가지 방법이 있습니다.

- 가장 간단하고 확실한 방법은 `readlink /proc/[PID]/cwd` 입니다.
    - 해당 process가 현재 작업하고 있는 directory의 절대 경로를 보여줍니다.

#### `/proc` File System 사용 (가장 확실한 방법)

```bash
# Process ID를 알고 있는 경우
ls -la /proc/[PID]/cwd

# 또는 실제 경로 확인
readlink /proc/[PID]/cwd
```

#### `pwdx` 명령어 사용

```bash
pwdx [PID]
```

#### `lsof` 명령어 사용

```bash
lsof -p [PID] | grep cwd
```


---


## Background Process 종료하는 방법

```bash
ps -ef | grep my_shellscript.sh
kill [process_id]
```

1. `ps -ef | grep my_shellscript.sh` : `ps` 명령어로 `process_id`를 알아냅니다.

2. `kill [process_id]` : `kill` 명령어로 process를 종료시킵니다.
    - `kill -9 [process_id]`와 같이 `-9` option을 추가하여 강제 종료시킬 수도 있습니다.
        - 일반적으로 `kill [process_id]`로도 종료가 되지만, 종료되지 않는 경우에 `-9` option을 붙여서 강제 종료시킵니다.


---


## Reference

- <https://joonyon.tistory.com/entry/%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85%ED%95%9C-nohup-%EA%B3%BC-%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%82%AC%EC%9A%A9%EB%B2%95>
