import { useContext, useEffect } from "react";

import styles from "./DataLayout.module.scss";

import { DarkModeContext } from "context/DarkModeContext";
import Menu from "component/MainLayout/Menu";

export default function DataLayout({
  children,
  pageTitle,
}: {
  children: any;
  pageTitle: string;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  useEffect(() => {
    document.body.className = styles[colorTheme];
  }, [colorTheme]);

  return (
    <div className={`${styles.data} ${styles[colorTheme]}`}>
      <Menu />
      <main className={styles.pageContent}>{children}</main>
    </div>
  );
}
