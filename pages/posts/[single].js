import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import { toPostSummaries } from "@lib/utils/postSummary";
import { parseMDX } from "@lib/utils/mdxParser";
const { blog_folder } = config.settings;


const Article = ({ post, mdxContent, slug, posts }) => {
  return (
    <PostSingle mdxContent={mdxContent} slug={slug} post={post} posts={posts} />
  );
};

export const getStaticPaths = () => {
  const allSlug = getSinglePage(`content/${blog_folder}`);
  const paths = allSlug.map((item) => ({
    params: {
      single: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const posts = getSinglePage(`content/${blog_folder}`);
  const post = posts.find((p) => p.slug === single);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const mdxContent = await parseMDX(post.content);

  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      slug: single,
      posts: toPostSummaries(posts),
    },
  };
};

export default Article;
