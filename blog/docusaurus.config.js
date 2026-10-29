const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const tagRedirects = require('./tag-redirects.json');
const sites = { en: require('../content/site.json'), fa: require('../content/fa/site.json') };

// shortcut: translation links refresh at startup; use plugin global data if live translation pairing is needed.
const articleSlugs = Object.fromEntries(['en', 'fa'].map((locale) => {
  const folder = path.join(__dirname, locale === 'fa' ? 'i18n/fa/docusaurus-plugin-content-blog' : 'blog');
  return [locale, fs.readdirSync(folder).filter((file) => /\.mdx?$/.test(file) && !file.startsWith('_')).flatMap((file) => {
    const { data } = matter(fs.readFileSync(path.join(folder, file), 'utf8'));
    return data.draft || data.unlisted || data.placeholder ? [] : [data.slug];
  })];
}));

module.exports = {
  title: 'SYSP0',
  tagline: 'Start at P0. Build the system.',
  url: 'https://sysp0.com',
  baseUrl: '/',
  trailingSlash: false,
  favicon: '/favicon.ico',
  staticDirectories: ['../public'],
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fa'],
    localeConfigs: { fa: { label: 'فارسی', direction: 'rtl', htmlLang: 'fa', calendar: 'persian' } },
  },
  customFields: { articleSlugs },
  presets: [['classic', {
    docs: false,
    pages: false,
    // The Next.js sitemap covers both apps in the combined export.
    sitemap: false,
    blog: false,
    theme: { customCss: './src/css/custom.css' },
  }]],
  themeConfig: {
    colorMode: { defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: false },
    image: '/og.png',
  },
  plugins: [[require.resolve('./plugins/localized-blog.cjs'), {
      routeBasePath: 'log',
      blogTitle: 'Blog',
      blogDescription: sites.en.log.intro,
      blogSidebarCount: 0,
      blogTagsPostsComponent: '@site/src/theme/BlogTagsPostsPage/index.js',
      blogTagsListComponent: '@site/src/theme/BlogTagsListPage/index.js',
      postsPerPage: 'ALL',
      showReadingTime: true,
      onInlineTags: 'ignore',
      onUntruncatedBlogPosts: 'ignore',
      feedOptions: { type: ['rss', 'atom'], title: 'SYSP0 Blog', copyright: sites.en.footer.copyright },
      processBlogPosts: async ({ blogPosts }) => {
        const posts = blogPosts.filter((post) => !post.metadata.frontMatter.placeholder);
        const categories = sites.en.log.categories.map((category) => category.id);
        for (const post of posts) {
          if (post.metadata.tags.some((tag) => !/^[\x20-\x7E]+$/.test(tag.label))) throw new Error(`${post.metadata.source}: use English tag labels`);
          if (!categories.includes(post.metadata.frontMatter.category)) throw new Error(`${post.metadata.source}: choose a category from ${categories.join(', ')}`);
        }
        return posts;
      },
    }], function localPreview(context) {
    return {
      name: 'local-preview',
      contentLoaded({actions}) {
        if (context.i18n.currentLocale !== 'fa') return;
        for (const [legacy, tag] of Object.entries(tagRedirects)) actions.addRoute({
          path: `/fa/log/tags/${legacy}`, exact: true,
          component: '@site/src/theme/LegacyTagRedirect/index.js',
          props: {to: `/fa/log/tags/${tag}`},
        });
      },
      postBuild({outDir}) {
        if (context.i18n.currentLocale !== 'en') return;
        fs.writeFileSync(path.join(outDir, '_redirects'), Object.entries(tagRedirects)
          .map(([legacy, tag]) => `/fa/log/tags/${encodeURIComponent(legacy)} /fa/log/tags/${tag} 301`).join('\n') + '\n');
      },
      configureWebpack() {
        return process.env.BLOG_DEV_PORT ? { devServer: { client: { webSocketURL: { port: Number(process.env.BLOG_DEV_PORT) } } } } : {};
      },
    };
  }],
};
