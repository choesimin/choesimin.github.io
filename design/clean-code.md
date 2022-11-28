# Clean Code

---

# 깨끗한 code

## Code

- code : 요구사항을 표현하는 언어
- programming : 기계가 실행할 정도로 상세하게 요구사항을 명시하는 작업
- 기계가 실행할 수 있을 정도의 정밀한 표현을 하기 위해서는 code가 반드시 필요함

## 나쁜 Code

- 나쁜 code가 지속되면 시간이 지날 수록 상황은 더 안 좋아짐
    - 나쁜 code가 작성됨 -> 개선 없이 기능 추가 -> 더 복잡해짐 -> 그 자체로 나쁜 code가 됨 -> 기능 수정/추가에 점점 더 많은 시간이 듬 -> 생산성 하락
    - 따라서 나쁜 code는 업무 속도를 늦춤
- 기한을 맞추기 위해서 나쁜 code를 양산하지만, 이는 오히려 기한을 맞추지 못하도록 하는 원인이 됨
    - 엉망진창인 상태로 인해 속도가 늦어지고, 기한을 놓침
    - 기한을 맞추는 유일한 방법은 언제나 code를 최대한 깨끗하게 유지하는 습관

## 깨끗한 Code란?

- 보기에 즐거운 code
- 효율적인 code
- 세세한 사항까지 꼼꼼하게 처리하는 code
    - 철저한 오류 처리
    - memory 누수, 경쟁 상태(race condition), 일관성 없는 명명법 등에 대한 꼼꼼한 처리
- 한 가지에 집중하는 code
    - method는 한 가지 기능만 수행해야 함
- 가독성이 좋은 code
    - 깨끗한 code는 잘 쓴 문장처럼 읽혀야 함
    - 작성자가 아닌 사람이 읽기 쉽고 고치지 쉬워야 함
    - 의미있는 이름이 붙음
- 주의 깊게 작성한 code
    - 시간을 등려 깔끔하고 단정하게 정리한 code
- 중복을 피하는 code
- 작게 추상화된 code
- 짐작했던 기능을 그대로 수행하는 code

## Boy Scout 규칙

- '캠프장은 처음 왔을 때보다 더 깨끗하게 해놓고 떠나라'
- code는 시간이 지나도 언제나 깨끗하게 유지해야 함
    - 적극적으로 code의 퇴보를 막는 노력 필요
- 지속적인 개선
    - 한꺼번에 많은 시간과 노력을 투자해 code를 정리하기 보다, 항상 관리하는 것이 중요함
        - 이러면 시간이 지날수록 좋아지는 code가 됨

---

# 의미 있는 이름

- 의도를 분명히 밝히기
    - 좋은 이름을 지으려면 시간이 걸리지만, 좋은 이름으로 절약하는 시간이 훨씬 더 많음
        - code가 하는 일을 짐작하기 쉬워지기 때문

- 그릇된 정보 피하기
    - code에 잘못된 단서를 남겨서는 안 됨
        - 의미를 흐리게 함
    - 널리 쓰이는 의미가 있는 단어를 다른 의미로 사용해서는 안 됨
        - ex) hp, aix, sco, ... (unix platform을 가리키는 이름)
    - 복수형과 ~List를 구분해서 사용하기
        - 'List'는 실제 List가 아니라면 잘못된 명명임
        - 단지 묶기 위함이면 단어의 복수형을 사용하기 (~s, ~es, ...)
    - 일관성 있게 명명하기
        - 서로 비슷한 이름을 사용하지 않도록 주의하기
        - 유사한 개념은 유사한 표기법을 사용하기

- 의미 있게 구분하기
    - 연속적인 숫자 피하기
        - ex) a1, a2, a3, ..., aN
        - 아무런 정보를 제공하지 않음
    - 이름이 달라야 한다면 의미도 달라져야 함
    - 불용어 추가하지 않기
        - ex) ~Info, ~Data, ...
        - 의미가 불분명함
        - 의미가 중복되게 함
            - ex) 변수명에 variable이라는 단어를 붙임
            - ex) 표 이름에 table이라는 단어를 붙임

- 발음하기 쉬운 이름을 사용하기
    - 발음하기 쉬운 이름이 두뇌가 처리하기 쉬움
    - 발음하기 쉬운 이름이 토론하기 좋음
        - programming은 사회 활동이기 때문

- 검색하기 쉬운 이름을 사용하기
    - 유지보수할 때 검색 가능 여부가 큰 영향을 줌
        - ex) log를 grep 명령어로 검색하는 경우

- Encoding을 피하기
    - 유형이나 범위 정보까지 encoding에 넣으면, 그만큼 이름을 해독하기 어려워짐
        - ex) member 변수 접두어 'm_~', type 접미어 '~String', ...

- 일반적으로 통용될 수 있는 이름 사용하기
    - code를 읽을 때 변수 이름을 자신이 아는 이름으로 변환하며 읽어야 한다면, 그 변수 이름은 바람직하지 않음
    - 명료함이 최고

- Class 이름
    - class와 객체 이름은 명사, 명사구가 적합함
    - 동사는 사용하지 않음

