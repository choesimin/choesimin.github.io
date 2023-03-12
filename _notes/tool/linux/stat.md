---
layout: note
---

# stat

- file 상태 정보 출력 명령
```sh
stat text.txt
```

- Linux에서는 다양한 시간 정보(Timestamps)를 inode에 저장함
    - inode : file이나 directory의 정보(meta data)를 기록하는 곳
    - inode에 기록하는 시간 정보에는 ctime, mtime, atime이 있음

## atime (access time, 접근 시간)

- file에 접근한 시간을 나타냄
- file을 open할 때마다 갱신됨
    - ex) vi 에디터나 cat 명령으로 file의 내용을 확인 할 때
- 반드시 atime이 변경되지는 않음
    - 예외가 있음
- ls 명령의 u option을 이용하여 access time을 확인할 수 있음
    ```sh
    ls -lu
    ```

## mtime (modification time, 수정 시간)

- file의 내용이 수정될 때 mtime 시간이 변경됨
- 보통 mtime이 변경되면 ctime, atime 값이 모두 변경됨
- ls 명령으로 출력되는 값은 기본적으로 mtime임 (ls 시간의 기본값)
    ```sh
    ls -l
    ```

## ctime (change time, 변경 시간)

- ctime에서 c는 change를 의미함
    - create 아님
        - Linux에서는 file 생성 시간(만든 날짜)를 알 수 없음
- inode의 값(file의 속성, 권한, file size 등)이 변경되면 ctime이 갱신됨
- ls 명령의 c option을 사용하면 ctime을 확인할 수 있음
    ```sh
    ls -lc
    ```

---

# Reference

- https://withcoding.com/115
