---
layout: note
---

# 재귀 함수 (再歸函數)

- 정의 단계에서 자신을 재참조하는 함수
- 일반 반복문이 성능이나 구현, 가독성 측면에서 나을 때가 많음
- 그러나 특정한 상황에서는 재귀 함수를 사용해서 효과를 볼 수 있음
    - (읽기에 힘들어지지 않게) logic을 더 간단히 할 수 있을 때
    - code의 의미(의도)가 재귀를 사용했을 때, 잘 드러나는 경우
    - ex) Quick Sort, XML/JSON Parsing
- 명령형 개념에서의 재귀 호출 == 흐름 제어 (자기 자신을 호출)
- 함수형 개념에서의 재귀 호출 == 점화식 (자기 함수와의 값의 관계를 맺는 것)
- 함수형 언어에선 재귀 함수를 작성하지 않고, 재귀하는 부분만이 구현된 고차함수를 사용할 수도 있음
    - ex) fold, reduce 등
- 호출하는 / 호출되는 재귀 함수 사이의 관계만 명확하게 정의하면 되고, 호출된 함수가 그 안에서 또 재귀 함수를 어떤 식으로 호출했는지 보지 않아도 program의 정당성을 볼 수 있음
    - 점화식을 올바르게 세웠다면 나머지는 재귀 함수가 알아서 잘 해줌
- 꼬리 재귀, compiler의 재귀 호출 최적화 등으로 성능 문제를 해결할 수 있음
- 유용한 상황
    - 하나의 함수 호출이 둘 이상의 재귀 호출을 할 가능성이 있을 때
    - 재귀 호출의 결과물에 추가적인 작업을 해야하는 경우

## 재귀의 특성

- 같은 일을 하는 함수끼리 상태만 달리해서 호출하는 것
- 재귀 호출된 함수가 무슨 일들을 했는지는 중요하지 않음
    - 어떤 결과를 돌려주는지만 중요
- 재귀를 사용하는 함수는 반드시 재귀 호출을 하지 않는 경우를 하나 이상 포함해야함
    - 그러지 않으면 재귀 호출이 무한히 발생

## 재귀의 특성을 살리지 못한 경우

```cpp
const int N = 100;

vector<int> adj[N];
bool visited[N];

void BFS(queue<int> q)
{
    if (q.empty())
        return;
    queue<int> q2;
    while (!q.empty())
    {
        int x = q.front();
        q.pop();
        for (int y : adj[x])
        {
            if (!visited[y])
            {
                visited[y] = true;
                q2.push(y);
            }
        }
    }
    BFS(q2);
}
```
- 반복문의 기능을 그대로 재귀로 옮긴 것에 불과함
    - 재귀 호출을 제외한 함수 전체를 while문으로 감싼 뒤 loop의 마지막 부분에서 q2를 q에 넣어주는 것으로 똑같은 기능을 구현할 수 있음
- 이렇게 일직선으로 재귀 호출이 이어지는 경우, 여러 성능상의 저하 발생
    - 재귀 자체가 무거운 연산
    - 꼬리 재귀가 이루어지지 않는 경우, 재귀 호출의 깊이만큼 memory 사용량도 계속해서 늘어나게 됨

## 완전 탐색

```cpp
/*
https://www.acmicpc.net/problem/15649

문제
    자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
        1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
입력
    첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 8)
출력
    한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.
    수열은 사전 순으로 증가하는 순서로 출력해야 한다.
*/
#include <bits/stdc++.h>
using namespace std;

vector<int> a;
bool v[9];
int n, m;

void f(int c)
{
    if (c == m)
    {
        for (int x : a)
            cout << x << ' ';
        cout << '\n';
        return;
    }

    for (int i = 1; i <= n; i++)
    {
        if (!v[i])
        {
            v[i] = true;
            a.push_back(i);
            f(c + 1);
            a.pop_back();
            v[i] = false;
        }
    }
}

int main()
{
    cin >> n >> m;
    f(0);
}
```
- 재귀 함수의 동작 원리는 기본적으로 DFS에 기반함
    - 함수의 인자들과 전역 변수의 조합으로 만들어지는 각각의 '상태'가 graph의 정점이 됨
    - 이 graph를 깊이 우선으로 탐색해 나가는 것이 곧 재귀 호출
