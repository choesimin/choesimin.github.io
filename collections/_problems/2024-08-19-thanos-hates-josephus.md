---
layout: problem
permalink: /288
title: 타노스는 요세푸스가 밉다
category: baekjoon
tags: queue
source: https://www.acmicpc.net/problem/28066
---

| 시간 제한 | 메모리 제한 |
| --- | --- |
| 0.1 초 | 512 MB |

## 문제

N마리의 청설모가 1번부터 N번까지 순서대로 시계 방향으로 원을 이루면서 앉아있다. 타노스는 손을 튕겨서 순서대로 두 번째 청설모를 제거해 왔는데, 옆 나라의 수학자 요세푸스도 이미 그 방식을 사용해 왔다는 것을 알자 기분이 상했다. 그래서 타노스는 새롭게 청설모를 제거하는 방식을 고안했다.

시작은 1번 청설모를 첫 번째 청설모로 한다. 타노스가 손을 튕기면 첫 번째 청설모부터 시계 방향으로 K마리의 청설모가 선택된다. 이후 첫 번째 청설모를 제외한 2, ..., K번째 청설모가 번호가 증가하는 순서대로 제거되고 첫 번째 청설모만 살아남는다. 단, 남아 있는 청설모가 K마리보다 적으면 첫 번째 청설모를 제외한 모든 청설모가 제거된다. 제거된 후 남아있는 청설모가 2마리 이상일 경우 첫 번째 청설모의 오른쪽 청설모가 첫 번째 청설모가 되고, 제거하는 과정을 다시 진행한다. 이 과정은 청설모가 1마리 남을 때까지 계속된다.

N, K가 주어질 때 마지막으로 남는 청설모의 번호를 구하여라.

## 입력

첫째 줄에 정수 N과 K가 공백을 사이에 두고 주어진다. (2 ≤ N, K ≤ 10⁶)

## 출력

마지막으로 남는 청설모의 번호를 출력한다.

## 예제

### 입력 1

```txt
5 4
```

### 출력 1

```txt
5
```

남아있는 청설모의 번호를 순서대로 표현해 보면

1 2 3 4 5

첫 제거는 1번 청설모를 제외한 2, 3, 4번 청설모가 제거된다. 이후 첫 번째 청설모는 5번 청설모이다.

1 ~~2~~ ~~3~~ ~~4~~ 5

남아 있는 청설모가 K마리보다 적으므로 첫 번째 청설모인 5번 청설모를 제외한 1번 청설모만 제거한다.

~~1~~ ~~2~~ ~~3~~ ~~4~~ 5

### 입력 2

```txt
1007 15
```

### 출력 2

```txt
871
```

## 노트

동물을 사랑합시다.

## 출처

University > 서강대학교 > 2023 서강대학교 청정수컵 > 새내기 Round F번

University > 서강대학교 > 2023 서강대학교 청정수컵 > 청정수 Round D번

University > 서강대학교 > 2023 서강대학교 청정수컵 > Open Contest F번

- 문제를 검수한 사람: djs100201, dong_gas, eaststar, hulahula3247, jthis, lem0nad3, mjhmjh1104, pjshwa, yunny_world
- 문제를 만든 사람: maker29

## 알고리즘 분류

- 구현
- 자료 구조
- 시뮬레이션
- 덱
- 큐

---

## Solution

```cpp
#include <iostream>
#include <queue>

using namespace std;

int main() {
    int N, K;
    cin >> N >> K;

    // 청설모를 queue에 넣기
    queue<int> squirrels;
    for (int i = 1; i <= N; i++) {
        squirrels.push(i);
    }

    // 청설모가 1마리 남을 때까지 타노스의 방식으로 숫자 제거하기
    while (squirrels.size() > 1) {
        // 첫 번째 청설모는 따로 보관하기 (나중에 다시 queue에 넣어줌)
        int first = squirrels.front();
        squirrels.pop();

        // K-1마리의 청설모를 queue에서 순서대로 제거하기
        int limit = min(K-1, (int)squirrels.size());
        for (int i = 0; i < limit; i++) {
            squirrels.pop();
        }

        // 첫 번째 청설모를 다시 queue에 넣기
        squirrels.push(first);
    }

    // 마지막으로 남은 청설모의 번호 출력하기
    cout << squirrels.front() << endl;
    return 0;
}
```
