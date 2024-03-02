---
layout: skill
title: TypeScript - Type
date: 2024-02-27
---














TypeScript의 리터럴 타입(Literal Types)은 특정 값으로 타입을 제한하는 강력한 방법을 제공합니다. 리터럴 타입을 사용하면 변수나 파라미터, 반환값 등이 특정 값 또는 값의 집합만을 가질 수 있도록 제한할 수 있습니다. 이는 코드의 의도를 명확히 전달하고, 예상치 못한 값을 방지하여 프로그램의 안정성을 높일 수 있습니다.

### 기본적인 사용법

리터럴 타입은 주로 문자열, 숫자, 불리언 값에 대해 사용됩니다. 이 타입들을 사용하여 변수가 특정 값을 가질 수 있음을 명시적으로 선언할 수 있습니다.

#### 문자열 리터럴 타입

```typescript
let myPet: "dog" | "cat" | "bird";

myPet = "dog"; // 유효
myPet = "cat"; // 유효
myPet = "lion"; // 오류: "lion" 타입은 "dog" | "cat" | "bird" 타입에 할당할 수 없음
```

#### 숫자 리터럴 타입

```typescript
let responseCode: 200 | 404 | 500;

responseCode = 200; // 유효
responseCode = 404; // 유효
responseCode = 403; // 오류: 403 타입은 200 | 404 | 500 타입에 할당할 수 없음
```

#### 불리언 리터럴 타입

```typescript
let isTrue: true;

isTrue = true; // 유효
isTrue = false; // 오류: false 타입은 true 타입에 할당할 수 없음
```








### 리터럴 타입의 고급 사용법

리터럴 타입은 더 복잡한 타입 시스템을 구성하는 데에도 사용될 수 있습니다. 예를 들어, 함수의 반환 타입이 특정 상황에 따라 달라져야 할 때 유용합니다.



#### 함수에서 리터럴 타입 사용하기

```typescript
function getResponseStatus(status: "success" | "error"): 200 | 404 {
  if (status === "success") {
    return 200;
  } else {
    return 404;
  }
}
```



#### 인터페이스와 함께 리터럴 타입 사용하기

리터럴 타입은 인터페이스에 포함되어, 객체가 특정 속성을 특정 값들 중 하나로만 가질 수 있도록 할 수 있습니다.

```typescript
interface ServerResponse {
  status: "loading" | "success" | "error";
  data?: any;
  errorMessage?: string;
}

const response: ServerResponse = {
  status: "success",
  data: { id: 1, name: "Test" }, // 'status'가 'success'일 때만 'data'를 포함
};
```

### 리터럴 타입의 장점

- **명확성**: 코드를 통해 변수나 속성이 가질 수 있는 값의 범위를 명확히 표현할 수 있습니다.
- **타입 안전성**: 예상치 못한 값의 할당을 컴파일 시점에 방지하여, 런타임 오류의 가능성을 줄일 수 있습니다.
- **자동완성과 도구의 지원**: IDE에서 리터럴 타입을 사용하면, 가능한 값에 대한 자동완성을 제공받을 수 있어, 개발 효율성을 높일 수 있습니다.

리터럴 타입은 TypeScript가 제공하는 강력한 기능 중 하나로, 타입의 정확성을 높이고 코드의 안정성을 강화하는 데 큰 도움이 됩니다.