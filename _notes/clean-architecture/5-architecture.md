---
# layout: note
# title: Clean Architecture Chapter 5 - 아키텍처
# date: 2023-11-02
---




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
    - humble object pattern을 따른 형태
    - architecture 경계를 식별하고 보호하는 데 도움이 됨

- Humble Object Pattern : 대강 만든 객체
    - test하기 어려운 행위와 test하기 쉬운 행위를 단위 test 작성자가 분리하기 쉽게 하는 design pattern
    - 사용 방법
        - 행위들을 두 개의 module 또는 class로 나누고, 이 모듈 중 하나를 humble로 지정
        - 가장 기본적인 본질은 남기고, test하기 어려운 행위를 모두 humble 객체로 옮기기

- presenter와 view
    - view
        - humble 객체이고 test하기 어려움
        - view는 view modeldml data를 화면을 load할 뿐이며, 이 외에 view가 맡는 역할은 없어야 함
            - 따라서 view가 맡은 일은 전혀 없고, humble함(보잘것없음)
    - presenter
        - test하기 쉬운 객체
        - application으로부터 data를 받아 화면에 표현할 수 있는 format으로 만드는 것이 presenter의 역할
        - 이로써 view는 data를 화면으로 전달하는 간단한 일만 처리할 수 있음

- test와 architecture
    - 좋은 architecture는 test가 용이해야 함
        - ex) humble 객체 : 행위를 test하기 쉬운 부분과 어려운 부분으로 분리하여 architecture 경계를 정의함


## 24장. 부분적 경계

