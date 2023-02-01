import { IconMoonStars, IconSunFilled } from "@tabler/icons-react";
import { DarkModeContext } from "context/DarkModeContext";
import { useContext } from "react";
import styles from "./Menu.module.scss";

export default function Menu() {
  const { colorTheme, toggleColorTheme } = useContext(DarkModeContext);

  const ICON_SIZE = 24;
  const buttonIcon = colorTheme === "dark" ? <IconMoonStars size={ICON_SIZE} /> : <IconSunFilled size={ICON_SIZE} />;
  
  return (
    <div className={`${styles.menu} ${styles[colorTheme]}`}>
      <button id="theme-toggle" className={styles.toggleButton} onClick={() => { toggleColorTheme() }}>
                {buttonIcon} <span id={styles.buttonText}>{colorTheme} mode</span>
      </button>
    </div>
  )
}