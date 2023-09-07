import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

import favicon from "../../public/favicon.ico";

import { DarkModeProvider } from "context/DarkModeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{`${pageProps.title || ""} ♡ hellogirls.info`}</title>
        <meta
          name="description"
          content={
            pageProps.description || "son @HELLOGlRLS's personal website"
          }
        />
        <meta name="author" content="son @HELLOGlRLS" />
        <meta
          name="og:title"
          content={`${pageProps.title || ""} ♡ hellogirls.info`}
        />
        <meta
          name="twitter:title"
          content={`${pageProps.title || ""} ♡ hellogirls.info`}
        />
        <meta
          name="twitter:description"
          content={
            pageProps.description || "son @HELLOGlRLS's personal website"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <DarkModeProvider>
        <Component {...pageProps} />
      </DarkModeProvider>
    </>
  );
}
