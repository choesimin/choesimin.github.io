---
layout: note
permalink: /352
title: Abstract Factory Pattern - 합성을 이용한 Factory Pattern
description: Abstract Factory Pattern에서는 interface를 이용하여 서로 연관된, 또는 의존하는 객체를 concrete class를 지정하지 않고도 생성할 수 있습니다.
date: 2023-05-23
---


## Abstract Factory Pattern

- **Abstract Factory Pattern**은 client가 concrete class에 직접 의존하지 않고 **서로 관련된 객체들로 구성된 제품군**을 생성할 수 있게 하는 pattern입니다.
    - interface나 abstract class를 통해 일련의 제품들을 공급받습니다.
    - client는 실제로 어떤 제품이 생산되는지 알 필요가 없습니다.
    - **client와 factory에서 생산되는 제품 간의 결합도**를 낮출 수 있습니다.

- **합성(Composition)**을 통해 객체를 생성하는 방식을 사용합니다.

- 제품군을 만들기 위한 **추상적인 틀**을 제공합니다.
    - 실제 제품이 생산되는 방법은 추상 형식의 subclass에서 구체적으로 정의합니다.
    - **연관된 제품들을 하나의 군으로 묶어서** 관리할 수 있습니다.

- 제품군에 새로운 제품을 추가하려면 **interface를 수정해야 한다는 단점**이 있습니다.
    - interface가 변경되면 모든 subclass의 interface도 함께 수정해야 하므로 유지 보수성이 떨어집니다.

- **Factory Method Pattern과 마찬가지로** 'client code'와 'client에서 사용하는 실제 concrete 제품' 사이의 결합도를 낮춥니다.

- concrete factory를 구현할 때 **Factory Method를 활용**하기도 합니다.
    - Factory Method Pattern과는 달리 **제품 생산에 특화된 용도**로 사용됩니다.

- client에서 **제품군(서로 연관된 일련의 제품들)을 생성해야 하는 상황**에서 활용합니다.

```mermaid
classDiagram

class Client

class AbstractFactory {
    <<interface>>
    createProductA()
    createProductB()
}
class ConcreteFactory1 {
    createProductA()
    createProductB()
}
class ConcreteFactory2 {
    createProductA()
    createProductB()
}

class AbstractProductA {
    <<interface>>
}
class ProductA1
class ProductA2

class AbstractProductB {
    <<interface>>
}
class ProductB1
class ProductB2

AbstractFactory <|.. ConcreteFactory1
AbstractFactory <|.. ConcreteFactory2

AbstractProductA <|.. ProductA1
AbstractProductA <|.. ProductA2
AbstractProductB <|.. ProductB1
AbstractProductB <|.. ProductB2

Client --> AbstractFactory
Client --> AbstractProductA
Client --> AbstractProductB

ProductA1 --> ConcreteFactory1
ProductB1 --> ConcreteFactory1

ProductA2 --> ConcreteFactory2
ProductB2 --> ConcreteFactory2
```


---


## Pizza 가게 예제를 통한 Abstract Factory Pattern 구현

- Factory Method Pattern으로 구현했던 pizza 가게를 **Abstract Factory Pattern으로 재구성**합니다.
    - Factory Method Pattern은 pizza 가게가 pizza를 만드는 방법을 정의하는 데 사용했습니다.
    - Abstract Factory Pattern은 **서로 연관된 일련의 제품군을 생성하는 방법**을 정의하는 데 사용합니다.

- pizza 가게들이 **통일된 원재료를 사용하도록 강제**하기 위해 재료 factory를 도입하는 상황입니다.

- abstract factory를 통해 **서로 다른 pizza에 필요한 원재료군을 체계적으로 생산**하는 구조를 만듭니다.
    - 제품군 생성을 위한 **독립적인 interface**를 제공합니다.
    - code를 제품을 생산하는 **실제 factory와 분리**시킬 수 있습니다.

