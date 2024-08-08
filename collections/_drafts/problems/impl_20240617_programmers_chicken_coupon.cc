/*
# 치킨 쿠폰

<https://school.programmers.co.kr/learn/courses/30/lessons/120884>

---

# 문제 설명

프로그래머스 치킨은 치킨을 시켜먹으면 한 마리당 쿠폰을 한 장 발급합니다. 쿠폰을 열 장 모으면 치킨을 한 마리 서비스로 받을 수 있고, 서비스 치킨에도 쿠폰이 발급됩니다. 시켜먹은 치킨의 수 `chicken`이 매개변수로 주어질 때 받을 수 있는 최대 서비스 치킨의 수를 return하도록 solution 함수를 완성해주세요.

---

# 제한사항

- `chicken`은 정수입니다.
- 0 ≤ `chicken` ≤ 1,000,000

---

# 입출력 예

| chicken | result |
| --- | --- |
| 100 | 11 |
| 1,081 | 120 |

---

# 입출력 예 설명

## 입출력 예 #1

- 100마리를 주문하면 쿠폰이 100장 발급되므로 서비스 치킨 10마리를 주문할 수 있습니다.
- 10마리를 주문하면 쿠폰이 10장 발급되므로 서비스 치킨 1마리를 주문할 수 있습니다.
- 따라서 10 + 1 = 11 을 return합니다.

## 입출력 예 #2

- 1081마리를 주문하면 쿠폰이 1081장 발급되므로 서비스 치킨 108마리를 주문할 수 있습니다. 그리고 쿠폰이 1장 남습니다.
- 108마리를 주문하면 쿠폰이 108장 발급되므로 서비스 치킨 10마리를 주문할 수 있습니다. 그리고 쿠폰이 8장 남습니다.
- 10마리를 주문하면 쿠폰이 10장 발급되므로 서비스 치킨 1마리를 주문할 수 있습니다.
- 1마리를 주문하면 쿠폰이 1장 발급됩니다.
- 가지고 있는 쿠폰이 총 10장이므로 서비스 치킨 1마리를 추가로 주문할 수 있습니다.
- 따라서 108 + 10 + 1 + 1 = 120 을 return합니다.

*/

#include <iostream>

using namespace std;

int solution(int chicken)
{
    int total_service_chickens = 0;
    int coupons = chicken;

    while (coupons >= 10)
    {
        int new_service_chickens = coupons / 10;
        total_service_chickens += new_service_chickens;
        coupons = new_service_chickens + (coupons % 10);
    }

    return total_service_chickens;
}

int main()
{
    int test1 = 100;
    cout << solution(test1) << endl;

    int test2 = 1081;
    cout << solution(test2) << endl;
}
