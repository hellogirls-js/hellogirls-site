import { useContext, useEffect } from "react";

import styles from "./MDXLayout.module.scss";
import Breadcrumbs from "./Breadcrumbs";
import PostInfo from "./PostInfo";

import { DarkModeContext } from "context/DarkModeContext";
import Menu from "component/MainLayout/Menu";
import Navigation from "component/MainLayout/Navigation";

export const runtime = "experimental-edge";

export default function MDXTemplate({
  children,
  meta,
}: {
  children: any;
  meta: any;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  useEffect(() => {
    document.body.className = styles[colorTheme];
  }, []);

  return (
    <div id="mdx-layout" className={`${styles.mdx} ${styles[colorTheme]}`}>
      <Menu />
      <Breadcrumbs title={meta.title} pageId={meta.pageId} />
      <main className={styles.component}>
        <PostInfo meta={meta} />
        {children}
      </main>
      <Navigation />
    </div>
  );
}
