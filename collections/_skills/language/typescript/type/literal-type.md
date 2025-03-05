---
layout: skill
permalink: /221
title: TypeScript Literal Type - 특정한 값
description: TypeScript의 Literal Type은 특정 값을 지정할 때 사용하는 type으로, 변수가 정확히 그 값만을 가질 수 있음을 명시적으로 표현할 수 있습니다.
date: 2024-03-02
---


## Literal Type - 특정 값을 지정하기

- TypeScript의 literal type은 **특정 값만을 가질 수 있는 변수**를 선언할 때 사용합니다.
    - 이는 변수가 **정확히 그 값만을 가질 수 있음**을 의미합니다.

- literal type은 문자열, 숫자, boolean 값 등을 정확하게 지정할 수 있습니다.

- literal type을 사용하면 type의 정확성을 높일 수 있어, code의 안정성을 높이고 오류를 줄이는 데 도움이 됩니다.
    - code를 통해 변수나 속성이 가질 수 있는 값의 범위를 명확히 표현할 수 있습니다.
    - 예상치 못한 값의 할당을 compile time에 방지하여, runtime 오류의 가능성을 줄일 수 있습니다.
    - IDE에서 literal type을 사용하면, 가능한 값에 대한 자동 완성 기능을 지원받을 수 있어, 개발 효율성을 높일 수 있습니다.

- literal type은 **보통 union type과 결합하여 literl union type으로 만들어 사용하는 경우가 많습니다.**


### 문자열 Literal Type

- 문자열 literal type을 사용하면 변수가 특정 문자열 값만 가질 수 있습니다.

```typescript
let direction: "up" | "down" | "left" | "right";
direction = "up";
direction = "down";
direction = "forward";    // Error: Type '"forward"' is not assignable to type '"up" | "down" | "left" | "right"'.
```


### 숫자 Literal Type

- 숫자 literal type은 변수가 특정 숫자 값만을 가질 수 있게 합니다.

```typescript
let errorCode: 404 | 403 | 500;
errorCode = 404;
errorCode = 200;    // Error: Type '200' is not assignable to type '404 | 403 | 500'.
```


### Boolean Literal Type

- boolean literal type을 사용하여, 변수가 `true`나 `false` 중 하나의 값만 가질 수 있게 할 수 있습니다.
    - 하지만 `true`나 `false` 중 하나의 값만 가질 수 있다는 점은 기본 boolean type과 동일하기 때문에, boolean literal type은 특정 조건에서만 유용합니다.

```typescript
let isTrue: true;
isTrue = true;
isTrue = false;    // Error: Type 'false' is not assignable to type 'true'.
```


### 객체 literal type

- 객체의 속성에 literal type을 사용할 수도 있습니다.
    - 특정 속성이 정해진 몇 가지 값 중 하나만을 가질 수 있도록 제한할 수 있습니다.

```typescript
type Button = {
    color: "red" | "blue" | "green";
    disabled: boolean;
};

let submitButton: Button = {
    color: "red",
    disabled: false
};

submitButton.color = "yellow";    // Error: Type '"yellow"' is not assignable to type '"red" | "blue" | "green"'.
```


