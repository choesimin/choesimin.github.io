# CORS : Cross-Origin Resource Sharing : 교차 출처 resource 공유

- 교차 출쳐 == 다른 출처
- 이 곳 저 곳에서 가져오는 resource가 안전하다는 최소한의 보장을 위한 정책
- 출처를 비교하는 logic은 server에 구현된 spec이 아니라 browser에 구현되어 있는 spec
    - 과정
        1. CORS 정책을 위반하는 resource 요청
        2. server는 정상적으로 응답함
            - 전제) 해당 server가 같은 출처에서 보낸 요청만 받겠다는 logic을 가지고 있는 경우가 아닌 경우
        3. browser가 응답을 분석해서 CORS 정책 위반이라고 판단되면 그 응답을 사용하지 않고 그냥 버림
    - server는 CORS를 위반하더라도 정상적으로 응답을 해주고, 응답의 파기 여부는 browser가 결정함
        - CORS는 브라우저의 구현 spec에 포함되는 정책이기 때문에, browser를 통하지 않고 서버 간 통신을 할 때는 이 정책이 적용되지 않음
        - CORS 정책을 위반하는 resource 요청 때문에 error가 발생했다고 해도 server 쪽 log에는 정상적으로 응답을 했다는 log만 남음

## Request 종류

### Preflight Request

- 

### Simple Request

- 

### Credentialed Request


## 같은 출처와 다른 출처의 구분

|URL|is same origin|reason|
|-|-|-|
|https://choesimin.github.io/about|o|scheme, post, port가 동일함|
|https://choesimin.github.io/about?q=hi|o|scheme, post, port가 동일함|
|https://user:password@choesimin.github.io|o|scheme, post, port가 동일함|
|http://choesimin.github.io|X|scheme이 다름|
|https://api.github.io|x|host가 다름|
|https://choesimin.naver.com|x|host가 다름|
|https://choesimin.github.com|x|host가 다름|
|https://choesimin.github.io:8000|x|browser의 구현에 따라 다름(대부분 상황에서 다름)|

- 두 URL의 구성 요소 중 Scheme, Host, Port 3가지가 동일하면 같은 출처

---

# Reference
- https://evan-moon.github.io/2020/05/21/about-cors/
- https://shinsunyoung.tistory.com/86
- https://sowells.tistory.com/170
	- session 받을 수 있도록 하기
- https://developer.mozilla.org/ko/docs/Web/HTTP/CORS
