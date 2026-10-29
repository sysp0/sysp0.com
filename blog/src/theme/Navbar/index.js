import React from 'react';
import sites from '../../sites';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';

export default function Navbar() {
  const {i18n: {currentLocale: locale}, siteConfig: {customFields: {articleSlugs}}} = useDocusaurusContext();
  const {pathname} = useLocation();
  const site = sites[locale];
  const other = locale === 'fa' ? 'en' : 'fa';
  const to = (path, language = locale) => path === '/' ? (language === 'fa' ? '/' : '/en') : `${language === 'fa' ? '/fa' : ''}${path}`;
  const slug = pathname.replace(/^\/fa/, '').replace(/^\/log\/?/, '').replace(/\/$/, '');
  const counterpart = articleSlugs[other].includes(slug) ? `/log/${slug}` : '/log';
  return (
    <header className="navbar sysp0-header">
      <div className="sysp0-header-inner">
        <a className="sysp0-brand" href={to('/')} aria-label={site.ui.homeLabel}><img src="/brand/sysp0-logo-color.svg" alt="SYSP0" width="132" height="40" /></a>
        <nav className="sysp0-nav" dir={locale === 'fa' ? 'rtl' : 'ltr'} aria-label={site.ui.navigationLabel}>
          {site.nav.map((item) => <a key={item.path} href={to(item.path)} aria-current={item.path === '/log' ? 'page' : undefined}>
            <span>{item.title}</span><code dir="ltr">{item.label}</code>
          </a>)}
        </nav>
        <details className="sysp0-language">
          <summary dir="ltr" aria-label={locale === 'fa' ? 'انتخاب زبان' : 'Choose language'} title={locale === 'fa' ? 'انتخاب زبان' : 'Choose language'}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" />
            </svg>
            <span lang="en">{locale === "fa" ? "Fa" : "En"}</span>
          </summary>
          <div className="language-options" dir="rtl">
            {['en', 'fa'].map((language) => <a key={language} href={language === locale ? pathname : to(counterpart, language)} hrefLang={language} lang={language} aria-current={language === locale ? 'true' : undefined}>
              <span>{language === 'fa' ? 'فارسی | Farsi' : 'انگلیسی | English'}</span>
              <span aria-hidden="true">{language === locale ? '✓' : ''}</span>
            </a>)}
          </div>
        </details>
      </div>
    </header>
  );
}
