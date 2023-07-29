import { Dispatch, SetStateAction } from "react";

import styles from "../../styles/MadLibs.module.scss";

/**
 * given a story, finds the blanks and compiles them into an object
 * @param story the story string
 * @returns object with keys representing the word prompts
 */
export function splitStory(story: string) {
  let splitStory = story.split("|");
  const blanks = splitStory.filter(
    (phrase) =>
      phrase === phrase.toUpperCase() &&
      phrase.length > 2 &&
      /^[a-zA-Z0-9_]*$/.test(phrase)
  );
  const uniqueBlanks = Array.from(new Set(blanks));
  const objectPairArr = uniqueBlanks.map((blank) => {
    return [blank, null];
  });
  const blanksObj = Object.fromEntries(objectPairArr);
  return blanksObj;
}

export function generateStory(
  setCurrentPage: Dispatch<SetStateAction<Page>>,
  setStory: Dispatch<SetStateAction<string | null>>,
  setStoryError: Dispatch<SetStateAction<boolean>>
) {
  setCurrentPage("loading");
  fetch("/api/stories/get")
    .then((res) => {
      res.json().then((data) => {
        const story = data.text;
        setCurrentPage("game");
        setStoryError(false);
        setStory(story);
      });
    })
    .catch(() => {
      setCurrentPage("error");
      setStoryError(true);
    });
}

export function processPrompt(
  prompt: string,
  blankArr: string[],
  gameObj: any,
  index: number
) {
  const splitPrompt = prompt.split("_");
  const wordType = splitPrompt[0];
  const joinedPrompt = [splitPrompt[0], splitPrompt[1]].join("_");
  const currentIndex = blankArr.indexOf(prompt);
  if (
    splitPrompt.length > 2 &&
    blankArr.indexOf(joinedPrompt) > 0 &&
    blankArr.indexOf(joinedPrompt) < currentIndex
  ) {
    // if this is an altered version of an existing word
    const ogWord = blankArr[blankArr.indexOf(joinedPrompt)];
    if (wordType === "VERB") {
      if (splitPrompt[2] === "PASTTENSE") {
        return (
          <h3>
            Give Sora the{" "}
            <span className={styles.wordPrompt}>past tense form</span> of{" "}
            <span className={styles.wordPrompt}>{gameObj[ogWord]}</span>
          </h3>
        );
      } else if (splitPrompt[2] === "ING") {
        return (
          <h3>
            Give Sora the <span className={styles.wordPrompt}>active form</span>{" "}
            of <span className={styles.wordPrompt}>{gameObj[ogWord]}</span>{" "}
            (ending in -ing)!
          </h3>
        );
      }
    } else if (wordType === "NOUN") {
      if (splitPrompt[2] === "PLURAL") {
        return (
          <h3>
            Give Sora the <span className={styles.wordPrompt}>plural form</span>{" "}
            of <span className={styles.wordPrompt}>{gameObj[ogWord]}</span>
          </h3>
        );
      }
    }
  } else if (splitPrompt.length > 2) {
    // altered word prompt
    if (wordType.toLowerCase() === "verb") {
      if (splitPrompt[2] === "PASTTENSE") {
        return (
          <h3>
            Give Sora a{" "}
            <span className={styles.wordPrompt}>past tense {wordType}</span>!
          </h3>
        );
      } else if (splitPrompt[2] === "ING") {
        return (
          <h3>
            Give Sora a{" "}
            <span className={styles.wordPrompt}>{wordType} ending in -ing</span>
            !
          </h3>
        );
      }
    } else if (wordType === "NOUN") {
      if (splitPrompt[2] === "PLURAL") {
        return (
          <h3>
            Give Sora a{" "}
            <span className={styles.wordPrompt}>plural {wordType}</span>!
          </h3>
        );
      }
    }
  } else if (
    splitPrompt.length === 2 &&
    blankArr.findIndex((p) => p.includes(joinedPrompt)) >= 0 &&
    blankArr.find((p) => p.includes(joinedPrompt)) !== undefined &&
    blankArr.filter((p) => p.includes(joinedPrompt)).length > 2 &&
    blankArr.findIndex((p) => p.includes(joinedPrompt)) < index
  ) {
    // need the original version of an existing altered word
    const adjustedWord = blankArr.filter((p) => p.includes(joinedPrompt))[0];
    const ogWord = blankArr[blankArr.indexOf(adjustedWord)];
    const splitAdjustedWord = adjustedWord.split("_");
    if (wordType === "VERB") {
      if (splitAdjustedWord[2] === "PASTTENSE") {
        return (
          <h3>
            Give Sora the{" "}
            <span className={styles.wordPrompt}>present tense form</span> of{" "}
            <span className={styles.wordPrompt}>{gameObj[ogWord]}</span>
          </h3>
        );
      } else if (splitAdjustedWord[2] === "ING") {
        return (
          <h3>
            Give Sora the{" "}
            <span className={styles.wordPrompt}>regular form</span> of{" "}
            <span className={styles.wordPrompt}>{gameObj[ogWord]}</span>
          </h3>
        );
      }
    } else if (wordType === "NOUN") {
      if (splitAdjustedWord[2] === "PLURAL") {
        return (
          <h3>
            Give Sora the{" "}
            <span className={styles.wordPrompt}>singular form</span> of{" "}
            <span className={styles.wordPrompt}>{gameObj[ogWord]}</span>
          </h3>
        );
      }
    }
  } else {
    return (
      <h3>
        Give Sora {/[aeiou]/.test(wordType.toLowerCase()[0]) ? "an" : "a"}{" "}
        <span className={styles.wordPrompt}>
          {wordType === "ENSTARSUNIT"
            ? "Ensemble Stars unit"
            : wordType === "BODYPART"
            ? "body part"
            : wordType}
        </span>
        !
      </h3>
    );
  }
}

export function createStory(givenWords: any, story: string): JSX.Element {
  let splitStory = story.split("|");
  return (
    <p className={styles.madlibsResult}>
      {splitStory.map((phrase, i) => {
        if (phrase.toUpperCase() === phrase && phrase.length > 2) {
          return (
            <span key={i} className={styles.givenWord}>
              {givenWords[phrase]}
            </span>
          );
        } else {
          return phrase;
        }
      })}
    </p>
  );
}
