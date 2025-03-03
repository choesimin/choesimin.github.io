---
layout: skill
date: 2024-05-18
title: Linux에서 Log Filter 만들기
description: log file에서 keyword를 간편하게 검색할 수 있는 log filter script를 작성합니다.
---


## Log에서 Keyword를 간편하게 검색하기

- 오류 조치, 장애 대응, CS 처리 등의 운영 업무를 진행할 때 **운영 server의 log 확인**이 필요한 경우가 많습니다.
- 단순히 `grep` 명령어를 사용하여 file 내의 내용을 검색할 수 있지만, 한 project를 **여러 server**에서 운영하거나 대상의 **정확한 시간을 알 수 없는 경우**에는 확인하는 데에 시간이 오래 걸리게 됩니다.
- log 확인은 **규칙적이고 반복적인 업무**이기 때문에, **지정한 날짜의 log file을 대상으로 검색 keyword가 포함된 내용을 출력**해주는 program으로 정의할 수 있습니다.


---


## Log Filter 구현 및 사용 방법

- program이 정상적으로 동작하기 위한 2가지 조건이 있습니다.
    1. log file 이름에 `yyyy-mm-dd` 형식의 날짜가 포함되어 있어야 합니다.
    2. log file은 `grep` 또는 `zgrep` 명령어를 사용할 수 있는 확장자를 가지고 있어야 합니다.

- 검색 결과는 keyword를 기준으로 위 아래 500줄을 표시합니다.

- 검색 날짜를 오늘로 지정하면, file 이름에 날짜가 없는 live file까지 포함하여 검색합니다.


### 1. Core Filter Script 작성

- **검색 core logic을 정의**하는 script를 작성합니다.
    - 이후 작성할 모든 project filter script가 이 core script를 사용합니다.

```sh
vi filter.sh
```

```sh
#!/bin/bash

usage() {
    echo "Usage : $0 <directory> <filename> <date> <keyword1> [keyword2] ..."
    echo "Example : $0 /path/to/project/logs application_default.log 2024-04-25 apple banana orange peach mango papaya"
    exit 1
}

if [ "$#" -lt 4 ]; then
    usage
fi

directory=$1
filename=$2
date=$3
shift 3
keywords="$@"


find "$directory" -type f \( -name "*$date*.log" -o -name "*$date*.gz" \) | while read file; do
    for keyword in $keywords; do
        echo -e "\n\n\n\n>>>>>>>>>> $file\n"
        if [[ "$file" =~ \.gz$ ]]; then
            zgrep -C 500 "$keyword" "$file"
        else
            grep -C 500 "$keyword" "$file"
        fi
        echo -e "\n<<<<<<<<<< $file\n\n\n\n"
    done
done


today=$(date +%F)

if [ "$date" == "$today" ]; then
    find "$directory" -type f \( -name $filename \) | while read file; do
        for keyword in $keywords; do
            echo -e "\n\n\n\n>>>>>>>>>> $file\n"
            grep -C 500 "$keyword" "$file"
            echo -e "\n<<<<<<<<<< $file\n\n\n\n"
        done
    done
fi
```


### 2. Project Filter Script 작성

- 각 project를 더 쉽게 검색할 수 있도록 **project별 script를 따로 작성**합니다.
    - 이 script에 project log file의 경로와 이름 정보를 저장해두기 때문에, 매번 검색 parameter에 입력하지 않아도 됩니다.
    - 내부적으로 core filter script를 호출하여 검색 core logic을 실행합니다.

```sh
vi project_name.sh
```

```sh
#!/bin/bash

filter_script="./filter.sh"
directories=(
    "/path/to/server/1/project/logs"
    "/path/to/server/2/project/logs"
    "/path/to/server/3/project/logs"
    "/path/to/server/4/project/logs"
)
filename="application_default.log"


usage() {
    echo "Usage: $0 <date> <keyword1> [keyword2] ..."
    echo "Example: $0 2024-04-25 apple banana orange peach mango papaya"
    exit 1
}

if [ "$#" -lt 2 ]; then
    usage
fi

for directory in "${directories[@]}"; do
    "$filter_script" "$directory" "$filename" "$@"
done
```


### 3. Project Filter Script 사용하기

- project filter script를 호출합니다.

```sh
./project_name yyyy-mm-dd keyword1 keyword2 ...
```
