---
layout: skill
---

# Generic

- data 형식에 의존하지 않고, 하나의 값이 여러 다른 data type들을 가질 수 있도록 하는 방법
    - type이 class 내부에서 지정하는 것이아닌 외부에서 사용자에 의해 지정되는 것
- 특정(Specific) type을 미리 지정해주는 것이 아닌 필요에 의해 지정할 수 있도록 하는 일반(Generic) type이라는 것
    - 정확히는 지정된다는 것보다는 type의 경계를 지정하고 compile 때 해당 type으로 casting하여 매개변수화 된 유형을 삭제하는 것
- class와 interface에만 적용되며 기본(primary) type은 사용할 수 없음
    - ex) int, double, char, ...
    - 그래서 Integer, Double 같은 Wrapper Type으로 바꿔서 씀
- 장점
    1. 잘못된 type이 들어올 수 있는 것을 compile 단계에서 방지
        - 입력으로 받아들이면 안되는 객체 type을 입력 단계에서 걸러버림
    2. class 외부에서 type을 지정해주기 때문에 따로 type을 check하고 변환해줄 필요 없음
        - 관리하기 편함
    3. 비슷한 기능을 지원하는 경우 code의 재사용성이 높아짐
- 단점
    1. code에서 Generic은 직관적으로 이해하기 어려움
        - 단순하게 Generic만 쓴다면 괜찮겠지만, 상속하고 구현하는 등 계층 구조가 복잡해지면 파악하기 어려워짐
    2. compile 시점에만 type check를 해줌
        - runtime 시점에는 형 안전성을 제공하지 못함
- Generic에는 정해진 선언 규칙이 없지만, 통상적인 선언이 편하기 때문에 암묵적으로 아래와 같이 표기함
    |Type|Desc|
    |-|-|
    |<T>|Type|
    |<E>|Element|
    |<K>|Key|
    |<V>|Value|
    |<N>|Number|

## Generic Class & Generic Interface

- Generic type의 class, interface 선언
    - T type은 해당 block { ... } 안에서 까지만 유효함
    ```java
    public class ClassName <T> { ... }
    public Interface InterfaceName <T> { ... }
    ```

- Generic type이 두개일 때
    - type 인자로 두 개 밭는 대표적인 collection, HashMap이 있음
    ```java
    public class ClassName <T, K> { ... }
    public Interface InterfaceName <T, K> { ... }
    
    // HashMap의 경우 아래와 같이 선언되어 있음
    public class HashMap <K, V> { ... }
    ```

### Example

```java
class ClassName<K, V> {	
private K first;
private V second;

void set(K first, V second) {
        this.first = first;
        this.second = second;
    }
    
    K getFirst() {
        return first;
    }
    
    V getSecond() {
        return second;
    }
}

class Main {
    public static void main(String[] args) {
        
        ClassName<String, Integer> a = new ClassName<String, Integer>();
        
        a.set("10", 10);


        System.out.println("    fisrt data : " + a.getFirst());
        System.out.println("    K Type : " + a.getFirst().getClass().getName());
        /* output
            fist data : 10
            K Type : java.lang.String
        */
        
        System.out.println("    second data : " + a.getSecond());
        System.out.println("    V Type : " + a.getSecond().getClass().getName());
        /* output
            second data : 10
            V Type : java.lang.Integer
        */
    }
}
```

## Generic Method

- method에 한정한 generic도 사용할 수 있음
    ```java
    public <T> T genericMethod(T o) {
        ...
    }

    [접근 제어자] <generic type> [return type] [method명] ([generic type] [parameter]) {
        ...
    }
    ``

```java
class ClassName<E> {

    private E element;

    void set(E element) {
        this.element = element;
    }

    E get() {
        return element;
    }

    <T> T genericMethod(T o) {
        return o;
    }

}

public class Main {
    public static void main(String[] args) {

        ClassName<String> a = new ClassName<String>();        // generic type이 String으로 변환됨
        ClassName<Integer> b = new ClassName<Integer>();        // generic type이 Integer로 변환됨

        a.set("10");
        b.set(10);

        System.out.println("a data : " + a.get());
        System.out.println("a E Type : " + a.get().getClass().getName());
        /* output
            a data : 10
            a E Type : java.lang.String
        */

        System.out.println("b data : " + b.get());
        System.out.println("b E Type : " + b.get().getClass().getName());
        /* output
            b data : 10
            b E Type : java.lang.Integer
        */

        // paramter에 담은 자료형대로 알아서 변환됨
        System.out.println("<T> returnType : " + a.genericMethod(3).getClass().getName());
        System.out.println("<T> returnType : " + a.genericMethod(0.4).getClass().getName());
        System.out.println("<T> returnType : " + a.genericMethod("ABCD").getClass().getName());
        System.out.println("<T> returnType : " + a.genericMethod(true).getClass().getName());
        System.out.println("<T> returnType : " + a.genericMethod(b).getClass().getName());
        /* output
            <T> returnType : java.lang.Integer
            <T> returnType : java.lang.Double
            <T> returnType : java.lang.String
            <T> returnType : java.lang.Boolean
            <T> returnType : ClassName
        */
    }
}
```

### Generic Method가 필요한 이유

```java
class ClassName<E> {
    // static method는 객체가 생성되기 이전 시점에 memory에 먼저 올라가기 때문에 E type을 class로부터 얻어올 방법이 없음
	static E genericMethod(E o) {        // Error
		return o;
	}
}
 
