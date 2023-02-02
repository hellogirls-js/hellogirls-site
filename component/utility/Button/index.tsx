import { useContext } from "react";

import styles from "./Button.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Button({
  value,
  onClick,
  icon,
}: {
  value: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <div className={`${styles[colorTheme]} ${styles.buttonContainer}`}>
      <button onClick={onClick} className={styles.button}>
        {icon}
        {value}
      </button>
    </div>
  );
}
