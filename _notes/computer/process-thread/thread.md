---
layout: note
---

# Thread

- process 내에서 실행되는 흐름
- 일반적으로 하나의 process는 하나의 thread로 시작됨
    - 이를 'main thread'라고 하며, thread를 추가로 생성하지 않는 한 모든 program은 메인 thread에서 실행됨

- Concurrent(여러 thread가 동시에 존재할 수 있는) Multi-threading
    - 순차적인 처리 방식의 단점 : 한 작업이 오래 걸리면 전체 program이 지연되는 병목 현상이 생길 수 있음
    - 선형적으로 연결되어 실행되지 않아도 되는 경우엔 한 process 내에서 서로 순서상 의존하지 않는 작업이 다른 작업의 종료를 기다릴 이유가 없음
    - 이때 thread(실행되는 흐름)를 여러 개 두면 병목 현상에 걸리지 않고 전체 작업시간을 줄일 수 있음

- 운영체제적으로 한 process 안의 thread들은 stack 공간을 제외한 process의 나머지 공간과 system resource를 공유함




---




## 장점

- process 간 통신에 비해  간단함
    - 서로 공유하는 변수를 변경하기만 하면 되기 때문
    - 반면 process 간 통신은 그 위험성으로 까다롭게 관리됨
- system의 자원 소모가 줄어듬
    - 기존 process의 자원을 다른 thread와 공유하기 때문에 자원을 새로 할당하지 않아도 됨
- 전체 응답 시간이 단축됨
    - 시간도 자원이기에 overhead가 줄어들어 전체 응답이 짧아짐
    - 병목이 걸리는 작업과 다른 작업을 구분할 수 있어 전체 실행시간을 줄일 수 있음
- 위와 장점들은 web server가 각각의 HTTP 통신을 multi process가 아닌 multi thread로 구현하는 이유가 됨
    - process로 각 통신을 구현하려면 고유한 자원을 할당해야 하고 서로 간 통신도 까다롭기 때문


## 단점

- 여러 thread를 이용하는 program을 작성하는 경우엔 설계를 신경써서 해야 함
    - 미묘한 시간 차나 잘못된 변수를 공유함으로써 문제가 발생할 수 있기 때문
- debugging이 어려움




---




# Reference

- https://shoark7.github.io/programming/knowledge/difference-between-process-and-thread
- https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html
