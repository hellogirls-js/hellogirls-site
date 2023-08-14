import { ColorRing } from "react-loader-spinner";
import useSWR from "swr";
import { useState } from "react";
import Image from "next/image";

import styles from "../../styles/Ninjaman.module.scss";
import AsobiShinobu1 from "../../../../../assets/asobi_shinobu_1.png";
import AsobiTarget from "../../../../../assets/asobi_target.png";

import { KEYBOARD_ARR } from "./utility";

interface Coord {
  x: number;
  y: number;
}

function NinjamanGameLoading() {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ColorRing
        visible={true}
        height="200"
        width="200"
        ariaLabel="blocks-loading"
        wrapperStyle={{ margin: "auto" }}
        wrapperClass="blocks-wrapper"
        colors={["#ff001c", "#ffdd00", "#ffdd00", "#0050ff", "#00b0ff"]}
      />
      <h3>Loading...</h3>
    </div>
  );
}

export default function NinjamanGame() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: phrase } = useSWR("/api/ninjaman/get", fetcher);

  const [shinobuSprite, setShinobuSprite] = useState(AsobiShinobu1);

  const GUESS_COUNT = 12;

  const winShurikenCoordinates: Coord[] = [];
  const LShurikenCoordinates: Coord[] = [];

  function NinjamanShinobuBoard() {
    return (
      <div className={styles.ninjamanShinobuBoard}>
        <div className={styles.ninjamanBoardTarget}>
          <div className={styles.ninjamanTarget}>
            <Image
              src={AsobiTarget.src}
              width={AsobiTarget.width / 1.5}
              height={AsobiTarget.height / 1.5}
              alt="target"
            />
          </div>
        </div>
        <div className={styles.ninjamanBoardShnoob}>
          <Image
            src={shinobuSprite.src}
            alt="shinobu"
            width={shinobuSprite.width / 1.5}
            height={shinobuSprite.height / 1.5}
          />
        </div>
      </div>
    );
  }

  function NinjamanPhraseLetter({ letter }: { letter: string }) {
    if (letter === " ") {
      return (
        <div
          className={`${styles.ninjamanLetter} ${styles.ninjamanLetterBlank}`}
        ></div>
      );
    } else {
      return (
        <div
          className={`${styles.ninjamanLetter} ${styles.ninjamanLetterBlock}`}
        ></div>
      );
    }
  }

  function NinjamanKeyboard() {
    return (
      <div className={styles.ninjamanKeyboard}>
        {KEYBOARD_ARR.map((row, index) => (
          <div key={index} className={styles.ninjamanKeyboardRow}>
            {row.map((letter) => (
              <input
                type="button"
                value={letter}
                key={letter}
                className={styles.ninjamanKeyboardKey}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.ninjamanPage} ${styles.ninjamanGame}`}>
      {!phrase && <NinjamanGameLoading />}
      {phrase && (
        <div className={styles.ninjamanGameContainer}>
          <NinjamanShinobuBoard />
          <div className={styles.ninjamanGameNotShnoob}>
            <div className={styles.ninjamanGameCategory}>
              <span className={styles.categoryLabel}>Category:</span>{" "}
              {phrase.type}
            </div>
            <div className={styles.ninjamanGameLetters}>
              <div style={{ marginTop: "5vh" }}>
                {Array.from(phrase.phrase as string).map(
                  (letter: string, index: number) => {
                    console.log(letter);
                    return <NinjamanPhraseLetter key={index} letter={letter} />;
                  }
                )}
              </div>
            </div>
            <NinjamanKeyboard />
          </div>
        </div>
      )}
    </div>
  );
}
