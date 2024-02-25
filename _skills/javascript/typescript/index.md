---
layout: skill
title: TypeScript - Type을 검사하는 JavaScript
date: 2024-02-25
---




> TypeScript = JavaScript + Type Check

- TypeScript는 **JavaScript(ES5)의 Superset(상위 확장)이며**, AltJS 중 하나입니다.
    - AltJS(Alternative JavaScript)는 'JavaScript 파생 언어'로, TypeScript 말고도 CoffeScript, Dart 등이 있습니다.
    - JavaScript의 Superset이므로 기존의 JavaScript(ES5) 문법을 그대로 사용할 수 있습니다.

- TypeScript는 '정적 Typing', ES6(ECMAScript 2015)의 'class'와 'module', ES7의 'Decorator' 등을 지원합니다.

- TypeScript 실행 환경에 JavaScript를 coding하면 100% 동작하지만 JavaScript 실행 환경에 TypeScript를 coding하면 동작하지 않습니다.




---




## TypeScript의 장점


### 1. Static(정적) Typing

- TypeScript를 사용하는 가장 큰 이유는 Static(정적) Typing을 지원한다는 점입니다.
    - JavaScript는 Dynamic(동적) Typing만을 지원합니다.

#### JavaScript 예시 : Dinamic Typing

```javascript
function sum(a, b) {
    return a + b;
}

sum(1, 2);    // 3
sum('x', 'y');    // 'xy' (의도하지 않은 함수 사용 방법)
```

- 함수의 의도는 2개의 number type 인수를 전달받아 합계를 반환하는 것입니다.
    - 하지만 code에는 어떤 type의 인수를 전달해야 하는지, 어떤 type의 반환 값을 return해야 하는지 명확하지 않습니다.
- 함수의 인자로 string type을 넣어도, JavaScript 문법상 어떠한 문제도 없으므로 JavaScript Engine은 그대로 실행합니다.
    - 이는 함수가 의도하지 않은 동작입니다.
- 이러한 상황이 발생한 이유는 변수나 반환 값의 type을 사전에 지정하지 않는 JavaScript의 Dynamic(동적) Typing에 의한 것입니다.

#### TypeScript 예시 : Static Typing

```typescript
function sum(a: number, b: number) {
    return a + b;
}

sum(1, 2);    // 3
sum('x', 'y');    // error TS2345: Argument of type '"x"' is not assignable to parameter of type 'number'.
```

- TypeScript는 Static(정적) Typing을 지원하므로, compile 단계에서 오류를 포착할 수 있습니다.
- 명시적인 type 지정을 통해 자료형에 대한 의도를 명확하게 기술할 수 있습니다.
    - 이는 code의 가독성을 높이고 동작을 예측할 수 있게 합니다.


### 2. 도구의 지원

- TypeScript를 사용하면 IDE(통합 개발 환경)를 포함한 다양한 도구의 지원을 받을 수 있습니다.
- IDE에 type 정보를 제공함으로써, 높은 수준의 IntelliSense, Code Assist, Type Check, Refactoring 등을 지원받을 수 있습니다.
- 도구의 지원은 대규모 project를 위한 필수 요소이기도 합니다.


### 3. OOP 지원

- interface, generic 등과 같은 객체 지향 Programming(OOP, Object-Orientied Programming) 지원은 크고 복잡한 project의 code 기반을 쉽게 구성할 수 있도록 돕습니다.
- Java, C# 등의 class 기반 객체 지향 언어에 익숙한 개발자가 JavaScript Project를 수행하는 데 진입 장벽을 낮추는 효과도 있습니다.




---




## Reference

- <https://poiemaweb.com/>
- <https://opentutorials.org/course/5080>

