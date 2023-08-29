import { ColorRing } from "react-loader-spinner";
import useSWR from "swr";
import { useEffect, useReducer } from "react";
import Image, { StaticImageData } from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";

import styles from "../../styles/Ninjaman.module.scss";
import AsobiShinobuIdle from "../../../../../assets/asobi_shinobu_1.png";
import AsobiShinobuHit from "../../../../../assets/asobi_shinobu_2.png";
import AsobiShinobuWin from "../../../../../assets/asobi_shinobu_3.png";
import AsobiShinobuMiss from "../../../../../assets/asobi_shinobu_4.png";
import AsobiShinobuLose from "../../../../../assets/asobi_shinobu_5.png";
import AsobiTarget from "../../../../../assets/asobi_target.png";
import AsobiShuriken from "../../../../../assets/asobi_shuriken.png";

import { KEYBOARD_ARR, hitShurikens, missShurikens } from "./utility";

interface State {
  playGame: boolean;
  wonGame: boolean;
  shinobuSprite: StaticImageData;
  isShinobuIdle: boolean;
  missAmt: number;
  guessedLetters: string[];
  letterKeys: Letter[][];
  hitShurikens: Shuriken[];
  missShurikens: Shuriken[];
}

let tempKeys = KEYBOARD_ARR;
let tempHits = hitShurikens;
let tempMisses = missShurikens;

const defaultState: State = {
  playGame: true,
  wonGame: false,
  shinobuSprite: AsobiShinobuIdle,
  isShinobuIdle: true,
  missAmt: 0,
  guessedLetters: [],
  letterKeys: tempKeys,
  hitShurikens: tempHits,
  missShurikens: tempMisses,
};

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
    }
  | {
      type: "loseState";
    }
  | {
      type: "winState";
      payload: {
        letterKey: Letter;
      };
    }
  | { type: "fetchData" }
  | { type: "newGame" };

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

/**
 *
 * @returns the actual game content
 */
