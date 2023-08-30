import { CSSProperties } from "react";

import styles from "./Tooltip.module.scss";

export default function Tooltip({
  label,
  style,
  position,
  children,
}: {
  label: string;
  style?: CSSProperties;
  position: "top" | "bottom";
  children: any;
}) {
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={`${styles.tooltip} ${styles[position]}`} style={style}>
        {label}
      </div>
    </div>
  );
}
