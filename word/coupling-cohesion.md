# 결합도

- module 내부가 아닌 외부의 module과의 연관도 또는 module 간의 상호의존성을 나타내는 정도
- software 구조에서 module 간의 관련성을 측정하는 척도
- 특징
    - module 연관성 없음
    - interface 의존성
    - 복잡성 감소
    - 파급 효과 최소화
- Java에서 결합도가 높은 class는 다른 class와 연관된 정도가 높음
    - 따라서 해당 class를 변경하면 연관된 class도 변경해야 하며, 다른 code에서 class를 재사용하기 어려움
- 결합도 비교
    - 내용 > 공통 > 외부 > 제어 > 스탬프 > 자료
- 결합도는 낮을 수록 좋음

## 자료 결합도 (Data Coupling)

- module 간의 interface로 전달되는 parameter를 통해서만 module 간의 상호 작용이 일어나는 경우의 결합도
    - 모듈 간의 interface가 단순 자료 요소로 구성될 때
    - 어떤 module이 다른 module을 호출하면서 data를 넘겨주고, 호출받은 module로부터 처리 결과를 돌려받는 형태
    - module끼리 단순히 parameter 등을 통해 data를 주고 받음
        - 주고 받는 data는 module의 기능 수행에 있어서 logic을 제어하거나 하지 않는 순수한 자료형 요소
- module을 변경하더라도 다른 module에는 영향을 미치지 않는 결합 상태
- 가장 낮은 결합도를 가짐 == 가장 좋은 형태

```java
public void foo() {
    int result = makeSquare(5);
}

public int makeSquare(int x) {    // 단순 data를 전달
    return x * x;
}
```

## 스탬프 결합도 (Stamp Coupling)

- module 간의 interface로 배열이나 객체, 구조 등이 전달되는 경우의 결합도
    - 두 module이 동일한 자료 구조를 참조하는 형태
    - 자료 구조 형태에 변경이 생기는 경우, 이를 참조하는 module에 영향을 끼침
    - Java에서 class의 field가 변경되는 경우, 이를 참조하는 모듈에게도 변경이 필요할 수 있음

```java
public void foo() {
	// 이름과 mail 주소를 생성자로 초기화
    Person p = new Person("최시민", "abc@abc.com");
    sendEmail(p);
}

public void sendEmail(Person person) {
    // mail 발송 logic
}
```

## 제어 결합도 (Control Coupling)

- 어떤 module이 다른 module의 내부 논리 조직을 제어하기 위한 목적으로 제어 신호를 이용하여 통신하는 경우의 결합도
    - 다른 module의 처리 logic을 알고 있는 경우로 '기능이 두 module에 분리된 경우'에 발생
    - ex) parameter로 전달되는 값에 따라서 module 내부 logic의 처리가 달라지는 Flag 값 등으로 결합되는 형태
- 하위 module에서 상위 module로 제어 신호가 이동하여 상위 module에게 처리 명령을 부여하는 권리 전도 현상이 발생

```java
public void foo() {
    printCharge(true);	
}

public void printCharge(boolean isMember) {
    if (isMember) {
        printMemberCharge();
    } else {
        printNormalCharge();
    }
}
```

## 외부 결합도 (External Coupling)

- module이 다수의 관련 기능을 가질 때 module 안의 구성 요소들이 그 기능을 순차적으로 수행할 경우의 결합도
    - module이 외부에 있는 다른 module의 data를 참조하는 경우
        - 어떤 module에서 반환한 값을 다른 module에서 참조하는 경우
        - 외부 변수로 선언된 data를 참조하는 경우
    - module이 외부의 data, 통신 protocol 등을 공유할 때 발생
- 공통 결합과 다른 점은 참조하는 data가 외부에 위치한다는 점

## 공통 결합도 (Common Coupling)

- parameter가 아닌 module 밖에 선언되어 있는 전역 변수를 참조하고 전역 변수를 갱신하는 식으로 상호작용하는 경우의 결합도
    - 여러 개의 module이 하나의 공통 data 영역을 사용하는 경우
    - 공통 data 영역의 내용을 변경하는 경우, 이를 참조하는 모든 module에 영향을 줌
    - ex) 전역 변수(global variable)를 여러 module에서 참조하는 형태
        - Java에서 class 변수와 instance 변수를 사용하여 조작하는 경우

```java
class Example {
    // class 변수, 다른 class에서 호출 가능
    static int a = 5;
    // instance 변수, 같은 class에서 호출 가능
    int b = 2;
}

public void methodA() {
    // a 또는 b 값 참조
}

public void methodB() {
    // a 또는 b 값 참조
}
```

## 내용 결합도 (Content Coupling)

