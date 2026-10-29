import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {transformFileSync} from '@babel/core';
import React from 'react';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
import {renderToStaticMarkup} from 'react-dom/server';

const {code} = transformFileSync('blog/src/theme/BlogListPage/index.js', {
  babelrc: false, configFile: false,
  presets: ['@docusaurus/babel/preset'], plugins: ['@babel/plugin-transform-modules-commonjs'],
});
const sites = Object.fromEntries(['en', 'fa'].map(locale => [locale,
  JSON.parse(readFileSync(`content/${locale === 'fa' ? 'fa/' : ''}site.json`, 'utf8')),
]));
const tag = {label: 'Data', permalink: '/log/tags/data'};
const items = [
  {content: {metadata: {title: 'Older article', permalink: '/log/older', date: '2026-01-01', description: 'Older summary', readingTime: 1.1, tags: [], frontMatter: {category: 'infrastructure'}}}},
  {content: {metadata: {title: 'Newer article', permalink: '/log/newer', date: '2026-02-01', description: 'Newer summary', readingTime: 0.3, tags: [tag], frontMatter: {category: 'data', image: 'https://sysp0.com/blog/images/etl-1200.webp'}}}},
];
for (const locale of ['en', 'fa']) {
  let selected = null;
  const exports = {};
  runInNewContext(code, {exports, require(name) {
    if (name === 'react/jsx-runtime' || name.includes('@babel/runtime/')) return require(name);
    if (name === 'react') return {...React, useState: () => [selected, value => {selected = value;}]};
    if (name === '../../sites') return sites;
    if (name === '@theme/ContentVisibility/Unlisted') return () => null;
    if (name === '@docusaurus/Link') return function MockLink(props) { return React.createElement('a', props); };
    if (name === '@theme/Layout') return ({children}) => children;
    if (name === '@docusaurus/theme-common') return {PageMetadata: () => null};
    if (name === '@docusaurus/useDocusaurusContext') return () => ({i18n: {currentLocale: locale}, siteConfig: {url: "https://sysp0.com", customFields: {sites}}});
    throw new Error(`Unexpected import: ${name}`);
  }});
  const render = (input, extra = {}) => renderToStaticMarkup(React.createElement(exports.default, {items: input, ...extra}));
  const all = render(items);
  assert.ok(all.indexOf('Older article') > all.indexOf('Newer article'), 'Newest article comes first');
  assert.ok(all.includes('src="/blog/images/etl-1200.webp"'), 'Same-site covers use local paths in previews');
  assert.ok(!/NaN|ناعدد|undefined/.test(all), 'No missing labels or invalid numbers');
  assert.ok(all.includes(sites[locale].log.latest) && all.includes(sites[locale].log.minuteRead), 'Current localized copy renders');
  assert.ok(all.includes('Older summary') && all.includes('Newer summary'), 'Descriptions render');
  assert.equal((all.match(/<article /g) || []).length, 2);
  assert.equal((all.match(/aria-pressed=/g) || []).length, 5, 'Four fixed areas and All posts');
  for (const category of sites[locale].log.categories) assert.ok(all.includes(category.label.replace('&', '&amp;')), 'Every fixed area is always visible');
  selected = 'data';
  const filtered = render(items);
  assert.ok(filtered.includes('Newer article') && !filtered.includes('Older article'), 'Topic filters articles');
  assert.ok(filtered.includes(sites[locale].log.categories[0].label));
  selected = 'career';
  assert.ok(render(items).includes(sites[locale].log.emptyCategory), 'Empty fixed areas explain the empty state');
  selected = null;
  assert.equal((render(items).match(/<article /g) || []).length, 2, 'All posts resets the filter');
  assert.ok(render([]).includes(sites[locale].home.log.empty), 'Empty collection stays readable');
  assert.equal((render([]).match(/aria-pressed=/g) || []).length, 5, 'Areas exist even without articles');
  const tagged = render([items[1]], {tag: {...tag, allTagsPath: '/log/tags'}});
  assert.ok(tagged.includes(sites[locale].log.backToBlog) && tagged.includes(sites[locale].log.tagPosts), 'Tag archive has clear context and a way back');
  assert.equal((tagged.match(/<article /g) || []).length, 1, 'Tag archive uses the same article frame');
  assert.ok(tagged.includes('href="/log/tags/data"'), 'Article tags link to their archive');
  assert.ok(!tagged.includes('aria-pressed='), 'Tag archive does not show misleading category filters');
}
console.log('Blog index: date ordering, topic filtering, reset, summaries and empty states passed in both languages.');
