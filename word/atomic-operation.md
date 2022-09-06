# Atomic Operation

- 중단되지 않는 연산
    - atomicity(원자성) == 깨지지 않는 성격
- 원자성의 예
    - database transaction
        - ACID 특성 중의 하나
        - 하나의 원자 transaction : 모두 성공하거나 실패하는 database 운용의 집합
            - 부분적인 갱신으로 더 큰 문제가 야기되는 것을 방지
    - 항공 ticket 주문
        - 반드시 지불과 예약이 동시에 되거나 아니면 모두 되지 않아야 함
        - 지불은 성공했으나 좌석 예약이 되니 않은 경우는 허용되지 않음
        - 호텔, 운송, 환전 등에도 적용
- Java 같은 고급 언어로 작성된 명령은 일반적이지 않고, 다수의 지침을 기반으로 제공되고 있음
    - 이는 Non-Atomic Operation의 근본적인 원인이 됨
    - 비원자 연산의 문제를 해결하기 위해 Java에서는 AtomicInteger, volatile, synchronization 등을 제공

## 원자성이 깨진 code 예제

```java
public class Test extends Thread {
    static int count = 1;    // Atomic Operation

    public void run() {
        count++;    // Non Atomic Operation
        System.out.println(cnt);
    }

    public static void main(String[] args) {
        Test test1 = new Test();
        Test test2 = new Test();
        Test test3 = new Test();

        test1.start();
        test2.start();
        test3.start();
    }
}
```
- 1, 2, 3이 한번씩 출력되어야 하지만, 같은 숫자가 두 번씩 호출됨
    - thread로 분리되어 작업이 한번에 처리되지 않기 때문에 비원자 연산이 됨

---

# Reference

- https://mygumi.tistory.com/111
