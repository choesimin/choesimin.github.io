---
layout: note
title: cp - Linux Terminal에서 File 복사하기
version: 2023-07-07
---




## cp : File, Directory 복사하기

- CoPy의 약자입니다.
- file, directory를 복사하는 Linux 명령어입니다.




### 사용법

```sh
scp [option] [source...] [destination]
```

- `source`는 복사할 대상이 되는 원본 file이며, 여러 개의 인자를 넣어 여러 file을 복사할 수도 있습니다.
- `destination`은 복사본을 저장할 위치이며, 경로와 복사본의 file 이름을 입력해야 합니다.
    - 복사본의 file 이름을 생략하고 경로만 입력하면, 해당 경로에 원본 file의 이름으로 저장합니다.


### Option

| Option | 설명 |
| - | - |
| -a | 원본 file의 속성, link 정보도 함께 복사합니다. |
| -p | 원본 file의 소유자, group, 권한, 시간 정보를 그대로 복사합니다. |
| -f | 복사 위치에 file이 존재하는 경우 덮어씁니다. |
| -r | 원본 file의 하위 file까지 복사합니다. |
| -v | 현재 작업을 표시합니다. |
| -b | file이 이미 있는 경우, backup file을 생성합니다. |
