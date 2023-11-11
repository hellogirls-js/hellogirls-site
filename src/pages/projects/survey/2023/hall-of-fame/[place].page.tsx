import Head from "next/head";
import { useRouter } from "next/router";

export default function PageRedirect() {
  const { asPath } = useRouter();
  const splitPath = asPath.split("/");
  const place = splitPath[splitPath.length - 1];
  console.log(place);

  return (
    <Head>
      <meta
        property="og:image"
        content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
          place ? `?place=${place}` : ""
        }`}
      />
      <meta
        property="og:description"
        content={`my fave is in ${place}${
          place.endsWith("1") && place !== "11"
            ? "st"
            : place.endsWith("2") && place !== "12"
            ? "nd"
            : place.endsWith("3") && place !== "13"
            ? "rd"
            : "th"
        } place on the enstars popularity survey!`}
      />
      <meta
        property="og:url"
        content={`http://hellogirls-site-git-survey-results-neeneemi.vercel.app/projects/survey/2023/hall-of-fame/${place}`}
      />
      <meta name="twitter:creator" content="@hellogirls_DEV" />
      <meta
        name="twitter:image"
        content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
          place ? `?place=${place}` : ""
        }`}
      ></meta>
      <meta
        name="twitter:image:src"
        content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
          place ? `?place=${place}` : ""
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
