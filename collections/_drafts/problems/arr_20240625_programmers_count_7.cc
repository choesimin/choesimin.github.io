/*
# 7의 개수

<https://school.programmers.co.kr/learn/courses/30/lessons/120912>

---

# 문제 설명

머쓱이는 행운의 숫자 7을 가장 좋아합니다. 정수 배열 `array`가 매개변수로 주어질 때, 7이 총 몇 개 있는지 return 하도록 solution 함수를 완성해보세요.

---

# 제한사항

- 1 ≤ `array`의 길이 ≤ 100
- 0 ≤ `array`의 원소 ≤ 100,000

---

# 입출력 예

| array | result |
| --- | --- |
| [7, 77, 17] | 4 |
| [10, 29] | 0 |

---

# 입출력 예 설명

## 입출력 예 #1

- [7, 77, 17]에는 7이 4개 있으므로 4를 return 합니다.

## 입출력 예 #2

- [10, 29]에는 7이 없으므로 0을 return 합니다.

*/

#include <string>
#include <vector>
#include <iostream>

using namespace std;

int solution(vector<int> array)
{
    int answer = 0;
    for (int numbers : array)
    {
        for (char number : to_string(numbers))
        {
            if (number == '7')
            {
                answer++;
            }
        }
    }

    return answer;
}

int main()
{
    cout << solution({7, 77, 17}) << endl;
    cout << solution({10, 29}) << endl;
}
