import { NextPageContext } from "next";
import { useContext } from "react";

import styles from "../styles/main.module.scss";
import PageHeader from "../components/PageHeader";

import getData from "component/utility/data";
import DataLayout from "component/DataLayout";
import { DarkModeContext } from "context/DarkModeContext";

export default function BadgeOfHonor(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <DataLayout pageTitle="badge of honor">
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.badgeOfHonorContainer}>
          <PageHeader title="badge of honor" />
        </div>
      </div>
    </DataLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const enData = await getData(TL_DATA_URL);

  return {
    props: {
      data: enData,
      title: "badge of honor | enstars popularity survey results 2023",
      description:
        "share who you voted for (or didn't vote for) with your friends!",
    },
  };
}
