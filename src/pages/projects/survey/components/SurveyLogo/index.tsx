import { CSSProperties, MutableRefObject, useContext } from "react";
import { AnimationScope } from "framer-motion";

import styles from "./SurveyLogo.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function SurveyLogo({
  logoRef,
  largeRef,
  smallRef,
  year,
  style,
}: {
  logoRef?: AnimationScope<any>;
  largeRef?: MutableRefObject<any>;
  smallRef?: MutableRefObject<any>;
  year: string;
  style?: CSSProperties;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <div className={styles.logoContainer} ref={logoRef}>
      <div
        className={`${styles.logo} ${styles[colorTheme]}`}
        ref={largeRef}
        style={style}
      >
        <div className={styles.mainText}>
          <span className={styles.bold}>E</span>n
          <span className={styles.bold}>S</span>urvey
        </div>
        <div className={styles.subtext} ref={smallRef}>
          {year}
        </div>
      </div>
    </div>
  );
}