- Method 이름
    - method는 동사, 동사구가 적합함
    - 접근자(accessor), 변경자(mutator), 조건자(predicate)는 javabean 표준에 따라 값 앞에 get, set, is를 붙임

- 기발한 이름 피하기
    - 의도를 분명하고 솔직하게 표현하기

- 한 개념에 한 단어를 사용하기
    - 추상적인 개념 하나에 단어 하나를 선택해 고수해야 함
        - ex) 똑같은 method를 class마다 fetch, retrieve, get으로 제각각 부르면 혼란스러움
    - 일관성 있는 어휘를 사용해야 code를 이용하는 programmer가 편함

- 한 단어를 두 가지 목적으로 사용하지 않기
    - 맥락이 다르다면 다른 단어를 사용하는 것이 맞음
        - 일관성을 지키기 위해 같은 단어를 사용하는 규칙에 얽메여서는 안됨
        - ex) add & insert & append

- 해법 영역에서 가져온 이름 사용하기
    - 문제 영역(domain)에서 가져온 이름을 사용하는 것은 피해야 함
        - 같은 개념을 다른 이름으로 이해하던 사람들에게 혼동을 줄 수 있음 
    - 따라서 전산 용어, algorithm이름, pattern 이름, 수학 용어 등을 사용해도 됨
        - code를 읽는 사람은 programmer이기 때문

- 문제 영역에서 가져온 이름을 사용하기
    - 적절한 programming 용어가 없다면 문제 영역에서 이름을 가져와서 사용하기
        - code를 보수하는 programmer가 분야 전문가에게 의미를 물어 파악할 수 있게 됨
    - 문제 영역 개념과 관련이 깊은 code라면 문제 영역에서 이름을 가져와서 사용하는 것이 맞음

- 의미 있는 맥락을 추가하기
    - 스스로 의미가 분명한 이름도 있지만, 그런 이름이 적기 때문에 class, 함수, 이름 공간에 넣어 맥락을 부여함
        - 모든 방법이 실패하면 마지막 수단으로 접두어를 붙임
            - ex) {firstName, lastName, street, houseNumber, city, state, zipcode} -> {addrFirstName, addrLastName, addrState}

- 불필요한 맥락 없애기
    - 일반적으로는 짧은 이름이 긴 이름보다 좋지만, 의미가 분명한 경우에 한해서만 좋음
    - 맥락이 충분히 보이는 경우에서 굳이 맥락을 또 추가할 필요는 없음

---

# 함수

- 작게 만들기
    - 명백해야 함
        - 각 함수가 이야기 하나를 표현하도록 해야 함
    - block과 들여쓰기
        - if 문 / else 문 / while 문 등에 들어가는 block은 한 줄이어야 함
            - 대개 여기서 함수를 호출함
            - 이렇게 하면 바깥을 감싸는 함수(enclosing function)가 작아짐
            - block안에서 호출하는 함수 이름을 적절히 짓는다면, code를 이해하기 쉬워짐
                - 중첩 구조가 생길만큼 함수가 커져서는 안 된다는 뜻
            - == 함수에서 들여쓰기 수준은 1단이나 2단을 넘어서면 안 됨

- 한 가지만 하기
    - '함수는 한 가지를 해야 한다. 그 한 가지를 잘 해야 한다. 그 한 가지만을 해야 한다.'
    - 함수가 한 가지만 하는지  판단하는 방법
        - 한 함수 안(같은 추상화 수준)에서 logic을 추상화하여 한 단계만 수행하는 지 확인하기
        - 다른 표현이 아니라 의미 있는 이름으로 다른 함수를 추출할 수 있는지 확인하기
            - 한 가지 작업만 하는 함수는 자연스럽게 section으로나누기 어려움

- 함수 당 추상화 수준은 하나로 하기
    - 함수가 확실히 '한 가지' 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 함
    - 한 함수 내에 추상화 수준을 섞으면 code를 읽는 사람이 헷갈리게 됨
        - 특정 표현이 근본 개념인지 세부사항인지 구분하기 어렵게 되기 때문
    - code는 위에서 아래로 이야기처럼 읽혀야 좋음

- Switch 문 (+ if/else 문)
    - switch 문은 작게 만들기 어려움
    - 본질적으로 switch 문은 N가지를 처리하기 때문에 '한 가지' 작업만 하도록 만들기 어려움
        - SRP(Single Responsibility Principle)를 위반함
            - code를 변경할 이유가 여럿이기 때문
        - OCP(Open Closed Principle)을 위반하게 함
            - 새로운 case를 추가할 때마다 code를 변경해야 하기 때문
    - 완전히 피할 방법은 없기 때문에, 각 switch 문을 저차원 class에 숨기고 반복하지 않는 방식을 사용하기
        - 다형성(polymorphism)을 이용하여 단 한 번만 사용하기
            - 다형적 객체를 생성하는 code 짜기
        - 숨긴 후에는 다른 code에 노출시키지 않음

