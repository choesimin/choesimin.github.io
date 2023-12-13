---
layout: note
title: Singleton Pattern - 하나의 객체만 만들어 공용으로 사용하기
date: 2023-11-01
---




- Singleton Pattern은 해당 class의 instance가 하나만 만들어지고, 어디서든지 그 instance에 접근할 수 있도록 하기 위한 pattern입니다.

- 하나만 있어도 되는 객체를 만들 때 사용할 수 있습니다.
    - e.g., Connection pool, Thread pool, Cache, 대화 상자, 사용자 설정 & Registry 설정 객체, Log 기록용 객체, Device driver (Printer, Graphic card), ...




## Singleton 주요 특징 : Instance를 추가로 만들 수 없음

- 객체의 생성자를 private으로 지정하여, 다른 어떤 class에서도 instance를 추가로 만들지 못하도록 합니다.
- client는 instance를 직접 만들지 않고, instance를 달라고 요청(`getInstance()`)합니다.
    - 생성자가 private하기 때문에, instance가 필요하면 반드시 singleton class를 거치게 됩니다.


## 'Singleton class'와 '모든 함수와 변수가 static으로 선언된 class'의 비교

- Singleton class는 결과적으로 '모든 method와 변수가 static으로 선언된 class'와 같으나, Singleton class가 더 낫습니다.
- '모든 method와 변수가 static으로 선언된 class'는 필요한 내용이 class에 다 들어있고, 복잡한 초기화가 필요 없는 경우에만 사용할 수 있습니다.
    - Java에서 정적 초기화를 할 때, 초기화 순서와 관련된 bug가 생길 수 있습니다.
    - 초기화 순서와 관련된 bug는 찾아내기 어렵고 복잡미묘하기 때문에, 차라리 singleton을 만드는 것이 낫습니다.


## 'Singleton 객체'와 '전역 변수'의 비교

### 전역 변수의 단점 (Singleton 객체와 비교했을 때)

- 게으른(lazy) instance 생성을 할 수 없습니다.
    - 전역 변수는 application이 시작될 때 객체가 생성되며, 처음부터 끝까지 instance를 가지고 있어야 합니다.
    - 만약 이 객체가 자원을 많이 차지하고, application이 끝날 때까지 이 객체를 한 번도 사용하지 않는다면, 자원만 잡아먹는 객체가 됩니다.
    - 그러나 예외적으로, 어떤 platform에서는 객체를 나중에 만들기도 합니다.

- java의 전역 변수는 객체에 대한 정적 reference입니다.
    - 간단한 객체에 대한 전역 reference를 자꾸 만들게 되어 namespace를 지저분하게 만듭니다.
    - singleton도 남용될 수 있지만, namespace를 지저분해지게 만드는 정도까진 아닙니다.


## Singleton class의 sub class를 만드는 것은 권장하지 않음

- singleton을 sub class로 확장할 이유가 없습니다.
- application을 만들 때, singleton을 꽤 많이 사용하고 있다면 전반적인 설계(design)을 다시 생각해 보는 것이 좋습니다.
    - singleton은 제한된 용도로 특수한 상황에서 사용하기 위해 만들어진 것이기 때문입니다.

- singleton은 생성자가 private으로 선언되어 있어, 확장할 수 없습니다.
    - sub class를 만들기 위해서는 생성자를 public 또는 protected로 선언해야 합니다.
        - 하지만 이렇게 하면 다른 곳에서 instance를 만들 수 있기 때문에 더 이상 singleton이 아니게 됩니다.

- singleton은 정적 변수를 바탕으로 구현하기 때문에 모든 sub class들이 똑같은 instance 변수를 공유하게 됩니다.
    - sub class를 만들려면 base class에서 registry 역할을 하는 것을 구현해 놓아야 합니다.




---




## Class Diagram

```mermaid
classDiagram

class Singleton {
    static uniqueInstance
    ...

    static getInstance()
    ...()
}
```

### 생성자

- private으로 선언합니다.
- Singleton에서만 class의 instance를 만들 수 있습니다.


### `uniqueInstance`

- 유일한 instance를 저장하기 위한 정적 변수입니다.
    

### `getInstance()`

- 정적 method(class method)이며, 언제 어디서든 이 method를 호출할 수 있습니다.
    - 전역 변수만큼 쉽게 접근할 수 있습니다.

- 게으른(lazy) instance 생성을 활용할 수 있습니다.
    - 자원을 많이 잡아먹는 경우에 유용합니다.


### 기타 Method

- singleton pattern을 구현한다고 해서 꼭 간단해야 하는 것은 아닙니다.
- 일반적인 class를 만들 때와 마찬가지로 다양한 data와 method를 사용할 수 있습니다.




---




## 구현


### Classic Singleton Pattern

- 이 방식은 thread safe하지 않습니다.

```java
// This is not thread safe.
public class Singleton {
    private static Singleton uniqueInstance;
 
    private Singleton() {}
 
    public static Singleton getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }
 
    // other useful methods here
    public String getDescription() {
        return "I'm a classic Singleton!";
    }
}
```

```java
public class SingletonClient {
    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();
        System.out.println(singleton.getDescription());
    }
}
```


### Thread Safe Singleton Pattern 1

