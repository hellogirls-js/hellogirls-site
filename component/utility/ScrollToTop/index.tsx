import { IconArrowUp } from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";

import Tooltip from "../Tooltip";

import styles from "./ScrollToTop.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function ScrollToTop() {
  const { colorTheme } = useContext(DarkModeContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(document.documentElement.scrollTop);
    });

    (buttonRef.current as HTMLDivElement).addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    if (scroll > 300) {
      setVisible(true);
    } else if (scroll <= 300) {
      setVisible(false);
    }
  }, [scroll]);

  return (
    <div className={`${styles.scrollToTop} ${styles[colorTheme]}`}>
      <Tooltip label="back to top" position="bottom">
        <div
          id="scroll-to-top"
          ref={buttonRef}
          className={styles.scrollButton}
          style={{
            visibility: visible ? "visible" : "hidden",
            opacity: visible ? 1 : 0,
          }}
        >
          <IconArrowUp size={40} />
        </div>
      </Tooltip>
    </div>
  );
}
