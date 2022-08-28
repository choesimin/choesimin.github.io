# Index

- 1부. 소개
    - 1장. 설계와 아키텍처란?
    - 2장. 두 가지 가치에 대한 이야기

- 2부. 벽돌부터 시작하기: 프로그래밍 페러다임
    - 3장. 패러디임 개요
    - 4장. 구조적 프로그래밍
    - 5장. 객체 지향 프로그래밍
    - 6장. 함수형 프로그래밍

- 설계 원칙
    - 7장. SRP: 단일 책임 원칙
    - 8장. OCP: 개방-폐쇄 원칙
    - 9장. LSP: 리스코프 치환 원칙
    - 10장. ISP: 인터페이스 분리 원칙
    - 11장. DIP: 의존성 역전 원칙

- 4부. 컴포넌트 원칙
    - 12장. 컴포넌트
    - 13장. 컴포넌트 응집도
    - 14장. 컴포넌트 결합

- 5부. 아키텍처
    - 15장. 아키텍처란?
    - 16장. 독립성
    - 17장. 경계: 선 긋기
    - 18장. 경계 해부학
    - 19장. 정책과 수준
    - 20장. 업무 규칙
    - 21장. 소리치는 아키텍처
    - 22장. 클린 아키텍처
    - 23장. 프레젠터와 험블 객체
    - 24장. 부분적 경계
    - 25장. 계층과 경계
    - 26장. 메인(Main) 컴포넌트
    - 27장. '크고 작은 모든' 서비스들
    - 28장. 테스트 경계
    - 29장. 클린 임베디드 아키텍처

- 6부. 세부사항
    - 30장. 데이터베이스는 세부사항이다
    - 31장. 웹은 세부사항이다
    - 32장. 프레임워크는 세부사항이다
    - 33장. 사례 연구: 비디오 판매
    - 34장. 빠져있는 장

---

# 1부. 소개

## 1장. 설계와 아키텍처란?

- Architecture : 고수준의 무언가를 가리킬 때 흔시 사용됨
- Design : 저수준의 구조 또는 결정사항 등을 의미할 때가 많음

- Architecture와 Design은 차이가 없음
    - software 설계에 있어서도 저수준의 세부사항과 고수준의 구조는 모두 전체 설계의 구성 요소임
    - 고수준에서 저수준으로 향하는 의사결정의 연속성만이 있을 뿐

- 목표
    ```
    software architecture의 목표는 필요한 system을 만들고 유지보수하는 데 투입되는 인력을 최소화하는 데 있다.
    ```
    - 설계 품질을 재는 척도는 고객의 요구를 만족시키는 데에 드는 비용을 재는 척도와 같음
        - 비용이 낮고 system의 수명이 다할 때까지 낮게 유지할 수 있는 것이 좋은 설계
        - 새로운 기능을 출시할 때마다 비용이 증가한다면 나쁜 설계

- 빨리 가는 유일한 방법은 제대로 가는 것
    - code와 설계의 구조를 깔끔하게 만들려는 생각을 하지 않으면, 점점 비용이 높아지고 따라서 개발자의 생산성은 0에 수렴하게 됨
        - 엉망이 된 상황에 대처하는 데에 노력이 들어가기 때문


## 2장. 두 가지 가치에 대한 이야기

- software 개발자는 '행위(behavior)'와 '구조(structure)'의 두 가치를 모두 높게 유지해야 함

- 첫 번째 가치 : 행위
    - programmer가 sofrware를 만드는 이유는 기계가 이해관계자를 위해 수익을 창출하거나 비용을 절약하도록 만들기 위함
    - 따라서 개발자는 요구사항에 따라 개발하고 요구사항을 위반했을 때 debugging함
        - 그러나 이것이 개발자가 해야할 일의 전부는 아님

- 두 번째 가치 : 구조
    - software는 '부드러운(soft)'와 '제품(ware)'의 합성어
    - software를 만드는 이유 : 기계의 행위를 쉽게 변경할 수 있도록 하기 위함
    - 따라서 software는 변경하기 쉬워야 함
    - 변경사항을 적용하는 데에 드는 어려움은 변경되는 범위(scope)에 비례해야하며, 변경사항의 형태(shape)와는 관련 없어야 함
    - 나쁜 architecture는 범위가 비슷한 일련의 변경사항에도, code의 복잡도는 지속적으로 증가한 상태이기 때문에 뒤로 갈수록 같은 범위의 변경에 대해 비용이 많이 들게 됨
    - architecture가 특정 형태를 다른 형태보다 선호하면 할수록, 새로운 기능을 그 구조에 맞추는 것이 힘들어짐
    - architecture는 독립적이어야 하고, 그럴수록 더 실용적임

- 기능 (software의 동작) vs Architecture (software system 변경의 용이성)
    - 업무 관리자는 기능을 우선할 수 있지만, 개발자는 구조에 더 신경을 써야 함
    - ex) 두 program의 비교
        - 완벽하게 동작하지만 수정이 불가능한 program (변경에 드는 비용 >>>> 창출되는 수익)
            1. 요구사항이 변경될 때 동작하지 않음
            2. 결국 program이 돌아가도록 만들 수 없음
            3. 쓸모 없어짐
        - 동작은 하지 않지만 변경이 쉬운 program
            1. program이 돌아가도록 만들 수 있음
            2. 변경사항이 발생하더라도 여전히 동작하도록 유지보수할 수 있음
            3. 앞으로도 유용한 채로 남음

- 아이젠하워 Matrix
    | | |
    | - | - |
    | 중요O 긴급O | 중요O 긴급X |
    | 중요X 긴급O | 중요X 긴급X |
    - 우선 순위
        1. 긴급하고 중요한
        2. 긴급하지는 않지만 중요한
        3. 긴급하지만 중요하지 않은
        4. 긴급하지도 중요하지도 않은
    - 업무 관리자와 개발자가 흔히 하는 실수는 세 번쩨에 위치한 항목을 첫 번째로 격상시키는 것
    - 기능의 긴급성이 아닌 architecture의 중요성을 설득하는 일은 software 개발팀이 책임져야 함

- 개발자는 software를 안전하게 보호해야 할 책임이 있으며, 이것이 개발자가 고용된 중요한 이유 중 하나이기도 함

---

# 2부. 벽돌부터 시작하기: 프로그래밍 페러다임

## 3장. 패러디임 개요

| | |
| - | - |
| 구조적(structured) programming | 제어 흐름의 직접적인 전환에 대한 규칙을 부과함 |
| 객체 지향(object-oriented) programming | 제어 흐름의 간접적인 전환에 대해 규칙을 부과함 |
| 함수형(functional) programming | 할당문에 대해 규칙을 부과함 |

- paradigm은 무엇을 해야할지를 말하지 보다는 무엇을 해서는 안 되는지를 말해줌
    - 각 paradigm은 programmer에서 권한을 박탈함 (새로운 권한을 부여하지 않음)
- software = 순차(sequence) + 분기(selection) + 반복(iteration) + 참조(indirection)

## 4장. 구조적 프로그래밍

- 에츠허르 비버 데이크스크라(Edsger Wybe Dijkstra)는 유클리드(Euclid) 계층구조로 code가 올바르다는 사실을 증명하려 했으나 실패함
    - 하지만 연구 과정에서 goto 문장이 module을 더 작은 단위로 재귀적으로 분해하는 과정에 방해가 되는 경우가 있다는 사실을 발견함
        - module을 분해할 수 없다면 합리적 증명의 필수 기법인 분할 정복 접근법을 사용할 수 없기 때문
    - 또한 좋은 goto 문장은 분기(if/then/else)와 반복(do/while)같은 단순한 제어 구조에 해당한다는 사실을 발견함
        - 뵘(Bohm)과 야코피니(Jacopini)는 데이크스트라보다 2년 앞서 모든 program을 순차(sequence), 분기(selection), 반복(interation)이라는 세 가지 구조만으로 표현할 수 있다는 사실을 증명함
    - module을 증명 가능하게 하는 제어 구조가 모든 program을 만들 수 있는 제어 구조의 최소 집합과 동일함

