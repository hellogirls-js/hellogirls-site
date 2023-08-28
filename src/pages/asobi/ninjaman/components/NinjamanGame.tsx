import { ColorRing } from "react-loader-spinner";
import useSWR from "swr";
import { useEffect, useReducer } from "react";
import Image, { StaticImageData } from "next/image";

import styles from "../../styles/Ninjaman.module.scss";
import AsobiShinobu1 from "../../../../../assets/asobi_shinobu_1.png";
import AsobiShinobu2 from "../../../../../assets/asobi_shinobu_2.png";
import AsobiShinobu4 from "../../../../../assets/asobi_shinobu_4.png";
import AsobiTarget from "../../../../../assets/asobi_target.png";
import AsobiShuriken from "../../../../../assets/asobi_shuriken.png";

import { KEYBOARD_ARR } from "./utility";

interface Coord {
  x: number;
  y: number;
}

interface Shuriken {
  visible: boolean;
  coordinates: Coord;
}

interface State {
  shinobuSprite: StaticImageData;
  isShinobuIdle: boolean;
  guessAmt: number;
  guessedLetters: string[];
  letterKeys: Letter[][];
  hitShurikens: Shuriken[];
  missShurikens: Shuriken[];
}

type Action =
  | {
      type: "chooseLetter";
      payload: {
        letterKey: Letter;
        isPresent: boolean;
      };
    }
  | {
      type: "resetToIdle";
    };

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

function reducer(state: State, action: Action): State {
  // state changes: shinobu sprite transition, show shuriken
  switch (action.type) {
    case "chooseLetter":
      let newGuessAmt = state.guessAmt;
      newGuessAmt++;
      let newGuessedLetters = state.guessedLetters;
      newGuessedLetters.push(action.payload.letterKey.letter);
      let newKeys = state.letterKeys;
      let currentKey = newKeys
        .flat()
        .filter((key) => key === action.payload.letterKey)[0];
      currentKey = { ...currentKey, isGuessed: true };
      for (let i = 0; i < newKeys.length; i++) {
        for (let j = 0; j < newKeys[i].length; j++) {
          if (newKeys[i][j].letter === currentKey.letter) {
            newKeys[i][j] = currentKey;
          }
        }
      }
      let newHitShurikens = state.hitShurikens;
      let newMissShurikens = state.missShurikens;
      if (action.payload.isPresent) {
        let recentHit = state.hitShurikens.filter(
          (shuriken) => !shuriken.visible
        )[0];
        let recentHitIndex = state.hitShurikens.findIndex(
          (shuriken) => !shuriken.visible
        );
        newHitShurikens[recentHitIndex] = { ...recentHit, visible: true };
      } else {
        let recentMiss = state.missShurikens.filter(
          (shuriken) => !shuriken.visible
        )[0];
        let recentMissIndex = state.missShurikens.findIndex(
          (shuriken) => !shuriken.visible
        );
        newMissShurikens[recentMissIndex] = { ...recentMiss, visible: true };
      }
      return {
        ...state,
        guessAmt: newGuessAmt,
        guessedLetters: newGuessedLetters,
        letterKeys: newKeys,
        shinobuSprite: action.payload.isPresent ? AsobiShinobu2 : AsobiShinobu4,
        isShinobuIdle: false,
        hitShurikens: newHitShurikens,
        missShurikens: newMissShurikens,
      };
      break;
    case "resetToIdle":
      return {
        ...state,
        shinobuSprite: AsobiShinobu1,
        isShinobuIdle: true,
      };
      break;
  }
}