```mermaid
classDiagram

class NYPizzaStore {
    createPizza()
}

class PizzaIngredientFactory {
    <<interface>>
    createDough()
    createSauce()
    createCheese()
    createVeggies()
    createPepperoni()
    createClam()
}
class NYPizzaIngredientFactory {
    createDough()
    createSauce()
    createCheese()
    createVeggies()
    createPepperoni()
    createClam()
}
class ChicagoPizzaIngredientFactory {
    createDough()
    createSauce()
    createCheese()
    createVeggies()
    createPepperoni()
    createClam()
}

class Dough {
    <<interface>>
}
class ThickCrustDough
class ThinCrustDough

class Sauce {
    <<interface>>
}
class PlumTomatoSauce
class MarinaraSauce

class Cheese {
    <<interface>>
}
class MozzarellaCheese
class ReggianoCheese

class Clam {
    <<interface>>
}
class FrozenClams
class FreshClams

PizzaIngredientFactory <|.. NYPizzaIngredientFactory
PizzaIngredientFactory <|.. ChicagoPizzaIngredientFactory

Dough <|.. ThickCrustDough
Dough <|.. ThinCrustDough

Sauce <|.. PlumTomatoSauce
Sauce <|.. MarinaraSauce

Cheese <|.. MozzarellaCheese
Cheese <|.. ReggianoCheese

Clam <|.. FrozenClams
Clam <|.. FreshClams

NYPizzaStore --> PizzaIngredientFactory
NYPizzaStore --> Dough
NYPizzaStore --> Sauce
NYPizzaStore --> Cheese
NYPizzaStore --> Clam

ThickCrustDough --> NYPizzaIngredientFactory
PlumTomatoSauce --> NYPizzaIngredientFactory
MozzarellaCheese --> NYPizzaIngredientFactory
FrozenClams --> NYPizzaIngredientFactory

ThinCrustDough --> ChicagoPizzaIngredientFactory
MarinaraSauce --> ChicagoPizzaIngredientFactory
ReggianoCheese --> ChicagoPizzaIngredientFactory
FreshClams --> ChicagoPizzaIngredientFactory
```


### Main

```java
public class PizzaTestDrive {
 
    public static void main(String[] args) {
        PizzaStore nyStore = new NYPizzaStore();
        PizzaStore chicagoStore = new ChicagoPizzaStore();
 
        Pizza pizza = nyStore.orderPizza("cheese");
        System.out.println("Ethan ordered a " + pizza + "\n");
 
        pizza = chicagoStore.orderPizza("cheese");
        System.out.println("Joel ordered a " + pizza + "\n");

        pizza = nyStore.orderPizza("clam");
        System.out.println("Ethan ordered a " + pizza + "\n");
 
        pizza = chicagoStore.orderPizza("clam");
        System.out.println("Joel ordered a " + pizza + "\n");

        pizza = nyStore.orderPizza("pepperoni");
        System.out.println("Ethan ordered a " + pizza + "\n");
 
        pizza = chicagoStore.orderPizza("pepperoni");
        System.out.println("Joel ordered a " + pizza + "\n");

        pizza = nyStore.orderPizza("veggie");
        System.out.println("Ethan ordered a " + pizza + "\n");
 
        pizza = chicagoStore.orderPizza("veggie");
        System.out.println("Joel ordered a " + pizza + "\n");
    }
}
```


### PizzaStore

```java
public abstract class PizzaStore {
 
    protected abstract Pizza createPizza(String item);
 
    public Pizza orderPizza(String type) {
        Pizza pizza = createPizza(type);
        System.out.println("--- Making a " + pizza.getName() + " ---");
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
        return pizza;
    }
}
```


### PizzaStore Subclass

```java
public class NYPizzaStore extends PizzaStore {
 
    protected Pizza createPizza(String item) {
        Pizza pizza = null;
        PizzaIngredientFactory ingredientFactory = 
            new NYPizzaIngredientFactory();
 
        if (item.equals("cheese")) {
  
            pizza = new CheesePizza(ingredientFactory);
            pizza.setName("New York Style Cheese Pizza");
  
        } else if (item.equals("veggie")) {
 
            pizza = new VeggiePizza(ingredientFactory);
            pizza.setName("New York Style Veggie Pizza");
 
        } else if (item.equals("clam")) {
 
            pizza = new ClamPizza(ingredientFactory);
            pizza.setName("New York Style Clam Pizza");
 
        } else if (item.equals("pepperoni")) {

            pizza = new PepperoniPizza(ingredientFactory);
            pizza.setName("New York Style Pepperoni Pizza");
 
        } 
        return pizza;
    }
}
```

```java
public class ChicagoPizzaStore extends PizzaStore {

    protected Pizza createPizza(String item) {
        Pizza pizza = null;
        PizzaIngredientFactory ingredientFactory =
        new ChicagoPizzaIngredientFactory();

        if (item.equals("cheese")) {

            pizza = new CheesePizza(ingredientFactory);
            pizza.setName("Chicago Style Cheese Pizza");

        } else if (item.equals("veggie")) {

            pizza = new VeggiePizza(ingredientFactory);
            pizza.setName("Chicago Style Veggie Pizza");

        } else if (item.equals("clam")) {

            pizza = new ClamPizza(ingredientFactory);
            pizza.setName("Chicago Style Clam Pizza");

        } else if (item.equals("pepperoni")) {

            pizza = new PepperoniPizza(ingredientFactory);
            pizza.setName("Chicago Style Pepperoni Pizza");

        }
        return pizza;
    }
}
```


