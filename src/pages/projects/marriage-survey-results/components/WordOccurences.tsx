import { useListState, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IconX } from "@tabler/icons-react";

import styles from "../../styles/Survey.module.scss";
import leastDesirable from "../../../../../data/survey-results/least_desirable.json";
import mostDesirable from "../../../../../data/survey-results/most_desirable.json";

import { twoStarIDs } from "data/twoStarIds";
import Strong from "component/utility/Strong";
import TextInput from "component/utility/TextInput";
import Button from "component/utility/Button";
import Switch from "component/utility/Switch";

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
  let isMobile = useMediaQuery("(max-width: 812px)");
  let isTablet = useMediaQuery("(min-width: 812px) and (max-width: 1120px)");
  const [wordArray, handlers] = useListState<string>([]);
  const [customData, setCustomData] = useState<Result[]>(mostDesirable);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    console.log(checked);
    if (checked) {
      setCustomData(leastDesirable);
    } else {
      setCustomData(mostDesirable);
    }
  }, [checked]);

  /**
   *
   * @param {{id: number; count: number}} obj the count object
   * @param {number} width the number of bars
   * @param {number} maxHeight the max height of an element
   * @param {boolean} animate? whether to animate the element or not
   * @returns {JSX.Element} a JSX element
   */
  function WordOccurenceBar({
    obj,
    width,
    maxHeight,
    animate = true,
  }: {
    obj: { id: number; count: number };
    width: number;
    maxHeight: number;
    animate?: boolean;
  }) {
    const WIDTH = 100 / width - 8;
    const HEIGHT = (obj.count / maxHeight) * 70;
    const IMAGE_WIDTH = 400;

    let imgUrl = `https://assets.enstars.link/assets/card_full1_${
      (twoStarIDs as any)[obj.id]
    }_normal.png`;
    let firstName =
      enData.find((ch: any) => ch.character_id === obj.id)?.first_name &&
      enData.find((ch: any) => ch.character_id === obj.id)?.first_name !==
        undefined
        ? enData
            .find((ch: any) => ch.character_id === obj.id)
            .first_name.toLowerCase()
        : obj.id === 61
        ? "seiya"
        : obj.id === 0
        ? "anzu"
        : obj.id === -1
        ? "kaname"
        : "";
    let lastName =
      enData.find((ch: any) => ch.character_id === obj.id)?.last_name &&
      enData.find((ch: any) => ch.character_id === obj.id)?.last_name !==
        undefined
        ? enData
            .find((ch: any) => ch.character_id === obj.id)
            .last_name.toLowerCase()
        : obj.id === 61
        ? "hidaka"
        : obj.id === -1
        ? "tojo"
        : "";
    return (
      <motion.div
        className={styles.barContainer}
        style={{
          width: isMobile ? "100%" : `${WIDTH}%`,
          height: isMobile ? `${WIDTH}%` : "100%",
        }}
        initial={
          animate
            ? {
                opacity: 0,
                x: isMobile ? -100 : 0,
                y: isMobile ? 0 : 200,
              }
            : undefined
        }
        whileInView={
          animate
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.5 },
              }
            : undefined
        }
        viewport={animate ? { once: true, amount: 0.8 } : undefined}
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
   * the base graph
   * @param {string[]} words the given words
   * @param {boolean} animate? whether to animate the bars. defaults to true
   * @returns {JSX.Element} a graph
   */
  function BaseGraph({
    words,
    dataType = mostDesirable,
    animate = true,
  }: {
    words: string[];
    dataType?: Result[];
    animate?: boolean;
  }) {
    let countArray: { id: number; count: number }[] = [];
    let filteredResults: Result[] = [];
    words.forEach((word) => {
      let filteredArray: Result[] = dataType.filter((d: Result) =>
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

    function Empty() {
      return <div className={styles.empty}>no responses :(</div>;
    }
    return splitArray.length ? (
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
              animate={animate}
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
                  : c.id === 0
                  ? "anzu"
                  : c.id === -1
                  ? "kaname"
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
    ) : (
      <Empty />
    );
  }

  /**
   * the graph including the graph description and title
   * @param {string} title title of the graph
   * @param {string[]} words the words you want to look for
   * @param {any} children children, description of the graph
   * @returns JSX element
   */
  function WordOccurenceGraph({
    title,
    words,
    dataType = mostDesirable,
    children,
  }: {
    title: string;
    words: string[];
    dataType?: Result[];
    children: any;
  }) {
    return (
      <div>
        <MotionParagraph title={title}>
          {children}
          <p className={styles.subtext}>
            phrases i searched for:{" "}
            {words.map((word, i) =>
              i < words.length - 1 ? (
                <span key={word}>&quot;{word}&quot;, </span>
              ) : (
                <span key={word}>&quot;{word}&quot;</span>
              )
            )}
          </p>
        </MotionParagraph>
        <BaseGraph words={words} dataType={dataType} />
      </div>
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
          transition: { duration: 0.5, delay: 0.1 },
        }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h3>{title}</h3>
        {children}
      </motion.div>
    );
  }

  function WordInput() {
    let inputRef = useRef<HTMLInputElement | null>(null);

    return (
      <div className={styles.inputSection}>
        <div className={styles.inputRow}>
          <TextInput
            ref={inputRef}
            id="input-word"
            placeholder="input word or phrase"
          />
          <Button
            value="add phrase"
            onClick={(e) => {
              let val = (
                document.getElementById("input-word") as HTMLInputElement
              ).value;
              if (val && val.length > 0) {
                handlers.append(val);
              }
            }}
          />
          <Switch
            leftLabel="most desirable"
            rightLabel="least desirable"
            checked={checked}
            onClick={setChecked}
          />
        </div>
        <div className={styles.givenWords}>
          <span className={styles.givenWordsTitle}>chosen words: </span>{" "}
          {wordArray.map((word, i) => (
            <span key={word} className={styles.givenWord}>
              {word}{" "}
              <span
                onClick={() => {
                  handlers.remove(i);
                }}
                className={styles.x}
              >
                <IconX size={14} strokeWidth={3} />
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.wordOccurences}
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
    >
      <h2 id="occurences">comparing words</h2>
      <p>
        there were some words that kept coming up when i was reading through the
        responses. i wrote some code to analyze where these words occur the
        most. the units for these charts is based on the number of responses
        found that contain these phrases.
      </p>

      <h2 id="md-occurences">most desirable occurences</h2>
      <WordOccurenceGraph title="malewife" words={["malewife", "male wife"]}>
        <p>
          these are the characters who were referred to as a{" "}
          <Strong>&quot;malewife&quot;</Strong> the most often.
        </p>
      </WordOccurenceGraph>

      <WordOccurenceGraph
        title="babygirl"
        words={["babygirl", "baby girl", "bbygirl", "bbygrl", "bbg", "bbgorl"]}
      >
        <p>
          these are the characters who were referred to as a{" "}
          <Strong>&quot;babygirl&quot;</Strong> the most often.
        </p>
      </WordOccurenceGraph>

      <WordOccurenceGraph
        title="lesbianism & being sapphic"
        words={["lesbian", "lesbianism", "sapphic", "wlw"]}
      >
        <p>
          these characters&apos; responses contained the most references to{" "}
          <Strong>lesbianism and being sapphic</Strong>.
        </p>
      </WordOccurenceGraph>

      <WordOccurenceGraph
        title="wife & girlfriend"
        words={[" wife", " wife.", " wife,", "girlfriend", " gf "]}
      >
        <p>
          you guys considered these characters to be{" "}
          <Strong>wife material</Strong> rather than husband material (so true).
        </p>
      </WordOccurenceGraph>

      <WordOccurenceGraph
        title="neurodivergency"
        words={["autism", "autistic", "adhd", "neurodivergent", " nd"]}
      >
        <p>
          these characters got the most responses referencing{" "}
          <Strong>neurodivergency</Strong> as a factor when choosing who&apos;s
          the most desirable.
        </p>
      </WordOccurenceGraph>

      <WordOccurenceGraph
        title="normalness & stabiltiy"
        words={[
          " normal",
          " stable",
          " sane",
          "some guy",
          "just some guy",
          "just a guy",
        ]}
      >
        <p>
          these characters had the most references to{" "}
          <Strong>being normal</Strong> when analyzing what makes them
          desirable.
        </p>
      </WordOccurenceGraph>

      <WordOccurenceGraph
        title="physical appearance"
        words={[
          "pretty",
          "beautiful",
          "prettier",
          "attractive",
          "attracted",
          " hot",
          "handsome",
          "sexy",
        ]}
      >
        <p>
          these characters have a strong <Strong>physical appearance</Strong>{" "}
          when it comes to the majority of responses.
        </p>
      </WordOccurenceGraph>

      <h2 id="ld-occurences">least desirable occurences</h2>
      <p>
        if you are sensitive to character criticism or seeing your favorite
        here, i recommend turning back now.
      </p>

      <WordOccurenceGraph
        title="mental stability"
        words={[
          "crazy",
          "mental illness",
          "mentally ill",
          "insane",
          "insanity",
          "mental",
          "depression",
          "depressed",
        ]}
        dataType={leastDesirable}
      >
        <p>
          the <Strong>mental status</Strong> of these characters stood out as
          unappealing for many responders.
        </p>
      </WordOccurenceGraph>

      <WordOccurenceGraph
        title="physical unattractiveness"
        words={["ugly", "unattractive", "hideous"]}
        dataType={leastDesirable}
      >
        <p>
          many people have pointed to these characters&apos;{" "}
          <Strong>unappealing looks</Strong> for a reason to not marry them.
        </p>
      </WordOccurenceGraph>

      <WordOccurenceGraph
        title="clash in sexuality"
        words={["gay", "lesbian"]}
        dataType={leastDesirable}
      >
        <p>
          responders deemed these characters as undesirable due to{" "}
          <Strong>differences in sexuality</Strong>.
        </p>
      </WordOccurenceGraph>

      <WordOccurenceGraph
        title="no homewrecking!"
        words={["married", "homewrecker"]}
        dataType={leastDesirable}
      >
        <p>
          according to you guys, these characters are{" "}
          <Strong>already married</Strong> and are therefore emotionally
          unavailable.
        </p>
      </WordOccurenceGraph>

      <MotionParagraph title="try it yourself">
        <p>
          input words or phrases to see which characters have responses that
          contain those words or phrases.
        </p>
      </MotionParagraph>
      <WordInput />
      <BaseGraph words={wordArray} animate={false} dataType={customData} />
    </motion.div>
  );
}
