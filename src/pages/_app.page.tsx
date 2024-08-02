import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import favicon from "../../public/favicon.ico";

import { DarkModeProvider } from "context/DarkModeContext";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
      }
    }
  });

  return (
    <>
      <Head>
        <title>{`${pageProps.title || ""} ♡ hellogirls.info`}</title>
        <meta
          name="description"
          content={pageProps.description || "son's personal website"}
        />
        <meta name="author" content="son" />
        <meta
          name="og:title"
          content={`${pageProps.title || ""} ♡ hellogirls.info`}
        />
        <meta
          name="og:description"
          content={pageProps.description || "son's personal website"}
        />
        <meta
          name="twitter:title"
          content={`${pageProps.title || ""} ♡ hellogirls.info`}
        />
        <meta
          name="twitter:description"
          content={pageProps.description || "son's personal website"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}
