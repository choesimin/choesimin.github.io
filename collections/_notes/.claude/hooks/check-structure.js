#!/usr/bin/env node

const fs = require('fs');

const input = JSON.parse(fs.readFileSync(0, 'utf-8'));
const filePath = input.tool_input.file_path || '';

if (!filePath.endsWith('.md')) process.exit(0);

let content;
try {
  content = fs.readFileSync(filePath, 'utf-8');
} catch (e) {
  process.exit(0);
}

if (!content) process.exit(0);

const violations = [];
const lines = content.split('\n');

let inCodeBlock = false;
let inFrontMatter = false;
let prevHeadingLine = -1;
let prevHeadingLevel = -1;
let prevWasHeading = false;

lines.forEach((line, i) => {
  // front matter 처리
  if (i === 0 && line.trim() === '---') {
    inFrontMatter = true;
    return;
  }
  if (inFrontMatter) {
    if (line.trim() === '---') inFrontMatter = false;
    return;
  }

  if (line.trim().startsWith('```')) {
    inCodeBlock = !inCodeBlock;
    prevWasHeading = false;
    return;
  }

  if (inCodeBlock) return;

  const headingMatch = line.match(/^(#{1,6})\s+(.*)/);

  if (headingMatch) {
    const level = headingMatch[1].length;
    const text = headingMatch[2].trim();

    // 1. heading 연속 (heading 다음 바로 heading)
    if (prevWasHeading) {
      violations.push(`line ${i + 1}: heading 연속 - heading 다음 바로 heading (line ${prevHeadingLine + 1} 참고)`);
    }

    // 2. 빈 heading
    if (!text) {
      violations.push(`line ${i + 1}: 빈 heading`);
    }

    // 3. heading depth jump (e.g. h1 -> h3)
    if (prevHeadingLevel !== -1 && level > prevHeadingLevel + 1) {
      violations.push(`line ${i + 1}: heading depth jump - h${prevHeadingLevel} 다음 h${level} (h${prevHeadingLevel + 1} 누락)`);
    }

    // 4. 단락 구분 규칙
    // ## : 위에 빈 줄 2개 + --- + 빈 줄 2개 (첫 ## 제외)
    // ### : 위에 빈 줄 2개
    // #### : 위에 빈 줄 1개
    if (level >= 2 && level <= 4 && prevHeadingLevel !== -1) {
      // heading 위쪽의 빈 줄 수와 --- 유무를 검사
      let emptyCount = 0;
      let hasHr = false;
      let emptyAboveHr = 0;
      let j = i - 1;

      // heading 바로 위의 빈 줄 수
      while (j >= 0 && lines[j].trim() === '') {
        emptyCount++;
        j--;
      }

      // --- 확인
      if (j >= 0 && /^-{3,}$/.test(lines[j].trim())) {
        hasHr = true;
        j--;
        // --- 위의 빈 줄 수
        while (j >= 0 && lines[j].trim() === '') {
          emptyAboveHr++;
          j--;
        }
      }

      if (level === 2) {
        // ## : --- 구분선 + 위아래 빈 줄 2개씩
        if (!hasHr) {
          violations.push(`line ${i + 1}: ## heading 위에 --- 구분선이 필요함`);
        } else {
          if (emptyCount !== 2) {
            violations.push(`line ${i + 1}: ## heading과 --- 사이에 빈 줄이 ${emptyCount}개 (2개 필요)`);
          }
          if (emptyAboveHr !== 2) {
            violations.push(`line ${i + 1}: --- 위에 빈 줄이 ${emptyAboveHr}개 (2개 필요)`);
          }
        }
      } else if (level === 3) {
        // ### : 위에 빈 줄 2개
        if (emptyCount !== 2) {
          violations.push(`line ${i + 1}: ### heading 위에 빈 줄이 ${emptyCount}개 (2개 필요)`);
        }
      } else if (level === 4) {
        // #### : 위에 빈 줄 1개
        if (emptyCount !== 1) {
          violations.push(`line ${i + 1}: #### heading 위에 빈 줄이 ${emptyCount}개 (1개 필요)`);
        }
      }
    }

    prevHeadingLine = i;
    prevHeadingLevel = level;
    prevWasHeading = true;
  } else if (line.trim() !== '') {
    prevWasHeading = false;
  }

  // 5. trailing whitespace
  if (line !== line.trimEnd()) {
    violations.push(`line ${i + 1}: trailing whitespace`);
  }

  // 6. unordered list item은 '.'으로 끝나야 함
  if (/^\s*-\s+/.test(line)) {
    const bulletContent = line.replace(/^\s*-\s+/, '').trim();
    const isUrlOnly = /^<https?:\/\/[^>]+>$/.test(bulletContent);
    if (bulletContent && !isUrlOnly && !line.trimEnd().endsWith('.')) {
      violations.push(`line ${i + 1}: unordered list item이 '.'으로 끝나지 않음`);
    }
  }

  // 7. table row는 '|'로 끝나야 함
  if (line.trim().startsWith('|')) {
    if (!line.trimEnd().endsWith('|')) {
      violations.push(`line ${i + 1}: table row가 '|'으로 끝나지 않음`);
    }
  }

  // 8. 내용 줄은 unordered list item ('- ') 또는 ordered list item ('1. ', '2. ' 등)으로 시작해야 함
  const isEmptyLine = line.trim() === '';
  const isHorizontalRule = /^-{3,}$/.test(line.trim());
  const isHeadingLine = !!headingMatch;
  const isTableRow = line.trim().startsWith('|');

  if (!isEmptyLine && !isHorizontalRule && !isHeadingLine && !isTableRow) {
    if (!/^\s*- /.test(line) && !/^\s*\d+\.\s+/.test(line)) {
      violations.push(`line ${i + 1}: 내용 줄이 unordered list item 또는 ordered list item으로 시작하지 않음`);
    }
  }
});

// 9. file 마지막에 빈 줄이 정확히 하나 있어야 함
if (!content.endsWith('\n')) {
  violations.push('file 끝에 빈 줄이 없음');
} else if (content.endsWith('\n\n\n')) {
  violations.push('file 끝에 빈 줄이 두 개 이상 있음');
} else if (!content.endsWith('\n\n')) {
  violations.push('file 끝에 빈 줄이 없음 (마지막 줄 뒤에 빈 줄 하나 필요)');
}

if (violations.length > 0) {
  process.stderr.write(violations.join('\n') + '\n');
  process.exit(2);
}