- 수학적인 증명은 실패했지만 과학적 방법이 그 역할을 대신 함
    - 과학적 방법은 반증은 가능하지만 증명은 불가능함
        - ex) 운동 법칙(F=ma), 만유인력의 법칙 등
    - 과학은 서술이 틀렸음을 증명하는 방식으로 동작함
        - 서술된 내용이 사실임을 증명하는 방식이 아님
        - program이 잘못되었음을 test를 통해 증명할 수는 있지만, program이 맞다고 증명할 수는 없음
            - software 개발은 수학적 시도보다 과학에 가까움

- 구조적 programming은 반증 가능한 단위를 만들어 낼 수 있도록 함
    - 현대적 언어가 goto를 지원하지 않는 이유
    - architecture 관정에서 기능적 분해를 최고의 실천법 중 하나로 여기는 이유

## 5장. 객체 지향 프로그래밍

- 좋은 architecture를 만드는 일은 객체 지향(Object-Oriented, OO) 설계 원칙을 이해하고 응용하는 데에서 출발함

- OO란?
    - 다형성을 이용하여 전체 system의 모든 source code 의존성에 대한 절대적인 제어 권한을 획득할 수 있는 능력
    - OO를 사용하면 Plugin Architect를 구성할 수 있음
        - 고수준의 정책을 포함하는 module은 저수준의 세부사항을 포함하는 module에 대해 독립성을 보장할 수 있음
        - 저수준의 세부사항은 중요도가 낮은ㅇ plugin module로 만들고, 고수준의 정책을 포함하는 module과는 독립적으로 개발하고 배포할 수 있음

- 다형성
    - 언제 어디서든 Plugin Architecture를 사용할 수 있게 해줌
    - 의존성 역전 (dependency inversion)
        - 원래(ex. C)는 source code의 의존성 방향은 반드시 제어흐름(flow of control)을 따르게 됨
            1. main 함수가 고수준 함수 호출
            2. 고수준 함수가 중간 수준 함수 호출
            3. 중간 수준 함수가 저수준 함수 호출
        - OO 언어는 다형성을 안전하고 편리하게 제공하므로 source code 의존성을 어디에서든 역전시킬 수 있음
            - source code 사이에 interface를 사용하여 제어흐름을 반대로 함
            - 즉, source code의 제어흐름과 의존성 방향에 대해 제한받지 않고 원하는 대로 설정할 수 있음

- OO에 대한 잘못된 설명
    ```
    Data와 함수의 조합
    ```
        - o.f()가 f(o)와 다르다는 의미를 내포하기 때문에 정확한 설명이 아님
    ```
    실제 세계를 modeling하는 새로운 방법
    ```
        - 의도가 불분명하며, 정의가 모호함
    ```
    OO는 캡슐화(encapsulation), 상속(inheritance), 다형성(polymorphism) 이 세가지 개념을 적절하게 조합한 것
    ```
        - 캡슐화 : C언어에서도 완벽한 캡슐화가 가능함 (data 구조와 함수를 header file에 선언하고 구현 file에서 구현)
            - 오히려 C++, C#, Java 등에서 완전한 캡슐화가 깨짐
                - C++ : compiler가 class의 instance 크기를 알아야 하기 때문에 class의 member 변수를 해당 class의 header file에 선언해야 함
                - C#, Java : 아예 header와 구현체를 분리하는 방식을 버렸음(class 선언과 정의를 구분하는 것이 불가능함)
        - 상속 : OO로 넘어와서 더 편리해지긴 했지만, C에서도 가능한 기법이었음
        - 다형성 : C에서 함수를 가리키는 pointer를 응용해 구현할 수 있었지만, OO는 이를 더 편리하고 안전하게 사용할 수 있게 해줌 (함수 pointer는 위험함)
            - OO에서 가장 중요한 부분 : 다형성을 통해 제어흐름을 간접적으로 전환하는 규칙을 부과함


## 6장. 함수형 프로그래밍

- lambda 계산법이 핵심 기반

- 정수를 제곱하는 program
    - Java (객체 지향 언어)
    ```java
    public class Squint {
        public static void main(String args[]) {
            for (int i=0; i<25; i++) {
                System.out.println(i*i);
            }
        }
    }
    ```
    - Clojure (함수형 언어)
    ```clojure
    (pringln (take 25 (map (fm [x] (* x x)) (range))))
    ```
    - Java program은 가변 변수(mutable variable)를 사용함
        - 가변 변수는 program 실행 중에 상태가 변할 수 있음
    - Clojure program엔 가변 변수가 전혀 없음
        - 변수 x가 한 번 초기화되면 절대로 변하지 않음
        - == 함수형 언어세어 변수는 변경되지 않음

- architect가 변수의 가변성을 염려하는 이유
    - 경합(race) 조건, 교착상태(deadlock) 조건, 동시 업데이트(concurrent update) 문제가 모두 가변 변수로 인해 발생하기 때문
        - 만약 어떠한 변수도 갱신되지 않는다면 동시성 application에서 마주치는 모든 문제는 발생하지 않음

- 가변성의 분리
    - 저장 공간이 무한하고 processor의 속도가 무한이 빠르면 불변성이 실형 가능하겠지만, 그렇지 않기 때문에 타협을 해야함
    - 가변 component와 불변 component의 분리
        - 불변 component에서는 순수하게 함수형 방식으로만 작업을 처리하도록 함
            - 어떤 가변 변수도 사용되지 않음
        - 가능한 한 많은 처리를 불변 component로 옮기고, 가변 component에서는 가능한 한 많은 code를 빼내야 함

- Event Sourcing : 상태가 아닌 tracsaction을 저장하자는 전략
    - 저장 공간이 커지고 처리 능력이 좋아질 수록 필요한 가변 상태는 더 적어짐
        - 여기서 더 나아간 것이 event sourcing
    - transaction을 저장하는 것은 상태를 저장하는 것보다 더 많은 저장 공간을 필요로 함
    - application이 CRUD가 아니라 CR만만 수행하면 '완전한 불변성'을 가지게 됨
        - source code version 관리 system이 이 방식으로 동작함

---

# 3부. 설계 원칙

## 7장. SRP : Single Responsibility Principle : 단일 책임 원칙

```
콘웨이(conway) 법칙에 따른 따름정리 : software system이 가질 수 있는 최적의 구조는 system을 만드는 조직의 사회적 구조에 커다란 영향을 받는다. 따라서 각 software module은 변경의 이유가 하나, 단 하나여야만 한다.
```
- 하나의 module은 하나의, 오직 하나의 actor에 대해서만 책임져야 함
- 이 원칙을 위반하는 징후들
    1. 우발적 중복
        - 서로 다른 actor가 의존하는 code를 가까이 배치되는 경우
    2. 병합
        - 서로 다른 team에 속했을 개발자가 작업했을 때 변경 사항이 충돌하는 경우
- data와 method를 구분하고 퍼사드(Facade) pattern으로 해결

## 8장. OCP : Open-Closed Pinciple : 개방-폐쇄 원칙

```
1980년대에 버트란트 마이어(Bertrand Meyer)에 의해 유명해진 원칙이다. 기존 code를 수정하기보다는 반드시 새로운 code를 추가하는 방식으로 system의 행위를 변경할 수 있도록 설계해야만 software system을 쉽게 변경할 수 있다는 것이 이 원칙의 요지이다.
```
- software 개체(artifact)는 확장에는 열려 있어야 하고, 변경에는 닫혀 있어야 함
    - software 개체의 행위는 확장할 수 있어야 하지만, 이때 개체를 변경해서는 안 됨
- system을 component 단위로 분리하고, 저수준 component에서 발생한 변경으로부터 고수준 component를 보호할 수 있는 형태의 의존성 계층구조가 만들어지도록 해야 함

