---
layout: skill
title: TypeScript - 읽기 전용 속성
date: 2024-03-03
---












### TypeScript에서의 `readonly` 속성

TypeScript는 개발자가 클래스, 인터페이스, 타입에서 프로퍼티를 수정할 수 없게 만드는 `readonly` 한정자를 제공합니다. `readonly` 속성을 사용하면 객체 생성 후 해당 프로퍼티의 값을 변경할 수 없습니다. 이는 불변성을 보장하고, 코드를 더 안전하게 만들며, 의도치 않은 변화로부터 보호하는 데 유용합니다.

### `readonly` 사용 방법

`readonly` 속성은 주로 클래스의 멤버 변수나 인터페이스의 프로퍼티에 사용됩니다. 클래스 내에서는 생성자에서 `readonly` 프로퍼티를 초기화할 수 있지만, 이후에는 그 값을 변경할 수 없습니다.

### 예제: `readonly` 속성을 갖는 클래스

```typescript
class Person {
  readonly name: string;

  constructor(name: string) {
    this.name = name; // 초기화는 가능
  }

  changeName(newName: string) {
    // this.name = newName; // 오류: Cannot assign to 'name' because it is a read-only property.
  }
}

const person = new Person("Alice");
console.log(person.name); // "Alice"

// person.name = "Bob"; // 오류: Cannot assign to 'name' because it is a read-only property.
```

위 예제에서 `Person` 클래스는 `readonly`로 선언된 `name` 프로퍼티를 갖고 있습니다. 이 프로퍼티는 객체 생성 시에만 값을 할당할 수 있으며, 이후에는 그 값을 변경할 수 없습니다. 시도하면 TypeScript 컴파일러는 오류를 발생시킵니다.

### 예제: `readonly` 속성을 갖는 인터페이스

```typescript
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

const person: ReadonlyPerson = {
  name: "Alice",
  age: 30
};

// person.name = "Bob"; // 오류: Cannot assign to 'name' because it is a read-only property.
```

이 예제에서는 `ReadonlyPerson` 인터페이스를 정의하고 있습니다. 이 인터페이스의 모든 프로퍼티는 `readonly`로 선언되어 있어, 객체가 처음 생성될 때 이후에는 수정할 수 없습니다.

### `readonly`의 장점

1. **불변성 보장**: `readonly`는 객체의 프로퍼티가 의도치 않게 변경되는 것을 방지합니다. 이는 프로그램의 예측 가능성과 안정성을 향상시킵니다.
2. **디버깅 용이**: 값이 변경되지 않음을 보장함으로써, 버그 발생 시 추적하기 쉽게 만듭니다.
3. **코드 의도 명확화**: 다른 개발자에게 해당 프로퍼티가 초기화 후 변경되어서는 안 된다는 것을 명시적으로 알립니다.

`readonly` 한정자의 사용은 TypeScript에서 불변성을 중시하는 프로그래밍 패러다임을 채택할 때 특히 유용합니다. 이를 통해 코드의 안전성을 높이고, 예상치 못한 변경으로부터 애플리케이션을 보호할 수 있습니다.

















TypeScript의 `readonly` 한정자는 객체의 프로퍼티를 변경 불가능하게 만드는 강력한 기능입니다. 그러나 `readonly`의 사용범위와 기능에 대해 좀 더 깊이 들어가면, 다양한 상황에서의 적용 방법과 함께 몇 가지 추가적인 측면을 발견할 수 있습니다.

### `readonly`와 `const`의 차이

초보자가 종종 혼동하는 한 가지는 `readonly`와 `const`의 차이입니다. 간단히 말해서, `const`는 변수에 대한 바인딩을 불변으로 만들지만, `readonly`는 객체의 프로퍼티를 변경할 수 없게 만듭니다. 즉, `const`는 변수 자체에 적용되고, `readonly`는 객체의 속성에 적용됩니다.

### `Readonly` 타입 유틸리티

TypeScript는 `Readonly`라는 내장 타입 유틸리티를 제공합니다. 이를 사용하여 객체의 모든 프로퍼티를 일괄적으로 `readonly`로 만들 수 있습니다. 이는 인터페이스나 타입 별칭에서 개별 프로퍼티를 `readonly`로 만드는 것보다 더 간편할 수 있습니다.

