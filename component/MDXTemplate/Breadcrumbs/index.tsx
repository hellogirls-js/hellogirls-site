import { useContext } from "react";
import Link from "next/link";

import styles from "./Breadcrumbs.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function Breadcrumbs({
  title,
  pageId,
}: {
  title: string;
  pageId: number;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div className={`${styles.breadcrumbs} ${styles[colorTheme]}`}>
      <Link href="/">home</Link> / <Link href="/posts">posts</Link> /{" "}
      <Link href={`/posts/${pageId}`}>{title}</Link>
    </div>
  );
}
