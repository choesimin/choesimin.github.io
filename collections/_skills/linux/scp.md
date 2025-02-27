---
layout: skill
title: scp - Terminal에서 File을 원격으로 전송하기
date: 2023-04-03
---


## scp : 안전한 원격 전송 Protocol

- SecureCoPy의 약자입니다.
- 원격지의 file과 directory를 가져오거나, 원격지로 보낼 때 사용하는 file 전송 protocol입니다.
- ssh 원격 접속 protocol을 기반으로 통신하기 때문에 안전합니다.
  - ssh와 동일한 22번 port의 identity file을 사용해서 file을 송수신합니다.


## 사용법

```sh
scp [option] [source] [destination]
```

| Option | 설명 |
| --- | --- |
| -r | directory 내의 모든 file/directory를 복사합니다. |
| -p | 복사할 때, 원본 권한 속성을 유지합니다. |
| -P [port_number] | port 번호를 지정하여 복사합니다. |
| -c | 압축하여 복사합니다. |
| -v | 복사할 때, 과정을 출력합니다. |
| -a | archive mode로 복사합니다. |


---


## 보내기 : Local -> Remote


### 단일 File을 원격지로 보내기

```sh
scp [option] [local_file_path] [remote_id]@[remote_ip]:[remote_path]
scp test_file root@192.168.159.129:/tmp/test_client
```


### 복수의 File을 원격지로 보내기

```sh
scp [option] [local_file_1_path] [local_file_2_path] [remote_id]@[remote_ip]:[remote_path]
scp test_file_1 test_file_2 root@192.168.159.129:/tmp/test_client
```


### 여러 File을 포함하고 있는 Directory를 원격지로 보내기

```sh
scp -r [option] [local_directory_path] [remote_id]@[remote_ip]:[remote_path]
scp -r test_directory root@192.168.159.129:/tmp/test_client
```
- `-r` option을 사용합니다.


---


## 받기 : Remote -> Local

### 단일 File을 원격지에서 가져오기

```sh
scp [option] [remote_id]@[remote_ip]:[remote_file_path] [local_path] 
scp root@192.168.159.129:/tmp/test_client/test_file /tmp
```

### 복수의 File을 원격지에서 가져오기

```sh
scp [option] [remote_id]@[remote_ip]:"[remote_file_1_path] [remote_file_2_path]" [local_path]
scp root@192.168.159.129:"/tmp/test_client/test_file_1 /tmp/test_client/test_file_2" /tmp
```
- 원격지의 file 경로들을 큰 따옴표("")로 묶어줘야 합니다.


### 여러 File을 포함하고 있는 Directory를 원격지에서 가져오기

```sh
scp -r [option] [remote_id]@[remote_ip]:[remote_directory_path] [local_path]
scp -r root@192.168.159.129:/tmp/test_client/test_directory /tmp
```
- `-r` option을 사용합니다.


---


## Reference

- <https://wlsvud84.tistory.com/11>