### Pizza

```java
public abstract class Pizza {
    String name;

    Dough dough;
    Sauce sauce;
    Veggies veggies[];
    Cheese cheese;
    Pepperoni pepperoni;
    Clams clam;

    abstract void prepare();

    void bake() {
        System.out.println("Bake for 25 minutes at 350");
    }

    void cut() {
        System.out.println("Cutting the pizza into diagonal slices");
    }

    void box() {
        System.out.println("Place pizza in official PizzaStore box");
    }

    void setName(String name) {
        this.name = name;
    }

    String getName() {
        return name;
    }

    public String toString() {
        StringBuffer result = new StringBuffer();
        result.append("---- " + name + " ----\n");
        if (dough != null) {
            result.append(dough);
            result.append("\n");
        }
        if (sauce != null) {
            result.append(sauce);
            result.append("\n");
        }
        if (cheese != null) {
            result.append(cheese);
            result.append("\n");
        }
        if (veggies != null) {
            for (int i = 0; i < veggies.length; i++) {
                result.append(veggies[i]);
                if (i < veggies.length-1) {
                    result.append(", ");
                }
            }
            result.append("\n");
        }
        if (clam != null) {
            result.append(clam);
            result.append("\n");
        }
        if (pepperoni != null) {
            result.append(pepperoni);
            result.append("\n");
        }
        return result.toString();
    }
}
```


### Pizza Subclass

```java
public class CheesePizza extends Pizza {
    PizzaIngredientFactory ingredientFactory;
 
    public CheesePizza(PizzaIngredientFactory ingredientFactory) {
        this.ingredientFactory = ingredientFactory;
    }
 
    void prepare() {
        System.out.println("Preparing " + name);
        dough = ingredientFactory.createDough();
        sauce = ingredientFactory.createSauce();
        cheese = ingredientFactory.createCheese();
    }
}
```

```java
public class PepperoniPizza extends Pizza {
    PizzaIngredientFactory ingredientFactory;
 
    public PepperoniPizza(PizzaIngredientFactory ingredientFactory) {
        this.ingredientFactory = ingredientFactory;
    }
 
    void prepare() {
        System.out.println("Preparing " + name);
        dough = ingredientFactory.createDough();
        sauce = ingredientFactory.createSauce();
        cheese = ingredientFactory.createCheese();
        veggies = ingredientFactory.createVeggies();
        pepperoni = ingredientFactory.createPepperoni();
    }
}
```

```java
public class ClamPizza extends Pizza {
    PizzaIngredientFactory ingredientFactory;
 
    public ClamPizza(PizzaIngredientFactory ingredientFactory) {
        this.ingredientFactory = ingredientFactory;
    }
 
    void prepare() {
        System.out.println("Preparing " + name);
        dough = ingredientFactory.createDough();
        sauce = ingredientFactory.createSauce();
        cheese = ingredientFactory.createCheese();
        clam = ingredientFactory.createClam();
    }
}
```

```java
public class VeggiePizza extends Pizza {
    PizzaIngredientFactory ingredientFactory;
 
    public VeggiePizza(PizzaIngredientFactory ingredientFactory) {
        this.ingredientFactory = ingredientFactory;
    }
 
    void prepare() {
        System.out.println("Preparing " + name);
        dough = ingredientFactory.createDough();
        sauce = ingredientFactory.createSauce();
        cheese = ingredientFactory.createCheese();
        veggies = ingredientFactory.createVeggies();
    }
}
```


### PizzaIngredientFactory

```java
public interface PizzaIngredientFactory {
 
    public Dough createDough();
    public Sauce createSauce();
    public Cheese createCheese();
    public Veggies[] createVeggies();
    public Pepperoni createPepperoni();
    public Clams createClam();
 
}
```


### PizzaIngredientFactory Subclass

```java
public class NYPizzaIngredientFactory implements PizzaIngredientFactory {
 
    public Dough createDough() {
        return new ThinCrustDough();
    }
 
    public Sauce createSauce() {
        return new MarinaraSauce();
    }
 
    public Cheese createCheese() {
        return new ReggianoCheese();
    }
 
    public Veggies[] createVeggies() {
        Veggies veggies[] = { new Garlic(), new Onion(), new Mushroom(), new RedPepper() };
        return veggies;
    }
 
    public Pepperoni createPepperoni() {
        return new SlicedPepperoni();
    }

    public Clams createClam() {
        return new FreshClams();
    }
}
```

