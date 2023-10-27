import { useContext } from "react";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";

import styles from "./styles/main.module.scss";

import DataLayout from "component/DataLayout";
import getData, { countVotes } from "component/utility/data";
import { DarkModeContext } from "context/DarkModeContext";
import { twoStarIDs } from "data/twoStarIds";

function groupTies(votes: CountedVotes[]): CountedVotes[][] {
  const reducerFunction = (
    prev: any,
    curr: CountedVotes,
    currIndex: number,
    arr: CountedVotes[],
  ) => {
    return {
      ...prev,
      [curr.count]: [...(prev[curr.count] || []), curr],
    };
  };

  let groupedObj = votes.reduce(reducerFunction, {});

  let groupedVotes: CountedVotes[][] = Object.values(groupedObj);

  return groupedVotes;
}

export default function SurveyHallOfFame({ props }: { props: any }) {
  const { colorTheme } = useContext(DarkModeContext);

  const countedVotes = countVotes("fave_chara").sort(
    (a, b) => a.count - b.count,
  );

  const groupedVotes: CountedVotes[][] = groupTies(countedVotes);

  return (
    <DataLayout pageTitle="hall of fame">
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.hallOfFameContainer}>
          <div className={styles.pageHeader}>
            <div className={styles.homeButton}>
              <a href="/projects/survey/2023">
                <IconArrowLeft size={32} />
                <IconHome size={40} />
              </a>
            </div>
            <h1>hall of fame</h1>
          </div>
          <div className={styles.hallOfFame}>
            <div className={styles.timeline}></div>
            <div className={styles.hallOfFameItems}>
              {groupedVotes.map((group: CountedVotes[], index: number) => (
                <div
                  className={`${styles.hallOfFameItem} ${
                    styles[index % 2 === 0 ? "even" : "odd"]
                  }`}
                  key={index}
                  style={{ marginBottom: group[0].count * 50 }}
                >
                  {group.map((chara: CountedVotes) => (
                    <div className={styles.hallOfFameAvi} key={chara.chara_id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://assets.enstars.link/assets/card_full1_${
                          (twoStarIDs as any)[chara.chara_id]
                        }_normal.png`}
                        alt="chara"
                        width={550}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DataLayout>
  );
}

export async function getServerSideProps() {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const enData = await getData(TL_DATA_URL);

  return {
    props: {
      title: "hall of fame | enstars popularity survey results 2023",
      description:
        "view how many votes each character received in this scrollable walk of fame.",
    },
  };
}
