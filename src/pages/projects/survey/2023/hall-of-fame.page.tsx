import { useContext } from "react";
import { IconArrowLeft, IconHome, IconQuestionMark, IconShare2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Head from "next/head";

import styles from "./styles/main.module.scss";

import DataLayout from "component/DataLayout";
import getData, { countVotes } from "component/utility/data";
import { DarkModeContext } from "context/DarkModeContext";
import { twoStarIDs } from "data/twoStarIds";
import Tooltip from "component/utility/Tooltip";

function groupTies(votes: CountedVotes[]): any {
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

  let i = votes.length;
  let groupedIndex = 0;
  let groupedVotesObj = {};

  while (i > 0) {
    (groupedVotesObj as any)[i] = groupedVotes[groupedIndex];
    i -= groupedVotes[groupedIndex].length;
    groupedIndex++;
  }

  return groupedVotesObj;
}

function HallOfFameItemLabel({
  group,
  data,
  place,
}: {
  group: CountedVotes[];
  data: any;
  place: string;
}) {
  return (
    <motion.div
      className={styles.hallOfFameItemLabel}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
      viewport={{ once: true, amount: "all" }}
    >
      <span>
        {group.map((chara: CountedVotes, i: number) => {
          let charaData = data.filter(
            (ch: any) => ch.character_id === chara.chara_id,
          )[0];

          return (
            <>
              <strong>
                {/* {charaData.first_name} */}
                ???
              </strong>
              {group.length > 2 && i < group.length - 2
                ? ", "
                : group.length > 2 && i < group.length - 1
                ? ", and "
                : group.length === 2 && i < group.length - 1
                ? " and "
                : ""}
            </>
          );
        })}
        {group.length === 2 ? " both" : group.length > 2 ? " all" : " "}{" "}
        received <strong>{group[0].count}</strong> votes
      </span>
      <Tooltip label="share to twitter" position="bottom">
        <a
          href={`https://twitter.com/intent/tweet?url=https:%2F%2Fhellogirls-site-git-survey-results-neeneemi.vercel.app%2Fprojects%2Fsurvey%2F2023%2Fhall-of-fame%23${place}&text=my%20fave%20got%20${group[0].count.toString()}%20votes%20in%20the%202023%20enstars%20survey%21&hashtags=EnSurvey2023`}
          target="_blank"
        >
          <IconShare2 />
        </a>
      </Tooltip>
    </motion.div>
  );
}

function HallOfFameItem({
  groupedVotes,
  data,
  votes,
}: {
  groupedVotes: any;
  data: any;
  votes: CountedVotes[];
}) {
  const sortedObjectkeys = Object.keys(groupedVotes).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );
  return (
    <>
      {sortedObjectkeys.map((place: string, index: number) => {
        const group = groupedVotes[place];
        return (
          <div
            id={place}
            className={`${styles.hallOfFameItemContainer} ${
              styles[index % 2 === 0 ? "even" : "odd"]
            }`}
            style={{
              marginBottom:
                index < Object.keys(groupedVotes).length - 1
                  ? group[0].count * 50
                  : 0,
            }}
            key={index}
          >
            <motion.div
              className={`${styles.hallOfFameItem} ${
                styles[index % 2 === 0 ? "even" : "odd"]
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
              viewport={{ once: true, amount: "all" }}
            >
              <div className={styles.hallOfFameItemAvis}>
                {group.map((chara: CountedVotes) => (
                  <div className={styles.hallOfFameAvi} key={chara.chara_id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {/* <img
                      src={`https://assets.enstars.link/assets/card_full1_${
                        (twoStarIDs as any)[chara.chara_id]
                      }_normal.png`}
                      alt="chara"
                      width={550}
                    /> */}
                    <IconQuestionMark size={98} />
                  </div>
                ))}
              </div>
            </motion.div>
            <HallOfFameItemLabel group={group} data={data} place={place} />
            <div
              className={`${styles.hallOfFameItemPlaceCont} ${
                styles[index % 2 === 0 ? "even" : "odd"]
              }`}
            >
              <div className={styles.hallOfFameItemPlace}>
                {place}
                <span className={styles.suffix}>
                  {place.endsWith("1") && place !== "11"
                    ? "st"
                    : place.endsWith("2") && place !== "12"
                    ? "nd"
                    : place.endsWith("3") && place !== "13"
                    ? "rd"
                    : "th"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function SurveyHallOfFame(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  const countedVotes = countVotes("fave_chara");

  const { data } = props.data;

  const groupedVotes: any = groupTies(countedVotes);

  return (
    <DataLayout pageTitle="hall of fame">
      <Head>
        <meta
          property="og:image"
          content={`https://preview.hellogirls.info/og/hall-of-fame${
            props.place.length > 0 ? `?place=${props.place}` : ""
          }`}
        />
        <meta
          property="og:url"
          content="http://hellogirls.info/projects/survey/2023/hall-of-fame"
        />
        <meta name="twitter:creator" content="@hellogirls_DEV" />
        <meta
          property="twitter:image"
          content={`https://preview.hellogirls.info/og/hall-of-fame${
            props.place.length > 0 ? `?place=${props.place}` : ""
          }`}
        ></meta>
        <meta property="twitter:card" content="summary_large_image"></meta>
      </Head>
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.hallOfFameContainer}>
          <div className={styles.pageHeader}>
            <Tooltip label="back to home" position="bottom">
              <div className={styles.homeButton}>
                <a href="/projects/survey/2023">
                  <IconArrowLeft size={32} />
                  <IconHome size={40} />
                </a>
              </div>
            </Tooltip>
            <h1>hall of fame</h1>
          </div>
          <div className={styles.hallOfFame}>
            <div className={styles.timeline}>
              <div className={styles.timelineLine}></div>
            </div>
            <div className={styles.hallOfFameItems}>
              <HallOfFameItem
                groupedVotes={groupedVotes}
                data={data}
                votes={countedVotes}
              />
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

  const hash = window.location.hash;

  return {
    props: {
      data: enData,
      place: hash,
      title: "hall of fame | enstars popularity survey results 2023",
      description:
        "view how many votes each character received in this scrollable walk of fame.",
    },
  };
}
