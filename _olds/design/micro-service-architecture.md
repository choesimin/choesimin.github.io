---
layout: skill
---

# MSA : MicroService Architecture

- MicroService는 Service 지향 Architecture(SOA; Service Oriented Architecturee)에 이어 점점 더 많은 인기를 끌고 있는 architecture pattern

---

## MicroService와 벌집

- 벌은 육각형 모양의 밀랍으로 된 방을 가지런하게 배치하면서 벌집을 만듬
- 벌집(honeycomb)을 만드는 일은 서로 다른 재료를 사용해서 방을 만드는 작은 작업에서부터 시작됨
    - 벌집을 짓는 그 시점에서 가용한 자원을 바탕을 건축이 진행됨
- 방을 반복적으로 만들다보면 어떤 pattern을 형성함
    - 결과적으로 상탕히 튼튼한 구조를 지닌 벌집이 완성됨
- 벌집 안에 있는 각 방은 서로 독립적이지만 다른 방들과 연결되어 있기도 함
- 방을 추가하다보면 벌집은 점점 커지고 견고한 구조를 가지게 됨
- 방 하나가 망가지더라도 다른 방에 영향을 미치지 않음
    - 벌은 전체 벌집 구조에 영향을 미치지 않으면서 망가진 방을 수리해 다시 만들어낼 수 있음

---

## MicroService의 원칙

### 단일 책임 원칙 : Service 하나에 책임도 하나

- SOLID design pattern 중 한가지 원칙
- 하나의 단위 요소는 하나의 책임만 가져야 함을 의미
    - class든 함수든 service든 간에 하나의 단위요소는 반드시 하나의 책임만을 가져야 함
    - 어떤 상황에서든 두 개의 단위 요소가 하나의 책임을 공유해서는 안 됨
    - 하나의 단위 요소가 여러 개의 책임을 가져서도 안 됨
- 하나의 단위 요소가 여러 개의 책임을 가지면 결국 다른 요소들과 지나치게 높은 결합도를 형성하게 됨

### 자율성 : MicroService는 자율적

- MicroService는 자기 완비적이고 독립적으로 배포할 수 있으며, 자율적인 service로서 business의 범위와 실행에 대해 전적임 책임을 짐
- 또한, library 의존성을 포함한 모든 의존 관계와 web server나 container 또는 물리적인 자원을 추상화하는 가상 머신을 모두 함께 가지고 있어야 함
- MicroService와 SOA의 가장 큰 차이점 중 하나는 자율성 수준의 차이
    - 대부분의 SOA 구현체가 service 수준의 추상화를 제공
    - MicroService는 한발 더 나아가 실행 환경까지도 추상화

---

## MicroService의 특징

### service 중심 : servcie가 일급 시민

- MicroService는 service endpoint를 API의 형태로 외부에 노출시키고 실질적인 세부 사항은 모두 추상화함
    - 내부의 구현 logic, architecture와 programming 언어, database, 픔질 유지 체계 같은 기술적인 사항들은 service API에 의해 철저하게 가려짐
- 개발 조직은 application 개발보다는 service 개발에 더 중점을 둠
- service에 대한 접근은 service endpoint인 API에 의해 제한됨
    - 외부 이용자는 이 API를 통해서만 service와 상효작용할 수 있음
- MicroService 안에 있는 service들의 특징
    - MicroService는 SOA의 특징을 어느정도 가지고 있음
    - SOA에서 정의됐던 많은 service 특징들은 MicroService에도 그대로 적용할 수 있음
    - SOA에서의 service들이 가지는 특징 중에서 MicroService에서도 적용할 수 있는 특징들
        1. service 계약
            - SOA와 비슷하게 MicroService도 분명하게 정의된 service 계약에 의해 작성됨
            - MicroService에서는 JSON, REST가 일반적으로 통용되는 service communication 방식
        2. 느슨한 결합
            - 독립적이고 서로 느슨하게 연결되어 있음
            - 대부분의 경우 MicroService는 event로 입력을 받고 event로 응답
            - 일반적으로 messaging, HTTP, REST가 MicroService 사이에서 communication의 수단으로 사용됨
            - message 기반의 endpoint는 결합도를 낮추는 고수준의 수단을 제공함
        3. service 추상화
            - MicroService에서 service 추상화는 단순히 service의 구현 실체를 추상화하는 것에서 그치지 않음
            - 모든 library와 제반 환경 전체를 추상화한 것
        4. service 재사용
            - MicroService는 덩어리째 재사용 가능한 service
                - mobile device나 desktop channel, 다른 MicroService 또는 아예 다른 외부 system에서도 접근 가능
        5. 무상태
            - 제대로 설계된 MicroService는 상태가 없으며, service에 의해 관리되는 어떤 공유 상태와도 아무런 정보도 공유하지 않음
            - 상태를 관리하게 요구 사항이 정의되어 있다면, database나 memory를 이용해서 상태를 관리함
        6. 탐색 가능한(discoverable) service
            - MicroService는 탐색을 통해 찾을 수 있음
            - 일반적인 MicroService 환경에서 MicroService는 자신의 존재를 스스로 드러내서 알리고, 탐색에 의해서 찾아지고 사용될 수 있게 함
            - service가 중지되면 MicroService는 자기 자신이 소속되어 있던 MicroService 환경에서 스스로를 제거함
        7. service 호환성(interoperability)
            - service는 표준 protocol과 message 교환 표준을 준수하기 때문에 호환성이 좋음
            - 전송 mechanism으로는 messaging이나 HTTP 등과 같은 표준 방식을 사용
            - REST/JSON은 호환성이 좋은 service를 개발하는 데 가장 널리 사용되는 방법
        8. service 조립성(composability)
            - MicroService는 조립이 가능
            - service 조립성은 service orchestration이나 service 연출(choreography)를 통해 확보할 수 있음

### 가벼움

- 하나의 business 범위에 맞춰 만들어지므로 하나의 기능만 수행함
    - 그 결과 대부분의 MicroService 구현체는 작은 공간만을 차지함
    - 따라서, web container와 같이 MicroService를 지원하는 기술을 선택할 때는 관리할 수 있는 수준 내에서 MicroService가 전체적으로 차지하는 공간을 통제할 수 있을만큼 그 기술이 가벼운지 꼭 확인해야함

### 다양한 언어로 구성할 수 있음

- 자율적이고 모든 것을 추상화해 service API 뒤에 숨기기 때문에 서로 다른 MicroService에서 서로 다른 architecture를 적용할 수 있음
- MicroService 구현체에서 볼 수 있는 공통점들
    1. 서로 다른 MicroService는 동일한 기술의 다른 version을 사용할 수 잇음
    2. 서로 다른 MicroService는 서로 다른 언어로 개발될 수 있음
    3. 서로 다른 MicroService는 서로 다른 architecture를 적용할 수 있음
- 각 MicroService의 특성에 맞게 언어, 기술, architecture를 적용할 수 있음

### MicroService 환경에서의 자동화

- 대부분의 MicroService는 개발 과정에서부터 운영에 이르기까지 전 과정을 최대한 자동화함
- MicroService는 일체형 application을 여러 개의 작은 service로 분리하므로, 대규모의 기업 system 안에는 많은 수의 MicroService가 존재할 수 있음
    - 이렇게 많은 수의 MicroService를 자동화하지 않으면, 관리 부담이 커짐
- 작은 공간만을 필요로 하는 MicroService의 특징 덕분에 개발에서 배포에 이르기까지의 과정을 상대적으로 쉽게 자동화할 수 있음
- 일반적으로 MicroService는 build 자동화, test 자동화, 배포 자동화, 확장 자동화 등 처음부터 끝까지 모든 과정을 자동화함

### MicroService를 지원하는 생태계

- 대분의 대규모 MicroService 구현체는 적재적소에 필요한 생태계(ecosystem)를 가지고 있음
    - devops process
    - 중앙 집중식 log 관리
    - service repository
    - API gateway
    - 광범위한 monitoring
    - service routing
    - 작업 흐름 통제 mechanism

### 동적이고 분산되어 있는 MicroService

- 성공적인 MicroService 구현체들은 logic과 data를 service의 내부로 캡슐화(encapsulation)함
- 통상적인 system과는 다른 특징
    - data 및 logic의 분산
    - 탈중앙화된 관리 체계
- 모든 logic과 data가 하나의 application 경계 내에 존재하는 전통적인 application과 비교할 때, MicroService의 data와 logic은 분산되어 있음
    - 각 service는 특정 business 영역에 맞춰져 있고, 그 business 영역의 data와 logic만을 포함함
- MicroService는 SOA에서 사용되던 집중화된 관리 체계를 사용하지 않음
    - MicroService 구현체의 공통적 특징 중 하나는 ESB; Enterprise Service Buss와 같은 무거운 enterprise급의 제품에 의존하지 않음
    - 그 대신에 business logic과 intelligence는 service 그 자체의 일부로서 내장됨

