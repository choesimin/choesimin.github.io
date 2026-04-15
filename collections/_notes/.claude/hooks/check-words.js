#!/usr/bin/env node

const input = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
const filePath = input.tool_input.file_path || '';

if (!filePath.endsWith('.md')) process.exit(0);

const content = input.tool_input.content || input.tool_input.new_string || '';

if (!content) process.exit(0);

const replacements = {
  '키보드': 'keyboard',
  '세션': 'session',
  '토큰': 'token',
  '렌더링': 'rendering',
  '버퍼': 'buffer',
  '핸들러': 'handler',
  '스택': 'stack',
  '쿼리': 'query',
  '인덱스': 'index',
  '이벤트': 'event',
  '모니터링': 'monitoring',
  '폴더': 'folder',
  '디렉토리': 'directory',
  '파일명': 'file name',
  '파일': 'file',
  '서버': 'server',
  '데이터': 'data',
  '로그': 'log',
  '옵션': 'option',
  '시스템': 'system',
  '테스트': 'test',
  '로컬': 'local',
  '이미지': 'image',
  '인코딩': 'encoding',
  '코딩': 'coding',
  '코드': 'code',
  '소스': 'source',
  '라이브러리': 'library',
  '템플릿': 'template',
  '프로젝트': 'project',
  '도메인': 'domain',
  '온라인': 'online',
  '라인': 'line',
  '이슈': 'issue',
  '이메일': 'email',
  '메일': 'mail',
  '아카이빙': 'archiving',
  '아카이브': 'archive',
  '백업': 'backup',
  '스팸': 'spam',
  '오피스': 'office',
  '테이블': 'table',
  '컬럼': 'column',
  '모델': 'model',
  '로직': 'logic',
  '소프트웨어': 'software',
  '하드웨어': 'hardware',
  '소프트': 'soft',
  '하드': 'hard',
  '매칭': 'matching',
  '매핑': 'mapping',
  '가이드': 'guide',
  '에러': 'error',
  '태그': 'tag',
  '버전': 'version',
  '브랜치': 'branch',
  '커밋': 'commit',
  '모달': 'modal',
  '메뉴': 'menu',
  '솔루션': 'solution',
  '메타데이터': 'metadata',
  '메타': 'meta',
  '버튼': 'button',
  '필터': 'filter',
  '타입': 'type',
  '필드': 'field',
  '커맨드': 'command',
  '파라미터': 'parameter',
  '클래스': 'class',
  '메세징': 'messaging',
  '메시징': 'messaging',
  '메세지': 'message',
  '메시지': 'message',
  '메서드': 'method',
  '인터페이스': 'interface',
  '컬렉션': 'collection',
  '컨테이너': 'container',
  '컨트롤러': 'controller',
  '서비스': 'service',
  '리스트': 'list',
  '스크립트': 'script',
  '플로우': 'flow',
  '페이지': 'page',
  '페이징': 'paging',
  '캐시': 'cache',
  '캐싱': 'caching',
  '프로세스': 'process',
  '스케줄러': 'scheduler',
  '컨슈머': 'consumer',
  '프로듀서': 'producer',
  '파티션': 'partition',
  '클러스터': 'cluster',
  '포맷': 'format',
  '스펙': 'spec',
  '레포지토리': 'repository',
  '엔드포인트': 'endpoint',
  '페이로드': 'payload',
  '블록': 'block',
  '유니크': 'unique',
  '화이트리스트': 'whitelist',
  '화이트': 'white',
  '블랙리스트': 'blacklist',
  '블랙': 'black',
  '유즈케이스': 'use case',
  '케이스': 'case',
  '패턴': 'pattern',
  '업데이트': 'update',
  '히스토리': 'history',
  '스토리': 'story',
  '레거시': 'legacy',
  '마이그레이션': 'migration',
  '헤더': 'header',
  '다운로드': 'download',
  '필터링': 'filtering',
  '콘텐츠': 'contents',
  '메커니즘': 'mechanism',
  '크롤링': 'crawling',
  '바인딩': 'binding',
  '키워드': 'keyword',
  '블로그': 'blog',
  '포럼': 'forum',
  '커뮤니티': 'community',
  '아이디어': 'idea',
  '타이밍': 'timing',
  '하네스': 'harness',
  '엔지니어링': 'engineering',
  '디자인': 'design',
};

const violations = [];
let inCodeBlock = false;

content.split('\n').forEach((line, i) => {
  if (line.trim().startsWith('```')) {
    inCodeBlock = !inCodeBlock;
    return;
  }

  if (inCodeBlock) return;

  let stripped = line.replace(/`[^`]*`/g, '');

  for (const [korean, english] of Object.entries(replacements)) {
    if (stripped.includes(korean)) {
      violations.push(`line ${i + 1}: "${korean}" → "${english}"`);
      stripped = stripped.replaceAll(korean, english);
    }
  }
});

if (violations.length > 0) {
  process.stderr.write(violations.join('\n') + '\n');
  process.exit(2);
}
