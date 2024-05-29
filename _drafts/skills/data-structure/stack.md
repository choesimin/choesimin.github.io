---
layout: skill
title: 자료 구조 - Stack
date: 2024-03-26
---




### 자료 구조 - 스택 (Stack)

#### 개요

스택(Stack)은 데이터를 순서대로 쌓아 올리는 자료 구조입니다. 스택은 후입선출(LIFO, Last In First Out) 원칙을 따릅니다. 즉, 마지막에 삽입된 데이터가 가장 먼저 제거됩니다. 스택은 물리적으로 쌓아 올린 접시나 책과 같은 형태로 생각할 수 있습니다.

#### 주요 연산

스택의 주요 연산은 다음과 같습니다:
1. **푸시 (Push):** 스택의 맨 위에 새로운 데이터를 추가하는 연산입니다.
2. **팝 (Pop):** 스택의 맨 위에 있는 데이터를 제거하고 반환하는 연산입니다.
3. **피크 (Peek) 또는 탑 (Top):** 스택의 맨 위에 있는 데이터를 제거하지 않고 반환하는 연산입니다.
4. **비어 있는지 확인 (IsEmpty):** 스택이 비어 있는지 확인하는 연산입니다.
5. **크기 확인 (Size):** 스택에 있는 데이터의 개수를 반환하는 연산입니다.

#### 스택의 구현

스택은 배열이나 연결 리스트를 사용하여 구현할 수 있습니다. 각 구현 방식은 장단점을 가지고 있습니다.

##### 배열을 이용한 스택 구현

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX 100 // 스택의 최대 크기

int stack[MAX];
int top = -1;

// 푸시 연산
void push(int data) {
    if (top >= MAX - 1) {
        printf("스택 오버플로우\n");
        return;
    }
    stack[++top] = data;
}

// 팝 연산
int pop() {
    if (top < 0) {
        printf("스택 언더플로우\n");
        return -1;
    }
    return stack[top--];
}

// 피크 연산
int peek() {
    if (top < 0) {
        printf("스택이 비어 있습니다\n");
        return -1;
    }
    return stack[top];
}

// 스택이 비어 있는지 확인
int isEmpty() {
    return top == -1;
}

// 스택의 크기 확인
int size() {
    return top + 1;
}

int main() {
    push(10);
    push(20);
    push(30);
    printf("스택의 맨 위 요소: %d\n", peek());
    printf("스택에서 팝한 요소: %d\n", pop());
    printf("스택의 크기: %d\n", size());
    return 0;
}
```

##### 연결 리스트를 이용한 스택 구현

```c
#include <stdio.h>
#include <stdlib.h>

// 노드 구조 정의
struct Node {
    int data;
    struct Node* next;
};

struct Node* top = NULL;

// 푸시 연산
void push(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (!newNode) {
        printf("메모리 할당 실패\n");
        return;
    }
    newNode->data = data;
    newNode->next = top;
    top = newNode;
}

// 팝 연산
int pop() {
    if (top == NULL) {
        printf("스택 언더플로우\n");
        return -1;
    }
    struct Node* temp = top;
    int popped = temp->data;
    top = top->next;
    free(temp);
    return popped;
}

// 피크 연산
int peek() {
    if (top == NULL) {
        printf("스택이 비어 있습니다\n");
        return -1;
    }
    return top->data;
}

// 스택이 비어 있는지 확인
int isEmpty() {
    return top == NULL;
}

// 스택의 크기 확인
int size() {
    int count = 0;
    struct Node* temp = top;
    while (temp != NULL) {
        count++;
        temp = temp->next;
    }
    return count;
}

int main() {
    push(10);
    push(20);
    push(30);
    printf("스택의 맨 위 요소: %d\n", peek());
    printf("스택에서 팝한 요소: %d\n", pop());
    printf("스택의 크기: %d\n", size());
    return 0;
}
```

#### 스택의 응용

스택은 다양한 응용 분야에서 사용됩니다. 대표적인 예는 다음과 같습니다:
- **함수 호출 관리:** 함수 호출 스택을 관리하여 재귀 함수 호출 시 반환 주소를 저장합니다.
- **표현식 계산:** 후위 표기법(Reverse Polish Notation, RPN) 계산기에서 사용됩니다.
- **문자열 역순 변환:** 문자열을 뒤집는 데 사용됩니다.
- **백트래킹 알고리즘:** 미로 찾기, 퍼즐 해결 등의 문제에서 상태를 저장하고 복원하는 데 사용됩니다.

#### 장단점

**장점:**
- **간단한 구현:** 배열이나 연결 리스트를 사용하여 쉽게 구현할 수 있습니다.
- **효율적인 연산:** 푸시와 팝 연산이 상수 시간(O(1))에 수행됩니다.

**단점:**
- **크기 제한:** 배열을 사용한 구현에서는 최대 크기가 제한될 수 있습니다.
- **동적 메모리 관리:** 연결 리스트를 사용한 구현에서는 동적 메모리 할당과 해제가 필요합니다.

### 결론

스택은 후입선출(LIFO) 원칙을 따르는 자료 구조로, 배열이나 연결 리스트를 통해 구현할 수 있습니다. 주요 연산으로는 푸시, 팝, 피크, 비어 있는지 확인, 크기 확인 등이 있으며, 다양한 응용 분야에서 활용됩니다. 스택의 간단한 구조와 효율적인 연산 덕분에 많은 알고리즘과 시스템에서 중요한 역할을 합니다.