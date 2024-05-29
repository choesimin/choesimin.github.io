---
layout: skill
title: 자료 구조 - 연결 List (Linked List)
date: 2024-05-28
---




## 연결 List - 요소를 선형으로 저장하기

- 연결 List(Linked List)는 데이터 요소들이 선형으로 연결된 자료 구조입니다.
    - 각 요소는 node라고 불리며, 각 노드는 데이터와 다음 노드를 가리키는 포인터를 포함합니다.
    - 연결 리스트는 배열(Array)과 달리 요소들이 메모리 상에 연속적으로 저장되지 않으며, 동적으로 크기를 조절할 수 있는 장점이 있습니다.


### 연결 리스트의 구조

- **Node** : 연결 리스트의 기본 단위로, 데이터와 다음 노드를 가리키는 포인터를 포함합니다.
- **Head** : 리스트의 첫 번째 노드를 가리키는 포인터입니다.
- **Tail** : (옵션) 리스트의 마지막 노드를 가리키는 포인터로, 효율적인 삽입을 위해 사용될 수 있습니다.

```c
struct Node {
    int data;
    struct Node* next;
};
```




---




## 연결 리스트의 종류

1. **단일 연결 리스트 (Singly Linked List)** : 각 노드가 다음 노드를 가리키는 단일 포인터를 가집니다.
2. **이중 연결 리스트 (Doubly Linked List)** : 각 노드가 다음 노드와 이전 노드를 가리키는 두 개의 포인터를 가집니다.
3. **원형 연결 리스트 (Circular Linked List)** : 마지막 노드가 첫 번째 노드를 가리키도록 연결된 리스트입니다.


### 단일 연결 리스트의 기본 연산

1. **Node 삽입 (Insertion)** : 새로운 노드를 리스트의 앞, 중간, 또는 끝에 삽입합니다.
2. **Node 삭제 (Deletion)** : 리스트에서 특정 노드를 제거합니다.
3. **Node 검색 (Search)** : 리스트에서 특정 데이터를 가진 노드를 검색합니다.
4. **Node 순회 (Traversal)** : 리스트의 모든 노드를 순회하며 데이터를 처리합니다.

#### 단일 연결 리스트 구현 예제

```c
#include <stdio.h>
#include <stdlib.h>

// 노드 구조 정의
struct Node {
    int data;
    struct Node* next;
};

// 리스트의 시작 노드 (헤드)
struct Node* head = NULL;

// 노드 삽입 (리스트의 앞에 삽입)
void insertAtFront(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = head;
    head = newNode;
}

// 노드 삽입 (리스트의 끝에 삽입)
void insertAtEnd(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;

    if (head == NULL) {
        head = newNode;
        return;
    }

    struct Node* temp = head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}

// 노드 삭제
void deleteNode(int key) {
    struct Node* temp = head;
    struct Node* prev = NULL;

    // 삭제할 노드가 헤드인 경우
    if (temp != NULL && temp->data == key) {
        head = temp->next;
        free(temp);
        return;
    }

    // 삭제할 노드를 찾기
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }

    // 노드가 리스트에 없는 경우
    if (temp == NULL) return;

    // 노드 삭제
    prev->next = temp->next;
    free(temp);
}

// 리스트 출력
void printList() {
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

int main() {
    insertAtEnd(10);
    insertAtEnd(20);
    insertAtFront(5);
    printList();

    deleteNode(20);
    printList();

    return 0;
}
```

### 설명

1. **노드 삽입 (Insert):**
   - `insertAtFront` 함수는 새로운 노드를 리스트의 앞에 삽입합니다.
   - `insertAtEnd` 함수는 새로운 노드를 리스트의 끝에 삽입합니다.

2. **노드 삭제 (Delete):**
   - `deleteNode` 함수는 특정 값을 가진 노드를 리스트에서 삭제합니다. 삭제할 노드가 헤드인 경우와 아닌 경우를 구분하여 처리합니다.

3. **노드 순회 (Traversal):**
   - `printList` 함수는 리스트의 모든 노드를 순회하며 데이터를 출력합니다.

### 연결 리스트의 장단점

**장점:**
- **동적 크기 조절:** 배열과 달리 연결 리스트는 동적으로 크기를 조절할 수 있습니다.
- **삽입/삭제 효율:** 리스트의 중간에 요소를 삽입하거나 삭제할 때, 배열보다 효율적입니다.

**단점:**
- **추가 메모리 사용:** 각 노드가 데이터 외에도 포인터를 저장하므로 추가 메모리가 필요합니다.
- **순차 접근:** 배열과 달리 임의 접근이 불가능하며, 원하는 요소를 찾기 위해 처음부터 순회해야 합니다.
- **캐시 비효율성:** 메모리 상에서 노드들이 분산되어 있어 캐시 적중률이 낮을 수 있습니다.

### 결론

연결 리스트는 동적 크기 조절과 중간 삽입/삭제가 용이한 자료 구조입니다. 배열의 고정 크기와 임의 접근의 한계를 극복할 수 있지만, 추가 메모리 사용과 순차 접근의 단점을 가지고 있습니다. 연결 리스트의 이해와 활용은 효율적인 데이터 처리와 메모리 관리를 가능하게 합니다.