### 붕괴 저항성, 빨리 실패하기, 자체 치유

- 붕괴 저항성 (antyfragility)
    - Netflix에서 시험 적용해보고 성공을 거둔 기법
    - Nassim Nicholas Taleb가 그의 저서 "안티프레질: 불확실성과 충격을 성정으로 이끄는 힘"에서 소개한 개념
    - 현실에서 software system은 언제나 도전에 직면함
    - 붕괴 저항성이 적용된 software system은 이런 도건을 헤쳐 나가면서 진화하고, 시간이 지남에 따라 이런 도전에 대해 강한 내성을 가지게 됨
- 빨리 실패하기 (fail fast)
    - 장애를 견딜 수 있고, 회복력이 좋은 system을 구축하는 데에 사용되는 개념
    - 장애가 절대 발생하지 않는 system을 구축하기보다는 장애를 예상하고 대응할 수 있는 system을 만드는 쪽에 무게를 둠
    - 중요 point
        - system이 얼마나 빨리 실패하는지
        - 실패할 경우 얼마나 빨리 정상 상태로 복구할 수 있는지
    - 관심의 초점 이동 : 평균 무고장 시간(MTBF; Mean Time Betwwen Failure) -> 평균 복구 시간 (Mean Time To Recovery)
    - 장점 : 무엇인가 문제가 생겼을 때 스스로를 중지시키고 문제가 더 이상 전파되지 않게 함
- 자체 치유 (self-healing)
    - system이 장애로부터 학습을 하고 스스로를 장애에 적응시킨다는 개념
    - 미래의 장애를 어느 정도 예방할 수 있게 됨

---

## MicroService의 장점

### Polyglot Architecture 지원

- MicroService archtecture를 적용하면 architect와 개발자들은 주어진 scenario에 가장 적합한 기술과 architecture를 선택할 수 있음
    - 유연성을 바탕으로 더 비용 효과적인 방식으로 목적에 맞는 solution을 설계할 수 있음
- MicroService는 자율적이고 독립적이므로 각 service는 자신만의 고유한 architecture와 여러가지 version의 기술을 적용해서 구축하고 운영할 수 있음

### 실험과 혁신 유도

- MicroService는 다양한 실험을 시도해보고 빨리 실패하는 방식을 통해 기업들의 혁신 시도를 이끌어 냄
- 단순하고 크기가 작아 큰 비용을 치루지 않고도 새로운 process, algorithm, business logic 등을 여러 방식으로 실험해볼 수 있음
    - 대규모 일체형 application에서는 실험해보는 것이 쉽지 않고 간단하지 않으며 비용 효과적이지도 않음
        - 새로운 것을 도입할 때, 상당히 많은 돈이 필요함
    - MicroService architecture에서는 특정 목표 기능을 수행할 수 있는 작은 MicroService를 작성하는 것이 가능
        - 이런 MicroService를 기존 system에 reactive style로 끼워 넣어 사용할 수 있음
        - 적용 후, 기대했던 대로 동작하지 않으면 다른 MicroService로 변경, 대체할 수 있음
        - 변경에 따르는 비용이 일체형 접근 방식에 비하면 훨씬 적음

### 탄력적이고 선택적인 확장

- 작은 단위의 작업이기 때문에 필요한 service만을 선택해서 확장하는 선택적 확장과 service 품질(QoS; Quality of Service)을 구현할 수 있음
- 각각의 service를 개별적으로 확장하거나 축소할 수 있음
    - 선택적 확장이 가능하기 때문에 확장 비용이 상대적으로 적음
- Scale Cube의 3가지 application 확장 접근 방식
    1. x축 방향의 확장 : application을 복제해서 수평적으로 확장
    2. y축 방향의 확장 : 서로 다른 기능들을 분리하는 것
    3. z축 방향의 확장 : data partitioning 또는 sharding
- y축 방향의 확장이 일체형 application에 적용되면 일체형에 담겨있던 기능을 분리해서 business 기능에 맞게 더 작은 단위로 분리할 수 있음
    - 이 기법으로 일체형 application에서 벗어날 수 있음
    - 이런 분리를 통해 나오는 기능 단위들이 MicroService의 특징을 가지게 됨

### 대체 가능성

- MicroService는 자기 완비적이고 독립적으로 배포 가능한 module이기 때문에 하나의 MicroService를 비슷한 다른 MicroService로 대체할 수 있음
    - MicroService끼리는 느슨하게 연결되어 있고 독립적이기 때문

### 유기적 system 구축 유도

- 유기적인 system : 시간이 지남에 때라 점점 더 많은 기능을 추가하면서 성장해가는 system
- application은 전체 lifecycle 동안 커지게 되고, 유지 관리성이 떨어지는 것이 대부분
- MicroService에서는 필요에 따라 service를 점점 더 많이 추가하면서도 기존 service에 미치는 영향을 최소화할 수 있음
    - 유기적인 system을 만드는 데에 많은 자본 투자를 필요로하지 않으며, 운영 비용의 일부를 통해 지속적으로 구축해가는 것이 가능

### 기술 부채 경감

- 시대에 뒤떨어져 수명이 다한 기술을 사용하는 service를 다른 기술을 쓰는 service로 최소한의 비용으로 전환할 수 있음
    - 크기가 작고 최소한의 의존성만을 가지고 있기 때문
- 예를 들어 EJB 1.1과 Hibernate로 작성된 500만 주의 application을 Spring, JPA, REST service로 upgrade하는 것은 전체 application을 새로 개발하는 것과 거의 비슷한 노력과 비용이 들어감
- MicroService에서는 이런 upgrade를 통째로 진행하지 않고 점진적으로 진행할 수 있음

### 다양한 version의 공존

- service 자체뿐만 아니라 service의 실행 환경도 함께 packaging하기 때문에 다양한 version의 service가 동일한 환경에 공존할 수 있음
- 때때로 동일한 service지만 version이 다른 다수의 service를 동시에 운영해야하는 상황이 있을 수 있음 (ex. 무중단 upgrade)
    - 무중단 upgrade 시에는 일시적으로 두 개의 version이 동시에 운영됨
    - MicroService는 Tomcat이나 Jetty 같은 service listener를 포함해서 각자 독립적인 환경을 사용함
        - 다수의 version이 있어도 별다른 issue 없이 매끄럽게 출시할 수 있음

### 자기 조직화 system 구축 지원

- MicroService는 자기 조직화(self-organizing) system을 만드는 데에 도움이 됨
    - 자기 조직화 system을 지원함으로써 배포를 자동화할 수 있고, 회복력, 자기 치유력, 자기 학습 능력을 보유할 수 있음
- 입력과 출력에 기초해 service는 기존 생태계에 자기 조직적으로 융화될 수 있음
    - 어떤 추가적인 code 변경이나 service orchestration도 필요하지 않음
    - 제대로 설계된 MicroService architecture에서 하나의 service는 다른 service에 대해 알지 못하기 때문
        - 전체 system에 대한 영향도 분석을 하지 않고도 기존 system 생태계에 어떤 service라도 쉽게 추가할 수 있음
    - process를 통제하고 조율하는 중앙 집중적인 관리 주체는 존재하지 않음

### Event 주도 architecture 지원

- MicroService는 투명한 software system을 개발하는 데에 도움을 줌
- 전통적인 system은 고유의 native protocol을 통해 의사소통하기 대문에 일종의 black box application처럼 동작함
    - 명시적으로 발행되지 않으면 business event와 system event는 이해하고 분석하기가 어려움
    - 그러나 현대적인 application은 business 분석과 system의 동적 거동(behavior)의 이해, 시장 trend 분석을 위해 data를 필요로 하며, 실시간 event에도 응답해야 함
    - event는 data를 추출하는 데에 적합한 mechanism
- 제대로 설계된 MicroService architecture는 언제나 입력 및 출력 event를 사용해서 동작
    - 이런 event는 어떤 service에서든 접근해서 연결될 수 있음
    - 일단 추출되기만 하면 event는 아주 다양한 방식으로 사용될 수 있음

### DevOps 지원

- MicroService는 DevOps를 가능하게 도와줌
- DevOps는 Agile 개발, 빠른 속도의 출시 주기, 자동화된 test, 자동화된 infrastructure provisioning, 자동회된 배포를 적극적으로 지지함
    - 전통적인 일체형 application에서는 이런 모든 process를 자동화하는 것은 매우 어려움
- MicroService는 많은 DevOps 구현체의 중심에 자리잡고 있음
    - 많은 DevOps 도구와 기술을 MicroService를 사용하면서 진화하고 있음
- MicroService는 더 작고 개발에 중점을 두는 Agile한 개발 team의 조직을 가능하게 함
    - MicroService의 경계에 맞게 개발 team을 조직할 수 있음
- 작은 규모의 MicroService는 test 진화적이며, DevOps의 요구 사항들을 더 쉽게 만족시킬 수 있음

---

## MicroService 설계 Guideline

### MicroService 경계 설정

