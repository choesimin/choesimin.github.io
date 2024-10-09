---
layout: skill
title: MySQL - 사용자의 비밀번호 정책 설정하기
date: 2024-10-09
---




## MySQL의 비밀번호 정책을 설정하여 사용자 계정 보안 강화하기

- **MySQL의 `validate_password` plugin**을 사용하여 **계정 보안을 강화**하고, **보안 규정 준수 요구사항을 충족**시킬 수 있습니다.
	- **보안 강화** : 비밀번호의 최소 길이와 복잡성을 설정하여 쉽게 추측할 수 있는 비밀번호 사용을 방지합니다.
	- **자동 검증** : 사용자가 설정한 비밀번호가 정책 기준에 부합하는지 자동으로 검증하여 일관된 보안 수준을 유지합니다.
	- **규정 준수** : 기업 보안 정책이나 규제 요구사항에 맞춰 비밀번호 관리 정책을 쉽게 구현할 수 있습니다.

- 비밀번호 정책을 실제 환경에 적용할 때는 사용자의 편의성과 보안 사이의 균형을 고려해야 합니다.
	- 또한 비밀번호 정책을 강화한 후에는 사용자에게 새로운 비밀번호 생성 규칙을 명확히 안내해야 합니다.


### 1. 비밀번호 검증 Plugin 활성화

- 비밀번호 정책을 적용하려면 먼저 `validate_password` plugin을 활성화해야 합니다.
	- MySQL 8.0 이상 version에서는 기본적으로 `validate_password` plugin이 활성화되어 있습니다.

```sql
INSTALL PLUGIN validate_password SONAME 'validate_password.so';
```

- **`SHOW PLUGINS;` 명령어**를 사용하여 `validate_password` plugin의 활성화 상태를 확인할 수 있습니다.
	- 활성화된 모든 plugin의 목록이 출력되며, 이 중에서 `validate_password`가 있는지 확인합니다.


### 2. 비밀번호 정책 설정

- 비밀번호 정책은 다양한 기준을 설정할 수 있으며, 이를 통해 비밀번호의 복잡성을 제어할 수 있습니다.

```sql
SET GLOBAL validate_password.policy = MEDIUM;
SET GLOBAL validate_password.length = 8;
SET GLOBAL validate_password.mixed_case_count = 1;
SET GLOBAL validate_password.number_count = 1;
SET GLOBAL validate_password.special_char_count = 1;
```

| 변수 | 설명 |
| --- | --- |
| `validate_password.policy` | 비밀번호의 강도 수준을 설정합니다. |
| `validate_password.length` | 비밀번호의 최소 길이를 설정합니다. |
| `validate_password.mixed_case_count` | 대문자와 소문자를 각각 최소 몇 개 포함해야 하는지 설정합니다. |
| `validate_password.number_count` | 비밀번호에 포함해야 하는 숫자의 최소 개수를 설정합니다. |
| `validate_password.special_char_count` | 비밀번호에 포함해야 하는 특수 문자의 최소 개수를 설정합니다. |

- 특히, `validate_password.policy` option에는 `LOW`, `MEDIUM`, `STRONG` 세 가지 수준이 있으며, 비밀번호 강도를 설정합니다.
	- `LOW` : 비밀번호의 길이만 검사합니다.
	- `MEDIUM` : 길이와 함께 대소문자, 숫자, 특수 문자 사용을 요구합니다.
	- `STRONG` : `MEDIUM` 기준에 추가적으로 사전에 포함된 단어 등을 검사합니다.

- `SET GLOBAL`로 추가한 설정은 전역 변수(global variable)로 적용되며, MySQL을 재시작할 때까지 유지됩니다.

- 설정을 영구적으로 적용하려면 MySQL 설정 file(`my.cnf` 또는 `my.ini`)의 `[mysqld]` section 아래에 `validate_password.policy=MEDIUM`, `validate_password.length=8`과 같은 형식으로 여러 설정 값을 줄을 바꾸어 추가합니다.
	- `[mysqld]` section은 MySQL server의 전역 설정을 담당합니다.
	- config file로 설정을 변경한 후에는 MySQL server를 재시작해야 변경 사항이 적용됩니다.

```ini
; MySQL config file
[mysqld]
validate_password.policy=MEDIUM
validate_password.length=8
validate_password.mixed_case_count=1
validate_password.number_count=1
validate_password.special_char_count=1
```


### 3. 비밀번호 만료 설정

- 비밀번호 만료 기간을 설정하여 계정 보안을 장기적으로 강화하고 유지할 수 있습니다.
	- 비밀번호를 일정 기간마다 만료되도록 설정하여, 사용자가 주기적으로 비밀번호를 갱신하도록 합니다.
	- 비밀번호 만료 이후 비밀번호를 변경하지 않은 사용자에게는 MySQL이 접속 시도 시 변경을 요구하기 때문에, 사용자는 만료된 비밀번호를 재설정해야 합니다.

```sql
-- '모든' 사용자의 비밀번호가 90일마다 만료되도록 설정
SET GLOBAL default_password_lifetime = 90;

-- '특정' 사용자의 비밀번호가 90일마다 만료되도록 설정
ALTER USER 'username'@'localhost' PASSWORD EXPIRE INTERVAL 90 DAY;
```

- 영구적으로 적용하려면 MySQL 설정 file(`my.cnf` 또는 `my.ini`)의 `[mysqld]` section 아래에 `default_password_lifetime=90`를 추가합니다.
	- 이렇게 추가하면 MySQL server가 재시작되어도 설정이 유지되며, 설정을 변경한 후에는 MySQL 서버를 재시작해야 변경 사항이 적용됩니다.

```ini
; MySQL configuration file
[mysqld]
default_password_lifetime=90
```

- `SET GLOBAL` 또는 MySQL config file로 설정한 전역 설정은 모든 사용자 계정에 적용되므로, 특정 사용자에게만 다른 만료 기간을 설정하려면 `ALTER USER` 명령을 사용해야 합니다.


### 4. 비밀번호 정책 확인 및 적용 상태 점검

- 현재 설정된 비밀번호 정책을 확인합니다.

```sql
SHOW VARIABLES LIKE 'validate_password%';
```

- 현재 적용된 정책과 설정 값을 확인하고, 필요시 추가적으로 조정합니다.
