import styles from "../../styles/Survey.module.scss";

import Tabs from "component/utility/Tabs";

export default function WordCloud() {
  return (
    <div className={styles.wordCloud}>
      <h2 id="cloud">word cloud</h2>
      <p>
        to further analyze the words that appeared the most often in
        people&apos;s responses, i decided to create some <q>word clouds</q> for
        each character. the reason why <q>word clouds</q> is in quotes is
        because i don&apos;t really know how to make a proper word cloud, so
        i&apos;ll only analyze frequency by font size and text color.
      </p>
      <Tabs
        content={[
          {
            value: "most",
            name: "most desirable",
            content: <p>most desirable content</p>,
          },
          {
            value: "least",
            name: "least desirable",
            content: <p>least desirable content</p>,
          },
        ]}
        defaultValue="most"
      />
    </div>
  );
}