## 9장. LSP : Liskov Subsitution Principle : 리스코프 치환 원칙

```
1988년 바바라 리스코프(Barbara Liskov)가 정의한, 하위 타입(subtype)에 관한 유명한 원칙이다. 요약하면, 상호 대체 가능한 구성요소는 반드시 서로 치환 가능해야 한다는 계약을 반드시 지켜야 한다.
```
```
S type의 객체 o1 각각에 대응하는 T type 객체 o2가 있고, T type을 이용해서 정의한 모든 program P에서 o2의 자리에 o1을 치환하더라도 P의 행위가 변하지 않는다면, S는T의 하위 type이다.
```
- LSP는 architecture 수준까지 확장할 수 있고, 반드시 확장해야만 함
    - 치환 가능성을 조금이라도 위배하면 system architecture가 오염되어 상당량의 별도 mechanism을 추가해야할 수 있기 때문

## 10장. ISP : Interface Segregation Principle : 인터페이스 분리 원칙

```
이 원칙에 따르면 software 설계자는 사용하지 않은 것에 의존하지 않아야 한다.
```

## 11장. DIP : Dependenvy Inversion Principle : 의존성 역전 원칙

```
고수준 정책을 구현하는 code는 저수준 세부사항을 구현하는 code에 절대로 의존해서는 안 된다. 대신 세부사항이 정책에 의존해야 한다.
```
- 유연성이 극대화된 system : 의존성이 추상(abstraction)에 의존하며 구체(concretion)에는 의존하지 않는 system
    - Java같은 정적 type 언어에서 이 말은 use, import, include 구문은 오직 interface나 추상 class 같은 추상적인 선언만을 참조해야 한다는 뜻
        - 구체적인 요소에 의존할 수는 있지만 변동성이 큰(volatile) 구체적인 요소에는 절대로 의존해서는 안 됨

- 안정된 추상화
    - interface는 구현체보다 변경 가능성이 적으며 architect는 interface의 변동성을 낮추기 위해서 노력해야 함
    - 안정된 software architecture란?
        - 변동성이 큰 구현체에 의존하는 일은 지양함
        - 안정된 추상 interface에 의존하는 것을 선호함
    - 방법
        1. 변동성이 큰 구체 class를 참조하지 않기
            - 대신 추상 팩토리(Abstract Factory)를 사용하기
        2. 변동성이 큰 구체 class로부터 파생하지 않기
            - 상속은 아주 신중하기 사용하기
                - 상속은 source code의 모든 관계 중 가장 강력하고 뻣뻣하기 때문에 변경하기 어려움
        3. 구체 함수를 override하지 않기
            - 대체로 구체 함수는 source code 의존성을 필요로 함
                - 구체 함수를 override하면 이러한 의존성을 제거할 수 없게 됨 (의존성을 상속받게 되는 셈)
            - 차라리 추상 함수로 선언하고 구현체들에서 각잔의 용도에 맞게 구현하는 것이 나음
        4. 구체적이며 변동성이 크다면 그 이름을 언급하지 않기
            - DIP 원칙을 다른 방식으로 풀어쓴 말

---

# 4부. 컴포넌트 원칙

- SOLID 원칙 : 벽과 방에 벽돌을 배치하는 방법
- Component 원칙 : Building에 방을 배치하는 방법

## 12장. 컴포넌트

- Component : system의 구성 요소로 배포할 수 있는 가장 작은 단위
    - ex) Java - jar file, Ruby - gem file, .NET - DLL

## 13장. 컴포넌트 응집도

- REP : Reuse/Release Equivalence Principle : 재사용/릴리스 등가 원칙
    ```
    재사용 단위는 release 단위와 같다.
    ```
    - 단일 component는 응집성 높은 class와 module들로 구성되어야 함
        - component를 구성하는 모든 module들은 서로 공유하는 중요한 theme, 목적이 있어야 함
    - CCP, CRP는 REP를 엄격하게, 하지만 제약을 가하는 측면에서 정의함

- CCP : Common Closure Principle : 공통 폐쇄 원칙
    ```
    동일한 이유로 동일한 시점에 변경되는 class를 같은 component로 묶어라. 서로 다른 시점에 다른 이유로 변경되는 class는 다른 component로 분리하라.
    ```
    - CCP는 단일 책임 원칙(SRP)을 component 관점에서 다시 쓴 것
        - 단일 component는 변경의 이유가 여러 개 있어서는 안 됨

- CRP : Common Reuse Principle : 공통 재사용 원칙
    ```
    component 사용자들을 필요하지 않는 것에 의존하게 강요하지 말라.
    ```
    - class, module을 어느 component에 위치시킬지 결정할 때 도움되는 원칙
    - 관련된 class는 반드시 동일한 component에 있어야 함
        - component 내부에서는 class들 사이에 수많은 의존성이 있음
            - class는 단독으로 쓰이는 경우보다 재사용 module의 일부로써 해당 module의 다른 class와 상호작용하는 경우가 많음
    - 한 component에 속한 class들은 더 작게 grouping할 수 없어야 함
    - ISP(Interface 분리 원칙)의 포괄적인 version
        ```
        필요하지 않은 것에 의존하지 말라.
        ```

- component 응집도에 대한 균형
    - 응집도에 관한 세 원칙은 서로 상충되므로 이 원칙들의 균형을 이루는 방법을 찾아야 함
        - REP, CCP는 포함(includ) 원칙이며 component를 더욱 크게 만드는 반면, CCP는 배제(exclusive) 원칙이라 component를 더 작게 만듬
    - program의 초점은 개발가능성에서 재사용성으로 바뀜
        - 그에 따라 component를 구성하는 방식도 흐트러지고 진화하게 됨
    | | |
    | - | - |
    | REP | 재사용성을 높임 |
    | CCP | 유지보수성을 높임 |
    | CRP | 분리하여 불필요한 release를 줄임 |

## 14장. 컴포넌트 결합

- ADP : Acyclic Dependencies Principle : 의존성 비순환 원칙
    ```
    component 의존성 graph에 순환(cycle)이 있어서는 안 된다.
    ```
    - 개발 환경을 release 가능한 component 단위로 분리하여 순환 의존성 제거하기
        - 이를 통해 component는 개별 개발다 또는 단일 개발팀이 택임질 수 있는 작업 단위가 됨
        - 개발자가 해당 component가 동작하도록 만든 후, 해당 component를 release하여 다른 개발자가 사용할 수 있도록 함
        - 담당 개발자는 이 comonent에 release 번호를 부여하고 다른 team에서 사용할 수 있는 directory에 이동 시킨 후, 다시 자신만의 공간에서 해당 component를 지속적으로 수정하면 됨
        - 이 절차가 성공적으로 동작하려면 component 사이의 의존성 구조에 순환이 있어서는 안 됨
    - 순환이 많아지면?
        - 해당 component를 사용하는 개발자들이 모두 서로에게 얽메이게 됨
        - 간단한 단위 test할 때도 결합이 발생해 다양한 library와 많은 사람의 작업물을 포함해야만 함
            - component를 분리하기 어렵기 때문
        - release하기 어려워짐
        - build 관련 issue가 증가함
            - 순환이 생기면 올바른 순서 자체가 없기 때문에 어떤 순서로 build하는 것이 올바른지 모르게 됨
    - 순환을 끊는 법
        1. 의존성 역전 원칙(DIP)를 적용하기
            - interface 사용
        2. 순환 의존하는 component들이 의존할 수 있는 새로운 component를 만들고, 기존 component들을 새로운 component로 이동시키기
    - 의존성 구조에 순환이 발생하는지 항상 관찰해야 함
        - application이 성장함에 따라 component 의존성 구조는 서서히 흐트러지기 때문
        - 그리고 또 성장하기 때문에 순환이 발생하면 반드시 끊어내야 함
    - 불가능한 하향식(top-down) 설계
        - component 구조는 하향식으로 설계될 수 없음
            - component는 system이 성장하고 변경될 때 함께 진화하기 때문에 가장 먼저 설계할 수 있는 대상이 아님
            - component의 빌드 가능성(buildability)과 유지보수성(maintainability)을 나타내는 지도(map)는 그 대상이 되는 software가 있어야 그릴 수 있기 때문
        - component 의존성 구조는 system의 논리적 설계에 발맞춰 성장하며 진화해야 함
    - component의 성장
        1. project 초기 구현과 설계가 이뤄지고 module들이 점차 쌓이기 시작함
            - 생산성을 위해 의존성 관리에 대한 요구가 점점 늘어남
            - 변경되는 번위가 system의 가능한 한 작은 일부로 한정되기를 원하게 됨
        2. 단일 책임 원칙(SRP)과 공통 폐쇄 원칙(CCP)을 적용하여 함께 변경되는 class는 같은 위치에 배치되도록 함
            - 변동성의 격리
            - 자주 변경되는 component로부터 안정적이며 가치가 높은 component를 보호하도록 만드는 과정
        3. application이 성장함에 따라 재사용 가능한 요소를 만들기 시작함
            - component를 조합하는 과정에서 공통 재사용 원칙(CRP)의 영향을 밭음
        4. 순환이 발생하여 APD를 적용함
        5. application은 이대로 계속 흐트러지고 계속 성장

