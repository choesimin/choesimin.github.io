---
layout: skill
date: 2023-07-16
title: Amazon EC2 - Instance에 접속하기
description: EC2 Instance에 접속하기 위해서는 SSH를 사용합니다.
---


## `ssh` 명령어로 접속하기

- `ssh` 명령어에 `-i` option을 주어 접속할 수 있습니다.
    - `-i` option을 추가하면, key file로 접속 인증을 받을 수 있습니다.

```sh
ssh -i [private_key] [user_name]@[public_ip]
ssh -i ./my-key.pem ec2-user@3.38.246.115
```


### Key File 권한 오류

- 접속할 때 권한 오류가 발생한다면, key에 권한을 부여해주어야 합니다.

```sh
chmod 400 [private_key]
chmod 400 my-key.pem
```


---


## Reference

- <https://www.youtube.com/watch?v=fytZgsmGwk8>
