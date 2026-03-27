# Gemini CLI
- Gemini CLI의 호출 규칙과 session resume 방법

## 호출 규칙
- non-interactive mode로 실행 : `gemini -p "<prompt>"`
- `--include-directories <project_path>`로 작업 대상 project 경로를 추가 지정함
- 작업 유형에 따라 `--approval-mode <mode>`로 권한을 제어함
    - read-only 작업 (분석, bug 원인 파악) : `--approval-mode plan`
    - write 작업 (code 수정/구현, refactoring) : `--approval-mode yolo`
    - edit만 자동 승인 (신중한 write 작업) : `--approval-mode auto_edit`
- model을 지정할 경우 `-m <model>` option 사용
- 출력 format을 지정할 경우 `-o text` option 사용

## Session Resume
- 첫 호출 후 session을 기억하고, 이후 같은 project 작업은 `gemini --resume latest -p "<prompt>"`로 이어서 실행
- 특정 session을 resume할 경우 `--list-sessions`로 목록 확인 후 index 지정
