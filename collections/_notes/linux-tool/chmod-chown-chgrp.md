---
layout: note
permalink: /368
title: chmod, chown, chgrp - Linux 권한 관리 필수 명령어 3가지
description: Linux system에서 file과 directory의 권한 관리를 위한 핵심 명령어인 `chmod`(접근 권한 설정), `chown`(소유권 변경), `chgrp`(Group 설정)는 system 보안과 안정성을 보장하는 필수적인 도구입니다.
date: 2025-07-31
---


## Linux의 권한 관리

- Linux system에서는 사용자(user)를 3가지 범주(owner, group, others)로 구분하고, 각 file마다 이 3가지 범주에 대해 서로 다른 권한(permission)을 설정할 수 있습니다.


### 사용자 구분 : Owner, Group, Others

- **Owner** (소유자) : 해당 file을 소유한 사용자입니다.
    - file을 생성한 사용자가 기본적으로 소유자가 됩니다.
    - `chown` 명령어로 소유자를 변경할 수 있습니다.

- **Group** (집단) : 해당 file이 속한 group의 member인 사용자들입니다.
    - 여러 사용자가 공동으로 file에 접근해야 할 때 사용합니다.
    - `chown` 또는 `chgrp` 명령어로 group을 변경할 수 있습니다.

- **Others** (기타) : 소유자도 아니고 group member도 아닌 나머지 모든 사용자들입니다.
    - system의 다른 모든 사용자들이 여기에 해당합니다.


### Permission 종류 : Read, Write, Execute

- **Read** (`r`, 4) : file 내용을 읽거나 directory 목록을 볼 수 있는 권한입니다.
- **Write** (`w`, 2) : file 내용을 수정하거나 directory 내에서 file을 생성/삭제할 수 있는 권한입니다.
- **Execute** (`x`, 1) : file을 실행하거나 directory에 접근할 수 있는 권한입니다.


---


## `chmod` : 권한 변경하기

- file과 directory에 대한 읽기, 쓰기, 실행 권한(permission)을 설정하는 명령어입니다.
- Linux system에서 기본적이고 필수적인 권한 관리 명령어로, Linux 사용자라면 반드시 숙지해야 합니다.
- file 권한 문제 해결의 첫 번째 도구이자, system 보안의 기본 요소입니다.


### 기본 사용법

- `chmod [permission] [file_name]` 형태로 사용합니다.
- 권한(permission)은 숫자 방식과 문자 방식으로 표현할 수 있습니다.
- 재귀적으로 적용하려면 `-R` option을 사용합니다.

#### 숫자 방식 권한 설정

- 각 권한을 숫자로 표현하여 조합하는 방식입니다.

| 권한 | 숫자 |
| --- | --- |
| **읽기** (r) | 4 |
| **쓰기** (w) | 2 |
| **실행** (x) | 1 |

- **owner(소유자), group(집단), others(기타) 사용자 순서**로 3자리 숫자를 사용합니다.
    - 각 자리에는 권한을 의미하는 숫자를 더해서 최종 권한 값을 만들어 지정합니다.

| 권한 예시 | 숫자 조합 | 결과 |
| --- | --- | --- |
| **모든 권한** | 4(읽기) + 2(쓰기) + 1(실행) | **7** |
| **읽기와 쓰기만** | 4(읽기) + 2(쓰기) | **6** |
| **읽기와 실행만** | 4(읽기) + 1(실행) | **5** |
| **읽기만** | 4(읽기) | **4** |

- `chmod 755 script.sh` : 소유자는 읽기/쓰기/실행(7), group과 기타는 읽기/실행(5) 권한을 부여합니다.
- `chmod 644 document.txt` : 소유자는 읽기/쓰기(6), group과 기타는 읽기(4) 권한만 부여합니다.

#### 문자 방식 권한 설정

- 대상과 권한을 문자로 표현하는 직관적인 방식입니다.

| 종류 | 문자 |
| --- | --- |
| **대상** | `u`(owner), `g`(group), `o`(others), `a`(all) |
| **연산** | `+`(추가), `-`(제거), `=`(설정) |
| **권한** | `r`(읽기), `w`(쓰기), `x`(실행) |

- `chmod +x file` : 모든 사용자에게 실행 권한 추가.
- `chmod u+w,g-x file` : 소유자(owner)에게 쓰기 권한 추가, group에서 실행 권한 제거.
- `chmod a=r file` : 모든 사용자에게 읽기 권한만 부여.


