import { ReactNode } from "react";

import styles from "./Asobi.module.css";

export default function Asobi({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div id="asobi-layout">
      <div className={styles.sidebar}>
        <header className={styles.header}>
          <div id="site-logo">
            <span className={`${styles.logoLetter} ${styles.logoLetterA}`}>
              A
            </span>
          </div>
        </header>
      </div>
      <div className={styles.content}></div>
    </div>
  );
}
