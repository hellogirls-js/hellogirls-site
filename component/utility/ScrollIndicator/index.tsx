import { useContext } from "react";
import { motion, useScroll } from "framer-motion";

import styles from "./ScrollIndicator.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function ScrollIndicator() {
  const { colorTheme } = useContext(DarkModeContext);

  const { scrollYProgress } = useScroll();

  return (
    <div className={styles[colorTheme]}>
      <div className={styles.indicator}>
        <motion.div
          className={styles.bar}
          id="bar"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </div>
  );
}
