---
layout: skill
permalink: /88
title: OOP - 합성 관계와 집합 관계
description: 합성과 집합을 이용하여 전체와 부분 관계를 나타낼 수 있습니다.
date: 2024-01-16
---


## 전체와 부분 관계 정의하기 : 합성과 집합

- 합성 관계와 집합 관계는 **전체와 부분을 나타내는 관계**입니다.
- 두 관계는 부분 객체의 **생성 권한이 어디 있느냐로 구분**됩니다.
- 전체 객체와 부분 객체의 결합도에 따라, 합성 관계로 구성할지 집합 관계로 구성할지 결정하면 됩니다.


---


## 합성 관계 (Composition)

- 전체 객체가 부분 객체의 제어권을 갖습니다.
    - 전체와 부분의 life time이 같습니다.

- 일체형 computer를 예로 들 수 있습니다.
    - `Computer` 객체가 생성될 때, `MainBoard`, `CPU`, `Memory` 객체도 생성됩니다.
        - 그리고 생성된 객체의 주소는 `Computer` 객체의 field 변수에 저장합니다.
    - 따라서 `Computer` 객체가 사라지면, `MainBoard`, `CPU`, `Memory` 객체도 사라집니다.


```java
public class Computer {
    private MainBoard mb;
    private CPU cpu;
    private Memory memory;
    
    public Computer() {
        this.mb = new MainBoard();
        this.cpu = new CPU();
        this.memory = new Memory();
    }
}
```
 

---


## 집합 관계 (Aggregation)
 
- 전체 객체가 부분 객체의 제어권을 갖지 않습니다.
    - 전체와 부분의 life time이 다릅니다.

- 조립식 computer를 예로 들 수 있습니다.
    - `Computer` 객체가 생성될 때, 이미 생성되어 있는 `MainBoard`, `CPU`, `Memory` 객체를 생성자 인수로 가져옵니다.
    - 따라서 `Computer` 객체가 사라져도, memory 상의 `MainBoard`, `CPU`, `Memory` 객체는 사라지지 않습니다.

```java
public class Computer {
    private MainBoard mb;
    private CPU cpu;
    private Memory memory;

    public Computer(MainBoard mb, CPU cpu, Memory memory){
        this.mb = mb; 
        this.cpu = cpu;
        this.memory = memory;
    }
}
```


---


## Reference

- <https://lordofkangs.tistory.com/266>
