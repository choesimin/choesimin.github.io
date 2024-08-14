---
layout: problem
title: 키로거
category: baekjoon
tags: stack
source: https://www.acmicpc.net/problem/5397
---

| 시간 제한 | 메모리 제한 |
| --- | --- |
| 1 초 | 256 MB |

# 문제

창영이는 강산이의 비밀번호를 훔치기 위해서 강산이가 사용하는 컴퓨터에 키로거를 설치했다. 며칠을 기다린 끝에 창영이는 강산이가 비밀번호 창에 입력하는 글자를 얻어냈다.

키로거는 사용자가 키보드를 누른 명령을 모두 기록한다. 따라서, 강산이가 비밀번호를 입력할 때, 화살표나 백스페이스를 입력해도 정확한 비밀번호를 알아낼 수 있다.

강산이가 비밀번호 창에서 입력한 키가 주어졌을 때, 강산이의 비밀번호를 알아내는 프로그램을 작성하시오. 강산이는 키보드로 입력한 키는 알파벳 대문자, 소문자, 숫자, 백스페이스, 화살표이다.

# 입력

첫째 줄에 테스트 케이스의 개수가 주어진다. 각 테스트 케이스는 한줄로 이루어져 있고, 강산이가 입력한 순서대로 길이가 L인 문자열이 주어진다. (1 ≤ L ≤ 1,000,000) 강산이가 백스페이스를 입력했다면, '-'가 주어진다. 이때 커서의 바로 앞에 글자가 존재한다면, 그 글자를 지운다. 화살표의 입력은 '<'와 '>'로 주어진다. 이때는 커서의 위치를 움직일 수 있다면, 왼쪽 또는 오른쪽으로 1만큼 움직인다. 나머지 문자는 비밀번호의 일부이다. 물론, 나중에 백스페이스를 통해서 지울 수는 있다. 만약 커서의 위치가 줄의 마지막이 아니라면, 커서 및 커서 오른쪽에 있는 모든 문자는 오른쪽으로 한 칸 이동한다.

# 출력

각 테스트 케이스에 대해서, 강산이의 비밀번호를 출력한다. 비밀번호의 길이는 항상 0보다 크다.

# 예제

## 입력 1

```txt
2
<<BP<A>>Cd-
ThIsIsS3Cr3t
```

## 출력 1

```txt
BAPC
ThIsIsS3Cr3t
```

# 출처

ICPC > Regionals > Europe > Northwestern European Regional Contest > Benelux Algorithm Programming Contest > BAPC 2010 I번

- 문제를 번역한 사람: baekjoon
- 어색한 표현을 찾은 사람: djm03178
- 문제의 오타를 찾은 사람: eles320
- 잘못된 번역을 찾은 사람: jh05013

# 알고리즘 분류

- 자료 구조
- 스택
- 연결 리스트

---

# Solution

```cpp
#include <iostream>
#include <stack>
#include <string>

using namespace std;

int main() {
    int n;
    cin >> n;

    while (n--) {
        string input;
        cin >> input;

        // 두 stack(left, right)의 top을 중간으로 이어 붙여서 입력할 공간을 만듦
        stack<char> left, right;

        for (char key : input) {
            if (key == '<') {
                if (!left.empty()) {
                    right.push(left.top());
                    left.pop();
                }
            } else if (key == '>') {
                if (!right.empty()) {
                    left.push(right.top());
                    right.pop();
                }
            } else if (key == '-') {
                if (!left.empty()) {
                    left.pop();
                }
            } else {
                left.push(key);
            }
        }

        // 출력 시 편의를 위해 오른쪽 stack으로 몰아 넣기
        while (!left.empty()) {
            right.push(left.top());
            left.pop();
        }

        while (!right.empty()) {
            cout << right.top();
            right.pop();
        }
        cout << '\n';
    }

    return 0;
}
```
