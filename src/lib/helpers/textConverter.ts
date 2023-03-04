import { slug } from "github-slugger";
import marked from "marked";


export const slugify = (content: string): string | null => {
  if (!content) return null;

  return slug(content);
};


export const markdownify = (
  content: string,
  tag?: keyof JSX.IntrinsicElements,
  className?: string
): JSX.Element | null => {
  if (!content) return null;

  const Tag = tag;
  return tag ? (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{
        __html:
          tag === "div" ? marked.parse(content) : marked.parseInline(content),
      }}
    />
  ) : (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: marked.parseInline(content),
      }}
    />
  );
};


export const humanize = (content: string): string | null => {
  if (!content) return null;

  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

export const plainify = (content: string): string | null => {
  if (!content) return null;

  const mdParsed = marked.parseInline(String(content));
  const filterBrackets = mdParsed.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};


const htmlEntityDecoder = (htmlWithEntities: string): string => {
  let entityList = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity) => {
      return entityList[entity];
    }
  );
  return htmlWithoutEntities;
};
