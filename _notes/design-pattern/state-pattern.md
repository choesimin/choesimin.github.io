---
layout: note
title: State Pattern - 상태에 따라 행동 바꾸기
version: 2023-06-10
---




- State Pattern을 이용하면 객체의 내부 상태가 바뀜에 따라서 객체의 행동을 바꿀 수 있습니다.
    - 마치 객체의 class가 바뀌는 것과 같은 결과를 얻을 수 있습니다.
    - 상황에 따라서 상태가 바뀔 때 사용합니다.

- 각 상태를 별도의 class로 캡슐화합니다.
    - 동일한 상황에 대해서 어떤 상태인지에 따라 다른 행동을 할 수 있도록 합니다.
    - 나중에 변경시켜야 하는 내용을 국지화시킬 수 있습니다.
    - 상태가 늘어남에 따라 class의 갯수가 늘어납니다.

- `Context` 객체에서는 현재 상태를 나타내는 객체에게 행동을 위임합니다.
    - composition(구성)을 통해 여러 상태 객체를 바꿔가면서 사용합니다.
        - 상속을 사용하지 않습니다.
    - 내부 상태가 바뀌면 행동이 달라집니다.
        - 내부 상태를 바탕으로 여러 가지 서로 다른 행동을 사용할 수 있습니다.
    - `Context` class에 정의해야 하는 `if`문을 없앨 수 있습니다.

- 상태 전환은 `State` class로 제어할 수도 있고, `Context` class로 제어할 수도 있습니다.
- `State` class를 여러 `Context` 객체의 instance에서 공유하도록 설계할 수도 있습니다.




---




## Strategy Pattern & State Pattern

- 두 pattern의 class diagram은 같지만, 용도와 목적이 다릅니다.

| Strategy Pattern | State Pattern |
| - | - |
| `Context` class를 만들 때 행동 또는 algorithm을 설정합니다. | `Context`의 내부 상태가 바뀜에 따라서 알아서 행동을 바꿉니다. |
| 객체에서 어떤 전략을 사용하는지는 보통 `Context` 객체가 직접 결정합니다. | `Context` 객체에서는 미리 정해진 상태 전환 규칙을 바탕으로 알아서 자기 상태를 변경합니다. |




---




## Class Diagram

```mermaid
classDiagram

class Context {
    request()
}

class State {
    handle()
}

class ConcreteStateA {
    handle()
}

class ConcreteStateB {
    handle()
}

Context --> State
State <|-- ConcreteStateA
State <|-- ConcreteStateB

note for Context "request() method는 state.handle()을 호출하여 상태 객체에게 작업을 맡깁니다.\nContext class 안에는 여러 가지 내부 상태가 들어있을 수 있습니다."
note for State "모든 구상 상태 class에 대한 공통 interface를 정의합니다.\n모든 상태 class에서 같은 interface를 구현하기 때문에 바꿔가면서 쓸 수 있습니다."
note for ConcreteStateB "Context로부터 전달된 요청을 처리합니다.\n각 ConcreteState에서 그 요청을 처리하는 방법을 자기 나름의 방식으로 구현합니다.\nContext에서 상태를 바꾸기만 하면 행동도 바뀌게 됩니다."
```




---




## Example : 뽑기 기계

- 동전을 넣고 손잡이를 돌리면 알맹이가 나오는 뽑기 기계입니다.
- 10% 확률로 당첨되면 알맹이를 하나 더 줍니다.




### State Diagram

```mermaid
stateDiagram-v2

state "동전 없음" as noQuarter
state "동전 있음" as hasQuarter
state "알맹이 판매" as sold
state "알맹이 매진" as soldOut
state "당첨" as winner

state ifSold <<choice>>
state ifWinner <<choice>>


soldOut --> noQuarter : 알맹이 충전

noQuarter --> hasQuarter : 동전 투입

hasQuarter --> noQuarter : 동전 반환
hasQuarter --> sold : 손잡이 돌림, 당첨되지 않음
hasQuarter --> winner : 손잡이 돌림, 당첨!!

sold --> ifSold : 알맹이 내보냄
ifSold --> noQuarter : 알맹이 > 0
ifSold --> soldOut : 알맹이 = 0

winner --> ifWinner : 알맹이 두 개 내보냄
ifWinner --> noQuarter : 알맹이 > 0
ifWinner --> soldOut : 알맹이 = 0
```




