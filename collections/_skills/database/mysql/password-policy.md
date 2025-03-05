---
layout: skill
permalink: /34
title: MySQL - 사용자의 비밀번호 정책 설정하기
description: MySQL의 validate_password plugin을 사용하여 사용자 계정의 비밀번호 정책을 설정하여 보안을 강화할 수 있습니다.
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
| 