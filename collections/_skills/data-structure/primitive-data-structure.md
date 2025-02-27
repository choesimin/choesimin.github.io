---
layout: skill
title: 단순 자료 구조 (Primitive Data Structure)
date: 2024-05-21
---


## 단순 자료 구조 : Program에서 가장 기본적이고 필수적인 Data Type

- 단순 자료 구조(Primitive Data Structure)는 **가장 기본적인 형태의 data** 저장 및 처리를 제공하는 자료형입니다.
    - computer system이 **기본적으로 제공**하며, **복잡한 자료 구조를 구성**하는 기본 요소로 사용됩니다.


### 정수 (Integer)

- 정수는 음수, 0, 양수를 포함하는 data type으로, **소수점이 없는 숫자**를 나타냅니다.

- C 언어에서는 여러 크기의 정수 type을 제공합니다.
    - **char** : 1Byte 크기로, -128에서 127 또는 0에서 255까지의 값을 가질 수 있습니다.
    - **short** : 2Byte 크기로, -32,768에서 32,767까지의 값을 가질 수 있습니다.
    - **int** : 4Byte 크기로, -2,147,483,648에서 2,147,483,647까지의 값을 가질 수 있습니다.
    - **long** : 8Byte 크기로, 매우 큰 정수 값을 가질 수 있습니다.

```c
#include <stdio.h>

int main() {
    char a = 65;    // ASCII 'A'
    short b = 32000;    // Short integer
    int c = 1000000;    // Integer
    long d = 1000000000L;   // Long integer

    printf("char: %c\n", a);
    printf("short: %d\n", b);
    printf("int: %d\n", c);
    printf("long: %ld\n", d);

    return 0;
}
```


### 실수 (Floating Point)

- 실수는 **소수점을 포함하는 숫자**를 나타내며, 정밀도를 가지고 있는 data type입니다.

- C 언어에서는 여러 크기의 실수 type을 제공합니다.
    1. **float** : 4Byte 크기로, 소수점 이하 약 7자리의 정밀도를 가집니다.
    2. **double** : 8Byte 크기로, 소수점 이하 약 15자리의 정밀도를 가집니다.
    3. **long double** : 더 큰 크기로, 더 높은 정밀도를 제공합니다.

```c
#include <stdio.h>

int main() {
    float a = 3.14f;
    double b = 2.718281828459;
    long double c = 1.618033988749895L;

    printf("float: %.2f\n", a);
    printf("double: %.12f\n", b);
    printf("long double: %.15Lf\n", c);

    return 0;
}
```


### 문자 (Character)

- 문자는 **단일 문자**를 나타내는 data type으로, ASCII Code 또는 Unicode 값으로 저장됩니다.

- C 언어에서는 **char** type을 사용하여 문자를 저장합니다.

```c
#include <stdio.h>

int main() {
    char a = 'A';
    char b = 'B';

    printf("char a: %c\n", a);
    printf("char b: %c\n", b);

    return 0;
}
```


### 문자열 (String)

- 문자열은 **일련의 문자들로 구성**된 data type으로, 일반적으로 null 문자('\0')로 끝나는 배열(array) 형태로 저장됩니다.

- C 언어에서는 문자열을 **char 배열**로 표현합니다.

```c
#include <stdio.h>

int main() {
    char str1[] = "Hello, World!";
    char str2[20] = "C Programming";

    printf("str1: %s\n", str1);
    printf("str2: %s\n", str2);

    return 0;
}
```


### 논리값 (Boolean)

- 논리값은 **참(True) 또는 거짓(False)** 두 가지 값만을 가지는 data type입니다.

- C 언어에서는 명시적인 **bool** type이 없지만, **0**은 False, **0 이외의 값**은 True로 간주합니다.
    - C99 표준 이후에는 **stdbool.h** header를 포함하여 **bool** type을 사용할 수 있습니다.

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    bool a = true;
    bool b = false;

    printf("bool a: %d\n", a);    // 1
    printf("bool b: %d\n", b);    // 0

    if (a) {
        printf("a is true\n");
    }
    if (!b) {
        printf("b is false\n");
    }

    return 0;
}
```
