# Memory Structure

- program이 실행될 때, OS(운영 체제)는 disk에 있는 program을 memory(RAM) 공간에 할당
  - 이 때, OS에 할당할 공간을 제공하는 memory는 4가지 영역(Code, Data, Stack, Heap)으로 구성됨
  - Code 영역, Data 영역은 program loading(compile time)할 때 크기가 정해져서 수행 중간에 크기 변화가 없음
  - Stack 영역, Heap 영역은 program 수행(run time) 중에 memory 크기가 변함
- Memory
  - Code Section
  - Data Section
    - Global Memory
    - Stack Memory
    - Heap Memory

## Code 영역 (== Text 영역)

- 작성한 source code가 들어가는 부분
  - compile된 기계어가 들어감
- 실행 file을 구성하는 명령문들이 올라감
  - 함수, 제어문, 상수 등
- compile time에 결정되고 중간에 code를 바꿀 수 없게 Read-Only로 지정되어 있음
- CPU는 code 영역에 저장된 명령어를 하나씩 가져가서 처리함

## Data 영역

- 전역변수, 정적(static)변수가 할당되는 영역
- program의 시작할 때 할당되고, program이 종료될 때 소멸됨
- 실핻 도중에 전역변수가 변경될 수도 있기 때문에 Read-Write로 지정되어 있음

### BBS : Block Started by Symbol

- 초기화되지 않은 변수 영역을 뜻함
- 0으로 자동 초기화 해줌
- Data 영역은 크게 두가지로 나뉨
  1. 초기화된 변수 영역 (initialized data segment)
  2. 초기화되지 않은 변수 영역 (uninitialized data segment)

## Stack 영역

- program이 자동으로 사용하는 임시 memory 영역
- 함수 호출과 관계있는 지역변수, 매개변수, return 값, 돌아올 주소 등이 저장됨
  - Stack 영역에 저장되는 함수의 호출 정보를 'Stack frame'이라고함
- 함수 호출 시 기록하고 종료되면 제거함
  - 기록하고 종료하는 mechanism은 후입선출(LIFO) 방식
    - 삽입과 삭제가 TOP에서만 이루어짐
- memory의 높은 주소에서 낮은 주소의 방향으로 할당
  - Stack의 지역변수는 사용되고 소멸하므로 data 용량의 불확실성을 가짐
  - 그래서 밑에서부터 채워 올리고 Heap은 반대로 위에서부터 채워 내려감

### 장점

- 빠른 속도 (very fast access)
  - Stack 영역은 이미 할당된 공간을 사용하지만 Heap 영역은 동적으로 할당해서 사용하기 때문
- 하나의 명령만으로 memory 조작과 address 조작이 가능
  - don't have to explicitly de-allocate variables
    - 명시적인 할당 해제가 필요하지 않음
- 낭비되는 공간이 없음
  - space is managed efficiently by CPU, memory will not become fragmented
    - CPU에 의해 관리되기 때문에 memory에 효율적으로 할당됨

### 단점

- 한계가 있어 한계를 초과하도록 삽입할 수 없음 (유연성 부족)
  - limit on stack size (OS-dependent)
    - 공간이 비교적 작기 때문에 모든 응용 program에서 Stack을 사용할 수는 없음
  - variables cannot be resized

## Heap 영역

- programmer가 할당/해제하는 memory 공간
  - 사용자에 의해 관리됨
  - Java에서는 GC(Garbage Collector)가 자동으로 해제함
- 동적 할당 (Dynamic Memory Allocation)
  - Heap의 기억 장소는 pointer를 통해 동적으로 할당되거나 반환됨
    - 동적인 특성을 가진 자료구조에서 널리 사용됨
      - ex) Linked List, Tree, Graph 등
  - runtime 시 크기가 결정됨
  - data 배열의 크기가 확실하지 않고 변동이 있을 때 사용
