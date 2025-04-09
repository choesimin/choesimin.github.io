---
layout: note
---

# Java Bean Validation

```java
public class UserLoginRequestDto {
    @NotNull(message = "이름은 Null 일 수 없습니다!")
    @Size(min = 1, max = 10, message = "이름은 1 ~ 10자 이여야 합니다!") 
    private String name;

    @NotNull(message = "이름은 Null 일 수 없습니다!")
    @Min(1)
    @Max(10)
    @Email
    private String email;
}
```
- @NotNull, @NotEmpry, @NotBlank Annotation은 Bean Validation에서 제공하는 표준 Validation
- 다른 속성 및 기능 확인
    - https://beanvalidation.org/2.0/spec/
- 보통 DTO에서 validation 함
    - 각 API 의 request 와 response 에 맞추기 위해 domain이 수정 되어서는 안 됨
    - 따라서 각 DTO 에 필요한 data만 정의되어야하며, '필수 값에 대한 조건 check', 'DTO -> Domain 변환', 'Domain -> DTO 변환' 등의 logic은 Domain이 아닌 DTO에 담겨야 함
    - @NotNull 과 같은 data validation도 DTO의 역할 이기 때문에 DTO에 넣어주게 되면 역할과 책임이 좀 더 명백해짐

## @NotNull

- null만 허용하지 않음
- ""이나 " "은 혀용
- null이 들어오게 되면, logic에 예상치 못한 오류가 발생하거나 문제가 생길 경우 사용

## @NotEmpty

- null과 "" 둘 다 허용하지 않음
- @NotNull에서 "" validation이 추가된 것
- " "은 허용

## @NotBlank

- null, "", " " 모두 허용하지 않음
- @NotEmpty에서 " " validation이 추가된 것
- validation 강도가 가장 높음

## Controller 설정

```java
@PostMapping("/login")
public ResponseEntity login(@Valid @RequestBody UserLoginRequestDto loginUser) {    
    UserLoginResponseDto login = userService.login(loginUser);
    return new ResponseEntity<>(new BaseResult.Normal(login), HttpStatus.OK);
}
```

## validation 예외를 처리하는 방법

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public Object handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    String errorMessage = e.getBindingResult()
    .getAllErrors()
    .get(0)
    .getDefaultMessage();

    printExceptionMessage(errorMessage);
    return new ResponseEntity<>(new BaseResult.Normal(INVALID_PARAMETER), HttpStatus.BAD_REQUEST);
}
```

---

## Reference

- https://sanghye.tistory.com/36
