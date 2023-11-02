---
layout: note
title: Clean Architecture Chapter 2 - 프로그래밍 페러다임
date: 2023-11-02
---




## 3장. 패러디임 개요

| | |
| - | - |
| 구조적(structured) programming | 제어 흐름의 직접적인 전환에 대한 규칙을 부과함 |
| 객체 지향(object-oriented) programming | 제어 흐름의 간접적인 전환에 대해 규칙을 부과함 |
| 함수형(functional) programming | 할당문에 대해 규칙을 부과함 |

- paradigm은 무엇을 해야할지를 말하기 보다는 무엇을 해서는 안 되는지를 말해줌
    - 각 paradigm은 programmer에서 권한을 박탈함 (새로운 권한을 부여하지 않음)

- software = 순차(sequence) + 분기(selection) + 반복(iteration) + 참조(indirection)


## 4장. 구조적 프로그래밍

- 에츠허르 비버 데이크스크라(Edsger Wybe Dijkstra)는 유클리드(Euclid) 계층구조로 code가 올바르다는 사실을 증명하려 했으나 실패함
    - 하지만 연구 과정에서 goto 문장이 module을 더 작은 단위로 재귀적으로 분해하는 과정에 방해가 되는 경우가 있다는 사실을 발견함
        - module을 분해할 수 없다면 합리적 증명의 필수 기법인 분할 정복 접근법을 사용할 수 없기 때문
    - 또한 좋은 goto 문장은 분기(if/then/else)와 반복(do/while)같은 단순한 제어 구조에 해당한다는 사실을 발견함
        - 뵘(Bohm)과 야코피니(Jacopini)는 데이크스트라보다 2년 앞서 모든 program을 순차(sequence), 분기(selection), 반복(interation)이라는 세 가지 구조만으로 표현할 수 있다는 사실을 증명함
    - module을 증명 가능하게 하는 제어 구조가 모든 program을 만들 수 있는 제어 구조의 최소 집합과 동일함

- 수학적인 증명은 실패했지만 과학적 방법이 그 역할을 대신 함
    - 과학적 방법은 반증은 가능하지만 증명은 불가능함
        - ex) 운동 법칙(F=ma), 만유인력의 법칙 등
    - 과학은 서술이 틀렸음을 증명하는 방식으로 동작함
        - 서술된 내용이 사실임을 증명하는 방식이 아님
        - program이 잘못되었음을 test를 통해 증명할 수는 있지만, program이 맞다고 증명할 수는 없음
            - software 개발은 수학적 시도보다 과학에 가까움

- 구조적 programming은 반증 가능한 단위를 만들어 낼 수 있도록 함
    - 현대적 언어가 goto를 지원하지 않는 이유
    - architecture 관정에서 기능적 분해를 최고의 실천법 중 하나로 여기는 이유


## 5장. 객체 지향 프로그래밍

- 좋은 architecture를 만드는 일은 객체 지향(Object-Oriented, OO) 설계 원칙을 이해하고 응용하는 데에서 출발함

- OO란?
    - 다형성을 이용하여 전체 system의 모든 source code 의존성에 대한 절대적인 제어 권한을 획득할 수 있는 능력
    - OO를 사용하면 Plugin Architect를 구성할 수 있음
        - 고수준의 정책을 포함하는 module은 저수준의 세부사항을 포함하는 module에 대해 독립성을 보장할 수 있음
        - 저수준의 세부사항은 중요도가 낮은 plugin module로 만들고, 고수준의 정책을 포함하는 module과는 독립적으로 개발하고 배포할 수 있음

- 다형성
    - 언제 어디서든 Plugin Architecture를 사용할 수 있게 해줌
    - 의존성 역전 (dependency inversion)
        - 원래(ex. C)는 source code의 의존성 방향은 반드시 제어흐름(flow of control)을 따르게 됨
            1. main 함수가 고수준 함수 호출
            2. 고수준 함수가 중간 수준 함수 호출
            3. 중간 수준 함수가 저수준 함수 호출
        - OO 언어는 다형성을 안전하고 편리하게 제공하므로 source code 의존성을 어디에서든 역전시킬 수 있음
            - source code 사이에 interface를 사용하여 제어흐름을 반대로 함
            - 즉, source code의 제어흐름과 의존성 방향에 대해 제한받지 않고 원하는 대로 설정할 수 있음

