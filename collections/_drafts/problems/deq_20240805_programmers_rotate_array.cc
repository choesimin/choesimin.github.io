/*
# 배열 회전시키기

<https://school.programmers.co.kr/learn/courses/30/lessons/120844>

---

# 문제 설명

정수가 담긴 배열 `numbers`와 문자열 `direction`가 매개변수로 주어집니다. 배열 `numbers`의 원소를 direction` 방향으로 한 칸씩 회전시킨 배열을 return하도록 solution 함수를 완성해주세요.

---

# 제한사항

- 3 ≤ `numbers`의 길이 ≤ 20
- `direction`은 "left" 와 "right" 둘 중 하나입니다.

---

# 입출력 예

| numbers | direction | result |
| --- | --- | --- |
| [1, 2, 3] | "right" | [3, 1, 2] |
| [4, 455, 6, 4, -1, 45, 6] | "left" | [455, 6, 4, -1, 45, 6, 4 |

---

# 입출력 예 설명

## 입출력 예 #1

- `numbers`가 [1, 2, 3]이고 `direction`이 "right" 이므로 오른쪽으로 한 칸씩 회전시킨 [3, 1, 2]를 return합니다.

## 입출력 예 #2

- `numbers`가 [4, 455, 6, 4, -1, 45, 6]이고 `direction`이 "left" 이므로 왼쪽으로 한 칸씩 회전시킨 [455, 6, 4, -1, 45, 6, 4]를 return합니다.

*/

#include <string>
#include <vector>
#include <queue>
#include <iostream>

using namespace std;

vector<int> solution(vector<int> numbers, string direction)
{
    deque<int> dq(numbers.begin(), numbers.end());

    if (direction == "right")
    {
        int last = dq.back();
        dq.pop_back();
        dq.push_front(last);
    }
    else if (direction == "left")
    {
        int first = dq.front();
        dq.pop_front();
        dq.push_back(first);
    }

    vector<int> answer(dq.begin(), dq.end());
    return answer;
}

void print(vector<int> result)
{
    for (int num : result)
    {
        cout << num << ' ';
    }
    cout << endl;
}

int main()
{
    print(solution({1, 2, 3}, "right"));
    print(solution({4, 455, 6, 4, -1, 45, 6}, "left"));
}
