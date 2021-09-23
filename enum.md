# Enum

- Enumeration Type : 열거 type
  - 요일, 계절과 같이 한정된 data만을 가지는 type
- 관련 있는 상수(constnat)들의 집합
- .java로 생성하되 Java file 안에서 class 대신 enum을 적어줌

## 열거 상수 naming

- 모두 대문자
- 2개 이상의 단어일 때는 '_'로 연결

```java
Week.java 
public enum Week {
  MONDAY, TUSEDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

## Enum과 Memory 구조

- Java에서 열거 상수는 각각을 내부적으로 'public static final' field이면서 객체로 제공되도록 함
- static이 붙어있기 때문에 각각의 상수는 class 변수로 class loader가 load 시점에 JVM Method 영역에 해당 class 변수들을 항상 상주시킴
  - program이 종료되기 전에는 언제든지 가져다 쓸 수 있는 주소 공간을 확보함

## Enum과 Memory 초기화

- 사용법은 class의 instance를 생성하는 것과 비슷하지만, new가 없는 형태

```java
Week today = Week.MONDAY;
// 어떤 class에서든 해당 logic을 만나면 Heap영역에 Week 객체는 MONDAY부터 SUNDAY까지 각각 java.lang.Enum class를 상속받는 고유의 객체가 만들어지고, Method 영역의 열거 상수들은 해당 Heap 영역에 생성된 객체를 바라봄
// logic을 만나는 순간 전에 'Method 영역을 위해 할당되었던 memory'에 'Heap 영역에 생긴 객체들'이 할당됨
```

```java
today == Week.SUNDAY;    // true
// today와 Week.SUNDAY가 같은 객체를 반환하으로 true가 성립됨

Week thisWeek = Week.SUNDAY;
Week nextWeek = Week.SUNDAY;
thisWeek == nextWeek;    // true
// 서로 같은 객체를 반환하으로 true가 성립됨

/* 같은 객체를 반환하는 이유 */
// today 변수는 Stack 영역에 있으면서 Method 영역에 있는 MONDAY 객체의 주소값을 복사해서 가지고 있음
// 따라서 today와 Week.MONDAY는 Heap 영역에 생성된 같은 객체를 바라보게 됨
```

## Enum 응용

- 열거 상수는 곧 열거 객체
  - java.lang.Enum class를 상속받음
  - 따라서 name(), ordinal(), conpareTo(), valueOf(String name), values() method를 사용할 수 있음

### 특정 class에서만 필요할 때, 열거 type 선언

```java
public class Shoes {
    public String name;
    public int size;
    public enum Type {
        WALKING, RUNNING, TRACKING, HIKING
    }
}
```

### private 생성자

- enum은 class처럼 생성자를 가질 수 있음
- class와는 다르게 고정된 상수의 집합이므로 run time이 아닌 compile time에 모든 값을 가지고 있어야 하기 때문에 (public이 아닌) private으로 선언되어야 함

```java
public enum Color {
    RED, GREEN, BLUE; 
    private Color() { 
        System.out.println("Constructor called for : " + this.toString()); 
    } 
}

Color color = Color.BLUE;

/* 출력 */
// Constructor called for : RED
// Constructor called for : GREEN
// Constructor called for : BLUE
```

- 열거 상수 객체들이 Heap에서 각각 생성되므로 모든 색깔에 대해서 출력됨

### Enum 일반 method

- enum은 다른 추상 method가 아닌 일반 method를 가질 수 있음

```java
public enum Color {
    RED, GREEN, BLUE;

    public void colorInfo() { 
        System.out.println("Universal Color"); 
    }
}

Color.BLUE.colorInfo();

/* 출력 */
// Universal Color
```

### Enum 추가 속성과 생성자

- 열거형 상수는 추가 속성을 부여할 수 있음
- 추가 속성 여러 개가 있을 때, 생성자에 순서대로 각각의 type으로 넣을 수 있음
```java
public enum Color {

    RED("빨강", 100), GREEN("초록", 10), BLUE("파랑", 30); 
    
    private String koreName;
    private int pay;

    // 빨강, 100 순서대로 할당됨
    private Color(String koreName, int pay) {
        this.koreName = koreName;
        this.pay = pay;
    } 

    public void colorInfo() {
        System.out.println(koreName + "의 비용은 " + pay + "입니다."); 
    } 
}

Color.BLUE.colorInfo();

/* 출력 */
// 파랑의 비용은 30입니다.
```

### Enum Method 재정의

- abstract method를 통해 열거형 상수 안에 각 상서 별로 특정 method를 재정의하도록 할 수 있음

```java
public enum Color {
    RED("빨강", 100) {
        @Override
        public int calc(int a, int b) {
            return a + b;
        }
    }, GREEN("초록", 10) {
        @Override
        public int calc(int a, int b) {
            return a - b;
        }
    }, BLUE("파랑", 30) {
        @Override
        public int calc(int a, int b) {
            return a * b;
        }
    }; 
    
    private String koreName;
    private int pay;
    private Color(String koreName, int pay) {
        this.koreName = koreName;
        this.pay = pay;
    } 

    public void colorInfo() {
        System.out.println(koreName +"의 비용은 " + pay +"입니다."); 
    } 
    
    public abstract int calc(int a, int b);
}

System.out.println(Color.BLUE.calc(5, 10));

/* 출력 */
// 50
```

### 중첩 Enum

- enum 상수끼리 공유하는 code를 만들고 싶다면, 중첩 enum을 만들어 사용할 수 있음

```java
public enum Color {
    RED("빨강", 100, CheckPay.RED ), GREEN("초록", 30, CheckPay.RED), BLUE("파랑", 49, CheckPay.BLUE);
    
    private String koreName;
    private int pay;
    private CheckPay checkPay;
    private Color(String koreName, int pay, CheckPay checkPay) { 
        this.koreName = koreName;
        this.pay = pay;
        this.checkPay = checkPay;
    } 

    
    public int calc() {
        return this.checkPay.calc(pay);
    };
    
    private enum CheckPay {
        RED {
            @Override
            public int calc(int pay) {
                return pay * 100;
            }
        } ,BLUE{
            @Override
            public int calc(int pay) {
                return pay * 50;
            }
        };
        
        public abstract int calc(int pay);
    }
}

System.out.println(Color.BLUE.calc());

/* 출력 */
// 2450
```

---

# Reference

- https://honbabzone.com/java/java-enum