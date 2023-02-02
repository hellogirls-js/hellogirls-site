import {
  IconBrandGithub,
  IconBrandTwitter,
  IconMessageCircle,
  IconMoonStars,
  IconSunFilled,
} from "@tabler/icons-react";
import { useContext } from "react";
import Link from "next/link";

import styles from "./Menu.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Menu() {
  const { colorTheme, toggleColorTheme } = useContext(DarkModeContext);

  const ICON_SIZE = 24;
  const buttonIcon =
    colorTheme === "dark" ? (
      <IconMoonStars size={ICON_SIZE} />
    ) : (
      <IconSunFilled size={ICON_SIZE} />
    );

  return (
    <div className={`${styles.menu} ${styles[colorTheme]}`}>
      <div className={styles.socials}>
        <Link href="https://github.com/neeneemi/hellogirls-site">
          <IconBrandGithub size={ICON_SIZE} />
        </Link>
        <Link href="https://twitter.com/HELLOGlRLS">
          <IconBrandTwitter size={ICON_SIZE} />
        </Link>
        <Link href="https://retrospring.net/@hellogirls">
          <IconMessageCircle size={ICON_SIZE} />
        </Link>
      </div>
      <button
        id="theme-toggle"
        className={styles.toggleButton}
        onClick={() => {
          toggleColorTheme();
        }}
      >
        {buttonIcon}{" "}
        <span id={styles.buttonText}>
          {colorTheme} mode{colorTheme === "dark" && " (WIP)"}
        </span>
      </button>
    </div>
  );
}