- 서술적인 이름 사용하기
    - 'code를 읽으면서 짐작했던 기능을 각 routine이 그대로 수행한다면 깨끗한 code라 불러도 되겠다'
    - 함수가 작고 단순할수록 서술적인 이름을 고르기 쉬워짐
    - 이름이 길어도 괜찮음
        - '길고 서술적인 이름'이 '짧고 어려운 이름'보다 좋음
        - '길고 서술적인 이름'이 '길고 서술적인 주석'보다 좋음
    - 서술적인 이름을 사용하면 설계가 뚜렷해지므로 code 개선이 쉬워짐
    - 일관성 있는 이름을 붙여야 함
        - module 내에서 함수 이름은 같은 문구, 명사, 동사를 사용하기
            - ex) includeSetupAndTeardownPages, includSetupPages, includeSuiteSetupPage, includeSetupPage, ...

- 함수 인수
    - 인수 갯수는 적을수록 좋음
        - 0개 (무항) > 1개 (단항) > 2개 (이항) > 3개 (삼항) > 4개 이상 (다항)
    - 인수가 많으면
        - 개념을 이해하기 어려움
        - test case를 작성하기 어려움
    - 함수 이름과 인수는 추상화 수준이 같아야 함
    - 단항 형식을 사용할 때
        - 인수에 질문을 던지는 경우
        - 인수를 변환해 결과를 반환하는 경우
            - 입력 인수의 변환 결과는 반환값으로 돌려주기
                - 변환 결과를 가져오기 위해 출력 인수를 사용하는 것보다 반환값을 사용하는 것이 나음
            - 변환값으로 입력 인수를 그대로 돌려주는 함수여도, 변환 형태를 유지하기 위해 반환값으로 주는 것이 좋음
        - event 함수
            - ex) passwordAttemptFailedNtimes(int attempts)
            - event 함수는 event라는 사실이 code에 명확히 드러나야 함
    - flag 인수(boolean)는 사용하지 않음
        - 함수가 한꺼번에 여러 가지를 처리한다는 뜻이기 때문
            - flag가 참이면 a를 하고 거짓이면 b를 한다는 것이기 때문
    - 이항 함수
        - 적절한 경우 예
            - 인수가 x, y 좌표인 경우
        - 불가피하게 이항 함수를 사용할 수 있지만, 위험이 따르기 때문에 되도록이면 단항 함수를 사용해야 함
    - 인수 객체
        - 인수가 2~3개 필요하다면 일부를 독자적인 class 변수로 선언할 수도 있음
        - 객체를 생성해 인수를 줄일 수도 있음
            - 변수를 묶기 위해 이름을 붙여 개념을 표현하게 됨
    - 동사와 keyword
        - 단항 함수는 함수와 인수가 동사/명사 쌍을 이루어야 함
            - write(name) 보다 writeField(name)이 더 나음
                - 한번에 알아보기 더 쉬움
        - 함수 이름에 keyword(인수 이름)를 추가하면 인수 순서를 기억할 필요가 없음
            - assertEquals보다 assertExpectedEqualsActual(expected, actual)이 더 나음

- 부수 효과 일으키지 않기
    - 부수 효과는 그 자체로 거짓말이 됨
        - 함수에서 한 가지를 하는 척 하면서 다른 것도 하기 때문
    - 예상치 못하게 함수로 넘어온 인수나 class 변수, system 전역 변수를 수정하기도 함
    - 출력 인수를 사용하는 것은 피하기
        - appendFooter(s);
            - 이 함수가 s를 바닥글로 첨부할지, s에 바닥글을 첨부할지 알 수 없음
        - 객체 지향 언어에서는 출력 인수를 사용할 필요가 거의 없음
            - 출력 인수로 사용하라고 설계한 this라는 변수가 있기 때문
                - appendFooter(s)보다 report.appendFooter()가 나음
        - 함수에서 상태를 변경해야 한다면, 함수가 속한 객체 상태를 변경하는 방식을 사용하는 것이 더 좋음

- 명령과 조회를 분리하기
    - 함수는 명령과 조회 중 하나만 해야 함

- 오류 code보다 예외를 사용하기
    - 오류 처리도 '한 가지 작업'이기 때문에, 오류를 처리하는 함수는 오류만 처리해야 함
    - try/catch/finaly 문 사용

- 반복하지 않기
    - 중복이 늘어나면, code 길이가 늘어나고, 수정 시 변경점이 많아짐
    - 중복을 없애면 module 가독성이 좋아짐
    - 많은 원칙과 기법, 기술이 중복을 제거하고 제어할 목적으로 나옴

- software를 짜는 행위는 글짓기와 비슷함
    - 생각을 기록한 후 읽기 좋게 다듬기
    - 초안은 서투르고 어수선하므로, 원하는 대로 읽힐 때까지 읽기 좋게 다듬음

---

# 주석

- 주석은 필요악
    - programming 언어 자체가 표현력이 풍부하다면, programming 언어를 치밀하게 사용해 의도를 표현할 능력이 있다면, 주석은 필요하지 않음
    - code로 의도를 표현하지 못해서 사용하게 됨

- 주석은 code의 진화를 따라가지 못함
    - code는 변화하는데 주석이 언제나 code를 따라가지 않음
    - 따라서 주석은 오래될수록 code에서 멀어짐

- 주석은 나쁜 code를 보완하지 못함
    - 표현력이 풍부하고 깔끔하며 주석이 거의 없는 code > 복잡하고 어수선하며 주석이 많이 달린 code
    - code가 알아보기 어렵다면 주석을 달기보단, code를 깨끗하게 만드는 것이 나음

