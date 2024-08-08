/*
# 자릿수 더하기

<https://school.programmers.co.kr/learn/courses/30/lessons/12931>

---

# 문제 설명

정수 `n`이 매개변수로 주어질 때 `n`의 각 자리 숫자의 합을 return하도록 solution 함수를 완성해주세요.

---

# 제한사항

- 0 ≤ `n` ≤ 1,000,000

---

# 입출력 예

| n | result |
| --- | --- |
| 1234 | 10 |
| 930211 | 16 |

---

# 입출력 예 설명

## 입출력 예 #1

- 1 + 2 + 3 + 4 = 10을 return합니다.

## 입출력 예 #2

- 9 + 3 + 0 + 2 + 1 + 1 = 16을 return합니다.

*/

#include <iostream>

using namespace std;

int solution(int n)
{
    int answer = 0;

    // 각 자릿수 더하기
    while (n > 0)
    {
        answer += n % 10;
        n /= 10;
    }

    return answer;
}

int main()
{
    int n1 = 1234;
    cout << solution(n1) << endl;

    int n2 = 930211;
    cout << solution(n2) << endl;
}
