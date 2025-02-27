---
layout: skill
title: C 언어의 동적 Memory 할당
date: 2024-05-22
---


## 동적 Memory 할당 (Dynamic Memory Allocation)

> 동적 memory 할당이란 computer programming에서 **실행 중(runtime)에 사용할 memory 공간을 할당**하는 것을 의미합니다.

- program이 실행되기 위해서는 memory가 필요하며, compiler는 compile 시점에 source code를 읽고, 변수 타입들의 크기에 따라 memory를 할당합니다.
    - 이처럼 program이 실행되기 전, compile 시점에 source code를 읽고 memory 공간을 확보하는 것을 **정적 할당(static allocation)**이라고 합니다.

- **동적 할당(dynamic allocation)**은 compile time이 아닌 program이 실행되는 중인 **runtime에 필요한 만큼의 memory 공간을 확보**하는 것을 의미합니다.
    - 정적 할당과 memory 공간을 확보하는 시점이 다릅니다.


### 동적 할당이 필요한 이유

- 동적 할당은 **한정된 memory 공간을 효율적으로 사용**할 수 있게 해줍니다.
    - 필요할 때마다 새로운 memory 공간을 할당(동적 할당)하는 것이 아니라, compile time에 미리 넉넉한 memory 공간을 확보(정적 할당)해 둘 수도 있습니다.
    - 그러나 memory는 무한한 자원이 아니며 한정되어 있기 때문에, 미리 넉넉하게 할당해두는 것이 현실적으로 불가능하며, 가능하다 해도 이는 비효율적입니다.
        - 예를 들어, 1000000Byte size의 memory를 할당해두고 실제로는 10Byte만 사용한다면, 남은 999990Byte의 memory는 필요 없게 됩니다.

- 동적 할당을 통해 **그때그때 필요한 만큼만 memory 공간을 확보(`malloc`)**하고, **다 사용했다면 memory 공간을 해제(`free`)**하여 **memory를 경제적으로 사용**할 수 있습니다.


### C 언어의 장단점 : 동적 Memory 할당 관점

- C 언어에서의 동적 할당은 강력하고 유연한 도구지만, 잘못 사용하면 심각한 문제가 생길 수 있습니다.
- 따라서 동적 할당을 사용할 때는 항상 주의 깊게 관리하고, memory 누수(leak)나 pointer 오류를 방지하기 위해 철저한 검증과 test가 필요합니다.

#### 장점

- **직접적인 Memory 관리** : C 언어는 `malloc`, `calloc`, `realloc`, `free`와 같은 함수를 통해 memory를 직접 관리할 수 있습니다.
    - 이를 통해 개발자는 memory 사용을 최적화할 수 있습니다.

- **Memory 효율성** : 직접적인 memory 관리를 통해 memory 사용을 효율적으로 최적화할 수 있습니다.
    - 필요한 만큼만 memory를 할당하고, 사용 후 즉시 해제할 수 있습니다.

- **저수준 접근 가능** : C 언어는 pointer를 통해 memory의 특정 위치에 직접 접근할 수 있습니다.
    - system programming이나 hardware 제어와 같은 저수준 작업에서 유용합니다.

#### 단점

- **Memory 누수** : 동적 memory를 할당한 후 해제하지 않으면 memory 누수(leak)가 발생할 수 있습니다.
    - memory 누수 문제는 장기적으로 system의 memory 자원을 고갈시킬 수 있습니다.

- **Pointer 오류** : pointer를 잘못 사용하면 잘못된 memory 접근, buffer overflow 등의 심각한 오류가 발생할 수 있습니다.
    - pointer 오류 문제는 program의 안정성과 보안에 큰 영향을 미칠 수 있습니다.

- **복잡성 증가** : memory 관리를 수동으로 해야 하므로 code가 복잡해지고, memory 할당 및 해제에 대한 오류가 발생하기 쉽습니다.
    - 복잡성이 증가하면 개발자의 부담도 함께 증가합니다.

- **Garbage Collector 부재** : C 언어는 자동 Garbage Collection 기능이 없습니다.
    - Garbage Collector가 없기 때문에 개발자가 직접 memory 할당 및 해제를 관리해야 하며, 개발자의 실수로 인해 memory 관리 문제가 발생할 수 있습니다.


---


## C 언어의 Memory 영역

- C 언어의 memory 영역(Memory Layout)에는 Code 영역, Data 영역, BSS 영역, Heap 영역, Stack 영역이 있으며, **동적 memory 할당은 Heap 영역**에서 이루어집니다.

