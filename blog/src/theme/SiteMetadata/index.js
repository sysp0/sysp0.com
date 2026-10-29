import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {PageMetadata, useThemeConfig} from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';

export default function SiteMetadata() {
  const {siteConfig: {url, customFields: {articleSlugs}}, i18n: {currentLocale, locales}} = useDocusaurusContext();
  const {pathname} = useLocation();
  const {image, metadata} = useThemeConfig();
  const path = pathname.replace(/^\/fa/, '').replace(/\/$/, '');
  const slug = path.replace(/^\/log\//, '');
  // An independently published article must not advertise a translation that does not exist.
  const available = locales.filter((locale) => path === '/log' || articleSlugs[locale].includes(slug));
  const localizedUrl = (locale) => `${url}${locale === 'fa' ? '/fa' : ''}${path}`;
  return <>
    <Head>
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:url" content={`${url}${pathname}`} />
      <meta property="og:locale" content={currentLocale === 'fa' ? 'fa_IR' : 'en_US'} />
      <link rel="canonical" href={`${url}${pathname}`} />
      {available.map((locale) => <link key={locale} rel="alternate" href={localizedUrl(locale)} hrefLang={locale} />)}
      {available.length > 0 && <link rel="alternate" href={localizedUrl(available.includes('fa') ? 'fa' : available[0])} hrefLang="x-default" />}
      {metadata.map((item, i) => <meta key={i} {...item} />)}
    </Head>
    {image && <PageMetadata image={image} />}
    <SearchMetadata tag="default" locale={currentLocale} />
  </>;
}
