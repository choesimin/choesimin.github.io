---
layout: skill
permalink: /149
title: Facade Pattern - 복잡한 System의 정면(facade)만 보여주기
description: Facade Pattern은 복잡한 system에 대한 단순한 interface를 제공하는 pattern입니다.
date: 2024-02-08
---


## Facade Pattern

- Facade Pattern은 **복잡한 system에 대한 단순한 interface를 제공**하는 pattern입니다.
    - facade는 '건물의 정면'을 의미하는 단어입니다.
    - facade object는 자신의 뒤 편에 존재하는 subsystem들의 복잡한 기능들을 통합하여, 간략화된 기능(interface)를 client에게 제공합니다.

- Facade Pattern은 **저수준 interface(subsystem)들을 통합하여 고수준 interface를 제공**합니다.
    - 고수준의 interface가 저수준 interface들을 통합하기 때문에, 고수준 interface를 통합 interface라고 부릅니다.
    - 저수준 interface보다 더 단순화된 고수준 interface를 제공함으로써, client가 subsystem의 기능을 더 쉽게 사용할 수 있도록 합니다.
        - 통합 interface가 중간에 위치하기 때문에 client와 subsystem이 서로 긴밀하게 연결되지 않아도 됩니다.

- Facade Pattern에서는 subsystem class들을 캡슐화(encapsulation)하지 않습니다.
    - facade object로 단순화된 interface를 제공하면서도, client에서 필요로 한다면 subsystem의 모든 기능을 사용할 수 있게 합니다.
        - client가 subsystem class에 접근하여 기능을 직접 사용하는 것이 가능합니다.
    - Facade Pattern는 복잡한 추상화의 단계가 필요 없어서 **다른 pattern보다 단순한 편**입니다.

- Facade Pattern은 Adapter Pattern의 구조와 비슷하지만, 용도가 다르기 때문에 다른 pattern으로 구분됩니다.
    - 두 pattern 모두 interface를 바꿔주고, 여러 개의 class를 감쌀 수 있습니다.
    - Adapter Pattern은 interface를 변경해서 client에서 필요로 하는 interface로 적응시키기 위한 용도입니다.
    - Facade Pattern은 어떤 subsystem에 대한 단순한 interface를 제공하기 위한 용도입니다.


