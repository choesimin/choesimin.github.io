---
layout: skill
title: 자료 구조 - Stack
date: 2024-05-31
---




## Stack - 쌓아 올려서 저장하기

- Stack은 data를 순서대로 쌓아 올리는 자료 구조입니다.
    - 간단한 구조와 효율적인 연산 덕분에 많은 algorithm과 system에서 중요하게 사용됩니다.

- Stack은 후입선출(LIFO, Last In First Out) 원칙을 따릅니다
    - 마지막에 삽입된 data가 가장 먼저 제거됩니다.
        - push와 pop 연산이 상수 시간(`O(1)`)에 수행되어 효율적입니다.
    - 물리적으로 쌓아 올린 접시나 책과 같은 형태입니다.

- Stack은 **배열**이나 **연결 List**를 사용하여 간단하게 구현할 수 있으며, 두 구현 방식은 memory 사용, 동적 크기 조정, 접근 속도 등의 측면에서 차이가 있습니다.
    - **배열**은 연결 List보다 구현하기 더 쉽고 접근이 더 빠르지만(`O(1)`), 최대 크기가 제한됩니다.
    - **연결 List**가 동적 크기 조정이 가능해 더 유연하고 memory 효율적이지만, 동적 memory 할당과 해제가 필요해 구현이 배열보다 복잡합니다.

| 특징 | 배열로 구현한 Stack | 연결 List로 구현한 Stack |
| --- | --- | --- |
| **memory 사용** | 배열 기반 Stack은 미리 할당된 고정된 크기의 배열을 사용합니다. Stack의 크기를 초과하면 재할당이 필요하고, 이는 시간 소모가 클 수 있습니다. | 연결 List 기반 Stack은 필요할 때마다 node를 할당하므로 memory를 더 효율적으로 사용할 수 있습니다. 그러나 각 node는 data와 pointer를 저장해야 하므로 약간의 추가적인 memory overhead가 있습니다. |
| **동적 크기 조정** | 배열은 크기가 고정되어 있으므로, 최대 크기를 초과하면 Stack overflow가 발생합니다. 크기를 동적으로 조절하려면 새로운 더 큰 배열을 할당하고 기존 배열의 요소를 복사해야 합니다. | 연결 List는 크기가 동적이므로, Stack 크기에 제한이 없습니다. 필요한 만큼 node를 추가하거나 제거할 수 있습니다. 배열처럼 Stack overflow나 크기 조정에 대해 신경 쓸 필요가 없습니다. |
| **접근 속도** | 배열은 index를 통해 요소에 접근(`(O(1))`)하므로, 접근 속도가 빠릅니다. 그러나 Stack의 특성상 접근은 주로 마지막 요소에 한정됩니다. | 연결 List는 node를 따라가야 하므로(`O(n)`), 특정 위치에 접근하려면 시간이 더 걸릴 수 있습니다. 그러나 Stack의 특성상 주로 마지막 요소에 접근하므로, 연결 List에서도 접근 속도는 `O(1)`입니다. |
| **구현 복잡성** | 배열로 구현하는 것이 상대적으로 간단합니다. 초기 크기 설정 후, push와 pop 연산을 수행합니다. | 연결 List는 pointer를 관리해야 하므로, 배열에 비해 구현이 더 복잡합니다. node의 삽입과 삭제는 비교적 간단하지만, pointer를 올바르게 유지해야 합니다. |


### Stack의 주요 연산

1. **Push** : Stack의 맨 위에 새로운 data를 추가하는 연산입니다.
2. **Pop** : Stack의 맨 위에 있는 data를 제거하고 반환하는 연산입니다.
3. **Peek** or **Top** : Stack의 맨 위에 있는 data를 제거하지 않고 반환하는 연산입니다.


### Stack이 사용되는 곳

- **함수 호출 관리** : 함수 호출 Stack을 관리하여 재귀 함수 호출 시 반환 주소를 저장합니다.
- **표현식 계산** : 후위 표기법(Reverse Polish Notation, RPN) 계산기에서 사용됩니다.
- **문자열 역순 변환** : 문자열을 뒤집는 데 사용됩니다.
- **Backtracking algorithm** : 미로 찾기, puzzle 해결 등의 문제에서 상태를 저장하고 복원하는 데 사용됩니다.




---




## 배열로 Stack 구현하기

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX 100    // Stack의 최대 크기

int stack[MAX];
int top = -1;

void push(int data) {
    if (top >= MAX - 1) {
        printf("Stack overflow\n");
        return;
    }
    stack[++top] = data;
}

int pop() {
    if (top < 0) {
        printf("Stack underflow\n");
        return -1;
    }
    return stack[top--];
}

int peek() {
    if (top < 0) {
        printf("Stack이 비어 있습니다\n");
        return -1;
    }
    return stack[top];
}

int isEmpty() {
    return top == -1;
}

int size() {
    return top + 1;
}

int main() {
    push(10);
    push(20);
    push(30);

    printf("Stack의 맨 위 요소 : %d\n", peek());
    printf("Stack에서 pop한 요소 : %d\n", pop());
    printf("Stack의 크기 : %d\n", size());

    return 0;
}
```




---




## 연결 List로 Stack 구현하기

```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* top = NULL;

void push(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (!newNode) {
        printf("memory 할당 실패\n");
        return;
    }
    newNode->data = data;
    newNode->next = top;
    top = newNode;
}

int pop() {
    if (top == NULL) {
        printf("Stack underflow\n");
        return -1;
    }
    struct Node* temp = top;
    int popped = temp->data;
    top = top->next;
    free(temp);
    return popped;
}

int peek() {
    if (top == NULL) {
        printf("Stack이 비어 있습니다\n");
        return -1;
    }
    return top->data;
}

int isEmpty() {
    return top == NULL;
}

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

    printf("Stack의 맨 위 요소 : %d\n", peek());
    printf("Stack에서 pop한 요소 : %d\n", pop());
    printf("Stack의 크기 : %d\n", size());

    return 0;
}
```
