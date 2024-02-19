---
layout: skill
title: Linux find 명령어 - File/Directory 검색하기
date: 2024-02-15
---




- `find` 명령어는 Linux file system에서 file과 directory를 검색하는 데에 사용되는 명령어입니다.
    - 다양한 표현식을 사용하여 원하는 file의 목록을 추출할 수 있습니다.




---




## 사용법

```sh
find [path...] [expression...]
```

- `find` 명령어는 인자로 '경로(path)'와 '표현식(expression)'을 받습니다.

- **경로(path)**는 검색할 directory를 의미합니다.
    - directory 내의 모든 하위 directory와 file을 검색합니다.
    - 절대 경로와 상대 경로 모두 사용 가능합니다.
    - 여러 경로를 지정하여 한 번에 여러 directory를 검색할 수도 있습니다.
    - 대부분의 Linux는 경로 인자 값을 생략한다면 현재 위치(`.`)를 입력받은 것으로 간주하지만, Unix는 경로를 입력받지 않으면 명령어가 실행되지 않습니다.

- **표현식(expression)**은 보통 검색 대상을 특정하거나 검색할 범위를 좁히기 위해 사용합니다.
    - 표현식 연산자(operator)를 사용하여 **두 개 이상의 표현식을 조합**할 수도 있습니다.
    - 또한 검색한 결과를 가지고 다른 명령어를 실행하는 것도 가능합니다.




---




## 표현식(Expression)의 종류

- `find` 명령어엔 수많은 표현식이 있습니다.
- **표현식(expression)**은 검색 대상을 특정하거나 검색할 범위를 줄이는 데에 사용합니다.
    - 표현식 연산자(operator)를 사용하여 **두 개 이상의 표현식을 조합**할 수 있습니다.
    - 표현식으로 검색 후에 실행할 동작을 지정하는 것도 가능합니다.


### 검색 : 일반

1. `-name "[name]"` : `[name]`의 이름을 가진 file과 directory를 찾습니다.
    - 가장 많이 쓰이는 표현식이며, `[name]`에는 정규 표현식(regular expression)을 사용할 수 있습니다.
    - e.g., `find . -name "*.txt"`
        - 현재 디렉터리 이하의 모든 디렉터리에서 '.txt'로 끝나는 파일 및 디렉터리를 모두 찾습니다.

2. `-iname "[name]"` : `-name` 표현식과 기능이 동일하며, 대소문자를 구별하지 않습니다.
    - `i`는 'insensitive'의 약자입니다.
    - e.g., `find . -iname "*.txt"`

3. `-type [option]` : 특정 option(`[option]`)을 지정하여 file 유형으로 찾습니다.
    - file 유형에 대한 여러가지 option이 있습니다.
        - directory option : `d`(directory).
        - file option : `f`(normal file), `l`(link file), `s`(soket file).
        - device option : `b`(block device), `c`(character device), `p`(pipe device).
    - 주로 file만 찾거나 directory만 찾기 위해 `f`와 `d` option을 사용합니다.
    - e.g., `find . -type f`, `find . -type d`, `find . -type f -name "*.txt"`.


### 검색 : 소유자 & 권한

1. -perm : 지정한 허가권 값을 갖는 파일이나 디렉터리를 찾는다 (permission의 약자)
    - ex) -perm 755 : permission 값이 755로 설정된 파일이나 디렉터리 |
2. -user : 지정한 사용자의 파일이나 디렉터리를 찾는다 (위에가 이름가지고 찾았다면 이거는 사용자 기준) |
3. -group : 지정한 그룹 소유의 파일이나 디렉터리를 찾는다 |
4. -uid : 지정한 UID 소유의 파일이나 디렉터리를 찾는다 (아이디 번호로 찾기) |
5. -gid : 지정한 UID 소유의 파일이나 디렉터리를 찾는다 (그룹번호로 찾기) |



### 검색 : 날짜 & 시간

- n : n일 이전에 접근한 파일 찾기 (exactly)+n : n보다 오래된 녀석들 기준 (greater),-n  : n일부터 지금까지 즉 n일 내에 접근했던 파일들을 불러준다. (less) 

1. -atime n : access time 접근 시간 기준으로 찾는다.

2. -ctime n : change time 수정 시간 기준으로 찾는다.

3. -mtime n : modify time 변경 시간 기준으로 찾는다.

4. -mmin n : mmin은 분이 기준.
    - mtime은 기준이 day.

5. -newer : 옵션 뒤에 적힌 파일보다 최근에 변경된 파일을 찾습니다.
    - e.g., `find . -newer 'abc.c'`
        - `abc` 파일보다 최근에 변경된 파일을 찾습니다.

6. -cnewer : 앞의 newer가 내용 변경이라면 cnewer라면 파일 상태.





### 검색 : File 크기(size)

| -size n | n블록 길이의 파일을 찾는다.+n은 n블록보다 큰 파일을 찾으며 (greater)-n은 n블록보다 작은 파일을 찾는다 (less)보통 nc라는 형태로 많이 사용되는데 n은 문자 길이의 파일을 의미하고, c는 character를 의미하여 1문자는 1바이트이므로 보통 바이트 단위로 인식해서 사용한다. |
| -empty | 빈 파일(파일의 크기가 0일 경우)이나 빈 디렉터리일 경우 출력 |




### 검색 : Directory 깊이(depth)

1. `-maxdepth [number]` : 검색 시 주어진 정수값 n만큼의 서브 디렉터리만 검색.
    - 현재 내 폴더에서부터 n 깊이까지만.

2. `-mindepth [number]` : maxdepth의 반대.

3. `-prune` : 찾은 결과 중 디렉터리가 해당될 때, 그 디렉터리 이름만 출력
    - 하위 디렉터리에 해당되는게 있어도 들어가서 찾지 않는다.



### 검색 : inode 번호

| -inum n | node번호가 n인 파일 찾기 |






### 출력 : 결과 출력 방식 지정

| -ls | 'ls -l'과 같은 역할 |
| -print | 검색결과를 파일의 절대경로로 표시. 디폴트 옵션이다. |
| -print0 | -print옵션과 같은데 검색결과를 한줄로 이어서 표시. |



### 실행 : 검색 결과로 다른 명령 실행하기

| -exec | find로 파일을 찾고 바로 연계하여 어떠한 명령을 내릴 수 있는 옵션. 결과값은 {} 기호로 표시하고 \;로 끝내야 함. |
| -delete |  |



---




## Reference

- <https://coding-factory.tistory.com/804>
- <https://inpa.tistory.com/entry/LINUX-📚-find-명령어-정복하기-파일-검색>
