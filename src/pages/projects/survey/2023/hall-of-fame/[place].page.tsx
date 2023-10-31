import Head from "next/head";
import { useRouter } from "next/router";

export default function PageRedirect() {
  const router = useRouter();
  return (
    <Head>
      <meta
        property="og:image"
        content={`https://preview.hellogirls.info/og/hall-of-fame?place=${router.query.place}`}
      />
      <meta
        property="og:url"
        content="http://hellogirls.info/projects/survey/2023/hall-of-fame"
      />
      <meta name="twitter:creator" content="@hellogirls_DEV" />
      <meta
        property="twitter:image"
        content={`https://preview.hellogirls.info/og/hall-of-fame?place=${router.query.place}`}
      ></meta>
      <meta property="twitter:card" content="summary_large_image"></meta>
    </Head>
  );
}
