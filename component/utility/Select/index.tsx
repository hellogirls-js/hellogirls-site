import { useContext } from "react";

import styles from "./Select.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Select({
  label,
  data,
  placeholder,
  onChange,
  temporary,
}: {
  label?: string;
  data: SelectOption[];
  placeholder?: string;
  onChange?: any;
  temporary?: boolean;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div className={`${styles.selectMain} ${styles[colorTheme]}`}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={styles.select}
        onChange={(event) => {
          onChange(event.target.value);
          if (temporary) event.target.selectedIndex = 0;
        }}
      >
        {placeholder && <option>{placeholder}</option>}
        {data.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
