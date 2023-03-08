import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

const { blog_folder } = config.settings;

interface ArticleProps {
  post: {
    slug: string;
    content: string;
  }[];
  mdxContent: string;
  slug: string;
  posts: {
    slug: string;
    content: string;
  }[];
}

// post single layout
const Article = ({ post, mdxContent, slug, posts }: ArticleProps) => {
  return (
    <PostSingle mdxContent={mdxContent} slug={slug} post={post[0]} posts={posts} />
  );
};

// get post single slug
export const getStaticPaths: GetStaticPaths = async () => {
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

// get post single content
interface Params extends ParsedUrlQuery {
  single: string;
}

export const getStaticProps: GetStaticProps<ArticleProps, Params> = async ({ params }) => {
  const { single } = params as Params;
  const posts = getSinglePage(`content/${blog_folder}`);
  const post = posts?.filter((p) => p.slug == single);
  const mdxContent = await parseMDX(post[0].content);

  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      slug: single,
      posts: posts,
    },
  };
};

export default Article;