```txt
   High Address
┌────────────────┐
│     Stack      │
│ ↓↓↓↓↓↓↓↓↓↓↓↓↓↓ │
├~~~~~~~~~~~~~~~~┤
│                │
├~~~~~~~~~~~~~~~~┤
│ ↑↑↑↑↑↑↑↑↑↑↑↑↑↑ │
│      Heap      │
├────────────────┤
│  BSS Segment   │
├────────────────┤
│  Data Segment  │
├────────────────┤
│  Text Segment  │
└────────────────┘
   Low Address
```

1. **Code 영역 (Text Segment)**: program의 **실행 code**를 저장하는 memory 영역입니다.
    - program의 목적 파일(object file) 또는 실행 가능한 명령어(executable instruction)등의 **기계어 code**가 저장됩니다.
    - code 영역은 disk(ROM)로부터 명령어들을 복사해서 memory(RAM)에 적재하며, 명령어들이 수정되면 안 되기 때문에 **읽기 전용(read-only)**입니다.

2. **Data 영역 (Data Segment)** : **초기화된 전역 변수와 정적(static) 변수**가 저장되는 memory 영역입니다.
    - 초기화된 전역 변수라도 그 값은 수정될 수 있기 때문에, data 영역은 읽기/쓰기(read-write) 영역입니다.
        - 읽기 전용 영역이 아닙니다.

3. **BSS 영역 (BSS Segment)** : **초기화되지 않은 전역 변수와 정적 변수**가 저장되는 memory 영역입니다.
    - BSS는 "Block Started by Symbol"의 약자입니다.
    - BSS 영역은 program이 시작될 때 0으로 초기화됩니다.
        - 초기화되지 않은 전역 변수나 정적 변수가 커널에 의해 0으로 초기화된 상태로 저장됩니다.

4. **Heap 영역** : **동적으로 할당된 memory**가 저장되는 영역입니다.
    - runtime 시 `malloc`, `calloc`, `realloc`, `free` 등의 함수에 의해 관리됩니다.
        - `malloc` 함수를 호출했을 때 반환되는 값이 Heap memory 영역의 주소입니다.
    - 동적 memory 할당 시 memory 해제(free)을 제대로 해주지 않으면, 사용하지 않는 memory가 Heap 영역에 계속 상주해 있게 되는데, 이걸 **memory 누수(leak)**라 합니다.
        - 따라서 Heap memory는 memory 누수를 주의하여 잘 사용해야 합니다.
    - Heap 영역은 BSS 영역 끝에서 시작하여 더 큰(높은) 주소로 자랍니다.

5. **Stack 영역**: **함수 호출 시 지역 변수와 함수 호출 정보**를 저장하는 memory 영역입니다.
    - 함수가 호출될 때마다 stack frame이 추가되고, 함수가 종료되면 stack frame이 제거됩니다.
        - 호출되는 함수의 매개 변수, 지역 변수 뿐만 아니라, 함수가 끝났을 때의 복귀 주소 또한 Stack 영역에 저장됩니다.
    - Stack 영역은 memory의 상위 부분에서부터 **LIFO(Last In First Out)** 구조로 memory를 할당합니다.
    - 순환 algorithm에서 종종 **"Stack Overflow" alert message**가 뜨는 것은, 많은 함수 호출 때문에 Stack 영역이 너무 커졌기 때문입니다.


---


## C 언어의 동적 할당

- C 언어에서는 `malloc`, `calloc`, `realloc`, `free` 함수를 사용하여 동적 memory를 관리합니다.
    1. **`malloc`** : **지정된 크기만큼의 memory를 할당**하고, 성공하면 해당 memory block의 **시작 주소(pointer)를 반환**합니다.
    2. **`calloc`** : **지정된 개수와 크기만큼의 memory를 할당**하고, **모든 Bit를 0으로 초기화**한 후 **시작 주소(pointer)를 반환**합니다.
    3. **`realloc`** : **기존에 할당된 memory의 크기를 변경**합니다.
        - 이미 할당된 memory block의 크기를 변경하여 새로운 크기의 memory block을 할당하고, 기존 data를 새로운 block으로 복사합니다.
    4. **`free`** : 동적으로 할당된 **memory를 해제**합니다.

- 동적 memory 할당을 통해 C program에서 runtime 중에 필요한 memory를 유연하게 관리할 수 있습니다.
- `malloc`, `calloc`, `realloc`, `free`와 같은 함수를 적절히 사용하면 memory 효율성을 높일 수 있지만, 잘못 사용하면 memory 누수와 같은 문제를 일으킬 수 있으므로 주의가 필요합니다.


