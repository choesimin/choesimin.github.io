# Codex CLI
- Codex CLI의 호출 규칙과 session resume 방법

## 호출 규칙
- `codex exec -C <project_path> --full-auto -m gpt-5.4 "<prompt>"`로 실행함
- `-C <project_path>`는 작업 대상 project 경로를 지정함 -> worknote는 command center이므로 지정하지 않음
- 작업 복잡도에 따라 `-c reasoning_effort=<level>` option으로 조절
    - 단순 작업 (간단한 수정, 짧은 분석) : `medium`
    - 일반 작업 (기능 구현, bug 수정) : `high` (default)
    - 복잡한 작업 (architecture 설계, 대규모 refactoring) : `xhigh`
- 작업 유형에 따라 `-s` option으로 file 접근 권한을 제어
    - read-only 작업 (분석, bug 원인 파악) : `-s read-only`
    - write 작업 (code 수정/구현, refactoring) : `-s workspace-write` (default with `--full-auto`)

## Session Resume
- 첫 호출 시 출력 header의 `session id:` line에서 ID를 추출하여 기억함
- 이후 같은 project 작업은 `codex exec resume <session_id> "<prompt>"`로 이어서 실행
