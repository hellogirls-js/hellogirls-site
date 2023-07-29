import { Dispatch, SetStateAction } from "react";

import styles from "../../styles/MadLibs.module.scss";

export default function MadLibsInstructions({
  setCurrentPage,
}: {
  setCurrentPage: Dispatch<SetStateAction<Page>>;
}) {
  return (
    <div
      className={`${styles.madlibsInstructions} ${styles.madlibsContentBlock}`}
    >
      <div className={`${styles.madlibsSoraStart} ${styles.madlibsHeading}`}>
        <h3>How to Play</h3>
      </div>
      <div className={styles.madlibsMainContent} style={{ marginTop: "0vh" }}>
        <p>
          Here&apos;s how this works! Sora will give the player a series of
          prompts, asking for words that fulfill a specific category, such as a
          noun, verb, or adjective.
        </p>
        <p>
          These words will be used to fill in the blanks for a story that is
          unknown to the player. Once all of the words are given, Sora will
          reveal the finished story to the player with all the words filled in!
        </p>
        <p>
          Sounds fun, right? The player should be creative with the words they
          choose. That way, the player can create a compelling story! Haha~
        </p>
        <div className={styles.madlibsPartialButtonContainer}>
          <div
            className={`${styles.madlibsPartialButton} ${styles.madlibsRightButton}`}
            onClick={() => setCurrentPage("home")}
          >
            Ok!
          </div>
        </div>
      </div>
    </div>
  );
}