- 완벽한 architecture 경계를 만드는 데에는 비용이 많이 듬
    - 쌍방향의 다형적 Boundary interface, Inout/Output을 위한 data 구조가 필요함
    - 두 영역을 독립적으로 compile하고 배포할 수 있는 component로 격리하는데 필요한 모든 의존성 관리가 필요함
    - Agile에서는 이런 종류의 선행적인 설계를 선호하지 않음
        - YAGNI(You Aren't Going to Need It) 원칙을 위배하기 때문
    - 따라서 부분적 경계(partial boundary)를 구현하기도 함

- 부분적 경계를 구현하는 3가지 방법
    - 마지막 단계를 건너뛰기
        - 독립적으로 compile하고 배포할 수 있는 component를 만들기 위한 작업은 모두 수행한 후, 단일 component에 그대로 모아만 두는 것
            - 쌍방향 interface도, 입력/출력 data 구조도 단일 component에 있음
        - 완벽한 경계를 만들 때 만큼의 code 양과 사전 설계가 필요하지만, 다수의 component를 관리하는 작업을 하지 않아도 됨
    - 일차원 경계
        - 완벽한 형태의 architecture 경계는 양방향으로 격리된 상태를 유지해야 하므로 쌍방향 Boundary interface를 사용하지만, 이는 초기 설정할 때난 지속적으로 유지할 때 비용이 많이 듬
        - 전략(strategy) pattern을 사용
            ```mermaid
            classDiagram

            Client --> ServiceeBoundary Interface
            ServiceImpl --> ServiceeBoundary Interface

            <<Interface>> ServiceeBoundary Interface
            ```
            - Client가 ServiceImpl과 직접 통신하지 않고, 중간에 ServiceBoundary Interface를 통해서 통신하도록 함
            - ServiceBoundary Interface는 Client가 사용하며 ServiceImpl class가 구현함
        - Client를 ServiceImpl로부터 격리시키는 데 필요한 의존성 역전이 이미 적용되었지 때문에, 미래에 필요한 architecture 경계를 위한 기초를 제공함
        - 그러나 Client와 ServiceImpl 사이에 비밀 통로가 생길 수 있기 때문에, 정확히 관리되지 않으면 분리가 붕괴될 수도 있음
    - Facade
        - Facade pattern 사용
        - 경계가 Facade class로만 간단히 정의됨
        - Facade class에는 모든 service class를 method 형태로 정의하고, service 호출이 발새아면 해당 service class로 호출을 전달함
        - Client는 이 Service class에 직접 접근할 수 없음
        - Client -> Facade -> 다수의 Service
        ```mermaid
        classDiagram

        ServiceImpl --> Facade
        Facade --> 다수의 Service
        ```
        - Facade class를 통하지 않는 비밀 통로가 쉽게 생길 수 있음


## 25장. 계층과 경계

- architecture 경계가 언제 필요한지를 신중하게 파악해야 함
    - 경계를 제대로 구현하는 데에는 비용이 많이 듬
        - 따라서 단순한 system에는 필요없을 수도 있음
    - YAGNI(You Aren't Coing to Need It)
    - 추상화가 필요하리라고 미리 예측해선 안 됨
        - over engineering이 unger engineering보다 나쁠 때가 훨씬 많음
    - 그러나 경계가 무시되었다면 나중에 다시 추가하는 비용이 크다는 것을 고려해야 함
    - 경계를  구현하는 비용과 무시할 때 감수할 비용을 가늠해 결정해야 함


## 26장. 메인(Main) 컴포넌트

- 모든 system에는 최소한 하나의 component가 존재하고, 이 component가 나머지 component를 생성하고, 조정하며, 관리함 -> 이 component가 main component
- main component
    - 궁극적인 세부사항으로 가장 낮은 수준의 정책
    - system의 초기 진입점
    - 운영체제를 제외하면 어떤 것도 main에 의존하지 않음
    - 모든 Factory와 Stratege, 그리고 system 전반을 담당하는 나머지 기반 설비를 생성한 후, system에서 더 높은 수준을 담당하는 부분으로 제어권을 넘기는 역할을 맡음
    - 의존성 주입 framework를 이용해 의존성을 주입하는 역할을 맡음
        - main은 의존성 주입 framework를 사용하지 않ㄷ고도 일반적인 방식으로 의존성을 분배할 수 있어야 함
    - 가장 바깥에 위치하는 지저분한 저수준 module
        - 고수준의 system을 위한 모든 것을 load한 후, 제어권을 고주순의 system에게 넘김

- main component는 application의 plugin이라고 생각하면 됨
    - 초기 조건과 설정을 구성하고, 외부 자원을 모두 수집한 후, 제어권을 application의 고수준 정책으로 넘기는 plugin
    - plugin이므로 main component를 application의 설정별로 하나씩 두도록 하여 둘 이상의 main component를 만들 수도 있음
        - ex) 개발용 main plugin, test용 main plugin, 상용 main plugin 등
        - ex) 국가별 main plugin, 관할별 main plugin, 고객별 main plugin 등
    - architecture 경계 바깥에 위치시키기 때문에 설정 관련 문제를 쉽게 해결할 수 있음


## 27장. '크고 작은 모든' 서비스들

- service architecture?
    - service를 사용한다는 것이 본직적으로 architecture에 해당하지는 않음
    - 단순히 application의 행위를 분리할 뿐인 service라면 값비싼 함수 호출에 불과함
    - system의 architecture는 의존성 규칙을 준수하며 고수준의 정책을 저수준의 세부사항으로부터 분리하는 경계에 정의되는 것
    - 기능을 process나 platform에 독립적이 되게끔 service들을 생성하면 의존성 규칙 준수 여부와 상관없이 도움이 됨
        - 이같이 모든 service가 architecture 관점에서 중요해야만 하는 것은 아님
    - service는 process나 platform 경계를 가로지는 함수 호출에 지나지 않음

- service architecture의 일반적인 오해
    - 결합 분리의 오류
        - service는 개별 변수 수준에서는 각각 결합이 분리되지만, processor 내의 또는 network 상의 공유 자원 때문에 결합될 가능성이 여전히 존재함
        - 서로 공유하는 data에 의해 이들 service는 강력하게 결합됨
        - interface가 잘 정의되어 있어야 한다는 이점이 있지만, 함수의 경우에도 전혀 다르지 않음
            - service interface가 함수 interface보다 더 엄밀하거나, 더 엄격하고, 더 잘 정의되는 것은 아님
    - 개발 및 배포 독립성의 오류
        - 횡단 관심사(cross-cutting consern)가 있다면 service가 분리되어 있더라도 독립적으로 개발하고 배포하거나 유지할 수 없음
            - 결합되어 있기 때문

