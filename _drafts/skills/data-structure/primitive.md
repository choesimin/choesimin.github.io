---
layout: skill
title: Data Structure
date: 2024-03-26
---



단순 자료구조(primitive data structures)는 프로그래밍 언어에서 기본적으로 제공하는 데이터 유형을 말합니다. C언어는 여러 가지 기본 데이터 유형을 제공하며, 이들을 활용하여 복잡한 데이터 구조를 구성할 수 있습니다. 기본적으로 C언어에서 제공하는 단순 자료구조에는 정수형(int), 부동 소수점형(float, double), 문자(char) 등이 있습니다. 이러한 자료구조들은 변수를 선언하고 값을 할당하는 데 직접 사용됩니다.



### 1. 정수형 (Integer Types)

정수형 데이터는 소수점이 없는 숫자를 표현합니다. C언어에서는 `int`, `short`, `long`, `unsigned` 등 여러 종류의 정수형을 제공합니다.

```c
#include <stdio.h>

int main() {
    int a = 10;
    short b = 20;
    long c = 30000;
    unsigned int d = 40000;
    
    printf("int: %d\n", a);
    printf("short: %d\n", b);
    printf("long: %ld\n", c);
    printf("unsigned int: %u\n", d);
    
    return 0;
}
```



### 2. 부동 소수점형 (Floating Point Types)

부동 소수점 데이터 유형은 실수를 저장하는 데 사용됩니다. C언어에서는 `float`와 `double`을 제공하여 소수점 이하의 값을 표현할 수 있습니다.

```c
#include <stdio.h>

int main() {
    float e = 10.5;
    double f = 20.123456;
    
    printf("float: %f\n", e);
    printf("double: %lf\n", f);
    
    return 0;
}
```



### 3. 문자형 (Character Type)

문자형 데이터는 단일 문자를 저장하는 데 사용됩니다. C언어에서는 `char` 유형을 사용하여 ASCII 문자를 저장할 수 있습니다.

```c
#include <stdio.h>

int main() {
    char g = 'G';
    
    printf("char: %c\n", g);
    
    return 0;
}
```



### 활용 예시

이러한 단순 자료구조들은 C언어로 프로그램을 작성할 때 기본적으로 사용되며, 이를 조합하여 배열, 구조체 등의 복합 자료구조를 만들 수 있습니다. 예를 들어, 학생의 정보를 저장하기 위한 구조체를 정의하고 사용하는 방법은 다음과 같습니다.

```c
#include <stdio.h>

// 학생 정보를 저장하기 위한 구조체 정의
typedef struct {
    int id; // 학번
    char name[50]; // 이름
    float gpa; // 평균 성적
} Student;

int main() {
    // 구조체 변수 선언 및 초기화
    Student student1 = {1, "Kim", 3.5};
    
    printf("ID: %d\n", student1.id);
    printf("Name: %s\n", student1.name);
    printf("GPA: %f\n", student1.gpa);
    
    return 0;
}
```

위 예시에서 볼 수 있듯이, 단순 자료구조들은 C언어 프로그래밍의 기본적인 빌딩 블록 역할을 하며, 이를 기반으로 더 복잡한 자료구조와 알고리즘을 구현할 수 있습니다.

