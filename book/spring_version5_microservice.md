# 스프링 5.0 마이크로서비스 2/e - 라제시 RV 지음

# MicroService로의 진화

- MicroService는 Service 지향 Architecture(SOA; Service Oriented Architecturee)에 이어 점점 더 많은 인기를 끌고 있는 architecture pattern

# MicroService와 벌집

- 벌은 육각형 모양의 밀랍으로 된 방을 가지런하게 배치하면서 벌집을 만듬
- 벌집(honeycomb)을 만드는 일은 서로 다른 재료를 사용해서 방을 만드는 작은 작업에서부터 시작됨
  - 벌집을 짓는 그 시점에서 가용한 자원을 바탕을 건축이 진행됨
- 방을 반복적으로 만들다보면 어떤 pattern을 형성함
  - 결과적으로 상탕히 튼튼한 구조를 지닌 벌집이 완성됨
- 벌집 안에 있는 각 방은 서로 독립적이지만 다른 방들과 연결되어 있기도 함
- 방을 추가하다보면 벌집은 점점 커지고 견고한 구조를 가지게 됨
- 방 하나가 망가지더라도 다른 방에 영향을 미치지 않음
  - 벌은 전체 벌집 구조에 영향을 미치지 않으면서 망가진 방을 수리해 다시 만들어낼 수 있음

# MicroService의 원칙

- 단일 책임 원칙
- 자율성

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

# MicroService의 특징

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
      - service는 표준 protocall과 message 교환 표준을 준수하기 때문에 호환성이 좋음
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

- 성공적인 MicroService 구현체들은 logic과 data를 service의 내부로 캡슐화함
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

# MicroService의 장점

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
- 전통적인 system은 고유의 native protocall을 통해 의사소통하기 대문에 일종의 black box application처럼 동작함
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

# MicroService 설계 Guideline

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
