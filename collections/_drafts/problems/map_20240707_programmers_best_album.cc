/*
# 베스트앨범

<https://school.programmers.co.kr/learn/courses/30/lessons/42579>

---

# 문제 설명

스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다. 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

1. 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
2. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.

노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때, 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

---

# 제한사항

- genres[i]는 고유번호가 i인 노래의 장르입니다.
- plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
- genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
- 장르 종류는 100개 미만입니다.
- 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
- 모든 장르는 재생된 횟수가 다릅니다.

---

# 입출력 예

| genres | plays | return |
| --- | --- | --- |
| ["classic", "pop", "classic", "classic", "pop"] | [500, 600, 150, 800, 2500] | [4, 1, 3, 0] |

---

# 입출력 예 설명

classic 장르는 1,450회 재생되었으며, classic 노래는 다음과 같습니다.

- 고유 번호 3: 800회 재생
- 고유 번호 0: 500회 재생
- 고유 번호 2: 150회 재생

pop 장르는 3,100회 재생되었으며, pop 노래는 다음과 같습니다.

- 고유 번호 4: 2,500회 재생
- 고유 번호 1: 600회 재생

따라서 pop 장르의 [4, 1]번 노래를 먼저, classic 장르의 [3, 0]번 노래를 그다음에 수록합니다.

- 장르 별로 가장 많이 재생된 노래를 최대 두 개까지 모아 베스트 앨범을 출시하므로 2번 노래는 수록되지 않습니다.

*/

#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <iostream>

using namespace std;

vector<int> solution(vector<string> genres, vector<int> plays)
{
    unordered_map<string, int> genre_play_count;
    unordered_map<string, vector<pair<int, int>>> genre_songs;

    // 각 장르별 재생 횟수 계산 및 노래 정보 저장
    for (int i = 0; i < genres.size(); i++)
    {
        genre_play_count[genres[i]] += plays[i];
        genre_songs[genres[i]].push_back({plays[i], i});
    }

    // 장르별 재생 횟수로 정렬
    vector<pair<int, string>> sorted_genres;
    for (pair<string, int> genre : genre_play_count)
    {
        sorted_genres.push_back({genre.second, genre.first});
        cout << genre.second << genre.first << endl;
    }
    sort(sorted_genres.rbegin(), sorted_genres.rend());

    // 각 장르별로 노래들을 정렬하기
    vector<int> answer;
    for (pair<int, string> genre : sorted_genres)
    {
        string genre_name = genre.second;
        vector<pair<int, int>> songs = genre_songs[genre_name];

        sort(
            songs.begin(),
            songs.end(),
            [](pair<int, int> a, pair<int, int> b) -> bool
            {
                if (a.first == b.first)
                {
                    return a.second < b.second;
                }
                else
                {
                    return a.first > b.first;
                }
            });

        // 최대 두 곡까지 베스트 앨범에 추가하기
        for (int i = 0; i < min(2, (int)songs.size()); i++)
        {
            answer.push_back(songs[i].second);
        }
    }

    return answer;
}

int print(vector<int> result)
{
    for (int i : result)
    {
        cout << i << " ";
    }
    cout << endl;

    return 0;
}

int main()
{
    print(solution({"classic", "pop", "classic", "classic", "pop"}, {500, 600, 150, 800, 2500}));
}
