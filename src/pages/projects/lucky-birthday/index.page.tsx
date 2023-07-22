import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import dates from "../../../../data/array_vals.json";
import MakoCringe from "../../../../assets/MakoCringe.png";
import styles from "../styles/Lucky.module.scss";

import MainLayout from "component/MainLayout";
import Select from "component/utility/Select";
import Button from "component/utility/Button";
import { DarkModeContext } from "context/DarkModeContext";
import Accordion from "component/utility/Accordion";

export const runtime = "experimental-edge";

export default function LuckyBirthday() {
  const YEAR = new Date().getFullYear();

  const { colorTheme } = useContext(DarkModeContext);

  interface Result {
    rank: number;
    message: string;
  }

  interface BirthdayRanking {
    rank: number;
    birthday: string;
  }

  const [birthday, setBirthday] = useState<string | null>();
  const [month, setMonth] = useState<string | null>();
  const [date, setDate] = useState<string | null>();
  const [result, setResult] = useState<Result | null>();

  let monthsArray = new Array(12);
  let datesArray = new Array(31);

  for (let i = 0; i < monthsArray.length; i++) {
    const monthName = dayjs().month(i).format("MMMM");
    monthsArray[i] = monthName;
  }

  for (let i = 0; i < datesArray.length; i++) {
    datesArray[i] = i + 1;
  }

  function BirthdayTable() {
    const TableRow = ({
      result,
      index,
    }: {
      result: BirthdayRanking;
      index: number;
    }) => {
      return (
        <tr
          className={`${styles.row} ${
            index % 2 === 0 ? styles.even : styles.odd
          }`}
        >
          <td className={styles.cell}>#{result.rank}</td>
          <td className={styles.cell}>
            {dayjs(`2023-${result.birthday}`).format("MMMM D")}
          </td>
        </tr>
      );
    };

    return (
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th className={`${styles.tableHeading} ${styles.cell}`}>ranking</th>
            <th className={`${styles.tableHeading} ${styles.cell}`}>
              birthday
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {dates.map((date, index) => (
            <TableRow key={date.rank} result={date} index={index} />
          ))}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    if (month && date && !dayjs(`${month} ${date}, ${YEAR}`).isValid()) {
      setResult({ rank: 0, message: "Sorry, that result is invalid." });
    } else if (dayjs(`${month} ${date}, ${YEAR}`).isValid()) {
      let dataResult = dates.filter((date) => date.birthday === birthday)[0];
      let ranking = dataResult.rank;
      let message: string;

      if (1 <= ranking && ranking <= 50) {
        message = `Wow, ${YEAR} is really gonna be your year! Maybe you'll find a dollar on the ground.`;
      } else if (50 < ranking && ranking <= 100) {
        message = `You're gonna experience some good luck in ${YEAR}, yippee!`;
      } else if (100 < ranking && ranking <= 200) {
        message = `Your luck will be pretty average in ${YEAR}. Don't expect anything grand to happen, okay?`;
      } else if (200 < ranking && ranking <= 300) {
        message = `Your luck's not gonna be the best in ${YEAR}, but keep your head up! This doesn't determine everything.`;
      } else {
        message = "Um.";
      }

      setResult({ rank: ranking, message: message });
    }
  }, [birthday]);

  return (
    <MainLayout heading="lucky birthday ranking">
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <div className={styles.topSection}>
          <div className={styles.formContainer}>
            <form id="form" className={styles.form}>
              <h2 style={{ margin: 0, marginBottom: "2vh" }}>
                find your lucky birthday ranking
              </h2>
              <div className={styles.dateGroup}>
                <Select
                  label="month"
                  placeholder="Month..."
                  data={monthsArray.map((month) => {
                    return { value: month, name: month };
                  })}
                  onChange={setMonth}
                />
                <Select
                  label="date"
                  placeholder="Date..."
                  data={datesArray.map((date) => {
                    return { value: date, name: date };
                  })}
                  onChange={setDate}
                />
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setBirthday(
                    dayjs(`${month} ${date}, ${YEAR}`).format("MM-DD")
                  );
                }}
                value="I'm feeling lucky!"
              />
            </form>
            <div className={styles.image} />
          </div>

          <div className={styles.result}>
            {result ? (
              <div className={styles.resultText}>
                {result.rank === 0 ? (
                  <p>Sorry, that date is invalid</p>
                ) : (
                  <>
                    <p>
                      Your lucky ranking is <strong>#{result.rank}</strong>
                    </p>
                    <p>
                      <em>{result.message}</em>
                      {result.rank > 300 && (
                        <Image
                          src={MakoCringe.src}
                          alt="Um."
                          width={MakoCringe.width}
                          height={MakoCringe.height}
                          style={{ display: "block" }}
                        />
                      )}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className={styles.placeholder}>
                your result will show up here o( ❛ᴗ❛ )o
              </div>
            )}
          </div>
        </div>
        <Accordion title="want to view a full table?">
          <BirthdayTable />
        </Accordion>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "lucky birthday viewer",
    },
  };
}
