---
layout: skill
title: TypeScript Object Type (객체 Type)
date: 2024-02-29
---



## Object Type : 객체 Type

- TypeScript의 객체 type을 활용하여, type system 안에서 **복잡한 data 구조를 설계**할 수 있습니다.

- TypeScript(및 JavaScript)에서 `Object`와 `object` type은 다른 의미를 가지고 구분되어 사용됩니다.

| `Object` type (대문자 'O') | `object` type (소문자 'o') |
| --- | --- |
| JavaScript의 **모든 객체가 기본적으로 상속받는 최상위 class**입니다.<br>JavaScript에서 생성할 수 있는 **모든 값(원시 값과 객체)을 포함**합니다. | **원시 type을 제외한 모든 객체** type입니다.<br>**`null`을 제외한 모든 객체**, 즉 배열, 함수, class instance 등 JavaScript에서 생성할 수 있는 거의 모든 구조체를 포함합니다. |

- 여기서 말하는 모든 '객체(object)'는 소문자 'o'로 시작하는 `object`를 의미합니다.


### 객체 Type

- 객체 type(소문자로 시작하는 `object`)은 **원시 type을 제외한 모든 객체 type**을 나타내며, **`null`을 제외한 모든 객체를 포함**합니다.
    - 객체, 배열, 함수, class instance 등 JavaScript에서 생성할 수 있는 거의 모든 구조를 포함할 수 있습니다.

- 객체 type을 사용하면 가장 일반적인 형태의 객체를 다룰 수 있지만, 구체적인 구조를 명시하지 않기 때문에 더 세밀한 type checking을 위해서는 다른 구체적인 객체 type을 사용하는 것이 좋습니다.
    - 객체 type을 사용하는 것보다 더 구체적인 객체 type(`Array<T>`, `function`, `class`, `interface` 등)을 사용하여 type의 세부 사항을 명시하는 것이 type 안정성을 향상시키는 데에 도움이 됩니다.
    - 예를 들어, 배열을 다룰 때 `Array<number>` 또는 `number[]`와 같이 명시적으로 type을 선언함으로써 배열 내부의 모든 요소가 숫자 type임을 보장할 수 있습니다.


### 배열 Type

- 배열은 **동일한 type의 값들을 순서대로 저장하는 collection**입니다.
- TypeScript에서 배열 type은 `type[]` 또는 `Array<type>`의 형태로 표현됩니다.
    - 배열 내부의 모든 요소가 동일한 type을 가진다는 것을 명시할 수 있으며, type 안정성을 보장할 수 있습니다.


### 함수 Type

- 함수 type은 **함수의 signature를 정의**하는 데에 사용됩니다.
    - 함수의 매개 변수 type, 반환 type을 포함하여 함수의 전체적인 구조를 명확하게 설명할 수 있습니다.

- 함수 type을 정의함으로써, 함수가 호출될 때의 type 안정성을 보장받을 수 있습니다.


### Class Type

- class는 실제 구현을 포함하며 **instance를 생성할 수 있는 template**(class instance spec)을 제공합니다.
    - class type을 사용하여 instance가 가질 수 있는 property(속성)과 method, 그리고 그 type들을 명시합니다.

- class는 상속(inheritance), 캡슐화(encapsulation), 다형성(polymorphism)과 같은 객체 지향 programming의 중요한 개념을 TypeScript에서 효과적으로 사용할 수 있게 합니다.


### Interface Type

- interface는 **객체의 구조를 정의**하는 데 사용됩니다.
    - interface를 통해 객체가 가져야 할 property(속성)과 method, 그리고 그 type들을 명시합니다.

- interface는 class와 함께 사용하여 특정 구조를 갖춘 객체를 생성할 수 있도록 강제할 수 있습니다.
    - interface는 type checking을 위한 구조적 계약을 정의하며, 실제 구현은 포함하지 않습니다.
    - 객체가 "interface를 구현하겠다"는 것은 "특정 구조를 따르도록 강제하는 계약을 따르겠다"는 말과 같습니다.

- interface는 확장 가능하며, code의 재사용성과 유지보수성을 향상시키는 데 유용하게 사용됩니다.


### Tuple Type

- tuple은 **고정된 길이의 배열 type으로, 배열 내 각 요소의 type이 정해져 있습니다.**
    - tuple은 다양한 type의 요소를 포함할 수 있으며, 각 요소의 정확한 type을 사전에 알 수 있어야 할 때 유용합니다.

- 예를 들어, 두 개의 요소를 갖는 tuple `let x: [string, number] = ['hello', 10];`은 첫 번째 요소가 문자열이고 두 번째 요소가 숫자인 배열을 나타냅니다.