- code로 의도를 표현하기
    - 나쁜 예) // 직원에게 복지 혜택을 받을 자격이 있는지 검사한다. if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))
    - 좋은 예) if (employee.isEligibleForFullBenefits())

## 주석이 필요하거나 유익한 경우

- 법적인 주석
    - ex) 저작권 정보, 소유권 정보  등
- 정보를 제공하는 주석
- 의도를 설명하는 주석
- 의미를 명료하게 밝히는 주석
    - 인수나 반환값이 표준 library나 변경하지 못하는 code에 속한다면 의미를 밝혀주는 주석이 유용함
- 결과를 경고하는 주석
- TODO 주석
    - 앞으로 할 일을 // TODO 주석으로 남겨두면 편함
    - TODO로 떡칠한 code는 바람직하지 않음
    - 주기적으로 TODO 주석을 점검해 없애도 괜찮은 주석은 없애는 것이 좋음
- 중요성을 강조하는 주석
    - 자칫 대수롭지 않다고 여겨질 부분의 중요성을 강조하기 위해서 사용하기도 하마
- 공개 API의 Javadocs
    - 공개 API는 설명이 필요함

## 나쁜 주석

- 대다수 주석
    - 허술한 code를 지탱하는 주석
    - 엉성한 code의 변명
    - 미숙한 결정을 합리화하는 주석
- 주절거리는 주석
    - 저자에게만 의미 있어서 다른 사람이 봤을 때 다른 code를 뒤져봐야 하는 주석
    - 독자와 소통하지 못하는 주석
- 같은 이야기를 중복하는 주석
    - code를 지저분하고 정신 없게 만듬
- 오해할 여지가 있는 주석
- 의무적으로 다는 주석
    - 모든 함수에 Javadocs를 달거나 모든 변수에 주석을 달아야 한다는 규칙은 쓸모 없음
        - code를 헷갈리게 만듬
        - 거짓말할 가능성을 높임
        - 잘못된 정보를 제공할 여지를 만듬
- 있으나 마나 한 주석
    - 당연한 사실을 언급하며 새로운 정보를 제공하지 못하는 주석
