# switch case와 if else

- 딱히 크게 신결 쓸 정도로 차이가 나지 않음 (java의 경우)
    - 부산에서 서울까지 자동차로 이동할 때 주머니에 100원을 넣은 것과 300원을 넣고 가는 것의 연비 차이 정도
- if else 구문을 쓸 수 있는 모든 상황에 switch문을 사용할 수 있는 것은 아님
    - 그러나, 모든 switch 구문은 if else문으로 대체될 수 있음
- switch문 사용 권장
    - 속도가 더 빠름
- if문은 branch statement에 기반
    - 조건이 만족하면 실행 / 만족하지 않으면 무시 (실행을 할 것이냐 하지 않을 것이냐)
- switch문은 jump statement에 기반
    - 입력된 값을 보고 특정 위치로 jump (어떤 code를 실행할 것이냐)
- if else문은 각 조건마다 그 조건을 처리할 수 있게 register를 변경해주는 instruction들이 각 조건마다 먼저 선행되어야 함
- switch문은 jump table을 만들기만 하면 조건이 몇 개이든 훨씬 빠르고 쉽게 넘어갈 수 있음
    - 다만 jump table을 만드는 overhead가 있음

### switch case

```java
switch (n) {
  case 1:
    ~
    break;
  case 2:
    ~
    break;
  case 3:
    ~
    break;
  ...
```
- 변수를 입력받아 미리 정해놓은 여러 값들과의 일치여부를 판단하여 switch문 내의 control flow를 결정
- performance > memory인 경우 사용
- 예전에는 case에 Integer만 가능했지만, 현재는 String도 가능
- 장점
    - switch문 시작 시에 입력받은 값을 확인하는 instruction만 필요
    - 조건을 확인하는 instruction 필요 없음
- 단점
    - jump table을 만드는 overhead가 있음
- 따져야 할 조건의 수가 많아져도 instruction이 추가로 요구되는 것이 아니기 때문에 따져야할 조건이 많은 경우 유리

### if else

```java
if (condition1) {
  ~
}
else if (condition2) {
  ~
}
...
```
- boolean의 결과값을 내놓는 조건문에 따라 true, false에 해당하는 각각 두 개의 흐름으로 갈라짐
    - if else문을 중첩되게 배치하면, 두 개의 흐름뿐만 아니라 세 개, 네 개 등등 그 이상의 control flow를 가질 수 있게 됨
- 각각의 조건문을 iterate하며 control flow를 결정
    - n개의 if else 구문이 있으면 n개의 조건문의 진위 여부를 판단
- O(n)의 시간복잡도
- performance < memory인 경우 사용
- 장점
    - jump table을 만드는 overhead가 없음
- 단점
    - if 혹은 else를 만날 때마다 조건을 만족하는지 확인하기 위한 instruction이 계속해서 필요하게 됨
- 따져야할 조건의 수가 적을 경우 if-else를 쓰는 것이 유리함

# switch case 구문 분석

- JVM에서는 switch 구문 안의 case 값들의 분포에 따라 내부적으로 각각의 상황에 최적화된 2개의 java byte code를 생성
    - 공동적으로 HashTable이 연상되는 구조를 지님
        - case 값들이 서로 큰 차이가 없이 붙어있을 경우 TableSwitch 형식의 compile을 수행하고, case의 값들이 서로 차이가 크게 날 경우 LookupSwitch 형식을 사용
- case값이 0, 1, 3, 5, 7일 때 compile된 java bytecode
```
0   iconst_5
1   istore_1 [num]
2   iload_1 [num]
3   tableswitch default: 73
        case 0: 48
        case 1: 53
        case 2: 73
        case 3: 58
        case 4: 73
        case 5: 63
        case 6: 73
        case 7: 68
48  iload_1 [num]
49  istore_2 [ret]
50  goto 75
53  iload_1 [num]
54  istore_2 [ret]
55  goto 75
58  iload_1 [num]
59  istore_2 [ret]
60  goto 75
63  iload_1 [num]
64  istore_2 [ret]
65  goto 75
68  iload_1 [num]
69  istore_2 [ret]
70  goto 75
73  iload_1 [num]
74  istore_2 [ret]
75  getstatic java.lang.System.out : java.io.PrintStream [16]
78  iload_2 [ret]
79  invokevirtual java.io.PrintStream.println(int) : void [22]
82  return
```
- case값이 1, 6, 34일 때 compile된 java bytecode
```
0   iconst_5
1   istore_1 [num]
2   iload_1 [num]
3   lookupswitch default: 51
        case 1: 36
        case 6: 41
        case 34: 46
36  iload_1 [num]
37  istore_2 [ret]
38  goto 53
41  iload_1 [num]
42  istore_2 [ret]
43  goto 53
46  iload_1 [num]
47  istore_2 [ret]
48  goto 53
51  iload_1 [num]
52  istore_2 [ret]
53  getstatic java.lang.System.out : java.io.PrintStream [16]
56  iload_2 [ret]
57  invokevirtual java.io.PrintStream.println(int) : void [22]
60  return
```
- TableSwitch는 case의 값이 서로 큰 차이가 나지 않는 경우 case로 주어진 값과 case들 사이의 값들에 해당하는 case까지 전부 계산하여 bytecode로 생성함
    - 0, 1, 3, 5, 7에 해당하는 case값만 주어졌지만 실제 compile된 bytecode를 보면 case들 사이의 값인 2, 4, 6 또한 default에 해당하는 control flow를 따르도록 compile된 것을 확인 가능
- LookupSwitch는 TableSwitch와는 다르게 case 간의 값들이 서로 많이 차이나게 되면 그 사이의 값들을 hash 형태로 계산해두지 않음
- TableSwitch는 label만을 사용하고, LookupSwitch는 key와 함께 label을 사용
- TableSwitch는 stack의 꼭대기에서 얻은 값을 전달하여 label을 찾아 바로 jump하는 방식으로 동작
- LookupSwitch는 이진 탐색 tree 형식으로 저장된 구조에서 key의 값을 찾아 key값과 연결된 lebel을 통해 jump하는 형태로 동작
- 따라서 switch문은 item의 개수(N)에 따라 worst case에서 O(lgN)에 실행됨
    - if else문은 item의 개수에 따라 O(N) 시간에 실행됨

---

# Reference

- https://blog.naver.com/PostView.nhn?isHttpsRedirect=true&blogId=kki2406&logNo=80041410085
- https://okky.kr/article/425493
    - 답변 참고
- https://aahc.tistory.com/6
- https://thinkpro.tistory.com/132
