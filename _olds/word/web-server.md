---
layout: note
---

# Web Server

- Hardware적 의미
    - web server의 software와 website의 component file들을 저장하는 computer
        - component file : HTML 문서, images, CSS stylesheetes, javascript files
    - internet에 연결되어 web에 연결된 다른 기기들이 web server의 data(component file들)를 주고받을 수 있도록 함
- Software적 의미 (이 문서에선 이것을 다룸)
    - web browser와 같은 client로부터 HTTP 요청을 받아들이고, HTTP 문서와 같은 web page를 반환하는 computer program
    - 기본적으로 web 사용자가 어떻게 host file들에 접근하는지를 관리

### 공통 기능

- 대부분의 program은 몇 가지 기본 공통 기능을 가짐
    1. HTTP
    2. 통신 기록
- 기본 공통 기능에는 포함되지 않지만, 대다수 web server는 다음과 같은 기능을 제공함
    1. 인증
    2. 정적 contents 관리
    3. HTTPS 지원
    4. contents 압축
    5. 가상 hosting
    6. 대용량 file 지원
    7. 대역폭 throttling

---

# Static Contents & Dynamic Contents

- Static Contents
    - 정적 contents
    - 변수와 상수 중 상수
    - 있는 그대로 제공되는 것 (served as-is)
    - 어떤 기준에도 달라지지 않는 data
    - HTML, CSS, JavaScript, image, video 등
- Dynamic Contents
    - 동적 contents
    - 변수와 상수 중 변수
    - server가 contents를 처리하는 것
    - contents를 database로부터 생성하는 것
    - 기준에 따라 달라지는 data
    - 더 많은 유연성 제공
    - tech stack이 더 다루기 힘들어짐
    - web site를 구축하는 것이 더 복잡함
- static contents인지 dynamic contents인지에 따라 caching 전략을 다르게 해야함
    - caching은 site를 빠르게 하지만, dynamic contents에 caching을 하게 되면 여러가지 문제가 생김
        - ex) login을 했는데, 내 id가 아니라 다른 사람의 id가 보이는 문제
    - static web page
        - 단순히 해당 page(contents)를 저장
    - dynamic web page
        - 동적 요소를 따로 분리해서 logic으로 저장해주고, static contents만 caching해서 응답을 재구성

---

## References

- https://ko.wikipedia.org/wiki/%EC%9B%B9_%EC%84%9C%EB%B2%84
- https://developer.mozilla.org/ko/docs/Learn/Common_questions/What_is_a_web_server
- https://itgit.co.kr/static_dynamic_content/
- https://jins-dev.tistory.com/entry/%EB%8F%99%EC%A0%81-%EC%BB%A8%ED%85%90%EC%B8%A0Dynamic-Contents%EC%99%80-%EC%A0%95%EC%A0%81-%EC%BB%A8%ED%85%90%EC%B8%A0Static-Contents-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EC%BA%90%EC%8B%B1
