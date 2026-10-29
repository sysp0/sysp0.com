import assert from 'node:assert/strict';
import {writeFileSync, rmSync} from 'node:fs';
import {getLog} from '../src/lib/content.ts';

const fixture = new URL(`../blog/blog/content-check-${process.pid}.md`, import.meta.url);
const source = (extra = '') => `---
slug: content-check
title: Markdown content check
date: 2026-10-28
category: data
description: >
  A summary written
  across two lines.
tags:
  - Markdown
${extra}---

## A real Markdown heading

Body text.
`;
try {
  writeFileSync(fixture, source());
  const entry = getLog('en').find((post) => post.slug === 'content-check');
  assert.ok(entry, '.md posts must appear in the home preview');
  assert.equal(entry.date, '2026-10-28');
  assert.equal(entry.description.trim(), 'A summary written across two lines.');
  assert.deepEqual(entry.tags, ['Markdown']);
  for (const flag of ['draft', 'unlisted', 'placeholder']) {
    writeFileSync(fixture, source(`${flag}: true\n`));
    assert.ok(!getLog('en').some((post) => post.slug === 'content-check'), `${flag} must stay out of public previews and sitemap`);
  }
  writeFileSync(fixture, source().replace('- Markdown', '- داده'));
  assert.throws(() => getLog('en'), /use English tag labels/);
  writeFileSync(fixture, source().replace('category: data', 'category: unknown'));
  assert.throws(() => getLog('en'), /Invalid enum value/);
  writeFileSync(fixture, source().replace('slug: content-check', 'slug: ../invalid'));
  assert.throws(() => getLog('en'), /lowercase, hyphenated slug/);
} finally {
  rmSync(fixture, {force: true});
}
console.log('Markdown metadata, explicit slugs and draft privacy passed.');
