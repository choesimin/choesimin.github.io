# scp

- ssh 원격 접속 protocol을 기반으로 함
- SecureCoPy의 약자
- 원격지의 file과 directory를 가져오거나 또는 반대로 보낼 때 사용하는 file 전송 protocol
- 보안적으로 안정된 protocol
  - network가 연결되어 있는 환경에서 ssh와 종일한 22번 port의 identity file을 사용해서 file을 송수신하기 때문

## 보내기 : Local -> Remote

### 단일 file을 원격지로 보내기

```sh
scp [option] [local_file_path] [remote_id]@[remote_ip]:[remote_path]
```

```sh
scp testfile2 root@192.168.159.129:/tmp/testclient
```

### 복수의 file을 원격지로 보내기

```sh
scp [option] [local_file1_path] [local_file2_path] [remote_id]@[remote_ip]:[remote_path]
```

```sh
scp tesfile1 testfile2 root@192.168.159.129:/tmp/testclient
```

### 여러 file을 포함하고 있는 directory를 원격지로 보내기

- `-r` option 사용 : 보내고자 하는 directory의 하위 folder 및 file까지 동시에 전송 가능
  - folder 자체가 넘어가게 됨

```sh
scp [option] [local_directory_path] [remote_id]@[remote_ip]:[remote_path]
```

```sh
scp -r testgogo root@192.168.159.129:/tmp/testclient
```

## 받기 : Remote -> Local

### 단일 file을 원격지에서 가져오기

```sh
scp [option] [remote_id]@[remote_ip]:[remote_file_path] [local_path] 
```

```sh
scp root@192.168.159.129:/tmp/testclient/testfile2 /tmp
```

### 복수의 file을 원격지에서 가져오기

- 주의 : 큰 따옴표("")로 묶어줘야 함

```sh
scp [option] [remote_id]@[remote_ip]:"[remote_file1_path] [remote_file2_path]" [local_path]
```

```sh
scp root@192.168.159.129:"/tmp/testclient/testfile2 /tmp/testclient/testfile3" /tmp
```

### 여러 file을 포함하고 있는 directory를 원격지에서 가져오기

- `-r` option 사용 : 보내고자 하는 directory의 하위 folder 및 file까지 동시에 전송 가능
  - folder 자체가 넘어가게 됨 (foleder 하위에 있는 것들이 넘어가는 것이 아님)

```sh
scp [option] [remote_id]@[remote_ip]:[remote_directory_path] [local_path]
```

```sh
scp -r root@192.168.159.129:/tmp/testclient/testgogo /tmp
```

## Option

| option | 설명 |
| - | - |
| r | directory 내 모든 file/directory 복사 |
| p | 원본 권한 속성 유지 복사 |
| P [port_number] | port 번호 지정 복사 |
| c | 압축 복사 |
| v | 과정 출력 복사 |
| a | archive mode 복사 |

---




# Reference

- https://wlsvud84.tistory.com/11
    - scp

