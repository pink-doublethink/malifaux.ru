import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Post from "@layouts/components/Post";
import { getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { slugify } from "@lib/utils/textConverter";
import { GetStaticPaths, GetStaticProps } from "next";

interface CategoryProps {
  posts: Post[];
  slug: string;
}

interface Params {
  params: {
    category: string;
  };
}

const { blog_folder } = config.settings;

const Category = ({ posts, slug }: CategoryProps) => {
  return (
    <Base>
      <div className="section sect">
        <div className="container cont">
          <div className="row rr">
            <div className="mx-auto lg:col-10 qrt">
              <h1 className="text-center capitalize yy">{slug}</h1>
              <div className="row pt-12 jj">
                {posts.map((post, i) => (
                  <Post
                    className="mb-6 sm:col-6 kk"
                    key={"key-" + i}
                    post={post}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategory = getTaxonomy(`content/${blog_folder}`, "categories");
  const paths = allCategory.map((category) => ({
    params: {
      category: category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps, Params> = async ({ params }) => {
  const posts = getSinglePage(`content/${blog_folder}`);
  const filteredPosts = posts.filter((post) =>
    post.frontmatter.categories.find((category) =>
      slugify(category).includes(params.category)
    )
  );

  const sortedPosts = sortByDate(filteredPosts);

  return {
    props: {
      posts: filteredPosts,
      slug: params.category,
    },
  };
};