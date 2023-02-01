import { useContext } from "react";
import Link from "next/link";
import TypeIt from "typeit-react";

import styles from "./Header.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Header({ heading }: { heading: string }) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <header className={`${styles.header} ${styles[colorTheme]}`}>
      <h1 className={styles.headerText}>
        <Link href="/" className={styles.headerLink}>
          <TypeIt
            options={{ speed: 100 }}
            getBeforeInit={(instance) => {
              instance
                .type(heading)
                .pause(5500)
                .delete(heading.length)
                .type("https://hellogirls.info");

              return instance;
            }}
          />
        </Link>
      </h1>
    </header>
  );
}
