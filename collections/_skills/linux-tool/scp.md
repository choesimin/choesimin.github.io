---
layout: skill
permalink: /139
title: scp - Terminal에서 File을 원격으로 전송하기
description: scp는 안전한 원격 전송 protocol로, file과 directory를 원격지로 보내거나 받을 때 사용합니다.
date: 2023-04-03
---


## `scp` : 안전한 원격 전송 Protocol

- SecureCoPy의 약자입니다.
- 원격지의 file과 directory를 가져오거나, 원격지로 보낼 때 사용하는 file 전송 protocol입니다.
- ssh 원격 접속 protocol을 기반으로 통신하기 때문에 안전합니다.
  - ssh와 동일한 22번 port의 identity file을 사용해서 file을 송수신합니다.


### 사용법

```sh
scp [option] [source] [destination]
```

| Option | 설명 |
| 