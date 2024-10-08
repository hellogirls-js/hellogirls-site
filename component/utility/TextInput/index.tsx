import {
  ChangeEvent,
  ClipboardEventHandler,
  CSSProperties,
  MutableRefObject,
  useContext,
} from "react";

import styles from "./TextInput.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function TextInput({
  refProp,
  label,
  placeholder,
  value,
  id,
  onChange,
  onPaste,
  style,
  textboxStyle,
  name,
  maxLength,
  disabled = false,
  required = false,
}: {
  refProp?: MutableRefObject<HTMLInputElement | null>;
  label?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onPaste?: ClipboardEventHandler;
  style?: CSSProperties;
  textboxStyle?: CSSProperties;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
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
        onPaste={onPaste}
        placeholder={placeholder}
        value={value}
        aria-label={placeholder}
        style={textboxStyle}
        name={name}
        required={required}
        maxLength={maxLength}
        disabled={disabled}
      />
    </div>
  );
}
