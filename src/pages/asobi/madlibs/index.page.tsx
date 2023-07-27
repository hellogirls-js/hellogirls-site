import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from "../styles/MadLibs.module.scss";
import AsobiSora1 from "../../../../assets/asobi_sora_1.png";
import AsobiSora2 from "../../../../assets/asobi_sora_2.png";
import AsobiSora3 from "../../../../assets/asobi_sora_3.png";

import { generateStory, splitStory } from "./components/utility";

import AsobiLayout from "component/ASOBILayout";

function MadLibsHome({
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

function MadLibsInstructions({
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
      <div className={styles.madlibsMainContent}>
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

function MadLibsGame({ story }: { story: string }) {
  const gameObj = splitStory(story);
  return <div className={styles.madlibsContentBlock}></div>;
}

function MadLibsLoading() {
  return <h3>Loading...</h3>;
}

export default function MadLibs() {
  const [soraImg, setSoraImg] = useState(AsobiSora1);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [story, setStory] = useState<string | null>(null);
  const [storyError, setStoryError] = useState<boolean>(false);

  useEffect(() => {
    if (currentPage === "instructions") setSoraImg(AsobiSora2);
    if (currentPage === "home" || currentPage === "game")
      setSoraImg(AsobiSora1);
    if (currentPage === "result") setSoraImg(AsobiSora3);
  }, [currentPage]);

  return (
    <AsobiLayout title="Mad Libs">
      <div className={styles.madlibsContainer}>
        {currentPage === "home" && (
          <MadLibsHome
            setCurrentPage={setCurrentPage}
            setStory={setStory}
            setStoryError={setStoryError}
          />
        )}
        {currentPage === "instructions" && (
          <MadLibsInstructions setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "loading" && <MadLibsLoading />}
        {currentPage === "game" && story && !storyError && (
          <MadLibsGame story={story} />
        )}
        <div className={styles.madlibsSora}>
          <Image
            src={soraImg.src}
            alt="sora"
            width={soraImg.width}
            height={soraImg.height}
          />
        </div>
      </div>
    </AsobiLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "Mad Libs | ASOBI!",
    },
  };
}
