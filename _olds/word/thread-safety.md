---
layout: note
---

# Thread Safety

- multi thread programming에서 일반적으로 어떤 함수나 변수, 혹은 객체가 여러 thread로부터 동시에 접근이 이루어져도 program 실행에 문제가 없음을 뜻함
    - 하나의 함수가 한 thread로부터 호출되어 실행 중일 때, 다른 thread가 그 함수를 호출하여 동시에 함께 실행되더라도 각 thread에서의 함수의 수행 결과가 올바로 나오는 것으로 정의

## Thread safety를 구현할 수 있는 방법

- Re-entrancy
    - 어떤 함수가 한 thread에 의해 호출되어 실행 중일 때, 다른 thread가 그 함수를 호출하더라도 그 결과가 각각에게 올바로 주어져야 함
    - thread끼리 독립적일 수 있도록 code를 설계
- Thread-local storage
    - 공유 자원의 사용을 최대한 줄이고 각각의 thread에서만 접근 가능한 저장소들을 사용함으로써 동시 접근을 막음
    - multi thread 환경에서의 global 변수 등의 사용을 지양
- Mutual exclusion
    - 공유 자원을 꼭 사용해야 할 경우, 해당 자원의 접근을 Semaphore 등의 lock으로 통제
        - Semaphore : 특정 자원이나 특정 연산을 통시에 사용하거나 호출될 수 있는 thread의 수를 제한하고자 할 때 사용
            - 내부적으로 synchronization을 하기 때문에 밖에서 동기화를 맞춰줄 필요가 없음
- Atomic operations
    - 공유 자원에 접근할 때, 원자 연산을 이용하거나 '원자적'으로 정의된 접근 방법을 사용함으로써 상호 배제를 구현할 수 있음
    - '+=' 연산의 경우, 한 줄의 code이지만, '+'연산 후에 '='연산을 하기 때문에 원자적이라고 할 수 없음

---

## Reference

- https://ko.wikipedia.org/wiki/%EC%8A%A4%EB%A0%88%EB%93%9C_%EC%95%88%EC%A0%84