/*
# k의 개수

<https://school.programmers.co.kr/learn/courses/30/lessons/120887>

---

# 문제 설명

1부터 13까지의 수에서, 1은 1, 10, 11, 12, 13 이렇게 총 6번 등장합니다. 정수 `i`, `j`, `k`가 매개변수로 주어질 때, `i`부터 `j`까지 `k`가 몇 번 등장하는지 return 하도록 solution 함수를 완성해주세요.

---

# 제한사항

- 1 ≤ `i` < `j` ≤ 100,000
- 0 ≤ `k` ≤ 9

---

# 입출력 예

| i | j | k | result |
| --- | --- | --- | --- |
| 1 | 13 | 1 | 6 |
| 10 | 50 | 5 | 5 |
| 3 | 10 | 2 | 0 |

---

# 입출력 예 설명

## 입출력 예 #1

- 본문과 동일합니다.

## 입출력 예 #2

- 10부터 50까지 5는 15, 25, 35, 45, 50 총 5번 등장합니다. 따라서 5를 return 합니다.

## 입출력 예 #3

- 3부터 10까지 2는 한 번도 등장하지 않으므로 0을 return 합니다.

*/

#include <string>
#include <iostream>

using namespace std;

int solution(int i, int j, int k)
{
    int answer = 0;
    char target = '0' + k;

    // i부터 j까지의 숫자를 문자로 바꾸어 k와 비교
    for (int num = i; num <= j; num++)
    {
        string num_str = to_string(num);

        // 각 숫자의 각 자리에서 k가 몇 번 등장하는지 세기
        for (char ch : num_str)
        {
            if (ch == target)
            {
                answer++;
            }
        }
    }

    return answer;
}

int main()
{
    int i1 = 1, j1 = 13, k1 = 1;
    int result1 = solution(i1, j1, k1);
    cout << result1 << endl;

    int i2 = 10, j2 = 50, k2 = 5;
    int result2 = solution(i2, j2, k2);
    cout << result2 << endl;

    int i3 = 3, j3 = 10, k3 = 2;
    int result3 = solution(i3, j3, k3);
    cout << result3 << endl;
}
