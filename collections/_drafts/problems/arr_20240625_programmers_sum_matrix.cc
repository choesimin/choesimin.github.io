/*
# 행렬의 덧셈

<https://school.programmers.co.kr/learn/courses/30/lessons/12950>

---

# 문제 설명

행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다. 2개의 행렬 arr1과 arr2를 입력받아, 행렬 덧셈의 결과를 반환하는 함수, solution을 완성해주세요.

---

# 제한 조건

- 행렬 arr1, arr2의 행과 열의 길이는 500을 넘지 않습니다.

---

# 입출력 예

| arr1 | arr2 | return |
| --- | --- | --- |
| [[1,2],[2,3]] | [[3,4],[5,6]] | [[4,6],[7,9]] |
| [[1],[2]] | [[3],[4]] | [[4],[6]] |

*/

#include <string>
#include <vector>
#include <iostream>

using namespace std;

vector<vector<int>> solution(vector<vector<int>> arr1, vector<vector<int>> arr2)
{
    int rows = arr1.size();
    int cols = arr1[0].size();
    vector<vector<int>> answer(rows, vector<int>(cols, 0));

    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            answer[i][j] = arr1[i][j] + arr2[i][j];
        }
    }

    return answer;
}

int print(vector<vector<int>> result)
{
    for (vector<int> row : result)
    {
        for (int num : row)
        {
            cout << num << " ";
        }
        cout << endl;
    }
    cout << endl;

    return 0;
}

int main()
{
    print(solution({{1, 2}, {2, 3}}, {{3, 4}, {5, 6}}));
    print(solution({{1}, {2}}, {{3}, {4}}));
}
