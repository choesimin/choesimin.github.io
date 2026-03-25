# Lightpanda
- JS rendering이 필요한 SPA page에서 content를 추출하는 headless browser

## 기본 사용법
- markdown dump : `lightpanda fetch --dump markdown "<url>"`
- html dump : `lightpanda fetch --dump html "<url>"`

## 주요 Option
- `--with_frames` : iframe content 포함
- `--with_base` : base URL 포함
- `--obey_robots` : robots.txt 준수
- `--http_proxy <url>` : proxy 설정
- `--http_timeout <ms>` : HTTP timeout (ms 단위)
- `--log_level <level>` : log level 설정

## 사용 시 참고
- URL은 반드시 따옴표로 감싸서 전달
- beta 상태로 Web API 지원 범위가 일부 미완성이므로 defuddle로 먼저 시도할 것
- Playwright 호환 시 version별 동작 차이가 있을 수 있음
- telemetry 비활성화 : `LIGHTPANDA_DISABLE_TELEMETRY=true`
