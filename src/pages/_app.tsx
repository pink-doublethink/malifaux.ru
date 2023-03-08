import type { AppProps } from 'next/app';
import config from '@config/config.json';
import theme from '@config/theme.json';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import 'styles/style.scss';

export default function App({ Component, pageProps }: AppProps) {
  const pf = theme.fonts.fontFamily.font;
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(`https://fonts.googleapis.com/css2?family=${pf}&display=swap`).then((res) =>
      res.text().then((css) => setFontcss(css)),
    );
  }, [pf]);

  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === 'production' && config.params.tag_manager_id && TagManager.initialize(tagManagerArgs);
    }, 5000);
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <style
          dangerouslySetInnerHTML={{
            __html: `${fontcss}`,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
