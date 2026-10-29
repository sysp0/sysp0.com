import React from 'react';
import Head from '@docusaurus/Head';
import {Redirect} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function LegacyTagRedirect({to}) {
  const {siteConfig: {url}} = useDocusaurusContext();
  return <>
    <Head><meta httpEquiv="refresh" content={`0;url=${to}`} /><link rel="canonical" href={`${url}${to}`} /></Head>
    <Redirect to={to} />
    <a href={to}>Continue</a>
  </>;
}
