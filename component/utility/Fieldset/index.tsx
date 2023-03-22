import { useContext } from "react";

import styles from "./Fieldset.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Fieldset({
  legend,
  children,
}: {
  legend?: string;
  children: any;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <fieldset className={`${styles.fieldset} ${styles[colorTheme]}`}>
      <legend className={styles.legend}>{legend}</legend>
      {children}
    </fieldset>
  );
}
