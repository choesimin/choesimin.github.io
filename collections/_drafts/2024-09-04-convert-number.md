---
layout: problem
title: 숫자 변환하기
category: programmers
tags: queue
source: https://school.programmers.co.kr/learn/courses/30/lessons/154538
---

# 문제 설명

자연수 x를 y로 변환하려고 합니다. 사용할 수 있는 연산은 다음과 같습니다.
x에 n을 더합니다
x에 2를 곱합니다.
x에 3을 곱합니다.
자연수 x, y, n이 매개변수로 주어질 때, x를 y로 변환하기 위해 필요한 최소 연산 횟수를 return하도록 solution 함수를 완성해주세요. 이때 x를 y로 만들 수 없다면 -1을 return 해주세요.

# 제한사항

- `priorities`의 길이는 1 이상 100 이하입니다.
    - `priorities`의 원소는 1 이상 9 이하의 정수입니다.
    - `priorities`의 원소는 우선순위를 나타내며 숫자가 클 수록 우선순위가 높습니다.

- `location`은 0 이상 (대기 큐에 있는 프로세스 수 - 1) 이하의 값을 가집니다.
    - `priorities`의 가장 앞에 있으면 0, 두 번째에 있으면 1 … 과 같이 표현합니다.

# 입출력 예

| strArr | result |
| --- | --- |
| ["and","notad","abcd"] | ["and","abcd"] |
| ["there","are","no","a","ds"] | ["there","are","no","a","ds"] |

| priorities | location | return |
| --- | --- | --- |
| [2, 1, 3, 2] | 2 | 1 |
| [1, 1, 9, 1, 1, 1] | 0 | 5 |

# 입출력 예 설명

## 예제 #1

문제에 나온 예와 같습니다.

## 예제 #2

6개의 프로세스 [A, B, C, D, E, F]가 대기 큐에 있고 중요도가 [1, 1, 9, 1, 1, 1] 이므로 [C, D, E, F, A, B] 순으로 실행됩니다. 따라서 A는 5번째로 실행됩니다.

---

# Solution

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <queue>

using namespace std;

int solution(vector<int> priorities, int location) {
    int answer = 0;

    // 우선순위 큐 (숫자가 큰 순서로 정렬)
    priority_queue<int> pq;

    // 프로세스 정보 저장 (중요도, 원래 위치)
    queue<pair<int, int>> q;
    for (int i = 0; i < priorities.size(); i++) {
        pq.push(priorities[i]);
        q.push({priorities[i], i});
    }

    while (!q.empty()) {
        int cur_priority = q.front().first;
        int cur_location = q.front().second;

        q.pop();

        // 현재 프로세스가 가장 높은 우선순위를 가지는 경우
        if (cur_priority == pq.top()) {
            pq.pop();
            answer++;

            // 현재 프로세스가 목표 프로세스인 경우
            if (cur_location == location) {
                break;
            }
        } else {
            // 현재 프로세스가 가장 높은 우선순위가 아닌 경우, 다시 큐에 넣음
            q.push({cur_priority, cur_location});
        }
    }

    return answer;
}

int main() {
    cout << solution({2, 1, 3, 2}, 2) << endl;
    cout << solution({1, 1, 9, 1, 1, 1}, 0) << endl;
}
```