export default function NinjamanGame() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: phrase } = useSWR("/api/ninjaman/get", fetcher, {
    revalidateOnFocus: false,
  });

  const [state, dispatch] = useReducer(reducer, {
    shinobuSprite: AsobiShinobu1,
    isShinobuIdle: true,
    guessAmt: 0,
    guessedLetters: [],
    letterKeys: KEYBOARD_ARR,
    hitShurikens: [
      {
        visible: false,
        coordinates: {
          x: 20,
          y: 10,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 120,
          y: 95,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 30,
          y: 100,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 100,
          y: 6,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 98,
          y: 67,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 5,
          y: 67,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 70,
          y: 120,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 72,
          y: 20,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 40,
          y: 40,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 100,
          y: 42,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 50,
          y: 80,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 72,
          y: 56,
        },
      },
    ],
    missShurikens: [
      {
        visible: false,
        coordinates: {
          x: -30,
          y: 32,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 55,
          y: 142,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 120,
          y: -5,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 140,
          y: 80,
        },
      },
      {
        visible: false,
        coordinates: {
          x: -20,
          y: 72,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 30,
          y: -20,
        },
      },
      {
        visible: false,
        coordinates: {
          x: -10,
          y: 100,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 130,
          y: 120,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 143,
          y: 40,
        },
      },
      {
        visible: false,
        coordinates: {
          x: 90,
          y: -30,
        },
      },
      {
        visible: false,
        coordinates: {
          x: -10,
          y: -30,
        },
      },
      {
        visible: false,
        coordinates: {
          x: -20,
          y: 120,
        },
      },
    ],
  });

  const GUESS_COUNT = 12;

  useEffect(() => {
    if (!state.isShinobuIdle && state.shinobuSprite !== AsobiShinobu1) {
      setTimeout(() => {
        dispatch({ type: "resetToIdle" });
      }, 2000);
    }
  }, [state.shinobuSprite]);

  function NinjamanShinobuBoard() {
    return (
      <div className={styles.ninjamanShinobuBoard}>
        <div className={styles.ninjamanBoardTarget}>
          {state.hitShurikens.map((shuriken: Shuriken, index: number) => (
            <div
              className={styles.ninjamanShuriken}
              style={{
                left: shuriken.coordinates.x,
                top: shuriken.coordinates.y,
                display: shuriken.visible ? "block" : "none",
              }}
              key={index}
            >
              <Image
                src={AsobiShuriken.src}
                alt="shuriken"
                width={AsobiShuriken.width / 1.5}
                height={AsobiShuriken.height / 1.5}
              />
            </div>
          ))}
          {state.missShurikens.map((shuriken: Shuriken, index: number) => (
            <div
              className={styles.ninjamanShuriken}
              style={{
                left: shuriken.coordinates.x,
                top: shuriken.coordinates.y,
                display: shuriken.visible ? "block" : "none",
              }}
              key={index}
            >
              <Image
                src={AsobiShuriken.src}
                alt="shuriken"
                width={AsobiShuriken.width / 1.5}
                height={AsobiShuriken.height / 1.5}
              />
            </div>
          ))}
          <div className={styles.ninjamanTarget}>
            <Image
              src={AsobiTarget.src}
              width={AsobiTarget.width / 1.5}
              height={AsobiTarget.height / 1.5}
              alt="target"
            />
          </div>
        </div>
        <div
          className={`${styles.ninjamanBoardShnoob} ${
            state.isShinobuIdle && styles.idle
          }`}
        >
          <Image
            src={state.shinobuSprite.src}
            alt="shinobu"
            width={state.shinobuSprite.width / 1.5}
            height={state.shinobuSprite.height / 1.5}
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
      if (state.guessedLetters.includes(letter)) {
        return (
          <div
            className={`${styles.ninjamanLetter} ${styles.ninjamanLetterText}`}
          >
            {letter}
          </div>
        );
      } else {
        return (
          <div
            className={`${styles.ninjamanLetter} ${styles.ninjamanLetterBlock}`}
          ></div>
        );
      }
    }
  }

  function NinjamanKeyboard() {
    return (
      <div className={styles.ninjamanKeyboard}>
        {state.letterKeys.map((row, index) => (
          <div key={index} className={styles.ninjamanKeyboardRow}>
            {row.map((keyObj) => (
              <input
                type="button"
                value={keyObj.letter}
                key={keyObj.letter}
                className={`${styles.ninjamanKeyboardKey} ${
                  keyObj.isGuessed ? styles.guessed : styles.notGuessed
                }`}
                disabled={keyObj.isGuessed || !state.isShinobuIdle}
                onClick={(e) => {
                  if (state.guessAmt < GUESS_COUNT) {
                    dispatch({
                      type: "chooseLetter",
                      payload: {
                        letterKey: keyObj,
                        isPresent: phrase.phrase.includes(keyObj.letter),
                      },
                    });
                  }
                }}
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
              {phrase.phrase.split(" ").map((phrase: string, index: number) => {
                return (
                  <div className={styles.ninjamanPhraseGroup} key={index}>
                    {Array.from(phrase).map((letter: string, index: number) => {
                      return (
                        <NinjamanPhraseLetter key={index} letter={letter} />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <NinjamanKeyboard />
          </div>
        </div>
      )}
    </div>
  );
}
