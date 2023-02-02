import { useContext } from "react";

import styles from "./Select.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Select({
  label,
  data,
  placeholder,
  onChange,
}: {
  label?: string;
  data: SelectOption[];
  placeholder?: string;
  onChange?: any;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div className={`${styles.selectMain} ${styles[colorTheme]}`}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={styles.select}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        {placeholder && <option>{placeholder}</option>}
        {data.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