- 함수나 변수로 충분히 표현할 수 있는 주석
- 위치를 표시하는 주석
- 닫는 괄호에 다는 주석
    - ex) try { while (...) { ... } // while } // try
    - 중첩이 심하고 장황한 함수라면 의미가 있을지도 모르지만, 작고 캡슐화된 함수에는 잡음이 됨
    - 닫는 괄호에 주석을 달아야 한다면, 함수를 줄이는 시도를 하는 것이 나음
- 공로를 돌리거나 저자를 표시하는 주석
    - source code 관리 system은 누가 언제 무엇을 추가했는지 알려주기 때문에 필요 없음
- 주석으로 처리한 code
    - 주석으로 처리된 code는 다른 사람이 지우기 주저하게 됨
        - 이유가 있고 중요해서 남겨놓았다고 생각함
- 전역 정보
    - 주석을 달아야 한다면 근처에 있는 code에만 기술해야 함
    - code 일부에 주석을 달면서 system의 전반적인 정보를 기술해서는 안 됨
- 너무 많은 정보
    - 독자에게 불필요하고 불가사의한 정보는 오히려 혼란을 줌
- 모호한 관계
    - 주석과 주석이 설명하는 code는 둘 사이의 관계가 명백해야 함
- 함수 header
    - '짧고 한 가지만 수행하며 이름을 잘 붙인 함수'가 '주석으로 header를 추가한 함수'보다 나음
- 비공개 code의 Javadocs
    - 공개하지 않을 code라면 Javadocs는 쓸모 없음
    - 유용하지 않을 뿐더러 Javadocs 주석이 요구하는 형식으로 인해 보기 싫고 산만해짐

---

# 형식 맞추기

- 형식을 맞추는 목적
    - code 형식은 의사소통의 일부이며, 의사소통은 개발사의 일차적인 의무임
        - '돌아가는 code'가 우선이 아님
    - code의 가독성은 앞으로 바뀔 code에 대한 품질에 영향을 줌
        - 처음에 잡아놓은 구현 style과 가독성 수준은 유지보수 용이성과 확장성에 계속 영향을 미치게 됨
            - 원래 code는 사라지더라도 개발자의 style과 규율은 사라지지 않기 때문

- 적절한 행 길이 유지하기
    - 일반적으로 큰 file보다 작은 file이 이해하기 쉬움
        - 가능하면 한 file에 200줄을 넘지 않도록 하기
    - 신문 기사처럼 작성하기
        - 신문 기사
            - 표제 : 기사를 몇마디로 요약함
            - 첫 문단 : 전체 기사 내용을 요약함
            - 아래로 내려갈수록 : 세세한 사실 (날짜, 이름, 발언, 주장, 기타 세부사항)
        - source file
            - 이름 : 간단하고 설명이 가능해야 함
            - source file 첫 부분 : 고차원 개념과 algorithm에 대한 설명
            - 아래로 내려갈수록 : 의도에 대한 세세한 묘사
            - 마지막 : 가장 저차원 함수와 세부 내역
    - 개념은 빈 행으로 분리하기
        - 빈 행은 새로운 개념을 시작한다는 시각적 단서가 됨
    - 세로 밀집도
        - 세로 밀집도는 개념 연관성을 의미함
            - 개념을 분리하는 줄바꿈과 반대 역할을 함
        - 서로 밀접한 code 행은 세로로 가까지 놓아야 함
    - 수직 거리
        - 서로 밀접한 개념은 세로로 가까워야 함
        - 같은 file에 속할 정도로 밀접한 두 개념은 세로 거리로 연관성을 표현해야 함
            - 연관성 : 한 개념을 이해하는 데에 다른 개념이 중요한 정도
    - 변수 선언
        - 변수는 사용하는 위치에 최대한 가까이 선언하기
    - Instance 변수
        - class 제일 처음에 선언하기
        - 변수간에 세로로 거리를 두지 않기
            - 잘 설계한 class는 class의 많은 method가 instance 변수를 사용하기 때문
    - 종속 함수
        - 한 함수가 다른 함수를 호출한다면 두 함수는 세로로 가까이 배치하기
            - program이 자연스럽게 읽히도록 만듬 (가독성 향상)
    - 개념적 유사성
        - 개념적인 친화도가 높을수록 code를 가까이 배치하기
        - 친화도가 높은 요인
            - 한 함수가 다른 함수를 호출해 생기는 종속성
            - 변수와 그 변수를 사용하는 함수 간의 종속성
        - 종속적인 관계가 없더라도 개념적으로 유사하다면 가까이 배치할 수도 있음
    - 세로 순서
        - 호출되는 함수를 호출하는 함수보다 나중에 배치하기
            - source code module이 고차원에서 저차원으로 자연스레 내려가게 됨

- 가로 형식 맞추기
    - 짧은 행이 좋음
        - 120자 이하로 행 길이를 제한하기
    - 가로 공백과 밀집도
        - 가로 공백을 사용해 밀접한 개념과 느슨한 개념을 표현하기
            - 할당문의 왼쪽 요소와 오른쪽 요소를 분명히 나누기 위한 공백
                - int lineSize =  line.length();
                - totalChars += lineSize;
            - 함수와 인수는 관계가 밀접하기 때문에 함수 이름과 이어지는 괄호 사이에는 공백을 넣지 않음
                - lineWidthHistogram.addLine(lineSize, lineCount);
                - recordWidestLine(lineSize);
        - 연산자 우선순위를 강조할 때
            - (-b + Math.sqrt(determinant)) / (2*a)
            - b*b - 4*a*c
    - 가로 정렬 사용하지 않기
        - 가로 정렬 : 여러 변수를 선언할 때 길이가 다른 변수명들의 할당 영역 시작 위치를 맞추는 것
        - code가 엉뚱한 부분을 강조해 진짜 의도를 가리게 됨
        - 정렬이 필요할 정도로 목록이 길다면 목록 길이에 문제가 있다는 것
    - 들여쓰기
        - 범위(scope)로 이뤄진 계층을 표현하기 위해 code를 들여씀
        - 왼쪽으로 code를 맞춰 code가 속하는 범위를 시각적으로 표현함
        - 일관된 들여쓰기는 code를 이해하기 쉽게 만듬
    - 들여쓰기를 무시할 수 있는 경우에도 들여쓰기
        - 간단한 if 문, 짧은 while 문, 짧은 함수에서 괄호와 들여쓰기를 생략할 수 있지만, 그대로 들여쓰기를 하는 것이 좋음
        - 범위를 제대로 표시하는 것이 더 중요함

- Team 규칙
    - team은 한 가지 규칙에 합의해야 하며, 모든 팀원은 그 규칙에 따라야 함
        - 그래야 software가 일관적인 style을 보이게 됨
    - 좋은 software system은 일관적임
        - 한 source file에서 봤던 형식이 다른 source file에도 쓰이리라는 신뢰감을 독자에게 줄 수 있어야 함

---

# 객체와 자료 구조

- 자료 추상화
    - 구현을 감추기 위해서는 추상화가 필요함
        - 변수 사이에 함수라는 계층을 넣는다고 해서 구현이 감춰지지는 않음
            - 변수를 private으로 선언 하더라도 각 값마다 조회 함수(getter)와 설정 함수(setter)를 제공한다면, 구현을 외부로 노출하는 것과 같음
        - 추상 interface를 제공하여 사용자가 구현을 모른 채 자료의 핵심을 조작할 수 있어야 진정한 의미의 class라고 할 수 있음

- 자료/객체 비대칭
    - 객체와 자료 구조는 반대되는 특징을 가짐
        - 객체 : 추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개
        - 자료 구조 : 자료를 그대로 공개하며 별다른 함수는 제공하지 않음
    - 객체 지향 code에서 어려운 변경은 절차적인 code에서 쉬우며, 절차적인 code에서 어려운 변경은 객체 지향 code에서 쉬움
        - '(자료 구조를 사용하는) 절차적인 code는 기존 자료 구조를 변경하지 않으면서 새 함수를 추가하기 쉽다. 반면, 객체 지향 code는 기존 함수를 변경하지 않으면서 새 class를 추가하기 쉽다.'
        - '절차적인 code는 새로운 자료 구조를 추가하기 어렵다. 그러러면 모든 함수를 고쳐야 한다. 객체 지향 code는 새로운 함수를 추가하기 어렵다. 그러려면 모든 class를 고쳐야 한다.'
    - 모든 것이 객체하는 생각을 해서는 안 됨
        - 때로은 단순한 자료 구조와 절차적인 code가 적합한 상황이 있음

- Demeter 법칙
    - module은 자신이 조작하는 객체의 속사정을 몰라야 한다는 법칙
        - 객체는 자료를 숨기고 함수를 공개해야 함
    - Class C의 method f는 다음과 같은 객체의 method만 호출해야 함
        - Class C
        - f가 생성한 객체
            - 하지만 method가 반환하는 객체의 method는 호출해서는 안 됨
                - 잘 아는 것을 사용하고, 낯선 것은 경계해야 함
        - f 인수로 넘어온 객체
        - C instance 변수에 저장된 객체
    - 기차 충돌(train wreck) 문제
        - 여러 객체가 한 줄로 이어진 기차처럼 보이는 문제
            - final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
        - 기차는 나누는 것이 나음
            - Option opts = ctxt.getOptions();
            - File scratchDir = opts.getScratchDir();
            - final String outputDir = scratchDir.getAbsolutePath();
        - 객체와 자료 구조의 구분을 확실하게 하는 것이 나음
            - final String outputDir = ctxt.options.scratchDir.absolutePath;
                - 객체 method와 조회 함수를 함께 사용하면 자료 구조와 객체의 역할을 모두 가지고 있는 셈이므로 하나로 통일되도록 변경
    - 잡종 구조
        - 절반은 객체, 절반은 자료 구조인 경우
            - 중요한 기능을 수행하는 함수, 공개 변수, 공개 조회/설정 함수 모두 가지고 있는 경우
        - 새로운 함수와 새로운 자료 구조 모두 추가하기 어려운 구조이기 때문에 피하는 편이 좋음

- 자료 전달 객체 (Data Transfer Object, DTO)
    - 공개 변수만 있고 함수가 없는 class
    - 'Bean' 구조를 일반적으로 가지나 이는 가짜 캡슐화임
        - 'Bean' 구조 : 비공개(private) 변수를 조회/설정 함수로 조작하는 형태
    - DTO의 특수한 형태 : 활성 Record
        - '공개 변수가 있거나 비공개 변수에 조회/설정 함수가 있는 자료 구조'에 save나 find와 같은 탐색 함수도 제공함
            - database table이나 다른 source에서 자료를 직접 변환한 결과
        - 활성 record는 객체가 아니라 자료 구조로 취급함
            - business 규칙 method를 추가해서는 안 됨
            - 객체로 취급하면 잡종 구조가 나오게 됨

- 객체와 자료 구조 중에 선택하기
    - 객체
        - 동작을 공개하고 자료를 숨김
            - 기존 동작을 변경하지 않으면서 새 객체 type을 추가하기 쉬움
            - 기존 객체에 새 동작을 추가하기 어려움
        - 새로운 자료 type을 추가하는 유연성이 필요하면 '객체'를 사용하기
    - 자료 구조
        - 별다른 동작 없이 자료를 노출함
            - 기존 자료 구조에 새 동작을 추가하기 쉬움
            - 기존 함수에 새 자료 구조를 추가하기 어려움
        - 새로운 동작을 추가하는 유연성이 필요하면 '자료 구조 + 절차적인 code'를 사용하기

---

# 오류 처리

- 튼튼하고 깨끗한 code
    - 깨끗한 code는 읽기도 좋아야 하지만 안정성도 높아야 함
        - 두 가지 목표는 상충하는 목표가 아님
    - 오류 처리를 program 논리와 분리해 독자적인 사안으로 고려할 수 있어야 독립적인 추론이 가능해짐 -> 유지보수성의 향상

- 오류 code보다 예외를 사용하기
    - 논리와 오류 처리 code가 섞이지 않도록 해야 함
    - 오류 code 사용
        - 함수를 호출한 즉시 오류를 확인해야 하기 때문에 호출자 code가 복잡해짐
        ```java
        public class DeviceController {

            ...

            public void sendShutDown() {
                DeviceHandle handle = getHandle(DEV1);

                // 디바이스 상태를 점검한다.
                if (handle != DeviceHandle.INVALID) {
                    // 레코드 필드에 디바이스 상태를 저장한다.
                    retrieveDeviceRecord(handle);

                    // 디바이스가 일시정지 상태가 아니라면 종료한다.
                    if (record.getStatus() != DEVICE_SUSPENDED) {
                        closeDevice(handle);
                    } else {
                        logger.log("Device suspended. Unable to shut down");
                    }
                } else {
                    logger.log("Invalid handle");
                }
            }

            ...

        }
        ```
    - 예외 사용
        - 논리를 처리하는 부분과 오류를 처리하는 부분을 분리하기가 쉽기 때문에 독립적으로 읽고 이해할 수 있음
        ```java
        public class DeviceController {

            ...

            public void sendShutDown() {
                try {
                    tryToShutDown();
                }
                catch (DeviceShutDownError e) {
                    logger.log(e);
                }
            }

            private void tryToShutDown() {
                DeviceHandle handle = getHandle(DEV1);
                DeviceRecord record = retrieveDeviceRecord(handle);

                pauseDevice(handle);
                clearDeviceWorkQueue(handle);
                closeDevice(handle);
            }

            private DeviceHandle getHandle(DeviceId id) {
                ...
                throw new DeviceShutDownError("Invalid handle for: " + id.toString());
                ...
            }
            
            ...

        }
        ```

- Try-Catch-Finally 문부터 작성하기
    - 예외가 발생할 code를 짤 때는, try-catch-finnaly 문으로 시작하여 범위를 정의하기
    - try block은 transaction과 비슷함
    - try block에서 무슨 일이 생기든 catch block은 program 상태를 일관성 있게 유지해야 함
    ```java
    void pay() {
        try {
            approval();
            updateLedgerFinish();
            sendFinishTalk();

        } catch (ApprovalFailException e) {

        } catch (UpdateFailException e) {
            /* 승인난 결제 취소하기 */

        } catch (SendFailException) {
            /* 승인난 결제 취소하기 */
            /* 완료 갱신한 원장 되돌리기 */

        } finally {
            /* 관제 메세지 보내기 */
        }
    }

    void approavl() throws ApprovalFailException {
        try {
            /* 승인 요청 보내기 */
        } catch (Exception e) {
            throw new ApprovalFailException();
        }
    }

    void updateLedgerFinish() throws UpdateFailException {
        try {
            /* 원장을 완료 처리하기 */
        } catch (Exception e) {
            throw new UpdateFailException();
        }
    }
    
    void sendFinishTalk() throws SendFailException {
        try {
            /* 결제 완료 알림 보내기 */
        } catch (Exception e) {
            throw new SendFailException();
        }
    }
    ```

- 미확인(unchecked) 예외를 사용하기
    - Checked Exception
        - compile 단계에서 확인
        - 반드시 예외 처리(try-catch or throw)를 해줘야 함
        - ex) FileNotFoundException, ClassNotFoundException, IOException, SQLException
    - Unchecked Exception
        - 실행 단계에서 확인
        - RuntimeException의 하위 class : 실행 중에(runtime) 발생할 수 있는 예외
        - 예외 처리를 강제하지 않음
        - ex) NullPointerException, IllegalArgumentException, ArrayIndexOutOfBoundsException, {Custom}Exception
    - 확인된(checked) 예외는 OCP(Open Closed Principle)를 위반함
        - method에서 확인된 예외를 던졌는데, catch block이 상위 단계에 있다면, 그 사이의 method 모두가 해당 예외를 정의해야 함
        - 하위 단계에서 code를 변경하면, 상위 단계 method 선언부를 전부 고쳐야 함 (연쇄적인 수정)
        - module과 관련된 code가 바뀌지 않았더라도, 선언부가 바뀌었으므로 module을 다시 build하고 배포해야 함
    - 오류를 원거리에서 처리하기 위해 예외를 사용하는데, 모든 함수가 최하위 함수에서 던지는 예외를 알아야 하는 것은 의도에 맞지 않음 (캡슐화가 깨짐)