### `chmod` 전용 Option

- `--preserve-root` : root directory(`/`)에 대한 재귀적 작업을 방지합니다.
    - `chmod -R --preserve-root 755 /` : root directory 전체 권한 변경을 차단하여 system을 보호합니다.
    - system 전체가 망가지는 것을 방지하는 안전 장치입니다.

- `-H`, `-L`, `-P` : symbolic link 처리 방식을 제어합니다.
    - `-H` : command line에서 지정된 symbolic link만 따라갑니다.
    - `-L` : 모든 symbolic link를 따라가서 대상 file의 권한을 변경합니다.
    - `-P` : symbolic link를 따라가지 않습니다.
        - 기본값으로 지정되어 있습니다.


### 실무에서 자주 사용하는 권한 설정

- `chmod 755` : script file이나 directory에 주로 사용하는 표준 권한입니다.
- `chmod 644` : 일반 문서 file에 사용하는 기본 권한입니다.
- `chmod 600` : 민감한 정보가 담긴 file(ssh key, password file 등)에 사용합니다.
- `chmod +x` : file을 실행 가능하게 만들 때 가장 간단한 방법입니다.


---


## `chown` : 소유자 변경하기

- file과 directory의 소유자와 group을 변경하는 명령어입니다.
- web server, database file 권한 설정이나 system 관리 시 필수적으로 사용됩니다.
- 보안상 중요한 명령어로, 보통 root 권한이 필요합니다.


### 기본 사용법

- `chown [user]:[group] [file_name]` 형태로 사용합니다.
- 소유자만 변경하려면 `chown [user] [file_name]`으로 사용합니다.
- group만 변경하려면 `chown :[group] [file_name]`으로 사용합니다.
- 재귀적으로 적용하려면 `-R` option을 사용합니다.


### `chown` 전용 Option

- `--from=current_user:current_group` : 현재 소유권이 지정된 값과 일치할 때만 변경합니다.
    - `chown --from=old_user:old_group new_user:new_group file`와 같이 조건부 소유권 변경으로 안전성을 높일 수 있습니다.
    - 잘못된 file에 소유권 변경이 적용되는 것을 방지할 수 있습니다.

- `-h` (no-dereference) : symbolic link 자체의 소유권을 변경합니다.
    - `chown -h user:group symlink` : link가 가리키는 file이 아닌 link 자체의 소유권을 변경합니다.
    - 일반적으로는 link가 가리키는 대상의 소유권이 변경되지만, 이 option으로 link 자체를 제어할 수 있습니다.

- `--dereference` : symbolic link가 가리키는 대상 file의 소유권을 변경합니다.
    - 명시적으로 기본 동작을 지정할 때 사용합니다.
    - 기본값으로 지정되어 있습니다.


### 실무 활용 예시

- `chown www-data:www-data /var/www/html` : web server file의 소유권을 web server 사용자로 변경합니다.
- `chown mysql:mysql /var/lib/mysql` : database file의 소유권을 database 사용자로 변경합니다.
- `chown -R user:developers /home/user/project` : project directory와 하위 file들의 소유권을 일괄 변경합니다.
- `chown root:root /etc/passwd` : system 중요 file의 소유권을 root로 설정합니다.


### 소유권 변경이 중요한 이유

- web application 배포 시 web server가 file에 접근할 수 있도록 소유권을 맞춰야 합니다.
- backup file이나 log file의 소유권을 적절히 설정해야 보안을 유지할 수 있습니다.
- container 환경에서 volume mount 시 소유권 문제로 인한 오류를 방지할 수 있습니다.


---


## `chgrp` : Group 변경하기

- file과 directory의 group 소유권만 변경하는 명령어입니다.
- `chown`의 group 변경 기능과 동일하지만, group만 변경할 때 더 명확한 의도를 표현합니다.
- team 단위로 작업할 때 file 공유 권한을 설정하는 데 유용합니다.


### 기본 사용법

- `chgrp [group_name] [file_name]` 형태로 사용합니다.
    - `chown :[group_name] [file_name]`과 동일합니다.
- 재귀적으로 적용하려면 `-R` option을 사용합니다.


### `chgrp` 전용 Option

- `--dereference` : symbolic link가 가리키는 대상 file의 group을 변경합니다.
    - `chgrp --dereference developers symlink` : link가 가리키는 file의 group을 변경합니다.
    - 기본값으로 지정되어 있습니다.