- 이 문제에서 graph의 각 정점을 결정할 '상태' == '지금까지 선택한 수들의 목록'
    - V : 각 수에 대해 방문 표시한 배열
    - c : '지금까지 선택한 수의 개수'를 저장하는 변수
    - 이 변수들은 전체 목록에 종속적이기 때문에 추가 '상태'를 만들지 않음
- M개를 뽑는 모든 경우를 출력하기 위해 전체 graph에서 c가 M이 되게 하는 모든 상태에 방문해야 함
    - 이러한 상태들은 재귀 함수의 기저 상태이기도 함
    - 완전 탐색을 통해 이러한 기저 상태들에 모두 방문하도록 하는 것이 문제를 푸는 방법
- 변수
    - a : 선택한 수를 순차적으로 저장하는 배열
    - v : 각 수에 대한 방문 표기
    - c : 현재까지 선택한 수의 개수를 셈 (재귀 함수의 인자)
- 기저 상태로는 'c == m'을 check하여, 이 상태에 도달한 경우, 지금까지 선택한 수를 순차적으로 모두 출력
    - 현재 상태에서 다음 상태로 넘어갈 때, c가 항상 증가
    - c는 m이 되는 것이 기저 상태이기 때문에 cycle이 발생하지 않음
- 반복문을 돌면서 i는 1부터 n까지 차례대로 증하가면서, 아직 뽑지 않은 수가 있다면 그것을 뽑는 상태로 탐색해보는 것을 반복하면 됨
    - 사전순으로 앞서는 것부터 출력해야하기 때문에, 순차적으로 뽑울 때 항상 작은 수부터 뽑아야 함
- f(c, v)가 c와 v에 의해 만들어진 상태에 대한 답을 구해주는 함수라는 것을 정의했다면, 더 나아가 어떤 재귀 호출을 하게 되는지 등은 몰라도 됨
    - 현재 상태에서 다음 상태로 넘어가는 과정만 정확하게 구현해주면, 이후 상태는 재귀 호출된 함수가 알아서 잘 처리하기 때문

## Java 사용 예 : S3 upload 싪패해도 3번 더 시도하기 

```java
/* 선언부 */
public void uploadImage(ItemPurchaseEntity purchase, PurchaseRequest coupon, int tryCount) throws CommonException {
    try {
        String imageURL = "http://image-url";
        File file = downloadImageURL(imageURL, "filename", "jpg");
        amazonS3Client.putObject(new PutObjectRequest("bucket", file.getName(), file));
        file.delete();
    } catch(Exception e) {
        if (tryCount <= 3) {
            log.info("{}번째 이미지 저장 실패", tryCount);
            uploadImage(purchase, coupon, tryCount++);
        } else {
            throw new CommonException("이미지 저장 실패");
        }
    }
}

private File downloadImageURL(String imageURL, String fileName, String extension) {
    File file = new File(couponProperties.getDownloadImage() + "/" + fileName + "." + extension);
    try {
        URL url = new URL(imageURL);
        BufferedImage image = ImageIO.read(url);
        ImageIO.write(image, extension, file);
    } catch (IOException e) {
        e.printStackTrace();
    }

    return file;
}


/* 호출부 */
S3Uploader s3Uploader = new S3Uploader();
s3Uploader.uploadCouponImage(purchasedCoupon.getPurchase(), purchasedCoupon.getCoupon(), 1);
```

---

# Reference

- https://namu.wiki/w/%EC%9E%AC%EA%B7%80%ED%95%A8%EC%88%98
- https://www.secmem.org/blog/2021/07/09/recursion/
    - 예제와 자세한 설명
- https://wani.kr/posts/2020/02/11/make-parser-1/
    - 재귀를 이용한 JSON serializer (JSON.stringify) 구현
