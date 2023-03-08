import fs from "fs";
import matter, { GrayMatterFile } from "gray-matter";
import path from "path";
import { parseMDX } from "./utils/mdxParser";

interface Frontmatter {
  [key: string]: any;
}

interface Page {
  frontmatter: Frontmatter;
  content: string;
}

export const getListPage = async (filePath: string): Promise<Page> => {
  const pageData = fs.readFileSync(path.join(filePath), "utf-8");
  const pageDataParsed: GrayMatterFile<string> = matter(pageData);
  const notFoundPage = fs.readFileSync(path.join("content/404.md"), "utf-8");
  const notFoundDataParsed: GrayMatterFile<string> = matter(notFoundPage);
  let frontmatter: Frontmatter, content: string;

  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data as Frontmatter;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data as Frontmatter;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

export const getSinglePage = (): Page[] => {
  const folder = "content";
  const filesPath = fs.readdirSync(path.join(folder));
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter(
    (file) => !file.match(/^(?=_)|404/)
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const pageDataParsed: GrayMatterFile<string> = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter: frontmatter as Frontmatter, slug: url, content };
  });

  const publishedPages = singlePages.filter(
    (page) => !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};

export const getRegularPage = async (slug: string): Promise<Page> => {
  const publishedPages = getSinglePage();
  const pageData = publishedPages.filter((data) => data.slug === slug);
  const notFoundPage = fs.readFileSync(path.join("content/404.md"), "utf-8");
  const notFoundDataParsed: GrayMatterFile<string> = matter(notFoundPage);

  let frontmatter: Frontmatter, content: string;
  if (pageData[0]) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data as Frontmatter;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};
