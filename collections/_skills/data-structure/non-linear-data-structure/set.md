---
layout: skill
date: 2024-07-18
title: 자료 구조 - Set
description: Set은 중복과 순서가 없는 Data 집합입니다.
---


## Set : 중복과 순서가 없는 Data 집합

```js
{
    "value1",
    "value2",
    "value3"
}
```

- Set 자료 구조는 **중복된 요소를 허용하지 않고, 순서가 없는 data의 집합**을 의미합니다.
    - Set에는 중복된 요소가 포함될 수 없습니다.
        - 동일한 값이 두 개 이상 존재할 수 없습니다.
    - Set의 요소들은 특정한 순서를 가지지 않습니다.
    - 보통 Set은 요소의 포함 여부를 빠르게 확인할 수 있도록 설계되어, 탐색이 빠릅니다.

- C 언어에서는 Set을 **배열과 HashTable을 이용하여 구현**할 수 있습니다.
    - 배열을 사용하면 단순한 구조를 갖지만, 탐색과 삭제가 비효율적입니다.
    - HashTable을 사용하면 보다 효율적인 탐색과 삭제가 가능하지만, hash 함수와 충돌 해결 전략을 잘 설계해야 합니다.


### Set의 기본 연산

1. **insert(value)** : 새로운 요소를 Set에 추가(삽입)합니다.
2. **delete(value)** : 특정 요소를 Set에서 제거(삭제)합니다.
3. **contains(value)** : 특정 요소가 Set에 존재하는지 확인(탐색)합니다.


---


## Set 구현하기

- C 언어로 Set을 구현합니다.


### 배열로 Set 구현하기

```c
#include <stdio.h>
#include <stdbool.h>

#define MAX_SIZE 100

typedef struct {
    int elements[MAX_SIZE];
    int size;
} Set;

// Set 초기화
void initSet(Set *set) {
    set->size = 0;
}

// Set에 요소 삽입
bool insert(Set *set, int value) {
    // 중복 검사
    for (int i = 0; i < set->size; i++) {
        if (set->elements[i] == value) {
            return false; // 이미 존재하는 값
        }
    }

    if (set->size < MAX_SIZE) {
        set->elements[set->size++] = value;
        return true;
    }
    return false; // Set이 가득 참
}

// Set에서 요소 삭제
bool delete(Set *set, int value) {
    for (int i = 0; i < set->size; i++) {
        if (set->elements[i] == value) {
            set->elements[i] = set->elements[--set->size]; // 마지막 요소로 대체
            return true;
        }
    }
    return false; // 값이 존재하지 않음
}

// Set에 요소가 존재하는지 확인
bool contains(Set *set, int value) {
    for (int i = 0; i < set->size; i++) {
        if (set->elements[i] == value) {
            return true;
        }
    }
    return false;
}

// Set 출력
void printSet(Set *set) {
    for (int i = 0; i < set->size; i++) {
        printf("%d ", set->elements[i]);
    }
    printf("\n");
}

int main() {
    Set mySet;
    initSet(&mySet);

    insert(&mySet, 10);
    insert(&mySet, 20);
    insert(&mySet, 30);
    printSet(&mySet);

    delete(&mySet, 20);
    printSet(&mySet);

    printf("Contains 10 : %s\n", contains(&mySet, 10) ? "true" : "false");
    printf("Contains 20 : %s\n", contains(&mySet, 20) ? "true" : "false");

    return 0;
}
```


### HashTable로 Set 구현하기

- HashTable은 Set 자료 구조의 특징을 잘 구현할 수 있는 자료 구조입니다.
    - 빠른 검색과 삽입을 가능하게 하기 때문입니다.

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define TABLE_SIZE 100

typedef struct Node {
    int value;
    struct Node *next;
} Node;

typedef struct {
    Node *table[TABLE_SIZE];
} Set;

// hash 함수
int hash(int value) {
    return value % TABLE_SIZE;
}

// Set 초기화
void initSet(Set *set) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        set->table[i] = NULL;
    }
}

// Set에 요소 삽입
bool insert(Set *set, int value) {
    int index = hash(value);
    Node *current = set->table[index];
    while (current != NULL) {
        if (current->value == value) {
            return false; // 이미 존재하는 값
        }
        current = current->next;
    }
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->value = value;
    newNode->next = set->table[index];
    set->table[index] = newNode;
    return true;
}

// Set에서 요소 삭제
bool delete(Set *set, int value) {
    int index = hash(value);
    Node *current = set->table[index];
    Node *prev = NULL;
    while (current != NULL) {
        if (current->value == value) {
            if (prev == NULL) {
                set->table[index] = current->next;
            } else {
                prev->next = current->next;
            }
            free(current);
            return true;
        }
        prev = current;
        current = current->next;
    }
    return false; // 값이 존재하지 않음
}

// Set에 요소가 존재하는지 확인
bool contains(Set *set, int value) {
    int index = hash(value);
    Node *current = set->table[index];
    while (current != NULL) {
        if (current->value == value) {
            return true;
        }
        current = current->next;
    }
    return false;
}

// Set 출력
void printSet(Set *set) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        Node *current = set->table[i];
        while (current != NULL) {
            printf("%d ", current->value);
            current = current->next;
        }
    }
    printf("\n");
}

int main() {
    Set mySet;
    initSet(&mySet);

    insert(&mySet, 10);
    insert(&mySet, 20);
    insert(&mySet, 30);
    printSet(&mySet);

    delete(&mySet, 20);
    printSet(&mySet);

    printf("Contains 10 : %s\n", contains(&mySet, 10) ? "true" : "false");
    printf("Contains 20 : %s\n", contains(&mySet, 20) ? "true" : "false");

    return 0;
}
```
