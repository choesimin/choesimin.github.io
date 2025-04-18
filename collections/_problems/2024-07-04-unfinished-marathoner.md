---
layout: problem
permalink: /267
title: 완주하지 못한 선수
category: programmers
tags: map
source: https://school.programmers.co.kr/learn/courses/30/lessons/42576
---

## 문제 설명

수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

## 제한사항

- 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
- completion의 길이는 participant의 길이보다 1 작습니다.
- 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
- 참가자 중에는 동명이인이 있을 수 있습니다.

## 입출력 예

| participant | completion | return |
| --- | --- | --- |
| ["leo", "kiki", "eden"] | ["eden", "kiki"] | "leo" |
| ["marina", "josipa", "nikola", "vinko", "filipa"] | ["josipa", "filipa", "marina", "nikola"] | "vinko" |
| ["mislav", "stanko", "mislav", "ana"] | ["stanko", "ana", "mislav"] | "mislav" |

## 입출력 예 설명

### 예제 #1

"leo"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

### 예제 #2

"vinko"는 참여자 명단에는 있지만, 완주자 명단에는 없기 때문에 완주하지 못했습니다.

### 예제 #3

"mislav"는 참여자 명단에는 두 명이 있지만, 완주자 명단에는 한 명밖에 없기 때문에 한명은 완주하지 못했습니다.

---

## Solution

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

string solution(vector<string> participant, vector<string> completion) {
    unordered_map<string, int> participant_map;

    // 참가자 목록의 각 이름에 대해 출현 빈도를 기록
    for (string name : participant) {
        participant_map[name]++;
    }

    // 완주자 목록의 각 이름에 대해 출현 빈도를 감소시킴
    for (string name : completion) {
        participant_map[name]--;
    }

    // 완주하지 못한 참가자(출현 빈도가 1인 참가자) 찾기
    for (pair<string, int> entry : participant_map) {
        if (entry.second > 0) {
            return entry.first;
        }
    }

    return "";
}

int main() {
    vector<string> participant1 = {"leo", "kiki", "eden"};
    vector<string> completion1 = {"eden", "kiki"};
    cout << solution(participant1, completion1) << endl;

    vector<string> participant2 = {"marina", "josipa", "nikola", "vinko", "filipa"};
    vector<string> completion2 = {"josipa", "filipa", "marina", "nikola"};
    cout << solution(participant2, completion2) << endl;

    vector<string> participant3 = {"mislav", "stanko", "mislav", "ana"};
    vector<string> completion3 = {"stanko", "ana", "mislav"};
    cout << solution(participant3, completion3) << endl;
}
```
