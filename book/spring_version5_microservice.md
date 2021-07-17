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

### 