- 예외에 의미를 제공하기
    - 예외를 던지는 전후 상황이 충분히 설명되어야 함
        - catch block에서 오류 정보, 실패한 연산 이름, 실패 유형 등을 log로 기록하기
    - 오류가 발생한 원인과 위치를 찾기 쉬워짐
        - 오류 발생에 의한 호출 stack만으로 원인을 찾기는 어려움
    - ex) 이상한 인자를 받는 예외 logic에 IllegalArgumentException를 발생시킨다면, 어디서 발생했는지 stacktrace를 봐야만 알 수 있음
        - 이 상황에서 오류 message(exception.message)에 오류 정보, 실패 유형 등을 넣으면 원인을 찾기 쉬움

- 호출자를 고려해 예외 class를 정의하기
    - 감싸기(wrapper) class를 활용하여, 발생할 수 있는 예외 case를 묶으면, 예외 유형에 대한 관리가 쉬워짐
        - "어떤 방식으로 예외를 잡을지"가 exception class를 만드는 데에 가장 중요한 관심사이기 때문
        - ex) '외부 library가 던질 모든 예외를 catch로 구분하여 예외를 처리하기' < '외부 library를 사용하는 class를 wrapper class로 한 번 감싼 뒤 이 class에 대한 예외를 처리하기'
    - 외부 API를 사용할 때는 감싸기 기법이 최선
        - 외부 library와 program 사이에서 의존성이 크게 줄어듬
    - 예외 class가 하나만 있어도 충분한 code가 흔하지만, 한 예외는 잡아내고 다른 예외는 무시해도 괜찮은 경우라면 여러 예외 class를 사용하기
    - Example : ACMEPort class(외부 API class)를 사용하는 상황
        ```java
        // Bad
        // catch 문의 내용이 거의 같음
        ACMEPort port = new ACMEPort(12);
        try {
            port.open();
        } catch (DeviceResponseException e) {
            reportPortError(e);
            logger.log("Device response exception", e);
        } catch (ATM1212UnlockedException e) {
            reportPortError(e);
            logger.log("Unlock exception", e);
        } catch (GMXError e) {
            reportPortError(e);
            logger.log("Device response exception");
        } finally {
            ...
        }


        // Good
        // ACME class를 LocalPort class로 wrapping해 new ACMEPort().open() method에서 던질 수 있는 exception들을 간략화함
        LocalPort port = new LocalPort(12);
        try {
            port.open();
        } catch (PortDeviceFailure e) {
            reportError(e);
            logger.log(e.getMessage(), e);
        } finally {
            ...
        }
        
        public class LocalPort {
            private ACMEPort innerPort;
            public LocalPort(int portNumber) {
            innerPort = new ACMEPort(portNumber);
            }
            
            public void open() {
            try {
                innerPort.open();
            } catch (DeviceResponseException e) {
                throw new PortDeviceFailure(e);
            } catch (ATM1212UnlockedException e) {
                throw new PortDeviceFailure(e);
            } catch (GMXError e) {
                throw new PortDeviceFailure(e);
            }
            }
            ...
        }
        ```

