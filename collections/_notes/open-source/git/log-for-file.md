---
layout: note
permalink: /335
title: Git log를 특정 file에 대해서만 확인하는 방법
description: Git log 명령어 뒤에 file path를 추가하여, 특정 file의 변경 이력만을 확인할 수 있습니다.
date: 2025-06-17
---


## 특정 File의 변경 이력 확인하기

- Git에서는 `git log` command에 file path를 추가하여 특정 file의 변경 이력만 확인할 수 있습니다.
    - 전체 repository의 복잡한 commit history에서 특정 file과 관련된 변경 사항만 추적할 수 있어 효율적입니다.

- 가장 기본적인 방법은 `git log` 뒤에 file path를 추가하는 것입니다.

```bash
git log filename
git log path/to/filename
```

- 여러 file을 동시에 확인하려면 file path를 공백으로 구분하여 나열합니다.

```bash
git log file1.txt file2.txt
git log src/main.js src/utils.js
```


---


## 유용한 Option

-  `git log` command에 다양한 option을 추가하여 출력 형식을 조정할 수 있습니다.


### 간단한 형태로 보기

- `--oneline` option을 사용하면 각 commit을 한 줄로 요약하여 보여줍니다.

```bash
git log --oneline filename
```


### 변경된 내용까지 함께 보기

- `-p` 또는 `--patch` option을 사용하면 각 commit에서 해당 file의 실제 변경 내용(diff)을 함께 보여줍니다.

```bash
git log -p filename
git log --patch filename
```


### 통계 정보와 함께 보기

- `--stat` option을 사용하면 각 commit에서 변경된 line 수 통계를 함께 보여줍니다.

```bash
git log --stat filename
```


### Commit 개수 제한하기

- `-n` option을 사용하여 최근 n개의 commit만 확인할 수 있습니다.

```bash
git log -5 filename
git log --oneline -10 filename
```


---


## File 추적 관련 고급 기능

-  `git log` command에 추가적인 option을 사용하여 file의 변경 이력을 더 효과적으로 추적할 수 있습니다.


### File 이름 변경 추적

- `--follow` option을 사용하면 file 이름이 변경되었더라도 변경 이력을 추적할 수 있습니다.

```bash
git log --follow filename
```


### 삭제된 File의 이력 확인

- 현재 존재하지 않는 file의 이력을 확인하려면 `--all` option과 함께 사용합니다.

```bash
git log --all -- deleted_filename
```


### Directory 단위로 확인

- 특정 directory 내 모든 file의 변경 이력을 확인할 수 있습니다.

```bash
git log src/
git log --oneline src/components/
```

### File Pattern 사용

- wildcard를 사용하여 pattern에 맞는 file들의 이력을 확인할 수 있습니다.

```bash
git log "*.js"
git log "src/*.py"
```


---


## Option 조합 예시

-  여러 option을 조합하여 원하는 형태로 출력할 수 있습니다.


### 최근 변경 이력을 간단히 확인

```bash
git log --oneline -10 --follow filename
```


### 특정 File의 상세한 변경 내용 확인

```bash
git log -p --follow filename
```


### 여러 File의 최근 변경 이력을 통계와 함께 확인

```bash
git log --stat --oneline -5 file1.txt file2.txt
```
