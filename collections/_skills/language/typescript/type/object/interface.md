---
layout: skill
permalink: /205
title: TypeScript Interface Type - 객체 계약서
description: TypeScript의 Interface는 객체가 가져야 할 구조와 type을 정의하는 데 사용되며, 객체의 property와 method를 명시하여 객체의 일관성을 유지할 수 있도록 합니다.
date: 2024-02-26
---


## Interface : 객체 계약서

- TypeScript의 interface는 **변수, 함수, class가 특정 구조와 type을 갖추도록 명시**하는 데 사용됩니다.
    - 여러 type의 property로 이루어진 새로운 type을 정의하는 것과 같습니다.
        - interface에 선언된 property 또는 method의 구현을 강제하여 일관성을 유지할 수 있도록 합니다.
    - interface는 **객체가 구현해야 할 구체적인 사항을 지정하고, 지키도록 강제**합니다.

- interface는 compile time에 구조와 type을 검사하기 위해 사용되며, runtime에는 제거됩니다.
    - TypeScript file이 compile된 JavaScript file에는 interface에 대한 code가 없습니다.

- JavaScript ES6는 interface를 지원하지 않지만, TypeScript는 interface를 지원합니다.
    - TypeScript는 interface를 통해 개발자가 더 명확하고 유지 보수가 용이한 code를 작성할 수 있도록 합니다.


