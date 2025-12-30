# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Document Writing Guidelines for collections/_notes

The collections/_notes directory is a space for writing technical documentation. All documents must strictly follow the structured documentation writing rules defined in collections/_notes/writing/structured-writing.md.

### Front Matter Format
```yaml
---
layout: note
permalink: /[number]
title: [title]
description: [description]
date: YYYY-MM-DD
---
```

### Core Writing Principles

- **Markdown Syntax**: All documents must be written in Markdown.
- **Korean Polite Form (합니다체)**: The default style. Nominative sentences are also acceptable.
- **Periods Required**: All sentences must end with a period.
- **List Format Required**: All sentences except titles must start with `- ` to create lists.
- **Hierarchical Structure**: Use 4-space indentation to distinguish parent and child items.

### English Word Notation Rules

- **Use English for English Terms**: 'database' → `database`, 'button' → `button` (not in Korean).
- **Capitalize Proper Nouns Only**: 'Debezium', 'Linux' (proper nouns) / 'system', 'database' (common nouns).
- **Lowercase at Sentence Start**: If not a proper noun, use lowercase: "database의 약어는 DB입니다."
- **Capitalize in Titles**: English words in titles should have capitalized first letters.

### Prohibited Expressions

- "다음과 같은" (as follows), "위와 같은" (like above), "아래와 같은" (like below).
- "이를 통해" (through this), "이러한" (such).
- "~에 대해 알아보겠습니다" (let me explain), "~를 소개합니다" (let me introduce).
- "~할 수 있습니다" (overuse of softening expressions).
- Repetitive translation-style endings: Avoid repeating "~를 제공합니다", "~를 달성합니다", "~를 구현합니다" in consecutive sentences. Use varied, natural Korean expressions instead.

### Heading Writing Rules

- **No Heading Directly After Heading**: All headings must have at least one bulleted sentence (`- ` prefix) immediately below.
- **Headings Do Not End with Periods**: No period at the end of heading text.
- **Start from Level 2 (`##`)**: Do not use level 1 heading (`#`). The highest heading level in a document is level 2 (`##`).
- **Concrete Summary Below Headings**: Even if subsections exist, provide a concrete summary directly under the heading. Avoid abstract phrases like "주요 field들로 구성됩니다" and instead specify what those fields are and their roles.

### Paragraph Separation

- **Level 1, 2 Headings**: Use `---` with 2 blank lines above and below.
- **Level 3 Headings**: 2 blank lines.
- **Level 4 Headings**: 1 blank line.

### Diagrams and Tables

- **Mermaid.js**: Use Mermaid.js syntax for diagrams instead of images.
- **No `@` in Mermaid**: Avoid using `@` symbol in Mermaid diagrams as it causes parsing errors. Use the term without `@` (e.g., `Qualifier` instead of `@Qualifier`).
- **Table Separators**: Use `| --- |` consistently.
- **Table Content**: Use nominative form, no periods.

### Special Characters and Formatting

- **Colon Spacing**: Always add one space before and after colon (`:`).
- **No Emojis**: Do not use emojis (✓, ✗, ⚠️, etc.) in technical documentation. Use clear text instead.

### References

- **Location**: Add to the bottom of the document with `## Reference` heading.
- **Format**: `- <reference.link.com/some_uri>`.

### Document Independence

- **No Cross-References**: Documents must be independent and self-contained. Do not link to other documents in the repository.
- **Summarize Instead of Linking**: If related content exists in another document, briefly summarize the key points instead of linking to it.

## Validation Checklist After Writing

**IMPORTANT**: Always run through this checklist after completing a document. Do not skip this step.

- Are there at least one bulleted explanation below each heading?
- Is the summary below each heading concrete and specific (not abstract)?
- Are prohibited expressions like "다음과 같은" and "이를 통해" avoided?
- Are translation-style endings ("제공합니다", "달성합니다") not overused?
- Are English notation rules applied consistently?
- Do all sentences end with periods?
- Are colons properly spaced (` : `)?
- Are emojis avoided?

## Before Writing

- **Study Existing Documents**: Before writing a new document, read several published documents in collections/_notes to understand the tone, structure, and style patterns.
- **Use Mermaid.js Actively**: When explaining flows, hierarchies, or relationships, use Mermaid.js diagrams to enhance understanding.

## Detailed Rules

For all detailed rules, refer to collections/_notes/writing/structured-writing.md.
