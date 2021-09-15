# Generic

- data 형식에 의존하지 않고, 하나의 값이 여러 다른 data type들을 가질 수 있도록 하는 방법
  - type이 class 내부에서 지정하는 것이아닌 외부에서 사용자에 의해 지정되는 것
- 특정(Specific) type을 미리 지정해주는 것이 아닌 필요에 의해 지정할 수 있도록 하는 일반(Generic) type이라는 것
  - 정확히는 지정된다는 것보다는 type의 경계를 지정하고 compile 때 해당 type으로 casting하여 매개변수화 된 유형을 삭제하는 것
- class와 interface에만 적용되며 기본(primary) type은 사용할 수 없음
  - ex) int, double, char, ...
  - 그래서 Integer, Double 같은 Wrapper Type으로 바꿔서 씀
- 장점
  1. 잘못된 type이 들어올 수 있는 것을 compile 단계에서 방지
    - 입력으로 받아들이면 안되는 객체 type을 입력 단계에서 걸러버림
  2. class 외부에서 type을 지정해주기 때문에 따로 type을 check하고 변환해줄 필요 없음
    - 관리하기 편함
  3. 비슷한 기능을 지원하는 경우 code의 재사용성이 높아짐
- 단점
  1. code에서 Generic은 직관적으로 이해하기 어려움
    - 단순하게 Generic만 쓴다면 괜찮겠지만, 상속하고 구현하는 등 계층 구조가 복잡해지면 파악하기 어려워짐
  2. compile 시점에만 type check를 해줌
    - runtime 시점에는 형 안전성을 제공하지 못함
- Generic에는 정해진 선언 규칙이 없지만, 통상적인 선언이 편하기 때문에 암묵적으로 아래와 같이 표기함
  |Type|Desc|
  |-|-|
  |<T>|Type|
  |<E>|Element|
  |<K>|Key|
  |<V>|Value|
  |<N>|Number|

## Class 및 Interface 선언

- Generic type의 class, interface 선언
  - T type은 해당 block { ... } 안에서 까지만 유효함
  ```java
  public class ClassName <T> { ... }
  public Interface InterfaceName <T> { ... }
  ```

- Generic type이 두개일 때
  - type 인자로 두 개 밭는 대표적인 collection, HashMap이 있음
  ```java
  public class ClassName <T, K> { ... }
  public Interface InterfaceName <T, K> { ... }
  
  // HashMap의 경우 아래와 같이 선언되어 있음
  public class HashMap <K, V> { ... }
  ```





# Wildcard


---

# Reference

- https://st-lab.tistory.com/153
- https://velog.io/@eversong/Java-Generic-WildCard%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C
  - wildcard