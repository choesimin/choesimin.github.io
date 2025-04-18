---
layout: problem
permalink: /289
title: 단어의 개수
category: baekjoon
tags: string
source: https://www.acmicpc.net/problem/1152
---

| 시간 제한 | 메모리 제한 |
| --- | --- |
| 2 초 | 128 MB |

## 문제

영어 대소문자와 공백으로 이루어진 문자열이 주어진다. 이 문자열에는 몇 개의 단어가 있을까? 이를 구하는 프로그램을 작성하시오. 단, 한 단어가 여러 번 등장하면 등장한 횟수만큼 모두 세어야 한다.

## 입력

첫 줄에 영어 대소문자와 공백으로 이루어진 문자열이 주어진다. 이 문자열의 길이는 1,000,000을 넘지 않는다. 단어는 공백 한 개로 구분되며, 공백이 연속해서 나오는 경우는 없다. 또한 문자열은 공백으로 시작하거나 끝날 수 있다.

## 출력

첫째 줄에 단어의 개수를 출력한다.

## 예제

### 입력 1

```txt
The Curious Case of Benjamin Button
```

### 출력 1

```txt
6
```

### 입력 2

```txt
 The first character is a blank
```

### 출력 2

```txt
6
```

### 입력 3

```txt
The last character is a blank 
```

### 출력 3

```txt
6
```

## 출처

- 문제를 만든 사람: author5
- 데이터를 추가한 사람: clock, doju, jh05013
- 빠진 조건을 찾은 사람: djm03178, his130
- 내용을 추가한 사람: jh05013

## 알고리즘 분류

- 구현
- 문자열

---

## Solution

```cpp
#include <iostream>
#include <string>
#include <sstream>

using namespace std;

int main() {
    string str;
    getline(cin, str);    // 공백을 포함한 전체 문자열 입력

    stringstream ss(str);    // 문자열 스트림 생성
    string word;
    int count = 0;

    while (ss >> word) {    // 공백으로 구분하여 단어 추출
        count++; 
    }

    cout << count << endl;
    return 0;
}
```
