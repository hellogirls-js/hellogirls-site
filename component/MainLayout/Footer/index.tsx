import Link from "next/link";

import styles from "./Footer.module.scss";
import { useContext } from "react";
import { DarkModeContext } from "context/DarkModeContext";

export default function Footer() {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <footer className={`${styles.footer} ${styles[colorTheme]}`}>
      created by son{" "}
      <Link href="https://twitter.com/HELLOGlRLS">@HELLOGlRLS</Link>
    </footer>
  );
}
