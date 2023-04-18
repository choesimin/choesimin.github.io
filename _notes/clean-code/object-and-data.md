---
layout: note
title: Clean Code - 객체와 자료구조
version: 2023-04-18
---



# 객체와 자료구조

- 자료 추상화
    - 구현을 감추기 위해서는 추상화가 필요함
        - 변수 사이에 함수라는 계층을 넣는다고 해서 구현이 감춰지지는 않음
            - 변수를 private으로 선언 하더라도 각 값마다 조회 함수(getter)와 설정 함수(setter)를 제공한다면, 구현을 외부로 노출하는 것과 같음
        - 추상 interface를 제공하여 사용자가 구현을 모른 채 자료의 핵심을 조작할 수 있어야 진정한 의미의 class라고 할 수 있음

- 자료/객체 비대칭
    - 객체와 자료구조는 반대되는 특징을 가짐
        - 객체 : 추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개
        - 자료구조 : 자료를 그대로 공개하며 별다른 함수는 제공하지 않음
    - 객체 지향 code에서 어려운 변경은 절차적인 code에서 쉬우며, 절차적인 code에서 어려운 변경은 객체 지향 code에서 쉬움
        - '(자료구조를 사용하는) 절차적인 code는 기존 자료구조를 변경하지 않으면서 새 함수를 추가하기 쉽다. 반면, 객체 지향 code는 기존 함수를 변경하지 않으면서 새 class를 추가하기 쉽다.'
        - '절차적인 code는 새로운 자료구조를 추가하기 어렵다. 그러러면 모든 함수를 고쳐야 한다. 객체 지향 code는 새로운 함수를 추가하기 어렵다. 그러려면 모든 class를 고쳐야 한다.'
    - 모든 것이 객체하는 생각을 해서는 안 됨
        - 때로은 단순한 자료구조와 절차적인 code가 적합한 상황이 있음

- Demeter 법칙
    - module은 자신이 조작하는 객체의 속사정을 몰라야 한다는 법칙
        - 객체는 자료를 숨기고 함수를 공개해야 함
    - Class C의 method f는 다음과 같은 객체의 method만 호출해야 함
        - Class C
        - f가 생성한 객체
            - 하지만 method가 반환하는 객체의 method는 호출해서는 안 됨
                - 잘 아는 것을 사용하고, 낯선 것은 경계해야 함
        - f 인수로 넘어온 객체
        - C instance 변수에 저장된 객체
    - 기차 충돌(train wreck) 문제
        - 여러 객체가 한 줄로 이어진 기차처럼 보이는 문제
            ```java
            final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
            ```
        - 기차는 나누는 것이 나음
            ```java
            Option opts = ctxt.getOptions();
            File scratchDir = opts.getScratchDir();
            final String outputDir = scratchDir.getAbsolutePath();
            ```
        - 객체와 자료구조의 구분을 확실하게 하는 것이 나음
            ```java
            final String outputDir = ctxt.options.scratchDir.absolutePath;
            ```
            - 객체 method와 조회 함수를 함께 사용하면 자료구조와 객체의 역할을 모두 가지고 있는 셈이므로 하나로 통일되도록 변경
    - 잡종 구조
        - 절반은 객체, 절반은 자료구조인 경우
            - 중요한 기능을 수행하는 함수, 공개 변수, 공개 조회/설정 함수 모두 가지고 있는 경우
        - 새로운 함수와 새로운 자료구조 모두 추가하기 어려운 구조이기 때문에 피하는 편이 좋음

- 자료 전달 객체 (Data Transfer Object, DTO)
    - 공개 변수만 있고 함수가 없는 class
    - 'Bean' 구조를 일반적으로 가지나 이는 가짜 캡슐화임
        - 'Bean' 구조 : 비공개(private) 변수를 조회/설정 함수로 조작하는 형태
    - DTO의 특수한 형태 : 활성 Record
        - '공개 변수가 있거나 비공개 변수에 조회/설정 함수가 있는 자료구조'에 save나 find와 같은 탐색 함수도 제공함
            - database table이나 다른 source에서 자료를 직접 변환한 결과
        - 활성 record는 객체가 아니라 자료구조로 취급함
            - business 규칙 method를 추가해서는 안 됨
            - 객체로 취급하면 잡종 구조가 나오게 됨

- 객체와 자료구조 중에 선택하기
    - 객체
        - 동작을 공개하고 자료를 숨김
            - 기존 동작을 변경하지 않으면서 새 객체 type을 추가하기 쉬움
            - 기존 객체에 새 동작을 추가하기 어려움
        - 새로운 자료 type을 추가하는 유연성이 필요하면 '객체'를 사용하기
    - 자료구조
        - 별다른 동작 없이 자료를 노출함
            - 기존 자료구조에 새 동작을 추가하기 쉬움
            - 기존 함수에 새 자료구조를 추가하기 어려움
        - 새로운 동작을 추가하는 유연성이 필요하면 '자료구조 + 절차적인 code'를 사용하기




---




# Reference

- Robert C. Martin, 『Clean Code』