- 다른 module 내부에 있는 변수나 기능을 다른 module에서 사용하는 경우의 결합도
    - 다른 module의 local data에 접근하는 경우처럼 사용하고자 하는 module의 내용(code)을 알고 있어야 함
    - module에 변경이 발생하는 경우, 이를 참조하는 module의 변경이 반드시 필요하게 됨
- 하나의 module이 직접적으로 다른 module의 내용을 참조할 때 두 module이 내용적으로 결합되어 있는 경우
- 가장 높은 결합도를 가짐 == 가장 좋지 않은 결합 형태

---

# 응집도

- module의 독립성을 나타내는 개념으로, module 내부 구성 요소 간 연관 정도
    - module이 독립적인 기능을 수행하는지 또는 하나의 기능을 중심으로 책임이 잘 뭉쳐있는지를 나타냄
- 정보 은닉 개념의 확장 개념으로, 하나의 module은 하나의 기능을 수행하는 것을 의미
- 특징
    - 유사 기능 영역 구성
    - 단일 책임 할당
    - 함수 간 상호 협력
- 응집도 비교
    - 우연적 < 논리적 < 시간적 < 절차적 < 통신적 < 순차적 < 기능적
- 높은 응집도를 가질 수록 좋음

## 기능적 응집도 (Functional Cohesion)

- module 내부의 모든 기능이 단일한 목적을 위해 수행되는 경우의 응집도
    - module 내의 모든 요소들이 하나의 기능을 수행하기 위해 구성됨
    - ex) 삼각함수를 계산하는 기능을 모아둔 함수 (sine, cosine, tangent, ...)
- 응집도가 가장 높음 == 가장 좋은 형태

## 순차적 응집도 (Sequential Cohesion)

- module 내에서 한 활동으로부터 나온 출력 값을 다른 활동이 사용할 경우의 응집도
    - 한 요소의 출력이 다른 요소의 입력으로 사용되는 형태
    - ex) 어떤 module이 특정 file을 읽고 처리하는 기능을 하는 경우

```java
public void someMethod() {
    String content = readFile();
    writeFile(content);
}
```

## 통신적 응집도 (Communicational Cohesion)

- 동일한 입력과 출력을 사용하여 다른 기능을 수행하는 활동들이 모여 있을 경우의 응집도
    - 모든 요소들이 동일한 입출력 data를 사용하여 서로 다른 기능을 수행
    - 순차적 응집도와 다르게 처리 순서가 중요하지 않음

## 절차적 응집도 (Procedural Cohesion)

- module이 다수의 관련 기능을 가질 때 module 안의 구성요소들이 그 기능을 순차적으로 수행할 경우의 응집도
    - 여러 개의 기능 요소가 순차적으로 수행되지만 다음 기능 요소로 data가 아닌 흐름 제어 요소가 전달됨
    - ex) file을 읽을 때 접근 허가를 확인한 후에 file을 읽는 형태

## 일시적(시간적) 응집도 (Temporal Cohesion)

- 연관된 기능이라기 보다는 특정 시간에 처리되어야 하는 활동들을 한 module에서 처리할 경우의 응집도
    - 각 기능 요소들이 순서에 상관없이 특정 시점에 반드시 수행되는 경우
    - ex) program이 구동될 때 초기화 시키는 module이나 예외 상황이 발생했을 때 오류 log를 개발자에게 전송하는 기능 등 (순서에 상관없는 경우)

## 논리적 응집도 (Logical Cohesion)

- 유사한 성격을 갖거나 특정 형태로 분류되는 처리 요소들이 한 module에서 처리되는 경우의 응집도
    - 논리적으로 비슷한 기능을 수행하지만 서로의 관계는 밀접하지 않은 형태

```java
public void someMethod(int val) {
	switch (val) {
      case 0:
          // do something
          break;
      case 1:
          // do something
          break;
      default:
          break;
	}	
}
```

## 우연적 응집도 (Coincidental Cohesion)

- 서로 간에 어떠한 의미 있는 연관 관계도 없는 기능 요소로 구성될 경우의 응집도
    - 서로 다른 상위 module에 의해 호출되어 처리 상의 연관성이 없는 서로 다른 기능을 수행하는 경우
    - module 내부의 각 구성 요소들이 아무런 관련 없이 구성된 형태
    - 논리적 응집도와 비슷하지만, 유사한 성격이나 형태가 없으며 module 수정이 side effect를 발생시킬 가능성이 매우 높음
- 가장 좋지 않은 응집도

---

# Reference

- https://madplay.github.io/post/coupling-and-cohesion-in-software-engineering
- https://computer-science-student.tistory.com/140
