import { useContext } from "react";

import styles from "./TextArea.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Textarea({
  id,
  cols,
  disabled = false,
  minlength,
  maxlength,
  placeholder,
  readonly = false,
  required = false,
  resizable = false,
  rows,
  wrap,
  children,
}: {
  id?: string;
  cols?: number;
  disabled?: boolean;
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  resizable?: boolean;
  rows?: number;
  wrap?: "hard" | "soft";
  children?: any;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div className={`${styles.textareaContainer} ${styles[colorTheme]}`}>
      <textarea
        className={styles.textarea}
        id={id}
        cols={cols}
        rows={rows}
        disabled={disabled}
        minLength={minlength}
        maxLength={maxlength}
        placeholder={placeholder}
        readOnly={readonly}
        required={required}
        wrap={wrap}
        style={{ resize: resizable ? "vertical" : "none" }}
      >
        {children}
      </textarea>
    </div>
  );
}
