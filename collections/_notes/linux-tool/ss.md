---
layout: note
title: netstat - 네트워크 상태 확인
date: 2024-10-02
published: false
---


## 추가 정보

### `ss` 명령어

현대의 Linux 시스템에서는 `netstat`보다 더 빠르고 상세한 정보를 제공하는 `ss` 명령어가 사용됩니다. `ss`는 `iproute2` 패키지의 일부로, 다음과 같이 사용할 수 있습니다.

```bash
ss -tulwn
```

- `-t`: TCP 소켓만 표시
- `-u`: UDP 소켓만 표시
- `-l`: 리스닝 상태의 소켓만 표시
- `-w`: 원시 소켓 포함
- `-n`: 숫자 형태로 표시