export default function NinjamanGame() {
  const isMobile = useMediaQuery("(max-width: 812px)");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: phrase, mutate } = useSWR("/api/ninjaman/get", fetcher, {
    revalidateOnFocus: false,
  });

  function reducer(state: State, action: Action): State {
    // state changes: shinobu sprite transition, show shuriken
    let newMissAmt: number;
    let newGuessedLetters: string[];
    let newHitShurikens: Shuriken[];
    let newMissShurikens: Shuriken[];
    switch (action.type) {
      case "chooseLetter":
        newHitShurikens = state.hitShurikens;
        newMissShurikens = state.missShurikens;
        newGuessedLetters = state.guessedLetters;
        newMissAmt = state.missAmt;
        if (!newGuessedLetters.includes(action.payload.letterKey.letter)) {
          newGuessedLetters.push(action.payload.letterKey.letter);
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
            newMissShurikens[recentMissIndex] = {
              ...recentMiss,
              visible: true,
            };
          }
        }
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
        let missLength = newMissShurikens.filter(
          (sh) => sh.visible === true
        ).length;
        return {
          ...state,
          missAmt: missLength,
          guessedLetters: newGuessedLetters,
          letterKeys: newKeys,
          shinobuSprite: action.payload.isPresent
            ? AsobiShinobuHit
            : AsobiShinobuMiss,
          isShinobuIdle: false,
          hitShurikens: newHitShurikens,
          missShurikens: newMissShurikens,
        };
        break;
      case "resetToIdle":
        return {
          ...state,
          shinobuSprite: AsobiShinobuIdle,
          isShinobuIdle: true,
        };
        break;
      case "winState":
        newHitShurikens = state.hitShurikens;
        newGuessedLetters = [
          ...state.guessedLetters,
          action.payload.letterKey.letter,
        ];
        newHitShurikens[newHitShurikens.length - 1] = {
          ...newHitShurikens[newHitShurikens.length - 1],
          visible: true,
        };
        return {
          ...state,
          playGame: false,
          wonGame: true,
          shinobuSprite: AsobiShinobuWin,
          isShinobuIdle: false,
          hitShurikens: newHitShurikens,
          guessedLetters: newGuessedLetters,
        };
        break;
      case "loseState":
        newGuessedLetters = state.guessedLetters;
        let missShurikenVal = {
          ...state.missShurikens[state.missShurikens.length - 1],
          visible: true,
        };
        newMissShurikens = state.missShurikens;
        newMissShurikens[newMissShurikens.length - 1] = missShurikenVal;
        KEYBOARD_ARR.flat().forEach((key) => {
          if (!newGuessedLetters.includes(key.letter)) {
            newGuessedLetters.push(key.letter);
          }
        });
        return {
          ...state,
          playGame: false,
          shinobuSprite: AsobiShinobuLose,
          isShinobuIdle: false,
          guessedLetters: newGuessedLetters,
          missShurikens: newMissShurikens,
        };
        break;
      case "fetchData":
        mutate();
        let tempKeys = KEYBOARD_ARR;
        let tempHits = hitShurikens;
        let tempMisses = missShurikens;
        return {
          ...state,
          playGame: true,
          wonGame: false,
          shinobuSprite: AsobiShinobuIdle,
          isShinobuIdle: true,
          missAmt: 0,
          guessedLetters: [],
          letterKeys: [
            [
              { letter: "Q", isGuessed: false },
              { letter: "W", isGuessed: false },
              { letter: "E", isGuessed: false },
              { letter: "R", isGuessed: false },
              { letter: "T", isGuessed: false },
              { letter: "Y", isGuessed: false },
              { letter: "U", isGuessed: false },
              { letter: "I", isGuessed: false },
              { letter: "O", isGuessed: false },
              { letter: "P", isGuessed: false },
            ],
            [
              { letter: "A", isGuessed: false },
              { letter: "S", isGuessed: false },
              { letter: "D", isGuessed: false },
              { letter: "F", isGuessed: false },
              { letter: "G", isGuessed: false },
              { letter: "H", isGuessed: false },
              { letter: "J", isGuessed: false },
              { letter: "K", isGuessed: false },
              { letter: "L", isGuessed: false },
            ],
            [
              { letter: "Z", isGuessed: false },
              { letter: "X", isGuessed: false },
              { letter: "C", isGuessed: false },
              { letter: "V", isGuessed: false },
              { letter: "B", isGuessed: false },
              { letter: "N", isGuessed: false },
              { letter: "M", isGuessed: false },
            ],
          ],
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
        };
        break;
      default:
        return state;
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState);

  const MISS_COUNT = 7;

  useEffect(() => {
    if (
      !state.isShinobuIdle &&
      (state.shinobuSprite === AsobiShinobuHit ||
        state.shinobuSprite === AsobiShinobuMiss)
    ) {
      setTimeout(() => {
        dispatch({ type: "resetToIdle" });
      }, 2000);
    }
    if (state.missAmt >= MISS_COUNT) {
      dispatch({
        type: "loseState",
      });
    }
  }, [state.shinobuSprite, state.missAmt]);

  function NinjamanShinobuBoard() {
    let divide = isMobile ? 1.65 : 1;

    return (
      <div className={styles.ninjamanShinobuBoard}>
        <div className={styles.ninjamanBoardTarget}>
          {state.hitShurikens.map((shuriken: Shuriken, index: number) => (
            <div
              className={styles.ninjamanShuriken}
              style={{
                left: shuriken.coordinates.x / divide,
                top: shuriken.coordinates.y / divide,
                display: shuriken.visible ? "block" : "none",
              }}
              key={index}
            >
              <Image
                src={AsobiShuriken.src}
                alt="shuriken"
                width={AsobiShuriken.width / (isMobile ? 2.5 : 1.5)}
                height={AsobiShuriken.height / (isMobile ? 2.5 : 1.5)}
              />
            </div>
          ))}
          {state.missShurikens.map((shuriken: Shuriken, index: number) => (
            <div
              className={styles.ninjamanShuriken}
              style={{
                left: shuriken.coordinates.x / divide,
                top: shuriken.coordinates.y / divide,
                display: shuriken.visible ? "block" : "none",
              }}
              key={index}
            >
              <Image
                src={AsobiShuriken.src}
                alt="shuriken"
                width={AsobiShuriken.width / (isMobile ? 2.5 : 1.5)}
                height={AsobiShuriken.height / (isMobile ? 2.5 : 1.5)}
              />
            </div>
          ))}
          <div className={styles.ninjamanTarget}>
            <Image
              src={AsobiTarget.src}
              width={AsobiTarget.width / (isMobile ? 2.5 : 1.5)}
              height={AsobiTarget.height / (isMobile ? 2.5 : 1.5)}
              alt="target"
            />
          </div>
        </div>
        <div
          className={`${styles.ninjamanBoardShnoob} ${
            state.isShinobuIdle && styles.idle
          }`}
        >
          <div
            className={styles.ninjamanShnoobPhrase}
            style={{
              display: state.isShinobuIdle ? "none" : "block",
            }}
          >
            {state.shinobuSprite === AsobiShinobuHit
              ? "Wow, de gozaru!"
              : state.shinobuSprite === AsobiShinobuWin
              ? "We did it, de gozaru!!"
              : state.shinobuSprite === AsobiShinobuLose
              ? "Aw man, de gozaru..."
              : "Not quite, de gozaru..."}
          </div>
          <Image
            src={state.shinobuSprite.src}
            alt="shinobu"
            width={state.shinobuSprite.width / (isMobile ? 3 : 1.5)}
            height={state.shinobuSprite.height / (isMobile ? 3 : 1.5)}
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
                disabled={
                  keyObj.isGuessed || !state.isShinobuIdle || !state.playGame
                }
                onClick={(e) => {
                  // check if all letters are guessed
                  let uniquePhraseLetters = Array.from(phrase.phrase).filter(
                    (letter, index: number, arr) =>
                      arr.indexOf(letter) === index && letter !== " "
                  );
                  let guessedLettersAmt = 0;
                  let tempGuessedLetters = [
                    ...state.guessedLetters,
                    (e.target as HTMLInputElement).value,
                  ];
                  for (let i = 0; i < uniquePhraseLetters.length; i++) {
                    if (
                      tempGuessedLetters.includes(
                        (uniquePhraseLetters as string[])[i]
                      )
                    ) {
                      guessedLettersAmt++;
                    }
                  }
                  if (state.missAmt < MISS_COUNT) {
                    if (guessedLettersAmt >= uniquePhraseLetters.length) {
                      dispatch({
                        type: "winState",
                        payload: {
                          letterKey: keyObj,
                        },
                      });
                    } else {
                      dispatch({
                        type: "chooseLetter",
                        payload: {
                          letterKey: keyObj,
                          isPresent: phrase.phrase.includes(keyObj.letter),
                        },
                      });
                    }
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
            <div className={styles.ninjamanCategoryAndButton}>
              <div className={styles.ninjamanGameCategory}>
                <span className={styles.categoryLabel}>Category:</span>{" "}
                {phrase.type}
              </div>
              <div
                className={styles.ninjamanReplayButton}
                style={{ display: state.playGame ? "none" : "block" }}
                onClick={(e) => {
                  dispatch({ type: "fetchData" });
                }}
              >
                <IconRefresh /> New game
              </div>
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
