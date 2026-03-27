#!/usr/bin/env node

const input = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
const filePath = input.tool_input.file_path || '';

if (!filePath.endsWith('.md')) process.exit(0);

const content = input.tool_input.content || input.tool_input.new_string || '';

if (!content) process.exit(0);

const violations = [];
const lines = content.split('\n');

let inCodeBlock = false;
let prevHeadingLine = -1;
let prevHeadingLevel = -1;
let prevWasHeading = false;

lines.forEach((line, i) => {
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
});

if (violations.length > 0) {
  process.stderr.write(violations.join('\n') + '\n');
  process.exit(2);
}
