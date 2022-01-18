# Stateful

- server side에 client와 server의 동작, 상태 정보를 저장하는 형태
    - session 상태에 기반하여 server의 응답이 달라짐
    - ex) TCP
- web server가 사용자(browser)의 상태 client(cookie) or server(session) 정보를 기억하고 있다가 유용한 정보로써 활용한다는 의미
- client에서 다른 client로, 또는 server에서 특정 client로 message를 전송할 수 있음
- server에서 client session을 유지할 필요가 없을 때, server resource를 절약할 수 있음
- server의 client 처리 능력보다 많은 수의 client가 몰리면, 이미 연결된 client 중 일부가 빠져야 다름 client가 처리됨
- 기능상 Stateless에 비래 강력하고 편리함
- Stateless의 모든 기능은 Stateful 방식으로 구현 가능
    - 반대로 Stateful의 모든 기능을 Stateless 방식으로 구현할 수는 없음

## Stateful 통신 구조의 한계

1. Session의 한계 : server의 무리가 감
2. Scale out의 문제 : server 확장이 어려움
3. platform 다양화 : web, mobile 요청 처리 어려움
4. CSRF의 문제 : session 보안 문제
5. CORS의 문제 : domain resource 문제
6. REST API : Stateless 지향

# Stateless

- server side에 client와 server의 동작, 상태 정보를 저장하지 않는 형태
    - server의 응답이 client 와의 session 상태와 독립적임
    - ex) UDP, HTTP
- 사용자(browser)의 이전 상태 client(cookie) or server(session) 정보를 기록하지 않는 접속이라는 의미
- browser가 data를 전송할 때마다 연결하고 바로 끊어버리는 방식
- stateless service는 가용성을 제공하기 위해서 여분의 instance를 추가하고 load balance를 사용함
- server의 client 처리 능력보다 많은 수의 client가 몰려도, 할당된 처리량이 끝나면 다음 처리가 가능함
- 매 요성 시마다 상태 정보를 전달해야 하기 때문에 그만큼 resource를 소비해야함
    - server 쪽에서는 message 처리를 위한 사전 작업이 필요함

---

# Reference

- https://junshock5.tistory.com/83
- https://velog.io/@makeitcloud/%EB%9E%80-Stateless-Stateful-%EC%9D%B4%EB%9E%80
