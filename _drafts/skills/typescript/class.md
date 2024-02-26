---
layout: skill
title: TypeScript - Class
date: 2024-02-26
---




- TypeScript가 지원하는 class는 **JavaScript ES6의 class와 유사**하지만, 몇 가지 **TypeScript만의 고유한 확장 기능**이 있습니다.
    - TypeScript의 class는 정적 typing과 몇 가지 추가 기능을 제공하여 class를 더욱 강력하고 안전하게 만듭니다.




---




## Class 정의 (Class Definition)

- JavaScript ES6의 class는 class body에 method만을 포함할 수 있습니다.
- class body에 class property를 선언할 수 없고, 반드시 생성자 내부에서 class property를 선언하고 초기화합니다.

```javascript
// person.js
class Person {
    constructor(name) {
        this.name = name;    // class property의 선언과 초기화
    }

    walk() {
        console.log(`${this.name} is walking.`);
    }
}
```

- JavaScript ES6에서는 문제없이 실행되는 code이지만, file의 확장자를 `ts`로 바꾸어 TypeScript file로 변경한 후 compile하면 compile error가 발생합니다.

```
person.ts(4,10): error TS2339: Property 'name' does not exist on type 'Person'.
person.ts(8,25): error TS2339: Property 'name' does not exist on type 'Person'.
```


### TypeScript에서 Class 정의하기

- TypeScript class는 class body에 **class property를 사전에 선언**해야 합니다.

```typescript
// person.ts
class Person {
    name: string;    // class property 사전 선언

    constructor(name: string) {
        this.name = name;    // class property에 값 할당
    }

    walk() {
        console.log(`${this.name} is walking.`);
    }
}

const person = new Person('Lee');
person.walk();    // Lee is walking
```




---




## 접근 제한자

- TypeScript class는 class 기반 객체 지향 언어가 지원하는 접근 제한자 `public`, `private`, `protected`를 지원하며, 의미 또한 기본적으로 동일합니다.
    - 접근 제한자(Access Modifier)는 class 내부의 property과 method의 접근성을 제어하는 keyword입니다.
    - 접근 제한자는 class를 사용하는 외부 code에서 class 내부의 특정 member에 접근할 수 있는지 여부를 결정합니다.

| 접근 가능성 | public | protected | private |
| --- | --- | --- | --- |
| Class 내부 | O | O | O |
| 자식 Class 내부| O | O | x |
| Class Instance | O | x | x |

- `public`으로 지정하고자 하는 member 변수와 method는 접근 제한자를 생략하면 됩니다.
    - TypeScript의 경우, 접근 제한자를 생략한 class property와 method는 암묵적으로 `public`이 선언됩니다.
    - 다른 class 기반 언어의 경우, 접근 제한자를 명시하지 않으면 암묵적으로 `protected`로 지정되어 package level로 공개됩니다.

```typescript
class Foo {
    public x: string;
    protected y: string;
    private z: string;

    constructor(x: string, y: string, z: string) {
        // public, protected, private 접근 제한자 모두 class 내부에서 참조 가능함
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

const foo = new Foo('x', 'y', 'z');

// public 접근 제한자는 class instance를 통해 class 외부에서 참조 가능함
console.log(foo.x);

// protected 접근 제한자는 class instance를 통해 class 외부에서 참조할 수 없음
console.log(foo.y);    // error TS2445: Property 'y' is protected and only accessible within class 'Foo' and its subclasses.

// private 접근 제한자는 class instance를 통해 class 외부에서 참조할 수 없음
console.log(foo.z);    // error TS2341: Property 'z' is private and only accessible within class 'Foo'.

class Bar extends Foo {
    constructor(x: string, y: string, z: string) {
        super(x, y, z);

        // public 접근 제한자는 자식 class 내부에서 참조 가능함
        console.log(this.x);

        // protected 접근 제한자는 자식 class 내부에서 참조 가능함
        console.log(this.y);

        // private 접근 제한자는 자식 class 내부에서 참조할 수 없음
        console.log(this.z);    // error TS2341: Property 'z' is private and only accessible within class 'Foo'.
    }
}
```


### 생성자 Parameter에 접근 제한자 선언

- 생성자(constructor) parameter에도 접근 제한자를 선언할 수 있습니다.
- 이때 **접근 제한자가 사용된 생성자 파라미터는 암묵적으로 class property로 선언되고 생성자 내부에서 별도의 초기화가 없어도 암묵적으로 초기화가 수행된다.**

이때 private 접근 제한자가 사용되면 class 내부에서만 참조 가능하고 public 접근 제한자가 사용되면 class 외부에서도 참조가 가능하다.

