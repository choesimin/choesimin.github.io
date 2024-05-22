---
layout: skill
title: 추상 자료형 (ADT, Abstract Data Type)
date: 2024-05-21
---




## 추상 자료형 : Interface와 구현을 분리하여 추상화 계층을 둔 것

- 추상 자료형(Abstract Data Type, ADT)은 **data와 data에 대한 연산을 정의**하지만, **data가 실제로 어떻게 구현되는지는 숨깁니다.**
    - 이는 사용자가 data 구조의 내부 구현을 알 필요 없이, data와 상호작용할 수 있게 해줍니다.

- 추상 자료형은 구현 방법을 명시하지 않다는 점에서 자료 구조와 다릅니다.


### 추상 자료형의 개념

1. **추상화** : ADT는 data와 data를 조작하는 연산들을 추상화합니다.
    - 예를 들어, Stack ADT는 `push`, `pop`, `isEmpty`와 같은 연산을 정의할 수 있습니다.

2. **캡슐화** : ADT는 data를 숨기며, data가 실제로 어떻게 저장되고 관리되는지는 사용자에게 보이지 않습니다.
    - 사용자는 제공된 연산을 통해서만 data와 상호작용할 수 있습니다.

3. **Interface** : ADT는 data와 data를 조작하는 방법을 정의하는 interface입니다.
    - interface는 data type과 그 연산의 명세(specification)를 포함합니다.




---




## 추상 자료형의 예시 : Stack(ADT)

- Stack은 대표적인 추상 자료형입니다.
    - Stack은 data가 후입선출(LIFO, Last In First Out) 방식으로 저장되고 삭제되는 자료 구조입니다.

- Stack ADT는 data에 대한 여러 가지 연산을 포함합니다.
    - `push` : Stack의 맨 위에 data를 추가.
    - `pop` : Stack의 맨 위에 있는 data를 제거하고 반환.
    - `peek` : Stack의 맨 위에 있는 data를 반환하지만 제거하지 않음.
    - `isEmpty` : Stack이 비어 있는지 여부를 확인.


### Stack ADT를 C 언어로 구현하기

- 추상적인 특징을 가진 Stack ADT를 C 언어로 구체화(구현)하여 정수형 data를 저장합니다.

- 내부 data의 저장 방식은 숨겨져 있으며, 사용자는 Stack이 어떻게 구현되는지 알 필요가 없습니다.
    - 이 구현에서 Stack의 내부 data는 배열을 사용해 저장되며, 사용자에게는 `push`, `pop`, `peek` 등의 interface만 제공됩니다.

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX 100

typedef struct {
    int data[MAX];
    int top;
} Stack;

// Stack 초기화
void initialize(Stack *stack) {
    stack->top = -1;
}

// Stack이 비어 있는지 확인
int isEmpty(Stack *stack) {
    return stack->top == -1;
}

// Stack이 가득 찼는지 확인
int isFull(Stack *stack) {
    return stack->top == MAX - 1;
}

// Stack에 data 추가
void push(Stack *stack, int value) {
    if (isFull(stack)) {
        printf("Stack is full!\n");
        return;
    }
    stack->data[++stack->top] = value;
}

// Stack에서 data 제거 및 반환
int pop(Stack *stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty!\n");
        return -1;
    }
    return stack->data[stack->top--];
}

// Stack의 맨 위 data 확인
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

- <https://ko.wikipedia.org/wiki/추상_자료형>
- <https://blog.naver.com/nsj6646/221503084744>
- <https://coduking.tistory.com/entry/추상-자료형ADT이란-개념과-특징>