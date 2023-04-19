import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";

const Footer = () => {
  const { copyright } = config.params;
  return (
    <footer className="pt-16 pb-16">
      <div className="container text-center">
        {markdownify(copyright, "span", "text-text")} <a href="https://vk.com/topic-180164433_49266088"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-primary"
        >этом.</a>
      </div>
    </footer>
  );
};

export default Footer;
