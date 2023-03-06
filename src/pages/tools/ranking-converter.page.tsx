import { useContext, useEffect, useState } from "react";

import styles from "./RankingConverter.module.scss";

import { DarkModeContext } from "context/DarkModeContext";
import MainLayout from "component/MainLayout";
import Textarea from "component/utility/TextArea";
import Button from "component/utility/Button";

interface RawData {
  choice: string;
  reason: string;
  include: string;
}

interface ParsedData {
  id: number;
  name: string;
  reason: string;
  include: string;
}

interface CountData {
  id: number;
  name: string;
  count: number;
}

function convert(input: string): string {
  try {
    let convertedString = "";
    let parsedJson: RawData[] = JSON.parse(input);

    let dataArr: ParsedData[] = parsedJson.map((data) => {
      let separated = data.choice.split(". ");
      return {
        id: parseInt(separated[0]),
        name: separated[1],
        reason: data.reason,
        include: data.include,
      };
    });

    let countArr: CountData[] = [];

    dataArr.forEach((data) => {
      if (!countArr.find((d) => d.id === data.id)) {
        let newObj = { id: data.id, name: data.name, count: 1 };
        countArr.push(newObj);
      } else {
        (countArr.find((d) => d.id === data.id) as CountData).count++;
      }
    });

    countArr.sort((a, b) => a.count - b.count);

    countArr.forEach((entry, i) => {
      const SPACE = "\n\n";
      let entries = dataArr.filter((d) => d.id === entry.id);
      let responses: string[] = entries
        .filter((e) => e.include !== "L")
        .map((e) => e.reason);

      const rank = countArr.length - i;
      const rankString = `${rank}`;

      let suffix = "TH";

      switch (rankString[rankString.length - 1]) {
        case "1":
          suffix = rankString.length > 1 && rankString[0] !== "1" ? "ST" : "TH";
          break;
        case "2":
          suffix = rankString.length > 1 && rankString[0] !== "1" ? "ND" : "TH";
          break;
        case "3":
          suffix = rankString.length > 1 && rankString[0] !== "1" ? "RD" : "TH";
          break;
        default:
          break;
      }

      const header = `## ${rank}${suffix} PLACE -- ${entry.name.toUpperCase()} (${
        entry.count
      } ${entry.count === 1 ? "VOTE" : "VOTES"})${SPACE}`;

      convertedString += header;
      convertedString += `<CardCG src="" alt="${entry.name.toLowerCase()}" />${SPACE}`;

      responses.forEach((response) => {
        if (response.length > 0)
          convertedString += `> ${response
            .replace("<", '{"<"}')
            .replace(">", '{">"}')
            .replace("\n\n", "\n")
            .replace("\n", "\n>\n> ")}${SPACE}`;
      });
    });

    return convertedString;
  } catch (e) {
    return "invalid json provided";
  }
}

export default function RankingConverter() {
  const { colorTheme } = useContext(DarkModeContext);
  const [input, setInput] = useState<string | null>(null);

  useEffect(() => {
    if (input) {
      console.log(input);
      let output = convert(input as string);
      (document.getElementById("output") as HTMLTextAreaElement).value = output;
    }
  }, [input]);

  const ROWS = 30;
  const COLS = 50;

  return (
    <MainLayout heading="data to mdx converter">
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.textboxes}>
          <div className={styles.textboxHolder}>
            <h3>input</h3>
            <Textarea id={"input"} rows={ROWS} cols={COLS} />
            <Button
              value="convert"
              onClick={(e) => {
                e.preventDefault();
                setInput(
                  (document.getElementById("input") as HTMLTextAreaElement)
                    ?.value
                );
              }}
            />
          </div>
          <div className={styles.textboxHolder}>
            <h3>output</h3>
            <Textarea id={"output"} readonly rows={ROWS} cols={COLS} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
