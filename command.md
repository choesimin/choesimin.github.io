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
| -lu |  |
| -lc |  |

---

# tail

```sh
tail [option] [filename]
tail filename.txt
tail -f filename.txt
```
- file의 마지막 행을 기준으로 지정한 행까지의 파일 내용 일부를 출력해주는 명령어
- 기본값으로는 마지막 10줄을 출력하며 주로 Linux에서 오류나 file log를 실시간으로 확인할 때 사용됨
    - log와 같이 시간에 따라 변하는 file들을 grep과 같은 명령어로 조합해서 실시간으로 update되는 log를 분석하는데 많이 사용됨

| Option | Desc |
| - | - |
| -f | tail을 종료하지 않고 file의 update 내용을 실시간으로 계속 출력 |
| -n [line 수] | file의 마지막 줄부터 지정한 line 수까지의 내용을 출력 |
| -c [byte 수] | file의 마지막부터 지정한 byte만큼의 내용을 출력 |
| -q | file의 header와 상단의 file 이름을 출력하지 않고 내용만 출력 |
| -v | 출력하기 전에 file의 header와 이름 먼저 출력한 후 file의 내용을 출력 |

## 실시간 log 보기 : tail + grep

```sh
tail -f mylog.log | grep 192.168.15.86
```
- mylog file을 실시간으로 access하고 IP address가 192.168.42.12인 행만 추출할 수 있음

## 여러 file 동시에 확인

```sh
tail mylog1.log mylog2.log
```
- 각 file의 마지막 부분을 확일할 수 있음

---

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

- https://coding-factory.tistory.com/801
    - tail
- https://steven-life-1991.tistory.com/9
    - gunzip / gzip
