import { useContext } from "react";

import styles from "./Adoption.module.scss";
import MultipleChoice from "./components/MultipleChoice";

import MainLayout from "component/MainLayout";
import getData from "component/utility/data";
import { DarkModeContext } from "context/DarkModeContext";

export default function AdoptionSurvey({
  enData,
  rawData,
  title,
}: {
  enData: any;
  rawData: any;
  title: string;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <MainLayout heading={title}>
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <h2>adoption survey results: a study</h2>
        <p>
          hello! earlier i conducted a survey on who the most and least
          adoptable characters in ensemble stars are. i want to try something
          different from my last survey data visualization, so i&apos;ll be
          doing studies based off of things i didn&apos;t explore in the last
          data visualization.
        </p>
        <h2>most adoptable overview</h2>
        <MultipleChoice />
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
      title: "adoption survey studies",
      description:
        "data visualizations of the results for the ensemble stars adoption survey",
    },
  };
}
