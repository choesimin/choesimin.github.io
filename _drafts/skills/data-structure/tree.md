---
layout: skill
title: 자료 구조 - Tree
date: 2024-06-04
---




## Tree : Data를 계층 구조로 저장하기

- Tree란 계층적인 자료를 표현하는 데 이용되는 자료 구조입니다.
- 실제 나무를 거꾸로 한 것과 같은 모양을 하고 있기 때문에 트리라고 부릅니다.




### 트리의 특징

- 트리는 특별한 형태의 그래프이며, 그 형태 때문에 그래프와는 다른 새로운 성질을 가집니다.
    - 트리는 일반적인 그래프와는 달리, 계층 구조(hierarchical structure)를 가집니다.
    - 그래프는 정점(vertex)들과 간선(edge)들로 이루어진 자료 구조입니다.

1. **비순환 구조** : 트리는 cycle이 없는 비순환 구조입니다.
    - 즉, 한 정점에서 출발하여 다시 자기 자신으로 돌아오는 경로가 존재하지 않습니다.

2. **계층 구조** : 트리는 계층적(hierarchical) 구조를 가집니다.
    - 계층 구조는 데이터를 표현하거나 분석하기에 적합합니다.
        - 데이터 간의 상하 관계를 시각적으로 쉽게 이해할 수 있게 해줍니다.

3. **루트 노드** : 트리는 하나의 루트 노드와 0개 이상의 하위 트리로 구성됩니다.
    - 루트 노드는 반드시 하나여야 하며, 두 개가 될 수 없습니다.

4. **부모 노드** : 모든 노드는 단 하나의 부모(parent) 노드를 가집니다.
    - 루트 노드를 제외한 모든 노드는 반드시 하나의 부모 노드를 가져야 합니다.

5. **간선의 수** : 노드가 N개인 트리는 항상 N-1개의 간선(edge)을 가집니다.
    - 즉, 간선의 수는 항상 `정점의 개수 - 1` 입니다.

6. **경로** : 모든 노드로 가는 경로는 루트 노드를 거쳐야만 가능합니다.
    - 다른 노드들이 모든 경로를 지나기 위해서는 반드시 루트 노드를 거치는 구조를 가집니다.










Tree는 계층적 데이터를 저장하는 데 사용되는 자료 구조입니다. 이는 부모-자식 관계로 데이터를 구성하며, 루트 노드부터 시작하여 여러 개의 자식 노드로 확장됩니다. 트리는 많은 실제 세계의 데이터를 모델링하는 데 유용합니다. 예를 들어, 파일 시스템, 조직 구조, HTML DOM 등이 있습니다.

트리의 기본 요소와 특성은 다음과 같습니다:

1. **노드 (Node)**: 트리의 기본 단위로, 데이터와 다른 노드에 대한 포인터를 포함합니다.
2. **루트 (Root)**: 트리의 최상위 노드입니다. 트리는 하나의 루트 노드를 가지고 있습니다.
3. **부모 (Parent)와 자식 (Child)**: 부모 노드는 자식 노드를 가리키며, 자식 노드는 부모 노드에 의해 가리켜집니다.
4. **리프 (Leaf)**: 자식 노드가 없는 노드입니다.
5. **서브트리 (Subtree)**: 루트 노드의 자식 노드를 루트로 하는 트리입니다.
6. **높이 (Height)**: 루트 노드에서 가장 먼 리프 노드까지의 경로 길이입니다.

트리에는 여러 종류가 있으며, 그 중 일부는 다음과 같습니다:

- **이진 트리 (Binary Tree)**: 각 노드가 최대 두 개의 자식 노드를 가지는 트리입니다.
- **이진 탐색 트리 (Binary Search Tree, BST)**: 이진 트리의 한 종류로, 왼쪽 자식 노드는 부모 노드보다 작고, 오른쪽 자식 노드는 부모 노드보다 큽니다.
- **균형 트리 (Balanced Tree)**: 높이를 최소화하여 삽입, 삭제, 검색 작업의 성능을 향상시킨 트리입니다. 예로는 AVL 트리, 레드-블랙 트리가 있습니다.
- **힙 (Heap)**: 우선순위 큐를 구현하기 위해 사용되는 트리 구조로, 최대 힙과 최소 힙이 있습니다.

다음은 간단한 이진 탐색 트리를 C 언어로 구현한 예제입니다:

```c
#include <stdio.h>
#include <stdlib.h>

// 노드 구조체 정의
typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

// 새로운 노드 생성 함수
Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// 이진 탐색 트리에 노드 삽입 함수
Node* insertNode(Node* root, int data) {
    if (root == NULL) {
        return createNode(data);
    }
    if (data < root->data) {
        root->left = insertNode(root->left, data);
    } else if (data > root->data) {
        root->right = insertNode(root->right, data);
    }
    return root;
}

// 중위 순회(In-order Traversal) 함수
void inOrderTraversal(Node* root) {
    if (root != NULL) {
        inOrderTraversal(root->left);
        printf("%d ", root->data);
        inOrderTraversal(root->right);
    }
}

int main() {
    Node* root = NULL;
    root = insertNode(root, 50);
    insertNode(root, 30);
    insertNode(root, 20);
    insertNode(root, 40);
    insertNode(root, 70);
    insertNode(root, 60);
    insertNode(root, 80);

    printf("중위 순회 결과: ");
    inOrderTraversal(root);
    printf("\n");

    return 0;
}
```

이 예제는 기본적인 이진 탐색 트리의 노드 삽입과 중위 순회(In-order Traversal)를 구현한 것입니다. 트리는 데이터 구조의 중요한 개념 중 하나이며, 이를 통해 다양한 응용 프로그램에서 효율적인 데이터 관리와 검색이 가능합니다.