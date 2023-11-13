import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import TypeIt from "typeit-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ReferenceLine,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { useListState, useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import Image from "next/image";

import styles from "../styles/main.module.scss";
import PageHeader from "../components/PageHeader";

import DataLayout from "component/DataLayout";
import getData, {
  countVotes,
  getSurveyResponses,
} from "component/utility/data";
import { DarkModeContext } from "context/DarkModeContext";
import Select from "component/utility/Select";
import { twoStarIDs } from "data/twoStarIds";

const LIGHT_PIE_COLORS = ["#7d8534", "#b5afcf"];
const DARK_PIE_COLORS = ["#b4c044", "#c1bbfa"];

function PopularVoteIntro({
  selectData,
  userChoice,
  setUserChoice,
}: {
  selectData: any[];
  setUserChoice: Dispatch<any>;
  userChoice: any | null;
}) {
  const [showSelect, setShowSelect] = useState(false);

  return (
    <>
      <TypeIt
        element={"p"}
        options={{
          speed: 20,
          afterComplete: () => {
            setShowSelect(true);
          },
        }}
        getBeforeInit={(instance) => {
          instance
            .type("hey there!")
            .pause(400)
            .break()
            .type(
              "so you're interested in seeing who everyone thought the most popular characters are.",
            )
            .pause(400)
            .break()
            .type("now remind me, ")
            .pause(150)
            .type("who do you think the most popular character is?");

          return instance;
        }}
      />
      {showSelect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          style={{ marginTop: "2vh" }}
        >
          <Select
            placeholder="select a character"
            onChange={setUserChoice}
            data={selectData.map((dataPoint) => {
              return {
                value: dataPoint.character_id,
                name: `${dataPoint.first_name.toLowerCase()}${
                  dataPoint.last_name
                    ? ` ${dataPoint.last_name.toLowerCase()}`
                    : ""
                }`,
              };
            })}
          />
        </motion.div>
      )}
    </>
  );
}