```typescript
class Foo {
    /*
    접근 제한자가 선언된 생성자 파라미터 x는 class property로 선언되고 지동으로 초기화된다.
    public이 선언되었으므로 x는 class 외부에서도 참조가 가능하다.
    */
    constructor(public x: string) { }
}

const foo = new Foo('Hello');
console.log(foo);    // Foo { x: 'Hello' }
console.log(foo.x);    // Hello

class Bar {
    /*
    접근 제한자가 선언된 생성자 파라미터 x는 멤버 변수로 선언되고 자동으로 초기화된다.
    private이 선언되었으므로 x는 class 내부에서만 참조 가능하다.
    */
    constructor(private x: string) { }
}

const bar = new Bar('Hello');

console.log(bar); // Bar { x: 'Hello' }

// private이 선언된 bar.x는 class 내부에서만 참조 가능하다
console.log(bar.x); // Property 'x' is private and only accessible within class 'Bar'.
```

만일 생성자 파라미터에 접근 제한자를 선언하지 않으면 생성자 파라미터는 생성자 내부에서만 유효한 지역 변수가 되어 생성자 외부에서 참조가 불가능하게 된다.

```typescript
class Foo {
    // x는 생성자 내부에서만 유효한 지역 변수이다.
    constructor(x: string) {
        console.log(x);
    }
}

const foo = new Foo('Hello');
console.log(foo); // Foo {}
```




---




## `readonly` Keyword

- TypeScript class의 `readonly` keyword는 변수 할당 시의 `const` keyword와 유사합니다.
- `readonly`가 선언된 class property는 선언 시 또는 생성자 내부에서만 값을 할당할 수 있습니다.
    - 이 외의 경우에는 값을 할당할 수 없고, 오직 읽기만 가능한 상태가 됩니다.
- 일반적으로 상수를 선언할 때 사용합니다.

```typescript
class Foo {
    private readonly MAX_LEN: number = 5;
    private readonly MSG: string;

    constructor() {
        this.MSG = 'hello';
    }

    log() {
        // readonly가 선언된 property는 재할당이 금지됨
        this.MAX_LEN = 10;    // Cannot assign to 'MAX_LEN' because it is a constant or a read-only property.
        this.MSG = 'Hi';    // Cannot assign to 'MSG' because it is a constant or a read-only property.

        console.log(`MAX_LEN : ${this.MAX_LEN}`);    // MAX_LEN : 5
        console.log(`MSG : ${this.MSG}`);    // MSG : hello
    }
}

new Foo().log();
```




---




## `static` Keyword

- JavaScript ES6의 class에서 `static` keyword는 class의 정적(static) method를 정의합니다.
- 정적 method는 class의 instance가 아닌 **class 이름으로 호출**하기 때문에, class의 instance를 생성하지 않아도 호출할 수 있습니다.
    - 정적 method는 this를 사용할 수 없으며, 정적 method 내부의 this는 class의 instance가 아닌 class 자신을 가리킵니다.

```javascript
class Foo {
    constructor(prop) {
        this.prop = prop;
    }

    static staticMethod() {
        return 'staticMethod';
    }

    prototypeMethod() {
        return this.prop;
    }
}

// 정적 method는 class 이름으로 호출함
console.log(Foo.staticMethod());    // staticMethod

// 정적 method는 instance로 호출할 수 없음
const foo = new Foo(123);
console.log(foo.staticMethod());    // Uncaught TypeError: foo.staticMethod is not a function.
```

**TypeScript에서는 static keyword를 class property에도 사용할 수 있다.** 정적 method와 마찬가지로 정적 class property는 instance가 아닌 class 이름으로 호출하며 class의 instance를 생성하지 않아도 호출할 수 있다.

```typescript
class Foo {
    // 생성된 instance의 갯수
    static instanceCounter = 0;
    constructor() {
        // 생성자가 호출될 때마다 카운터를 1씩 증가시킨다.
        Foo.instanceCounter++;
    }
}

var foo1 = new Foo();
var foo2 = new Foo();

console.log(Foo.instanceCounter);    // 2
console.log(foo2.instanceCounter); // error TS2339: Property 'instanceCounter' does not exist on type 'Foo'.
```

## 추상 Class (abstract class)

- 추상 class(abstract class)는 하나 이상의 추상 method를 포함하며 일반 method도 포함할 수 있다. 추상 method는 내용이 없이 method 이름과 타입만이 선언된 method를 말하며 선언할 때 abstract keyword를 사용한다. 추상 class를 정의할 때는 abstract keyword를 사용하며, 직접 instance를 생성할 수 없고 상속만을 위해 사용된다. 추상 class를 상속한 class는 추상 class의 추상 method를 반드시 구현하여야 한다.

- [interface](./typescript-interface)는 모든 method가 추상 method이지만 추상 class는 하나 이상의 추상 method와 일반 method를 포함할 수 있다.


```typescript
abstract class Animal {
    // 추상 method
    abstract makeSound(): void;
    // 일반 method
    move(): void {
        console.log('roaming the earth...');
    }
}

// 직접 instance를 생성할 수 없다.
// new Animal();
// error TS2511: Cannot create an instance of the abstract class 'Animal'.

class Dog extends Animal {
    // 추상 class를 상속한 class는 추상 class의 추상 method를 반드시 구현하여야 한다
    makeSound() {
        console.log('bowwow~~');
    }
}

const myDog = new Dog();
myDog.makeSound();
myDog.move();
```




---




## Reference

- <https://poiemaweb.com/typescript-class>