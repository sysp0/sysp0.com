import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {PageMetadata} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SearchMetadata from '@theme/SearchMetadata';
import sites from '../../sites';

export default function BlogTagsListPage({tags}) {
  const {i18n: {currentLocale: locale}} = useDocusaurusContext();
  const {log} = sites[locale];
  const blogPath = locale === 'fa' ? '/fa/log' : '/log';
  const number = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en');
  return <Layout>
    <PageMetadata title={log.allTags} description={log.tagsIntro} />
    <SearchMetadata tag="blog_tags_list" />
    <main className="sysp0-blog-index">
      <p className="sysp0-path" dir="ltr">sysp0.com<span>{blogPath}/tags</span></p>
      <Link href={blogPath} className="sysp0-back-blog">{locale === 'fa' ? '→' : '←'} {log.backToBlog}</Link>
      <header className="sysp0-blog-heading"><h1>{log.allTags}</h1><p>{log.tagsIntro}</p></header>
      <ul className="sysp0-tag-directory">{tags.slice().sort((a, b) => a.label.localeCompare(b.label, 'en')).map((tag) => <li key={tag.permalink}>
        <Link href={tag.permalink}><bdi lang="en" dir="ltr">{tag.label}</bdi><span>{number.format(tag.count)} {log.articles}</span></Link>
      </li>)}</ul>
    </main>
  </Layout>;
}
