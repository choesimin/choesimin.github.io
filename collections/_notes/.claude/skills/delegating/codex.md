# Codex CLI
- Codex CLI의 호출 규칙과 session resume 방법

## 호출 규칙
- `codex exec -C <project_path> --full-auto "<prompt>"`로 실행함
- `-C <project_path>`는 반드시 작업 대상 project의 절대 경로를 지정함
    - 누락 시 Codex가 workdir를 잘못 추론하여 file 경로 오류와 재시도가 발생함
    - worknote 자체가 대상인 경우에만 생략 가능
- 작업 유형에 따라 `-s` option으로 file 접근 권한을 반드시 명시함
    - 분석, 조사, bug 원인 파악 등 read-only 작업 : `-s read-only`
    - code 수정, 구현, refactoring 등 write 작업 : `-s workspace-write` (default with `--full-auto`)
    - read-only 작업에 write 권한을 부여하면 불필요한 file 접근 시도로 재시도가 발생할 수 있음
- 작업 복잡도에 따라 `-c reasoning_effort=<level>` option으로 조절
    - 단순 작업 (간단한 수정, 짧은 분석) : `medium`
    - 일반 작업 (기능 구현, bug 수정) : `high` (default)
    - 복잡한 작업 (architecture 설계, 대규모 refactoring) : `xhigh`

## Session Resume
- 첫 호출 시 출력 header의 `session id:` line에서 ID를 추출하여 기억함
- 이후 같은 project 작업은 `codex exec resume <session_id> "<prompt>"`로 이어서 실행
