---
layout: note
permalink: /321
title: watch - 단발성 명령어를 주기적으로 실행하기
description: watch 명령어를 사용하여 단발성 명령어를 주기적으로 실행하고 결과를 monitoring할 수 있습니다.
date: 2025-04-28
---


## watch : 명령어를 주기적으로 실행하여 결과 관찰하기

- watch는 **지정된 명령어를 주기적으로 실행하고 출력 결과를 전체 화면에 표시**하는 Linux 명령어입니다.
    - system monitoring이나 특정 값의 변화를 실시간으로 관찰할 때 유용하게 사용됩니다.

- 기본적으로 2초마다 명령어를 실행하며, 이 실행 간격(interval)은 사용자가 조정할 수 있습니다.
    - 높은 빈도로 자원 집약적인 명령을 실행하면 system 성능에 영향을 줄 수 있으므로, 적절한 interval을 설정합니다.


---


## 기본 사용법

```bash
watch [options] command
```

- `watch` keyword에 실행할 명령어(`command`)와 option(`[option]`)을 입력하는 기본 형식으로 watch 명령어를 실행합니다.
- 결과 표시 화면 상단에는 현재 시간과 command가 표시됩니다.

| 주요 Option | 설명 | 사용 예시 | 추가 설명 |
| --- | --- | --- | --- |
| `-n, --interval <secs>` | 갱신 간격을 초 단위로 설정 | `watch -n 10 command` | 소수점 단위 초 값도 사용 가능 |
| `-d, --differences` | 연속된 출력 간의 차이점 강조 표시 | `watch -d command` | `-d=permanent`를 사용하면 모든 변경 사항을 누적하여 표시 |
| `-t, --no-title` | 화면 상단의 header 정보를 표시하지 않음 | `watch -t command` | header에는 현재 시간, 실행한 명령어, 실행 주기 정보를 포함함 |

- 복잡한 명령어는 따옴표(`'`, `"`)로 묶어 사용합니다.

```bash
# 복잡한 명령을 작은따옴표로 묶어 사용
watch 'ps aux | grep nginx | grep -v grep'
watch 'df -h | grep /dev/sda1'

# 변수 확장이 필요한 경우 큰따옴표를 사용
watch "echo $HOME"
watch "date +%s | md5sum | head -c 6"
```

- 종료하려면 `Ctrl+C`를 누릅니다.


### 도움말 : `watch -h`

```bash
$ watch -h

Usage:
 watch [options] command

Options:
  -b, --beep             beep if command has a non-zero exit
  -c, --color            interpret ANSI color and style sequences
  -d, --differences[=<permanent>]
                         highlight changes between updates
  -e, --errexit          exit if command has a non-zero exit
  -g, --chgexit          exit when output from command changes
  -n, --interval <secs>  seconds to wait between updates
  -p, --precise          attempt run command in precise intervals
  -t, --no-title         turn off header
  -x, --exec             pass command to exec instead of "sh -c"

 -h, --help     display this help and exit
 -v, --version  output version information and exit
```


---


## 활용 예시

| 명령어 | 설명 |
| --- | --- |
| `watch -n 1 date` | 1초마다 현재 시간 출력 갱신 |
| `watch -n 1 uptime` | 1초마다 system uptime 출력 갱신 |
| `watch -d ls -la` | 2초마다 directory 내용 출력 갱신 |
| `watch free -m` | 2초마다 memory 사용량 출력 갱신 |
| `watch -d free -m` | 2초마다 변경 사항을 강조 표시하며 memory 사용량 출력 갱신 |
| `watch -n 5 df -h` | 5초마다 disk 사용량 출력 갱신 |
| `watch -n 1 "ps aux \| grep apache"` | 1초마다 특정 process의 상태 출력 갱신 |
| `watch -n 1 netstat -tulpn` | 1초마다 열린 port와 connection 목록 출력 갱신 |
| `watch -d -n 2 "netstat -anp \| grep ESTABLISHED"` | 2초마다 활성 connection 목록 출력 갱신 |


---


## watch와 비슷한 도구

- `tail -f` : log file과 같은 특정 file의 변경 사항을 실시간으로 관찰합니다.

- `top` : system 자원 사용량을 자세하게 monitoring하는 대화형 도구입니다.
    - `htop` : top의 향상된 버전으로 더 많은 기능과 시각적 표시를 제공합니다.
    - `atop` : system 및 process monitoring 도구로 과거 데이터 기록이 가능합니다.

- `vmstat` : 가상 memory, process, CPU 활동 등을 보고하는 도구입니다.
