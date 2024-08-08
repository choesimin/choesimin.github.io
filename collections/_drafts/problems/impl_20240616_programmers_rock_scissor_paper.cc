/*
# 가위 바위 보

<https://school.programmers.co.kr/learn/courses/30/lessons/120839>

---

# 문제 설명

가위는 2 바위는 0 보는 5로 표현합니다. 가위 바위 보를 내는 순서대로 나타낸 문자열 `rsp`가 매개변수로 주어질 때, rsp에 저장된 가위 바위 보를 모두 이기는 경우를 순서대로 나타낸 문자열을 return하도록 solution 함수를 완성해보세요.

---

# 제한사항

- 0 < `rsp`의 길이 ≤ 100
- `rsp`와 길이가 같은 문자열을 return 합니다.
- `rsp`는 숫자 0, 2, 5로 이루어져 있습니다.

---

# 입출력 예

| rsp | result |
| --- | --- |
| "2" | "0" |
| "205" | "052" |

---

# 입출력 예 설명

## 입출력 예 #1

"2"는 가위이므로 바위를 나타내는 "0"을 return 합니다.

## 입출력 예 #2

"205"는 순서대로 가위, 바위, 보이고 이를 모두 이기려면 바위, 보, 가위를 순서대로 내야하므로 “052”를 return합니다.

*/

#include <string>
#include <iostream>

using namespace std;

string solution(string rsp)
{
    string answer = "";

    for (char ch : rsp)
    {
        if (ch == '2')
        {
            // 가위(2) -> 바위(0)
            answer += '0';
        }
        else if (ch == '0')
        {
            // 바위(0) -> 보(5)
            answer += '5';
        }
        else if (ch == '5')
        {
            // 보(5) -> 가위(2)
            answer += '2';
        }
    }

    return answer;
}

int main()
{
    string test1 = "2";
    string result1 = solution(test1);
    cout << result1 << endl;

    string test2 = "205";
    string result2 = solution(test2);
    cout << result2 << endl;
}
