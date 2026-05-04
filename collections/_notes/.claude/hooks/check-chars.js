#!/usr/bin/env node

const input = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
const filePath = input.tool_input.file_path || '';

if (!filePath.endsWith('.md')) process.exit(0);
if (filePath.includes('/.claude/plans/')) process.exit(0);

const content = input.tool_input.content || input.tool_input.new_string || '';

if (!content) process.exit(0);

const violations = [];
let inCodeBlock = false;

content.split('\n').forEach((line, i) => {
  if (line.trim().startsWith('```')) {
    inCodeBlock = !inCodeBlock;
    return;
  }

  if (inCodeBlock) return;

  const stripped = line.replace(/`[^`]*`/g, '');

  if (/[→↗⟶]/.test(stripped)) {
    violations.push(`line ${i + 1}: unicode 화살표 -> "->" 로 변경`);
  }

  if (/—/.test(stripped)) {
    violations.push(`line ${i + 1}: em dash(—) -> hyphen(-) 또는 하위 항목으로 이동`);
  }
});

if (violations.length > 0) {
  process.stderr.write(violations.join('\n') + '\n');
  process.exit(2);
}