- null을 반환/전달하지 않기
    - null을 반환하면, 호출자에게 문제를 떠넘기는 것이고, 따라서 null check logic도 많아져야 함
    - null 확인 누락의 문제를 논하기 전에 null 확인이 너무 많지는 않은지 봐야 함
    - method에서 null을 반환하는 경우
        - 예외를 던지기
            - 감싸기 method를 구현하여 이용하기
                - ex) NullPointerException을 잡아서 던지기
        - 특수 사례 객체(special case object)를 반환하기
            - list로 넘길 수 있는 경우라면, null이 아닌 빈 list를 반환하기 : Collections.emptyList();
                ```java
                // Bad
                List<Employee> employees = getEmployees();
                if (employees != null) {
                    for(Employee e : employees) {
                        totalPay += e.getPay();
                    }
                }

                // Good
                List<Employee> employees = getEmployees();
                for(Employee e : employees) {
                    totalPay += e.getPay();
                }
                
                public List<Employee> getEmployees() {
                    if( .. there are no employees .. ) {
                        return Collections.emptyList();
                    }
                }
                ```
            - (Java8 이상의 경우) Optional 객체를 통해 구현하기
                ```java
                // Bad
                String s = "String 객체";
                if (s != null) {
                    System.out.println(s);
                }

                // Good
                Optional<String> opt = Optional.ofNullable("Optional 객체");
                if (opt.isPresent()) {
                    System.out.println(opt.get());
                }
                ```
                - null 처리를 위한 Optional의 method
                    - orElse() : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 값을 반환함
                    - orElseGet() : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 Lambda 표현식의 결괏값을 반환함
                    - orElseThrow() : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 예외를 발생시킴
    - 정상적인(null이 의미가 있는) 인수로 null을 기대하는 API라면 null의 반환/전달을 필요에 의해 사용할 수도 있음

