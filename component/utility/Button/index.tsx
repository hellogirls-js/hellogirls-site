import { CSSProperties, RefObject, useContext } from "react";

import styles from "./Button.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Button({
  value,
  refProp,
  onClick,
  type = "button",
  icon,
  alignIcon = "left",
  style,
  disabled = false,
  buttonStyle,
}: {
  value?: string;
  refProp?: RefObject<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  alignIcon?: "left" | "right";
  disabled?: boolean;
  style?: CSSProperties;
  buttonStyle?: CSSProperties;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <div
      className={`${styles[colorTheme]} ${styles.buttonContainer}`}
      style={style}
    >
      <button
        onClick={onClick}
        className={[
          styles.button,
          alignIcon === "left" ? styles.leftIcon : styles.rightIcon,
        ].join(" ")}
        type={type}
        style={buttonStyle}
        ref={refProp}
        {...{ disabled }}
      >
        {icon}
        {value}
      </button>
    </div>
  );
}