### Class Diagram

```mermaid
classDiagram

class State {
    <<Interfcae>>
    insertQuarter()
    ejectQuarter()
    turnCrank()
    dispense()
    refill()
}

class SoldState {
    insertQuarter()
    ejectQuarter()
    turnCrank()
    dispense()
    refill()
}

class SoldOutState {
    insertQuarter()
    ejectQuarter()
    turnCrank()
    dispense()
    refill()
}

class NoQuarterState {
    insertQuarter()
    ejectQuarter()
    turnCrank()
    dispense()
    refill()
}

class HasQuarterState {
    insertQuarter()
    ejectQuarter()
    turnCrank()
    dispense()
    refill()
}

class WinnerState {
    insertQuarter()
    ejectQuarter()
    turnCrank()
    dispense()
    refill()
}


State <|.. SoldState
State <|.. SoldOutState
State <|.. NoQuarterState
State <|.. HasQuarterState
State <|.. WinnerState


note for State "모든 상태 class에서 사용하는 interface입니다.\nmethod는 뽑기 기계에서 일어날 수 있는 모든 행동들에 직접적으로 대응됩니다."
```




### Code


#### Test code

```java
public class GumballMachineTestDrive {

    public static void main(String[] args) {
        GumballMachine gumballMachine = 
            new GumballMachine(10);

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);
    }
}
```


#### Context

```java
public class GumballMachine {
 
    State soldOutState;
    State noQuarterState;
    State hasQuarterState;
    State soldState;
    State winnerState;
 
    State state = soldOutState;
    int count = 0;
 
    public GumballMachine(int numberGumballs) {
        soldOutState = new SoldOutState(this);
        noQuarterState = new NoQuarterState(this);
        hasQuarterState = new HasQuarterState(this);
        soldState = new SoldState(this);
        winnerState = new WinnerState(this);

        this.count = numberGumballs;
         if (numberGumballs > 0) {
            state = noQuarterState;
        } 
    }
 
    public void insertQuarter() {
        state.insertQuarter();
    }
 
    public void ejectQuarter() {
        state.ejectQuarter();
    }
 
    public void turnCrank() {
        state.turnCrank();
        state.dispense();
    }

    void setState(State state) {
        this.state = state;
    }
 
    void releaseBall() {
        System.out.println("A gumball comes rolling out the slot...");
        if (count > 0) {
            count = count - 1;
        }
    }
 
    int getCount() {
        return count;
    }
 
    void refill(int count) {
        this.count += count;
        System.out.println("The gumball machine was just refilled; its new count is: " + this.count);
        state.refill();
    }

    public State getState() {
        return state;
    }

    public State getSoldOutState() {
        return soldOutState;
    }

    public State getNoQuarterState() {
        return noQuarterState;
    }

    public State getHasQuarterState() {
        return hasQuarterState;
    }

    public State getSoldState() {
        return soldState;
    }

    public State getWinnerState() {
        return winnerState;
    }
 
    public String toString() {
        StringBuffer result = new StringBuffer();
        result.append("\nMighty Gumball, Inc.");
        result.append("\nJava-enabled Standing Gumball Model #2004");
        result.append("\nInventory: " + count + " gumball");
        if (count != 1) {
            result.append("s");
        }
        result.append("\n");
        result.append("Machine is " + state + "\n");
        return result.toString();
    }
}
```


#### State

```java
public interface State {
 
    public void insertQuarter();
    public void ejectQuarter();
    public void turnCrank();
    public void dispense();
    
    public void refill();
}
```

