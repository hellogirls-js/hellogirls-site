import { useContext } from "react";
import Link from "next/link";

import styles from "../styles/Survey.module.scss";

import TotalResults from "./components/TotalResults";
import WordOccurences from "./components/WordOccurences";
import WordCloud from "./components/WordCloud";
import RankingSummary from "./components/RankingSummary";

import { DarkModeContext } from "context/DarkModeContext";
import MainLayout from "component/MainLayout";
import ScrollToTop from "component/utility/ScrollToTop";

function getData(url: string): Promise<any> {
  return fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      let data = resJson;
      if (data[0]) {
        data = data.filter((d: any) => d.compliant === "TRUE");
      }
      return {
        status: "success",
        data: data,
      };
    })
    .catch((err) => {
      console.error(err);
      return { status: "error" };
    });
}

function Contents() {
  return (
    <div className={styles.contents}>
      <h4>contents</h4>
      <ul>
        <li>
          <Link href="#summary">ranking summary</Link>
        </li>
        <li>
          <Link href="#total">total results</Link>
        </li>
        <li>
          <Link href="#occurences">comparing words</Link>
          <ul>
            <li>
              <Link href="#md-occurences">most desirable</Link>
            </li>
            <li>
              <Link href="#ld-occurences">least desirable</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="#cloud">word cloud</Link>
        </li>
        <li>
          <Link href="#conclusion">conclusion</Link>
        </li>
      </ul>
    </div>
  );
}

export default function MarriageSurveyResults({
  rawData,
  enData,
}: {
  rawData: any;
  enData: any;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <MainLayout heading="enstars marriage survey results">
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div>
          <h2>marriage survey results: an analysis</h2>
          <p>
            hey! a couple weeks ago, i conducted a survey asking ensemble stars
            fans which characters they deemed to be the most and least desirable
            for marriage. the results are available{" "}
            <Link href="/post/most-desirable-survey-results" target="_blank">
              here (most desirable)
            </Link>{" "}
            and{" "}
            <Link href="/post/least-desirable-survey-results" target="_blank">
              here (least desirable)
            </Link>
            . i had lots of fun running the survey and i wanted to do an
            analysis of all the results and data, so here we are!
          </p>
          <p>
            character data, such as name, image color, and renders, is provided
            by{" "}
            <Link href="https://stars.ensemble.moe" target="_blank">
              makotools
            </Link>
            . thank you so much!
          </p>
          <p>(psst, i recommend viewing this site on desktop!)</p>
          <Contents />
          <RankingSummary rawData={rawData.data} enData={enData.data} />
          <TotalResults rawData={rawData.data} enData={enData.data} />
          <WordOccurences rawData={rawData.data} enData={enData.data} />
          <WordCloud rawData={rawData.data} enData={enData.data} />
          <h2 id="conclusion">conclusion</h2>
          <p>
            thank you for taking the time to go thru this page! i hope you had
            as much fun analyzing things as i did. if you think i should keep
            doing things like this lemme know via{" "}
            <Link href="https://curiouscat.me/hellogirlsqa" target="_blank">
              curiouscat
            </Link>
            ! i also have a{" "}
            <Link
              href="https://www.buymeacoffee.com/hellogirls"
              target="_blank"
            >
              buy me a coffee account
            </Link>{" "}
            if you appreciate my analyzing efforts (nothing expected tho, i just
            did this for fun haha).
          </p>
          <p>see you guys later!</p>
        </div>
        <ScrollToTop />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  // taking makotools data like a boss
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const DATA_URL = "https://data.ensemble.moe/ja/characters.json";

  const enData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);

  return {
    props: {
      rawData,
      enData,
      title: "marriage survey results",
      description:
        "data visualizations of the results for the ensemble stars marriage survey",
    },
  };
}
