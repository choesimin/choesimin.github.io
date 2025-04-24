---
layout: note
permalink: /123
title: watch - Linux watch 명령어
description: 
date: 2025-04-24
published: false
---


## watch 명령어 개요

- watch는 **지정된 명령어를 주기적으로 실행하고 출력 결과를 전체 화면에 표시**하는 Linux 명령어입니다.
- 시스템 모니터링이나 특정 값의 변화를 실시간으로 관찰할 때 유용하게 사용됩니다.
- 기본적으로 2초마다 명령어를 실행하며, 이 실행 간격은 사용자가 조정할 수 있습니다.


### 기본 사용법

```bash
watch [options] command
```

- 기본 형식으로 watch 명령어를 실행합니다.
    - `watch ls -la`는 2초마다 디렉토리 내용을 갱신하여 보여줍니다.
    - `watch -n 5 df -h`는 5초마다 disk 사용량을 갱신하여 보여줍니다.
    - `watch -d free -m`은 변경 사항을 강조 표시하며 memory 사용량을 모니터링합니다.
- 표시 화면 상단에는 현재 시간과 command가 표시됩니다.
- 종료하려면 `Ctrl+C`를 누릅니다.

| Option | 설명 |
|------|------|
| `-n, --interval` | 갱신 간격을 초 단위로 설정합니다.<br>- `watch -n 10 command`는 10초마다 command를 실행합니다.<br>- 소수점 값도 사용 가능합니다(예: `watch -n 0.5 command`는 0.5초마다 실행). |
| `-d, --differences` | 연속된 출력 간의 차이점을 강조 표시합니다.<br>- `watch -d df -h`는 disk 사용량이 변경될 때 해당 부분을 강조합니다.<br>- `-d=permanent`를 사용하면 모든 변경 사항을 누적하여 표시합니다. |
| `-t, --no-title` | 화면 상단의 header 정보(시간, 명령어)를 표시하지 않습니다. |
| `-b, --beep` | 명령어 실행 결과가 0이 아닐 때 경고음을 발생시킵니다. |
| `-e, --errexit` | 명령어 실행 시 error가 발생하면 종료합니다. |
| `-g, --chgexit` | 명령어 출력이 변경되면 watch를 종료합니다. |
| `-c, --color` | ANSI color 및 style sequence 해석을 활성화합니다. |
| `-x, --exec` | command를 `sh -c`로 감싸지 않고 직접 실행합니다. |

## 활용 사례
- 시스템 자원 모니터링에 활용합니다.
    - `watch free -m`으로 memory 사용량을 지속적으로 관찰합니다.
    - `watch -d vmstat 1`로 system 성능 통계를 모니터링합니다.
    - `watch -n 1 "ps aux | grep apache"`로 특정 process 모니터링이 가능합니다.
- 파일 시스템 변화 관찰에 사용합니다.
    - `watch -d ls -la`로 디렉토리 내용 변화를 관찰합니다.
    - `watch -d cat /var/log/syslog`로 log 파일의 변화를 관찰합니다.
- 네트워크 모니터링에 활용합니다.
    - `watch -n 1 netstat -tulpn`으로 열린 port와 connection을 실시간으로 확인합니다.
    - `watch -d -n 2 "netstat -anp | grep ESTABLISHED"`로 활성 connection을 관찰합니다.
    - `watch -n 5 ping -c 1 google.com`으로 network 연결 상태를 주기적으로 확인합니다.

## 고급 사용법
- 복잡한 명령을 단일 따옴표로 묶어 사용합니다.
    - `watch 'ps aux | grep nginx | grep -v grep'`
    - `watch 'df -h | grep /dev/sda1'`
- 변수 확장이 필요한 경우 큰따옴표를 사용합니다.
    - `watch "echo $HOME"`
    - `watch "date +%s | md5sum | head -c 6"`
- 특정 조건에서 알림을 받습니다.
    - `watch -b -n 60 'test $(find /var/log -name "error*" -mmin -1 | wc -l) -gt 0'`
    - 이 명령은 지난 1분 내에 생성된 error log가 있을 때 경고음을 발생시킵니다.

## 문제 해결
- 명령어가 작동하지 않을 경우 `procps` package가 설치되어 있는지 확인합니다.
    - Debian/Ubuntu : `apt-get install procps`
    - RHEL/CentOS : `yum install procps-ng`
- 복잡한 명령어나 파이프 사용 시 인용 부호를 올바르게 사용했는지 확인합니다.
- 높은 빈도로 자원 집약적 명령을 실행하면 system 성능에 영향을 줄 수 있으므로 적절한 interval을 설정합니다.

## watch와 유사한 대안 도구
- `tail -f` : log 파일과 같은 특정 파일의 변경사항을 실시간으로 관찰합니다.
- `top` : 시스템 자원 사용량을 자세하게 모니터링하는 대화형 도구입니다.
- `htop` : top의 향상된 버전으로 더 많은 기능과 시각적 표시를 제공합니다.
- `atop` : 시스템 및 process 모니터링 도구로 과거 데이터 기록이 가능합니다.
- `vmstat` : 가상 memory, process, CPU 활동 등을 보고하는 도구입니다.