```java
public class SoldState implements State {
    GumballMachine gumballMachine;
 
    public SoldState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }
       
    public void insertQuarter() {
        System.out.println("Please wait, we're already giving you a gumball");
    }
 
    public void ejectQuarter() {
        System.out.println("Sorry, you already turned the crank");
    }
 
    public void turnCrank() {
        System.out.println("Turning twice doesn't get you another gumball!");
    }
 
    public void dispense() {
        gumballMachine.releaseBall();
        if (gumballMachine.getCount() > 0) {
            gumballMachine.setState(gumballMachine.getNoQuarterState());
        } else {
            System.out.println("Oops, out of gumballs!");
            gumballMachine.setState(gumballMachine.getSoldOutState());
        }
    }
    
    public void refill() { }
 
    public String toString() {
        return "dispensing a gumball";
    }
}
```

```java
public class SoldOutState implements State {
    GumballMachine gumballMachine;
 
    public SoldOutState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }
 
    public void insertQuarter() {
        System.out.println("You can't insert a quarter, the machine is sold out");
    }
 
    public void ejectQuarter() {
        System.out.println("You can't eject, you haven't inserted a quarter yet");
    }
 
    public void turnCrank() {
        System.out.println("You turned, but there are no gumballs");
    }
 
    public void dispense() {
        System.out.println("No gumball dispensed");
    }
    
    public void refill() { 
        gumballMachine.setState(gumballMachine.getNoQuarterState());
    }
 
    public String toString() {
        return "sold out";
    }
}
```

```java
import java.util.Random;

public class HasQuarterState implements State {
    Random randomWinner = new Random(System.currentTimeMillis());
    GumballMachine gumballMachine;
 
    public HasQuarterState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }
  
    public void insertQuarter() {
        System.out.println("You can't insert another quarter");
    }
 
    public void ejectQuarter() {
        System.out.println("Quarter returned");
        gumballMachine.setState(gumballMachine.getNoQuarterState());
    }
 
    public void turnCrank() {
        System.out.println("You turned...");
        int winner = randomWinner.nextInt(10);
        if ((winner == 0) && (gumballMachine.getCount() > 1)) {
            gumballMachine.setState(gumballMachine.getWinnerState());
        } else {
            gumballMachine.setState(gumballMachine.getSoldState());
        }
    }

    public void dispense() {
        System.out.println("No gumball dispensed");
    }
    
    public void refill() { }
 
    public String toString() {
        return "waiting for turn of crank";
    }
}
```

```java
public class NoQuarterState implements State {
    GumballMachine gumballMachine;
 
    public NoQuarterState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }
 
    public void insertQuarter() {
        System.out.println("You inserted a quarter");
        gumballMachine.setState(gumballMachine.getHasQuarterState());
    }
 
    public void ejectQuarter() {
        System.out.println("You haven't inserted a quarter");
    }
 
    public void turnCrank() {
        System.out.println("You turned, but there's no quarter");
     }
 
    public void dispense() {
        System.out.println("You need to pay first");
    } 
    
    public void refill() { }
 
    public String toString() {
        return "waiting for quarter";
    }
}
```

```java
public class WinnerState implements State {
    GumballMachine gumballMachine;
 
    public WinnerState(GumballMachine gumballMachine) {
        this.gumballMachine = gumballMachine;
    }
 
    public void insertQuarter() {
        System.out.println("Please wait, we're already giving you a Gumball");
    }
 
    public void ejectQuarter() {
        System.out.println("Please wait, we're already giving you a Gumball");
    }
 
    public void turnCrank() {
        System.out.println("Turning again doesn't get you another gumball!");
    }
 
    public void dispense() {
        gumballMachine.releaseBall();
        if (gumballMachine.getCount() == 0) {
            gumballMachine.setState(gumballMachine.getSoldOutState());
        } else {
            gumballMachine.releaseBall();
            System.out.println("YOU'RE A WINNER! You got two gumballs for your quarter");
            if (gumballMachine.getCount() > 0) {
                gumballMachine.setState(gumballMachine.getNoQuarterState());
            } else {
                System.out.println("Oops, out of gumballs!");
                gumballMachine.setState(gumballMachine.getSoldOutState());
            }
        }
    }
 
    public void refill() { }
    
    public String toString() {
        return "despensing two gumballs for your quarter, because YOU'RE A WINNER!";
    }
}
```