- SDP : Stable Dependencies Principle
    ```
    안정성의 방향으로(더 안정된 쪽에) 의존하라.
    ```
    - 변경이 쉽지 않은 component가 변동이 예상되는 component에 의존하게 만들면 안 됨
        - 한 번 의존하게 되면 변동성이 큰 component도 결국 변경이 어려워지게 됨
    - 안정성
        - '옆으로 세워진 동전'은 건드리지 않았을 때 오랫동안 서 있을 수 있지만, 이를 안정적이라 하지 않음
            - 안정성은 변화가 발생하는 빈도와는 직접적인 관련이 없음
        - '탁자'를 뒤집으려면 많은 힘을 써야하기 때문에 '안정성이 높다'고 할 수 있음
        - software도 마찬가지로 변경하기 얼마나 어려운지가 안정성과 직접적인 연관이 있음
        - 변경하기 어렵게 하는 확실한 방법은 수많은 다른 component가 해당 component에 의존하게 만드는 것
            - component 안쪽으로 들어오는 의존성이 많아지면 상당히 안정적이라고 볼 수 있음
            - 사소한 변경이라도 의존하는 모든 component를 만족시키면서 변경하려면 상당한 노력이 들기 때문
        - 안정된 component는 책임감(responsible) 있고 독립적(independent)임
            - 안정된 component에 많은 component가 의존하기 때문에 responsible
            - 안정된 component는 어디에도 의존하지 않으므로 independent
    - 안정성 지표
        ```
        I = Fan-out / (Fan-in + Fan-out)
        ```
        - Fan-in
            - 안으로 들어오는 의존성
            - component 내부의 class에 의존하는 component 외부의 class 개수
        - Fan-out
            - 바깥으로 나가는 의존성
            - component 외부의 class에 의존하는 component 내부의 class 개수
        - I (불안정성)
            - [0, 1]의 범위
            - I = 0 : 최고로 안정된 component
            - I = 1 : 최고로 불안정한 component
    - 모든 component가 안정적이어야 하는 것은 아님
        - 모든 component가 최고로 안정적인 system이라면 변경이 불가능함
        - 이상적인 설계는 불안정한 component와 안정된 component가 함께 존재하는 상태의 구조

- SAP : Stable Abstractions Principle : 안정된 추상화 원칙
    ```
    component는 안정된 정도만큼만 추상화되어야 한다.
    ```
    - 고수준 정책을 캡슐화하는 software는 반드시 안정된 component(I=0)에 위치해야 함
        - 업무 logic, architecture에는 변동성이 없기 때문
        - 하지만 고수준 정책을 안정된 component에 위치시키면 그 정책을 포함하는 source code는 수정하기 어려워짐
            - 이로 인해 system 전체 architecture가 유연성을 잃게 됨
        - 따라서 개방 폐쇄 원칙(OCP)을 적용하여 추상(abstract) class를 이용해야 함
    - 안정된 추상화 원칙
        - 안정성(stability)과 추상화 정도(abstractness) 사이의 관계를 정의함
        - 안정된 component는 추상 component여야 하며, 이를 통해 안정성이 component를 확장하는 일을 방해해서는 안 됨
        - 불안정한 component는 반드시 구체 component여야 함
            - component가 불안정하므로 component 내부의 구체적인 code를 쉽게 변경할 수 있어야 하기 때문
        - 안정적인 component라면 반드시 interface와 추상 class로 구성되어 쉽게 확장할 수 있어야 함
            - 안정된 component가 확장이 가능해지면 유연성을 얻게 되고 architecture를 과도하게 제약하지 않게 됨

    - 추상화 정도 측정하기
        ```
        A = Na / Nc
        ```
        - Nc
            - component의 class 갯수
        - Na
            - component의 추상 class와 interface의 갯수
        - A (추상화 정도)
            - [0, 1]의 범위
            - A = 0 : component에는 추상 class가 하나도 없다는 뜻
            - A = 1 : component는 오로지 추상 class만 포함한다는 뜻

- 안정성(I)과 추상화 정도(A) 사이의 관계
    - ```(x, y) = (I, A)```인 graph
    - 최고로 안정적이며 추상회된 component는 (0, 1)에 위치함
    - 최고로 불안정하여 구체화된 component는 (1, 0)에 위치함
    - 모든 component가 (0, 1), (1, 0)에 위치할 수 없으므로 A/I graph 상에서 component가 위치할 수 있는 합리적인 지점을 정의할 수 있음
        - 배제할 구역을 찾는 방식으로 추론할 수 있음
    - 베제할 구역(Zone of Exclusion)
        - 고통의 구역(Zone of Pain) : (0, 0) 주변에 위치한 component
            - 매우 안정적이며 구체적임
            - 추상적이지 않으므로 확장할 수 없고, 안정적이므로 변경하기도 어려움
            - Utility library가 이곳에 위치함
                - 이러한 library는 I 지표가 1이어도 실제로는 변동성이 거의 없음
                - ex) String - 모두 구체 class지만 굉장히 광범위하게 사용되기 때문에 수정하면 혼란을 줌 -> 변동성이 없음
        - 쓸모없는 구역(Zone of Uselessness) : (1, 1) 주변에 위치한 component
            - 최고로 추상적이지만 누구도 그 component에 의존하지 않음
    - 주계열(Main Sequence)
        - (1, 0), (0, 1)을 잇는 선분 : 베제 구역으로부터 최대한 멀리 떨어진 점의 궤적
        - 안정성에 비해 '너무 추상적'이지도 않고, 추상화 정도에 비해 '너무 불안정'하지도 않음
        - 가장 바람직한 지점은 주계열의 두 종점인 (1, 0)과 (0, 1)
        - 그러나 대규모 system에서 소수의 일부 component는 완벽히 추상적이거나 완전하게 안정적일 수 없기 때문에 이런 경우에는 주계열 바로 위에 위치하는 것이 가장 이상적임
    - component와 주계열과의 거리는 가까워야 함

---

# 5부. 아키텍처

## 15장. 아키텍처란?

- software architect는 programmer이며 고수준의 문제에만 집충하는 일이 전부가 아님
    - 발생하는 문제를 경험해보지 않는다면 다른 programmer를 지원하는 일을 제대로 수행할 수 없기 때문
- software system의 architecture란 system을 구축했던 사람들이 만들어낸 system의 형태
    - 그 모양은 system을 component로 분할하는 방법, 분할된 component를 배치하는 방법, component가 서로 의사소통하는 방식에 따라 정해짐
    - 이 형태는 architecture 안에 담긴 software system이 쉽게 갭라, 배포, 운영 유지보수되도록 만들어짐
    ```
    이러한 일을 용이하게 만들기 위해서는 가능한 한 많은 선택지를, 가능한 한 오래 남겨두는 전략을 따라야 한다.
    ```
