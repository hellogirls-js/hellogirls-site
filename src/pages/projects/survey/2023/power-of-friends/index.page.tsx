import { useContext } from "react";
import { useListState } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, Variants, motion } from "framer-motion";

import styles from "../styles/main.module.scss";
import PageHeader from "../components/PageHeader";

import getData, { countVotes } from "component/utility/data";
import { DarkModeContext } from "context/DarkModeContext";
import DataLayout from "component/DataLayout";
import Select from "component/utility/Select";

export default function SurveyPowerOfFriends(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  const [selectedUnits, unitHandlers] = useListState<number>([]);

  const charaData = props.enData.data;
  const rawData = props.rawData.data;
  const unitData = props.unitData.data;

  const onChange = (item: string) => {
    if (selectedUnits.length < 6) {
      unitHandlers.append(parseInt(item));
    }
  };

  const countedVotes = countVotes("fave_chara");

  function addUnitVotes(unitId: number) {
    const charasInUnit = rawData
      .filter((chara: any) => chara.unit.includes(unitId))
      .map((chara: any) => chara.character_id);

    const charasInUnitVoteCount = countedVotes.filter((charaVote) =>
      charasInUnit.includes(charaVote.chara_id),
    );

    console.log("unit vote arr =>", charasInUnitVoteCount);

    let sum = 0;
    charasInUnitVoteCount.forEach((chara) => (sum += chara.count));

    return sum;
  }

  const containerVariant: Variants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  const itemVariant: Variants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: -100,
    },
  };

  function getTextColor(hex: string): string {
    let resultString = "black";
    let rgbRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (rgbRegex) {
      const rgb = {
        r: parseInt(rgbRegex[1], 16),
        g: parseInt(rgbRegex[2], 16),
        b: parseInt(rgbRegex[3], 16),
      };

      const { r, g, b } = rgb;

      if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
        resultString = "#2f267e";
      } else {
        resultString = "white";
      }
    }

    return resultString;
  }

  return (
    <DataLayout pageTitle="power of friends">
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.powerOfFriendsContainer}>
          <PageHeader title="power of friends" />
          <div className={styles.contentContainer}>
            <p>
              use this tool to view how popular each character in a unit is all
              together! the results may or may not be shocking... (up to six
              bars can be placed on the graph)
            </p>
            <Select
              data={unitData.map((unit: any) => {
                return {
                  name: unit.name,
                  value: unit.id,
                  disabled:
                    selectedUnits.length === 6 ||
                    selectedUnits.includes(unit.id),
                };
              })}
              placeholder="select a unit"
              temporary
              onChange={onChange}
            />
            <div className={styles.graphContainer}>
              {selectedUnits.map((unitId, index) => {
                const charasInUnit = rawData
                  .filter((chara: any) => chara.unit.includes(unitId))
                  .map((chara: any) => chara.character_id);
                console.log("charasInUnit", charasInUnit);
                return (
                  <motion.div
                    className={styles.barContainer}
                    key={unitId}
                    variants={containerVariant}
                    initial="hidden"
                    animate="visible"
                  >
                    <div
                      style={{
                        width: "100%",
                        position: "absolute",
                        bottom: "-10%",
                      }}
                    >
                      <div className={styles.barLabel}>
                        {unitData
                          .filter((unit: any) => unit.id === unitId)[0]
                          .name.toLowerCase()}{" "}
                        <div
                          style={{ height: 16, cursor: "pointer" }}
                          onClick={() => {
                            unitHandlers.remove(index);
                          }}
                        >
                          <IconX size={16} />
                        </div>
                      </div>
                      <div
                        className={styles.barLabelSubtext}
                        style={{ fontSize: "0.8rem", marginBottom: 5 }}
                      >
                        {addUnitVotes(unitId)} total votes
                      </div>
                    </div>
                    {charasInUnit.map((charaId: number) => {
                      const color = rawData.filter(
                        (chara: any) => chara.character_id === charaId,
                      )[0].image_color;
                      const voteCount = countedVotes.filter(
                        (chara) => chara.chara_id === charaId,
                      )[0].count;
                      const charaName = charaData.filter(
                        (chara: any) => chara.character_id === charaId,
                      )[0].first_name;
                      return (
                        <AnimatePresence key={charaId}>
                          <motion.div
                            className={styles.barSection}
                            style={{
                              backgroundColor: color,
                              height: `${(voteCount / 200) * 100}%`,
                              boxSizing: "border-box",
                              padding: "2%",
                            }}
                            variants={itemVariant}
                          >
                            <div className={styles.barIndvLabel}>
                              <strong>{charaName}:</strong> {voteCount} votes
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      );
                    })}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DataLayout>
  );
}

export async function getServerSideProps() {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const DATA_URL = "https://data.ensemble.moe/ja/characters.json";
  const TL_UNIT_DATA = "https://tl.data.ensemble.moe/en/units.json";

  const enData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);
  const unitData = await getData(TL_UNIT_DATA);

  return {
    props: {
      enData,
      rawData,
      unitData,
      title: "power of friends | enstars popularity survey results 2023",
      description:
        "stack the votes for each character in a unit on top of each other to see which unit has the most popular characters overall.",
    },
  };
}
