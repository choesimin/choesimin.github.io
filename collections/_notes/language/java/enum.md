---
layout: note
published: false
---

# Enum

- Enumeration Type : 열거 type
    - 요일, 계절과 같이 한정된 data만을 가지는 type
- 관련 있는 상수(constnat)들의 집합
- .java로 생성하되 Java file 안에서 class 대신 enum을 적어줌
- interface나 class로 상수를 정의하는 것을 보완하여 IDE의 지원을 적극적으로 받을 수 있으며 type 안전성을 갖출 수 있음

## 예전 방식의 단점 : Enum이 등장한 이유

- 해당 class 내부에 'final static String', 'final static int'와 같이 정의
    - 이 방식은 상수가 많아질 경우 가독성이 떨어지고, 무엇에 관한 상수인지 파악하기 어려움
- class에 상수를 선언할 때의 불편함을 피하기 위해 새로운 상수 class 또는 상수 interface를 만들어서 정의
    - interface에 선언되는 변수는 자동으로 static final이 붙는 것을 이용

```java
interface UNIVERSITY {
    int SEOUL = 1;
    int YONSEI = 2;
    int KOREA = 3;
}

interface MAJOR {
    int KOREAN = 1;
    int MATH = 2;
    int ENGLISH = 3;
    int SCIENCE = 4;
}

public class EnumExample {
    public static void main(String[] args) {

        if(UNIVERSITY.SEOUL == MAJOR.KOREAN){
            System.out.println("두 상수는 같습니다");
        }

        int major = MAJOR.MATH;

        switch (major){
            case MAJOR.KOREAN:
                System.out.println("국어 전공");
                break;
            case MAJOR.MATH:
                System.out.println("수학 전공");
                break;
            case MAJOR.ENGLISH:
                System.out.println("영어 전공");
                break;
            case MAJOR.SCIENCE:
                System.out.println("과학 전공");
                break;
        }
    }
}
```

- interface를 통해 상수를 표현했을 때, 'final static int'와 같이 표현하는 것보다 구별하기 쉬워짐
- 단점 : UNIVERSITY의 상수와 MAJOR 상수를 비교할 때 두 상수 모두 int type이고 1이라는 값도 동일하기 때문에 제대로 된 비교를 할 수 없음
    - 다른 집합의 상수끼리는 비교를 하면 안되기 때문에 compile 단계에서 error를 확인할 수 있어야 함
    - 이렇게 code를 구현하게 되면 runtime 단계에서 예기치 못한 문제를 마주치게 됨

```java
class UNIVERSITY {
    public static final UNIVERSITY SEOUL = new UNIVERSITY();
    public static final UNIVERSITY YONSEI = new UNIVERSITY();
    public static final UNIVERSITY KOREA = new UNIVERSITY();
}

class MAJOR {
    public static final MAJOR KOREAN = new MAJOR();
    public static final MAJOR MATH = new MAJOR();
    public static final MAJOR ENGLISH = new MAJOR();
    public static final MAJOR SCIENCE = new MAJOR();
}

public class EnumExample {
    public static void main(String[] args) {

        if(UNIVERSITY.SEOUL == MAJOR.KOREAN){
            System.out.println("두 상수는 같습니다");
        }

        MAJOR major = MAJOR.MATH;

        switch (major){
            case MAJOR.KOREAN:
                System.out.println("국어 전공");
                break;
            case MAJOR.MATH:
                System.out.println("수학 전공");
                break;
            case MAJOR.ENGLISH:
                System.out.println("영어 전공");
                break;
            case MAJOR.SCIENCE:
                System.out.println("과학 전공");
                break;
        }
    }
}
```

- interface로 작성한 부분을 class로 변경
    - 각 상수에 자기 자신을 instance화하여 값을 할당하기 때문에 상수 집합에서 각 상수들의 type은 동일하되 data는 다르게 됨
    - 상수를 interface로 정의한 결과와 달리 UNIVERSITY의 상수와 MAJOR 상수를 비교할 경우 서로 다른 data type끼리 비교할 수 없다는 message와 함께 compile 단계에 예외가 발생함
    - runtime에서 발생할 수 있는 error를 compile 단계에서 미리 알 수 있기 때문에 사전에 잘못된 code를 차단할 수 있음
- 단점 : switch문에서 호환될 수 없는 type이라는 message와 함께 compile 예외가 발생
    - 상수를 사용할 때 switch문을 사용하지 못하면 가독성이 크게 저하됨
    - 이를 해결할 수 있는 상수 표현 방법이 Enum class

## Enum의 특징

1. class를 상수처럼 사용할 수 있음
    - Enum은 고정된 상수들의 집합으로, rum time이 아닌 compile time에 모든 값에 대해 알아야 함
    - 즉, 다른 package나 class에서 Enum type에 접근해서 동적으로 어떤 값을 정해줄 수 없음
2. Enum class를 구현하는 경우 상수 값과 같이 유일하게 하나의 instance가 생성되어 사용됨
    - Enum class에서 선언한 상수들은 class가 load될 때 생성되어 Sigleton 형태로 사용됨
    - '상수 값으로 정의되지 않은 instance 변수'가 있다면 multi thread programming 환경에서 문제가 발생할 수 있음
        - '상수 값으로 정의되지 않은 instance 변수'는 Enum class 내에 선언된 일반 method를 통해 변경할 수 있음
        - 여러 thread에서 상수를 사용하면 '상수 값으로 정의되지 않은 instance 변수'는 공유되기 때문에 조심해야 함
3. instance의 생성과 상속을 방지하여 상수 값의 type 안정성이 보장됨
    - Enum class의 생성자를 private로 선언하여 다른 package나 class에서 동적으로 값을 할당할 수 없기 때문에 타입 안정성이 보장됨
    - 모든 Enum class는 내부적으로 java.lang.enum class를 상속 받고 Java는 다중 상속을 지원하지 않기 때문에 Enum은 다른 class를 상속받을 수 없음
        - 하지만 여러 개의 interface들은 구현 가능

## Enum 열거 상수 선언하기

- 모두 대문자
- 2개 이상의 단어일 때는 '_'로 연결

```java
// Week.java 

public enum Week {
    MONDAY, TUSEDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

## Enum과 Memory

- Java에서 열거 상수는 각각을 내부적으로 'public static final' field이면서 객체로 제공되도록 함
- static이 붙어있기 때문에 각각의 상수는 class 변수로 class loader가 load 시점에 JVM Method 영역에 해당 class 변수들을 항상 상주시킴
    - program이 종료되기 전에는 언제든지 가져다 쓸 수 있는 주소 공간을 확보함

### Memory 초기화

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

## Reference

- https://docs.oracle.com/javase/7/docs/api/java/lang/Enum.html
    - 공식 문서
        - method에 대한 명세
- https://honbabzone.com/java/java-enum
    - enum
- https://math-coding.tistory.com/179
    - 예전 방식의 문제점
