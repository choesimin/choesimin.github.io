/*
# 가장 큰 수

<https://school.programmers.co.kr/learn/courses/30/lessons/42746>

---

# 문제 설명

0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.
예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.
0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

---

# 제한사항

- numbers의 길이는 1 이상 100,000 이하입니다.
- numbers의 원소는 0 이상 1,000 이하입니다.
- 정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.

---

# 입출력 예

| numbers | return |
| --- | --- |
| [6, 10, 2] | "6210" |
| [3, 30, 34, 5, 9] | "9534330" |

*/

#include <string>
#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;

bool compare(int i, int j)
{
    string i_str = to_string(i);
    string j_str = to_string(j);
    return i_str + j_str > j_str + i_str;
}

string solution(vector<int> numbers)
{
    sort(numbers.begin(), numbers.end(), compare);

    string answer = "";
    for (int number : numbers)
    {
        answer += to_string(number);
    }

    if (answer[0] == '0')
    {
        return "0";
    }

    return answer;
}

int main()
{
    vector<int> numbers1 = {6, 10, 2};
    cout << solution(numbers1) << endl;

    vector<int> numbers2 = {3, 30, 34, 5, 9};
    cout << solution(numbers2) << endl;

    vector<int> numbers3 = {0, 0};
    cout << solution(numbers3) << endl;

    vector<int> numbers4 = {10, 302, 204, 29, 1, 89, 6, 95, 3, 30, 34, 5, 9};
    cout << solution(numbers4) << endl;
}