class Main {
	public static void main(String[] args) {
		// ClassName 객체가 생성되기 전에 접근할 수 있으나 type을 지정할 방법이 없어 Error 발생
		ClassName.genericMethod(3);
	}
}
```
- static method는 instance가 생성되기 전에 이미 memory에 올라감
    - instance가 생성될 때 type을 입력받으면 늦음
    - 그래서 method에서도 독립적으로 generic type을 사용할 수 있도록 한 것

### Static Method Example

```java
class ClassName<E> {
 
	private E element; // generic type 변수
 
	void set(E element) { // generic parameter method
		this.element = element;
	}
 
	E get() { // generic type return method
		return element;
	}
 
	// 아래 method의 E type은 generic class의 E type과 다른 독립적인 type
	static <E> E genericMethod1(E o) { // generic method
		return o;
	}
 
	static <T> T genericMethod2(T o) { // generic method
		return o;
	}
 
}
 
public class Main {
	public static void main(String[] args) {
 
		ClassName<String> a = new ClassName<String>();
		ClassName<Integer> b = new ClassName<Integer>();
 
		a.set("10");
		b.set(10);
 
		System.out.println("a data : " + a.get()); // 반환된 변수의 type 출력
		System.out.println("a E Type : " + a.get().getClass().getName());
        /* output
            a data : 10
            a E Type : java.lang.String
        */

		System.out.println("b data : " + b.get()); // 반환된 변수의 type 출력
		System.out.println("b E Type : " + b.get().getClass().getName());
        /* output
            b data : 10
            b E Type : java.lang.Integer
        */
 
		// generic method1 Integer
		System.out.println("<E> returnType : " + ClassName.genericMethod1(3).getClass().getName());
        /* output
            <E> returnType : java.lang.String
        */
 
		// generic method1 String
		System.out.println("<E> returnType : " + ClassName.genericMethod1("ABCD").getClass().getName());
        /* output
            <E> returnType : java.lang.String
        */
 
		// generic method2 ClassName a
		System.out.println("<T> returnType : " + ClassName.genericMethod1(a).getClass().getName());
        /* output
            <T> returnType : java.lang.ClassName
        */
 
		// generic method2 Double
		System.out.println("<T> returnType : " + ClassName.genericMethod1(3.0).getClass().getName());
        /* output
            <T> returnType : java.lang.Double
        */
	}
}
```

# 제한된 Generic & Wildcard

- extends, super, ?(물음표)로 특정 범위 내로 좁혀서 generic type을 사용할 수 있음
    - ? : wildcard (알 수 없는 type)
```java
<K extends T>	// T와 T의 자손 type만 가능 (K는 들어오는 type으로 지정 됨)
<K super T>	// T와 T의 부모(조상) type만 가능 (K는 들어오는 type으로 지정 됨)
 
<? extends T>	// T와 T의 자손 type만 가능
<? super T>	// T와 T의 부모(조상) type만 가능
<?>	// 모든 type 가능. <? extends Object>랑 같은 의미
```
    - extends T : 상한 경계
    - ? super T : 하한 경계
    - <?> : Wildcard

## Wildcard

- generic으로 구현된 method의 경우에는 선언된 type으로만 매개 변수를 입력해야 함
    - 이를 상속받은 class, 혹은 부모 class를 매개변수로 사용할 수 없음
    - 혹은 어떤 type이 와도 상관 업는 경우에 대응하기 좋지 않음
    - 이 때, wildcard를 사용

```java
// Foo.java
public class Foo {
    public void foo() {
        // do something;
    }
}

// Bar.java
public class Bar extends Foo {
    public void bar() {
        // do something
    }
}
```

```java
// WildCard.java
public class WildCard {
    public <T extends Foo> void test(List<T> fooList) {
        fooList.get(0).foo();
        fooList.get(0).bar(); // Error
            // Foo를 상속받은 Bar의 method이지만 Bar의 존재를 알 수 없기 때문에 불가능
    }
}

List<?> unboundList = new ArrayList<>(); // Unbound

List<? extends Foo> upperList = new ArrayList<>(); // Upper bound

List<? super Bar> lowerList = new ArrayList<>(); // Lower bound

WildCard wildCard = new WildCard();
wildCard.test(upperList);
wildCard.test(lowerList); // Error
// Bar의 super class중에 Foo가 있다고 해도 parameter로 넘길 수 없음
```

### Unbound Wildcard

- List<?>
- 내부적으로는 Object로 정의되어 사용되고, 모든 type을 인자로 받을 수 있음
- type parameter에 의존하지 않는 method만을 사용하거나, Object method에서 제공하는 기능으로 충분한 경우에 사용

### Upper Bounded Wildcard

- List<? extends Foo>
- 특정 class의 자식 class만을 인자로 받겠다는 선언
- Foo class를 상속받은 어떤 class가 와도 되지만, 사용할 수 있는 기능은 Foo class에 정의된 기능만 사용 가능
    - 주로 변수의 제한을 느슨하게 하기 위해 사용됨

### Lower Bounded Wildcard

- List<? super Foo>
- 특정 class의 부모 class만을 인자로 받겠다는 선언

---

## Reference

- https://st-lab.tistory.com/153
- https://velog.io/@eversong/Java-Generic-WildCard%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C
    - wildcard