---

# Class

- class 체계
    - 표준 java 관례에 따른 class 요소 정의 순서
        - 변수 목록의 순서
            - 정적(static) 공개(public) 상수
            - 정적 비공개(private) 변수
            - 비공개 instance 변수
        - 공개 함수
            - 비공개 함수는 자신을 호출하는 공개 함수 직후에 넣기

- class는 작게 만들기
    - == class가 맡는 책임이 적어야 함
    - class 이름은 해당 class 책임을 기술해야 함
        - 작명은 class 크기에 영향을 줌
        - 이름이 모호하다면 책임이 너무 많기 때문
    - 단일 책임 원칙 (Single Responsibility Principle, SRP)
        - class나 module을 변경할 이유가 하나여야 한다는 원칙
        - class를 정리하는 것은 서랍에 물건을 정리하는 것과 같음
            - 작은 서랍을 많이 두고 기능과 이름이 명확한 component를 나눠 넣기
            - 큰 서랍 몇 개를 두고 모두를 던져 넣기
    - 응집도 (Cohesion)
        - '응집도가 높다' == 'class에 속한 method와 변수가 서로 의존하며 논리적인 단위로 묶인다'
        - 응집도를 높이기 위해
            - class는 instance 변수 수가 작아야 함
            - 각 class method는 class instance 변수를 하나 이상 사용해야 함
                - method가 변수를 더 많이 사용할 수록 method와 class는 응집도가 더 높음
        - class가 응집력을 잃는다면 쪼개기
            - 응집도를 유지하여 작은 class 여럿이 나오게 되는 과정
                - 큰 함수를 작은 함수 여럿으로 나눔
                - 이 때 큰 함수와 작은 함수의 인수가 비슷하다면, 쪼개지면서 응집도가 낮아짐
                - 비슷한 인수들을 사용하는 작은 함수들을 작은 class 여럿으로 묶어내기
            - 이로써 program에 점점 더 체계가 잡히고 구조가 투명해지게 됨

---

# Reference

- Clean Code : 애자일 소프트웨어 장인 정신 - 로버트 C. 마틴
- https://github.com/Yooii-Studios/Clean-Code/blob/master/Chapter%2007%20-%20%EC%97%90%EB%9F%AC%20%ED%95%B8%EB%93%A4%EB%A7%81.md