```java
public class ChicagoPizzaIngredientFactory 
    implements PizzaIngredientFactory 
{

    public Dough createDough() {
        return new ThickCrustDough();
    }

    public Sauce createSauce() {
        return new PlumTomatoSauce();
    }

    public Cheese createCheese() {
        return new MozzarellaCheese();
    }

    public Veggies[] createVeggies() {
        Veggies veggies[] = { new BlackOlives(), 
                              new Spinach(), 
                              new Eggplant() };
        return veggies;
    }

    public Pepperoni createPepperoni() {
        return new SlicedPepperoni();
    }

    public Clams createClam() {
        return new FrozenClams();
    }
}
```


### Ingredient

```java
public interface Dough {
    public String toString();
}
```

```java
public interface Sauce {
    public String toString();
}
```

```java
public interface Cheese {
    public String toString();
}
```

```java
public interface Veggies {
    public String toString();
}
```

```java
public interface Pepperoni {
    public String toString();
}
```

```java
public interface Clams {
    public String toString();
}
```


### Ingredient Subclass

```java
public class ThickCrustDough implements Dough {
    public String toString() {
        return "ThickCrust style extra thick crust dough";
    }
}
```

```java
public class ThinCrustDough implements Dough {
    public String toString() {
        return "Thin Crust Dough";
    }
}
```

```java
public class PlumTomatoSauce implements Sauce {
    public String toString() {
        return "Tomato sauce with plum tomatoes";
    }
}
```

```java
public class MarinaraSauce implements Sauce {
    public String toString() {
        return "Marinara Sauce";
    }
}
```

```java
public class MozzarellaCheese implements Cheese {

    public String toString() {
        return "Shredded Mozzarella";
    }
}
```

```java
public class ReggianoCheese implements Cheese {

    public String toString() {
        return "Reggiano Cheese";
    }
}
```

```java
public class ParmesanCheese implements Cheese {

    public String toString() {
        return "Shredded Parmesan";
    }
}
```

```java
public class Spinach implements Veggies {

    public String toString() {
        return "Spinach";
    }
}
```

```java
public class RedPepper implements Veggies {

    public String toString() {
        return "Red Pepper";
    }
}
```

```java
public class Onion implements Veggies {

    public String toString() {
        return "Onion";
    }
}
```

```java
public class Mushroom implements Veggies {

    public String toString() {
        return "Mushrooms";
    }
}
```

```java
public class Garlic implements Veggies {

    public String toString() {
        return "Garlic";
    }
}
```

```java
public class Eggplant implements Veggies {

    public String toString() {
        return "Eggplant";
    }
}
```

```java
public class BlackOlives implements Veggies {

    public String toString() {
        return "Black Olives";
    }
}
```

```java
public class SlicedPepperoni implements Pepperoni {

    public String toString() {
        return "Sliced Pepperoni";
    }
}
```

```java
public class FrozenClams implements Clams {

    public String toString() {
        return "Frozen Clams from Chesapeake Bay";
    }
}
```

```java
public class FreshClams implements Clams {

    public String toString() {
        return "Fresh Clams from Long Island Sound";
    }
}
```


---


## Abstract Factory Pattern의 장단점과 활용 지침

- **Abstract Factory Pattern**은 **관련된 제품군을 일관성 있게 생성**해야 하는 상황에서 특히 유용합니다.
    - pizza 예제에서 뉴욕 style과 시카고 style의 재료들이 각각 하나의 제품군을 형성합니다.
    - 각 지역의 pizza 가게는 해당 지역에 맞는 재료군만 사용하도록 보장됩니다.

- **확장성 측면**에서는 새로운 제품군 추가는 쉽지만, 기존 제품군에 새로운 제품 추가는 어렵습니다.
    - 새로운 도시의 pizza 가게 추가는 새로운 concrete factory 구현으로 간단히 해결됩니다.
    - 하지만 모든 pizza에 새로운 재료를 추가하려면 모든 interface와 구현체를 수정해야 합니다.

- **의존성 역전 원칙(Dependency Inversion Principle)**을 잘 구현한 pattern입니다.
    - 고수준 module(Pizza class)이 저수준 module(구체적인 재료 class)에 의존하지 않습니다.
    - 둘 다 추상화(interface)에 의존하도록 설계되었습니다.

- **Factory Method Pattern과의 차이점**을 명확히 이해하는 것이 중요합니다.
    - Factory Method Pattern은 **하나의 제품**을 생성하는 데 초점을 맞춥니다.
    - Abstract Factory Pattern은 **관련된 제품들의 군**을 생성하는 데 초점을 맞춥니다.


---


## Reference

- <https://refactoring.guru/design-patterns/abstract-factory>
- Head First Design Patterns (도서) - Eric Freeman, Elisabeth Robson, Bert Bates, Kathy Sierra
