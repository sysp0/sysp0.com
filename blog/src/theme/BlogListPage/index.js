import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {PageMetadata} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import sites from '../../sites';
import Unlisted from '@theme/ContentVisibility/Unlisted';

export default function BlogListPage({items, tag}) {
  const {i18n: {currentLocale: locale}, siteConfig: {url}} = useDocusaurusContext();
  const {log, home} = sites[locale];
  const [topic, setTopic] = useState(null);
  const posts = items.map(({content: {metadata}}) => metadata)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const visible = topic ? posts.filter((post) => post.frontMatter?.category === topic) : posts;
  const blogPath = locale === 'fa' ? '/fa/log' : '/log';
  const title = tag ? `${log.tagTitle} ${tag.label}` : log.subtitle;
  const number = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en');
  const date = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en', {dateStyle: 'medium', timeZone: 'UTC'});

  return <Layout>
    <PageMetadata title={tag ? title : log.title} description={tag ? tag.description || log.tagIntro : log.intro}/>
    <main className="sysp0-blog-index">
      <p className="sysp0-path" dir="ltr">sysp0.com<span>{tag ? tag.permalink : blogPath}</span></p>
      {tag && <Link href={blogPath} className="sysp0-back-blog">{locale === 'fa' ? '→' : '←'} {log.backToBlog}</Link>}
      {tag?.unlisted && <Unlisted />}
      <header className="sysp0-blog-heading">
        <h1>{tag ? <>{log.tagTitle} <bdi lang="en" dir="ltr">{tag.label}</bdi></> : title}</h1>
        <p>{tag ? tag.description || log.tagIntro : log.intro}</p>
      </header>
      <section className="sysp0-journal" aria-labelledby="blog-latest">
        <div className="sysp0-journal-heading">
          <h2 id="blog-latest">{tag ? log.tagPosts : topic ? log.categories.find((category) => category.id === topic).label : log.latest}</h2>
          <p role="status">{number.format(visible.length)} {log.articles}</p>
        </div>
        {tag ? <nav className="sysp0-topic-options" aria-label={log.allTags}>
          <Link href={blogPath}>{log.allPosts}</Link>
          <Link href={tag.allTagsPath}>{log.allTags}</Link>
          <span aria-current="page"><bdi lang="en" dir="ltr">{tag.label}</bdi></span>
        </nav> : <nav className="sysp0-topic-options" aria-label={log.topics}>
          <button type="button" aria-pressed={topic === null} onClick={() => setTopic(null)}>{log.allPosts}</button>
          {log.categories.map((category) => <button key={category.id} type="button" aria-pressed={topic === category.id} onClick={() => setTopic(category.id)}>{category.label}</button>)}
        </nav>}
        <ul className="sysp0-journal-posts">{visible.map((post, index) => {
          const cover = post.frontMatter?.image;
          const image = cover?.startsWith(`${url}/`) ? cover.slice(url.length) : cover;
          return <li key={post.permalink}>
            <article className={`sysp0-entry${index === 0 ? ' sysp0-entry-featured' : ''}${image ? '' : ' sysp0-entry-text'}`}>
              {image && <Link href={post.permalink} className="sysp0-entry-image" tabIndex={-1} aria-hidden="true">
                <img src={image} srcSet={`${image.replace('-1200.webp', '-600.webp')} 600w, ${image} 1200w`} sizes={index === 0 ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 768px) 30vw, 100vw'} alt="" width="1200" height="800" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />
              </Link>}
              <div className="sysp0-entry-body">
                <div className="sysp0-entry-meta"><time dateTime={post.date}>{date.format(new Date(post.date))}</time><span>{number.format(Math.max(1, Math.ceil(post.readingTime ?? 1)))} {log.minuteRead}</span></div>
                <h3><Link href={post.permalink}>{post.title}</Link></h3>
                <p>{post.description}</p>
                <div className="sysp0-entry-tags">{post.tags.map((tag) => <Link key={tag.permalink} href={tag.permalink}><bdi lang="en" dir="ltr">{tag.label}</bdi></Link>)}</div>
                <Link className="sysp0-entry-link" href={post.permalink} aria-label={`${log.readPost}: ${post.title}`}>{log.readPost}<span aria-hidden="true">{locale === 'fa' ? '←' : '→'}</span></Link>
              </div>
            </article>
          </li>;
        })}</ul>
        {!visible.length && <p className="sysp0-empty-posts">{topic ? log.emptyCategory : home.log.empty}</p>}
      </section>
    </main>
  </Layout>;
}
