import Image from "next/image";
import { useContext, useState } from "react";
import emojiRegex from "emoji-regex";
import ReactWordCloud from "react-wordcloud";

import styles from "../../styles/Survey.module.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import mostDesirable from "data/survey-results/most_desirable.min.json";
import leastDesirable from "data/survey-results/least_desirable.min.json";
import Tabs from "component/utility/Tabs";
import { twoStarIDs } from "data/twoStarIds";
import { commonWords } from "data/commonWords";
import Tooltip from "component/utility/Tooltip";
import { DarkModeContext } from "context/DarkModeContext";

export default function WordCloud({
  rawData,
  enData,
}: {
  rawData: any;
  enData: any;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  /**
   * @param {Result[]} data the data for the word cloud
   * @returns {JSX.Element} a JSX element containing the word cloud
   */
  function WordCloudContent({ data }: { data: Result[] }) {
    const [activeChara, setActiveChara] = useState<number | null>(null);
    const ASPECT_RATIO = 1.775;

    /**
     * @param {number} id the character id
     * @returns {JSX.Element} a JSX element containing the character icon to click on
     */
    function CharacterIcon({ id }: { id: number }) {
      const IMAGE_WIDTH = 450;
      const imgUrl = `https://assets.enstars.link/assets/card_full1_${
        (twoStarIDs as any)[id]
      }_normal.png`;
      const firstName = enData.find(
        (c: any) => c.character_id === id
      ).first_name;
      const lastName =
        enData.find((c: any) => c.character_id === id).last_name || "";

      return (
        <Tooltip
          label={`${firstName.toLowerCase()} ${lastName.toLowerCase()}`}
          position="top"
        >
          <div
            className={`${styles.icon} ${
              activeChara === id ? styles.activeIcon : styles.inactiveIcon
            }`}
            onClick={() => setActiveChara(id)}
          >
            {
              <Image
                className={styles.iconImage}
                src={imgUrl}
                alt={`${firstName} ${lastName}`}
                width={IMAGE_WIDTH}
                height={IMAGE_WIDTH / ASPECT_RATIO}
              />
            }
          </div>
        </Tooltip>
      );
    }

    /**
     * @param {number} id the character id to retreive data for
     * @param {Result[]} data data to retrieve from
     * @returns {string[]} an array of separated words
     */
    function generateWordList(id: number, data: Result[]): string[] {
      const emoji = emojiRegex();
      const firstName = enData.find(
        (c: any) => c.character_id === id
      ).first_name;
      const lastName =
        enData.find((c: any) => c.character_id === id).last_name || "";
      let filteredData = data.filter((d) => d.id === id);
      let responses = filteredData
        .map((d) => d.reason)
        .join(" ")
        .toLowerCase();
      responses = responses.replace(/[|&;$%@"-?–\[\]<>()+,'!“”‘’.]/g, "");
      responses = responses.replace(/\n/g, " ");
      responses = responses.replace(emoji, "");
      let splitResponses = responses.split(" ");
      splitResponses = splitResponses
        .filter((word) => !commonWords.includes(word))
        .filter(
          (word) =>
            word !== firstName.toLowerCase() && word !== lastName.toLowerCase()
        );
      return splitResponses;
    }

    function GenerateWordCloud({ id, data }: { id: number; data: Result[] }) {
      console.log(colorTheme);
      const LIGHT_COLORS: string[] = [
        "#635caf",
        "#5b5599",
        "#2f267e",
        "#7d8534",
        "#b8c543",
        "#6b65a8",
        "#b5aef0",
        "#7c73ce",
        "#a0ad28",
      ];

      const DARK_COLORS: string[] = [
        "#c1bbfa",
        "#f3f1ff",
        "#cfc8fa",
        "#b4c044",
        "#97a047",
        "#c2bdf5",
        "#ddd9ff",
        "#cdd95f",
      ];

      let listOfWords = generateWordList(id, data);
      // count all of the words
      let countArr: { text: string; value: number }[] = [];
      listOfWords.forEach((w) => {
        // if the word exists
        if (countArr.find((e) => e.text === w)) {
          let i = countArr.findIndex((e) => e.text === w);
          countArr[i].value++;
        } else {
          let obj = { text: w, value: 1 };
          countArr.push(obj);
        }
      });

      // shuffle the array
      let currIndex = countArr.length,
        randomIndex;
      while (currIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currIndex);
        currIndex--;
        [countArr[currIndex], countArr[randomIndex]] = [
          countArr[randomIndex],
          countArr[currIndex],
        ];
      }

      return (
        <div className={styles.cloudComponent}>
          <ReactWordCloud
            words={countArr}
            options={{
              colors: colorTheme === "light" ? LIGHT_COLORS : DARK_COLORS,
              fontFamily: "'Inter', sans-serif",
              fontSizes: [20, 85],
              rotationAngles: [0, 30],
              rotations: 0,
              deterministic: true,
              enableTooltip: false,
              padding: 5,
            }}
          />
        </div>
      );
    }

    function CharacterInfo({ id }: { id: number }) {
      const firstName = enData.find(
        (c: any) => c.character_id === id
      ).first_name;
      const lastName =
        enData.find((c: any) => c.character_id === id).last_name || "";
      return (
        <div className={styles.charaInfo}>
          <div className={styles.charaName}>
            {firstName.toLowerCase()} {lastName.toLowerCase()}
          </div>
        </div>
      );
    }

    // get unique ids
    const idArray = data
      .map((d) => d.id)
      .filter((v) => v !== -1 && v !== 61 && v !== 0)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a - b);

    return (
      <div className={styles.wordCloudContainer}>
        <h3>select a character</h3>
        <div className={styles.iconsContainer}>
          {idArray.map(
            (id) =>
              (twoStarIDs as any)[id] &&
              (twoStarIDs as any)[id] !== undefined && (
                <CharacterIcon key={id} id={id} />
              )
          )}
        </div>
        {activeChara && <CharacterInfo id={activeChara} />}
        <div className={styles.cloud}>
          {activeChara && <GenerateWordCloud id={activeChara} data={data} />}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wordCloud}>
      <h2 id="cloud">word cloud</h2>
      <p>
        to further analyze the words that appeared the most often in
        people&apos;s responses, i decided to create some <q>word clouds</q> for
        each character. the reason why <q>word clouds</q> is in quotes is
        because i don&apos;t really know how to make a proper word cloud, so
        i&apos;ll only analyze frequency by font size and text color.
      </p>
      <Tabs
        content={[
          {
            value: "most",
            name: "most desirable",
            content: <WordCloudContent data={mostDesirable} />,
          },
          {
            value: "least",
            name: "least desirable",
            content: <WordCloudContent data={leastDesirable} />,
          },
        ]}
        defaultValue="most"
      />
    </div>
  );
}
