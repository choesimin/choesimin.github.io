---
layout: note
permalink: /37
title: Observer Pattern - 객체 상태 변화에 대한 알림 받기
description: Observer Pattern은 관찰자들이 관찰하고 있는 대상자의 상태 변화가 있을 때마다 대상자는 직접 목록의 각 관찰자들에게 통지하고, 관찰자들은 알림을 받아 조치를 취하는 행동 pattern입니다.
date: 2024-01-10
---


## Observer Pattern

- Observer Pattern은 객체의 상태 변화를 관찰하는 객체들에게 자동으로 알리는 방식으로 객체 간의 결합도를 낮추고 상호 작용을 관리하는 design pattern입니다.

- Observer Pattern에서는 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 모든 객체들한테 연락이 가고, 자동으로 내용이 갱신되는 방식으로 작동합니다.
    - 따라서, 객체들 사이에서 일대다(one-to-many) 의존성을 정의하게 됩니다.

- Observer Pattern에서 변하는 것은 'subject의 상태'와 'observer의 개수, 형식' 뿐입니다.
    - 변하는 부분을 변하지 않는 부분으로부터 분리시켜서, subject를 바꾸지 않고도 subject의 상태에 의존하는 객체들을 바꿀 수 있습니다.
    - subject와 observer 사이의 관계는 상속이 아니라 구성에 의해서 이루어집니다.

- **Subject는 data의 주인**입니다.
    - Observer Pattern에서 상태를 저장하고 지배합니다.
    - 합성(composition)을 활용하여 observer들을 관리합니다.

- **Observer는 관찰자**입니다.
    - data의 주인은 subject이기 때문에 subject에게 의존성을 가집니다.
    - observer가 또 다른 객체의 subject가 될 수도 있습니다.
    - observer는 계속해서 정보를 받을지 여부를 실행 중에 결정할 수 있습니다.

- observer와 subject의 관계 예시로 '신문 구독'을 들 수 있습니다.
    - 구독자(observer)가 신문을 구독(observer 등록)을 하면, 출판사(subject)는 구독자(observer)에게 신문(data)을 보내줍니다.
    - 구독자(observer)가 신문 구독을 해지(observer 해제)하면, 출판사(subject)는 더 이상 구독자(observer)에게 신문(data)을 보내지 않습니다.


---


## Class 구조

```mermaid
classDiagram

class Subject {
    <<interface>>
    registerObserver()
    removeObserver()
    notifyObservers()
}

class Observer {
    <<interface>>
    update()
}

class ConcreteSubject {
    registerObserver()
    removeObserver()
    notifyObserver()

    getState()
    setState()
}

class ConcreteObserver {
    update()
    etc()
}

Subject <|.. ConcreteSubject
Observer <|.. ConcreteObserver

Subject --> Observer : observer
ConcreteObserver --> ConcreteSubject : subject

note for ConcreteObserver "구현한 observer에서 사용할 기타 method들을 추가할 수도 있습니다."
```


---


## Observer Parttern의 느슨한 결합

- observer pattern에서는 subject와 obserer가 느슨하게 결합되어 있는 객체 design을 제공합니다.
    - "두 객체가 느슨하게 결합(loose coupling)되어 있다."는 말은 "그 둘이 상호 작용을 하긴 하지만 서로에 대해 잘 모른다"는 말과 같습니다.

1. subject가 observer에 대해서 아는 것은 observer가 특정 interface(observer interface)를 구현한다는 것 뿐입니다.
    - observer의 concrete class가 무엇인지, observer가 무엇을 하는지 등에 대해서는 알 필요가 없습니다.

2. observer는 언제든지 새로 추가할 수 있습니다.
    - subject는 observer interface를 구현하는 객체의 목록에만 의존하기 때문에 언제든지 새로운 observer를 추가할 수 있습니다.
    - 실행 중에 observer를 다른 observer로 바꿔도 됩니다.
        - 이렇게 해도 subject 객체는 계속해서 data를 보낼 수 있습니다.
    - 또한, obsever를 아무때나 제거해도 됩니다.

3. 새로운 형식의 observer를 추가하려고 할 때도 subject를 전혀 변경할 필요가 없습니다.
    - 새로운 class에서 observer interface를 구현하고 observer로 등록하기만 하면 됩니다.
    - observer interface만 구현한다면 어떤 객체든지 연락을 하기 때문입니다.

4. subject와 observer는 서로 독립적으로 재사용할 수 있습니다.
    - subject와 observer를 다른 용도로 활용할 일이 있다고 해도, 쉽게 재사용할 수 있습니다.
    - 서로 단단하게 결합되어 있지 않기 때문입니다.

5. subject나 observer가 바뀌더라도 서로한테 영향을 미치지 않습니다.
    - 서로 느슨하게 결합되어 있기 때문에 subject 또는 observer interface를 구현한다는 조건만 만족된다면 변경에 의한 문제는 발생하지 않습니다.


---


## Example : Weather Monitoring Application

- System은 세 가지 요소로 구성됩니다.

1. **기상 Station** : 실제 기상 정보를 수집하는 장비.
    - sensor(온도, 습도, 압력)로부터 측정값을 수집합니다.

2. **WeatherData 객체** : 기상 station으로부터 오는 data를 추적하는 객체.
    - 기상 station 장비 자체로부터 data를 가져올 수 있습니다.
    - 모든 상태를 가지고 있습니다.

3. **Display** : 사용자에게 현재 기상 조건을 보여주는 display.
    - 현재 조건(온도, 습도, 압력) 화면.
    - 기상 통계 화면.
    - 기상 예보 화면.
    - ...

