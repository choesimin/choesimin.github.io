# git

- 3가지 상태
  1. Committed : data가 local dataabase에 안전하게 저장한 상태
  2. Modified : 수정한 file을 아직 local database에 commit하지 않은 상태
  3. Staged : 현재 수정한 파일을 곹 commit할 것이라고 표시한 상태

- Working Directory files
  - Tracked files (관리대상임) : 이미 snapshot에 포함되어 있던 file
    - Unmodified files (수정하지 않음)
      - 처음 저장소를 clone하면 모든 file이 이 상태임
        - file을 checkout하고 나서 아무것도 수정하지 않았기 때문
    - Modified files (수정함)
      - 마지막 commit 이후, 아무것도 수정하지 않은 상태에서 어떤 file을 수정하면 Git은 그 file을 Modified 상태로 인식
    - Staged files (commit으로 저장소에 기록할 상태) : Git이 알고 있는 file
  - Untracked files (관리대상이 아님)
    - 나머지 file 모두
    - Working Directory에 있는 file 중 snapshot에도 Staging Area에도 포함되지 않은 file
    - 새로운 file을 만들면 Untracked files에 들어감

---

# git init

- .git이라는 하위 Directory를 만듬
- 저장소에 필요한 뼈대(skeleton) file이 들어있음

---

# git add

- file 추가
- 상태 : Modified -> Staged

---

# git commit

- file commit
- 상태 : Staged -> Committed
- Git은 Staging Area에 속한 snapshot을 commit함
  - Staging Area에 넣지 않은 것은 다음에 commit할 수 있음
  - 나중에 snapshot끼리 비교하거나 예전 snapshot으로 되돌릴 수 있음

## -v

- 편집기에 diff message도 추가됨

## -a

- Trackd 상태의 file을 자동으로 Staging Area에 넣음
  - git add 하지 않아도 됨

---

# git clone

- server에 있는 모든 data를 복사
- project history를 전부 받아옴

---

# git status

- file의 상태 확인

## -s

- == --short
- 상태를 간략하게 보여줌

---

# git diff

- 수정했지만 아직 Unstaged 상태인 file을 비교해볼 수 있음
  - Working Directory에 있는 것과 Staging Area에 있는 것을 비교

## --staged

- == git diff --cached
- Staging Area에 넣은(Staged) file의 변경 부분 보기
  - 저장소에 commit한 것과 Staging Area에 있는 것을 비교

---

# git rm

- Tracked 상태의 file을 Staging Area에서 삭제
- 차이
  - Working Directory에서 file을 삭제 -> Unstaged 상태
  - 'git rm'으로 삭제한 file -> Stated 상태

## -f

- 이미 file을 수정했거나 Staging Area에 추가했을 때 강제로 삭제
- 실수로 data를 삭제하지 못하도록 하는 안전장치
  - commit하지 않고 수정한 data는 Git으로 복구할 수 없기 때문

## --cached

- Staging Area에서만 제거하고 Working Directory에 있는 file은 지우지 않고 남겨두기
- hard disk에 있는 file은 그대로 두고 Git만 추적하지 않게 함

---

# git mv

- file 이름 변경
- 아래 명령어를 수행한 것과 같음
  ```sh
  mv README.md README
  git rm README.md
  git add README
  ```
- 일종의 단축 명령어

---

# git log

- commit history 조회
- 아래 정리된 것을 포함해 다양한 option이 존재

## -p

- == -petch
- 각 commit의 diff 결과를 보여줌

## -2

- 최근 두 개의 결과만 보여줌

## --stat

- 각 commit의 통계 정보 조회
  - 어떤 file이 수정되었는지
  - 얼마나 많은 file이 변경되었는지
  - 얼마나 많은 line을 추가하거나 삭제했는지
- 요약 정보는 가장 뒤 쪽에 보여줌

## --pretty

- history 내용을 조회의 기본 형식 이외의 여러가지 중 하나 선택
- --pretty=oneline
  - 한 commit을 한 줄로 표시
  - 많은 수의 commit을 볼 때 유용
- oneline처럼 --pretty에 적용할 수 있는 다양한 option이 있음

## --since or --until

- 특정 기간 동안 만들어진 commit들만 조회

## --grep

- commit message에서 keyword를 검색

## -S

- code에서 추가되거나 제거된 내용 중에 특정 text가 포함되어 있는지 검색

---

# Reference

- https://git-scm.com/book/ko/v2
  - pro git 2nd edition (2014)