- MicroService는 대체 얼마나 커야(mini 일체형) 하는지 또는 얼마나 작아야(nano service) 하는지 
    - ex) 'MicroService 하나당 하나의 REST endpoint', '300 line 이하의 code', '하나의 책임만을 지는 component'
    - 예시의 기준 중에서 하나를 고르기 전에 service의 경계를 이해하기 위해 분석해야 할 것들이 많음
- MicroService의 경계를 설계하는 가장 실용적인 방법은 손으로 scenario를 돌려보는 것
    - 가능한 여러가지 선택 사항에 대해 service litmus test를 하는 것과 비슷
    - 주어진 scenario에 적합한 여러가지 조건이 있을 것이고, 장단점 분석을 해야함
1. 자율적인 기능
    - 자율적인 service는 일반적으로 외부 기능에 대한 의존도가 낮음
        - 입력을 받아 내부의 logic과 data로 계산해서 결과를 반환
        - ex) 암호화 engine, 알림 engine 같은 utility 기능
2. 배포 단위의 크기
    - 좋은 MicroService라면 배포 단위의 크기를 관리할 수 있는 수준 이내로 유지할 수 있어야 함
        - MicroService 생태계는 통합, 제품 인도, 배포, 확장 등의 자동화에서 오는 장점을 가질 수 있어야하기 때문
        - 배포 규모가 크면 file 복사/download 및 배포 자동화와 service 구동 시간에 있어 좋지 않은 영향을 줌
3. 분리하기에 가장 적합한 기능 또는 subdomain
    - 일체형 application에서 어떤 component를 떼어내 분리하는 것이 가장 효과적인지 분석
        - 자원 소모량, 소유 비용, business 효용성, 유연성 측면이 분석 기준이 될 수 있음
    - 예시) 예약 system
        - 예약 system은 전체 요청의 50%~60%가 검색에 관한 것임
        - 이런 경우 검색을 분리시키면 유연성, business 효용성, 비용 절감, 자원 절약 등의 효과를 바로 얻을 수 있음
4. poliglot architecture
    - 다양한 비기능/기능적 요구 사항을 충족시키려면 component마다 다른 architecture, 다른 기술, 다른 배포 topology 등 다양한 처방이 필요
        - topology(망구성 방식) : computer network의 요소들(link, node 등)을 물리적으로 연결해 놓은 것, 또는 그 연결 방식
    - component가 식별되면 poliglot architecture 관점에서 요구 사항을 다시 한 번 검토하는 것이 좋음
5. 선택적 확장
    - poliglot architecture와 관련이 있음
    - 모든 기능 module이 모두 동일한 수준의 확장성을 필요로 하지 않음
    - 따라서 확장에 대한 요구 사항을 기준으로 MicroService의 경계를 설정하는 것이 적절할 때가 종종 있음
6. agile team과 협력 개발
    - MicroService는 전체 중에서 서로 다른 일부를 개발하는 데에 집중할 수 있는 작고 집중력 있는 team 구성을 통해 agile 방식의 개발을 가능하게 해줌
        - 또 system의 일부를 다른 조직에서 개발할 수도 있고, 지리적으로 다른 위치에서 또는 기술 set가 서로 다른 team에 의해서도 만들어질 수 있음 (제조업에서 볼 수 있는 방식)
    - MicroService 세상에서는 각 team이 서로 다른 MicroService를 만들고 나중에 하나로 조합할 수 있음
        - 이런 방식이 그다지 바람직한 방식은 아니라고 해도 이런 상황으로 결론 날 수도 있음
        - 따라서, 이런 방식을 현실적으로 완전히 배제하는 것은 불가능
    - 예시) online 제품 검색 scenario
        - 고객에 검색했던 내용을 바탕으로 개인화된 추천 service를 제공
        - 복잡한 machine learning algorithm 필요하므로 전문가 team이 필요함
        - 이럴 때, 개인화 추천 service 기능을 별도로 분리된 전문가 team에서 개발할 수 있음
7. 단일 책임
    - 단일 책임 원칙에서 하나의 책임이 여러 MicroService와 공유될 수 없는 것처럼, 하나의 MicroService는 여러가지 책임을 담당해서는 안됨
        - 이론적으로 단일 책임 원칙(SRP; Single Responsibility Principle)은 method, class, service 수준에 적용되는 개념
            - 하지만 MicroService 환경에서는 하나의 책임을 반드시 단 하나의 service나 endpoint와 짝지을 필요 없음
            - 하나의 business 범위 또는 하나의 기술 범위로 치환해서 생각하는 것이 더 현실적인 방식
8. 복제 가능성과 변경 가능성
    - MicroService 경계는 MicroService가 전체 system에서 최소한의 재작성 비용 투입만으로 쉽게 떼어져 나올 수 있는지를 기준으로 식별되어야 함
        - service가 단지 실험적인 부분을 담당한다면 그 부분이 MicroService로 분리하기에 이상적
    - 점점 많은 회사에서 몇 가지 service만을 조합해서 실행 가능한 최소 제품(MVP; Minimum Viable Projects)을 먼저 만들고 system을 점차 진화시켜나가는 방식을 선택하고 있음
        - MVP 방식에서 MicroService는 핵심적인 역할을 담당함
9. 결합과 응집
    - 결합(coupling) and 응집(cohesion) == service 경계를 결정짓는 데에 가장 중요한 기준
    - 너무 많은 정보 교환, 너무 많은 동기적(synchronous) 요청-응답 사용, 순환 의존 관계, 이렇게 세 가지 요소는 system을 망가뜨리는 주요 원인이 될 수 있음
    - MicroService 사이의 의존 관계는 높은 결합도가 형성되지 않게 주의해야함
        - 기능 분해도는 의존 관계 tree와 함께 MicroService의 경계를 수립하는 데에 도움이 됨
    - MicroService 내부에서도 높은 응집도와 낮은 결합도를 유지하는 것이 성공 방정식
    - transaction 범위가 하나의 MicroService 범위를 넘어서 여러 MicroService에 걸치지 않게 해야함
10. MicroService를 하나의 제품으로 생각하기
    - MicroService를 그 자체로 하나의 제품이라고 생각해보기
        - DDD(Domain 주도 설계)는 경계지어진(bounded) context를 하나의 제품과 짝짓는 것을 권장함
            - DDD에서는 하나의 경계 지어진 context가 하나의 제품이 될 수 있는 이상적인 후보가 됨
        - 제품 경계는 대상 community, 배포 유연성, 시장성, 재사용성 등 다양한 변수들로 구성됨

### 통신 방식 설계

- MicroService 사이의 통신은 요청-응답 형태로 진행되는 동기 방식, 발동-망각(fire and forget) 형태로 진행되는 비동기 방식으로 설계할 수 있음
1. 동기 방식 통신
    - 동기 방식 통신에서는 공유되는 상태나 객체가 없음
        - 요청자는 처리에 필요한 정보와 함께 요청을 service에 날리고 응담을 기다림
    - 장점
        - application은 상태가 없고, 고가용성 관점에서 보면 실행 중인 instance가 traffic을 나눠 받을 수 있음
        - 공유 message server 같은 infra structure 상에서의 의존 관계가 없으므로 관리에 드는 노력이 상대적으로 적음
        - 어떤 단계에서 error가 발생하더라도 system은 data 통합성(integrity)을 양보하지 않고도 일관성 있는 상태를 유지하며, error는 요청자에게 즉시 반환됨
    - 단점
        - 요청-응답 형식의 통신이기 때문에 사용자(요청자)는 응답 처리가 완료될 때까지 기다려야 함
            - 호출하는 thread가 응답을 기다려야하기 때문에 system의 확장성이 좋지 않음
    - 동기 방식은 MicroService 사이에 고정적인 의존 관계를 추가하는 경향이 있음
        - 하나의 service chain에서 문제가 생기면 전체 service chain이 제대로 동작하지 못하게 됨
        - service가 성공적이려면 의존 관계에 있는 모든 service가 제대로 돌아야 함
        - 실패 scenario 중 많은 부분을 timeout과 fallback을 통해 해결할 수 있음
2. 비동기 방식 통신
    - 장점
        - 비동기 방식은 MicroService 사이의 결합을 해소하는 reactive한 event loop 방식에 바탕을 줌
            - 이 방식에서는 service가 독립적이고, 요청을 처리하는 thread를 내부적으로 재생산해서 부하의 증가를 처리할 수 있음 -> 더 고수준의 확장성 제공
                - 부하가 증가하면 message는 message queue에 보내지고 나중에 처리됨
            - 하나의 service에 문제가 생기더라도 전체 경로에 영향을 주지 않음
            - 이를 통해 service 사이의 결합도를 낮추고 유지 관리와 test도 수월하게 할 수 있음
    - 단점
        - 외부의 messaging server에 의존하게 됨
        - messaging server가 장애를 견딜 수 있게 처리하는 것이 이려움
        - messaging system의 지속적인 가용성을 확보하는 것이 어려움
            - messaging은 활성/비활성 기준으로 동작하기 때문
        - messaging은 일반적으로 영속성을 사용하게 되므로, 더 높은 수준의 I/O 처리와 tuning이 필요함
