import { useContext, useEffect } from "react";

import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import styles from "./MainLayout.module.scss";
import Menu from "./Menu";

import { DarkModeContext } from "context/DarkModeContext";

export default function MainLayout({
  children,
  heading,
}: {
  children: any;
  heading: string;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  useEffect(() => {
    document.body.className = styles[colorTheme];
  }, []);

  return (
    <div id="main-layout" className={`${styles.main} ${styles[colorTheme]}`}>
      <Menu />
      <Header heading={heading} />
      <main className={styles.component}>{children}</main>
      <Navigation />
      <Footer />
    </div>
  );
}
