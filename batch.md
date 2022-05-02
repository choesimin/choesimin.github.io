# Batch Processing : 일괄 처리

1. 대량건의 data를 처리함
2. 특정 시간에 실행됨
3. 일괄적으로 처리함
- 특정 시간에 program 실행하여 대량의 data를 일괄적으로 처리
- 최종 사용자의 개입 없이 또는 (자원이 허가한다면) 실행을 scheduling할 수 있는 작업(job)의 실행을 의미
- 업무의 효율성과 비효율적인 system의 과부하를 줄이기 위해 사용

## 필수 요소

- 대용량 data
    - 대용량 data를 처리할 수 있어야 함
- 자동화
    - 심각한 오류 상황 외에는 사용자의 개입 없이 동작해야 함
- 견고함
    - 유효하지 않은 data도 처리해서 비정상적인 동작 중단이 발생하지 않아야 함
- 안전성
    - 어떤 문제가 생겼는지, 언제 발생했는지 등을 추적할 수 있어야 함
- 성능
    - 주어진 시간 내에 처리를 완료할 수 있어야 하고, 동시에 동작하고 있는 다른 application을 방해하지 말아야 함

---

# References

- https://hyeonukdev.github.io/2020/05/10/Engineer_Information_Processing/ch15_서버프로그램구현/배치프로그램구현/배치프로그램/
- https://limkydev.tistory.com/140
    - 정의와 예시
