---
layout: skill
date: 2023-04-03
title: tail - File의 마지막 부분 출력하기
description: tail은 file의 마지막 부분을 출력하는 명령어입니다.
---


## tail : File의 꼬리

- file의 마지막 행을 기준으로 지정한 행까지의 내용을 출력해주는 명령어입니다.
- 기본 값으로는 마지막 10줄을 출력합니다.
- 주로 `grep` 명령어와 조합해서 실시간으로 갱신되는 file log를 확인할 때 사용합니다.


### 사용법

```sh
tail [option] [file_name]
```

| Option | 설명 |
| --- | --- |
| `-f` | tail을 종료하지 않고 file의 update 내용을 실시간으로 계속 출력합니다. |
| `-F` | `-f` option과 유사하지만, file이 삭제되거나 이름이 변경되어도 계속 추적하며, file이 다시 생성되면 자동으로 새 file을 monitoring합니다. |
| `-n <line_number>` | file의 마지막 줄부터 지정한 line 수까지의 내용을 출력합니다. |
| `-c <byte_number>` | file의 마지막부터 지정한 byte만큼의 내용을 출력합니다. |
| `-q` | file의 header와 상단의 file 이름을 출력하지 않고 내용만 출력합니다. |
| `-v` | 출력하기 전에 file의 header와 이름 먼저 출력한 후, 내용을 출력합니다. |


---


## 사용 예사


### 실시간 Log 보기

```sh
tail -f mylog.log    # real-time log 출력
tail -F mylog.log    # 현재 file을 추적하며 real-time log 출력
tail -f mylog.log | grep 192.168.15.86    # 실시간으로 IP address가 192.168.42.12인 행만 추출
```


### 여러 File을 동시에 확인하기

```sh
tail mylog1.log mylog2.log
```


---


## Reference

- <https://coding-factory.tistory.com/801>
