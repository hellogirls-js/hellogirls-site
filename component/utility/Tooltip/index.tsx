import { CSSProperties } from "react";

import styles from "./Tooltip.module.scss";

export default function Tooltip({
  label,
  style,
  children,
}: {
  label: string;
  style?: CSSProperties;
  children: any;
}) {
  return (
    <div className={styles.wrapper} style={style}>
      {children}
      <div className={styles.tooltip}>{label}</div>
    </div>
  );
}
