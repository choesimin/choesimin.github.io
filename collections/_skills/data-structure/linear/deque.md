---
layout: skill
permalink: /174
title: 자료 구조 - Deque
description: Deque는 양 끝에서 삽입과 삭제가 모두 가능한 Queue입니다.
date: 2024-05-31
---


## Deque - Stack과 Queue를 합친 것

- Deque(Double-ended Queue)는 양 끝에서 삽입과 삭제가 모두 가능한 자료 구조입니다.

- Deque는 Queue와 Stack의 특성을 모두 포함하고 있어, 유연한 data 처리를 가능하게 합니다.

- Deque는 배열이나 연결 List로 구현할 수 있습니다.
    - 배열을 이용한 Deque 구현은 고정된 크기의 배열을 사용하여 Deque를 구현합니다.
    - 연결 List를 이용한 Deque 구현은 동적으로 memory를 할당하여 크기의 제한 없이 Deque를 구현합니다.


### Deque의 주요 연산

- **insertFront(item)** : item을 Deque의 앞쪽에 삽입합니다.
- **insertLast(item)** : item을 Deque의 뒤쪽에 삽입합니다.
- **deleteFront()** : Deque의 앞쪽에서 item을 삭제합니다.
- **deleteLast()** : Deque의 뒤쪽에서 item을 삭제합니다.


---


## 배열로 Deque 구현하기

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX 100

typedef struct {
    int arr[MAX];
    int front;
    int rear;
    int size;
} Deque;


void initDeque(Deque* deque) {
    deque->front = -1;
    deque->rear = 0;
    deque->size = 0;
}

int isFull(Deque* deque) {
    return deque->size == MAX;
}

int isEmpty(Deque* deque) {
    return deque->size == 0;
}

void insertFront(Deque* deque, int data) {
    if (isFull(deque)) {
        printf("Deque is full.\n");
        return;
    }

    if (deque->front == -1) {
        deque->front = 0;
        deque->rear = 0;
    } else if (deque->front == 0) {
        deque->front = MAX - 1;
    } else {
        deque->front = deque->front - 1;
    }

    deque->arr[deque->front] = data;
    deque->size++;
}

void insertLast(Deque* deque, int data) {
    if (isFull(deque)) {
        printf("Deque is full.\n");
        return;
    }

    if (deque->front == -1) {
        deque->front = 0;
        deque->rear = 0;
    } else if (deque->rear == MAX - 1) {
        deque->rear = 0;
    } else {
        deque->rear = deque->rear + 1;
    }

    deque->arr[deque->rear] = data;
    deque->size++;
}

void deleteFront(Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return;
    }

    if (deque->front == deque->rear) {
        deque->front = -1;
        deque->rear = -1;
    } else if (deque->front == MAX - 1) {
        deque->front = 0;
    } else {
        deque->front = deque->front + 1;
    }

    deque->size--;
}

void deleteLast(Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return;
    }

    if (deque->front == deque->rear) {
        deque->front = -1;
        deque->rear = -1;
    } else if (deque->rear == 0) {
        deque->rear = MAX - 1;
    } else {
        deque->rear = deque->rear - 1;
    }

    deque->size--;
}

int getFront(Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return -1;
    }
    return deque->arr[deque->front];
}

int getRear(Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return -1;
    }
    return deque->arr[deque->rear];
}

void printDeque(Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return;
    }

    int i = deque->front;
    while (1) {
        printf("%d ", deque->arr[i]);
        if (i == deque->rear)
            break;
        i = (i + 1) % MAX;
    }
    printf("\n");
}


int main() {
    Deque deque;
    initDeque(&deque);

    insertLast(&deque, 10);
    insertLast(&deque, 20);
    insertFront(&deque, 5);
    printDeque(&deque);     // 5 10 20

    deleteFront(&deque);
    printDeque(&deque);     // 10 20

    deleteLast(&deque);
    printDeque(&deque);     // 10

    return 0;
}
```


---


## 연결 List로 Deque 구현하기

```c
#include <stdio.h>
#include <stdlib.h>


struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};

struct Deque {
    struct Node* front;
    struct Node* rear;
};


void initDeque(struct Deque* deque) {
    deque->front = NULL;
    deque->rear = NULL;
}

int isEmpty(struct Deque* deque) {
    return deque->front == NULL;
}

void insertFront(struct Deque* deque, int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = deque->front;
    newNode->prev = NULL;

    if (isEmpty(deque)) {
        deque->rear = newNode;
    } else {
        deque->front->prev = newNode;
    }
    deque->front = newNode;
}

void insertLast(struct Deque* deque, int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    newNode->prev = deque->rear;

    if (isEmpty(deque)) {
        deque->front = newNode;
    } else {
        deque->rear->next = newNode;
    }
    deque->rear = newNode;
}

void deleteFront(struct Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty, cannot delete.\n");
        return;
    }

    struct Node* temp = deque->front;
    deque->front = deque->front->next;

    if (deque->front == NULL) {
        deque->rear = NULL;
    } else {
        deque->front->prev = NULL;
    }

    free(temp);
}

void deleteLast(struct Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty, cannot delete.\n");
        return;
    }

    struct Node* temp = deque->rear;
    deque->rear = deque->rear->prev;

    if (deque->rear == NULL) {
        deque->front = NULL;
    } else {
        deque->rear->next = NULL;
    }

    free(temp);
}

int getFront(struct Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return -1;
    }
    return deque->front->data;
}

int getRear(struct Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return -1;
    }
    return deque->rear->data;
}

void printDeque(struct Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return;
    }

    struct Node* temp = deque->front;
    while (temp != NULL) {
        printf("%d <-> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}


int main() {
    struct Deque deque;
    initDeque(&deque);

    insertLast(&deque, 10);
    insertLast(&deque, 20);
    insertFront(&deque, 5);
    printDeque(&deque);    // 5 <-> 10 <-> 20 <-> NULL

    deleteFront(&deque);
    printDeque(&deque);    // 10 <-> 20 <-> NULL

    deleteLast(&deque);
    printDeque(&deque);    // 10 <-> NULL

    return 0;
}
```
