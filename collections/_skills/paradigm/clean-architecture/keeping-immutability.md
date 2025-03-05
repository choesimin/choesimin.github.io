---
layout: skill
permalink: /13
title: Clean Architecture - 불변성 유지하기
description: 불변성을 유지하면 동시성 문제를 해결할 수 있습니다.
date: 2023-11-16
---


## 불변성을 유지하여 동시성 문제를 해결하기

- **race condition(경합 조건), deadlock(교착 상태), concurrent update(동시 갱신) 문제는 모두 가변 변수로 인해 발생**합니다.
    - 만약 어떠한 변수도 갱신되지 않는다면 application에서 마주치는 모든 동시성 문제는 발생하지 않습니다.

- 따라서 불변성을 유지하는 것이 architecture에 더 이롭습니다.


---


## 가변성의 분리

- 저장 공간이 무한하고 processor의 속도가 무한이 빠르면 불변성이 실현 가능하겠지만, 그렇지 않기 때문에 타협을 해야합니다.

### 가변 Component와 불변 Component의 분리

- 불변 component에서는 순수하게 함수형 방식으로만 작업을 처리하도록 합니다.
    - 불변 component에서 가변 변수는 사용하지 않습니다.

- 분리를 위해서 최대한 많은 처리를 불변 component로 옮기고, 가변 component에서는 code를 최대한 빼냅니다


---


## 완전한 불변성 : Event Sourcing

- Event Sourcing은 **상태가 아닌 tracsaction을 저장하자는 전략**입니다.
    - application이 'CRUD'가 아니라 'CR'만 수행하기에, **완전한 불변성**을 가지게 됩니다.
    - VSC(Version Control System)이 Event Sourcing 방식으로 동작합니다.

- 저장 공간이 커지고 처리 능력이 좋아질수록, transaction을 저장하면 되기 때문에 필요한 가변 상태는 더 적어집니다.
    - 가변 변수의 수를 줄이는 것에서 더 나아가 오로지 transaction만을 저장하자는 것이 Event Sourcing입니다.

- transaction을 저장하면 가변 변수가 필요 없지만, 상태를 저장하는 것보다 더 많은 저장 공간을 필요로 합니다.
    - 시간이 지날수록 transaction 수는 끝없이 증가하므로, 필요한 computing 자원(저장 공간, 처리 능력)이 무한히 커집니다.

- computing 자원은 한정적이기 때문에, Event Sourcing 방식은 가용 자원을 고려해야 합니다.
    - Event Sourcing에는 application의 생명 주기 동안 문제 없이 동작할 정도의 저장 공간과 처리 능력만 사용하도록 합니다.
    - 매일 자정에 상태를 계산한 후 저장하고, 그 이후 transaction만을 갖고 있게 하는 것도 방법 중 하나입니다.


---


## 불변성 유지 Programming

- 불변성을 유지하기 위해서는 함수형 언어를 사용해야 합니다.

### 함수형 언어 : 불변성을 유지하는 경우

- Clojure program엔 가변 변수가 없습니다.
    - 함수형 programming은 lambda 계산법을 사용합니다.
    - 함수형 언어에서 변수는 변경되지 않습니다.
- 변수 `x`가 한 번 초기화되면 절대로 변하지 않습니다.

```clojure
(pringln (take 25 (map (fm [x] (* x x)) (range))))
```

### 객체 지향 언어 : 불변성을 유지하지 못하는 경우

- Java program은 가변 변수(mutable variable)를 사용합니다.
- 가변 변수는 program 실행 중에 상태가 변할 수 있습니다.

```java
public class Squint {
    public static void main(String args[]) {
        for (int i=0; i<25; i++) {
            System.out.println(i*i);
        }
    }
}
```


---


## Reference

- Clean Architecture (도서) - Robert C. Martin
