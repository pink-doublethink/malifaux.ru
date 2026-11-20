const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const config = require("../config/config.json");
const { blog_folder } = config.settings;
const jsonDir = "./.json";

// get post data
const getPosts = fs.readdirSync(path.join(`content/${blog_folder}`));
const filterPosts = getPosts.filter((post) => post.match(/^(?!_)/));
const posts = filterPosts.map((filename) => {
  const slug = filename.replace(".md", "");
  const postData = fs.readFileSync(
    path.join(`content/${blog_folder}/`, filename),
    "utf-8"
  );
  const { data } = matter(postData);
  const content = matter(postData).content;

  return {
    frontmatter: data,
    content: content,
    slug: slug,
  };
});

// generate unique categories for header navigation
const categories = [
  ...new Set(
    posts.reduce(
      (acc, post) => [...acc, ...(post.frontmatter.categories || [])],
      []
    )
  ),
].map((item) => ({
  name: item.replace(/-/g, " "),
  url: `/categories/${item.toLowerCase().replace(/\s+/g, "-")}`,
}));

try {
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir);
  }
  fs.writeFileSync(`${jsonDir}/posts.json`, JSON.stringify(posts));
  fs.writeFileSync(`${jsonDir}/categories.json`, JSON.stringify(categories));
} catch (err) {
  console.error(err);
}
