# grep

- 특정 file에서 지정한 문자열이나 정규표현식을 포함한 행을 출력해주는 명령어
- tail, ls 등 다양한 명령어아 좝하여 응용하는 경우가 많음

```sh
grep [option] [pattern] [file_name]
```

- 문자열로 찾기
    ```sh
    # 특정 file에서 'error' 문자열 찾기
    grep 'error' file_name

    # 여러개의 file에서 'error' 문자열 찾기
    grep 'error' file_name1 file_name2

    # 현재 directory내에 있는 모든 file에서 'error' 문자열 찾기
    grep 'error' *

    # 특정 확장자를 가진 모든 file에서 'error' 문자열 찾기
    grep 'error' *.log
    ```
- 정규표현식으로 찾기
    ```sh
    # 특정 file에서 문자열이 포함된 행 찾기
    grep '^[ab]' file_name 

    # 특정 file에서 a로 시작하는 모든 단어 찾기
    grep 'a*' file_name 

    # 특정 file에서 a로 시작하고 z로 끝나는 5자리 단어 찾기
    grep 'a...z' file_name 

    # 특정 file에서 a,b,c로 시작하는 단어를 모두 찾기
    grep [a-c] file_name

    # 특정 file에서 apple 또는 Apple로 시작하는 단어를 모두 찾기
    grep [aA]pple file_name 

    # 특정 file에서 a나 b로 시작되는 모든 행 찾기
    grep '^[ab]' file_name 

    # 특정 file에서 apple로 시작되고 0나 9의 숫자로 끝나로 시작되는 모든 행 찾기
    grep 'apple'[0-9] file_name
    ```

## grep option

| Option | 설명 |
| - | - |
| -c | 일치하는 행의 수 출력 |
| -i | 대소문자 구별하지 않음 |
| -v | 일치하지 않는 행만 출력 |
| -n | 포함된 행의 번호를 함께 출력 |
| -l | pattern이 포함된 파일의 이름 출력 |
| -w | 단어와 일치하는 행만 출력 |
| -x | 라인과 일치하는 행만 출력 |
| -r | 하위 디렉토리를 포함한 모든 파일에서 검색 |
| -m 숫자 | 최대로 표시될 수 있는 결과를 제한 |
| -E | 정규표현식 pattern으로 찾기 |
| -F | 문자열 pattern으로 찾기 |

## grep의 종류

| 명령어 | 설명 | 정규표현식 사용 가능 여부 |
| - | - | - |
| grep | 다중 pattern 검색 | O |
| egrep | 정규표현식 pattern 검색 ('grep -E'와 동일) | O |
| fgrep | 문자열 pattern 검색 ('grep -F'와 동일) | X |

## 사용 예

- 실시간 log 보기 (tail + grep)
    ```sh
    tail -f mylog.log | grep 192.168.15.86
    ```

- 특정 file에서 문자열 여러개 찾기
    ```sh
    cat mylog.txt | grep 'Apple' | grep 'Banana'
    ```

- grep한 결과 값 txt file로 저장하기
    ```sh
    grep -n 'Apple' mylog.txt > result.txt
    ```

---

# Reference

- https://coding-factory.tistory.com/802