- system architecture는 system의 동작 여부와는 겨의 관련 없음
    - 형편없는 architecture를 갖춘 system도 잘 동잘할 수 있음
        - 그러나 이런 system은 대체로 운영보다는 배포, 유지보수, 개발 과정에서 어려움을 겪음
    - architecture도 system이 제대로 동작하도록 지원하지만, 이때의 역할은 능동적/본질적이지 않고 수동적/피상적임
- architecture의 주된 목적
    - system의 생명주기를 지원하는 것
    - system을 쉽게 이해하고, 쉽게 개발하며, 쉽게 유지보수하고, 쉽게 배포하게 해줌
    - system의 수명과 관련된 비용은 최소화하고, programmer의 생산성을 최대화하는 것이 궁극적인 목표
- system architecture는 개발팀(들) system을 수비게 개발할 수 있도록 뒷받침해야 함
    - 개발하기 힘든 system은 수명이 길지도 않고 건강하지 않음
    - team이 개발자 5명으로 구성되어 있다면 monolitic system으로도 개발할 수 있음
        - 오히려 architecture 관련 제약들이 방해된다 여길 수 있음
    - 그러나 7명씩으로 구성된 5개 team은 잘 설계된 architecture 없이는 개발이 진척되지 않음
        - 다른 요소를 고려하지 않는다면 이 system의 architecture는 5개의 component(team마다 하나씩)로 발전할 가능성이 높음
            - 좋지 않음
- software architecture는 system을 단 한 번에 쉽게 배포할 수 있도록 만들어야 함
    - software system이 사용될 수 있으려면 배포가 되어야 하고, 배포 비용이 높을수록 system의 유용성이 떨어짐
- architecture를 잘 설계하면 유지보수를 위한 탐사(spelunking) 비용과 위험부담을 줄일 수 있음
    - 탐사 : 기존 software에 새로운 기능을 추가하거나 결함을 수정할 때, software를 파헤쳐서 어디를 고치는 게 최선인지, 어떤 전략ㅇ르 쓰는 것이 최적인지 결정할 때 드는 비용
    - 유지보수는 software system에서 비용이 가장 많이 들어감
- 선택사항 열어 두기
    - software를 부드럽게 유지하는 방법은 선택사항을 가능한 한 많이, 가능한 한 오랫동안 열어두는 것
    - 중요치 않은 세부사항을 끝까지 열어 둬야 함
    - 정책(policy) & 세부사항(detail)
        - 정책 : 정책 요소는 업무 규칙과 업무 절차를 구체화함 (system의 가치가 있는 곳)
        - 세부사항 : 사람, 외부 system, programmer가 정책과 소통할 때 필요한 요소 (정책이 가진 행위에는 영향을 미치지 않음)
            - ex) 입출력 장치, database, web system, server, framework, 통신 protocol 등
    - architect는 system에서 정책을 가장 핵심적인 요소로 식별하고, 세부사항은 정책에 무관하게 만들 수 있는 형태의 system을 구축해야 함
        - 이로써 세부사항을 결정하는 일은 뒤로 미룰 수 있음
        ```
        좋은 architect는 결정되지 않은 사항의 수를 최대화한다.
        ```
    - 정책은 세부사항에 대해 몰라야 하고, 세부사항에 의존해서는 안 됨

## 16장. 독립성

- 좋은 architecture는 system의 Usecase를 지원해야 함
    - system의 의도를 지원해야 함
        - system의 행위에 영향을 주는 것
    - system의 행위를 명확히 하고 외부로 드러내며, 이를 통해 system이 지닌 의도를 architecture 수준에서 알아볼 수 있게 해야 함
- 좋은 architecture는 system의 운영을 지원해야 함
    - system의 의도를 충족시킬 수 있을 구조를 지니도록 해야함
        - ex) 초당 100,00명의 고객을 처리 -> 많은 server에서 병렬로 실행할 수 있게 만들기
- 좋은 architecture는 system의 개발을 지원해야 함
    - 콘웨이(Conway)의 법칙이 적용됨
        ```
        system을 설계하는 조직이라면 어디든지 그 조직의 의사소통 구조와 동일한 구조의 설계를 만들어 낼 것이다.
        ```
    - 잘 격리되어 독립적으로 개발 가능한 component 단위로 system을 분할하기
        - 각 team이 독립적으로 행동하기 편한 architecture를 확보해야 함
- 좋은 architecture는 system의 배포를 지원해야 함
    - 목표는 즉각적인 배포(immediate deployment)
    - system이 build된 수 즉각 배포할 수 있도록 지원해야 함

- 계층 결합 분리
    - 의도와 맥락에 따라서 다른 이유로 변경되는 것들은 분리하고, 동일한 이유로 변경되는 것들을 묶기
        - 단일 책임 원칙 + 공통 폐쇄 원칙
    - 수평적 계층 분리
        - UI 계층
        - 업무 logic 계층
        - Database 계층
- Usecase 결합 분리
    - Usecase에 따라 분리
    - 수직적 분리 (수평적 계층을 가로지르며 분리)
        - 주문 추가
        - 주문 삭제

- 결합 분리
    - 결합 분리 최종 형태
        | | 주문 추가 Usecase | 주문 삭제 Usecase |
        | - | - | - |
        | UI 계층 | 주문 추가용 UI | 주문 삭제용 UI |
        | 업무 logic 계층 | 주문 추가용 업무 logic | 주문 삭제용 업무 logic |
        | database 계층 | 주문 추가용 database | 주문 삭제용 database |
    - 이렇게 결합을 분리했을 때 좋은 점
        - 개발 독립성 : component가 분리되면 team 사이의 간섭이 줄어듬
        - 배포 독립성 : 배포 유연성이 생김
        - ex) 높은 처리량을 보장해야하는 Usecase와 낮은 처리량으로 충분한 Usecase를 분리 운영할 수 있음
        - ex) UI와 database는 업무 규칙과는 다른 server에서 실행될 수 있음
        - ex) 높은 대역폭을 요구하는 Usecase는 여러 server로 복제하여 실행할 수 있음

- 결합 분리 Mode
    - source 수준 분리 mode
        - source code module 사이의 의존성을 제어할 수 있음
        - 하나의 module이 변하더라도 다른 module을 변경하거나 다시 compile하지 않도록 만들 수 있음
        - 모든 component가 같은 주소 공간에서 실행되고, 서로 통신할 때는 간단한 함수 호출을 사용함
            - computer memory에는 하나의 실행 file만이 load됨
            - Monolitic 구조
    - 배포 수준 분리 mode
        - jar file, DDL, 공유 library와 같이 배포 가능한 단위들 사이의 의존성을 제어할 수 있음
        - 한 module의 source code가 변하더라도 다른 module을 다시 build하거나 재배포하지 않도록 만들 수 있음
        - 많은 component가 같은 주고 공간에 상주하며, 단순한 함수 호출을 통해 통신할 수 있음
        - 어떤 component는 동일한 processor의 다른 process에 상주하고, process간 통신, socket, 또는 공유 memory를 통해 통신할 수 있음
        - 결합이 분리된 component가 jar file, Gem file, DDL과 같이 독립적으로 배포할 수 있는 단위로 분할되어 있음
    - service 수준 분리 mode
        - 의존하는 수준을 data 구조 단위까지 낮출 수 있고, network packet을 통해서만 통신하도록 만들 수 있음
        - 모든 실행 가능한 단위는 source와 binary 변경에 대해 서로 완전히 독립적이게 됨
            - ex) service, micro service
        - service 경계를 처리하는 데 memory, 계산량, 노력이 많이 들어감

