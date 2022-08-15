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

- 7부. 부록
    - 부록 A. 아키텍처 고고학

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
## 16장. 독립성
## 17장. 경계: 선 긋기
## 18장. 경계 해부학
## 19장. 정책과 수준
## 20장. 업무 규칙
## 21장. 소리치는 아키텍처
## 22장. 클린 아키텍처
## 23장. 프레젠터와 험블 객체
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

# 7부. 부록

## 부록 A. 아키텍처 고고학

---

# Reference

- Clean Architecture : 소프트웨어 구조와 설계의 원칙 : 로버트 C. 마틴

