const path = require('node:path');
const blog = require('@docusaurus/plugin-content-blog');

module.exports = (context, options) => blog.default(context, {
  ...options,
  // Each language can publish independently; the stock plugin enumerates only default-language filenames.
  path: path.join(context.siteDir, context.i18n.currentLocale === 'fa' ? 'i18n/fa/docusaurus-plugin-content-blog' : 'blog'),
});
module.exports.validateOptions = blog.validateOptions;
