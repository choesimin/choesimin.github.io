# gzip / gunzip

- Linux에서 압축 기능을 담당하는 명령어
    - 여러 파일을 압축할 때는 tar로 파일을 묶고 gzip으로 tar파일을 압축
        - tar : file을 하나로 모으되 압축은 하지 않음
            - tar의 option에서 gzip 실행 여부를 지정할 수 있기 때문에 gzip이 단독으로 쓰일 경우는 많지 않음
        - gzip : file을 모을 수는 없지만 압축 수 있음
```sh
gunzip [option] [file-name]
```

| Option | Description |
| - | - |
| -n | n은 1부터 9까지 숫자로, 1이 가장 빠르지만 압축률은 가장 낮음 |
| -c | 압축 결과를 출력하고 원본 file은 그대로 놔둠 |
| -d | 압축 해제 |
| -f | 강제 압축 |
| -l | 압축 file의 정보 출력 |
| -r | directory를 지정 시 directory에 포함된 모든 file 압축 |
| -t | 압축 file test |
| -v | 압축 혹은 해제 시 자세한 정보 출력 |
| -h | 도움말 출력 |
| -V | version 출력 |

## 여러 .gz file에서 특정 단어를 검색할 때

```sh
gunzip -cv [common_file_name_string].**.gz | grep [search_word]
```

---

# Reference

- https://steven-life-1991.tistory.com/9


