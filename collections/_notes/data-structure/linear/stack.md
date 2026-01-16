---
layout: note
permalink: /100
title: 자료 구조 - Stack
description: Stack은 data를 순서대로 쌓아 올리는 자료 구조로, 후입선출(LIFO, Last In First Out) 원칙을 따릅니다.
date: 2024-05-31
---


## Stack - 쌓아 올려서 저장하기

- Stack은 **data를 순서대로 쌓아 올리는 자료 구조**입니다.
    - 간단한 구조와 효율적인 연산 덕분에 많은 algorithm과 system에서 중요하게 사용됩니다.

- Stack은 **후입선출(LIFO, Last In First Out) 원칙**을 따릅니다
    - 마지막에 삽입된 data가 가장 먼저 제거됩니다.
        - `push`와 `pop` 연산이 상수 시간(`O(1)`)에 수행되어 효율적입니다.
    - 물리적으로 쌓아 올린 접시나 책과 같은 형태입니다.

- Stack은 **배열**이나 **연결 List**를 사용하여 간단하게 구현할 수 있으며, 두 구현 방식은 memory 사용, 동적 크기 조정, 접근 속도 등의 측면에서 차이가 있습니다.
    - **배열**은 연결 List보다 구현하기 더 쉽고 접근이 더 빠르지만(`O(1)`), 최대 크기가 제한됩니다.
    - **연결 List**가 동적 크기 조정이 가능해 더 유연하고 memory 효율적이지만, 동적 memory 할당과 해제가 필요해 구현이 배열보다 복잡합니다.

| 특징 | 배열로 구현한 Stack | 연결 List로 구현한 Stack |
| --- | --- | --- |
| **Memory 사용** | 고정 크기 배열 사용, 초과 시 재할당 필요 | 필요 시 node 할당, pointer overhead 존재 |
| **동적 크기 조정** | 크기 고정, overflow 발생 가능 | 크기 제한 없음, 동적 확장 가능 |
| **접근 속도** | index 접근 `O(1)` | node 순회 `O(n)`, top 접근은 `O(1)` |
| **구현 복잡성** | 상대적으로 간단 | pointer 관리 필요, 상대적으로 복잡 |


### Stack이 사용되는 곳

- **함수 호출 관리** : 함수가 호출될 때마다 호출 정보를 Stack에 저장하고, 함수가 종료되면 Stack에서 호출 정보를 제거합니다.
    - programming 언어에서 함수 호출 시 Stack을 사용하여 함수 호출 정보를 관리합니다.
   
- **문자열 역순 변환** : 문자열을 역순으로 변환할 때 Stack을 사용할 수 있습니다.
    - 문자열의 각 문자를 Stack에 `push`한 후, Stack에서 `pop`하여 새로운 문자열을 구성하면 됩니다.

- **수식의 괄호 검사** : 수학 수식이나 programming code에서 괄호의 유효성을 검사할 때 Stack을 사용합니다.
    - 여는 괄호를 Stack에 `push`하고, 닫는 괄호를 만났을 때 Stack에서 `pop`하여 짝이 맞는지 확인합니다.

- **중위 표기식을 후위 표기식으로 변환** : 계산기의 algorithm에서 중위 표기식을 후위 표기식으로 변환할 때 Stack을 사용합니다.
    - 연산자의 우선순위를 처리하기 위해 Stack을 활용합니다.

- **DFS (Depth-First Search)** : graph 탐색 algorithm인 깊이 우선 탐색에서 Stack을 사용합니다.
    - 재귀적으로 동작하는 DFS는 Stack 자료 구조를 이용하여 graph의 node를 방문합니다.

- **Undo 기능** : text 편집기나 graphic 편집기 등에서 사용자의 작업을 되돌리는 기능을 구현할 때 Stack을 사용합니다.
    - 사용자의 작업을 Stack에 `push`하고, 되돌리기(Undo) 동작이 발생하면 Stack에서 `pop`하여 이전 상태로 되돌립니다.

