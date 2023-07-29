import { Dispatch, SetStateAction } from "react";

import styles from "../../styles/MadLibs.module.scss";

import { generateStory } from "./utility";

export default function MadLibsHome({
  setCurrentPage,
  setStory,
  setStoryError,
}: {
  setCurrentPage: Dispatch<SetStateAction<Page>>;
  setStory: Dispatch<SetStateAction<string | null>>;
  setStoryError: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className={`${styles.madlibsHome} ${styles.madlibsContentBlock}`}>
      <div className={`${styles.madlibsSoraStart} ${styles.madlibsHeading}`}>
        <h3>
          <span style={{ display: "inline-block", transform: "rotate(1deg)" }}>
            H
          </span>
          <span style={{ display: "inline-block", transform: "rotate(-1deg)" }}>
            I
          </span>
          <span>H</span>
          <span style={{ display: "inline-block", transform: "rotate(1deg)" }}>
            I
          </span>
          <span>~</span>
          <span style={{ display: "inline-block", transform: "rotate(2deg)" }}>
            !
          </span>{" "}
          Welcome to Mad Libs!
        </h3>
      </div>
      <div className={styles.madlibsMainContent}>
        <div
          className={styles.madlibsButton}
          onClick={() => generateStory(setCurrentPage, setStory, setStoryError)}
        >
          Start Game
        </div>
        <div
          className={styles.madlibsButton}
          onClick={() => setCurrentPage("instructions")}
        >
          Instructions
        </div>
      </div>
    </div>
  );
}