```typescript
interface Person {
  name: string;
  age: number;
}

const person: Readonly<Person> = {
  name: "Alice",
  age: 30
};

// person.name = "Bob"; // 오류: Cannot assign to 'name' because it is a read-only property.
```

### `readonly` 배열

`readonly` 한정자는 배열에도 사용될 수 있으며, 이 경우 배열의 내용을 변경할 수 없게 만듭니다(예: 항목 추가, 삭제, 변경). TypeScript는 `ReadonlyArray<T>` 타입을 제공하여 이를 쉽게 적용할 수 있습니다. 이렇게 하면 배열의 불변성을 강제할 수 있습니다.

```typescript
let a: ReadonlyArray<number> = [1, 2, 3];
// a.push(4); // 오류: Property 'push' does not exist on type 'readonly number[]'.
// a[0] = 4; // 오류: Index signature in type 'readonly number[]' only permits reading.
```

### 객체 리터럴에서의 `readonly`

객체 리터럴에서 `readonly`를 사용하려면, 타입 어설션(Type Assertion)을 활용하거나, 객체를 생성할 때 `Readonly` 유틸리티 타입을 사용해야 합니다.

```typescript
const obj: Readonly<{ property: string }> = { property: "value" };
// obj.property = "another value"; // 오류: Cannot assign to 'property' because it is a read-only property.
```

### 결론

`readonly` 한정자와 관련된 기능은 TypeScript에서 객체의 불변성을 보장하는 데 중요한 역할을 합니다. 이를 통해 안전하고 예측 가능한 코드를 작성할 수 있으며, 의도치 않은 데이터 변경으로부터 보호할 수 있습니다. `readonly`, `ReadonlyArray`, `Readonly` 타입 유틸리티의 사용은 코드의 명확성과 유지 보수성을 향상시키는 데 기여합니다.

















네, TypeScript에서 `readonly` 한정자는 변수 선언에 직접 사용될 수 없습니다. `readonly`는 주로 객체의 프로퍼티나 클래스의 멤버 변수에 대한 변경 불가능성을 명시할 때 사용됩니다. 변수에 대해서는 `const` 키워드를 사용하여 해당 변수가 재할당될 수 없음을 나타냅니다.

### 변수에 대한 `const` 사용

변수를 선언할 때 `const`를 사용하면, 그 변수에 다른 값을 재할당할 수 없습니다. 이는 변수의 불변성을 보장하지만, `const`로 선언된 객체의 내부 상태(프로퍼티의 값)는 변경될 수 있습니다. 예를 들어:

```typescript
const number = 42;
// number = 43; // 오류: 'number'는 상수이므로 재할당할 수 없습니다.

const obj = { property: "value" };
obj.property = "new value"; // 가능: 'obj' 객체의 내부 상태 변경
// obj = { anotherProperty: "value" }; // 오류: 'obj'는 상수이므로 재할당할 수 없습니다.
```

### 객체 프로퍼티에 대한 `readonly` 사용

반면, `readonly` 한정자는 객체의 프로퍼티나 클래스 멤버에 적용될 수 있으며, 이를 통해 해당 프로퍼티의 값을 변경할 수 없게 만듭니다. `readonly`는 타입 정의 시에 사용됩니다:

```typescript
interface ReadonlyObject {
  readonly property: string;
}

let readonlyObj: ReadonlyObject = { property: "value" };
// readonlyObj.property = "new value"; // 오류: 'property'는 읽기 전용 속성이므로 할당할 수 없습니다.
```

### 결론

- 변수의 불변성은 `const`를 사용하여 선언함으로써 제공됩니다.
- 객체의 프로퍼티나 클래스 멤버의 변경 불가능성은 `readonly` 한정자를 사용하여 명시됩니다.

이 두 개념은 서로 보완적이며, TypeScript에서 데이터의 불변성을 관리하는 데 중요한 역할을 합니다. `const`는 변수의 재할당을 방지하는 반면, `readonly`는 객체의 프로퍼티나 클래스 멤버가 한 번 할당되면 변경되지 않음을 보장합니다.
