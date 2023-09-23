import { CSSProperties, MutableRefObject, useContext } from "react";

import styles from "./TextArea.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Textarea({
  label,
  refProp,
  placeholder,
  value,
  name,
  id,
  style,
  textareaStyle,
  required,
  rows = 8,
}: {
  label?: string;
  refProp?: MutableRefObject<HTMLTextAreaElement | null>;
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  style?: CSSProperties;
  textareaStyle?: CSSProperties;
  required?: boolean;
  rows?: number;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div
      className={[styles.textareaContainer, styles[colorTheme]].join(" ")}
      style={style}
    >
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        ref={refProp}
        placeholder={placeholder}
        name={name}
        value={value}
        aria-label={label || name || "textarea"}
        style={textareaStyle}
        required={required}
        rows={rows}
      />
    </div>
  );
}
