---
layout: note
title: Clean Architecture - 불변성 유지하기
date: 2023-11-04
---




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