- system이 성장함에 따라 'source 수준 분리 mode' -> '배포 수준 분리 mode' -> 'service 수준 분리 mode' 식으로 커짐
    - 그러나 나중에 상황이 바뀌었을 때(ex. 요구사항이 감소했을 때) 진행 방향을 거구로 돌려 다시 monolitic 구조로 되돌릴 수도 있어야 함

## 17장. 경계: 선 긋기

- 경계(boundary)는 software 요소를 서로 분리하고, 경계 한편에 있는 요소가 반대편에 있는 요소를 알지 못하도록 막음
- 너무 일찍 내려진 결정에 대한 결합(coupling)은 인적 자원의 효율을 떨어뜨림
- 좋은 architecture는 system의 업무 요구사항(Usecase)과 관련 없는 결정은 가능한 한 최후에 내릴 수 있게 해줌
    - 업무 요구사항(Usecase)과 관련 없는 것들 : framework, database, web server, utility library, 의존성 주입 등
- 선은 관련이 있는 것과 없는 것 사이에 그으면 됨
    - ex) GUI와 업무 규칙, database와 업무 규칙, ...
- 업무 규칙은 database와 관련된 나머지 세부사항에 대해 어떤 것도 알아서는 안 됨
    ```mermaid
    classDiagram
    Business Rules --> Database Interface
    <<Interface>> Database Interface
    Database Access --> Database Interface : ----Boundary----
    Database Access --> Database
    ```
- 입력과 출력은 중요하지 않음
    - 이는 system의 행위를 입출력이 지닌 행위적 측면에서 생각하는 경향이 있기 때문
    ```mermaid
    classDiagram
    Business Rules <-- GUI : ----Boundary----
    ```
    - GUI는 다른 종류의 interface로 얼마든지 교체할 수 있으며 BusinessRules는 이에 대해 영향을 받지 않음
- Plugin architecture
    ```
    software 개발 기술의 역사는 plugin을 손쉽게 생성하여, 확장 가능하며 유지보수가 쉬운 system architecture를 확립할 수 있게 만드는 방법에 대한 이야기이다.
    ```
    ```mermaid
    classDiagram
    Business Rules <-- GUI : ----Boundary----
    Business Rules <-- DB : ----Boundary----
    ```
    - system을 plugin architecture로 배치함으로써 변경이 전파될 수 없는 방화벽을 생성할 수 있음
        - 경계의 한 쪽에 위치한 component는 경계 반대편의 component와는 다른 속도로 변경되므로, 둘 사이에는 반드시 경계가 필요함
    - 경계 맞은 편의 component는 다른 시점에 다른 이유로 변경되므로 단일 책임 원칙이 적용됨
- 경계선을 그리려면 먼저 system을 component 단위로 분할해야 함
    - plugin으로 분할된 component의 화살표는 핵심 업무 규칙 component를 향하도록 함
        - 의존성 역전 원칙과 안정된 추상화 원칙의 응용 : 의존성 화살표가 저수준 세부사항에서 고주순의 추상화를 향해야 하므로

## 18장. 경계 해부학

- 경계는 이런 변경이 전파되는 것을 막는 방화벽을 구축하고 관리하는 수단
    - runtime에 경계를 횡단하는 것 : 한쪽에 있는 기능에서 반대편 기능을 호출하여 data를 전달하는 일
    - 이 때 적절한 위치에서 경계를 횡단하게 하는 비결은 source code 의존성 관리
        - source code module 하나가 변경되면 이에 의존하는 다른 source code module도 변경하거나 다시 배포해야할 지도 모르기 때문

- 단일체 경계
    - 배포 관점에서 봤을 때, source code 수준 분리 module은 단일체(monolith)임
        - monolith : 단일 실행 file
    - source code 수준 분리 mode
        - 물리적으로 엄격하게 분리되지 않는 형태
        - 함수와 data가 단일 processor에서 같은 주소 공간을 공유
        - 나름의 규칙에 따라 분리되어있을 뿐
    - 배포 시엔 경계가 드러나지 않음
        - 단일체는 component 수준으로 분리되지 않음
        - 개별 component를 배포하는 대신 커다란 하나의 file을 배포하기 때문
    - 배포할 때 경계가 드러나지 않아도 단일체에는 source code 수준 분리를 통해 경계를 가지도록 해야함
        - 단일체 안에 포함된 다양한 component를 개발하고 binary로 만드는 과정을 독립적으로 수행할 수 있게하기 때문

    - 저수준 client에서 고수준 service로 향하는 함수 호출 : 가장 단순한 형태의 경계 횡단
        - runtime 의존성과 compile time 의존성은 모두 같은 방향을 향함 (저수준 -> 고수준)
        - 제어 흐름은 경계를 횡단할 때 저수준에서 고수준으로 흐름
		```mermaid
        classDiagram
		Client --> Service : ----boundary----
		Client --> Data : ----boundary----
		Service --> Data
        <<DS>> Data
        Service : function()
        ```

    - 제어 흐름과는 반대 방향으로 의존성 역전 : 고수준 client가 저수준 service를 호출해야할 때
        - runtime 의존성은 compile time 의존성과는 반대가 됨
		```mermaid
		classDiagram
		Client --> Service
		Client --> Data
		ServiceImpl --> Service : ----boundary----
		ServiceImple --> Data : ----boundary----
        class Service {
            <<interface>>
            function()
        }
		```
    - 정적 link된 monolitic 구조의 실행 file이라도 이렇게 규칙적인 방식으로 구조를 분리하면 장점이 많음
        - team들은 서로의 영역에 침범하지 않은 채 자신만의 component를 독립적으로 작업할 수 있음
        - 고수준 component는 저수준 세부사항으로부터 독립적으로 유지됨
    - source 수준에서 결합이 분리된 단일체에서 component간 통신을 빠르고 값싸기 때문에 경계를 가로지는 통신이 빈번함
        - 전형적인 함수 호출이 통신임
    - 단일체를 배포하는 일은 일반적으로 compile과 정적 link 작업을 수반하므로, 대체로 component는 source code 형태로 전달됨

- 배포형 component 경계
    - architecture의 경계가 물리적으로 드러난 형태
    - ex) 동적 link library (.NET DLL, Java jar file, Ruby Gen, Unix 공유 library 등)
        - component를 이 형태로 배포하면 따로 comile하지 않고 바로 사용할 수 있음
    - 배포 수준 결합 분리 mode
        - component는 binary와 같이 배포 가능한 형태로 전달됨
    - 배포 과정에서만 차이가 날 뿐 단일체와 동일함
        - 모든 함수가 동일한 processor와 주소 공간에 위치함
        - component를 분리하거나 component 간 의존성을 관리하는 전략도 단일체와 동일함
            - 정적 다형성을 사용할 수는 없음
        - 통신은 함수 호출이 전부 이므로 값싸고 빈번한
            - 동적 link와 runtime loading으로 최초의 함수 호출은 오래 걸릴 수 있음

- Thread 경계
    - 단일체와 배포형 component는 모두 thread를 활용할 수 있음
    - thread는 architecture 경계나 배포 단위가 아님
        - thread는 실행 계획과 순서를 체계화하는 방법에 가까움
        - 모든 thread가 하나의 component에 포함될 수도 있고, 많은 component에 걸쳐 분산될 수도 있음

- Local Process 경계
    - local process는 주로 명령행이나 system 호출을 통해 생성됨
    - local process들은 동일한 processor 또는 하나의 multi-core system에 속한 여러 processor에서 실행되지만, 각각 독립된 주소 공간에서 실행됨
        - 일반적으로 memory 보호를 통해 process들이 memory를 공유하지 못하게 함
            - 종종 공유 memory partition을 사용하기도 함
    - local process는 socket, mailbox, message queue 같은 운영체제에서 제공하는 통신 기능을 이용하여 서로 통신함

    - local process가 정적으로 link된 단일체일 때
        - 여러 monolitic process가 같은 component들을 가지고 있을 수 있음
            - compile하고 정적 link하는 과정에서 각 component의 binary가 단일체에 물리적으로 복사되어 들어가기 때문
    - local process가 동적으로 link된 여러 개의 component로 구성되었을 때
        - 동적으로 link된 배포형 component들을 수로 공유할 수 있음

