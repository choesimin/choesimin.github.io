/*
# 나룻배

<https://www.acmicpc.net/problem/2065>

| 시간 제한 | 메모리 제한 |
| --- | --- |
| 2 초 | 128 MB |

---

# 문제

강을 사이에 두고 위치한 두 정박장 사이를 한 대의 나룻배가 오가고 있다. 두 정박장은 강을 기준으로 왼쪽(left), 오른쪽(right)으로 구분한다. 제일 처음에는 나룻배가 왼쪽 정박장에 위치해 있다. 이 나룻배는 한번에 최대 M명의 사람을 태울 수 있으며, 한 쪽 정박장에서 다른 쪽 정박장으로 이동하는데 양쪽 방향 모두 t만큼의 시간이 걸린다. 나룻배는 손님을 한 쪽 정박장에서 다른 쪽 정박장으로 실어 나르며 두 정박장 사이를 움직인다.

나룻배가 어떤 정박장에 도착하게 되면, 그 정박장으로 가고자 하는 사람들을 우선 모두 내려준다. 그 다음에는, 그 정박장에서 기다리고 있던 손님들을 배에 태울 수 있는 데까지 태운다. 손님이 배에 타는데 드는 시간은 없다고 가정하며, 가장 오래 기다린 사람이 먼저 배를 타게 된다. 손님을 다 태운 후에는 반대쪽 정박장으로 이동하게 된다. 만약 기다리던 손님이 없다면, 나룻배가 그 정박장에서 다음 손님을 기다리게 된다. 만약 기다리던 중 반대 쪽 정박장에 손님이 도착하면, 그 쪽 정박장으로 이동하게 된다.

각각의 손님들이 어느 정박장에 언제 도착하는지에 대한 정보가 주어질 때, 각 손님들이 원하는 곳에 도착하게 되는 시간을 구하는 프로그램을 작성하시오.

---

# 입력

첫째 줄에 세 정수 M, t, N이 주어진다. 다음 N개의 줄에는 각각의 손님이 정박장에 도착하는 시간과 도착하는 정박장의 위치가 주어진다. 손님이 정박장에 도착하는 시간은 10만 이하의 음이 아닌 정수이다.

---

# 출력

N개의 줄에, 입력받은 순서대로 각 손님이 목적지에 도착하게 되는 시간을 출력한다.

---

# 제한

- 1 ≤ M ≤ 10,000
- 1 ≤ t ≤ 10,000
- 1 ≤ N ≤ 10,000

---

# 예제

## 입력 1

```
2 10 10
0 left
10 left
20 left
30 left
40 left
50 left
60 left
70 left
80 left
90 left
```

## 출력 1

```
10
30
30
50
50
70
70
90
90
110
```

## 입력 2

```
2 10 3
10 right
25 left
40 left
```

## 출력 2

```
30
40
60
```

---

# 출처

Contest > Waterloo's local Programming Contests > 17 September, 2005 B번

---

# 알고리즘 분류

- 구현
- 자료 구조
- 시뮬레이션
- 큐

*/

#include <iostream>
#include <queue>
#include <vector>

using namespace std;

int main()
{
    int M, t, N;
    cin >> M >> t >> N;

    vector<pair<int, string>> passengers(N);
    for (int i = 0; i < N; i++)
    {
        cin >> passengers[i].first >> passengers[i].second;
    }

    queue<pair<int, int>> left_queue, right_queue;
    vector<int> result(N);

    for (int i = 0; i < N; i++)
    {
        if (passengers[i].second == "left")
        {
            left_queue.push({passengers[i].first, i});
        }
        else
        {
            right_queue.push({passengers[i].first, i});
        }
    }

    int current_time = 0;
    string current_side = "left";

    while (!left_queue.empty() || !right_queue.empty())
    {
        int next_arrival_time = INT_MAX;

        if (!left_queue.empty())
        {
            next_arrival_time = min(next_arrival_time, left_queue.front().first);
        }
        if (!right_queue.empty())
        {
            next_arrival_time = min(next_arrival_time, right_queue.front().first);
        }

        current_time = max(current_time, next_arrival_time);

        if (current_side == "left")
        {
            if (!left_queue.empty() && left_queue.front().first <= current_time)
            {
                int passengers_count = 0;
                while (!left_queue.empty() && left_queue.front().first <= current_time && passengers_count < M)
                {
                    result[left_queue.front().second] = current_time + t;
                    left_queue.pop();
                    passengers_count++;
                }
                current_side = "right";
                current_time += t;
            }
            else if (!right_queue.empty() && right_queue.front().first <= current_time)
            {
                current_side = "right";
                current_time += t;
            }
            else
            {
                current_time = next_arrival_time;
            }
        }
        else
        {
            if (!right_queue.empty() && right_queue.front().first <= current_time)
            {
                int passengers_count = 0;
                while (!right_queue.empty() && right_queue.front().first <= current_time && passengers_count < M)
                {
                    result[right_queue.front().second] = current_time + t;
                    right_queue.pop();
                    passengers_count++;
                }
                current_side = "left";
                current_time += t;
            }
            else if (!left_queue.empty() && left_queue.front().first <= current_time)
            {
                current_side = "left";
                current_time += t;
            }
            else
            {
                current_time = next_arrival_time;
            }
        }
    }

    for (int i = 0; i < N; i++)
    {
        cout << result[i] << endl;
    }

    return 0;
}
