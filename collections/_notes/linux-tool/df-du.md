---
layout: note
permalink: /322
title: df & du - Linux의 Disk 공간 확인 도구
description: Linux나 Unix에서 df, du 명령어로 Disk 사용량을 확인할 수 있습니다.
date: 2025-04-24
---


## `df`와 `du` 명령어로 Disk 사용량 확인하기

- 개발 환경과 운영 환경 모두에서 disk 관리는 가장 기본적인 system 관리 작업입니다.

- **정기적인 disk 사용량 확인은 system 안정성 유지에 필수적**입니다.
    - disk 공간 부족은 system 성능 저하와 장애의 주요 원인입니다.
    - 불필요한 file 정리와 효율적인 storage 관리로 system 최적화가 가능합니다.
    - disk 사용량을 주기적으로 확인하는 작업은 log file 증가, application crash, backup 실패 등의 문제를 예방할 수 있습니다.

- **Linux와 Unix system에서 disk 사용량을 확인하는 가장 일반적인 도구는 `df`와 `du`입니다.**
    - `df`는 file system 수준에서 disk 사용량을 확인합니다.
    - `du`는 directory와 file 수준에서 disk 사용량을 확인합니다.

| 구분 | `df` | `du` |
| --- | --- | --- |
| **측정 대상** | file system 전체의 사용량 | 특정 directory나 file의 사용량 |
| **측정 방식** | file system의 superblock에서 정보를 가져와 빠르게 전체 현황 제공 | 실제로 directory 구조를 순회하며 각 file의 크기를 합산 |
| **결과 차이** | file system의 실제 사용 가능한 공간 보여줌 | 접근 가능한 file의 크기만 측정 (숨겨진 file, 삭제되었지만 process가 열어둔 file 등으로 인해 df와 결과 차이 발생) |
| **용도** | system 전체의 disk 사용량과 여유 공간을 빠르게 확인 | 특정 directory나 file이 차지하는 공간을 분석하고 정리 |


### `df` 명령어 : Disk Free

```bash
df [option] [file_system]
```

- df(disk free)는 **file system 수준에서 disk 공간 사용 현황을 보여주는 명령어**입니다.
- mount된 모든 file system의 전체 용량, 사용 중인 공간, 가용 공간, 사용률을 확인할 수 있습니다.
- 인자(parameter) 없이 실행하면 system의 모든 file system 정보를 출력합니다.
    - 인자로 특정 file system을 지정하면 해당 file system의 정보만 출력합니다.
- 결과는 기본적으로 1024-byte block 단위로 표시됩니다.

| Option | 설명 |
| --- | --- |
| `-h` | 사람이 읽기 쉬운 형태(KB, MB, GB)로 출력 |
| `-T` | file system의 type 함께 표시 |
| `-i` | inode 사용 정보 표시 |
| `-a` | 모든 file system 표시 (특수 file system 포함) |
| `-k` | 1024 bytes(1KB) 단위로 표시 |
| `-m` | 1024 KB(1MB) 단위로 표시 |
| `--total` | 모든 file system의 총 사용량 합산 표시 |

#### `df` 출력 결과

```bash
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda5       299G   16G  284G   6% /
/dev/vda2       994M  639M  355M  65% /boot
/dev/vda1        99M  5.8M   93M   6% /boot/efi
```

- **Filesystem** : file system이 위치한 device나 partition의 이름입니다.
- **Size** : file system의 총 크기입니다.
- **Used** : 사용 중인 disk 공간의 크기입니다.
- **Avail** : 사용 가능한 disk 공간의 크기입니다.
- **Use%** : disk 사용률을 백분율로 표시합니다.
- **Mounted on** : file system이 mount된 경로입니다.


### `du` 명령어 : Disk Usage

```bash
du [option] [directory]
```

