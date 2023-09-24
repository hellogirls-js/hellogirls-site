import { CSSProperties, MutableRefObject, useContext } from "react";

import styles from "./TextInput.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function TextInput({
  refProp,
  label,
  placeholder,
  value,
  id,
  onChange,
  style,
  textboxStyle,
  name,
  required = false,
}: {
  refProp?: MutableRefObject<HTMLInputElement | null>;
  label?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  onChange?: any;
  style?: CSSProperties;
  textboxStyle?: CSSProperties;
  name?: string;
  required?: boolean;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <div className={`${styles.inputMain} ${styles[colorTheme]}`} style={style}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        ref={refProp}
        className={styles.input}
        type="text"
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        aria-label={placeholder}
        style={textboxStyle}
        name={name}
        required={required}
      />
    </div>
  );
}
