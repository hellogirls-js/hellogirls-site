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
      {/* <footer>
        disclaimer: the survey has over 1000 responders from twitter and tumblr.
        assume that almost all of the responders are from the english speaking
        fanbase. some biases that may be taken to account is that the person who
        conducted the survey is a crazy:b producer as well as a niki producer
        and this may affect the types of people who responded in the survey.
      </footer> */}
    </div>
  );
}
