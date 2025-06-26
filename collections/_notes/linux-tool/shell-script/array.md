---
layout: note
permalink: /349
title: Shell Script에서 배열 사용하는 방법
description: shell script에서는 각 요소를 공백이나 줄바꿈으로 구분하여 배열을 선언할 수 있습니다.
date: 2025-06-26
---


## Shell Script에서 배열 사용하기

- 다른 programming language와 마찬가지로 shell script에서도 배열을 사용하여 data를 관리할 수 있습니다.
- 배열 선언, 요소 접근, 반복문 처리 등 다양한 방법으로 배열을 활용할 수 있습니다.


---


## 배열 선언 방법

- shell script에서 배열을 선언하는 방법은 여러 가지가 있으며, 각각 다른 상황에서 활용됩니다.


### 기본 배열 선언

- 소괄호를 사용하여 배열을 선언하고 공백으로 요소를 구분합니다.

```bash
# 문자열 배열 선언
fruits=("apple" "banana" "orange" "grape")

# 숫자 배열 선언  
numbers=(1 2 3 4 5)

# 혼합 배열 선언
mixed=("hello" 42 "world" 3.14)
```


### 개별 요소 할당

- 배열의 특정 index에 개별적으로 값을 할당할 수 있습니다.

```bash
# 빈 배열 선언 후 개별 할당
colors=()
colors[0]="red"
colors[1]="green" 
colors[2]="blue"

# 또는 직접 index 지정
animals[0]="cat"
animals[1]="dog"
animals[2]="bird"
```


### 명령어 결과를 배열로 변환

- command의 실행 결과를 배열로 변환하여 저장할 수 있습니다.

```bash
# file 배열을 배열로 저장
files=($(ls *.txt))

# 현재 directory의 모든 file을 배열로 저장
all_files=(*)

# command 결과를 배열로 저장
users=($(cut -d: -f1 /etc/passwd))
```


---


## 배열 요소 접근 방법

- 배열의 요소에 직접 접근할 수 있습니다.


### 개별 요소 접근

- 중괄호와 대괄호를 사용하여 특정 index의 요소에 접근합니다.

```bash
fruits=("apple" "banana" "orange")

# 첫 번째 요소 (index 0)
echo ${fruits[0]}  # apple

# 두 번째 요소 (index 1)  
echo ${fruits[1]}  # banana

# 마지막 요소
echo ${fruits[-1]}  # orange (bash 4.3+)
```


### 전체 배열 접근

- 배열의 모든 요소에 한 번에 접근할 수 있습니다.

```bash
fruits=("apple" "banana" "orange")

# 모든 요소 출력 (각 요소가 분리됨)
echo ${fruits[@]}  # apple banana orange

# 모든 요소 출력 (하나의 문자열로 결합)
echo ${fruits[*]}  # apple banana orange

# 모든 요소를 따옴표로 보호하여 출력
echo "${fruits[@]}"  # "apple" "banana" "orange"
```


### 부분 배열 추출

- 배열의 특정 범위만을 추출할 수 있습니다.

```bash
numbers=(1 2 3 4 5 6 7 8 9 10)

# index 2부터 3개 요소 추출
echo ${numbers[@]:2:3}  # 3 4 5

# index 5부터 끝까지 추출  
echo ${numbers[@]:5}    # 6 7 8 9 10
```


---


## 배열 정보 확인

- 배열의 크기, index, 요소 존재 여부 등을 확인할 수 있습니다.


### 배열 크기 확인

- 배열에 포함된 요소의 개수를 확인합니다.

```bash
fruits=("apple" "banana" "orange")

# 배열 크기 확인
echo ${#fruits[@]}  # 3

# 특정 요소의 길이 확인
echo ${#fruits[0]}  # 5 (apple의 글자 수)
```


### 배열 index 확인

- 배열에서 사용 중인 모든 index를 확인할 수 있습니다.

```bash
sparse_array=()
sparse_array[0]="first"
sparse_array[5]="sixth"
sparse_array[10]="eleventh"

# 사용 중인 index 확인
echo ${!sparse_array[@]}  # 0 5 10
```


---


## 배열 반복 처리

- 반복문을 사용하여 배열의 요소를 순회하고 처리할 수 있습니다.


### for 반복문으로 요소 순회

- 배열의 모든 요소를 순차적으로 처리합니다.

```bash
fruits=("apple" "banana" "orange")

# 요소 값으로 순회
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# index로 순회
for i in "${!fruits[@]}"; do
    echo "Index $i: ${fruits[$i]}"
done
```


### while 반복문 사용

- while 반복문을 사용하여 배열을 처리할 수 있습니다.

