/*
# 옹알이 (2)

<https://school.programmers.co.kr/learn/courses/30/lessons/133499>

---

# 문제 설명

머쓱이는 태어난 지 11개월 된 조카를 돌보고 있습니다. 조카는 아직 "aya", "ye", "woo", "ma" 네 가지 발음과 네 가지 발음을 조합해서 만들 수 있는 발음밖에 하지 못하고 연속해서 같은 발음을 하는 것을 어려워합니다. 문자열 배열 `babbling`이 매개변수로 주어질 때, 머쓱이의 조카가 발음할 수 있는 단어의 개수를 return하도록 solution 함수를 완성해주세요.

---

# 제한사항

- 1 ≤ `babbling`의 길이 ≤ 100
- 1 ≤ `babbling[i]`의 길이 ≤ 30
- 문자열은 알파벳 소문자로만 이루어져 있습니다.

---

# 입출력 예

| babbling | result |
| --- | --- |
| ["aya", "yee", "u", "maa"] | 1 |
| ["ayaye", "uuu", "yeye", "yemawoo", "ayaayaa"] | 2 |

---

# 입출력 예 설명

## 입출력 예 #1

- ["aya", "yee", "u", "maa"]에서 발음할 수 있는 것은 "aya"뿐입니다. 따라서 1을 return합니다.

## 입출력 예 #2

- ["ayaye", "uuu", "yeye", "yemawoo", "ayaayaa"]에서 발음할 수 있는 것은 "aya" + "ye" = "ayaye", "ye" + "ma" + "woo" = "yemawoo"로 2개입니다. "yeye"는 같은 발음이 연속되므로 발음할 수 없습니다. 따라서 2를 return합니다.

---

# 유의사항

- 네 가지를 붙여 만들 수 있는 발음 이외에는 어떤 발음도 할 수 없는 것으로 규정합니다. 예를 들어 "woowo"는 "woo"는 발음할 수 있지만 "wo"를 발음할 수 없기 때문에 할 수 없는 발음입니다.

*/

#include <string>
#include <vector>
#include <iostream>

using namespace std;

bool is_valid(string word)
{
    vector<string> valid_sounds = {"aya", "ye", "woo", "ma"};
    string last_sound = "";

    // 단어 내의 문자열을 삭제하면서 검사할 것이므로, 단어가 완전히 빌 때까지 검사함
    while (!word.empty())
    {
        bool found = false;
        for (string sound : valid_sounds)
        {
            if (word.substr(0, sound.length()) == sound)
            {
                // 마지막 발음과 발음이 같으면 발음할 수 없음
                if (last_sound == sound)
                {
                    return false;
                }

                // 가능한 발음을 찾았다면, 단어에서 해당 발음을 제거하고, 그 단어에 대해 다시 발음 검사를 시작(break)함
                last_sound = sound;
                word = word.substr(sound.length());
                found = true;
                break;
            }
        }

        // 검사 과정 중, 한 번이라도 가능한 발음을 찾지 못했다면, 그 단어는 발음할 수 없는 단어임
        if (!found)
        {
            return false;
        }
    }
    return true;
}

int solution(vector<string> babbling)
{
    int answer = 0;
    for (string word : babbling)
    {
        if (is_valid(word))
        {
            answer++;
        }
    }
    return answer;
}

int main()
{
    vector<string> babbling1 = {"aya", "yee", "u", "maa"};
    cout << solution(babbling1) << endl;

    vector<string> babbling2 = {"ayaye", "uuu", "yeye", "yemawoo", "ayaayaa"};
    cout << solution(babbling2) << endl;
}
