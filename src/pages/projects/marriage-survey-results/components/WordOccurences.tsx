import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { motion } from "framer-motion";

import styles from "../../styles/Survey.module.scss";
import mostDesirable from "../../../../../data/survey-results/most_desirable.json";

import { twoStarIDs } from "data/twoStarIds";
import Strong from "component/utility/Strong";

interface Result {
  id: any;
  name: string;
  reason: string;
}

export default function WordOccurences({
  rawData,
  enData,
}: {
  rawData: any;
  enData: any;
}) {
  let isMobile = useMediaQuery("(max-width: 768px)");
  let isTablet = useMediaQuery("(min-width: 810px) and (max-width: 1120px)");

  /**
   *
   * @param {{id: number; count: number}} obj the count object
   * @param {number} width the number of bars
   * @param {number} maxHeight the max height of an element
   * @returns {JSX.Element} a JSX element
   */
  function WordOccurenceBar({
    obj,
    width,
    maxHeight,
  }: {
    obj: { id: number; count: number };
    width: number;
    maxHeight: number;
  }) {
    const WIDTH = 100 / width - 8;
    const HEIGHT = (obj.count / maxHeight) * 70;
    const IMAGE_WIDTH = 400;

    let imgUrl = `https://assets.enstars.link/assets/card_full1_${
      (twoStarIDs as any)[obj.id]
    }_normal.png`;
    let firstName = enData
      .find((ch: any) => ch.character_id === obj.id)
      .first_name.toLowerCase();
    let lastName = enData
      .find((ch: any) => ch.character_id === obj.id)
      .last_name.toLowerCase();
    return (
      <motion.div
        className={styles.barContainer}
        style={{
          width: isMobile ? "100%" : `${WIDTH}%`,
          height: isMobile ? `${WIDTH}%` : "100%",
        }}
        initial={{ opacity: 0, x: isMobile ? -100 : 0, y: isMobile ? 0 : 200 }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.5 },
        }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <div className={styles.barLabel}>
          {!isMobile && (
            <div className={styles.labelText}>
              {firstName} {lastName}
            </div>
          )}
          {imgUrl && (
            <div className={styles.labelImageContainer}>
              <Image
                className={styles.labelImage}
                src={imgUrl}
                width={IMAGE_WIDTH}
                height={IMAGE_WIDTH / 1.775}
                alt={`${firstName} ${lastName}`}
              />
            </div>
          )}
        </div>
        <div
          className={styles.occurenceBar}
          style={{
            width: `${isMobile ? HEIGHT : 96}%`,
            height: `${isMobile ? 100 : HEIGHT}%`,
            padding: "2%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          {obj.count} {obj.count === 1 ? "response" : "responses"}
        </div>
      </motion.div>
    );
  }

  /**
   * @param {string[]} words the words you want to look for
   * @returns JSX element
   */
  function WordOccurenceGraph({ words }: { words: string[] }) {
    let countArray: { id: number; count: number }[] = [];
    let filteredResults: Result[] = [];
    words.forEach((word) => {
      let filteredArray: Result[] = mostDesirable.filter((d: Result) =>
        d.reason.toLowerCase().includes(word)
      );
      filteredResults = [...filteredResults, filteredArray].flat();
    });
    let idArray = filteredResults.map((r) => r.id).sort((a, b) => a - b);
    let arr: number[][] = [];
    let smallArr: number[] = [idArray[0]];
    for (let i = 1; i <= idArray.length - 1; i++) {
      if (idArray[i] !== idArray[i - 1]) {
        arr.push(smallArr);
        smallArr = [idArray[i]];
      } else {
        smallArr.push(idArray[i]);
        if (i === idArray.length - 1) {
          arr.push(smallArr);
        }
      }
    }

    arr.forEach((a) => {
      let obj = { id: a[0], count: a.length };
      countArray.push(obj);
    });

    // sort in descending order
    countArray.sort((a, b) => b.count - a.count);

    let splitArray =
      countArray.length > 5 ? countArray.slice(0, 5) : countArray;

    let remainders =
      countArray.length > 5 ? countArray.slice(6, countArray.length) : [];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delayChildren: 1.5 } }}
        viewport={{ once: true, amount: "all" }}
      >
        <div
          className={styles.occurenceGraph}
          style={{
            display: "flex",
            flexFlow: isMobile ? "column nowrap" : "row nowrap",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-around",
          }}
        >
          {" "}
          {splitArray.map((obj) => (
            <WordOccurenceBar
              key={obj.id}
              obj={obj}
              width={splitArray.length}
              maxHeight={countArray[0].count}
            />
          ))}
        </div>
        {remainders && remainders.length > 0 && (
          <div
            className={styles.subtext}
            style={{ width: "60%", wordWrap: "break-word", margin: "auto" }}
          >
            <span>runners up: </span>{" "}
            {remainders.map((c, i) => {
              let firstName =
                c.id === 61
                  ? "seiya"
                  : enData
                      .find((ch: any) => ch.character_id === c.id)
                      .first_name.toLowerCase();
              return i < remainders.length - 1
                ? `${firstName}, `
                : `${firstName}`;
            })}
          </div>
        )}
      </motion.div>
    );
  }

  function MotionParagraph({
    title,
    children,
  }: {
    title: string;
    children: any;
  }) {
    return (
      <motion.div
        className={styles.wordOccurenceSection}
        initial={{ opacity: 0, x: -200 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.3, delay: 0.1 },
        }}
        viewport={{ once: true, amount: "all" }}
      >
        <h3>{title}</h3>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.wordOccurences}
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
    >
      <h2>comparing words</h2>
      <p>
        there were some words that kept coming up when i was reading through the
        responses. i wrote some code to analyze where these words occur the
        most. the units for these charts is based on the number of responses
        found that contain these phrases. keep in mind that this only analyzes
        the responses for most desirable, as i found more common word trends in
        this responses compared to responses for least desirable.
      </p>
      <MotionParagraph title="malewife">
        <p>
          these are the characters who were referred to as a{" "}
          <Strong>&quot;malewife&quot;</Strong> the most often.
        </p>
        <p className={styles.subtext}>
          phrases i searched for: &quot;malewife&quot;, &quot;male wife&quot;
        </p>
      </MotionParagraph>

      <WordOccurenceGraph words={["malewife", "male wife"]} />

      <MotionParagraph title="babygirl">
        <p>
          these are the characters who were referred to as a{" "}
          <Strong>&quot;babygirl&quot;</Strong> the most often.
        </p>
        <p className={styles.subtext}>
          phrases i searched for: &quot;babygirl&quot;, &quot;baby girl&quot;,
          &quot;bbygirl&quot;, &quot;bbygrl&quot;, &quot;bbg&quot;,
          &quot;bbgorl&quot;
        </p>
      </MotionParagraph>

      <WordOccurenceGraph
        words={["babygirl", "baby girl", "bbygirl", "bbygrl", "bbg", "bbgorl"]}
      />

      <MotionParagraph title="lesbian and sapphic">
        <p>
          these characters&apos; responses contained the most references to{" "}
          <Strong>lesbianism and being sapphic</Strong>.
        </p>
        <p className={styles.subtext}>
          phrases i searched for: &quot;lesbian&quot;, &quot;lesbianism&quot;,
          &quot;sapphic&quot;, &quot;wlw&quot;
        </p>
      </MotionParagraph>

      <WordOccurenceGraph words={["lesbian", "lesbianism", "sapphic", "wlw"]} />

      <MotionParagraph title="wife and girlfriend">
        <p>
          you guys considered these characters to be{" "}
          <Strong>wife material</Strong> rather than husband material (so true).
        </p>
        <p className={styles.subtext}>
          phrases i searched for: &quot; wife&quot;, &quot; wife.&quot;, &quot;
          wife,&quot; (these are all to differentiate from &quot;malewife&quot;
          occurences), &quot;girlfriend&quot;, &quot; gf &quot;
        </p>
      </MotionParagraph>

      <WordOccurenceGraph
        words={[" wife", " wife.", " wife,", "girlfriend", " gf "]}
      />
    </motion.div>
  );
}
