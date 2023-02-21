import Image from "next/image";
import { useState } from "react";

import styles from "../../styles/Survey.module.scss";
import mostDesirable from "../../../../../data/survey-results/most_desirable.json";
import leastDesirable from "../../../../../data/survey-results/least_desirable.json";

import Tabs from "component/utility/Tabs";
import { twoStarIDs } from "data/twoStarIds";
import Tooltip from "component/utility/Tooltip";

export default function WordCloud({
  rawData,
  enData,
}: {
  rawData: any;
  enData: any;
}) {
  /**
   * @param {Result[]} data the data for the word cloud
   * @returns {JSX.Element} a JSX element containing the word cloud
   */
  function WordCloudContent({ data }: { data: Result[] }) {
    const [activeChara, setActiveChara] = useState<number | null>(null);

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
          <div className={styles.icon} onClick={() => setActiveChara(id)}>
            {
              <Image
                className={styles.iconImage}
                src={imgUrl}
                alt={`${firstName} ${lastName}`}
                width={IMAGE_WIDTH}
                height={IMAGE_WIDTH / 1.775}
              />
            }
          </div>
        </Tooltip>
      );
    }

    /**
     * @param {number} id the character id to retreive data for
     * @param {Result[]} data data to retrieve from
     * @returns {string} a string of flattened responses
     */
    function flattenResponseContent(id: number, data: Result[]): string {
      let filteredData = data.filter((d) => d.id === id);
      let responses = filteredData.map((d) => d.reason).join(" ");
      responses = responses.replace(/[|&;$%@"<>()+,'!.]/g, "");
      return responses;
    }

    activeChara && flattenResponseContent(activeChara, data);

    function CharacterInfo({ id }: { id: number }) {
      const imgUrl = `https://assets.enstars.link/assets/card_full1_${
        (twoStarIDs as any)[id]
      }_normal.png`;
      const firstName = enData.find(
        (c: any) => c.character_id === id
      ).first_name;
      const lastName =
        enData.find((c: any) => c.character_id === id).last_name || "";

      return (
        <div className={styles.charaInfo}>
          <span className={styles.charaName}>
            {firstName} {lastName}
          </span>
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
        <div className={styles.wordCloud}>{activeChara}</div>
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