- component 기반 service
    - service는 반드시 단일체(monolith)이어야 할 필요는 없음
    - service를 SOLID 원칙대로 설계하고 component 구조를 갖추도록 해야 함
        - 이를 통해 service 내의 기존 component를 변경하지 않고도 새로운 component를 추가할 수 있음 (개방 폐쇄 원칙)


## 28장. 테스트 경계

- test는 system의 일부이며, architecture에도 관여함
- system component인 test
    - test는 태생적으로 의존성 규칙을 따름
    - test는 세부적이며 구체적인 것으로, 의존성은 한상 test 대상이 되는 code를 향함
    - system 내부의 어떤 것도 test에는 의존하지 않으며, test는 system의 component를 향해, 항상 안쪽으로 의존함
        - test는 architecture에서 가장 바깥쪽에 위치함
    - test는 독립적으로 배포 가능함
        - 대다수의 경우 test는 test system에만 배포하며, 상용 system에는 배포하지 않음
    - test는 system component 중에서 가장 고립되어 있음
        - 어떤 사용자도 test에 의존하지 않기 때문

- test를 고려한 설계
    - test는 극단적으로 고립되어 있지만, 그렇다고 설계 범위 밖에 있는 것은 아님
        - test가 system의 설계와 잘 통합되지 않으면, test는 깨지기 쉬워지고, system은 뻣뻣해져서 변경하기가 어려워짐
    - system에 강하게 결합된 test라면 system이 변경될 때 함께 변경되어야만 함
        - system component에서 생긴 사소한 변경이, 이와 결합된 수많은 test를 망가뜨릴 수 있음 : 깨지기 쉬운 test 문제(Fragile Tests Problems)
        - 만약 간단한 변경이 대량의 test 실패로 이어진다면, 개발자는 변경하려하지 않을 것임 -> system이 뻣뻣해짐
    - 따라서 test는 변동성이 있는 것이 의존해서는 안 됨
        - GUI는 변동성이 크기 때문에 GUI에 의존하지 않고 업무 규칙을 test할 수 있어야 함

- Test API
    - 모든 업무 규칙을 검증하는 데 사용할 수 있도록 특화된 test API를 만들면 됨
        - 변동성이 있는 것에 의존하지 않고 업무 규칙을 test할 수 있게 하기 위해
    - test API는 보안 제약사항을 무시할 수 있으며, database와 같은 값비싼 자원은 건너뛰고, system을 test 가능한 특정 상태로 강제하는 힘을 가져야 함
    - test API는 사용자 interface가 사용하는 Interactor와 Interface Adaptor들의 상위 집합이 됨
    - test API는 test를 application으로부터 분리할 목적으로 사용함
        - test 구조를 application 구조로부터 결합 분리하는 것이 목표
    - test API는 application의 구조를 test로부터 숨김
        - 구조적 결합의 해결
        - 상용 code를 refactoring하거나 진화시키더라도 test에는 영향을 주지 않게 됨
        - test를 refactoring하거나 진화시킬 때도 상용 code에는 영향을 주지 않음
        - 따로따로 진화하므로, test는 계속해서 더 구체적이고 더 특화된 형태로 변하고, 반대로 상용 code는 더 추상적이고 범용적인 형태로 변함
    - test API가 지닌 강력한 힘을 운영 system에 배포하면, 보안적으로 위험할 수 있음
        - 따라서 test API 자체와 test API 중 위험한 부분의 구현부는 독립적으로 배포할 수 있는 component로 분리해야 함




---




# Reference

- Clean Architecture (도서) - Robert C. Martin
