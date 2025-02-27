---
layout: skill
title: gzip, gunzip - File을 압축하고 해제하기
date: 2023-08-23
---


## `gzip` : 압축하기

- 단일 file/stream 무손실 data 압축 utility입니다.
- 압축이 완료된 file의 접미사는 `.gz`입니다. 


### `gzip` 사용법

```sh
gzip [option] [file_name]
```

| Option | 설명 |
| --- | --- |
|  | option이 없으면 압축합니다. |
| -[number] | 1부터 9까지의 숫자입니다. 1이 가장 빠르고 압축률이 가장 낮습니다. |
| -c | 압축 결과를 출력하고 원본 file은 그대로 둡니다. |
| -d | 압축을 해제합니다. |
| -f | 강제로 압축합니다. |
| -l | 압축 file의 정보를 출력합니다. |
| -r | directory를 지정하여, directory에 포함된 모든 file 압축합니다. |
| -t | 압축 file test를 진행합니다. |
| -v | 압축 혹은 해제 시, 자세한 정보 출력합니다. |
| -h | 도움말을 출력합니다. |
| -V | version을 출력합니다. |


### Example : 압축하기

```sh
gzip [file_name]
gzip -9v [file_name]    # 가장 높은 압축률로 정보를 출력하며 압축합니다.
```


---


## `gunzip` : 압축 해제하기

- `gunzip` 명령어를 사용하여 `gzip`으로 압축한 file(`.gz`)을 해제할 수 있습니다.
    - 또는 `gzip` 명령어에 `-d` option을 주어 압축을 해제할 수도 있습니다.


### `gunzip` 사용법

```sh
gzip [option] [file_name]
```


### Example : 압축 해제하기

```sh
gunzip [gz_file_name]
gzip -d [gz_file_name]
```


---


## 여러 개의 `.gz` file에서 특정 단어를 검색하기

- `gzip` 명령어와 `grep` 명령어를 함께 사용하거나, `zgrep` 명령어를 사용하여 압축된 file 내의 문자열을 검색할 수 있습니다.
    - `gzip -c`는 `zcat`과 동일하게 동작합니다.
    - `zgrep` 명령어는 압축 file에 대한 `grep` 명령어입니다.

```sh
gzip -cv **[common_file_name_string]**.gz | grep [search_keyword]
zgrep [search_keyword] *[common_file_name_string]*.gz
```

- 검색 문자열에 띄어쓰기가 포함되어 있다면, 문자열을 쌍따옴표(`"`)로 감쌉니다.


---


## 헷갈리기 쉬운 `gzip`과 `tar`의 차이

- `gzip` : 여러 file들을 하나로 모으되 압축은 하지 않습니다.
- `tar` : file들을 모을 수는 없지만 압축할 수 있습니다.

| 기능 | `tar` | `gzip` |
| --- | --- | --- |
| file들 하나로 모으기 | O | X |
| 압축하기 | X | O |

- 따라서 여러 file을 압축할 때는 `tar`와 `gzip`을 모두 사용해야 합니다.
    1. `tar`로 여러 file 하나로 묶습니다.
    2. `gzip`으로 tar file을 압축합니다.

- `tar`의 option에서 `gzip` 실행 여부를 지정할 수 있기 때문에, `gzip`이 단독으로 쓰일 경우는 많지 않습니다.


---


## Reference

- <https://www.gzip.org>
- <https://steven-life-1991.tistory.com/9>


