import { Dispatch, SetStateAction } from "react";

export function splitStory(story: string) {
  let splitStory = story.split("|");
  const blanks = splitStory.filter(
    (phrase) => phrase === phrase.toUpperCase() && phrase.length > 1
  );
  const uniqueBlanks = Array.from(new Set(blanks));
  const objectPairArr = blanks.map((blank) => {
    return [blank, null];
  });
  const blanksObj = Object.fromEntries(objectPairArr);
  console.log(blanksObj);
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
        console.log(data);
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
