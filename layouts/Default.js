import { markdownify } from "@lib/utils/textConverter";
import { MDXRemote } from "next-mdx-remote";
import shortcodes from "./shortcodes/all";

const Default = ({ data }) => {
  const { mdxContent } = data;
  return (
    <section className="!pt-[60px] pb-10">
      <div className="container">
        <div className="row">
          <div className="mx-auto lg:col-11">
            <div className="content">
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Default;
