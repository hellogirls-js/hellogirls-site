import { IconBrandGithub, IconBrandTwitter, IconMoonStars, IconSunFilled } from "@tabler/icons-react";
import { DarkModeContext } from "context/DarkModeContext";
import { useContext } from "react";
import styles from "./Menu.module.scss";
import Link from "next/link";

export default function Menu() {
  const { colorTheme, toggleColorTheme } = useContext(DarkModeContext);

  const ICON_SIZE = 24;
  const buttonIcon = colorTheme === "dark" ? <IconMoonStars size={ICON_SIZE} /> : <IconSunFilled size={ICON_SIZE} />;
  
  return (
    <div className={`${styles.menu} ${styles[colorTheme]}`}>
      <div className={styles.socials}>
        <Link href="https://github.com/neeneemi/hellogirls-site">
          <IconBrandGithub size={ICON_SIZE} />
        </Link>
        <Link href="https://twitter.com/HELLOGlRLS">
          <IconBrandTwitter size={ICON_SIZE} />
        </Link>
      </div>
      <button id="theme-toggle" className={styles.toggleButton} onClick={() => { toggleColorTheme() }}>
        {buttonIcon} <span id={styles.buttonText}>{colorTheme} mode</span>
      </button>
    </div>
  )
}