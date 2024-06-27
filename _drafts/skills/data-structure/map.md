---
layout: skill
title: 자료 구조 - Map
date: 2024-06-26
---




## Map : Key-Value 형식으로 저장하기

- Map은 키와 값의 쌍을 저장하고, 키를 사용해 값을 효율적으로 검색할 수 있도록 하는 구조입니다.
    - **Map**은 ADT로, 키-값 쌍을 관리하는 자료 구조의 기본적인 연산을 정의합니다.


### Map의 기본 개념

- **Key** : 고유한 식별자 역할을 하며, 이를 통해 값(Value)을 검색할 수 있습니다.
- **Value** : 키에 대응하는 데이터입니다.
- **Hash Function** : 키를 입력받아 해시 값을 출력하는 함수로, 이 해시 값을 통해 저장 위치를 결정합니다.
- **Bucket** : 동일한 해시 값을 가진 키-값 쌍을 저장하는 공간입니다.


### Map의 주요 연산

- **put(key, value)** : 키와 값을 저장합니다.
- **get(key)** : 키에 대응하는 값을 반환합니다.
- **remove(key)** : 키와 값 쌍을 제거합니다.




---




## Map ADT를 구현한 여러 가지 자료 구조

- Map은 ADT(Abstract Data Type, 추상 자료형)이며, Map을 구현한 구체적인 자료 구조로는 **HashMap**, **HashTable**, **TreeMap** 등이 있습니다.
    - **HashTable**과 **HashMap**은 Map ADT의 구체적인 구현체로, 해시 함수를 사용하여 키-값 쌍을 저장합니다.
    - HashTable은 동기화를 지원하고, HashMap은 동기화를 지원하지 않습니다.

```mermaid
```
































---



## C 언어로 해시 테이블 기반 Map 구현

### 1. 자료 구조 정의
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 100

typedef struct Node {
    char* key;
    char* value;
    struct Node* next;
} Node;

typedef struct HashMap {
    Node* table[TABLE_SIZE];
} HashMap;
```

### 2. 해시 함수 구현
```c
unsigned int hash(char* key) {
    unsigned int hash = 0;
    while (*key) {
        hash = (hash << 5) + *key++;
    }
    return hash % TABLE_SIZE;
}
```

### 3. 초기화 함수
```c
HashMap* create_hash_map() {
    HashMap* map = (HashMap*) malloc(sizeof(HashMap));
    for (int i = 0; i < TABLE_SIZE; i++) {
        map->table[i] = NULL;
    }
    return map;
}
```

### 4. 삽입 함수
```c
void insert(HashMap* map, char* key, char* value) {
    unsigned int index = hash(key);
    Node* new_node = (Node*) malloc(sizeof(Node));
    new_node->key = strdup(key);
    new_node->value = strdup(value);
    new_node->next = map->table[index];
    map->table[index] = new_node;
}
```

### 5. 검색 함수
```c
char* search(HashMap* map, char* key) {
    unsigned int index = hash(key);
    Node* node = map->table[index];
    while (node) {
        if (strcmp(node->key, key) == 0) {
            return node->value;
        }
        node = node->next;
    }
    return NULL;
}
```

### 6. 삭제 함수
```c
void delete(HashMap* map, char* key) {
    unsigned int index = hash(key);
    Node* node = map->table[index];
    Node* prev = NULL;
    while (node) {
        if (strcmp(node->key, key) == 0) {
            if (prev) {
                prev->next = node->next;
            } else {
                map->table[index] = node->next;
            }
            free(node->key);
            free(node->value);
            free(node);
            return;
        }
        prev = node;
        node = node->next;
    }
}
```

### 7. 메모리 해제 함수
```c
void free_map(HashMap* map) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        Node* node = map->table[i];
        while (node) {
            Node* temp = node;
            node = node->next;
            free(temp->key);
            free(temp->value);
            free(temp);
        }
    }
    free(map);
}
```

### 사용 예제
```c
int main() {
    HashMap* map = create_hash_map();
    
    insert(map, "name", "Alice");
    insert(map, "age", "30");
    insert(map, "city", "New York");
    
    printf("name: %s\n", search(map, "name"));
    printf("age: %s\n", search(map, "age"));
    printf("city: %s\n", search(map, "city"));
    
    delete(map, "age");
    printf("age after delete: %s\n", search(map, "age"));
    
    free_map(map);
    return 0;
}
```





---




## Reference

- <https://healthcoding.tistory.com/51>
