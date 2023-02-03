import { useContext, useEffect, useState } from "react";

import styles from "./ScrollIndicator.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function ScrollIndicator() {
  const { colorTheme } = useContext(DarkModeContext);

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    });
  }, []);

  return (
    <div className={styles[colorTheme]}>
      <div className={styles.indicator}>
        <div
          className={styles.bar}
          id="bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
