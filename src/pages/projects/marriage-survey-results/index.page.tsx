import { useContext } from "react";

import styles from "../styles/Survey.module.scss";

import TotalResults from "./components/TotalResults";

import { DarkModeContext } from "context/DarkModeContext";
import MainLayout from "component/MainLayout";

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
        <TotalResults rawData={rawData.data} enData={enData.data} />
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
    },
  };
}