- du(disk usage)는 **directory와 file 수준에서 disk 사용량을 확인하는 명령어**입니다.
- 특정 directory나 file이 차지하는 disk 공간을 확인할 수 있습니다.
- 인자 없이 실행하면 현재 directory와 모든 하위 directory의 사용량을 표시합니다.
- 결과는 기본적으로 1024-byte block 단위로 표시됩니다.

| Option | 설명 |
| --- | --- |
| `-h` | 사람이 읽기 쉬운 형태(KB, MB, GB)로 출력 |
| `-s` | 요약(summary) 정보만 표시 |
| `-c` | 총계(total)를 마지막에 표시 |
| `-a` | 모든 file과 directory의 사용량 표시 |
| `--max-depth=N` | 출력할 directory 깊이를 `N`으로 제한 |
| `-x` | 현재 file system에 한정하여 사용량 표시 |
| `--time` | 각 file이나 directory의 마지막 수정 시간 함께 표시 |

#### `du` 출력 결과

```bash
$ du -h
12K     ./Documents/project1
8.0K    ./Documents/project2
24K     ./Documents
36K     .
```

- **왼쪽 열** : 각 directory나 file이 차지하는 disk 공간입니다.
    - 각 directory의 사용량은 하위 directory와 file의 크기를 합산하여 계산됩니다.
- **오른쪽 열** : 각 directory나 file의 경로입니다.


---


## `df` 활용 예시

- `df` 명령어에 option과 file system을 조합하여 사용합니다.


### 기본 사용법

```bash
$ df
Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/vda5      313429996 16372068 297057928   6% /
/dev/vda2        1017736   654312    363424  65% /boot
/dev/vda1         101158     5904     95254   6% /boot/efi
```


### 사람이 읽기 쉬운 형태로 표시

```bash
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda5       299G   16G  284G   6% /
/dev/vda2       994M  639M  355M  65% /boot
/dev/vda1        99M  5.8M   93M   6% /boot/efi
```


### file system 종류와 함께 표시

```bash
$ df -hT
Filesystem     Type      Size  Used Avail Use% Mounted on
/dev/vda5      ext4      299G   16G  284G   6% /
/dev/vda2      ext4      994M  639M  355M  65% /boot
/dev/vda1      vfat       99M  5.8M   93M   6% /boot/efi
```


### inode 사용량 확인

```bash
$ df -i
Filesystem       Inodes   IUsed    IFree  IUse% Mounted on
/dev/vda5      19660800  326591 19334209     2% /
/dev/vda2        127968     327   127641     1% /boot
/dev/vda1             0       0        0     0% /boot/efi
```


### 특정 file system의 사용량 확인

```bash
$ df /dev/vda5
Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/vda5      313429996 16372068 297057928   6% /
```

```bash
$ df .
Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/vda5      313429996 16372068 297057928   6% /
```


---


## `du` 활용 예시

- `du` 명령어에 option과 directory를 조합하여 사용합니다.


### 기본 사용법

```bash
$ du
12      ./Documents/project1
8       ./Documents/project2
24      ./Documents
36      .
```


### 사람이 읽기 쉬운 형태로 표시

```bash
$ du -h
12K     ./Documents/project1
8.0K    ./Documents/project2
24K     ./Documents
36K     .
```


### directory 요약 정보만 표시

```bash
$ du -sh /var/log
156M    /var/log
```


### 여러 directory 비교

```bash
$ du -sh /var/log /var/cache /tmp
156M    /var/log
124M    /var/cache
12M     /tmp
```


### 1단계 깊이 directory만 표시

```bash
$ du -h --max-depth=1 /home/user
12K     /home/user/.ssh
156M    /home/user/Downloads
24K     /home/user/Documents
1.2G    /home/user
```


### 특정 directory의 모든 file과 directory 표시

```bash
du -ah /home/user/Documents

4.0K    /home/user/Documents/report.txt
8.0K    /home/user/Documents/data.csv
12K     /home/user/Documents/project1
8.0K    /home/user/Documents/project2
24K     /home/user/Documents
```
