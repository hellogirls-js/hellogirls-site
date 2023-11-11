import { useContext } from "react";

import styles from "../styles/main.module.scss";
import PageHeader from "../components/PageHeader";

import DataLayout from "component/DataLayout";
import getData from "component/utility/data";
import { DarkModeContext } from "context/DarkModeContext";

export default function SurveyPopularVote(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <DataLayout pageTitle={props.title}>
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.popularVoteContainer}>
          <PageHeader title="popular vote" />
        </div>
      </div>
    </DataLayout>
  );
}

export async function getServerSideProps() {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const DATA_URL = "https://data.ensemble.moe/ja/characters.json";
  const UNIT_DATA = "https://tl.data.ensemble.moe/en/units.json";

  const enData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);
  const unitData = await getData(UNIT_DATA);

  return {
    props: {
      rawData,
      enData,
      unitData,
      title: "hall of fame | enstars popularity survey results 2023",
      description:
        "shock yourself! see who you all thought the most popular characters are in contrast with how well they actually did.",
    },
  };
}
