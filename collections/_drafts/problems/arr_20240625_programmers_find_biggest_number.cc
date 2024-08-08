/*
# 가장 큰 수 찾기

<https://school.programmers.co.kr/learn/courses/30/lessons/120899>

---

# 문제 설명

정수 배열 `array`가 매개변수로 주어질 때, 가장 큰 수와 그 수의 인덱스를 담은 배열을 return 하도록 solution 함수를 완성해보세요.

---

# 제한사항

- 1 ≤ array의 길이 ≤ 100
- 0 ≤ array 원소 ≤ 1,000
- array에 중복된 숫자는 없습니다.

---

# 입출력 예

| array | result |
| --- | --- |
| [1, 8, 3] | [8, 1] |
| [9, 10, 11, 8] | [11, 2] |

---

# 입출력 예 설명

## 입출력 예 #1

- 1, 8, 3 중 가장 큰 수는 8이고 인덱스 1에 있습니다.

## 입출력 예 #2

- 9, 10, 11, 8 중 가장 큰 수는 11이고 인덱스 2에 있습니다.

*/

#include <string>
#include <vector>
#include <iostream>

using namespace std;

vector<int> solution(vector<int> array)
{
    int max_value = array[0];
    int max_index = 0;

    for (int i = 1; i < array.size(); i++)
    {
        if (array[i] > max_value)
        {
            max_value = array[i];
            max_index = i;
        }
    }

    return {max_value, max_index};
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
    print(solution({1, 8, 3}));
    print(solution({9, 10, 11, 8}));
}
