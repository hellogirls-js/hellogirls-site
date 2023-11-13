import { NextPageContext } from "next";
import { useContext } from "react";

import styles from "../styles/main.module.scss";
import PageHeader from "../components/PageHeader";

import getData from "component/utility/data";
import DataLayout from "component/DataLayout";
import { DarkModeContext } from "context/DarkModeContext";
import TextInput from "component/utility/TextInput";
import Button from "component/utility/Button";

export default function BadgeOfHonor(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <DataLayout pageTitle="badge of honor">
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.badgeOfHonorContainer}>
          <PageHeader title="badge of honor" />
          <div className={styles.paddedContainer}>
            <p>
              hey there! let&apos;s make this easy. if you&apos;re confident you
              filled out the survey, you can search for your response with your
              socials!
            </p>
            <div className={styles.inputContainer}>
              <TextInput
                placeholder="input your twitter, tumblr, or instagram username"
                style={{ flexGrow: 1 }}
                textboxStyle={{ padding: "3%", fontSize: "1.3rem" }}
              />
              <Button
                value="search!"
                buttonStyle={{
                  padding: "3%",
                  height: "100%",
                  fontSize: "1.3rem",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DataLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const TL_UNIT_DATA = "https://tl.data.ensemble.moe/en/units.json";

  const charaData = await getData(TL_DATA_URL);
  const unitData = await getData(TL_UNIT_DATA);

  return {
    props: {
      charaData,
      unitData,
      title: "badge of honor | enstars popularity survey results 2023",
      description:
        "share who you voted for (or didn't vote for) with your friends!",
    },
  };
}