- WeatherData 객체가 subject이고, Display가 observer입니다.
    - WeatherData class의 상태가 바뀌면 Display에 알려줍니다.
    - WeatherData와 Display는 일대다 관계입니다.
    - `WeatherData : Display = subject : observer = 1 : N` 관계입니다.


### Class Diagram

```mermaid
classDiagram

class Subject {
    <<interface>>
    registerObserver()
    removeObserver()
    notifyObservers()
}
class Observer {
    <<interface>>
    update()
}
class DisplayElement {
    <<interface>>
    display()
}

class WeatherData {
    registerObserver()
    removeObserver()
    notifyObserver()

    getTemperature()
    getHumidity()
    getPressure()
    measurmentsChanged()
}

class CurrentConditionsDisplay {
    update()
    display()
}
class StatisticsDisplay {
    update()
    display()
}
class ForecastDisplay {
    update()
    display()
}
class ThirdPartyDisplay {
    update()
    display()
}

Subject <|.. WeatherData

Observer <|.. CurrentConditionsDisplay
Observer <|.. StatisticsDisplay
Observer <|.. ForecastDisplay
Observer <|.. ThirdPartyDisplay

DisplayElement <|.. CurrentConditionsDisplay
DisplayElement <|.. StatisticsDisplay
DisplayElement <|.. ForecastDisplay
DisplayElement <|.. ThirdPartyDisplay

Subject --> Observer : observer
WeatherData <-- CurrentConditionsDisplay : subject
WeatherData <-- StatisticsDisplay : subject
WeatherData <-- ForecastDisplay : subject
WeatherData <-- ThirdPartyDisplay : subject

note for CurrentConditionsDisplay "현재 측정값을 화면에 표시합니다."
note for StatisticsDisplay "평균/최저/최고 수치를 표시합니다."
note for ForecastDisplay "기상 예보를 표시합니다."
note for ThirdPartyDisplay "측정값을 바탕으로 다른 내용을 표시합니다."
```


### Main

```java
public class WeatherStation {

    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();
    
        CurrentConditionsDisplay currentDisplay = 
            new CurrentConditionsDisplay(weatherData);
        StatisticsDisplay statisticsDisplay = new StatisticsDisplay(weatherData);
        ForecastDisplay forecastDisplay = new ForecastDisplay(weatherData);

        weatherData.setMeasurements(80, 65, 30.4f);
        weatherData.setMeasurements(82, 70, 29.2f);
        weatherData.setMeasurements(78, 90, 29.2f);
        
        weatherData.removeObserver(forecastDisplay);
        weatherData.setMeasurements(62, 90, 28.1f);
    }
}
```

### Interface

```java
public interface Subject {
    public void registerObserver(Observer o);
    public void removeObserver(Observer o);
    public void notifyObservers();
}
```

```java
public interface Observer {
    public void update(float temp, float humidity, float pressure);
}
```

```java
public interface DisplayElement {
    public void display();
}
```

### Subject Interface 구현

```java
public class WeatherData implements Subject {
    private List<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;
    
    public WeatherData() {
        observers = new ArrayList<Observer>();
    }
    
    public void registerObserver(Observer o) {
        observers.add(o);
    }
    
    public void removeObserver(Observer o) {
        observers.remove(o);
    }
    
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }
    
    public void measurementsChanged() {
        notifyObservers();
    }
    
    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }

    public float getTemperature() {
        return temperature;
    }
    
    public float getHumidity() {
        return humidity;
    }
    
    public float getPressure() {
        return pressure;
    }

}
```

### Display 구현

```java
public class CurrentConditionsDisplay implements Observer, DisplayElement {
    private float temperature;
    private float humidity;
    private WeatherData weatherData;
    
    public CurrentConditionsDisplay(WeatherData weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }
    
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }
    
    public void display() {
        System.out.println("Current conditions: " + temperature 
            + "F degrees and " + humidity + "% humidity");
    }
}
```

```java
public class StatisticsDisplay implements Observer, DisplayElement {
    private float maxTemp = 0.0f;
    private float minTemp = 200;
    private float tempSum = 0.0f;
    private int numReadings;
    private WeatherData weatherData;

    public StatisticsDisplay(WeatherData weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    public void update(float temp, float humidity, float pressure) {
        tempSum += temp;
        numReadings++;

        if (temp > maxTemp) {
            maxTemp = temp;
        }
 
        if (temp < minTemp) {
            minTemp = temp;
        }

        display();
    }

    public void display() {
        System.out.println("Avg/Max/Min temperature = " + (tempSum / numReadings)
            + "/" + maxTemp + "/" + minTemp);
    }
}
```

```java
public class ForecastDisplay implements Observer, DisplayElement {
    private float currentPressure = 29.92f;  
    private float lastPressure;
    private WeatherData weatherData;

    public ForecastDisplay(WeatherData weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    public void update(float temp, float humidity, float pressure) {
        lastPressure = currentPressure;
        currentPressure = pressure;

        display();
    }

    public void display() {
        System.out.print("Forecast: ");
        if (currentPressure > lastPressure) {
            System.out.println("Improving weather on the way!");
        } else if (currentPressure == lastPressure) {
            System.out.println("More of the same");
        } else if (currentPressure < lastPressure) {
            System.out.println("Watch out for cooler, rainy weather");
        }
    }
}
```


---


## Reference

- Head First Design Patterns (도서) - Eric Freeman, Elisabeth Robson, Bert Bates, Kathy Sierra