```bash
numbers=(1 2 3 4 5)
i=0

while [ $i -lt ${#numbers[@]} ]; do
    echo "Number at index $i: ${numbers[$i]}"
    ((i++))
done
```


---


## 연관 배열 사용

- bash 4.0 이상에서는 연관 배열(associative array)을 지원합니다.


### 연관 배열 선언

- `declare -A` 명령어를 사용하여 연관 배열을 선언합니다.

```bash
# 연관 배열 선언
declare -A person

# 값 할당
person["name"]="John"
person["age"]="30"  
person["city"]="Seoul"

# 또는 선언과 동시에 초기화
declare -A colors=(["red"]="#FF0000" ["green"]="#00FF00" ["blue"]="#0000FF")
```


### 연관 배열 접근

- 문자열 key를 사용하여 연관 배열의 값에 접근합니다.

```bash
declare -A person=(["name"]="John" ["age"]="30" ["city"]="Seoul")

# 개별 값 접근
echo ${person["name"]}  # John
echo ${person["age"]}   # 30

# 모든 값 출력
echo ${person[@]}       # John 30 Seoul

# 모든 key 출력  
echo ${!person[@]}      # name age city
```


---


## 실용적인 활용 예제

- shell script의 배열은 실무에서 다양하게 활용할 수 있습니다.


### File 처리 예제

- 특정 확장자의 file들을 배열로 관리하고 처리합니다.

```bash
#!/bin/bash

# .txt file들을 배열로 저장
text_files=(*.txt)

if [ ${#text_files[@]} -eq 0 ]; then
    echo "No .txt files found"
    exit 1
fi

# 각 file 처리
for file in "${text_files[@]}"; do
    echo "Processing: $file"
    wc -l "$file"
done
```


### 설정 관리 예제

- 연관 배열을 사용하여 application 설정을 관리합니다.

```bash
#!/bin/bash

# 설정 정보를 연관 배열로 관리
declare -A config
config["database_host"]="localhost"
config["database_port"]="5432"
config["database_name"]="myapp"
config["log_level"]="INFO"

# 설정 출력 함수
print_config() {
    echo "=== Application Configuration ==="
    for key in "${!config[@]}"; do
        echo "$key: ${config[$key]}"
    done
}

# 설정 값 검증 함수
validate_config() {
    required_keys=("database_host" "database_port" "database_name")
    
    for key in "${required_keys[@]}"; do
        if [[ -z "${config[$key]}" ]]; then
            echo "Error: Missing required configuration: $key"
            return 1
        fi
    done
    
    return 0
}

print_config
validate_config
```


### 명령어 실행 관리 예제

- 여러 명령어를 배열로 관리하고 순차적으로 실행합니다.

```bash
#!/bin/bash

# 실행할 명령어들을 배열로 정의
commands=(
    "echo 'Starting deployment...'"
    "git pull origin main"
    "npm install"
    "npm run build"
    "systemctl restart myapp"
    "echo 'Deployment completed!'"
)

# 각 명령어 실행
for i in "${!commands[@]}"; do
    echo "Step $((i+1)): ${commands[$i]}"
    
    if eval "${commands[$i]}"; then
        echo "✓ Step $((i+1)) completed successfully"
    else
        echo "✗ Step $((i+1)) failed"
        exit 1
    fi
    
    echo "---"
done
```


---


## 주의 사항

- shell script에서 배열을 사용할 때 주의해야 할 점들이 있습니다.


### 공백이 포함된 요소 처리

- 배열 요소에 공백이 포함된 경우 따옴표로 보호해야 합니다.

```bash
# 올바른 방법
files=("file with spaces.txt" "another file.doc" "normal.txt")

# 요소 접근 시 따옴표 사용
for file in "${files[@]}"; do
    echo "Processing: $file"
done
```


### Bash Version 호환성

- 연관 배열은 bash 4.0 이상에서만 지원됩니다.

```bash
# bash version 확인
if [ "${BASH_VERSINFO[0]}" -lt 4 ]; then
    echo "This script requires bash 4.0 or higher"
    exit 1
fi

declare -A my_array
```


### 전역 변수와 지역 변수

- 함수 내에서 배열을 사용할 때는 scope에 주의해야 합니다.

```bash
# 전역 배열
global_array=("a" "b" "c")

process_array() {
    # 지역 배열 선언
    local local_array=("x" "y" "z")
    
    # 전역 배열 수정
    global_array+=("d")
    
    echo "Local: ${local_array[@]}"
    echo "Global: ${global_array[@]}"
}

process_array
echo "After function: ${global_array[@]}"
```
