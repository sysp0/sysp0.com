import React from 'react';
import OriginalHeader from '@theme-original/BlogPostItem/Header';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function BlogPostItemHeader() {
  const {metadata, assets, isBlogPostPage} = useBlogPost();
  const {siteConfig: {url}} = useDocusaurusContext();
  const cover = assets.image ?? metadata.frontMatter.image;
  const image = cover?.startsWith(`${url}/`) ? cover.slice(url.length) : cover;
  return <>
    <OriginalHeader />
    {isBlogPostPage && image && <figure className="sysp0-article-cover">
      <img src={image} srcSet={`${image.replace('-1200.webp', '-600.webp')} 600w, ${image} 1200w`} sizes="(min-width: 1024px) 900px, 100vw" alt="" width="1200" height="800" loading="eager" fetchPriority="high" />
    </figure>}
  </>;
}