- local process는 component간 의존성을 동적 다형성을 통해 관리하는 저수준 component로 구성됨
        - 일종의 최상위 component
    - local process 간 분리 전략은 단일체나 binary component의 경우와 동일함
        - source code 의존성 화살표 : 저수준 -> 고수준
        - 따라서 local process는 고수준 process의 source code가 저수준 process의 이름, 물리 주소, registry 조회 key를 포행해서는 안 됨
            - architecture 관점의 목표는 저수준 process가 고수준 process의 plugin이 되도록 만드는 것이기 때문
    - local process 경계를 지나는 통신 : 운영체제 호출, data marshaling/unmarshaling, process 간 문맥 교환 등
        - 비싼 작업에 속하므로 너무 빈번하게 이뤄지지 않도록 신중하게 제한해야 함
- Service 경계
    - 물리적인 형태를 띠는 가장 강력한 경계
    - service는 process이므로 일반적으로 명령행 또는 그와 동등한 system 호출을 통해 구동됨
    - 자신의 물리적 위치에 구애받지 않고 모든 통신은 network를 통해 이루어짐
    - service 경계를 지나는 통신은 함수 호출에 비해 매우 느림
        - 가능하다면 빈번하게 통신하는 일은 피해야 함
        - 지연(latency)에 따른 문제를 고수준에서 처리할 수 있어야 함
    - 통신을 제외하고 local process에 적용한 규칙이 그대로 적용됨
        - 저수준 service는 반드시 고수준 service에 plugin되어야 함
        - 고수준 service의 source code에는 저수준 service를 특정짓는 어떤 물리적인 정보(ex. URI)도 포함해서는 안 됨

## 19장. 정책과 수준

- software system
    - '정책'을 기술한 것
    - computer program의 핵심부
        - computer program : 각 입력을 출력으로 변환하는 정책을 상세하게 기술한 설명서
    - 하나의 정책은 이 정책을 기술하는 여러 개의 조그만 정책으로 이루어짐
    - 동일한 시점에 변경되는 정책은 동일한 수준에 위치하며, 동일한 component에 속해야 함
        - 서로 다른 이유로, 서로 다른 시점에 변경되는 정책은 다른 수준에 위치하며, 다른 component로 분리해야 함
        - 단일 책임 원칙(SRP)와 공통 폐쇄 원칙(CCP)

- 수준 (Level)
    - 입력과 출력까지의 거리
        - 멀리 위치할 수록 정책의 수준이 높아짐
        - 입력과 출력을 다루는 정책은 system에서 최하위에 위치함
    - 고수준 정책 : 입력과 출력에서 멀리 떨어진 정책
        - 저수준 정책에 비해 덜 빈번하게 변경되고, 보다 중요한 이유로 변경됨
    - 저수준 정책 : 입력과 출력에 가까이 위치한 정책
        - 더 빈번하게 변경되며, 보다 긴급성을 요하며, 덜 중요한 이유로 변경됨

## 20장. 업무 규칙

- 업무 규칙 : 사업적으로 수익을 얻거나 비용을 줄일 수 있는 규칙 또는 절차
    - 핵심 업무 규칙 (Critical Business Rule)
        - 사업 자체에 핵심적이며, 규칙을 자동화하는 system이 없더라도 그대로 존재함
            - 사람이 수동으로 직접 수행하더라도 마찬가지임
    - 핵심 업무 Data (Critical Business Data)
        - 핵심 업무 규칙에 필요한 data
        - system으로 자동화하지 않은 경우에도 존재하는 data
    - 핵심 규칙과 핵심 data는 본질적으로 결합되어 있고, 이것으로 만든 객체를 Entity라고 함
    - 업무 규칙은 system에서 가장 독립적이며 가장 많이 재사용할 수 있는 code여야 함

- Entity
    - computer system 내부의 객체로서, 핵심 업무 data를 기반으로 동작하는 일련의 조그만 핵심 업무 규칙을 구체화함
    - 핵심 업무 data를 직접 포함하거나 핵심 업무 data에 쉽게 접근할 수 있음
    - entity의 interface는 핵심 업무 data를 기반으로 동작하는 핵심 업무 규칙을 구현한 함수들로 구성됨
        - ex) 대출 Entity의 UML Class
            ```mermaid
            classDiagram
            class Loan {
                principle
                rate
                period
                makePayment()
                applyInterest()
                chargeLateFee()
            }
            ```
    - 업무의 대표자로서 독립적으로 존재하는 class
        - dataabase, 사용자 interface, third party framework에 대한 고려사항들로 오염되어서는 안 됨
        - 어떤 system에서도 업무를 수행할 수 있음
            - system의 표현 방식이나 data 저장 방식, 해당 system에서 computer가 배치되는 방식과도 무관해야 함
            - 순전히 업무에 대한 것이며 이외의 것은 없어야 함
    - entity를 만드는 데 반드시 객체 지향 언어를 사용할 필요 없음
        - 단지 핵심 업무 data와 핵심 업무 규칙을 하나로 묶어서 별도의 software module로 만들면 됨

- Usecase
    - 자동화된 system이 동작하는 방법을 정의하고 제약함으로써 수익을 얻거나 비용을 줄이는 업무 규칙
        - 자동화된 system이 사용되는 방법을 설명함
        - 이러한 규칙은 자동화된 system의 요소로 존재해야만 의미가 있으므로 수동 환경에서는 사용할 수 없음
    - application에 특화된(application-specific) 업무 규칙
        - entity에 비해 덜 순수함
        - entity 내부의 핵심 업무 규칙을 어떻게, 언제 호출할지를 명시하는 규칙을 담음
            - entity가 어떻게 동작할지 usecase가 제어하는 것
    - usecase는 system이 사용자에게 어떻게 보이는지 설명하지 않음
        - 이보다는 application에 특화된 규칙을 설명함
            - 이를 통해 사용자와 entity 사이의 상호작용을 규정함
            - system에서 data가 들어오고 나가는 방식을 usecase와는 무관함
    - usecase는 객체이며, 함수와 data 요소를 포함함
        - application에 특화된 업무 규칙을 구현하는 하나 이상의 함수를 제공함
        - 입력 data, 출력 data, usecase가 상호작용하는 entity에 대한 참조 data 등의 data 요소를 포함함
    - usecase와 entity
        - usecase는 저수준 : 단일 application에 특화되어 있으므로
            - 해당 system의 입력과 출력에 보다 가까이 위치함
        - entity는 고수준 : 다양한 application에서 사용될 수 있도록 일반화된 것이므로
            - 입력이나 출력에서 더 멀리 떨어져 있음
        - usecase는 entity에 의존함
        - entity는 usecase에 의존하지 않음

- 요청 및 응답 model
    - usecase는 단순한 요청 data 구조를 입력으로 받아들이고, 단순한 응답 data 구조를  출력을 반환함
        - 이 data 구조는 어떤 것에도 의존하지 않음
        - usecase class의 code가 HTML이나 SQL에 대해 알아서는 안 됨

## 21장. 소리치는 아키텍처

- architecture는 system을 이야기해야 하며, system에 적용한 framework에 대해 이야기해서는 안 됨
    - 상위 수준의 directory 구조, 최상위 package에 담긴 source file을 볼 때, 이 architecture가 '무엇을 위한 것인지' 알 수 있어야 함
        - Rails인지, Spring/Hibernate인지, ASP인지는 중대사항이 아님
- 좋은 architecture
    - framework나 도구, 환경에 전혀 구애받지 않고 usecase를 지원하는 구조를 문제없이 기술할 수 있어야 함
        - framework, database, web server, 여타 개발 환경 문제나 도구에 대해서는 결정을 미룰 수 있어야 함
    - usecase에 중점을 두며, 지엽적인 관심사에 대한 결합은 분리시킴
    - Web이라는 환경도 미루어야할 결정사항 중 하나일 뿐

