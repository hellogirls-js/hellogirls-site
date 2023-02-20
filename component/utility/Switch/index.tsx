import { useContext } from "react";

import styles from "./Switch.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Switch({
  leftLabel,
  rightLabel,
  checked,
  onClick,
}: {
  leftLabel?: string;
  rightLabel?: string;
  checked: boolean;
  onClick?: any;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <div
      className={`${styles.switchContainer} ${styles[colorTheme]}`}
      onClick={() => onClick(!checked)}
    >
      {leftLabel && <span className={styles.label}>{leftLabel}</span>}
      <div className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={(e) => {}} />
        <span className={styles.slider}>
          <span
            className={styles.sliderButton}
            style={{ transform: `translateX(${checked ? 26 : 0}px)` }}
          />
        </span>
      </div>
      {rightLabel && <span className={styles.label}>{rightLabel}</span>}
    </div>
  );
}
