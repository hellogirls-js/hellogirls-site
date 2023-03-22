import { useContext } from "react";

import styles from "./Radio.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Radio({
  id,
  name,
  value,
  label,
}: {
  id?: string;
  name?: string;
  value?: string;
  label?: string;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div className={`${styles.radio} ${styles[colorTheme]}`}>
      <input type="radio" value={value} id={id} name={name} />
      {label && <label htmlFor={value}>{label}</label>}
    </div>
  );
}
