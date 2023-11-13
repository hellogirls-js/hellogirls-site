import { Dispatch, SetStateAction, useContext, useState } from "react";
import { IconQuestionMark, IconShare2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Head from "next/head";
import { NextPageContext } from "next";

import styles from "../styles/main.module.scss";
import ShareImageModal from "../components/ShareImageModal";
import PageHeader from "../components/PageHeader";

import DataLayout from "component/DataLayout";
import getData, {
  countVotes,
  getSurveyResponses,
} from "component/utility/data";
import { DarkModeContext } from "context/DarkModeContext";
import Tooltip from "component/utility/Tooltip";
import { twoStarIDs } from "data/twoStarIds";

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

  const [closed, setClose] = useState<boolean>(true);
  // FIXME: the place is null :/ remove context probably
  const [place, setPlace] = useState<string | null>(null);

  const countedVotes = countVotes("fave_chara");

  const { pagePlace } = props;
  const { data } = props.data;

  const groupedVotes: any = groupTies(countedVotes);

  return (
    <DataLayout pageTitle="hall of fame">
      <Head>
        <meta
          property="og:image"
          content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
            pagePlace ? `?place=${pagePlace}` : ""
          }`}
        />
        <meta
          property="og:url"
          content={`http://hellogirls.info/projects/survey/2023/hall-of-fame${
            pagePlace ? `/${pagePlace}` : ""
          }`}
        />
        <meta name="twitter:creator" content="@hellogirls_DEV" />
        <meta
          name="twitter:image"
          content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
            pagePlace ? `?place=${pagePlace}` : ""
          }`}
        ></meta>
        <meta
          name="twitter:image:src"
          content={`https://hellogirls-site-preview-git-main-neeneemi.vercel.app/og/hall-of-fame${
            pagePlace ? `?place=${pagePlace}` : ""
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
          url={`https://hellogirls-site-git-survey-results-neeneemi.vercel.app/projects/survey/2023/hall-of-fame?place=${place}`}
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
          <motion.div
            style={{ marginTop: "3%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
          >
            <p className={styles.hallOfFameParagraph}>
              hello and welcome to what i like to call the hall of fame! over
              1000 people voted in this survey,{" "}
              <strong>{getSurveyResponses().length} people</strong>, to be
              exact. that&apos;s a lot of enstarries! thank you to everyone who
              participated.
            </p>
            <p className={styles.hallOfFameParagraph}>
              each idol came very close in terms of votes. our first place
              winner garnered 62 votes out of {getSurveyResponses().length},
              only making {Math.round((62 / getSurveyResponses().length) * 100)}
              % of votes. it&apos;s apparent that each idol is someone&apos;s
              favorite, a sentiment that&apos;s touching and sweet.
            </p>
            <p className={styles.hallOfFameParagraph}>
              now, it may be clear that i&apos;m writing paragraphs just to take
              up space. the hall of fame is intended to be a scrollable
              experience. as you keep scrolling, each character will be revealed
              showing how they placed in this survey. it will go in ascending
              order; so the least popular characters will appear first with the
              first place winner appearing last.
            </p>
            <p className={styles.hallOfFameParagraph}>
              this experience may fill you with anticipation, it may fill you
              with excitement, it may even fill you with dread. regardless, i
              hope it fills you with an emotion. and if it does, each placement
              has an option to share the placement on social media. when you
              reach your favorite character, use the share button to showcase
              where your favorite idol placed on the survey.
            </p>
            <p className={styles.hallOfFameParagraph}>enjoy the ride! &lt;3</p>
          </motion.div>
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
          <p>
            and there we have it! congratulations to mayoi ayase for being the
            most popular character in this survey. your long hair, shark teeth,
            and timid personality have captured the hearts of many fans (mine
            included &lt;3){" "}
          </p>
        </div>
      </div>
    </DataLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const enData = await getData(TL_DATA_URL);

  const { place } = context.query;
  const stringPlace: string = place as string;

  return {
    props: {
      data: enData,
      pagePlace: stringPlace || null,
      title: "hall of fame | enstars popularity survey results 2023",
      description:
        "view how many votes each character received in this scrollable walk of fame.",
    },
  };
}
