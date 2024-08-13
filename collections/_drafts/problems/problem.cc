#include <string>
#include <vector>
#include <unordered_map>
#include <iostream>

using namespace std;

int solution(vector<int> array) {
    unordered_map<int, int> frequency;
    for (int num : array) {
        frequency[num]++;
    }

    int max_frequency = 0;
    int answer = -1;
    bool is_multiple_answer = false;

    for (pair<int, int> p : frequency) {
        int num = p.first;
        int freq = p.second;

        if (freq > max_frequency) {
            max_frequency = freq;
            answer = num;
            is_multiple_answer = false;
        } else if (freq == max_frequency) {
            is_multiple_answer = true;
        }
    }

    if (is_multiple_answer) {
        return -1;
    }

    return answer;
}

int main() {
    cout << solution({1, 2, 3, 3, 3, 4}) << endl;
    cout << solution({1, 1, 2, 2}) << endl;
    cout << solution({1}) << endl;
}