import { useContext, useEffect, useState } from "react";

import styles from "./ScrollIndicator.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function ScrollIndicator() {
  const { colorTheme } = useContext(DarkModeContext);

  const [barWidth, setBarWidth] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", (ev) => {
      let winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      let height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      let scrolled = (winScroll / height) * 100;
      setBarWidth(scrolled);
    });
  }, []);

  useEffect(() => {
    if (
      document.getElementById("bar") &&
      document.getElementById("bar") !== null
    )
      document.getElementById("bar").style.width = `${barWidth}%`;
  }, [barWidth]);

  return (
    <div className={styles[colorTheme]}>
      <div className={styles.indicator}>
        <div className={styles.bar} id="bar" />
      </div>
    </div>
  );
}
