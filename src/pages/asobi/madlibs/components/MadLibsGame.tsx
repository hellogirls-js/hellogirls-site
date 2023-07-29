import { Dispatch, SetStateAction, useEffect, useReducer, useRef } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import styles from "../../styles/MadLibs.module.scss";

import { splitStory, processPrompt } from "./utility";

interface State {
  gameIndex: number;
  prevIndex: number;
  gameObj: any;
}

type Action =
  | {
      type: "clickNext";
      payload: { value: string; blanks: string[] };
    }
  | { type: "clickPrev" }
  | { type: "finish"; payload: { value: string; blanks: string[] } };

function reducer(state: State, action: Action): State {
  let prev = state.gameIndex;
  let newIndex = state.gameIndex;
  switch (action.type) {
    case "clickNext":
      let newObj = state.gameObj;
      newIndex += 1;
      newObj[action.payload.blanks[prev]] = action.payload.value;
      return {
        ...state,
        prevIndex: prev - 1,
        gameIndex: newIndex,
        gameObj: newObj,
      };
      break;
    case "clickPrev":
      newIndex -= 1;
      return {
        ...state,
        prevIndex: prev,
        gameIndex: newIndex,
      };
      break;
    case "finish":
      let newObjFinished = state.gameObj;
      newObjFinished[action.payload.blanks[prev]] = action.payload.value;
      return {
        ...state,
        gameObj: newObjFinished,
      };
      break;
    default:
      return state;
      break;
  }
}

export default function MadLibsGame({
  story,
  setResult,
}: {
  story: string;
  setResult: Dispatch<SetStateAction<any | null>>;
}) {
  const [state, dispatch] = useReducer(reducer, {
    gameIndex: 0,
    prevIndex: -1,
    gameObj: splitStory(story),
  });

  const blanksArr = useRef<string[]>(Object.keys(state.gameObj));
  const textboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textboxRef.current) {
      if (state.prevIndex < state.gameIndex) {
        if (state.gameObj[blanksArr.current[state.gameIndex]]) {
          textboxRef.current.value =
            state.gameObj[blanksArr.current[state.gameIndex]];
        } else {
          textboxRef.current.value = "";
        }
      } else {
        textboxRef.current.value =
          state.gameObj[blanksArr.current[state.gameIndex]];
      }
    }
  }, [state.gameIndex]);

  return (
    <div className={styles.madlibsContentBlock}>
      <div className={styles.madlibsHeading}>
        {processPrompt(
          blanksArr.current[state.gameIndex],
          blanksArr.current,
          state.gameObj,
          state.gameIndex
        )}
      </div>
      <div className={styles.madlibsMainContent}>
        <input
          type="text"
          aria-label="input the prompt"
          className={styles.madlibsTextbox}
          id="madlibsTextbox"
          ref={textboxRef}
        />
        <div className={styles.madlibsPartialButtonContainer}>
          {state.gameIndex > 0 && (
            <div
              className={`${styles.madlibsPartialButton} ${styles.madlibsLeftButton}`}
              onClick={() => {
                dispatch({ type: "clickPrev" });
              }}
            >
              <IconArrowLeft strokeWidth={3} /> Prev
            </div>
          )}
          <div
            className={`${styles.madlibsPartialButton} ${styles.madlibsRightButton}`}
            onMouseUp={() => {
              if (textboxRef.current && textboxRef.current.value.length) {
                if (state.gameIndex < blanksArr.current.length - 1) {
                  dispatch({
                    type: "clickNext",
                    payload: {
                      value: textboxRef.current?.value || "",
                      blanks: blanksArr.current,
                    },
                  });
                } else {
                  dispatch({
                    type: "finish",
                    payload: {
                      value: textboxRef.current?.value || "",
                      blanks: blanksArr.current,
                    },
                  });
                  setResult(state.gameObj);
                }
              }
            }}
          >
            Next <IconArrowRight strokeWidth={3} />
          </div>
        </div>
        <div className={styles.madlibsProgressBarContainer}>
          <div className={styles.madlibsProgressBar}>
            <span
              className={styles.madlibsProgress}
              style={{
                width: `${(state.gameIndex / blanksArr.current.length) * 100}%`,
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}