- 동기와 비동기, 선택의 기준
    - 두 방식을 적절히 조합해서 사용해야함
        - 원칙적으로 비동기 방식은 확장성이 뛰어난 MicroService system을 만드는 데에 적합함
            - 그러나 모든 것을 비동기 방식으로 modeling하면 system 설계가 매우 복잡해짐
        - 오직 하나의 방식만 사용해서 system을 개발하는 것은 불가능함
    - 효과적으로 개발하기 위해서 먼저 요청-응답의 동기 방식으로 시작해서 나중에 필요하다고 판단될 때 비동기 방식으로 refactoring하기도 함
    - 일반적으로는 MicroService 세상에서 비동기 방식이 더 나은 경우가 많지만, 장단점을 잘 따져서 적합한 pattern을 선별해야함
    
### MicroService Orchestration

- 조립성(composability)은 service design 원칙 중 하나이며, service를 조립하는 쪽에 복잠함이 집중됨
- orchestration 방식
    - 여러 개의 service를 모아 하나의 완전한 기능을 만듬
    - Orchestrator가 중앙의 두뇌 역할을 담당
    - 순차 처리 또는 병렬 처리가 중심 process에서 가지를 쳐서 나올 수 있음
    - 각 task는 일반저긍로 web service 같은 가장 작은 단위의 원자적 task service에 의해 수행됨
    - SOA에서는 ESB; Enterpricse Service Bus가 Orchestrator 역할을 담당
    - 조율된 service가 조립 service로서 ESB에 의해 외부로 노출됨
- 연출(choreography) 방식
    - 연출 방식에서는 중앙의 두뇌 같은 것이 없음
    - event 생산자(producer) 쪽에서 예약 event가 발생되면 다수의 event 소비자(consumer)는 event를 기다리고 있다가 event 별로 독립적으로 다른 logic을 적용
    - event는 때때로 event 소비자가 다른 service에 의해 소비될 event를 보낼 수도 있는 형식으로 중첩되기도 함
    - SOA 세상에서는 호출자가 ESB에 message를 push하면 그 이후의 처리 흐름은 그 message를 소비하는 service에 의해 자동으로 결정됨
- MicroService는 자율적
    - MicroService의 기능이 실행되는 데에 필요한 component가 그 service 내에 존재해야 함
        - database, 내부 service의 orchestration, 내부 상태 관리 등
    - service endpoint는 조금 큰 단위로 나눠진 API를 제공
        - 외부에서 더 이상의 접점을 필요로 하지 않으면 이 정도로도 충분
        - 그러나 실제로는, MicroService는 자신으 임무 완수를 위해 다른 MicroService와 의사소통할 수도 있음
    - MicroService가 다른 MicroService와 의사소통하는 경우에는 다수의 MicroService를 한데 묶어 연결할 수 있는 연출 방식이 더 적합
    - 하지만 대규모 process와 상호작용, 작업흐름(workflow)을 다룰 때는 연출 방식은 지나친 복잡함을 유발할 수 있음
        - Netflix는 대규모 MicroService orchestration을 관리할 수 있는 opensource 도구 Conductor를 만듬
        - 모든 사례를 연출 방식으로 modeling하는 것은 불가능함

### MicroService 하나에 얼마나 많은 endpoint를 둘 것인가

- endpoint(종단점)의 수는 매우 중요하지는 않음
    - 어떤 경우에는 하나의 MicroService에 하나의 endpoint만 있을 수도 있음
    - 다른 경우에는 하나의 MicroService에 여러 개의 endpoint가 있을 수도 있음
- polyglot architecture에서도 여러 개의 endpoint를 서로 다른 MicroService에 하나씩 할당할 수도 있음
- 결론 : endpoint의 수는 중요한 결정 사항이 아님
    - 하나의 MicroService는 하나 또는 그 이상의 endpoint를 가질 수 있음
    - MicroService 크기에 적합하게 경계 지어진 context를 적절하게 설계하는 것이 훨신 중요함

### 가상 machine 하나당 하나의 MicroService 또는 다수의 MicroService?

- 하나의 MicroService는 확장성 및 가용성을 확봏하기 위해 여러 개의 virtual machine에 복제되어 배포될 수 있음
- 많은 bender들은 core당 lisence 비용을 부과함
    - 따라서 하나의 virtual machine에 transcation 규모가 작은 MicroService 하나씩만 배포해서 여러 개의 virtual machine을 운용하는 것은 비용 효율적이지 않음
- 아래의 질문에 모두 No라고 답할 수 있다면, 나중에 배포 topology(구성 및 연결 구조)에 변화가 생기기 전까지는 여러 개의 MicroService를 하나의    virtual machine에서 실행하는 방식으로 시작할 수 있음
    - virtual machine이 최대 사용자를 기준으로 두 개의 service를 운영하기에 용량이 부족한가?
    - service 수준 합의서(SLA; Service Level Agreement)를 충족시키기 위해 service등리 별도로 처리되어야 하는가?
        - ex) 확장성과 관련해 여러 MicroService가 하나의 virtual machine에서 실행된다면 해당 virtual machine을 복제해야 함
    - 자원 요구 사항이 서로 충돌되지는 않는가?
        - ex) 서로 다른 OS나 JDK version 등으로 충돌되는 사항이 없는지 확인 필요
    
### Rule Engine: 공유 또는 내장?

- 결론 : 내장되어 있는 rule engine이 MicroService에는 더 적절함
- rule은 어떤 system은 어떤 system에서든 필수적인 요소임
    - 많은 기업에서는 rule을 rule 저장소에서 관리하면서 중앙 집중적으로 실행하기도 함
        - 기업에서 사용되는 rule engine은 기업이 rule을 만들고 관리하는 것뿐 아니라 중앙의 저장소에 있는 rule을 재사용할 수 있게 대후는 데에 주로 사용됨
    - rule engine은 생선성을 높이고 rule, 사실 정보, 용어의 재사용을 가능하게 하며, Rete algorithm을 통해 rule을 더 빨리 실행할 수 있게 해줌
        - Rete algorithm : rule engine에서 규칙을 더 빠른 속도로 pattern matching하기 위한 graph 기반의 algorithm
- MicroService의 목표는 외부에의 의존성을 줄이는 데에 있기 때문에 공유하여 사용하는 것은 좋지 않음
    - MicroService 환경에서 중앙에 rule engine을 두게 되면 여러 MicroService가 중앙의 rule engine을 호출하게 됨
        - service logic이 두 군데에 있음을 의미함
            - 일부는 service에 존재하고 일부는 외부의 service에 존재하게 됨

### BPM의 역할과 작업 흐름

- BPM; Business Process Management과 iBPM; Intelligent Business Process Management
    - business process의 설계, 실행, monitoring을 담당하는 도구 set
    - 사용 사례
        - 오래 지속되는 business process
            - 일부 process는 기존 자산으로부터 도출되고, 일부 process는 기존 자산에서 도출되지 않으며 현재 process에 구체적인 구현체가 없음
            - BPM은 이런 두 가지 type을 조합할 수 있게 해주며, 전 구간을 아우르는 자동화 process를 제공
        - process 중심 조직
            - 6σ(6 sigma)를 도입해서 지속적인 효율 개선을 위해 process를 monitoring하기 원하는 조직
        - 조직의 business process를 재정의하는 top-down 방식의 process reengineering
    - BPM은 system과 사람의 상호작용을 자동화함으로써 전 구간의 여러 기능에 걸쳐있는 business process를 modeling하는 상황에서 여러 개의 MicroService를 조합하는 상위 수준에서 사용될 수 있음
        - 아래의 scenario 중 두번 째가 더 간단하고 나은 방식
            - MicroService가 상태 변화 event를 공급
            - business process dashboard를 보유
- BPM이 MicroService 세상에 잘 들어맞는 두 가지 scenario
    1. business process reengineering이나 앞에서 언급했던 오래 지속되는 전 구간 business process를 다루는 것
        - 이 scenario에서 BPM은 조금 큰 덩어리로 나눠진 여러 개의 MicroService와 기존 legacy 연결부, 사람과의 상호작용을 엮어서 여러 기능에 걸쳐 오래 지속되는 business process를 자동화할 수 있는 높은 수준에서 작동함
        - 또한 MicroService는 하위 process를 구현하는 화면 없는 service 역할을 담당
            - MicroService의 관점에서 보면 BPM은 MicroService를 이용하는 또 하나의 소비자일 뿐
    2. process를 monitoring하고 효율을 높이기 위해 최적화하는 것
        - 이 작업은 완전하게 자동화된 비동기 연출 방식의 MicroService 생태계와 협업하는 방식으로 처리됨
        - 이 scenario에서 MicroService와 BPM은 독립적인 생태계로서 존재
            - MicroService는 process의 시작, 상태의 변경, process의 종료 등과 같은 여러가지 시간 frame에 걸쳐 event를 전송
            - BPM은 받은 event를 process 상태를 구성하고 monitoring하는 데에 사용

