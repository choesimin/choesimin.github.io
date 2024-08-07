---
layout: skill
title: Clean Architecture Chapter 4 - 컴포넌트 원칙
date: 2023-11-02
---




## 12장. 컴포넌트

- SOLID 원칙 : 벽과 방에 벽돌을 배치하는 방법
- Component 원칙 : Building에 방을 배치하는 방법

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
    | CCP | 유지 보수성을 높임 |
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
            - component의 빌드 가능성(buildability)과 유지 보수성(maintainability)을 나타내는 지도(map)는 그 대상이 되는 software가 있어야 그릴 수 있기 때문
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
    - 고수준 정책을 캡슐화(encapsulation)하는 software는 반드시 안정된 component(I=0)에 위치해야 함
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
    - `(x, y) = (I, A)`인 graph
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




## Reference

- Clean Architecture (도서) - Robert C. Martin
