---
layout: problem
permalink: /290
title: 팰린드롬수
category: baekjoon
tags: string
source: https://www.acmicpc.net/problem/1259
---

| 시간 제한 | 메모리 제한 |
| --- | --- |
| 1 초 | 128 MB |

## 문제

어떤 단어를 뒤에서부터 읽어도 똑같다면 그 단어를 팰린드롬이라고 한다. 'radar', 'sees'는 팰린드롬이다.

수도 팰린드롬으로 취급할 수 있다. 수의 숫자들을 뒤에서부터 읽어도 같다면 그 수는 팰린드롬수다. 121, 12421 등은 팰린드롬수다. 123, 1231은 뒤에서부터 읽으면 다르므로 팰린드롬수가 아니다. 또한 10도 팰린드롬수가 아닌데, 앞에 무의미한 0이 올 수 있다면 010이 되어 팰린드롬수로 취급할 수도 있지만, 특별히 이번 문제에서는 무의미한 0이 앞에 올 수 없다고 하자.

## 입력

입력은 여러 개의 테스트 케이스로 이루어져 있으며, 각 줄마다 1 이상 99999 이하의 정수가 주어진다. 입력의 마지막 줄에는 0이 주어지며, 이 줄은 문제에 포함되지 않는다.

## 출력

각 줄마다 주어진 수가 팰린드롬수면 'yes', 아니면 'no'를 출력한다.

## 예제

### 입력 1

```txt
121
1231
12421
0
```

### 출력 1

```txt
yes
no
yes
```

## 출처

ICPC > Regionals > South Pacific > South Pacific Region > New Zealand Programming Contest > NZPC 2006 B번

- 문제를 번역한 사람: kks227

## 알고리즘 분류

- 구현
- 문자열

---

## Solution

```cpp
#include <iostream>
#include <string>

using namespace std;

int main() {
    string input;
    string answer;

    while (true) {
        cin >> input;
        if (input == "0") {
            break;
        }

        // 문자열 앞과 뒤에서부터 한 글자씩 비교
        bool is_palindrome = true;
        for (int i = 0; i < input.length() / 2; i++) {
            if (input[i] != input[input.length() - i - 1]) {
                is_palindrome = false;
                break;
            }
        }

        answer += (is_palindrome ? "yes\n" : "no\n");
    }

    cout << answer;
    return 0;
}
```

```cpp
#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

int main() {
    string input;
    string answer;

    while (true) {
        cin >> input;
        if (input == "0") {
            break;
        }

        // 입력 문자열 뒤집기
        string reversed_input = input;
        reverse(reversed_input.begin(), reversed_input.end());

        // 뒤집은 문자열과 같다면 팰린드롬수
        answer += (input == reversed_input ? "yes\n" : "no\n");
    }

    cout << answer;
    return 0;
}
```