### MicroService가 data store를 공유할 수 있는가?

- MicroService는 표현 계층, business log, data store를 추상화해야 함
- guideline에 따라 service가 분리된다면 각 MicroService는 논리적으로 독립적인 database를 사용할 수 있음
    - 공유 data model, 공유 schema, 공유 table은 매우 좋지 않음
        - 처음에는 좋을 수 있지만, 복잡한 MicroService를 개발하다 보면 data model 사이에 계속 관계를 추가하고, join query를 만들어내게 됨 -> 단단하게 결합된 물리 data model이 될 수도 있음
    - ex) 고객 등록 MicroService와 고객 분류 MicroService가 있을 때
        - 나쁜 예 : 고객 등록 MicroService과 고객 분류 MicroService 모두 고객 정보 저장소를 사용
        - 좋은 예
            - '고객 data 저장소 MicroService'를 따로 두기
            - '고객 등록 MicroService'는 '등록 data'에만 접근
            - '고객 분류 MicroService'는 '분류 data'에만 접근
            - 고객 등록과 분류가 진행될 때, 각 MicroService는 각자의 data에만 접근하고, 갱신 정보를 따로 '고객 data 저장소 MicroService'로 보냄
                - '고객 data 저장소 MicroService'는 공통 저장소에 접근하여 data 변경
    - MicroSErvice가 data 호수(data lake)나 master data 관리 등 공통 data 저장소(common data repositories)같은 기업    저장소를 공유하애만 하는 scenario에서는 어쩔 수 없이 공유 data를 사용할 수 밖에 없음
        - 이럴 때는 해당 data 저장소에 직접 붙는 대신 service interface를 둬서 MicroService와 data 저장소를 간접화하고 결합 관계를 끊는 것이 필요함

### MicroService는 꼭 화면이 필요한가?

- Headless MircoService : UI 없이 사용되는 경우
- 화면 없는 MicroService는 동일한 하나의 service가 Audio UI; User Interface, ChatBot, 몸짓 기반 UI(gesture-based UI), Wearable UI 등 여러 channel을 통해 외부에 service를 제공할 때 사용됨

### Transaction 경계 설정

- 가동 중인 system에서 transaction은 여러 개의 작업을 하나의 원자적 block으로 group지어 처리함으로써 RDBMS에서 data의 일관성을 유지하는 데에 사용됨
    - 'commit으로 모두 함께 확정' or 'rollback으로 모두 취소'
- transaction의 경계는 local transaction을 이용해서 MicroService를 벗어나지 않게 정의해야함
    - 분산된 global transaction은 피하기
    - 적절한 의존 관계 분석을 통해 transaction 경계가 두 개의 서로 다른 MicroService로 확장되지 않게 해야함

### Service endpoint 설계 고려 사항
- service 설계의 두 가지 핵심 요소 : 계약 설계, protocol 선택
- 계약 설계 (contract design)
    - 가장 중요한 것은 '단순함'
        - service는 소비자가 소비할 수 있게 설계되어야 함
        - 복잡한 service 계약은 service의 사용성을 떨어뜨림
    - KISS; Keep It Simple Stupid : 바보스러울 만큼 단순함 유지
        - 더 나은 양질의 service를 더 빠르게 구축하고 유지 관리와 교체에 드는 비용을 줄여줌
    - YAGNI; You Ain't Gonna Need It : 필요없는 기능은 만들지 않기
        - 미래의 요구 사항을 예측하고 system을 만들어도 그것이 미래에도 실제로 경쟁력을 가진다는 보장 없음
        - 미래 요구 사항에 너무 집중하면 초기 단계부터 많은 투자를 하게 됨
            - 유지 관리 비용 증가
    - 진화적 설계 (evolutionary design)
        - 현재 필요한 만큼만 충분히 설계
        - 새로운 기능이 필요할 때 설계를 변경하고 refactoring을 지속
        - 그러나 강력한 통제 수단이 없다면 쉽지 않음
    - 소비자 주도 계약 (CDC; Consumer Driven Contracts)
        - 진화적 설계에 도움
        - 사용자가 원하는 기대 사항을 service 제공자에게 test case의 형태로 제공하게 하는 것
            - service 계약이 변경되면 모든 application을 test해서 검증해야함
            - 이는 변경을 어렵게 만드는 문제가 있음
            - 따라서, service 계약이 변경될 때마다 service 제공자가 통합 test할 수 있게 함
    - 포스텔의 법칙 (Postel's law)
        - service를 설계할 때 service 제공자는 사용자의 요청을 받을 경우 가능한한 유연해야 함
        - 반면, 사용자는 service 제공자와 동의한 계약에 맞게 사용해야 함
- protocol 선택(protocol selection)
    - MicroService는 application은 물리적으로 독립적으로 배포 가능한 여러 service로 나눔 (느슨한 결합)
        - 이렇게 하면 communication 비용이 높아지고 network 통신 실패에도 더 취약해질 수 있으며 service 성능이 좋지 않게 나올 수 있음
    - message 지향 service
        - 비동기 통신 방식은 사용자와의 연결이 끊어지므로, 응답 시간은 직접적으로 영향 받지는 않음
            - 이 경우에는 표준 JMS나 AMQP protocol로 JSON data를 교환할 수 있음
        - HTTP를 이용한 messaging도 복잡도를 줄여주는 장점이 있어 널리 사용됨
            - 비동기 REST도 처리 가능하며, 처리 시간이 오래 걸리는 service에 적합
    - HTTP와 REST endpoint
        - HTTP는 상태를 유지하지 않으므로 밀접하게 연결되지 않으면서 상태를 유지하지 않는 service를 처리하는 데에 적합함
            - 호환성이 좋아 protocol 처리, traffic routing, load balancing, 보안 system 등에 적합
        - REST + JSON == 개발자들이 기본으로 선택하는 option
            - HTTP/REST/JSON protocol stack을 사용하면 호환성이 좋은 system을 쉽고 간단하게 만들 수 있음
    - 최적화된 통신 protocol
        - service 응답 시간이 매우 중요한 상황이라면, 통신 부분에 특별히 더 주의해야 함
            - 이런 경우엔 service 사이의 통신에 Avro, Protocol Buffers, Thrift 같은 protocol을 사용할 수도 있음
                - 그러나 호환성 떨어짐 (성능과 호환성은 trade off 관계)
    - API 문서화
        - 좋은 API는 단순하면서도 충분하게 문서화되어야 함
        - REST 기반 service의 문서화 지원 도구
            - Swagger, RAML, API Blueprint 등

### 공유 library 처리

- MicroService의 자율성과 자기 완비성을 준수하기 위해 code와 library를 복제해야하는 상황이 있을 수 있음
    - 요소 기술을 다루는 library 또는 기능 component 등
- 의존 관계의 추가와 code 중복 사이에 발생하는 trade off
    - 의존 관계를 추가하는 것보다는 code를 중복해서 따로 가지고 있는 것이 출시 관리나 성능에서 더 나음
    - 그러나 이는 DRY 원칙에 어긋남
        - DRY 원칙 : "모든 지식은 하나의 system 안에서 오직 하나의 모호하지 않은 (원본의 )권위를 가진 표현으로 존재해야 한다"
- code를 중복해서 내장하는 방식
    - 단점 : bug fix나 개선 사항이 있을 때 중복되어 있는 모든 곳에 별도로 반영해야 함
        - 하지만 각 MicroService는 서로 다른 version의 library를 갖고 있을 수도 있으므로 크게 문제가 되지 않음
- 공통되는 부분을 별도의 MicroService로 떼어내는 것도 가능, 그러나 신중해야 함
    - business 범위나 분류 관점에서 봤을 때, 하나의 MicroService로 분류되지 않는 부분을 공통이라는 이유만으로 별도의 MicroService로 떼어낸다면 '효용'보다 '복잡성 증가'라는 비용이 더 클 수도 있음
    - 여러 service에 공통 library를 복제하는 것과 통신 관점에서의 overhead도 trade off 관계

### MicroService에서의 사용자 interface

- MicroService 원칙은 하나의 MicroService를 database에서 표현 계층까지 모두 포함하도록 하는 것
    - UI, business logic, database 모두를 담음
- mobile application에 의한 시장 진입도 MicroService와 같은 접근 방식이 많아지는 원인 중 하나
    - 화면 없는 MicroService를 만들고, 화면 표시 영역은 mobile team에서 담당

### MicroService의 API gateway

- client 측 javascript framework(Angular, Vue, React, ...)가 발전함에 따라 server는 화면까지 제공하기보다는 RESTful service를 노출하는 방식으로 개발되고 있음
    - 이 방식의 두 가지 문제 : 계약에 대한 기대 사항의 불일치, 하나의 page를 rendering하기 위해 server에 여러 번의 요청을 날리게 됨
    - 계약 불일치
        - SOA에서는 ESB나 mobile middleware가 client를 위한 data 변환을 담당
        - MicroService에선 모든 요소르 ㄹ읽어오고, 필요한 요소만을 filtering하는 일을 client가 담당함
            - 불필요한 정보도 한께 전송되므로 network overhead가 발생함
        - 해결법
            1. HATEOAS 방식으로 최소한의 정보만을 link 정보와 함께 전달하는 것
                - client는 기본 정보를 받고 상세한 정보는 link를 통해 얻을 수 있음
            2. client가 REST 요청을 보낼 때, query 문자열로 필요한 field를 지정해서 요청을 보내는 것
                - 단점 : query 문자열에 담겨있는 field를 filtering하는 server 측의 logic이 복잡해짐
                - server는 들어오는 query에 따라 다른 요소들을 반환해야 함
            3. 간접화 개념 사용
                - client와 server 사이에 있는 gateway component가 data 소비자의 명세에 따라 data를 변환
                - 장점 : backend service와의 계약을 변경할 필요가 없음
                    - UI service로 바로 이어짐
    - API gateway는 backend의 proxy 역할을 수행하며, data 소비자에게 특화된 API를 외부에 노출시킴
    - API gateway 배포 방법
        1. MicroService당 하나의 API gateway를 두는 방식
        2. 하나의 공통 API gateway가 뒤에 있는 여러 service에 접근하는 방식

### ESB 및 iPaas와 MicroService의 사용

- ESB; Enterprise Service Bus
    - 핵심 기능 : protocol 중재, 변환, orchestration, application adaptor 기능
        - SOA의 구현에서 핵심적인 역할을 담당
            - MicroService에서는 이런 기능이 그다지 필요하지 않음
    - enterprise ESB는 천성적으로 무거우며, 대부분의 상용 ESB는 cloud 친화적이지 않음
    - MicroService에 적합하게 기능이 제한된 ESB 역할은 API gateway 같은 더 가벼운 도구로 대체할 수 있음
    - MicroService에서는 중앙의 orchestration 기능이 존재하지 않음
        - orchestration 기능은 ESB의 bus에서 MicroService로 이동됨
    - MicroService에서 protocol 중재 기능은 사용하지 않음
        - REST/JSON 호출과 같은 더 범용적인 message 교환 방식을 사용
    - MicroService에서는 service 스스로가 구체적인 구현체를 제공하므로 legacy connector도 필요하지 않음
        - ESB의 legacy system과 연결해주는 adaptor 기능이 필요하지 않음
    - 그러나 모든 service가 MicroService로 만들어지지 않기 때문에 여전히 필요함
        - legacy service는 MicroService와 연결하기 위해 여전히 ESB를 사용할 것임
        - enterprise 수준에서 legacy와의 통합과 solution회사의 application을 통합하는 데에 필요
- iPaaS; intergration Platform as a Service
    - 차세대 application 통합 platform
    - MicroService에 접근하기 위해 API gateway를 호출함
    - ESB의 입지를 줄어들게 함

### Service Versioning 고려 사항

- 나중이 아닌 미리 고려해야할 사항
- MicroService에 하나 이상의 service가 있는 경우, versioning이 복잡해질 수 있음
    - service version 번호는 service 내의 단위 기능(operation) 수준에서 적용하는 것보다 service 수준에서 적용하는 것이 더 간단함
        - 단위 기능 (operation)
            - GreetingService 안에 sayHello()와 sayGoodBye()라는 두 개의 method가 있음
            - '/greetings/hello'와 '/greetings/goodbye'라는 REST endpoint로 노출됨
            - 이 때, sayHello와 sayGoodBye는 GreetingService의 단위 기능
    - 하나의 단위 기능에 변화가 생기면 다음과 같이 service가 upgrade 되고 새로운 servion으로 배포됨
        ```
        /api/v3/greetings        // service 수준
        /api/v3/greetings/v3.1/sayhello        // service 및 단위 기능 수준
        /api/greetings/v3/sayhello        // 단위 기능 수준
        ```
    - REST service에서 사용할 수 있는 versioning 방식
        1. URI versioning
            - version 번호가 URI 자체에 포함됨
            - service 사용자에게 더 편리한 방식
            - 단점 : URI 자원이 version을 중첩되게 포함하기 때문에 복잡해보임
                - service의 여러 version을 cache해야하는 문제 등 실제로 media type 방식에 비해 cliend를 새 version으로 이관하기가 더 복잡함
            - Google, Twitter, LinkedIn, Salesforce 등 거대한 internet 회사들 대부분이 URI 방식 사용
        2. media type versioning
            - client 측의 HTTP Accept header에서 version 번호를 지정
        3. custom header
            - 별로 효과적이지 않음

### Cross Origin 설계

- MicroService에서는 service가 동일한 host나 동일한 domain에서 운영된다는 보장이 없음
    - 조합형 UI web application은 한 작업을 완료하기 위해 다른 domain이나 host에 있는 여러 개의 MicroService를 호출할 수도 있음
- CORS; Cross Origin Resource Sharing(domain 간 자원 공유)는 browser client가 다른 domain에 있는 host에서 실행되고 있는 service에 요청을 보낼 수 있게 해줌
    - MicroService architecture에서 반드시 필요함
- 설계 방법
    1. 신뢰하는 다른 domain으로부터의 cross origin 요청을 모든 MicroService가 허용하도록 하기
    2. client가 신뢰하는 domain에 API gateway를 두는 것

### 공유 참조 data 처리

- master data나 참조 data의 관리 문제
    - 대규모 application을 분리할 때 공통적으로 나타나는 문제임
    - ex) 도시 master data, 국가 master data 등은 항공 schedule, 예약 등 많은 service에서 공통으로 사용됨
