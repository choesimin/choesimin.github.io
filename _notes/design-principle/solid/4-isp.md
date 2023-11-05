---
layout: note
title: ISP - Interface 분리 원칙
date: 2023-11-05
---







## ISP (Interface Segregation Principle) : Interface 분리 원칙

```txt
client가 자신이 이용하지 않는 method에 의존하지 않아야 합니다.
```

- client는 객체를 사용하는 소비자를 의미합니다.
    - e.g method, class 등.

- 기능이 많은 큰 덩어리의 interface를 구현하는 대신, 구체적이고 작은 단위들로 분리시켜 사용합니다.
    - client들이 꼭 필요한 method들만 이용할 수 있도록 합니다.

- ISP를 통해 system의 내부 의존성을 약화시켜 refactoring, 수정, 재배포를 쉽게 할 수 있습니다.
    - 결합도를 낮춘다는 말과 같습니다.







---




# Reference

- <https://ko.wikipedia.org/wiki/SOLID_(객체_지향_설계)>