### `malloc` 사용하기

- `malloc`을 사용하여 `n`개의 정수를 저장할 수 있는 memory를 동적으로 할당합니다.
- 할당된 memory를 초기화한 후 출력하고, 마지막으로 `free` 함수를 사용하여 할당된 memory를 해제합니다.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n;

    printf("Enter the number of elements: ");
    scanf("%d", &n);

    // malloc을 사용하여 memory 할당
    arr = (int*)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    // 배열 초기화
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }

    // 배열 출력
    printf("Array elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // memory 해제
    free(arr);

    return 0;
}
```


### `calloc` 사용하기

- `calloc`을 사용하여 `n`개의 정수를 저장할 수 있는 memory를 동적으로 할당하고, 할당된 memory를 0으로 초기화합니다.
- `calloc`은 `malloc`과 달리 초기화 작업을 포함하므로 초기 상태가 보장됩니다.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n;

    printf("Enter the number of elements: ");
    scanf("%d", &n);

    // calloc을 사용하여 memory 할당 및 초기화
    arr = (int*)calloc(n, sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    // 배열 출력 (모든 요소가 0으로 초기화됨)
    printf("Array elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // memory 해제
    free(arr);

    return 0;
}
```


### `realloc` 사용하기

- 처음에 `malloc`을 사용하여 memory를 할당하고, 이후 `realloc`을 사용하여 memory 크기를 변경합니다.
- `realloc`을 통해 할당된 memory block의 크기를 조정하면서 기존 data를 유지합니다.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n, new_size;

    printf("Enter the number of elements: ");
    scanf("%d", &n);

    // malloc을 사용하여 memory 할당
    arr = (int*)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    // 배열 초기화
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }

    // realloc을 사용하여 memory 크기 변경
    printf("Enter the new size: ");
    scanf("%d", &new_size);

    arr = (int*)realloc(arr, new_size * sizeof(int));
    if (arr == NULL) {
        printf("Memory reallocation failed!\n");
        return 1;
    }

    // 새로운 크기에 대한 배열 초기화
    for (int i = n; i < new_size; i++) {
        arr[i] = i + 1;
    }

    // 배열 출력
    printf("Array elements after realloc: ");
    for (int i = 0; i < new_size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // memory 해제
    free(arr);

    return 0;
}
```


### `free` 사용하기

- `malloc`, `calloc`, `realloc`을 통해 할당된 memory를 더 이상 사용하지 않을 때 `free`를 호출하여 memory를 반환해야 합니다.
    - 동적 memory 할당 함수 중 `free`는 할당된 memory를 해제하는 데 사용됩니다.
    - `free` 함수로 memory를 해제하여 memory 누수를 방지합니다.

- `malloc`을 통해 동적으로 할당된 memory를 `free`를 사용하여 해제합니다.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n;

    printf("Enter the number of elements: ");
    scanf("%d", &n);

    // malloc을 사용하여 memory 할당
    arr = (int*)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    // 배열 초기화
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }

    // 배열 출력
    printf("Array elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // memory 해제
    free(arr);
    arr = NULL;    // pointer를 NULL로 설정하여 Dangling Pointer 방지

    return 0;
}
```


#### `free` 호출 후 `NULL`로 설정하는 이유

- memory 해제 후 반드시 pointer를 `NULL`로 설정할 필요는 없지만, **`NULL`로 설정하는 것이 좋은 이유**가 있습니다.

1. **Dangling Pointer** : Dangling Pointer는 program을 불안정하게 할 수 있으므로, `free` 호출 후 pointer를 `NULL`로 설정하는 것이 좋습니다.
    - Dangling Pointer란 **memory가 해제된 후에도 pointer가 여전히 해제된 memory를 가리키고 있는 상태**를 의미합니다.

2. **중복 해제 방지** : 이미 해제된 memory를 다시 해제하려고 하면 정의되지 않은 동작이 발생할 수 있기 때문에, 이를 방지하기 위해 pointer를 `NULL`로 설정합니다.


---


## Reference

- <https://blog.naver.com/PostView.naver?blogId=nsj6646&logNo=221498290964&parentCategoryNo=&categoryNo=38&viewDate=&isShowPopularPosts=false&from=postView>
- <https://blog.naver.com/PostView.naver?blogId=nsj6646&logNo=221503866808&parentCategoryNo=&categoryNo=38&viewDate=&isShowPopularPosts=false&from=postView>
- <https://velog.io/@saint6839/C언어-동적-memory-할당-개념-잡기>
