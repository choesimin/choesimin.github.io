# API

- Application Programming Interface
- application software를 구축하고 통합하기 위한 정의 및 protocol set
- API를 사용하면 구현 방식을 알지 못해도 제품 또는 service가 서로 communication할 수 있음
    - application 개발을 간소화하여 시간과 비용을 절약할 수 있음
- 설계와 관리 차원에서 유연성 제공
    - 사용 방법 간소화에 도움을 줌
- 한 쪽 당사자가 특정한 방식으로 구성된 원격 요청을 보내면, 다른 쪽 당사자의 software가 이에 응답하는 방식
- business team과 IT team 간의 협업에 도움이 됨
    - 개발자가 새로운 application 구성 요소를 기존 architecture에 통합하는 방식을 간소화하기 때문
- public API는 partner와의 연결 방식을 간소화하고 확대할 수 있을 뿐만 아니라 보유한 data를 확용해 수익을 창출할 수도 있기 때문에 고유의 business 가치를 지님
    - ex) Google Maps API
- [Backend systems + API] <-> [API management system] <- [Apps & IoT devices & Mobile]

## API 역할

1. server와 database에 대한 출입구 역할을 함
    - 허용된 사람들에게만 접근성 부여
2. application과 기기가 원활하게 통신할 수 있도록 함
    - smart phone application, program 등과 data를 원활히 주고받을 수 있도록 도움
3. 모든 접속을 표준화함
    - 기계/운영체제 등과 상관없이 누구나 동일한 access를 얻을 수 있음
    - 범용 plug처럼 작동

## API 유형

- Private API
    - API를 내부에서만 사용할 수 있도록 하며, 기업이 API를 최대한으로 제어할 수 있음
    - 회사 개발자가 자체 제품과 service를 개선하기 위해 내부적으로 발행
    - 제 3자에게 노출되지 않음
- Public API
    - API가 모두에게 제공되며, 제 3자가 API와 상호 작용하는 application을 개발하여 혁신을 끌어낼 수 있습니다
- Partner API
    - API를 특정 business partner와 공유
    - 기업이 data 공유에 동의하는 특정인들만 사용할 수 있음
    - 품질 저하없이 추가 수익원을 창출할 수 있음
    - business 관게에서 사용되는 편이며, 종종 partner 회사 간에 software를 통합하기 위해 사용됨

## Advantage

- Private API를 이용할 경우, 개발자들이 application code를 작성하는 방법을 표준화함으로써, 간소화되고 빠른 process 처리를 가능하게 함
    - 또한 software를 통합하고자 할 때는 개발자들 간의 협업을 용이하게 만들어줄 수 있음
- Public API와 Partner API를 사용하면, 기업은 타사 data를 활용하여 brand 인지도를 높일 수 있음
    - 또한 고객 database를 확장하여 전환율을 높일 수 있음
- 재사용성이 높음
    - 대부분 범용성 있는 data 형식을 가지기 때문에 다른 program에서도 해당 기능이 필요하면 API를 통해 data만 넘겨주면 됨

---

# Reference

- https://www.redhat.com/ko/topics/api/what-are-application-programming-interfaces
- http://blog.wishket.com/api란-쉽게-설명-그린클라이언트/