- `-h` (no-dereference) : symbolic link 자체의 group을 변경합니다.
    - `chgrp -h developers symlink` : link 자체의 group을 변경합니다.
    - `chown`과 동일한 방식으로 symbolic link를 처리합니다.


### 실무 활용 예시

- `chgrp developers /home/shared/project` : project directory를 개발팀 group으로 설정합니다.
- `chgrp www-data /var/log/nginx` : web server log directory를 web server group으로 변경합니다.
- `chgrp -R staff /home/department` : 부서 공유 directory의 group을 일괄 변경합니다.


### `chown`과의 비교

- `chgrp developers file`과 `chown :developers file`은 동일한 결과를 만듭니다.
- group만 변경할 때는 `chgrp`가 의도를 더 명확하게 표현합니다.
- 소유자와 group을 함께 변경할 때는 `chown user:group file` 형태가 더 효율적입니다.


---


## `chmod`, `chown`, `chgrp`의 공통 Option

- 작업의 효율성과 안전성을 높일 수 있는 세 명령어 모두에서 사용할 수 있는 option들이 있습니다.
- 실무에서 권한 관리 작업 시 자주 활용되는 필수 option들입니다.


### 재귀적 적용 Option

- `-R` (recursive) : directory와 그 하위의 모든 file, directory에 동일한 설정을 일괄 적용합니다.
    - `chmod -R 755 /var/www` : web directory 전체에 755 권한을 일괄 적용합니다.
    - `chown -R www-data:www-data /var/www` : web directory 전체의 소유권을 web server 사용자로 변경합니다.
    - `chgrp -R developers /home/shared` : shared directory와 하위 모든 요소를 developers group으로 변경합니다.


### 출력 제어 Option

- `-v` (verbose) : 작업이 수행될 때마다 상세한 정보를 출력합니다.
    - `chmod -v 644 *.txt` : 각 file의 권한 변경 과정을 상세히 보여줍니다.
    - `chown -v user:group file` : 소유권 변경 과정을 확인할 수 있습니다.

- `-c` (changes) : 실제로 변경이 일어날 때만 출력합니다.
    - `chmod -c 755 script.sh` : 권한이 실제로 변경될 때만 알려줍니다.
    - 이미 올바른 권한으로 설정된 file은 출력하지 않아 불필요한 message를 줄입니다.

- `-f` (silent/quiet) : error message를 억제하고 조용히 실행합니다.
    - `chmod -f 644 nonexistent_file` : file이 존재하지 않아도 오류 message를 출력하지 않습니다.
    - script에서 권한 설정 시 오류로 인한 중단을 방지할 때 유용합니다.


### 참조 기반 설정 Option

- `--reference=fila_name` : 다른 file의 권한이나 소유권을 참조하여 동일하게 설정합니다.
    - `chmod --reference=template.txt *.txt` : template.txt와 같은 권한으로 모든 txt file을 설정합니다.
    - `chown --reference=source.file target.file` : source.file과 같은 소유권으로 설정합니다.
    - 표준 template file을 기준으로 일관된 권한을 적용할 때 유용합니다.


---


## 권한 관리 핵심 원칙

- 권한 설정은 **최소 권한 원칙**을 따라 필요한 권한만 부여합니다.
- script file은 `chmod 755`, 일반 문서는 `chmod 644`를 기본으로 사용합니다.
- 민감한 정보가 포함된 file은 `chmod 600`으로 소유자만 접근 가능하게 설정합니다.
- web application 배포 시 `chown www-data:www-data`로 web server가 접근할 수 있게 설정합니다.


### 권한 확인 방법

- `ls -l` 명령어로 현재 권한 상태를 확인할 수 있습니다.
- `ls -la` 명령어로 숨김 file까지 포함하여 권한을 확인합니다.
- `stat file_name` 명령어로 더 상세한 권한 정보를 확인할 수 있습니다.


### 권한 설정 시 주의 사항

- system 중요 file의 권한을 함부로 변경하면 system이 동작하지 않을 수 있습니다.
- directory의 실행 권한(`x`)이 없으면 해당 directory에 접근할 수 없습니다.
- 권한 변경 전에는 반드시 현재 권한 상태를 확인하고 backup을 고려해야 합니다.


---


## Reference

- <https://linux.die.net/man/1/chmod>
- <https://linux.die.net/man/1/chown>
- <https://linux.die.net/man/1/chgrp>

