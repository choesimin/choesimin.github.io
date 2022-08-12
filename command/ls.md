# ls

- directory에 있는 file 목록 정보 확인

| Option | Desc |
| - | - |
| -a | all : 숨겨진 file, directory까지 보여줌 |
| -l | long : 자세한 내용 출력 (권한, 포함된 file 수, file size, 소유자, group, 수정일자, file name 등) |
| -S | size : file size 순으로 정렬하여 출력 |
| -r | reverse : 거꾸로 출력 (alphabet 순이 default) |
| -R | recursive : 하위 directory까지 출력 |
| -h | human : K, M, G를 사용하여 사람이 보기 좋게 표시함 |
| -lu | atime(access time, 접근 시간)을 출력함 |
| -lc | ctime(change time, 변경 시간)을 출력함 |

- option을 조합하여 사용할 수 있음
    ```sh
    ls -alSrh
    ```
    - 숨겨진 file(a)을 포함해서 file size(S) 역순(r)으로 보기 좋게(h) 자세히(l) 출력


## directory 내용을 file에 저장

- redirection 연산자(>, >>) 사용
```sh
ls > file.txt
```

## 검색

```sh
ls v*.c
```
    - 'v'로 시작하고 '.c'로 끝나는 directory 내용 출력

---

# Reference

- https://withcoding.com/89