---
layout: skill
title: 추상 자료형 (ADT, Abstract Data Type)
date: 2024-05-21
---





## 추상 자료 구조






추상 자료형(ADT)에서는 기능들에 대한 세부적인 구현에 대해서는 이야기 하지 않습니다. 우리가 인스타그램을 사용할 때, 피드를 올리는 기능의 세부적인 구현 방법, DM을 보내는 세부적인 구현 방법에 대해서 알지 않아도 되는 것처 말이죠. 또는 자판기를 사용할 때 돈을 넣고 버튼을 누르면, 음료수가 나오는 기능의 세부적인 구현 방법을 알지 않아도 자판기를 사용할 수 있는 것처럼 말이죠. 
 
이처럼 추상 자료형(ADT)을 생성할 때는 사용자로 하여금, 그 안에 들어가는 세부적인 구현 방법을 알지 않아도 기능을 사용할 수 있게끔 만들어야합니다. 그래서 추상 자료형을 설계하는 사람들은 보통 10년 이상의 개발자, 시스템 이키텍트 분들이 만들게 되죠.
 
추상자료형을 사용하면, 데이터에 대한 정보를 이해하고 저장하는 방식을 결정함으로써 최적의 알고리즘을 개발할 수 있다는 장점이 있습니다. 또한, 프로그래밍을 효율적으로 구현할 수 있도록 도와줍니다. 여기까지 추상 자료형(ADT)이 무엇인지 그 개념과 특징에 대해서 알아보았습니다.








추상 자료형(abstract data type, ADT)은 컴퓨터 과학에서 데이터 구조와 관련된 중요한 개념입니다. ADT는 데이터와 데이터에 대한 연산을 정의하지만, 데이터가 실제로 어떻게 구현되는지는 숨깁니다. 이는 사용자가 데이터 구조의 내부 구현을 알 필요 없이, 데이터와 상호작용할 수 있게 해줍니다.

### 추상 자료형의 개념

1. **추상화** : ADT는 데이터와 데이터를 조작하는 연산들을 추상화합니다. 예를 들어, 스택 ADT는 `push`, `pop`, `isEmpty`와 같은 연산을 정의할 수 있습니다.
2. **캡슐화** : ADT는 데이터를 숨깁니다. 데이터가 실제로 어떻게 저장되고 관리되는지는 ADT의 사용자에게 보이지 않습니다. 사용자는 제공된 연산을 통해서만 데이터와 상호작용할 수 있습니다.
3. **인터페이스** : ADT는 데이터와 데이터를 조작하는 방법을 정의하는 인터페이스입니다. 인터페이스는 데이터 타입과 그 연산의 명세(specification)를 포함합니다.



---




## 추상 자료형 예시 : 스택(ADT)

- 스택은 대표적인 추상 자료형입니다.
    - 스택은 데이터가 후입선출(LIFO, Last-In-First-Out) 방식으로 저장되고 삭제되는 자료 구조입니다.

- 스택 ADT는 데이터에 대한 여러 가지 연산을 포함합니다.
    - `push` : 스택의 맨 위에 데이터를 추가.
    - `pop` : 스택의 맨 위에 있는 데이터를 제거하고 반환.
    - `peek` : 스택의 맨 위에 있는 데이터를 반환하지만 제거하지 않음.
    - `isEmpty` : 스택이 비어 있는지 여부를 확인.


### 스택 ADT의 C 언어 구현

- 추상적인 특징을 가진 스택 ADT를 C 언어로 구체화(구현)하여 정수형 데이터를 저장합니다.

- 내부 데이터의 저장 방식은 숨겨져 있으며, 사용자는 스택이 어떻게 구현되는지 알 필요가 없습니다.
    - 이 구현에서 스택의 내부 데이터는 배열을 사용해 저장되며, 사용자에게는 `push`, `pop`, `peek` 등의 인터페이스만 제공됩니다.

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX 100

typedef struct {
    int data[MAX];
    int top;
} Stack;

// 스택 초기화
void initialize(Stack *stack) {
    stack->top = -1;
}

// 스택이 비어 있는지 확인
int isEmpty(Stack *stack) {
    return stack->top == -1;
}

// 스택이 가득 찼는지 확인
int isFull(Stack *stack) {
    return stack->top == MAX - 1;
}

// 스택에 데이터 추가
void push(Stack *stack, int value) {
    if (isFull(stack)) {
        printf("Stack is full!\n");
        return;
    }
    stack->data[++stack->top] = value;
}

// 스택에서 데이터 제거 및 반환
int pop(Stack *stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty!\n");
        return -1;
    }
    return stack->data[stack->top--];
}

// 스택의 맨 위 데이터 확인
int peek(Stack *stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty!\n");
        return -1;
    }
    return stack->data[stack->top];
}

int main() {
    Stack stack;
    initialize(&stack);

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);

    printf("Top element is %d\n", peek(&stack));

    printf("Elements: \n");
    while (!isEmpty(&stack)) {
        printf("%d\n", pop(&stack));
    }

    return 0;
}
```




---




## Reference

- <https://ko.wikipedia.org/wiki/%EC%B6%94%EC%83%81_%EC%9E%90%EB%A3%8C%ED%98%95>
- <https://blog.naver.com/nsj6646/221503084744>
- <https://coduking.tistory.com/entry/추상-자료형ADT이란-개념과-특징>