---
layout: note
permalink: /423
title: Spring Bean Validation - Annotation 기반 객체 값 검증
description: Bean Validation은 annotation 기반으로 객체의 field 값을 검증하는 Java 표준 spec이며, Spring에서는 `@Valid`와 함께 DTO에서 요청 data를 검증하는 데 사용됩니다.
date: 2026-04-07
---


## Bean Validation

- Bean Validation은 Java 표준 spec(JSR 380)으로, **annotation을 사용하여 객체의 field 값을 선언적으로 검증**합니다.
    - `jakarta.validation` package에 정의된 annotation을 field에 붙이면, framework가 자동으로 값을 검증합니다.
    - Hibernate Validator가 가장 널리 사용되는 구현체입니다.

- 보통 **DTO에서 validation을 수행**합니다.
    - 각 API의 request와 response에 맞추기 위해 domain이 수정되어서는 안 됩니다.
    - 필수 값 검사, DTO에서 domain으로의 변환 등의 logic은 domain이 아닌 DTO의 책임입니다.
    - `@NotNull` 같은 data validation도 DTO에 넣으면 역할과 책임이 명확해집니다.

```java
public class UserLoginRequestDto {
    @NotNull(message = "이름은 Null일 수 없습니다.")
    @Size(min = 1, max = 10, message = "이름은 1 ~ 10자여야 합니다.")
    private String name;

    @NotNull(message = "email은 Null일 수 없습니다.")
    @Email
    private String email;
}
```


---


## 주요 Annotation

- Bean Validation은 null, 빈 문자열, 공백 문자열을 구분하는 세 가지 annotation을 제공합니다.


### `@NotNull`

- `null`만 허용하지 않습니다.
    - `""`(빈 문자열)이나 `" "`(공백 문자열)은 통과합니다.
    - `null`이 들어오면 logic에 예상치 못한 오류가 발생하는 경우에 사용합니다.


### `@NotEmpty`

- `null`과 `""`(빈 문자열) 둘 다 허용하지 않습니다.
    - `@NotNull`에 빈 문자열 검사가 추가된 것입니다.
    - `" "`(공백 문자열)은 통과합니다.


### `@NotBlank`

- `null`, `""`, `" "` 모두 허용하지 않습니다.
    - `@NotEmpty`에 공백 문자열 검사가 추가된 것입니다.
    - 세 annotation 중 validation 강도가 가장 높습니다.

| annotation | `null` | `""` | `" "` |
| --- | --- | --- | --- |
| `@NotNull` | 거부 | 허용 | 허용 |
| `@NotEmpty` | 거부 | 거부 | 허용 |
| `@NotBlank` | 거부 | 거부 | 거부 |


### 기타 Annotation

- Bean Validation은 다양한 type에 맞는 검증 annotation을 제공합니다.

| annotation | 설명 |
| --- | --- |
| `@Size(min, max)` | 문자열 길이 또는 collection 크기 제한 |
| `@Min(value)` | 숫자 최솟값 |
| `@Max(value)` | 숫자 최댓값 |
| `@Email` | email 형식 검증 |
| `@Pattern(regexp)` | 정규 표현식 검증 |
| `@Positive` | 양수만 허용 |
| `@PositiveOrZero` | 0 또는 양수 허용 |
| `@Past` | 과거 날짜만 허용 |
| `@Future` | 미래 날짜만 허용 |


---


## Spring에서의 사용

- Spring MVC에서는 `@Valid` annotation을 controller parameter에 붙여 자동 검증을 수행합니다.


### Controller 설정

- `@Valid`를 `@RequestBody` 앞에 붙이면, request body를 DTO로 변환한 후 자동으로 validation을 수행합니다.
    - validation에 실패하면 `MethodArgumentNotValidException`이 발생합니다.

```java
@PostMapping("/login")
public ResponseEntity<BaseResult> login(@Valid @RequestBody UserLoginRequestDto loginUser) {
    UserLoginResponseDto login = userService.login(loginUser);
    return new ResponseEntity<>(new BaseResult.Normal(login), HttpStatus.OK);
}
```


### `@Validated`

- Spring이 제공하는 annotation으로, `@Valid`와 달리 group 기반 검증을 지원합니다.
    - 같은 DTO를 여러 API에서 사용하되, API마다 다른 검증 규칙을 적용할 때 유용합니다.

```java
public class UserDto {
    public interface Create {}
    public interface Update {}

    @NotNull(groups = {Create.class, Update.class})
    private String name;

    @NotNull(groups = Create.class)
    private String password;
}
```

```java
@PostMapping("/users")
public ResponseEntity<User> create(@Validated(UserDto.Create.class) @RequestBody UserDto dto) {
    return ResponseEntity.ok(userService.create(dto));
}

@PutMapping("/users/{id}")
public ResponseEntity<User> update(@Validated(UserDto.Update.class) @RequestBody UserDto dto) {
    return ResponseEntity.ok(userService.update(dto));
}
```


---


## 예외 처리

- validation 실패 시 발생하는 `MethodArgumentNotValidException`을 `@ExceptionHandler`로 처리합니다.

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<BaseResult> handleMethodArgumentNotValidException(
        MethodArgumentNotValidException e) {
    String errorMessage = e.getBindingResult()
            .getAllErrors()
            .get(0)
            .getDefaultMessage();

    return new ResponseEntity<>(
            new BaseResult.Normal(INVALID_PARAMETER),
            HttpStatus.BAD_REQUEST);
}
```

- `BindingResult`를 controller parameter로 받으면, exception을 발생시키지 않고 직접 error를 처리합니다.

```java
@PostMapping("/login")
public ResponseEntity<BaseResult> login(
        @Valid @RequestBody UserLoginRequestDto loginUser,
        BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
        String errorMessage = bindingResult.getAllErrors()
                .get(0).getDefaultMessage();
        return ResponseEntity.badRequest()
                .body(new BaseResult.Normal(errorMessage));
    }
    return ResponseEntity.ok(new BaseResult.Normal(userService.login(loginUser)));
}
```


---


## Custom Validation

- 기본 annotation으로 표현할 수 없는 검증 logic은 custom annotation과 `ConstraintValidator`로 구현합니다.

```java
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
public @interface PhoneNumber {
    String message() default "올바른 전화번호 형식이 아닙니다.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

```java
public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        return value.matches("^010-\\d{4}-\\d{4}$");
    }
}
```

```java
public class UserDto {
    @PhoneNumber
    private String phone;
}
```


---


## Reference

- <https://beanvalidation.org/2.0/spec/>
- <https://docs.spring.io/spring-framework/reference/core/validation/beanvalidation.html>

