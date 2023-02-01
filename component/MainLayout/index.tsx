import { useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import { DarkModeContext } from "context/DarkModeContext";
import styles from "./MainLayout.module.scss";
import Menu from "./Menu";

export default function MainLayout({ children, heading }: { children: any; heading: string; }) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div id="main-layout" className={styles[colorTheme]}>
      <Menu />
      <Header heading={heading} />
      {children}
      <Navigation />
      <Footer />
    </div>
  )
}