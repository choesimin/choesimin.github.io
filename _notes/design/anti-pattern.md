---
layout: note
---

# Anti Pattern

- pattern과 반대로 programming을 하는 과정에서 programmer들이 흔히 범하기 쉬운 바람직하지 않은 방법들과 그로 인한 폐해
- design pattern의 출현은 programmer들에게 지금까지 있었던 가장 효과적인 guideline을 제공해주었음
    - 개발 중에 나타나는 복잡한 구조와 문제들을 정리해 줌
    - software 개발을 편히가헤 도와주는 방안이 다양하게 개발되어 옴
- anti pattern은 개발자들에게 반면교사의 역할을 함
    - project의 실패들과 올바르지 못한 개발 산출물들은 성공한 project의 것과 마가지고 중요한 가치를 지님
        - 모든 programmer들에게 지양해야 할 방향들을 알려주기 때문

## Anti Pattern이 발생하는 측면

1. 관리 상의 anti pattern : project process와 project 구성원의 잘못된 관리
2. architecture 상의 anti pattern : 설계와 구조의 잘못된 정의
3. Object 설계 anti pattern : object 설계 영역에서의 잘못된 정의
4. 방법론 상의 anti pattern : 개발 방법론의 잘못된 정의 또는 잘못된 진행
5. 설정 관리 상의 anti pattern : version 또는 configuration 관리 상의 잘못된 정의
6. 개발 상의 anti pattern : code 상의 잘못된 사례

## 잘 알려진 Anti Pattern

1. Spaghetti Code : 개발
    - 개발 과정에서 기능의 추가 또는 유지보수에 의해 code가 복잡하게 꼬이는 것
2. Stovepipe System : Architecture
    - 다양한 solution들을 확실한 추상화의 개념 없이 임의로 묶어 하나의 제품을 만들면 신뢰성이 떨어지며 유지보수가 힘든 제품이 탄생하게 됨
3. 분석 마비(Analysis Paralysis) : 관리
    - 분석 단계에서 완벽하고 완전한 분석을 꿈꾸면 이는 software 개발 진행을 마비시켜 버림
4. 신의 객체(Got Object) : Object 설계
    - 하나의 객체에 너무 많은 기능과 interface를 담아버리면 복잡하고 유지보수하기 힘들고 상호 의존성이 높은 class가 탄생함
5. Singletonitis : Object 설계
    - Singletone pattern의 불필요한 남용
6. Yo-yo Problem : Object 설계
    - 구조를 지나치게 분리하게 되면 더욱 이해하기 힘든 구조가 됨
7. Action at a Dstance : 개발
    - 예상되지 않은 상호작용은 system을 광범위하게 구분해버림
8. 변조된 요구사항(Phony Requirements) : Architecture
    - project에서 모든 요구사항이 문서로 상세화되지 않고, 유선이나 개개인의 구두로 전달이 된다면 변조(허위)된 요구사항이 발생함
9. 애매한 관점(Ambiguous Viewpoint) : 개발
    - 명확하지 않은 관점에서 modeling을 수행하면 객체 modeling에서 객체들을 정확하게 정의할 수 없음

---

# Reference

- https://ukzzang.tistory.com/18
- https://en.wikipedia.org/wiki/Anti-pattern
    - anti pattern 상세 모음
