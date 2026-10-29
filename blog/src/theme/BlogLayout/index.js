import React from 'react';
import Layout from '@theme/Layout';

export default function BlogLayout({children, toc}) {
  return <Layout><div className="sysp0-article-grid"><main>{children}</main>{toc && <aside>{toc}</aside>}</div></Layout>;
}
