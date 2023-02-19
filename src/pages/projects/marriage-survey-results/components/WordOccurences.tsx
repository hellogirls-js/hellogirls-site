import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";

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
    let firstName = enData.find(
      (ch: any) => ch.character_id === obj.id
    ).first_name;
    let lastName = enData.find(
      (ch: any) => ch.character_id === obj.id
    ).last_name;
    return (
      <div
        className={styles.barContainer}
        style={{
          width: isMobile ? "100%" : `${WIDTH}%`,
          height: isMobile ? `${WIDTH}%` : "100%",
        }}
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
            width: `${isMobile ? HEIGHT : 100}%`,
            height: `${isMobile ? 100 : HEIGHT}%`,
            padding: 5,
          }}
        >
          {obj.count} responses
        </div>
      </div>
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

    countArray = countArray.length > 5 ? countArray.slice(0, 5) : countArray;

    return (
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
        {countArray.map((obj) => (
          <WordOccurenceBar
            key={obj.id}
            obj={obj}
            width={countArray.length}
            maxHeight={countArray[0].count}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.wordOccurences}>
      <h2>comparing words</h2>
      <p>
        there were some words that kept coming up when i was reading through the
        responses. i wrote some code to analyze where these words occur the
        most. keep in mind that this only analyzes the responses for most
        desirable, as i found more common word trends in this responses compared
        to responses for least desirable
      </p>
      <div className={styles.wordOccurenceSection}>
        <h3>malewife</h3>
        <p>
          these are the characters who were referred to as a{" "}
          <Strong>&quot;malewife&quot;</Strong> the most often.
        </p>
        <p className={styles.subtext}>
          phrases i searched for: &quot;malewife&quot;, &quot;male wife&quot;
        </p>
      </div>

      <WordOccurenceGraph words={["malewife", "male wife"]} />
      <div className={styles.wordOccurenceSection}>
        <h3>babygirl</h3>
        <p>
          these are the characters who were referred to as a{" "}
          <Strong>&quot;babygirl&quot;</Strong> the most often.
        </p>
        <p className={styles.subtext}>
          phrases i searched for: &quot;babygirl&quot;, &quot;baby girl&quot;,
          &quot;bbygirl&quot;, &quot;bbygrl&quot;, &quot;bbg&quot;,
          &quot;bbgorl&quot;
        </p>
      </div>

      <WordOccurenceGraph
        words={["babygirl", "baby girl", "bbygirl", "bbygrl", "bbg", "bbgorl"]}
      />
      <div className={styles.wordOccurenceSection}>
        <h3>lesbian and sapphic</h3>
        <p>
          these characters&apos; responses contained the most references to{" "}
          <Strong>lesbianism and being sapphic</Strong>.
        </p>
        <p className={styles.subtext}>
          phrases i searched for: &quot;lesbian&quot;, &quot;lesbianism&quot;,
          &quot;sapphic&quot;
        </p>
      </div>

      <WordOccurenceGraph words={["lesbian", "lesbianism", "sapphic"]} />
      <div className={styles.wordOccurenceSection}>
        <h3>wife</h3>
        <p>
          you guys considered these characters to be{" "}
          <Strong>wife material</Strong> rather than husband material (so true).
        </p>
      </div>

      <WordOccurenceGraph words={[" wife "]} />
    </div>
  );
}
