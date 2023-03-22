import Link from "next/link";
import { useContext } from "react";

import styles from "./Footer.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Footer() {
  const { colorTheme } = useContext(DarkModeContext);
  return (
    <footer className={`${styles.footer} ${styles[colorTheme]}`}>
      <p>created by son</p>
      <p>
        this website uses{" "}
        <Link href="https://nextjs.org/" target="_blank">
          nextjs
        </Link>{" "}
        and is hosted on{" "}
        <Link href="vercel.com/" target="_blank">
          vercel
        </Link>
        . icons are provided by{" "}
        <Link href="https://tabler-icons.io" target="_blank">
          tabler icons
        </Link>
        .
      </p>
    </footer>
  );
}
