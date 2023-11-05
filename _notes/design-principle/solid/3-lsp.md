---
layout: note
title: LSP - Liskov 치환 원칙
date: 2023-11-05
---










## LSP (Liskov Substitution Principle) : Liskov 치환 원칙

```txt
상위 type의 객체를 하위 type의 객체로 치환해도 상위 type을 사용하는 program은 정상적으로 작동해야 합니다.
```

- 자식 class는 최소한 자신의 부모 class에서 가능한 행위는 수행할 수 있어야 합니다.
- 만약 부모 class에서 작동하는 logic을 수정해서 자식 class에 구현했다면(`@Override`), 자식 객체를 사용한 곳에 부모 객체로 치환했을 때 정상적으로 작동하지 못하므로 LSP를 어기는 경우가 됩니다.






---




# Reference

- <https://ko.wikipedia.org/wiki/SOLID_(객체_지향_설계)>
