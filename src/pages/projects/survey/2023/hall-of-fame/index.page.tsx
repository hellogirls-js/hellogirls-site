import { IncomingMessage } from "http";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import { IconQuestionMark, IconShare2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/main.module.scss";
import ShareImageModal from "../components/ShareImageModal";
import PageHeader from "../components/PageHeader";

import DataLayout from "component/DataLayout";
import getData, { countVotes } from "component/utility/data";
import { DarkModeContext } from "context/DarkModeContext";
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
  closed,
  setClosed,
  setPlace,
}: {
  group: CountedVotes[];
  data: any;
  place: string;
  closed: boolean;
  setClosed: Dispatch<SetStateAction<boolean>>;
  setPlace: Dispatch<SetStateAction<string | null>>;
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
            <span key={chara.chara_id}>
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
            </span>
          );
        })}
        {group.length === 2 ? " both" : group.length > 2 ? " all" : " "}{" "}
        received <strong>{group[0].count}</strong> votes
      </span>
      <Tooltip label="share on social media" position="bottom">
        <span
          className={styles.shareButton}
          onClick={() => {
            setPlace(place);
            setClosed(false);
          }}
        >
          <IconShare2 />
        </span>
      </Tooltip>
    </motion.div>
  );
}

function HallOfFameItem({
  groupedVotes,
  data,
  votes,
  closed,
  setClosed,
  setPlace,
}: {
  groupedVotes: any;
  data: any;
  votes: CountedVotes[];
  closed: boolean;
  setClosed: Dispatch<SetStateAction<boolean>>;
  setPlace: Dispatch<SetStateAction<string | null>>;
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
            <HallOfFameItemLabel
              group={group}
              data={data}
              place={place}
              closed={closed}
              setClosed={setClosed}
              setPlace={setPlace}
            />
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

  const { asPath } = useRouter();
  console.log(asPath);

  const [closed, setClose] = useState<boolean>(true);
  // FIXME: the place is null :/ remove context probably
  const [place, setPlace] = useState<string | null>(null);

  const countedVotes = countVotes("fave_chara");

  const { data } = props.data;

  const groupedVotes: any = groupTies(countedVotes);

  return (
    <DataLayout pageTitle="hall of fame">
      <Head>
        <meta
          property="og:image"
          content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
            asPath.split("#") ? `?place=${asPath.split("#")[1]}` : ""
          }`}
        />
        <meta
          property="og:url"
          content={`http://hellogirls.info/projects/survey/2023/hall-of-fame${
            asPath.includes("#") ? `/${asPath.split("#")[1]}` : ""
          }`}
        />
        <meta name="twitter:creator" content="@hellogirls_DEV" />
        <meta
          name="twitter:image"
          content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
            asPath.split("#") ? `?place=${asPath.split("#")[1]}` : ""
          }`}
        ></meta>
        <meta
          name="twitter:image:src"
          content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
            asPath.split("#") ? `?place=${asPath.split("#")[1]}` : ""
          }`}
        ></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta
          name="twitter:image:alt"
          content="hall of fame statistic or preview"
        ></meta>
      </Head>
      {!closed && (
        <ShareImageModal
          title="share on social media!"
          url={`https://hellogirls-site-git-survey-results-neeneemi.vercel.app/projects/survey/2023/hall-of-fame/${place}`}
          postImgUrl={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame?place=${place}`}
          postBody={`my fave is in ${place}${
            place?.endsWith("1") && place !== "11"
              ? "st"
              : place?.endsWith("2") && place !== "12"
              ? "nd"
              : place?.endsWith("3") && place !== "13"
              ? "rd"
              : "th"
          } place on the enstars popularity survey!`}
          postTag="EnSurvey2023"
          setClose={setClose}
        />
      )}
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.hallOfFameContainer}>
          <PageHeader title="hall of fame" />
          <p></p>
          <div className={styles.hallOfFame}>
            <div className={styles.timeline}>
              <div className={styles.timelineLine}></div>
            </div>
            <div className={styles.hallOfFameItems}>
              <HallOfFameItem
                groupedVotes={groupedVotes}
                data={data}
                votes={countedVotes}
                closed={closed}
                setClosed={setClose}
                setPlace={setPlace}
              />
            </div>
          </div>
        </div>
      </div>
    </DataLayout>
  );
}

export async function getServerSideProps({
  req,
  res,
  resolvedUrl,
}: {
  req: IncomingMessage;
  res: Response;
  resolvedUrl: string;
}) {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const enData = await getData(TL_DATA_URL);

  return {
    props: {
      data: enData,
      title: "hall of fame | enstars popularity survey results 2023",
      description:
        "view how many votes each character received in this scrollable walk of fame.",
    },
  };
}
