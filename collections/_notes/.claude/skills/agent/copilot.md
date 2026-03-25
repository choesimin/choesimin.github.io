# Copilot CLI
- Copilot CLI의 호출 규칙과 session resume 방법

## 호출 규칙
- non-interactive mode로 실행 : `copilot -p "<prompt>"`
- `--add-dir <project_path>`로 작업 대상 project 경로를 추가 지정함
- 작업 복잡도에 따라 `--effort <level>` option으로 조절
    - 단순 작업 (간단한 수정, 짧은 분석) : `medium`
    - 일반 작업 (기능 구현, bug 수정) : `high` (default)
    - 복잡한 작업 (architecture 설계, 대규모 refactoring) : `xhigh`
- 작업 유형에 따라 권한을 세분화하여 제어
    - read-only 작업 (분석, bug 원인 파악) : `--allow-tool='read'`
    - write 작업 (code 수정/구현, refactoring) : `--allow-all`
    - 특정 명령만 허용 : `--allow-tool='shell(git:*)'`
    - 특정 명령 차단 : `--deny-tool='shell(rm:*)'`
- model을 지정할 경우 `--model <model>` option 사용
- 출력만 필요한 경우 `-s` (silent) option으로 통계 없이 결과만 수신

## Session Resume
- 첫 호출 후 session ID를 기억하고, 이후 같은 project 작업은 `copilot --resume=<session_id> -p "<prompt>"`로 이어서 실행
