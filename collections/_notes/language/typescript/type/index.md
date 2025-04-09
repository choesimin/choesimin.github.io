---
layout: note
permalink: /182
title: TypeScript의 Data Type - 자료형
description: TypeScript는 JavaScript의 모든 type들을 포함하여 다양한 type들을 지원하며, 원시, 특수, 객체, 조합, 고급 등의 다양한 type이 있습니다.
date: 2024-03-25
---


## TypeScript의 다양한 자료형

- TypeScript는 JavaScript의 모든 type들을 포함하여 다양한 type들을 지원합니다.

| 분류 | TS 자료형 | JS 지원 |
| --- | --- | --- |
| 원시 | Number | O |
|  | String | O |
|  | Boolean | O |
|  | Symbol | O |
|  | Undefined & Null | O |
|  | Bigint | X |
| 특수 | Unknown | X |
|  | Any | X |
|  | Void | X |
|  | Never | X |
| 객체 | Object | O |
|  | Function | O |
|  | Class | O |
|  | Interface | X |
|  | Array | O |
|  | Tuple | X |
| 조합 | Intersection | X |
|  | Union | X |
| 고급 | Generic | X |
|  | Utility | X |
|  | Conditional | X |
|  | Mapped | X |
| 기타 | Literal | O |
|  | Enum | X |


- **원시(Primirive) Type** : JavaScript의 기본 type에 해당하며, TypeScript에서도 동일하게 지원됩니다.
    - `Bigint`로 더 큰 정수를 다룰 수 있습니다.
  
- **특수(Special) Type** : TypeScript 고유의 type으로, code의 안전성을 높이고 다양한 상황에서 유연하게 type을 다룰 수 있습니다.
    - `Any`, `Void`, `Unknown`, `Never` 등은 일반적이지 않은 특수한 상황에서 유용하게 사용됩니다.
  
- **객체(Object) Type** : JavaScript의 객체 지향 programming을 확장한 부분입니다.
    - class, interface 등을 포함합니다.
    - 배열(array)과 tuple은 data를 구조화하는 데 사용됩니다.

- **조합(Combined) Type** : `Union`과 `Intersection`은 type을 조합하여 더 복잡한 type을 정의할 수 있습니다.
    - type 유연성을 향상시킵니다.

- **고급(Advanced) Type** : 사용 난이도가 높지만, code 재사용성을 높이고 복잡한 type 조작을 가능하게 하는 강력한 type입니다.
    - 주로 TypeScript 고급 사용자가 사용합니다.

- **기타 Type** : literal type, 열거형 등은 값 자체나 값의 집합을 더 명확하게 표현할 수 있게 합니다.