- 해결 방법
    1. 상대적으로 정적이고 변경될 가능성이 전혀 없는 data는 각 service에서 hard code로 집어넣는 방법
    2. 공통으로 사용되는 		data를 별도의 MicroService로 빼는 방법
        - 장점 : 깔끔함
        - 단점 : 모든 service가 master data를 여러 번 호출할 필요가 있을 수도 있음
    3. data를 모든 MicroService에 복제하는 방법
        - data의 유일한 소유자가 없으며, 각 service가 필요한 master data를 소유함
        - 장점 : 성능 친화적
        - 단점 : 모든 service에 code를 복제해야 함 -> 모든 MicroService에 걸쳐 data를 동기화하고 유지하는 것이 복잡하게 됨
        - code base나 data가 단순하고 비교적 정적인 data인 경우에 적합
    4. 필요한 data를 local에 cache해서 가지고 있는 방식
        - data의 규모에 따라 Ehcache 같은 local 내장 cache나 Haxelcase 또는 Infinispan 같은 data grid를 사용할 수도 있음
        - master data에 대해 매우 많은 수의 MicroService가 의존하는 경우에 이 방식을 주로 사용

### MicroService와 대규모 작업

- 일체형 application을 더 작고 목적에 맞는 service로 나누면 여러 MicroService data store에서 join query를 통해 data를 가져올 수 없게 됨
    - 이렇게 되면 한 service가 다른 service로부터 많은 data record를 필요로 하게 될 수 있음 == 다른 MicroService로의 요청이 너무 많아짐
- 해결 방법
    1. data가 생성될 때 사전 집계를 하는 방식
        - MicroService1에 data가 생성되면 MicroService2에 event가 발송됨
        - MicroService2는 event를 받으면 내부적으로 계속 data를 집계함
        - 단점 : data의 중복이 발생
    2. batch API 이용
        - 사전 집계가 불가능할 때 적용할 수 있는 방법
        - GetAllInvolices라는 기능을 호출하면 병렬 thread를 사용해서 batch 작업을 여러 개 수행할 수 있음
        - Spring Batch를 사용하면 됨

---

## MicroService 역량 model

- MicroService는 UI, business log, database를 사용하는 일반적인 web application처럼 단순하지 않음
- 대규모 Microservice를 다룰 때는 적은 수의 MicroService나 단순한 service를 개발할 때와는 달리 개발자가 고민해야 할 것이 많음
- MicroService를 성공적으로 구축하려면 생태계 차원에서의 역량이 필요
    - 이런 역량을 전제 조건으로 갖출 수 있게 보장하는 것이 중요함
- 그러나 MicroService 구현을 위한 표준 참조 model은 없음
    - 아직 한창 진화하는 중이기 때문이기 때문에 표준 architecture나 참조 architecture가 없음
        - 현재 공개되어 있는 많은 architecture는 주로 도구 vender사에서 만든 것으로써, vender사가 만든 도구에 편향되어 있음
- 역량 model은 크게 4개의 영역으로 분류할 수 있음
    1. 핵심 역량
    2. 지원 역량
    3. infra structure 역량
    4. process 및 통제 역량