- memory의 낮은 주소에서 높은 주소의 방향으로 할당 (적재)
- Stack보다 할당할 수 있는 memory 공간이 많다는 것이 장점
  - 하지만 pointer로 memory 영역을 접근해야 하기 때문에 자른 자료구조에 비해서 data를 읽고 쓰는 것이 느림

### 장점

- program에 필요한 개체의 개수나 크기를 미리 알 수 없는 경우에도 사용 가능함
- 개체가 너무 커서 Stack 할당자에 맞지 않는 경우 사용 가능

### 단점

- 할당 작업으로 인한 속도 저하
  - 단시 할당하는 데에 시간이 많이 소요될 수 있음
  - 가장 큰 원인은 block이 사용 가능한 목록에 없기 때문
    - runtime 할당자 code에서 사용 가능한 더 큰 block을 찾게 되어 주기 소요
    - 또는 back-end 할당자로부터 새 block을 할당하는 데에 주기 소요
- 해제 작업으로 인한 속도 저하
  - 주로 병합을 사용할 때 더 많은 주기가 소요됨
    - 병합하는 동안 각 해제 작업에서는 해당 인접 항복을 "찾아내어" 더 큰 block을 만들고, 그 block을 다시 해제 목록에 삽입함
    - 이러한 찾기가 수행되는 동안에는 memory가 임의의 순서로 access되어 cache 누락이 발생하고 성능이 저하됨
- Heap 손상으로 인한 속도 저하
  - 응용 program에서 Heap block을 적절하게 사용하지 않을 경우, Heap이 손상됨
  - 많이 발생할 수 있는 Heap 손상 문제
    - 이중 해제
    - 해제 후 block 사용
    - block 결계를 벗어나 덮어쓰기
    - ...
- Heap 경합으로 인한 속도 저하
  - 두 개 이상의 thread에서 동시에 data에 access하려고 하면 경합이 발생
    - 한 쪽 thread의 작업이 완료되어야 다른 쪽 thread의 작업이 진행될 수 있음
  - 경합으로 인해 항상 문제가 발생하며, 이 문제는 다중 processor system에서 일어나는 문제 중 가장 큰 문제임
    - memory block을 아주 많이 사용하는 응용 program이나 DDL이 여러 개의 thread로 실행되거나 다중 process system에서 실행되면 속도가 느려짐
  - 일반적인 해결 방법 : 단일 잠금 방법
    - 해당 Heap을 사용하는 모든 작업을 serialize하는 것
    - serialization으로 인해 thread에서는 잠금을 기다리는 동안 context를 switching할 수 있음
  - 경합은 일반적으로 thread와 process의 context 전환이라는 결과를 발생시킴
    - context 전환에도 resource가 많이 소모되지만, process cache에서 data가 손실되어 나중에 해당 thread가 다시 살아날 때 이 data를 다시 작성하는 데에 resource가 훨씬 많이 소모됨

### Heap 영역이 필요한 이유 (== 동적 할당이 필요한 이유)

- memory를 효울적으로 관리할 수 있음
  - embedded system을 개발하다 보면 hardware memory 크기가 매우 작은 경우가 많음
  - 그런 작은 memory 공간을 compiler가 자동으로 관리하는 것보다 programmer가 관리하는 것이 더 효율적인 경우가 많음

---

# Reference

- https://jinshine.github.io/2018/05/17/%EC%BB%B4%ED%93%A8%ED%84%B0%20%EA%B8%B0%EC%B4%88/%EB%A9%94%EB%AA%A8%EB%A6%AC%EA%B5%AC%EC%A1%B0/
- https://goodgid.github.io/Memory-Structure/
- https://selfish-developer.com/entry/%EC%8A%A4%ED%83%9D-%ED%9E%99-%EC%BD%94%EB%93%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%98%81%EC%97%AD
- https://st-lab.tistory.com/198
  - 자세한 설명
- https://m.blog.naver.com/yoonjinym/30089450819
  - stack & heap