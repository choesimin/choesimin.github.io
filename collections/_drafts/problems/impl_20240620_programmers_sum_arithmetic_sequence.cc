/*
# 연속된 수의 합

<https://school.programmers.co.kr/learn/courses/30/lessons/120923>

---

# 문제 설명

연속된 세 개의 정수를 더해 12가 되는 경우는 3, 4, 5입니다. 두 정수 `num`과 `total`이 주어집니다. 연속된 수 `num`개를 더한 값이 `total`이 될 때, 정수 배열을 오름차순으로 담아 return하도록 solution함수를 완성해보세요.

---

# 제한사항

- 1 ≤ `num` ≤ 100
- 0 ≤ `total` ≤ 1000
- `num`개의 연속된 수를 더하여 `total`이 될 수 없는 테스트 케이스는 없습니다.

---

# 입출력 예

| chicken | result |
| --- | --- |
| 100 | 11 |
| 1,081 | 120 |



| num | total | result |
| --- | --- | --- |
| 3 | 12 | [3, 4, 5] |
| 5 | 15 | [1, 2, 3, 4, 5] |
| 4 | 14 | [2, 3, 4, 5] |
| 5 | 5 | [-1, 0, 1, 2, 3] |

---

# 입출력 예 설명

## 입출력 예 #1

- `num` = 3, `total` = 12인 경우 [3, 4, 5]를 return합니다.

## 입출력 예 #2

- `num` = 5, `total` = 15인 경우 [1, 2, 3, 4, 5]를 return합니다.

## 입출력 예 #3

- 4개의 연속된 수를 더해 14가 되는 경우는 2, 3, 4, 5입니다.

## 입출력 예 #4

- 설명 생략

*/

#include <iostream>
#include <vector>

using namespace std;

vector<int> solution(int num, int total)
{
    vector<int> answer;

    // 등차수열의 합 공식 : S = n/2 * (2a + (n - 1)d)
    // 변수 이름으로 바꾼 공식 : total = num/2 * (2start + (num - 1)1)
    // 시작 숫자 구하는 공식 : start = (2 * total / num - num + 1) / 2
    int start = (2 * total / num - num + 1) / 2;

    for (int i = 0; i < num; i++)
    {
        answer.push_back(start + i);
    }

    return answer;
}

int print(vector<int> result)
{
    for (int num : result)
    {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}

int main()
{
    print(solution(3, 12));
    print(solution(5, 15));
    print(solution(4, 14));
    print(solution(5, 5));
}