### 핵심 역량

- 핵심 역량(Core capabilities)은 하나의 MicroService 안에 packaging되는 component
- ex) 주문 MicroService
    - 주문 application을 담고 있는 order.jar와 주문 data를 담고 있는 주문 DB 이렇게 2개의 핵심 요소로 배포할 수 이씅ㅁ
        - order.jar에는 service listener, 실행 library, service 구현 code, service API와 endpoint가 들어 있음
        - 주문 DB에는 주문 service를 위한 모든 data가 들어있음
        - 작은 MicroService이므로 이 두가지 '핵심 역량'만 갖추면 됨
- Gartner는 이런 핵심 역량을 내부(inner) architecture, 핵심 역량 외의 나머지를 외부(outer) architecture라고 구분함

#### Service listener와 library

- service listener : MicroService로 들어오는 service 요청을 접수하는 endpoint listener
    - HTTP 또는 AMQP나 JMS 같은 message listener 등이 service listener로 주로 사용됨
    - Spring Boot는 HTTP 기반의 service 종단점을 통해 접근할 수 있는 MicroService를 구현할 수 있음
        - HTTP listener가 내장되어 있음
        - 외부의 application server가 필요 없음
        - HTTP listener는 appilcation이 시작될 때 함께 시작됨
- MicroService가 비동기 통신 기반이라면 HTTP listener 대신 message listener가 시작됨
    - 비동기 통신을 지원하기 위해 Kafka나 RabbitMQ 등과 같은 대규모 messaging 처리 system이 필요함
    - messaging endpoint는 RxJava 같은 Reactive client가 포함된 상황에서도 사용될 수 있음
- 만약 MicroService가 scheduling 기능을 담당한다면 아무런 listener가 필요하지 않을 수도 있음

#### 저장 기능

- MicroService는 상태나 transaction data를 적절한 business 범위에 맞게 저장하는 일종의 저장 mechanism을 가지고 있어야 함
    - MicroService 전용으로 한정되어야 함
    - 저장 기능이 필수는 아님
        - 상태가 없는 계산 전용 service일 수도 있음
- 구현된 저장 기능에 따라 여러 방식으로 저장
    - RDBMS : MySQL
    - NoSQL : Hadoop, Cassandra, Neo4J, ElastucSearch
    - 'in memory 저장 cache' or 'in memory data grid' : Ehcache, Hazelcast, Infinispan
    - in memory database : H2, solidDB, TimesTen

#### Service 구현

- MicroService의 핵심
- business logic이 구현되는 곳
- Java, Scala, Clojure, Erlang 등 어떤 언어로도 구현될 수 있음
- 기능 수행을 위한 모든 business logic은 MicroService 자체에 내장됨
- 일반적인 모듈형, 계층형 architecture를 사용하는 것이 좋음
- service 구현은 구체적인 service endpoint interface를 제공
- MicroService의 상태 변화 event를 외부에서 어떻게 사용할지에 대해서는 관심을 기울이지 않게 구현하는 것이 best
    - MicroService는 상태 변화를 외부에 알릴 수 있음
    - 상태 변화는 다른 MicroService에 의해 사용될 수 있으며, 복제되어 감사에 사용될 수도 있고, 외부 application 같은 지원 service에서 사용될 수도 있음
    - 소비하는 측에 대한 의존성이 없게 구현하면, 다른 MicroService나 application에도 상태 변화를 알려서 service를 동작하게 할 수 있음

#### Service Endpoint

- service endpoint : 외부의 service 소비자가 service에게 요청을 전송할 수 있게 외부에 공개한 API
- 동기 방식 endpoint
    - 일반적으로 REST/JSON이지만, Avro, Thrift, Protocol Buffers 등과 같은 protocol을 사용할 수도 있음
- 비동기 방식 endpoint
    - Spring AMQP, Spring Cloud Stream 등과 같은 message listener 사용
        - 요청을 받아서 backend에 있는 RabbitMQ나 다른 messaging server 또는 ZeroMQ 같은 다른 방식의 Messaging 구현체를 통해 처리함

### InfraStructure 역량

- MicroService를 배포하는 데에는 IaaS; Infrastructure as a Service(서비스로서의 인프라스트럭처) 같은 cloud infrastructure가 좋음
    - infrastructure를 provisioning하는 데에 오랜 시간이 소요되는 전통적인 data center 환경에서는 MicroService를 구현하는 것이 어려움
        - 대규모 infrastructure를 내부의 data center에서 관리하면 소유 비용과 운영비가 증가함
- cloud 방식의 infrastructure
    - virtual machine이나 container를 자동으로 provisioning할 수 있어 탄력적임 (자동화 기능 지원)
- AWS, Azure, IBM Bluemix나 설치형 또는 service형 자체 cloud에 MicroService를 배포할 수 있음

#### Container Runtime

- 다수의 MicroSerice를 대용량 물리 장비에 배포하는 것은 비용 효율성이 떨어지고 관리하기 어려움
- 물리적인 장비만으로는 자동화된 장애 대응성을 갖추기 힘듬

#### Container Orchestration

- container나 virtual machine의 수가 많으면 자동으로 유지 관리하기 어려움 -> container orchestration 도구 사용
- container orchestration 도구
    - == container scheduler
    - == service로서의 container
    - application 배포, traffic 제어, instance 복제, 무중단 upgrade를 자동으로 수행할 수 있음
        - 다수의 MicroService로 구성된 배포 환경에서는 container orchestration 도구를 사용하는 것이 좋음
    - container runtime 위에서 일관성 있는 운영 환경을 제공
    - 가용한 자원을 여러 container에 분배해 줌
    - application life cycle 관리 활동 작업에 도움에 됨
        - application 가용성 확보
        - 여러 data center에 걸친 배포
        - 필요한 최소한의 instance만 사용 등의 제약 사항 기반 배포
    - ex) Apache Mesos, Rancher, CoreOS, Kubernetes
- 수작업으로 provisioning하고 배포하는 것은 어려운 일
    - 배포 과정에 수작업이 포함된다면 개발자나 운영 관리자는
        1. 운영 topology를 알아야 함
        2. traffic routing을 직접 처리해야 함
        3. 배포할 때도 모든 service가 upgrade될 때까지 하나하나 차례로 실행해야 함
    - server instance가 많은 상황에서는 이런 운영 작업은 큰 부담이 되며, 수작업으로 인한 오류 발생 위험도 높아짐

### 지원 역량

- Supporting Capabilities
- MicroService와 직접적으로 연결되지는 않지만, 대규모 MicroService 배포에 필수적임
    - MicroService의 실제 운영 runtime에서는 지원 역량에 대한 의존 관계가 발생하게 됨

#### Service Gateway

- service gateway 또는 API gateway는 service endpoint에 대한 proxy 역할이나 여러 개의 endpoint를 조합하는 역할을 담당하면서 간접화 계층을 제공함
- API gateway는 정책의 강제 적용이나 routing에도 자주 사용됨
    - 상황에 따라서는 실시간 load balancing에도 사용될 수 있음
- ex) Spring Cloud Zuul, Machery, Apigee, Kong, WS)2, 3scale

#### Sofrware 정의 Load balancer

- Software defined load balancer
- load balancer는 배포 topology의 변화를 이해하고 적절히 대처할 수 있을 만큼 지능적이어야 함
    - 정적 IP, domain 별칭, cluster 주소를 load balancer에서 설정하는 전톡적인 방식에서 벗어나야 함
    - 새로운 server가 운영 환경에 추가되면 자동으로 감지해서 수작업 없이 논리적인 cluster에 추가되어야 함
    - service instance가 service 불가 상태가 되면 그 instance는 load balancer의 부하 분산 대상에서 제외되어야 함
- Spring Cloud Netflix Ribbon, Eureka, Zuul을 함께 사용해서 지능적인 software 정의 load balancer를 구현할 수 있음

#### 중앙 집중형 log 관리

- log file은 분석과 debugging에 중요한 정보 제공
- 모든 MicroService가 독립적으로 배포되므로 log도 보통은 각자의 local disk에 남음
    - service를 여러 장비에 걸쳐 확장하면 각 service instance는 가자 별도의 file에 log를 쌓음
    - 이렇게 되면 log가 분산되어 log mining을 통해 service의 동작을 이해하고 debugging하기가 어려워짐
- MicroService를 구현할 때는 각 service에서 생성되는 log를 중앙의 log 저장소에 적재할 수 있어야 함
    - log가 local disk나 local I/O로 분산되지 않고 한 곳에 모이도록
    - log file이 중앙의 한 곳에서 관리되므로 이력, 실시간, trend 등 다양한 분석을 수행할 수 있음
    - 연관 관계 ID(correlation ID)를 사용하면 transaction의 전 구간을 쉽게 추적할 수 있음
- service instance에서 생산되는 모든 log에 연관 관계 ID를 부여해서 중앙 집중적인 방식으로 transaction의 전 구간을 추적할 수 있는 기능이 필요함