function PopularVoteReiChosen({
  reiData,
  faveVotes,
  assumedVotes,
  setFinished,
}: {
  reiData: any;
  faveVotes: CountedVotes;
  assumedVotes: CountedVotes;
  setFinished: Dispatch<SetStateAction<boolean>>;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  const isMobile = useMediaQuery("(max-width: 812px)");
  const allResponses = getSurveyResponses();

  const [firstSectionDone, setFirstSectionDone] = useState(false);

  const assumedData = [
    {
      name: "rei",
      count: assumedVotes.count,
    },
    {
      name: "others",
      count: allResponses.length - assumedVotes.count,
    },
  ];

  const faveData = [
    {
      name: "rei",
      count: faveVotes.count,
    },
    {
      name: "others",
      count: allResponses.length - faveVotes.count,
    },
  ];

  return (
    <>
      <div className={styles.popularVoteSplitContainer}>
        <TypeIt
          element={"p"}
          options={{
            speed: 20,
            cursor: false,
            afterComplete: (instance: any) => {
              setFirstSectionDone(true);
            },
          }}
          getBeforeInit={(instance) => {
            instance
              .type("you're definitely not alone! ")
              .pause(50)
              .type("in fact, ")
              .pause(50)
              .type(
                `${Math.round(
                  (assumedVotes.count / allResponses.length) * 100,
                )}% of responders also assumed rei to be the most popular character. `,
              )
              .pause(100)
              .type(
                "now, when we see how many people actually claimed him to be their favorite character, ",
              )
              .pause(50)
              .type("we can see that he has--")
              .go();

            return instance;
          }}
          style={{ flexGrow: 1 }}
        />
        <motion.div
          className={styles.popularVoteGraphContainer}
          style={{
            flexBasis: isMobile ? 300 : 600,
            flexShrink: 0,
            margin: "auto",
          }}
        >
          <PieChart width={300} height={300} style={{ margin: "auto" }}>
            <Pie data={assumedData} dataKey="count" label>
              <LabelList dataKey="name" fill="#fff" stroke="none" />
              {assumedData.map((point, index) => (
                <Cell
                  key={index}
                  fill={
                    colorTheme === "light"
                      ? LIGHT_PIE_COLORS[index]
                      : DARK_PIE_COLORS[index]
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </motion.div>
      </div>
      {firstSectionDone && (
        <div className={styles.popularVoteSplitContainer}>
          <motion.div
            className={styles.popularVoteGraphContainer}
            style={{
              flexBasis: isMobile ? 300 : 600,
              flexShrink: 0,
              margin: "auto",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
          >
            <PieChart width={300} height={300}>
              <Pie data={faveData} dataKey="count" label>
                <LabelList dataKey="name" fill="#fff" stroke="none" />
                {faveData.map((point, index) => (
                  <Cell
                    key={index}
                    fill={
                      colorTheme === "light"
                        ? LIGHT_PIE_COLORS[index]
                        : DARK_PIE_COLORS[index]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </motion.div>
          <TypeIt
            element="p"
            options={{
              speed: 20,
              cursor: false,
              afterComplete: () => {
                setFinished(true);
              },
            }}
            style={{ flexGrow: 1 }}
            getBeforeInit={(instance) => {
              instance
                .type("--only 2% of votes?! ")
                .pause(100)
                .type("that's a stark contrast! ")
                .pause(100)
                .type("in fact, ")
                .pause(50)
                .type(
                  `rei only received ${faveVotes.count} votes out of ${allResponses.length} responses.`,
                );

              return instance;
            }}
          />
        </div>
      )}
    </>
  );
}

function PopularVoteNotRei({
  chosenCharaData,
  chosenCharaAssumedVotes,
  chosenCharaActualVotes,
  reiData,
  reiAssumedVotes,
  reiActualVotes,
  setFinished,
}: {
  chosenCharaData: any;
  chosenCharaAssumedVotes?: CountedVotes;
  chosenCharaActualVotes: CountedVotes;
  reiData: any;
  reiAssumedVotes: CountedVotes;
  reiActualVotes: CountedVotes;
  setFinished: Dispatch<SetStateAction<boolean>>;
}) {
  const isMobile = useMediaQuery("(max-width: 812px)");
  const { colorTheme } = useContext(DarkModeContext);

  const [finishedFirstSection, setFinishedFirstSection] = useState(false);
  const [finishedSecondSection, setFinishedSecondSection] = useState(false);

  const allResponses = getSurveyResponses();

  const chosenCharaAssumedPieData = [
    {
      name: chosenCharaData.first_name.toLowerCase(),
      count: chosenCharaAssumedVotes ? chosenCharaAssumedVotes.count : 0,
    },
    {
      name: "others",
      count: chosenCharaAssumedVotes
        ? allResponses.length - chosenCharaAssumedVotes.count
        : allResponses.length,
    },
  ];

  const reiAssumedPieData = [
    {
      name: "rei",
      count: reiAssumedVotes.count,
    },
    {
      name: "others",
      count: allResponses.length - reiAssumedVotes.count,
    },
  ];

  const reiActualPieData = [
    {
      name: "rei",
      count: reiActualVotes.count,
    },
    {
      name: "others",
      count: allResponses.length - reiActualVotes.count,
    },
  ];

  return (
    <>
      <div className={styles.popularVoteSplitContainer}>
        <TypeIt
          element="p"
          options={{
            speed: 20,
            cursor: false,
            afterComplete: (instance: any) => {
              setFinishedFirstSection(true);
            },
          }}
          style={{ flexGrow: 1 }}
          getBeforeInit={(instance) => {
            instance
              .type(
                !chosenCharaAssumedVotes || chosenCharaAssumedVotes.count < 20
                  ? "...interesting! "
                  : chosenCharaAssumedVotes.count > 20 &&
                    chosenCharaAssumedVotes.count < 100
                  ? "i can see that! "
                  : "i see where you're coming from! ",
              )
              .pause(100)
              .type(
                `${
                  chosenCharaAssumedVotes ? chosenCharaAssumedVotes.count : 0
                } people${
                  chosenCharaAssumedVotes ? " also" : ""
                } assumed ${chosenCharaData.first_name.toLowerCase()} would be the most popular character. `,
              )
              .pause(100)
              .type(
                `that's ${Math.round(
                  ((chosenCharaAssumedVotes
                    ? chosenCharaAssumedVotes.count
                    : 0) /
                    allResponses.length) *
                    100,
                )}% of responders!`,
              );
            return instance;
          }}
        />
        <motion.div
          className={styles.popularVoteGraphContainer}
          style={{
            flexBasis: isMobile ? 300 : 600,
            flexShrink: 0,
            margin: "auto",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          <PieChart
            width={isMobile ? 300 : 400}
            height={300}
            style={{ margin: "auto" }}
          >
            <Pie data={chosenCharaAssumedPieData} dataKey="count" label>
              <LabelList dataKey="name" fill="#fff" stroke="none" />
              {chosenCharaAssumedPieData.map((point, index) => (
                <Cell
                  key={index}
                  fill={
                    colorTheme === "light"
                      ? LIGHT_PIE_COLORS[index]
                      : DARK_PIE_COLORS[index]
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </motion.div>
      </div>
      {finishedFirstSection && (
        <motion.div
          className={styles.popularVoteSplitContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          <TypeIt
            element={"p"}
            options={{
              speed: 20,
              cursor: false,
              afterComplete: (instance: any) => {
                setFinishedSecondSection(true);
              },
            }}
            getBeforeInit={(instance) => {
              instance
                .type("meanwhile, ")
                .pause(50)
                .type(
                  `${Math.round(
                    (reiAssumedVotes.count / allResponses.length) * 100,
                  )}% of responders assumed rei to be the most popular character. `,
                )
                .pause(100)
                .type(
                  "now, when we see how many people actually claimed him to be their favorite character, ",
                )
                .pause(50)
                .type("we can see that he has--")
                .go();

              return instance;
            }}
            style={{ flexGrow: 1 }}
          />
          <motion.div
            className={styles.popularVoteGraphContainer}
            style={{
              flexBasis: isMobile ? 300 : 600,
              flexShrink: 0,
              margin: "auto",
            }}
          >
            <PieChart
              width={isMobile ? 300 : 400}
              height={300}
              style={{ margin: "auto" }}
            >
              <Pie data={reiAssumedPieData} dataKey="count" label>
                <LabelList dataKey="name" fill="#fff" stroke="none" />
                {reiAssumedPieData.map((point, index) => (
                  <Cell
                    key={index}
                    fill={
                      colorTheme === "light"
                        ? LIGHT_PIE_COLORS[index]
                        : DARK_PIE_COLORS[index]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </motion.div>
        </motion.div>
      )}
      {finishedSecondSection && (
        <motion.div
          className={styles.popularVoteSplitContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          <motion.div
            className={styles.popularVoteGraphContainer}
            style={{
              flexBasis: isMobile ? 300 : 600,
              flexShrink: 0,
              margin: "auto",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
          >
            <PieChart width={300} height={300}>
              <Pie data={reiActualPieData} dataKey="count" label>
                <LabelList dataKey="name" fill="#fff" stroke="none" />
                {reiActualPieData.map((point, index) => (
                  <Cell
                    key={index}
                    fill={
                      colorTheme === "light"
                        ? LIGHT_PIE_COLORS[index]
                        : DARK_PIE_COLORS[index]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </motion.div>
          <TypeIt
            element="p"
            options={{
              speed: 20,
              cursor: false,
              afterComplete: () => {
                setFinished(true);
              },
            }}
            style={{ flexGrow: 1 }}
            getBeforeInit={(instance) => {
              instance
                .type("--only 2% of votes?! ")
                .pause(100)
                .type("that's a stark contrast! ")
                .pause(100)
                .type("in fact, ")
                .pause(50)
                .type(
                  `rei only received ${reiActualVotes.count} votes out of ${allResponses.length} responses.`,
                );

              return instance;
            }}
          />
        </motion.div>
      )}
    </>
  );
}

function PopularVoteUnit({
  assumedVotes,
  actualVotes,
  setFinished,
}: {
  assumedVotes: CountedVotes[];
  actualVotes: CountedVotes[];
  setFinished: Dispatch<SetStateAction<boolean>>;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  const isMobile = useMediaQuery("(max-width: 812px)");

  const allResponses = getSurveyResponses();
  const sortedAssumedVotes = assumedVotes.sort((a, b) => b.count - a.count);

  const knightsAssumed = sortedAssumedVotes[0];
  const knightsActual = actualVotes.filter(
    (unit) => unit.chara_id === knightsAssumed.chara_id,
  )[0];

  const knightsAssumedPieData = [
    {
      name: "knights",
      count: knightsAssumed.count,
    },
    {
      name: "other",
      count: allResponses.length - knightsAssumed.count,
    },
  ];

  const knightsActualPieData = [
    {
      name: "knights",
      count: knightsActual.count,
    },
    {
      name: "other",
      count: allResponses.length - knightsActual.count,
    },
  ];

  return (
    <>
      <div className={styles.popularVoteSplitContainer}>
        <div
          className={styles.popularVoteGraphContainer}
          style={{ flexBasis: "50%" }}
        >
          <strong style={{ textAlign: "center", margin: "auto" }}>
            assumed votes
          </strong>
          <PieChart
            width={isMobile ? 300 : 400}
            height={300}
            style={{ margin: "auto" }}
          >
            <Pie data={knightsAssumedPieData} dataKey="count" label>
              <LabelList dataKey="name" fill="#fff" stroke="none" />
              {knightsAssumedPieData.map((point, index) => (
                <Cell
                  key={index}
                  fill={
                    colorTheme === "light"
                      ? LIGHT_PIE_COLORS[index]
                      : DARK_PIE_COLORS[index]
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div
          className={styles.popularVoteGraphContainer}
          style={{ flexBasis: "50%" }}
        >
          <strong style={{ textAlign: "center", margin: "auto" }}>
            actual votes
          </strong>
          <PieChart
            width={isMobile ? 300 : 400}
            height={300}
            style={{ margin: "auto" }}
          >
            <Pie data={knightsActualPieData} dataKey="count" label>
              <LabelList dataKey="name" fill="#fff" stroke="none" />
              {knightsActualPieData.map((point, index) => (
                <Cell
                  key={index}
                  fill={
                    colorTheme === "light"
                      ? LIGHT_PIE_COLORS[index]
                      : DARK_PIE_COLORS[index]
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
      <TypeIt
        element="p"
        options={{
          speed: 20,
          cursor: false,
          afterComplete: () => {
            setFinished(true);
          },
        }}
        getBeforeInit={(instance: any) => {
          instance
            .type("as for the units, ")
            .pause(100)
            .type(
              `${Math.round(
                (allResponses.length - knightsAssumed.count) * 100,
              )}% of responders assumed knights would be the most popular unit.`,
            )
            .pause(100)
            .break()
            .type(
              `meanwhile, ${Math.round(
                (allResponses.length - knightsActual.count) * 100,
              )}% of responders chose knights as their favorite unit.`,
            )
            .pause(100)
            .break()
            .type("that's still 3rd place! ")
            .pause(100)
            .type("good job knights :)");
          return instance;
        }}
      />
    </>
  );
}

function PopularVotePlaygroundTool({
  charaData,
  rawData,
  unitData,
  rawUnitData,
  assumedCharaVotes,
  faveCharaVotes,
  assumedUnitVotes,
  faveUnitVotes,
}: {
  charaData: any[];
  rawData: any[];
  unitData: any[];
  rawUnitData: any[];
  assumedCharaVotes: CountedVotes[];
  faveCharaVotes: CountedVotes[];
  assumedUnitVotes: CountedVotes[];
  faveUnitVotes: CountedVotes[];
}) {
  interface GraphData {
    id: number;
    assumed: number;
    actual: number;
  }

  const { colorTheme } = useContext(DarkModeContext);

  const [selectedCharaIds, charaHandlers] = useListState<string>([]);
  const [selectedUnitIds, unitHandlers] = useListState<string>([]);

  let combinedIds = [];
  const [charaGraphData, charaDataHandlers] = useListState<GraphData>([]);
  const [unitGraphData, unitDataHandlers] = useListState<GraphData>([]);

  const isMobile = useMediaQuery("(max-width: 812px)");

  useEffect(() => {
    charaDataHandlers.setState([]);
    selectedCharaIds.forEach((id) => {
      let dataPoint: GraphData = {
        id: parseInt(id),
        assumed: assumedCharaVotes.filter(
          (chara) => chara.chara_id === parseInt(id),
        )[0]
          ? assumedCharaVotes.filter(
              (chara) => chara.chara_id === parseInt(id),
            )[0].count * -1
          : 0,
        actual: faveCharaVotes.filter(
          (chara) => chara.chara_id === parseInt(id),
        )[0].count,
      };

      charaDataHandlers.append(dataPoint);
    });
  }, [selectedCharaIds]);

  useEffect(() => {
    unitDataHandlers.setState([]);
    selectedUnitIds.forEach((id) => {
      let dataPoint: GraphData = {
        id: parseInt(id),
        assumed: assumedUnitVotes.filter(
          (unit) => unit.chara_id === parseInt(id),
        )[0]
          ? assumedUnitVotes.filter((unit) => unit.chara_id === parseInt(id))[0]
              .count * -1
          : 0,
        actual: faveUnitVotes.filter(
          (unit) => unit.chara_id === parseInt(id),
        )[0].count,
      };

      unitDataHandlers.append(dataPoint);
    });
  }, [selectedUnitIds]);

  const appendChara = (chara: string) => {
    charaHandlers.append(chara);
  };

  const removeChara = (chara: string) => {
    let index = selectedCharaIds.findIndex((charaId) => charaId === chara);
    charaHandlers.remove(index);
  };

  const appendUnit = (unit: string) => {
    unitHandlers.append(unit);
  };

  const removeUnit = (unit: string) => {
    let index = selectedUnitIds.findIndex((unitId) => unitId === unit);
    unitHandlers.remove(index);
  };

  function PopularVoteSelectedChip({
    id,
    type,
    data,
    onClose,
  }: {
    id: string;
    type: "chara" | "unit";
    data: any[];
    onClose: (arg0: any) => void;
  }) {
    const name = () => {
      if (type === "chara")
        return data
          .filter((chara: any) => chara.character_id == id)[0]
          .first_name.toLowerCase();
      else
        return data.filter((unit: any) => unit.id == id)[0].name.toLowerCase();
    };

    return (
      <div className={styles.popularVoteSelectedChip}>
        {name()}{" "}
        <div className={styles.chipIcon} onClick={() => onClose(id)}>
          <IconX size={16} />
        </div>
      </div>
    );
  }

  function CharaGraphTooltip({
    payload,
    label,
    active,
  }: TooltipProps<ValueType, NameType>) {
    if (payload && active) {
      let imgUrl;
      const payloadData = payload[0].payload;
      console.log("payloadData =>", payloadData);
      let firstName, lastName;
      // get the name of the character from mktls data
      let hoveredCharaData = charaData.find(
        (c: any) => c.character_id === payloadData.id,
      );
      firstName = hoveredCharaData.first_name
        ? hoveredCharaData.first_name.toLowerCase()
        : null;
      lastName = hoveredCharaData.last_name
        ? hoveredCharaData.last_name.toLowerCase()
        : null;
      imgUrl = `https://assets.enstars.link/assets/card_full1_${
        (twoStarIDs as any)[hoveredCharaData.character_id]
      }_normal.png`;

      return (
        <div className={styles.tooltip}>
          <div className={styles.tooltipText}>
            <div className={styles.tooltipName}>
              {firstName} {lastName}
            </div>
            <div className={styles.tooltipContent}>
              <p>
                assumed votes:{" "}
                <span className={styles.tooltipData}>
                  {Math.abs(payloadData.assumed)}
                </span>{" "}
                votes
              </p>
              <p>
                actual votes:{" "}
                <span className={styles.tooltipData}>
                  {Math.abs(payloadData.actual)}
                </span>{" "}
                votes
              </p>
            </div>
          </div>
          {imgUrl && (
            <div className={styles.tooltipImgWrapper}>
              <Image
                src={imgUrl}
                width={200}
                height={200 / 1.775}
                alt={`${firstName} ${lastName}`}
                className={styles.tooltipImg}
              />
            </div>
          )}
        </div>
      );
    }
    return null;
  }

  function UnitGraphTooltip({
    payload,
    label,
    active,
  }: TooltipProps<ValueType, NameType>) {
    if (payload && active) {
      let imgUrl;
      const payloadData = payload[0].payload;
      console.log("payloadData =>", payloadData);
      let firstName, lastName;
      // get the name of the character from mktls data
      let hoveredUnitData = unitData.filter(
        (c: any) => c.id === payloadData.id,
      )[0];
      imgUrl = `https://assets.enstars.link/assets/unit_logo_border_${hoveredUnitData.id}.png`;

      return (
        <div className={styles.tooltip}>
          <div className={styles.tooltipText}>
            <div className={styles.tooltipName}>{hoveredUnitData.name}</div>
            <div className={styles.tooltipContent}>
              <p>
                assumed votes:{" "}
                <span className={styles.tooltipData}>
                  {Math.abs(payloadData.assumed)}
                </span>{" "}
                votes
              </p>
              <p>
                actual votes:{" "}
                <span className={styles.tooltipData}>
                  {Math.abs(payloadData.actual)}
                </span>{" "}
                votes
              </p>
            </div>
          </div>
          {imgUrl && (
            <div className={styles.tooltipImgWrapper}>
              <Image
                src={imgUrl}
                width={200}
                height={200 / 4}
                alt={`${firstName} ${lastName}`}
                className={styles.tooltipImg}
              />
            </div>
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <div className={styles.popularVotePlaygroundTool}>
        <div className={styles.popularVotePlaygroundToolDropdowns}>
          <Select
            placeholder="select a character"
            data={charaData.map((chara: any) => {
              return {
                name: `${chara.first_name.toLowerCase()}${
                  chara.last_name ? ` ${chara.last_name.toLowerCase()}` : ""
                }`,
                value: chara.character_id,
                disabled: selectedCharaIds.includes(`${chara.character_id}`),
              };
            })}
            onChange={appendChara}
            temporary
          />
        </div>
        <div className={styles.popularVoteToolSelected}>
          {selectedCharaIds.map((charaId) => (
            <PopularVoteSelectedChip
              key={charaId}
              id={charaId}
              type="chara"
              data={charaData}
              onClose={removeChara}
            />
          ))}
        </div>
        <div className={styles.popularVoteToolGraph}>
          <div className={styles.popularVoteGraphLabels}>
            <div className={styles.popularVoteGraphLabel}>
              assumed popularity
            </div>
            <div className={styles.popularVoteGraphLabel}>actual votes</div>
          </div>
          <BarChart
            width={isMobile ? 300 : 800}
            height={500}
            data={charaGraphData}
            layout="vertical"
            stackOffset="sign"
            style={{ margin: "auto" }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="id" hide />
            <Tooltip content={<CharaGraphTooltip />} />
            <Bar dataKey="assumed" stackId="stack" height={30}>
              {charaGraphData.map((entry) => (
                <Cell
                  key={`cell-${entry.id}`}
                  fill={
                    rawData.find((d: any) => entry.id === d.character_id) &&
                    rawData.find((d: any) => entry.id === d.character_id)
                      .image_color
                  }
                  height={30}
                />
              ))}
            </Bar>
            <Bar dataKey="actual" stackId="stack" height={30}>
              {charaGraphData.map((entry) => (
                <Cell
                  key={`cell-${entry.id}`}
                  fill={
                    rawData.find((d: any) => entry.id === d.character_id) &&
                    rawData.find((d: any) => entry.id === d.character_id)
                      .image_color
                  }
                  height={30}
                />
              ))}
            </Bar>
            <ReferenceLine
              x={0}
              stroke={colorTheme === "light" ? "#5b5599" : "#cfc8fa"}
              width={1}
            />
          </BarChart>
        </div>
      </div>
      <div
        className={styles.popularVotePlaygroundTool}
        style={{ marginTop: "7%" }}
      >
        <div className={styles.popularVotePlaygroundToolDropdowns}>
          <Select
            placeholder="select a unit"
            data={unitData.map((unit: any) => {
              return {
                name: unit.name.toLowerCase(),
                value: unit.id,
                disabled: selectedUnitIds.includes(`${unit.id}`),
              };
            })}
            onChange={appendUnit}
            temporary
          />
        </div>
        <div className={styles.popularVoteToolSelected}>
          {selectedUnitIds.map((unitId) => (
            <PopularVoteSelectedChip
              key={unitId}
              id={unitId}
              type="unit"
              data={unitData}
              onClose={removeUnit}
            />
          ))}
        </div>
        <div className={styles.popularVoteToolGraph}>
          <div className={styles.popularVoteGraphLabels}>
            <div className={styles.popularVoteGraphLabel}>
              assumed popularity
            </div>
            <div className={styles.popularVoteGraphLabel}>actual votes</div>
          </div>
          <BarChart
            width={isMobile ? 300 : 800}
            height={500}
            data={unitGraphData}
            layout="vertical"
            stackOffset="sign"
            style={{ margin: "auto" }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="id" hide />
            <Tooltip content={<UnitGraphTooltip />} />
            <Bar dataKey="assumed" stackId="stack" height={30}>
              {unitGraphData.map((entry) => (
                <Cell
                  key={`cell-${entry.id}`}
                  fill={
                    rawUnitData.find((d: any) => entry.id === d.id) &&
                    rawUnitData.find((d: any) => entry.id === d.id).image_color
                  }
                  height={30}
                />
              ))}
            </Bar>
            <Bar dataKey="actual" stackId="stack" height={30}>
              {unitGraphData.map((entry) => (
                <Cell
                  key={`cell-${entry.id}`}
                  fill={
                    rawUnitData.find((d: any) => entry.id === d.id) &&
                    rawUnitData.find((d: any) => entry.id === d.id).image_color
                  }
                  height={30}
                />
              ))}
            </Bar>
            <ReferenceLine
              x={0}
              stroke={colorTheme === "light" ? "#5b5599" : "#cfc8fa"}
              width={1}
            />
          </BarChart>
        </div>
      </div>
    </>
  );
}

function PopularVotePlayground({
  charaData,
  unitData,
  rawData,
  rawUnitData,
  assumedCharaVotes,
  faveCharaVotes,
  assumedUnitVotes,
  faveUnitVotes,
}: {
  charaData: any[];
  unitData: any[];
  rawData: any[];
  rawUnitData: any[];
  assumedCharaVotes: CountedVotes[];
  faveCharaVotes: CountedVotes[];
  assumedUnitVotes: CountedVotes[];
  faveUnitVotes: CountedVotes[];
}) {
  const [showDescription, setShowDescription] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);

  return (
    <>
      <h2 style={{ margin: 0 }}>
        <TypeIt
          element={"h2"}
          options={{
            speed: 20,
            cursor: false,
            afterComplete: () => {
              setShowDescription(true);
            },
          }}
          getBeforeInit={(instance: any) => {
            instance.type("try it yourself!");
            return instance;
          }}
        />
      </h2>
      {showDescription && (
        <p>
          <TypeIt
            options={{
              speed: 10,
              cursor: false,
              afterComplete: () => {
                setShowPlayground(true);
              },
            }}
            getBeforeInit={(instance: any) => {
              instance
                .type(
                  "i'll leave you alone now and let you see the results yourself. ",
                )
                .pause(100)
                .type(
                  "use the following tool to compare how popular responders thought a character or unit would be compared to how popular they actually are!",
                );

              return instance;
            }}
          />
        </p>
      )}
      {showPlayground && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
        >
          <PopularVotePlaygroundTool
            charaData={charaData}
            rawData={rawData}
            unitData={unitData}
            rawUnitData={rawUnitData}
            assumedCharaVotes={assumedCharaVotes}
            faveCharaVotes={faveCharaVotes}
            assumedUnitVotes={assumedUnitVotes}
            faveUnitVotes={faveUnitVotes}
          />
        </motion.div>
      )}
    </>
  );
}

export default function SurveyPopularVote(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  let { data } = props.enData;
  let unitData = props.unitData.data;
  let rawData = props.rawData.data;
  let rawUnitData = props.rawUnitData.data;

  const [userChoice, setUserChoice] = useLocalStorage<any | null>({
    key: "user-choice",
    defaultValue: null,
  });
  const [finishedChara, setFinishedChara] = useLocalStorage({
    key: "finished-chara",
    defaultValue: false,
  });
  const [finishedUnit, setFinishedUnit] = useLocalStorage({
    key: "finished-unit",
    defaultValue: false,
  });

  const assumedCharaVotes = countVotes("assumed_chara");
  const faveCharaVotes = countVotes("fave_chara");
  const assumedUnitVotes = countVotes("assumed_unit");
  const faveUnitVotes = countVotes("fave_unit");

  return (
    <DataLayout pageTitle={props.title}>
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.popularVoteContainer}>
          <PageHeader title="popular vote" />
          {!userChoice && !finishedChara && !finishedUnit && (
            <AnimatePresence>
              <motion.div
                key="intro"
                className={styles.popularVoteSection}
                exit={{ x: -800, transition: { duration: 0.5 } }}
              >
                <PopularVoteIntro
                  selectData={data}
                  setUserChoice={setUserChoice}
                  userChoice={userChoice}
                />
              </motion.div>
            </AnimatePresence>
          )}
          {userChoice &&
            userChoice === "29" &&
            !finishedChara &&
            !finishedUnit && (
              <AnimatePresence>
                <motion.div
                  key="rei"
                  className={styles.popularVoteSection}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.5, delay: 0.5 },
                  }}
                  exit={{ x: -800, transition: { duration: 0.5, delay: 3 } }}
                >
                  <PopularVoteReiChosen
                    reiData={
                      data.filter((chara: any) => chara.first_name === "Rei")[0]
                    }
                    assumedVotes={
                      assumedCharaVotes.filter(
                        (vote) => vote.chara_id == userChoice,
                      )[0]
                    }
                    faveVotes={
                      faveCharaVotes.filter(
                        (vote) => vote.chara_id == userChoice,
                      )[0]
                    }
                    setFinished={setFinishedChara}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          {userChoice &&
            userChoice !== "29" &&
            !finishedChara &&
            !finishedUnit && (
              <AnimatePresence>
                <motion.div
                  key="notrei"
                  className={styles.popularVoteSection}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.5, delay: 0.5 },
                  }}
                  exit={{ x: -800, transition: { duration: 0.5 } }}
                >
                  <PopularVoteNotRei
                    chosenCharaData={
                      data.filter(
                        (chara: any) => chara.character_id == userChoice,
                      )[0]
                    }
                    chosenCharaAssumedVotes={
                      assumedCharaVotes.filter(
                        (chara) => chara.chara_id == userChoice,
                      )[0]
                    }
                    chosenCharaActualVotes={
                      faveCharaVotes.filter(
                        (chara) => chara.chara_id == userChoice,
                      )[0]
                    }
                    reiData={
                      data.filter((chara: any) => chara.first_name === "Rei")[0]
                    }
                    reiAssumedVotes={
                      assumedCharaVotes.filter(
                        (chara) => chara.chara_id === parseInt("29"),
                      )[0]
                    }
                    reiActualVotes={
                      faveCharaVotes.filter(
                        (chara) => chara.chara_id === parseInt("29"),
                      )[0]
                    }
                    setFinished={setFinishedChara}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          {finishedChara && userChoice && !finishedUnit && (
            <AnimatePresence>
              <motion.div
                key="unit"
                className={styles.popularVoteSection}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.5 },
                }}
                exit={{ x: -800, transition: { duration: 0.5, delay: 3 } }}
              >
                <PopularVoteUnit
                  assumedVotes={assumedUnitVotes}
                  actualVotes={faveUnitVotes}
                  setFinished={setFinishedUnit}
                />
              </motion.div>
            </AnimatePresence>
          )}
          {userChoice && finishedChara && finishedUnit && (
            <AnimatePresence>
              <motion.div
                key="unit"
                className={styles.popularVoteSection}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.5 },
                }}
                exit={{ x: -800, transition: { duration: 0.5 } }}
              >
                <PopularVotePlayground
                  charaData={data}
                  unitData={unitData}
                  rawData={rawData}
                  rawUnitData={rawUnitData}
                  assumedCharaVotes={assumedCharaVotes}
                  faveCharaVotes={faveCharaVotes}
                  assumedUnitVotes={assumedUnitVotes}
                  faveUnitVotes={faveUnitVotes}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </DataLayout>
  );
}

export async function getServerSideProps() {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const DATA_URL = "https://data.ensemble.moe/ja/characters.json";
  const TL_UNIT_DATA = "https://tl.data.ensemble.moe/en/units.json";
  const UNIT_DATA = "https://data.ensemble.moe/ja/units.json";

  const enData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);
  const unitData = await getData(TL_UNIT_DATA);
  const rawUnitData = await getData(UNIT_DATA);

  return {
    props: {
      rawData,
      enData,
      unitData,
      rawUnitData,
      title: "hall of fame | enstars popularity survey results 2023",
      description:
        "shock yourself! see who you all thought the most popular characters are in contrast with how well they actually did.",
    },
  };
}
