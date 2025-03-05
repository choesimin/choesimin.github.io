---
layout: skill
permalink: /31
title: C 언어의 동적 Memory 할당
description: C 언어에서는 동적 Memory 할당을 통해 runtime에 필요한 memory 공간을 할당합니다.
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