- `getInstance()` method를 동기화시켜 multi threading 문제를 해결할 수 있습니다.

- 불필요한 overhead가 증가한다는 단점이 있습니다.
    - 동기화가 꼭 필요한 시점은 이 method가 시작될 때 뿐입니다.
    - 일단 uniqueInstance 변수에 Singleton instance를 대입하고 나면, 이 method를 굳이 동기화된 상태로 유지시킬 필요가 없게 됩니다.
    - `getInstance()`의 속도가 중요하지 않다면 그냥 둬도 되지만, 만약 `getInstance()`가 application에서 병목으로 작용한다면 다른 방법을 생각해봐야 합니다.

```java
public class Singleton {
    private static Singleton uniqueInstance;
 
    // other useful instance variables here
 
    private Singleton() {}
 
    public static synchronized Singleton getInstance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }
 
    // other useful methods here
    public String getDescription() {
        return "I'm a thread safe Singleton!";
    }
}
```

```java
public class SingletonClient {
    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();
        System.out.println(singleton.getDescription());
    }
}
```


### Thread Safe Singleton Pattern 2

- instance를 필요할 때 생성하지 않고, 처음부터 만듭니다.
- `getInstance()` method에 `synchronized`를 사용하지 않아도 thread safe합니다.
    - `synchronized`를 사용함으로써 생기는 부담을 줄일 수 있습니다.
- class가 loading될 때 JVM에서 Singleton의 유일한 instance를 생성해 줍니다.
    - JVM에서 유일한 instance를 생성하기 전에는 어떤 thread도 uniqueInstance 정적 변수에 접근할 수 없습니다.

- 'application에서 반드시 Singleton의 instance를 생성해야 하는 경우'와 'instance를 실행 중에 수시로 만들고 관리하기 성가신 경우'에 유용합니다.

```java
public class Singleton {
    private static Singleton uniqueInstance = new Singleton();
 
    private Singleton() {}
 
    public static Singleton getInstance() {
        return uniqueInstance;
    }
    
    // other useful methods here
    public String getDescription() {
        return "I'm a statically initialized Singleton!";
    }
}
```

```java
public class SingletonClient {
    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();
        System.out.println(singleton.getDescription());
    }
}
```


### Thread Safe Singleton Pattern 3

- DCL(Double-Checking Locking)을 사용합니다.
    - instance가 생성되어 있는지 확인한 다음, 생성되어 있지 않을 때만 동기화를 할 수 있습니다.
        - `getInstance()`에서 동기화되는 부분이 줄어들게 됩니다.
    - 처음에만 동기화를 하고 나중에는 동기화를 하지 않아도 됩니다.

- 이 방법은 Java 5 이상에서만 사용할 수 있습니다.
    - Java 1.4 이전의 JVM에서는 `volatile` keyward를 사용하더라도 동기화가 잘 안되는 경우가 많습니다.

- `getInstance()` method를 사용할 때 속도가 문제가 된다면, 이 방법으로 overhead를 크게 줄일 수 있습니다.

```java
// Danger! This implementation of Singleton not guaranteed to work prior to Java 5

public class Singleton {
    private volatile static Singleton uniqueInstance;
 
    private Singleton() {}
 
    public static Singleton getInstance() {
        if (uniqueInstance == null) {
            synchronized (Singleton.class) {
                if (uniqueInstance == null) {
                    uniqueInstance = new Singleton();
                }
            }
        }
        return uniqueInstance;
    }
}
```

```java
public class SingletonClient {
    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();
    }
}
```




---




## Example : Chocolate 공장의 Chocolate Boiler

- Chocolate boiler 가동은 따로 제어하면 안 됩니다.
    - 따라서 instance가 하나만 있어야 합니다.


### Code

```java
public class ChocolateBoiler {
    private boolean empty;
    private boolean boiled;
    private static ChocolateBoiler uniqueInstance;
  
    private ChocolateBoiler() {
        empty = true;
        boiled = false;
    }
  
    public static ChocolateBoiler getInstance() {
        if (uniqueInstance == null) {
            System.out.println("Creating unique instance of Chocolate Boiler");
            uniqueInstance = new ChocolateBoiler();
        }
        System.out.println("Returning instance of Chocolate Boiler");
        return uniqueInstance;
    }

    public void fill() {
        if (isEmpty()) {
            empty = false;
            boiled = false;
            // fill the boiler with a milk/chocolate mixture
        }
    }
 
    public void drain() {
        if (!isEmpty() && isBoiled()) {
            // drain the boiled milk and chocolate
            empty = true;
        }
    }
 
    public void boil() {
        if (!isEmpty() && !isBoiled()) {
            // bring the contents to a boil
            boiled = true;
        }
    }
  
    public boolean isEmpty() {
        return empty;
    }
 
    public boolean isBoiled() {
        return boiled;
    }
}
```

```java
public class ChocolateController {
    public static void main(String args[]) {
        ChocolateBoiler boiler = ChocolateBoiler.getInstance();
        boiler.fill();
        boiler.boil();
        boiler.drain();

        // will return the existing instance
        ChocolateBoiler boiler2 = ChocolateBoiler.getInstance();
    }
}
```




---




## Reference

- Head First Design Patterns - Eric Freeman, Elisabeth Robson, Bert Bates, Kathy Sierra
