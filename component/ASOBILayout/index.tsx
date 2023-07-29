import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./AsobiLayout.module.scss";

function AsobiHeader({ title }: { title?: string }) {
  return (
    <header className={styles.asobiHeader}>
      <div className={styles.asobiLogo}>
        <span className={`${styles.logoLetter} ${styles.logoLetterA}`}>A</span>
        <span className={`${styles.logoLetter} ${styles.logoLetterS}`}>S</span>
        <span className={`${styles.logoLetter} ${styles.logoLetterO}`}>O</span>
        <span className={`${styles.logoLetter} ${styles.logoLetterB}`}>B</span>
        <span className={`${styles.logoLetter} ${styles.logoLetterI}`}>I</span>
        <span className={`${styles.logoLetter} ${styles.logoLetterExclaim}`}>
          !
        </span>
      </div>
      <div className={styles.asobiTitle}>
        <h2>{title}!</h2>
      </div>
    </header>
  );
}

function AsobiFooter() {
  return (
    <footer className={styles.asobiFooter}>
      <div className={styles.asobiCharas}>
        {[7, 8, 37, 42, 71].map((id) => (
          <Image
            src={`https://assets.enstars.link/assets/character_sd_square1_${id}.png`}
            alt={`${id}`}
            key={id}
            width={75}
            height={75}
          />
        ))}
      </div>
      <p>
        Made by{" "}
        <Link href="https://hellogirls.info" target="_blank">
          Son
        </Link>
        . If you like what I&apos;m doing, you can{" "}
        <Link href="https://buymeacoffee.com/hellogirls" target="_blank">
          buy me a coffee
        </Link>
        !
      </p>
    </footer>
  );
}

export default function AsobiLayout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div id="asobi-layout" className={styles.asobi}>
      <AsobiHeader title={title} />
      <div className={styles.asobiContainer}>{children}</div>
      <AsobiFooter />
    </div>
  );
}