#### Service 탐색

- 대규모 MicroService에서는 service가 실행되는 위치를 자동으로 찾을 수 있는 mechanism이 필요함
    - 많은 service instance가 실행되는 cloud 환경에서 service의 위치를 정적으로 찾는 일은 거의 불가능하기 때문'
- service registry
    - service가 요청을 처리할 준비가 되었음을 운영 완경에 알려줄 수 있음
    - registry는 어디에서나 service topology를 이해하는 데에 필요한 정보를 제공
    - service 소비자는 registry에서 service를 탐색하고 찾을 수 있음
- ex) Spring Cloud의 Eureka, ZooKeeper, Etcd
    - container orchestration 도구에는 container 탐색 service가 포함되어 있음
        - ex) Mesos-DNS는 DCOS 배포본에 포함되어 있음

#### 보안 service

- 일체형 application에서는 보안도 application 자체의 일부로서 존재하므로 관리하기 쉬움
- MicroService에서는 다수의 service가 존재하며, 보안 관련 master data를 하나의 service가 보유할 수 없으므로 보안이 상당히 까다로움
- 분산 MicroService 생태계에서는 service 인증이나 token service 같은 service 보안을 담당할 중앙의 server를 필요로 함
- Spring Security와 Spring Security OAuth가 service 보안 기능을 개발할 때 사용할 수 있음
- Microsoft, Ping, Okta 등 기업용 보안 solution 회사에서 내놓은 통합 인증(SSO; Single Sign-On) solution도 MicroService에 통합해서 사용할 수 있음

#### Service 환경 설정

- 서로 다른 server에서 실행되는 다수의 MicroService가 자동화 도구에 의해 배포되면 application 설정을 일체형 application 개발에서 했던 것처럼 정적으로 관리하기 어려움
- MicroService에서는 12 요소 application처럼 service 환경설정 정보가 모두 외부화되어야 함
    - 중앙의 service를 두고 한 곳에서 모든 완경설정 정보를 관리하는 것이 좋음
- ex) Spring Cloud Config server, Archaius 등
- 환경설정 변경 사항이 동적으로 변할 필요가 없는 소규모 MicroService에서는 Spring Boot profile도 환경설정 관리로 충분함

#### 운영 Monitoring

- 여러 version의 service instance로 구성된 많은 수의 MicroService에서는 어떤 service가 어떤 server에서 실행되고 있는지, service 상태는 정상인지, service 의존 관계는 어떤지 알아내기 쉽지 않음
    - application이 고정된 server에서 실행되는 일체형 application 환경에서는 쉬운 일
- 배포 topology에 대한 이해는 별개로 하더라도 service 동작을 확인하고 debugging하고 문제 지점을 식별하는 것도 어려움
- MicroService를 위한 infrastructure를 관리하는 데에는 강력한 monitoring 역량이 필요함
- ex) Spring Cloud Netflix, Turbine, Hystrix Dashboard 등
    - service 수준에서의 monitoring 정보를 보여줌
- ex) AppDynamic, New Relic, Dynatrace, statd, Sensu, Spigo, Simian Viz 등
    - service 전 구간을 아우르는 MicroService monitoring
- ex) Datalog
    - infrastructure를 효율적으로 관맇라 수 있게 해줌

#### 의존 관계 관리

- 핵심 issue
- 지나치게 많은 의존 관계는 MicroService에서 문제가 될 가능성이 높음
- 지나친 의존 관계 생성을 방지하기 위한 설계 관점
    1. service 경계를 적절히 설계해서 의존관계 낮추기
    2. 가능한 한 느슨한 결합을 사용하게 설계해서 영향 여파를 줄이기
        - 또한 service 간 상호작용을 비동기 통신 방식으로 설계하기
    3. circuit breaker 같은 pattern을 사용해서 의존 관계로 인한 문제가 확산되는 것 막기
    4. 의존 관계를 시각화해서 monitoring
- 의존 관계 issue를 해결하기 위해서 여러 도구의 조합이 필요함
    - APM; Application Performance Management : 운영 monitoring 도구 또는 AppDynamic
    - Cloud Craft, Light Mesh, Simian Viz 등

#### Data 호수

- MicroService는 각자의 local transaction data 저장소를 추상화하며, 각자의 transaction 목적에 맞게 사용함
    - 저장소의 유형과 data 구조는 MicroService 제공하는 service에 맞게 최적화됨
- ex) 고객 관계 graph 개발
    - Neo4J, OrientDB 등과 같은 graph database 필요
- ex) 여권 번호, 주소, email, 전화번호 등의 정보를 기준으로 고객을 찾아내는 예측 text 검색 개발
    - Elasticsearch, Solr 등과 같은 index 검색 database 필요
- 필요에 맞도록 data가 파편화되면 각 data가 서로 동떨어져 연결될 수 없는 이질적인 data 섬(data island)이 되어버림
    - 각자의 business에 맞는 data를 사용하다가, 여러 가지 MicroService를 모두 조합해야 알아낼 수 있는 정보가 실시간으로 필요할 때, MicroService는 곤란함
        - 일체형 application에서는 모든 data가 하나의 database에 모두 담겨 있으므로 비교적 쉬움
    - 따라서 data 호수(data lake)가 필요
- Spring Cloud Data Flow, Kafka, Flink, Flume 등의 data 입수 도구는 높은 확장성을 가지고 있어 MicroService에서 사용하기 적합

#### 신뢰성 Messaging

- MicroService에서는 reactive style을 사용하는 것이 좋음
    - MicroService의 결합도를 낮출 수 있음
        - 더 높은 확장성 확보 가능
- reactive system에서는 신뢰성 있는 고가용성 messaging infrastructure service가 필요함
    - messaging에는 RabbitMQ, ActiveMQ, Kafka가 널리 사용됨
    - IBM MQ와 TIBCO의 EMS은 대규모 massaging platform에서 사용되는 상용 제품
    - cloud messaging 또는 Iron.io같은 service로서의 messaging도 intermet으로 연결된 다양한 환경에서 협업하는 messaging에 사용됨

### Process 및 통제 역량

#### DevOps

- 성공적인 MicroService를 위한 핵심 요소
- MicroService 전달(delivery) 속도를 높이기 위해 조직이 도입해야할 것들
    - Agile 개발 process
    - 지속적 통합
    - 자동화된 QA(Quality Assurance: 품질 보증) 검사
    - 자동화된 전달 pipeline
    - 자동화된 배포
    - 자동화된 infrastructure provisioning
- 폭포수 모형의 개발 방식이나, 무거운 출시 관리 process와 긴 출시 주기를 갖고 있는 조직에서는 MicroService 개발이 더 어려움

#### 자동화 도구

- Agile 개발, 지속적 통합, 지속적 전달, 지속적 패보를 통해 MicroService를 성공적으로 전달하려면 자동화 도구가 필수적
    - 자동화 도구 없이 많은 수의 작은 MicroService를 수작업으로 배포하는 것은 너무 길고 힘든 작업
    - MicroService마다 변경 발생 빈도가 다르므로 MicroService마다 별도의 pipeline을 구성하는 것이 좋음
- test 자동화 도구
    - service의 test 용이성도 중요함
    - 하나의 service는 다른 service에 동기적으로 또는 비동기적으로 의존하고, 다른 service는 또 다른 service에 의존하는 관계가 연쇄적으로 이어질 수 있음
        - 이 때, service의 전 구간을 아우르는 test를 어떻게 수행할 수 있을까 (의존하는 service는 test 시점에 사용 가능한 상태일 수도 아닐 수도 있음)
- service 가상화(service virtualization)와 모조 service(service mocking) 기법을 사용하면 실제 의존하는 service가 사용 가능한 상태가 아닐 때에도 test를 수행할 수 있음
    - test 환경에서 의존하는 대상 service가 사용할 수 없는 상태라면 실제 service의 동작을 흉내 내는 모조 service로 test를 진행할 수 있음
- 소비자 주도 계약 (consumer-driven contract)
    - 소비자 주도 계약을 통해 service가 호출하는 모든 기능을 명세하여 빠지는 부분 없이 통합 test를 수행할 수도 있음
- 붕괴 test (destructive test)
    - Netflix는 Simian Army를 이용해서 붕괴 저항성 test
    - 성숙한 service에는 service의 신뢰성에 대한 확인과 붕괴 시 대비책이 정삭적으로 동작하는지 확인이 필요함
    - Simian Army는 다양한 error 유발 scenario를 만들어서 system을 실패 지점으로 빠뜨리고, 그때의 system 동작을 확인할 수 있게 해줌

#### Container Registry

- version 관리도는 MicroService는 binary를 MicroService 저장소에 저장
- MicroService 저장소는 단순히 build 결과물을 담는 artifactory 저장소일 수 있으며, docker registry처럼 container 저장소일 수도 있음

---

## Reference

- Rajesh RV Spring 5.0 MicroService 2/e