- OO에 대한 잘못된 설명
    - `Data와 함수의 조합`
        - o.f()가 f(o)와 다르다는 의미를 내포하기 때문에 정확한 설명이 아님
    - `실제 세계를 modeling하는 새로운 방법`
        - 의도가 불분명하며, 정의가 모호함
    - `OO는 캡슐화(encapsulation), 상속(inheritance), 다형성(polymorphism) 이 세가지 개념을 적절하게 조합한 것`
        - 캡슐화 : C언어에서도 완벽한 캡슐화가 가능함 (data 구조와 함수를 header file에 선언하고 구현 file에서 구현)
            - 오히려 C++, C#, Java 등에서 완전한 캡슐화가 깨짐
                - C++ : compiler가 class의 instance 크기를 알아야 하기 때문에 class의 member 변수를 해당 class의 header file에 선언해야 함
                - C#, Java : 아예 header와 구현체를 분리하는 방식을 버렸음(class 선언과 정의를 구분하는 것이 불가능함)
        - 상속 : OO로 넘어와서 더 편리해지긴 했지만, C에서도 가능한 기법이었음
        - 다형성 : C에서 함수를 가리키는 pointer를 응용해 구현할 수 있었지만, OO는 이를 더 편리하고 안전하게 사용할 수 있게 해줌 (함수 pointer는 위험함)
            - OO에서 가장 중요한 부분 : 다형성을 통해 제어흐름을 간접적으로 전환하는 규칙을 부과함


## 6장. 함수형 프로그래밍

- lambda 계산법이 핵심 기반

- 정수를 제곱하는 program
    - Java (객체 지향 언어)
        ```java
        public class Squint {
            public static void main(String args[]) {
                for (int i=0; i<25; i++) {
                    System.out.println(i*i);
                }
            }
        }
        ```
    - Clojure (함수형 언어)
        ```clojure
        (pringln (take 25 (map (fm [x] (* x x)) (range))))
        ```
    - Java program은 가변 변수(mutable variable)를 사용함
        - 가변 변수는 program 실행 중에 상태가 변할 수 있음
    - Clojure program엔 가변 변수가 전혀 없음
        - 변수 x가 한 번 초기화되면 절대로 변하지 않음
        - == 함수형 언어에서 변수는 변경되지 않음

- architect가 변수의 가변성을 염려하는 이유
    - 경합(race) 조건, 교착상태(deadlock) 조건, 동시 업데이트(concurrent update) 문제가 모두 가변 변수로 인해 발생하기 때문
        - 만약 어떠한 변수도 갱신되지 않는다면 동시성 application에서 마주치는 모든 문제는 발생하지 않음

- 가변성의 분리
    - 저장 공간이 무한하고 processor의 속도가 무한이 빠르면 불변성이 실현 가능하겠지만, 그렇지 않기 때문에 타협을 해야함
    - 가변 component와 불변 component의 분리
        - 불변 component에서는 순수하게 함수형 방식으로만 작업을 처리하도록 함
            - 어떤 가변 변수도 사용되지 않음
        - 가능한 한 많은 처리를 불변 component로 옮기고, 가변 component에서는 가능한 한 많은 code를 빼내야 함

- Event Sourcing : 상태가 아닌 tracsaction을 저장하자는 전략
    - 저장 공간이 커지고 처리 능력이 좋아질 수록 필요한 가변 상태는 더 적어짐
        - 여기서 더 나아간 것이 event sourcing
    - transaction을 저장하는 것은 상태를 저장하는 것보다 더 많은 저장 공간을 필요로 함
    - application이 CRUD가 아니라 CR만만 수행하면 '완전한 불변성'을 가지게 됨
        - source code version 관리 system이 이 방식으로 동작함




---




# Reference

- Clean Architecture (도서) - Robert C. Martin
