---
layout: note
---

# DBCP

- DataBase Connection Pool
    - WAS가 실행되면서 미리 일정량의 DB Connection 객체를 생성하고 pool이라는 공간에 저장함
    - 저장된 DB Connection 객체는 필요할 때마다 pool에서 가져다 쓰고 반환
    - 요청이 들어올 때, DB Driver에 load하여 물리적인 Connection 객체를 생성하는 과정을 생략할 수 있음

- database와 application을 효율적으로 연결하는 connection pool library
- 보통 Database Connection Pool을 application source단에 설정해놓은 방식
    - 이 점이 JNDI와 다름


## maxActive

- connection의 최대 갯수
- 고려 사항
    - DBMS가 수용할 수 있는 Connection의 갯수 확인
    - application server instance 1개가 사용하기에 적절한 갯수 설정
- maxActive 값이 충분히 크지 않다면
    - server에서 많은 요청을 처리하지 못하고 병목현상이 발생
- maxActive 값이 너무 크다면
    - 불필요하게 memory를 많이 점유
- 운영 환경에서 직접 성능 test를 진행하며 최적화된 값을 찾아내는 것이 중요


## WAS Thread

- WAS Thread 수
- DB Connection Pool 개수보다 크게 설정하는 것이 좋음
    - application에 대한 모든 요청이 DB에 접근하는 것이 아니기 때문
- 추천 설정
    - WAS Thread = Connection Pool + 10




---




# JDBC와 DBCP의 차이점

- JDBC (Java DataBase Connectivity)
    - database와 연결하기 위한 java interface
- DBCP (DataBase Connection Pool)
    - database와 connection을 맺고 있는 객체를 관리하기 위한 connection pool




---




# Reference

- https://commons.apache.org/proper/commons-dbcp/
- https://d2.naver.com/helloworld/5102792
- https://leminity.tistory.com/20
- https://blue-mina.tistory.com/19
- https://ss-o.tistory.com/133
