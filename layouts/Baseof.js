import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import { TaxonomySlugProvider } from "context/state";
import Head from "next/head";
import ScrollTop from "./components/ScrollTop";
import { useRouter } from "next/router";

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}) => {
  const { meta_image, meta_description } = config.metadata;
  const { base_url } = config.site;
  const router = useRouter();

  return (
    <>
      <Head>
        {/* title */}
        <title>
          {plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        </title>

        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

        {noindex && <meta name="robots" content="noindex,nofollow" />}

        <meta 
          name="description"
          content={plainify(description ? description : meta_description)}
        />
        
        <meta 
          property="og:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* og-description */}
        <meta
          property="og:description"
          content={plainify(description ? description : meta_description)}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${base_url}/${router.asPath.replace("/", "")}`}
        />

        {/* twitter-title */}
        <meta
          name="twitter:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* twitter-description */}
        <meta
          name="twitter:description"
          content={plainify(description ? description : meta_description)}
        />

        {/* og-image */}
        <meta
          property="og:image"
          content={`${base_url}${image ? image : meta_image}`}
        />

        <meta
          name="twitter:image"
          content={`${base_url}${image ? image : meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {router.route !== "/posts/[single]" && (
        <TaxonomySlugProvider>
        <Header />
        </TaxonomySlugProvider>
      )}

      <main>{children}</main>
      <ScrollTop />
      <Footer />
    </>
  );
};

export default Base;