---




## Example : State Pattern을 사용하지 않은 뽑기 기계

```java
public class GumballMachineTestDrive {

    public static void main(String[] args) {
        GumballMachine gumballMachine = new GumballMachine(5);

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.ejectQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.ejectQuarter();

        System.out.println(gumballMachine);

        gumballMachine.insertQuarter();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();

        System.out.println(gumballMachine);
    }
}
```

```java
public class GumballMachine {
 
    final static int SOLD_OUT = 0;
    final static int NO_QUARTER = 1;
    final static int HAS_QUARTER = 2;
    final static int SOLD = 3;
 
    int state = SOLD_OUT;
    int count = 0;
  
    public GumballMachine(int count) {
        this.count = count;
        if (count > 0) {
            state = NO_QUARTER;
        }
    }
  
    public void insertQuarter() {
        if (state == HAS_QUARTER) {
            System.out.println("You can't insert another quarter");
        } else if (state == NO_QUARTER) {
            state = HAS_QUARTER;
            System.out.println("You inserted a quarter");
        } else if (state == SOLD_OUT) {
            System.out.println("You can't insert a quarter, the machine is sold out");
        } else if (state == SOLD) {
            System.out.println("Please wait, we're already giving you a gumball");
        }
    }

    public void ejectQuarter() {
        if (state == HAS_QUARTER) {
            System.out.println("Quarter returned");
            state = NO_QUARTER;
        } else if (state == NO_QUARTER) {
            System.out.println("You haven't inserted a quarter");
        } else if (state == SOLD) {
            System.out.println("Sorry, you already turned the crank");
        } else if (state == SOLD_OUT) {
            System.out.println("You can't eject, you haven't inserted a quarter yet");
        }
    }
 
    public void turnCrank() {
        if (state == SOLD) {
            System.out.println("Turning twice doesn't get you another gumball!");
        } else if (state == NO_QUARTER) {
            System.out.println("You turned but there's no quarter");
        } else if (state == SOLD_OUT) {
            System.out.println("You turned, but there are no gumballs");
        } else if (state == HAS_QUARTER) {
            System.out.println("You turned...");
            state = SOLD;
            dispense();
        }
    }
 
    private void dispense() {
        if (state == SOLD) {
            System.out.println("A gumball comes rolling out the slot");
            count = count - 1;
            if (count == 0) {
                System.out.println("Oops, out of gumballs!");
                state = SOLD_OUT;
            } else {
                state = NO_QUARTER;
            }
        } else if (state == NO_QUARTER) {
            System.out.println("You need to pay first");
        } else if (state == SOLD_OUT) {
            System.out.println("No gumball dispensed");
        } else if (state == HAS_QUARTER) {
            System.out.println("No gumball dispensed");
        }
    }
 
    public void refill(int numGumBalls) {
        this.count = numGumBalls;
        state = NO_QUARTER;
    }

    public String toString() {
        StringBuffer result = new StringBuffer();
        result.append("\nMighty Gumball, Inc.");
        result.append("\nJava-enabled Standing Gumball Model #2004\n");
        result.append("Inventory: " + count + " gumball");
        if (count != 1) {
            result.append("s");
        }
        result.append("\nMachine is ");
        if (state == SOLD_OUT) {
            result.append("sold out");
        } else if (state == NO_QUARTER) {
            result.append("waiting for quarter");
        } else if (state == HAS_QUARTER) {
            result.append("waiting for turn of crank");
        } else if (state == SOLD) {
            result.append("delivering a gumball");
        }
        result.append("\n");
        return result.toString();
    }
}
```





---




# Reference

- Head First Design Patterns - Eric Freeman, Elisabeth Robson, Bert Bates, Kathy Sierra
