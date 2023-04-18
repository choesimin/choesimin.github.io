---
layout: note
title: Clean Code - Class
version: 2023-04-18
---




## Class 체계

- 표준 Java 관례에 따른 class 요소 정의 순서

- 변수 목록의 순서
    - 정적(static) 공개(public) 상수
    - 정적 비공개(private) 변수
    - 비공개 instance 변수

- 공개(public) 함수
    - 비공개(private) 함수는 자신을 호출하는 공개 함수 직후에 넣기




## Class는 작게 만들기

- 각 class가 맡는 책임이 적어야 합니다.

- class 이름은 해당 class의 책임을 기술해야 합니다.
    - 작명은 class 크기에 영향을 줍니다.
    - 이름이 너무 길거나 모호하다면, 책임이 너무 많기 때문입니다.

- 단일 책임 원칙 (Single Responsibility Principle, SRP)
    - class나 module을 변경할 이유가 하나여야 한다는 원칙
    - class를 정리하는 것은 서랍에 물건을 정리하는 것과 같음
        - 작은 서랍을 많이 두고 기능과 이름이 명확한 component를 나눠 넣기
        - 큰 서랍 몇 개를 두고 모두를 던져 넣기

- 응집도 (Cohesion)
    - '응집도가 높다' == 'class에 속한 method와 변수가 서로 의존하며 논리적인 단위로 묶인다'
    - 응집도를 높이기 위해
        - class는 instance 변수 수가 작아야 함
        - 각 class method는 class instance 변수를 하나 이상 사용해야 함
            - method가 변수를 더 많이 사용할 수록 method와 class는 응집도가 더 높음
    - class가 응집력을 잃는다면 쪼개기
        - 응집도를 유지하여 작은 class 여럿이 나오게 되는 과정
            - 큰 함수를 작은 함수 여럿으로 나눔
            - 이 때 큰 함수와 작은 함수의 인수가 비슷하다면, 쪼개지면서 응집도가 낮아짐
            - 비슷한 인수들을 사용하는 작은 함수들을 작은 class 여럿으로 묶어내기
        - 이로써 program에 점점 더 체계가 잡히고 구조가 투명해지게 됨




---




# Reference

- Robert C. Martin, 『Clean Code』
