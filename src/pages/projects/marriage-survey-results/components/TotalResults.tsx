import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import Image from "next/image";

import totalResults from "../../../../../data/survey-results/total-results.json";
import styles from "../../styles/Survey.module.scss";

import { twoStarIDs } from "data/twoStarIds";
import { DarkModeContext } from "context/DarkModeContext";

interface Result {
  id: number;
  md: number;
  ld: number;
  firstName?: string | null;
  lastName?: string | null;
}

export default function TotalResults({
  rawData,
  enData,
}: {
  rawData: any;
  enData: any;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1100px)");
  const [data, setData] = useState<Result[]>(totalResults);

  useEffect(() => {
    let anzu = totalResults[totalResults.length - 1];
    let seiya = totalResults[totalResults.length - 2];
    let sortedData = totalResults;
    sortedData.pop();
    sortedData.pop();
    // sort by unit
    sortedData.sort((a, b) => {
      return (
        rawData[rawData.findIndex((r: any) => r.character_id === a.id)]
          .sort_id -
        rawData[rawData.findIndex((r: any) => r.character_id === b.id)].sort_id
      );
    });
    sortedData.push(seiya);
    sortedData.push(anzu);
    setData(sortedData);
  }, []);

  function GraphTooltip({
    payload,
    label,
    active,
  }: TooltipProps<ValueType, NameType>) {
    if (payload && active) {
      let imgUrl;
      // not anzu or seiya
      const payloadData = payload[0].payload;
      let firstName, lastName;
      if (payloadData.id !== 0 && payloadData.id !== 61) {
        // get the name of the character from mktls data
        let charaData = enData.find(
          (c: any) => c.character_id === payloadData.id
        );
        firstName = charaData.first_name
          ? charaData.first_name.toLowerCase()
          : null;
        lastName = charaData.last_name
          ? charaData.last_name.toLowerCase()
          : null;
        imgUrl = `https://assets.enstars.link/assets/card_full1_${
          (twoStarIDs as any)[charaData.character_id]
        }_normal.png`;
      } else {
        firstName = data.find(
          (c: Result) => c.id === payloadData.id
        )?.firstName;
        lastName = data.find((c: Result) => c.id === payloadData.id)?.lastName;
        firstName = firstName ? firstName.toLowerCase() : null;
        lastName = lastName ? lastName.toLowerCase() : null;
      }
      return (
        <div className={styles.tooltip}>
          <div className={styles.tooltipText}>
            <div className={styles.tooltipName}>
              {firstName} {lastName}
            </div>
            <div className={styles.tooltipContent}>
              <p>
                most desirable:{" "}
                <span className={styles.tooltipData}>{payloadData.md}</span>{" "}
                votes
              </p>
              <p>
                least desirable:{" "}
                <span className={styles.tooltipData}>
                  {Math.abs(payloadData.ld)}
                </span>{" "}
                votes
              </p>
            </div>
          </div>
          {imgUrl && (
            <div className={styles.tooltipImgWrapper}>
              <Image
                src={imgUrl}
                width={300}
                height={300 / 1.775}
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
    <div className={styles.totalResults}>
      <h2 id="total">total results</h2>
      <p>
        one thing i wanted to analyze is how many votes each character got
        between most and least desirable. i wanted to view these results
        side-by-side to see if there were a stark contrast between a
        character&apos;s most desirable and least desirable vote count. i
        decided the best way to do this was to create a bar graph that show
        cased the number of least desirable votes as a negative number and the
        most desirable votes as a positive number. therefore, the number of
        least desirable votes will show up on the left side of the graph and the
        most desirable votes will show up on the right side.
      </p>
      <p>
        hover over each bar (or tap if you&apos;re on a mobile device!) to view
        more details.
      </p>
      <div className={`${styles.barChart}`}>
        <div className={styles.desirableContainer}>
          <div className={styles.desirableLabel}>least desirable</div>
          <div className={styles.desirableLabel}>most desirable</div>
        </div>
        <BarChart
          width={isMobile ? 300 : isTablet ? 650 : 1000}
          height={2000}
          data={data}
          layout="vertical"
          stackOffset="sign"
          style={{ margin: "auto" }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="id" hide />
          <Tooltip content={<GraphTooltip />} />
          <Bar dataKey="md" stackId="stack">
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.id}`}
                fill={
                  rawData.find((d: any) => entry.id === d.character_id) &&
                  rawData.find((d: any) => entry.id === d.character_id)
                    .image_color
                }
              />
            ))}
          </Bar>
          <Bar dataKey="ld" stackId="stack">
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.id}`}
                fill={
                  rawData.find((d: any) => entry.id === d.character_id) &&
                  rawData.find((d: any) => entry.id === d.character_id)
                    .image_color
                }
              />
            ))}
          </Bar>
          <ReferenceLine
            x={0}
            stroke={colorTheme === "light" ? "#5b5599" : "#cfc8fa"}
            width={1}
          />
        </BarChart>
        <div className={styles.desirableContainer}>
          <div className={styles.desirableLabel}>least desirable</div>
          <div className={styles.desirableLabel}>most desirable</div>
        </div>
      </div>
    </div>
  );
}
