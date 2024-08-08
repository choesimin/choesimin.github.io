/*
# 문자열 계산하기

<https://school.programmers.co.kr/learn/courses/30/lessons/120902>

---

# 문제 설명

`my_string`은 "3 + 5"처럼 문자열로 된 수식입니다. 문자열 `my_string`이 매개변수로 주어질 때, 수식을 계산한 값을 return 하는 solution 함수를 완성해주세요.

---

# 제한사항

- 연산자는 +, -만 존재합니다.
- 문자열의 시작과 끝에는 공백이 없습니다.
- 0으로 시작하는 숫자는 주어지지 않습니다.
- 잘못된 수식은 주어지지 않습니다.
- 5 ≤ `my_string`의 길이 ≤ 100
- `my_string`을 계산한 결과값은 1 이상 100,000 이하입니다.
    - `my_string`의 중간 계산 값은 -100,000 이상 100,000 이하입니다.
    - 계산에 사용하는 숫자는 1 이상 20,000 이하인 자연수입니다.
    - my_string에는 연산자가 적어도 하나 포함되어 있습니다.
- return type 은 정수형입니다.
- `my_string`의 숫자와 연산자는 공백 하나로 구분되어 있습니다.

---

# 입출력 예

| my_string | result |
| --- | --- |
| "3 + 4" | 7 |

---

# 입출력 예 설명

## 입출력 예 #1

- 3 + 4 = 7을 return 합니다.

*/

#include <iostream>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

int solution(string my_string)
{
    istringstream stream(my_string);
    vector<string> tokens;
    string token;

    // 공백 기준으로 문자열 분리하기
    while (stream >> token)
    {
        tokens.push_back(token);
    }

    // 첫 번째 숫자를 초기 값으로 설정함
    int answer = stoi(tokens[0]);

    // 두 번째 요소부터 차례대로 연산자를 확인하고 숫자 연산하기
    for (int i = 1; i < tokens.size(); i += 2)
    {
        string op = tokens[i];
        int number = stoi(tokens[i + 1]);

        if (op == "+")
        {
            answer += number;
        }
        else if (op == "-")
        {
            answer -= number;
        }
    }

    return answer;
}

int main()
{
    string my_string = "3 + 4";
    cout << solution(my_string) << endl;
}
