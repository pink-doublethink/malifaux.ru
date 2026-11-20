// lightweight post metadata: strip heavy `content` field for list pages
export const toPostSummary = (post) => ({
  slug: post.slug,
  frontmatter: post.frontmatter,
});

export const toPostSummaries = (posts) => posts.map(toPostSummary);