## 22장. 클린 아키텍처

- clean architecture의 조건
    - framework 독립성
        - architecture는 다양한 기능의 library를 제공하는 software(framework)의 존재 여부에 의존하지 않아야 함
        - framework를 도구소 사용할 수 있으며, framework가 지닌 제약사항 안으로 system을 욱여 넣도록 강제하지 않아야 함
    - test 용이성
        - 업무 규칙은 UI, database, web server, 또는 여타 외부 요소 없이도 test할 수 있어야 함
    - UI 독립성
        - system의 나머지 부분을 변경하지 않고도 UI를 쉽게 변경할 수 있어야 함
            - ex) 업무 규칙을 변경하지 않은 채 web UI를 console UI로 대체할 수 있어야 함
    - database 독립성
        - 업무 규칙은 database에 결합되지 않아야 함
        - Oracle이나 MS SQL server를 MongoDB, BigTable, CauchDB 등으로 교체할 수 있어야 함
    - 모든 외부 agency에 대한 독립성

- Clean Architecture
    ```mermaid
    flowchart

    A[외부] --> B(Framework & Driver : Web / 장치 / DB / 외부 Interface / UI)
    B --> C(Interface Adapter : Controller / Gateway / Presenter)
    C --> D(Application 업무 규칙 : Usecase)
    D --> E(Enterprice 업무 규칙 : Entity)
    E --> F[내부]

    F --> E --> D --> C --> B --> A
    ```

    ```
    source code 의존성은 반드시 안쪽으로, 고수준의 정책을 향해야 한다.
    ```
    - 안으로 들어갈수록 고수준의 software가 됨
        - 외부에 가까울 수록 mechanism
        - 내부에 가까울 수록 정책
    - 의존성 규칙 (Dependency Rule)
        - 내부 요소는 외부 요소에 대한 어떤 것도 알지 못해야 함
        - 내부에 속한 code는 외부에 선언된 어떤 것에 대해서도 그 이름을 언급해서는 안 됨
            - 함수, class, 변수, software entity 등
        - 외부에 위치한 어느 것도 내부에 영향을 주지 말아야 함
            - 외부에 선언된 data 형식도 내부에서 사용해서는 안 됨
    1. Entity
        - 기업의 다양한 application에서 재사용할 수만 있다면 형대는 그다지 중요하지 않음
            - method를 가지는 객체이거나 일련의 data 구조외 함수의 집합일 수도 있음
        - 가장 일반적이며 고수준인 규칙(핵심 업무 규칙)을 캡슐화함
            - 따라서 외부의 무언가가 변경되더라도 entity가 변경될 가능성은 낮음
        - 운영 관점에서 특정 application에 변경이 필요하더라도 영향을 받아서는 안 됨
    2. Usecase
        - usecase 계층의 software는 application에 특화된 업무 규칙을 포함함
            - system의 모든 usecase를 캡슐화하고 구현함
        - entity로 들어오고 나가는 data 흐름을 조정함
        - entity가 자신의 핵심 업무 규칙을 사용해서 usecase의 목적을 달성하도록 이끄는 역할
        - 이 계층에서 발생한 변경이 entity에 영향을 줘서는 안 됨
        - database, UI, 여타 공통 framework와 같은 외부 요소에서 발생한 변경이 이 계층에 영향을 줘서는 안 됨 (관심사의 격리)
        - 운영 관점에서 application이 변경된다면 영향을 받음
    3. Interface Adapter
        - 일련의 adapter들로 구성됨
        - Presenter, View, Controller가 이 계층에 속함
            - GUI의 MVC archtecture
        - adapter는 data를 usecase와 entity에 가장 편리한 형식으로 변환함
        - 또한 data를 entity와 usecaes에게 가장 편리한 형식에서 database(영속성용으로 사용 중인 framework)가 이용하기에 가장 편리한 형식으로 변함
            - 이 계층에 속한 어떤 code도 database에 대해서 알아서는 안 됨
    4. Framework & Driver
        - database나 web framework 같은 framework나 도구들로 구성됨
        - 세부사항이 위치하는 곳
            - web과 database는 세부사항
            - 세부사항을 외부에 위치시켜서 피해를 최소화함
        - 내부와 통신하기 위한 접합 code 외에는 특별히 더 작성해야 할 code가 없음

    - 경계 횡단하기
        ```mermaid
        classDiagram

        Presenter --|> Usecase 출력 port
        Usecase Interacter --> Usecase 출력 port
        Usecase Interacter --|> Usecase 입력 port
        Controller --> Usecase 입력 port

        <<Interface>> Usecase 출력 port
        <<Interface>> Usecase 입력 port
        ```
        - 제어흐름 : controller -> usecase -> presenter
        - 각 의존성은 usecase를 향해 안쪽을 가리킴
        - 이처럼 제어흐름과 의존성의 방향이 반대여야 하는 경우, 의존성 역전 원칙을 사용하여 해결함
            - intercase와 상속 관계를 적절하게 배치함으로써, 제어흐름이 경계를 가로지르는 지점에서 source code 의존성을 제어흐름과 반대가 되도록 할 수 있음
                - 제어흐름을 따라 구현하면 내부에서 외부의 code를 호출하게 되는데, 이 지점에서 source code 의존성을 역전시켜서 (제어흐름과는 반대로) 외부에서 내부의 code를 호출하게 만드는 것
            - 제어흐름이 어느 방향으로 흐르던지 의존성 규칙을 준수할 수 있음

    - 경계를 횡단하는 data
        - 격리되어있는 간단한 data 구조로 전달되어야 함
            - 구조체 또는 data 전송 객체(DTO : data transfer object)
            - 함수를 호출할 때의 간단한 인자 사용
            - HashMap 또는 객체
        - entity 객체나 database의 row를 전달해서는 안 됨
            - data 구조가 의존성을 가지게 될 수 있음

## 23장. 프레젠터와 험블 객체

- Presenter
    - humber object pattern을 따른 형태
    - architecture 경계를 식별하고 보호하는 데 도움이 됨
- Humble Object Pattern : 대강 만든 객체
    - test하기 어려운 행위와 test하기 쉬운 행위를 단위 test 작성자가 분리하기 쉽게 하는 design pattern
    - 사용 방법
        - 행위들을 두 개의 module 또는 class로 나누고, 이 모듈 중 하나를 humble로 지정
        - 가장 기본적인 본질은 남기고, test하기 어려운 행위를 모두 humber 객체로 옮기기
- presenter와 view
    - view
        - humber 객체이고 test하기 어려움
        - view는 view modeldml data를 화면을 load할 뿐이며, 이 외에 view가 맡는 역할은 없어야 함
            - 따라서 view가 맡은 일은 전혀 없고, humber함(보잘것없음)
    - presenter
        - test하기 쉬운 객체
        - application으로부터 data를 받아 화면에 표현할 수 있는 format으로 만드는 것이 presenter의 역할
        - 이로써 view는 data를 화면으로 전달하는 간단한 일만 처리할 수 있음

- test와 architecture
    - 좋은 architecture는 test가 용이해야 함
        - ex) humber 객체 : 행위를 test하기 쉬운 부분과 어려운 부분으로 분리하여 architecture 경계를 정의함


## 24장. 부분적 경계
## 25장. 계층과 경계
## 26장. 메인(Main) 컴포넌트
## 27장. '크고 작은 모든' 서비스들
## 28장. 테스트 경계
## 29장. 클린 임베디드 아키텍처

---

# 6부. 세부사항

## 30장. 데이터베이스는 세부사항이다
## 31장. 웹은 세부사항이다
## 32장. 프레임워크는 세부사항이다
## 33장. 사례 연구: 비디오 판매
## 34장. 빠져있는 장

---

# Reference

- Clean Architecture : 소프트웨어 구조와 설계의 원칙 - 로버트 C. 마틴
