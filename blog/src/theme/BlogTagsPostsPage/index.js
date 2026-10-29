import React from 'react';
import BlogListPage from '@theme/BlogListPage';
import SearchMetadata from '@theme/SearchMetadata';

export default function BlogTagsPostsPage(props) {
  return <><SearchMetadata tag="blog_tags_posts" /><BlogListPage {...props} /></>;
}
