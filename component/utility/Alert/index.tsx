import { CSSProperties, useContext } from "react";

import styles from "./Alert.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

type AlertType = "default" | "warning" | "error";

export default function Alert({
  icon,
  style,
  children,
  type = "default",
}: {
  icon?: unknown;
  style?: CSSProperties;
  children: any;
  type?: AlertType;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <div
      className={`${styles.alert} ${styles[colorTheme]} ${styles[type]}`}
      style={style}
    >
      {icon}
      {children}
    </div>
  );
}
