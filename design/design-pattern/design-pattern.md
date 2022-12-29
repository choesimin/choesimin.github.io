# Design Pattern

- code를 재사용하는 것과 마찬가지로 '경험을 재사용'하는 것

---


# Design 원칙

- application에서 달라지는 부분을 찾아내고, 달라지지 않는 부분으로부터 분리시키기
    - 모든 design pattern의 기반이 되는 원칙
    - 모든 pattern은 'system의 일부분을 다른 부분과 독립적으로 변화시킬 수 있는' 방법을 제공하기 위한 것

- 구현이 아닌 interface에 맞춰서 programming하기
    - == 상위 형식에 맞춰서 programming하기
        - 객체를 변수에 대입할 때 상위 형식을 구체적으로 구현한 형식이라면 어떤 객체든 집어넣을 수 있기 때문
        - 이렇게 하면 변수를 선언하는 class에서 실제 객체의 형식을 몰라도 됨
    - 실제 실행시에 쓰이는 객체가 code에 의해서 고정되지 않아야 함
    - 어떤 상위 형식(supertype)에 맞춰서 programming함으로써 다형성을 활용하기

- 상속보다는 구성(composition)을 활용하기
    - 두 class를 합칠 때, 'A에는 B가 있다'가 'A는 B이다' 보다 나을 수 있음
    - 구성을 이용하여 system을 만들면 유연성을 높일 수 있음



---

# Reference

- Head First Design Patterns