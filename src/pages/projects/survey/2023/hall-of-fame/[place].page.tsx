import Head from "next/head";
import { useRouter } from "next/router";

export default function PageRedirect() {
  const router = useRouter();
  console.log(router.query.place);
  return (
    <Head>
      <meta
        property="og:image"
        content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
          router.query.place ? `?place=${router.query.place}` : ""
        }`}
      />
      <meta
        property="og:url"
        content={`http://hellogirls-site-git-survey-results-neeneemi.vercel.app/projects/survey/2023/hall-of-fame/${router.query.place}`}
      />
      <meta name="twitter:creator" content="@hellogirls_DEV" />
      <meta
        name="twitter:image"
        content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
          router.query.place ? `?place=${router.query.place}` : ""
        }`}
      ></meta>
      <meta
        name="twitter:image:src"
        content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
          router.query.place ? `?place=${router.query.place}` : ""
        }`}
      ></meta>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta
        name="twitter:image:alt"
        content="hall of fame statistic or preview"
      ></meta>
    </Head>
  );
}
