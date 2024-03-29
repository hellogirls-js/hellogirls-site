import {
  IconBrandGithub,
  IconBrandTwitter,
  IconCoffee,
  IconMessageCircle,
  IconMoonStars,
  IconSunFilled,
} from "@tabler/icons-react";
import { useContext } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

import styles from "./Menu.module.scss";

import { DarkModeContext } from "context/DarkModeContext";
import ScrollIndicator from "component/utility/ScrollIndicator";

export default function Menu() {
  const { colorTheme, toggleColorTheme } = useContext(DarkModeContext);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const ICON_SIZE = isMobile ? 20 : 24;
  const buttonIcon =
    colorTheme === "dark" ? (
      <IconMoonStars size={ICON_SIZE} />
    ) : (
      <IconSunFilled size={ICON_SIZE} />
    );

  return (
    <div className={`${styles.menu} ${styles[colorTheme]}`}>
      <ScrollIndicator />
      <div className={styles.right}>
        <div className={styles.socials}>
          <Link href="https://twitter.com/hellogirls_dev" target="_blank">
            <IconBrandTwitter size={ICON_SIZE} />
          </Link>
          <Link href="https://github.com/hellogirls-js" target="_blank">
            <IconBrandGithub size={ICON_SIZE} />
          </Link>
          <Link href="mailto:son@hellogirls.info" target="_blank">
            <IconMessageCircle size={ICON_SIZE} />
          </Link>
          <Link href="https://www.buymeacoffee.com/hellogirls" target="_blank">
            <IconCoffee size={ICON_SIZE} />
          </Link>
        </div>
        <button
          id="theme-toggle"
          className={styles.toggleButton}
          onClick={() => {
            toggleColorTheme();
          }}
        >
          {buttonIcon} <span id={styles.buttonText}>{colorTheme}</span>
        </button>
      </div>
    </div>
  );
}
