---
layout: skill
title: 자료 구조 - Queue
date: 2024-05-31
---




## Queue - 먼저 들어온 것을 먼저 내보내기

- Queue는 data 구조에서 FIFO(First In, First Out) 방식으로 작동하는 구조입니다.
    - 즉, 먼저 들어간 data가 먼저 나오는 구조입니다.

- **배열**과 **연결 List**를 사용하여 Queue를 간단히 구현할 수 있습니다.
    - **배열 기반 Queue**는 구현이 간단하지만 크기가 고정되는 단점이 있고, **연결 List 기반 Queue**는 크기 제한이 없지만 memory 관리가 필요합니다.

- Queue는 주로 data가 순차적으로 처리될 필요가 있는 상황에서 사용됩니다.
    - 예를 들어, printer 작업 대기열, process scheduling, network packet 관리 등에서 Queue를 사용합니다.


### Queue의 주요 연산

1. **Enqueue** : Queue의 끝에 새로운 요소를 추가합니다.
2. **Dequeue** : Queue의 앞에서 요소를 제거하고 반환합니다.




---




## 배열로 Queue 구현하기

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX_QUEUE_SIZE 100

typedef struct {
    int data[MAX_QUEUE_SIZE];
    int front;
    int rear;
} Queue;

void enqueue(Queue *q, int item) {
    if (isFull(q)) {
        printf("Queue is full!\n");
        return;
    }
    if (isEmpty(q)) {
        q->front = 0;
    }
    q->data[++q->rear] = item;
}

int dequeue(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty!\n");
        return -1;
    }
    int item = q->data[q->front];
    if (q->front == q->rear) {
        q->front = q->rear = -1;
    } else {
        q->front++;
    }
    return item;
}

void initQueue(Queue *q) {
    q->front = -1;
    q->rear = -1;
}

int isEmpty(Queue *q) {
    return q->front == -1;
}

int isFull(Queue *q) {
    return q->rear == MAX_QUEUE_SIZE - 1;
}

int main() {
    Queue q;
    initQueue(&q);
    
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    
    printf("Dequeued: %d\n", dequeue(&q));
    printf("Dequeued: %d\n", dequeue(&q));
    printf("Dequeued: %d\n", dequeue(&q));
    printf("Dequeued: %d\n", dequeue(&q));    // empty case
    
    return 0;
}
```




---




## 연결 List로 Queue 구현하기

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct {
    Node* front;
    Node* rear;
} Queue;

void enqueue(Queue* q, int item) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = item;
    newNode->next = NULL;
    if (isEmpty(q)) {
        q->front = q->rear = newNode;
    } else {
        q->rear->next = newNode;
        q->rear = newNode;
    }
}

int dequeue(Queue* q) {
    if (isEmpty(q)) {
        printf("Queue is empty!\n");
        return -1;
    }
    Node* temp = q->front;
    int item = temp->data;
    q->front = q->front->next;
    if (q->front == NULL) {
        q->rear = NULL;
    }
    free(temp);
    return item;
}

void initQueue(Queue* q) {
    q->front = q->rear = NULL;
}

int isEmpty(Queue* q) {
    return q->front == NULL;
}

int main() {
    Queue q;
    initQueue(&q);
    
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    
    printf("Dequeued: %d\n", dequeue(&q));
    printf("Dequeued: %d\n", dequeue(&q));
    printf("Dequeued: %d\n", dequeue(&q));
    printf("Dequeued: %d\n", dequeue(&q));    // empty case
    
    return 0;
}
```