- **Web browser의 방문 기록** : Web browser에서 방문한 page의 기록을 Stack에 저장하여 '뒤로 가기' 기능을 구현합니다.
    - 새로운 page를 방문할 때마다 Stack에 저장하고, '뒤로 가기' 버튼을 누르면 Stack에서 이전 page를 `pop`하여 표시합니다.


### Stack의 주요 연산

- **push(item)** : Stack의 맨 위에 새로운 data를 추가하는 연산입니다.
- **pop()** : Stack의 맨 위에 있는 data를 제거하고 반환하는 연산입니다.
- **peek()** : Stack의 맨 위에 있는 data를 제거하지 않고 반환하는 연산입니다.


### Stack의 시간 복잡도

- **insert** (삽입) : `O(1)`.
    - 최상위에 data를 바로 추가합니다.

- **delete** (삭제) : `O(1)`.
    - 최상위에 있는 data를 바로 삭제합니다.

- **access** (접근) : `O(n)`.
    - 모든 data를 순회해야 합니다.

- **search** (검색) : `O(n)`.
    - 모든 data를 순회해야 합니다.


---


## 배열로 Stack 구현하기

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX 100

typedef struct {
    int arr[MAX];
    int top;
} Stack;


// Stack 초기화
void initStack(Stack* stack) {
    stack->top = -1;
}

// Stack이 비어있는지 확인
int isEmpty(Stack* stack) {
    return stack->top == -1;
}

// Stack이 가득 찼는지 확인
int isFull(Stack* stack) {
    return stack->top == MAX - 1;
}

// Stack에 item 추가
void push(Stack* stack, int data) {
    if (isFull(stack)) {
        printf("Stack is full.\n");
        return;
    }
    stack->arr[++stack->top] = data;
}

// Stack에서 item 제거 및 반환
int pop(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty.\n");
        return -1;
    }
    return stack->arr[stack->top--];
}

// Stack의 가장 위에 있는 item 반환 (제거하지 않음)
int peek(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty.\n");
        return -1;
    }
    return stack->arr[stack->top];
}

// Stack의 모든 요소를 출력
void printStack(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty.\n");
        return;
    }
    for (int i = 0; i <= stack->top; i++) {
        printf("%d ", stack->arr[i]);
    }
    printf("\n");
}


int main() {
    Stack stack;
    initStack(&stack);

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    printStack(&stack);    // 10 20 30

    printf("Popped : %d\n", pop(&stack));    // 30
    printStack(&stack);    // 10 20

    printf("Peek : %d\n", peek(&stack));    // 20

    return 0;
}
```


---


## 연결 List로 Stack 구현하기

```c
#include <stdio.h>
#include <stdlib.h>

// Node 구조체 정의
struct Node {
    int data;
    struct Node* next;
};

// Stack 구조체 정의
typedef struct {
    struct Node* top;
} Stack;


// Stack 초기화
void initStack(Stack* stack) {
    stack->top = NULL;
}

// Stack이 비어있는지 확인
int isEmpty(Stack* stack) {
    return stack->top == NULL;
}

// Stack에 item 추가
void push(Stack* stack, int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = stack->top;
    stack->top = newNode;
}

// Stack에서 item 제거 및 반환
int pop(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty.\n");
        return -1;
    }
    struct Node* temp = stack->top;
    int poppedData = temp->data;
    stack->top = stack->top->next;
    free(temp);
    return poppedData;
}

// Stack의 가장 위에 있는 item 반환 (제거하지 않음)
int peek(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty.\n");
        return -1;
    }
    return stack->top->data;
}

// Stack의 모든 요소를 출력
void printStack(Stack* stack) {
    struct Node* temp = stack->top;
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}


int main() {
    Stack stack;
    initStack(&stack);

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    printStack(&stack);    // 30 20 10

    printf("Popped: %d\n", pop(&stack));    // 30
    printStack(&stack);    // 20 10

    printf("Peek: %d\n", peek(&stack));    // 20

    return 0;
}
```
