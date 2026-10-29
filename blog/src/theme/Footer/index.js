import React from 'react';
import sites from '../../sites';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Footer() {
  const {i18n: {currentLocale: locale}} = useDocusaurusContext();
  return <footer className="sysp0-footer" dir="ltr"><div>
    <section><img src="/brand/sysp0-logo-reverse.svg" alt="SYSP0" width="132" height="40"/><p>There is always another <span>P0</span>.</p></section>
    <section><nav aria-label={locale === 'fa' ? 'پیوندهای پایین صفحه' : 'Footer links'}>{sites[locale].nav.map(({path}) => <a key={path} href={`${locale === 'fa' ? '/fa' : ''}${path}`}>{path}</a>)}</nav><p>{sites[locale].footer.copyright}</p></section>
  </div></footer>;
}
