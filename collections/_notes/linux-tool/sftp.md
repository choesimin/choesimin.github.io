---
layout: note
permalink: /477
title: Linux sftp 명령어
description: sftp(SSH File Transfer Protocol)는 SSH 연결 위에서 동작하는 file 전송 도구로, 암호화된 channel을 통해 안전하게 file을 주고받을 수 있습니다.
date: 2026-01-21
---


## sftp 명령어

- `sftp`(SSH File Transfer Protocol)는 **SSH 연결을 통해 file을 전송**하는 명령어입니다.
    - SSH의 암호화된 channel을 사용하므로 data가 안전하게 전송됩니다.
    - 기본 port는 SSH와 동일한 22번입니다.
    - interactive mode로 동작하며, FTP와 유사한 명령어 체계를 가집니다.


---


## 연결 방법

- `sftp` 명령어로 원격 server에 연결합니다.


### 기본 연결

- 사용자 이름과 host를 지정하여 연결합니다.

```bash
sftp user@hostname
sftp user@192.168.1.100
```


### Port 지정 연결

- 기본 port(22)가 아닌 다른 port를 사용하는 경우 `-P` option을 지정합니다.

```bash
sftp -P 2222 user@hostname
```

- `-P`는 대문자입니다.
    - `ssh`의 `-p`(소문자)와 다르므로 주의가 필요합니다.


### SSH Key 지정 연결

- 특정 private key file을 사용하여 연결합니다.

```bash
sftp -i ~/.ssh/my_key user@hostname
```


---


## 탐색 명령어

- sftp session 내에서 **원격 server와 local system을 탐색**하는 명령어입니다.


### 원격 Server 탐색

- 원격 server의 directory와 file을 탐색합니다.

| 명령어 | 설명 |
| --- | --- |
| `pwd` | 현재 원격 directory 경로 출력 |
| `ls` | 원격 directory 목록 출력 |
| `ls -la` | 상세 정보 포함 목록 출력 |
| `cd path` | 원격 directory 이동 |


### Local System 탐색

- local system의 directory와 file을 탐색합니다.
    - 명령어 앞에 `l`(local)을 붙입니다.

| 명령어 | 설명 |
| --- | --- |
| `lpwd` | 현재 local directory 경로 출력 |
| `lls` | local directory 목록 출력 |
| `lcd path` | local directory 이동 |


---


## File 전송 명령어

- sftp의 핵심 기능인 **file upload와 download** 명령어입니다.


### Download (원격 → Local)

- `get` 명령어로 원격 server의 file을 local로 download합니다.

```bash
# 단일 file download
get remote_file.txt

# 다른 이름으로 저장
get remote_file.txt local_file.txt

# directory 전체 download (-r : recursive)
get -r remote_directory
```


### Upload (Local → 원격)

- `put` 명령어로 local file을 원격 server에 upload합니다.

```bash
# 단일 file upload
put local_file.txt

# 다른 이름으로 저장
put local_file.txt remote_file.txt

# directory 전체 upload (-r : recursive)
put -r local_directory
```


### 다중 File 전송

- `mget`과 `mput` 명령어로 여러 file을 한 번에 전송합니다.

```bash
# 여러 file download
mget *.txt
mget file1.txt file2.txt file3.txt

# 여러 file upload
mput *.log
mput report1.pdf report2.pdf
```


---


## File 관리 명령어

- sftp session 내에서 **원격 server의 file과 directory를 관리**하는 명령어입니다.

| 명령어 | 설명 |
| --- | --- |
| `mkdir dirname` | directory 생성 |
| `rmdir dirname` | 빈 directory 삭제 |
| `rm filename` | file 삭제 |
| `rename old new` | file 또는 directory 이름 변경 |
| `chmod mode file` | file 권한 변경 |
| `chown uid file` | file 소유자 변경 |
| `chgrp gid file` | file group 변경 |


---


## Session 제어

- sftp session을 **관리하고 종료**하는 명령어입니다.

| 명령어 | 설명 |
| --- | --- |
| `bye` / `exit` / `quit` | session 종료 |
| `help` / `?` | 명령어 도움말 표시 |
| `!command` | local shell 명령어 실행 |
| `!` | local shell로 임시 전환 |

```bash
# local에서 명령어 실행 후 sftp로 복귀
sftp> !ls -la /tmp
sftp> !whoami
```


---


## 자주 사용하는 예시

- 실무에서 자주 사용하는 sftp 작업 예시입니다.


### Log File Download

- 원격 server의 log file을 local로 가져옵니다.

```bash
sftp> cd /var/log
sftp> get application.log
sftp> mget *.log
```


### 설정 File Backup 및 Upload

- 설정 file을 backup하고 새 file을 upload합니다.

```bash
sftp> cd /etc/nginx
sftp> get nginx.conf nginx.conf.backup
sftp> put nginx.conf.new nginx.conf
```


### Directory 전체 복사

- directory 전체를 recursive하게 전송합니다.

```bash
# Download
sftp> get -r /home/user/project

# Upload
sftp> put -r ./deploy /var/www/html
```


---


## Batch Mode

- `-b` option을 사용하면 **command file을 읽어 자동으로 실행**합니다.
    - script에서 자동화된 file 전송에 유용합니다.

```bash
# commands.txt 내용
cd /var/log
get application.log
bye
```

```bash
sftp -b commands.txt user@hostname
```

- password 입력 없이 실행하려면 SSH key 인증을 설정해야 합니다.


---


## FTP와의 비교

- sftp는 전통적인 FTP와 **protocol 구조와 보안 수준**에서 차이가 있습니다.

| 항목 | sftp | FTP |
| --- | --- | --- |
| 기반 protocol | SSH | TCP (독자 protocol) |
| 기본 port | 22 | 21 (제어), 20 (data) |
| 암호화 | 전체 session 암호화 | 기본적으로 평문 전송 |
| 방화벽 친화성 | 단일 port 사용으로 우수 | 다중 port로 설정 복잡 |
| 인증 방식 | SSH key, password | password, anonymous |

- FTP는 보안이 취약하여 현대 환경에서는 sftp 또는 FTPS(FTP over SSL) 사용이 권장됩니다.


---


## Reference

- <https://man7.org/linux/man-pages/man1/sftp.1.html>
- <https://www.ssh.com/academy/ssh/sftp>

