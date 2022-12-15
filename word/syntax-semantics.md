# Syntax & Semantics

## Syntax : 구문론

- 문장이 구성되는 방식
- 프로그램의 구문(구조)
    - 어떤 형태로 작성해야 하는지
    - 구문 : program을 작성하는 규칙, token을 모아 program램 작성
    - 문자 : 영어 알파벳, 아라비아 숫자, 특수 기호 등
    - 어휘(token) : 문자의 모임 (최소한의 의미를 갖는 단어)



## Semantics : 의미론

- 문장이 나타내는 의미
- 프로그램의 의미 : program을 통해 발생하는 현상
    - 어떤 일이 일어나는지

---

# Syntax Error & Semantics Error

-  Syntax Error
    - 문법적인 오류
        - ex) `;`이 와야하는 곳에 `:`을 적은 경우
    - 개발 tool에서 주로 빨간 밑줄이 뜨면서, 자동적으로 잡아주는 종류의 오류
    - 구문 오류가 존재하면 program이 정상적으로 compile되지 않음
    - 사전적 의미 : 구문 오류
        ```
        computer 과학 분야에서 구문 오류 또는 syntax error는 특정한 programming 언어에서 쓰이도록 고안된 일련의 문자열이나 문자 block의 구문 속의 오류를 가리킨다. compile하는 동안 구문 오류가 일어나면 source code가 성공적으로 compile할 수 있게 code를 고쳐야 한다.
        ```

- Semantics Error
    - program logic 상의 논리적인 오류
        - 문법적 오류가 아니며 compile에 영향도 주지 않음
    - 예시
        - 1000원을 입금하면 게임 한 판이 실행되게 하고, 잔돈 500원을 돌려주는 program (1000-500=500)
        - 개발자가 logic을 잘못 작성 : minus 부호를 plus 부호로 coding (1000+500=1500) 
        - 1000원 입금 시, 게임 한 판을 시켜주고 1500원을 잔돈으로 주는 게임기가 되어버림
    - 사전적 의미 : 논리 오류
        ```
        computer programming에서, 논리 오류는 program이 부정확하게 동작하게 하지만 비정상적으로 종료 또는 충돌시키지는 않는 bug이다. 논리 오류는 비록 즉시 인식되지는 않지만 의도치 않은 또는 바라지 않은 결과나 다른 행동을 유발한다.
        ```

--- 

# Reference

- https://forgottenknowledge.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%96%B8%EC%96%B4%EB%A1%A0-%EA%B0%95%EC%9D%98-4%ED%99%94-%EA%B5%AC%EB%AC%B8%EB%A1%A0%EA%B3%BC-%EC%9D%98%EB%AF%B8%EB%A1%A0
    - 구문론 & 의미론
- https://sim7688.tistory.com/51
    - Syntax Error & Semantics Error