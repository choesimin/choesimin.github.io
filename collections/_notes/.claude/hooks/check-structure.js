#!/usr/bin/env node

const input = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
const filePath = input.tool_input.file_path || '';

if (!filePath.endsWith('.md')) process.exit(0);

const content = input.tool_input.content || input.tool_input.new_string || '';

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

    prevHeadingLine = i;
    prevHeadingLevel = level;
    prevWasHeading = true;
  } else if (line.trim() !== '') {
    prevWasHeading = false;
  }

  // 4. trailing whitespace
  if (line !== line.trimEnd()) {
    violations.push(`line ${i + 1}: trailing whitespace`);
  }

  // 5. bullet point는 '.'으로 끝나야 함
  if (/^\s*-\s+/.test(line)) {
    const bulletContent = line.replace(/^\s*-\s+/, '').trim();
    const isUrlOnly = /^<https?:\/\/[^>]+>$/.test(bulletContent);
    if (bulletContent && !isUrlOnly && !line.trimEnd().endsWith('.')) {
      violations.push(`line ${i + 1}: bullet point가 '.'으로 끝나지 않음`);
    }
  }

  // 6. table row는 '|'로 끝나야 함
  if (line.trim().startsWith('|')) {
    if (!line.trimEnd().endsWith('|')) {
      violations.push(`line ${i + 1}: table row가 '|'으로 끝나지 않음`);
    }
  }

  // 7. 내용 줄은 '- '로 시작해야 함
  const isEmptyLine = line.trim() === '';
  const isHorizontalRule = /^-{3,}$/.test(line.trim());
  const isHeadingLine = !!headingMatch;
  const isTableRow = line.trim().startsWith('|');

  if (!isEmptyLine && !isHorizontalRule && !isHeadingLine && !isTableRow) {
    if (!/^\s*- /.test(line)) {
      violations.push(`line ${i + 1}: 내용 줄이 '- '로 시작하지 않음`);
    }
  }
});

if (violations.length > 0) {
  process.stderr.write(violations.join('\n') + '\n');
  process.exit(2);
}
