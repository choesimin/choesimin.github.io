/*
# 문자열 밀기

<https://school.programmers.co.kr/learn/courses/30/lessons/120921>

---

# 문제 설명

문자열 "hello"에서 각 문자를 오른쪽으로 한 칸씩 밀고 마지막 문자는 맨 앞으로 이동시키면 "ohell"이 됩니다. 이것을 문자열을 민다고 정의한다면 문자열 `A`와 `B`가 매개변수로 주어질 때, `A`를 밀어서 `B`가 될 수 있다면 밀어야 하는 최소 횟수를 return하고 밀어서 `B`가 될 수 없으면 -1을 return 하도록 solution 함수를 완성해보세요.

---

# 제한사항

- 0 < `A`의 길이 = `B`의 길이 < 100
- `A`, `B`는 알파벳 소문자로 이루어져 있습니다.

---

# 입출력 예

| A | B | result |
| --- | --- | --- |
| "hello" | "ohell" | 1 |
| "apple" | "elppa" | -1 |
| "atat" | "tata" | 1 |
| "abc" | "abc" | 0 |

---

# 입출력 예 설명

## 입출력 예 #1

- "hello"를 오른쪽으로 한 칸 밀면 "ohell"가 됩니다.

## 입출력 예 #2

- "apple"은 몇 번을 밀어도 "elppa"가 될 수 없습니다.

## 입출력 예 #3

- "atat"는 오른쪽으로 한 칸, 세 칸을 밀면 "tata"가 되므로 최소 횟수인 1을 반환합니다.

## 입출력 예 #4

- "abc"는 밀지 않아도 "abc"이므로 0을 반환합니다.

*/

#include <string>
#include <iostream>

using namespace std;

int solution(string A, string B)
{
    // A와 B의 길이가 다르면 -1 반환
    if (A.length() != B.length())
        return -1;

    int len = A.length();
    string temp = A;

    for (int i = 0; i < len; ++i)
    {
        // 원래 단어가 완성되었다면, 옮긴 횟수를 반환함
        if (temp == B)
        {
            return i;
        }

        // 오른쪽으로 한 칸 밀기
        char lastChar = temp[len - 1];
        for (int j = len - 1; j > 0; --j)
        {
            temp[j] = temp[j - 1];
        }
        temp[0] = lastChar;
    }

    return -1;
}

int main()
{
    string A1 = "hello";
    string B1 = "ohell";
    cout << solution(A1, B1) << endl;

    string A2 = "apple";
    string B2 = "elppa";
    cout << solution(A2, B2) << endl;

    string A3 = "atat";
    string B3 = "tata";
    cout << solution(A3, B3) << endl;

    string A4 = "abc";
    string B4 = "abc";
    cout << solution(A4, B4) << endl;
}
