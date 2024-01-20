---
layout: skill
---

# Constructor Injection

- spring framework에서 의존성을 주입하는 방법 중 하나
    - constructor based inject은 spring team에서 가장 권장하는 방식

## Advantage

1. 순환 참조 방지
    - 객체의 의존성을 추가하다 보면 순환 참조 문제가 발생할 수 있음
        - 순환참조 : A -> B를 참조하면서, B -> A를 참조하는 경우 발생하는 문제
    - field injection일 때, 순환 참조를 하면 server 구동이 가능함
    - 그러다 운영 중에 siminCoding() method가 실행되면 순환 참조로 인해 server가 죽음
        - 즉, method 실행 시점 전까지 순환 참조가 있더라도 알 수가 없음 -> 큰 문제가 됨
    - field injection 순환 참조 example
        ```java
        @Component
        public class Simin {

            @Autowired
            private Coding coding;

            public void simin() {
                coding.coding();
            }
        }
        ```
        ```java
        @Component
        public class Coding {
            @Autowired
            private Simin simin;

            public void coding() {
                simin.simin();
            }
        }
        ```
        ```java
        @Component
        public class SiminCoding {

            @Autowired
            private Simin simin;

            @Autowired
            private Coding coding;

            public void siminCoidng() {
                simin.simin();
                coding.coding();
            }
        }
        ```
    - field injection에서의 이 문제를 해결하기 위해서는 constructor based inject을 사용해야함
        - constructor based injection을 했을 때에는 server 구동 시 바로 error가 발생함
        - server 자체가 구동되지 않으므로 바로 순환 참조를 알고 방지할 수 있음
    - constructor based injection 순환 참조 example
        ```java
        @Component
        @RequiredArgsConstructor
        public class Simin {

            private final Coding coding;

            public void simin() {
                coding.coding();
            }
        }

        @Component
        @RequiredArgsConstructor
        public class Coding {

            private final Simin simin;

            public void coding() {
                simin.simin();
            }
        }

        @Component
        @RequiredArgsConstructor
        public class SiminCoding {

            private final Simin simin;
            private final Coding coding;

            public void siminCoidng() {
                simin.simin();
                coding.coding();
            }
        }
        ```
    - field injection과 constructor based injection이 차이나는 이유
        - field injection, setter based injection은 먼저 bean을 생성한 후, 주입하려는 bean을 찾아 주입
        - constructor based injection은 먼저 bean을 생성하지 않고, 주입하려는 bean을 먼저 찾음
            1. 생성자의 인자에 사용되는 bean을 찾거나 bean factory에서 만듬
            2. 찾은 인자 bean으로 주입하려는 bean의 생성자를 호출
            - 따라서, 생성자 주입 방식을 사용하면 순환 참조가 실행하면서 문제가 됨
            - 서로 참조하는 객체가 생성되지 않은 상태에서 그 bean을 참조하기 때문에 error 발생
                - 객체 생성 시점에 bean을 주입하기 때문
2. final 선언이 가능
    - field injectipn, setter based injection은 field를 final로 선언할 수 없음
        - 나중에 변경될 수 있음
    - constructor based injection은 field를 final로 선언 가능
        - runtime에 객체 불변성을 보장
3. test code 작성 용이
    - spring container 도움없이 test code를 더 편리하게 작성할 수 있음
    - test하고자 하는 class에 field injection이나 setter based injection으로 bean이 주입되어 있으면 Mockito를 이용해 mocking한 후 test를 진행해야 함
    - constructor based based injection의 경우는 단순히 원하는 겍체를 생성한 수, 생성자에 넣어주면 됨

---

# Dependency Injection

- 의존 관계 주입
- 객체지향 programming에서는 어디에서나 통용되는 개념
- 강한 결합
    - 객체 내부에서는 다른 객체를 생성하는 것은 강한 결합도를 가지는 구조임
    - ex) A class 내부에서 B라는 객체를 직접 생성하고 있다면, B 객체를 C 객체로 바꾸고 싶은 경우에 A class도 수정해야 하는 방식이기 때문에 강한 결합임
- 느슨한 결합
    - 객체를 주입 받는다는 것은 외부에서 생성된 객체를 interface를 통해서 넘겨받는 것임
    - 이렇게 하면 결합도를 낮출 수 있고 runtime시 의존 관계가 결정되기 때문에 유연한 구조를 가질 수 있음
    - SOLID 원칙에서 O에 해당하는 Open Closed Principle을 지키기 위해서 design pattern 중 전략 pattern을 사용하게 되는데, 생성자 주입을 사용하게 되면 전략 pattren을 사용하게 됨

## Spring에서 사용할 수 있는 DI 방법 3가지

1. 생성자 주입 (Constructor Based Injection)
    ```java
    @Component
    public class SiminCoding {
        private final Simin simin;

        public SiminCoding(Simin simin) {
            this.simin = simin;
        }
    }
    ```
    - 단일 생성자의 경우 @Autowired annotation을 붙이지 않아도 됨
        - 생성자가 2개 이상인 경우네는 @Autowired annotation을 붙여줘야 함
    - Lombok을 사용하면 더 간단하게 사용 가능
        ```java
        @Component
        @RequiredArgsConstructor
        public class SiminCoding {
            private final Simin simin;
        }
        ```
        - @RequiredArgsConstructor annotation은 final이나 @NotNull을 사용한 field에 대한 생성자를 자동으로 생성해 줌
    - 같은 type의 bean이 있을 경우
        - @Qualifier을 통해 구현체의 class명 or 지정한 bean의 이름으로 가져올 수 있음
            ```java
            @Component
            @RequiredArgsConstructor
            public class SiminCoding {

                @Qualifier("simin")
                private final Simin simin;
                
            }
            ```
    - Spring에서만 사용되는 방식이 아님
2. 필드 주입 (Field Injecion)
    - field에 @Autowired annotation을 붙여주면 의존성이 주입
        ```java
        @Component
        public class SiminCoding {

            @Autowired
            private Simin simin;
            
        }
        ```
    - 같은 type의 bean이 있을 경우 @Qualifier나 @Resource를 통해 bean의 이름으로 가져와서 주입할 수 있음
    - 생성자 주입과 달리 field를 final로 정의할 수 없음
3. 수정자 주입 (Setter Injection)
    ```java
    @Component
    public class SiminCoding {
     
        private Simin simin;

        @Autowired
        public void setSimin(Simin simin) {
            this.simin = simin;
        }
    }
    ```
    - field를 final로 정의할 수 없음
    - Spring에서만 사용되는 방식은 아님


---

## Reference

- https://jackjeong.tistory.com/41
- https://yaboong.github.io/spring/2019/08/29/why-field-injection-is-bad/
