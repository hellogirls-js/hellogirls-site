import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import { useContext } from "react";

import styles from "./PageHeader.module.scss";

import Tooltip from "component/utility/Tooltip";
import { DarkModeContext } from "context/DarkModeContext";

export default function PageHeader({ title }: { title: string }) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div className={`${styles.pageHeader} ${styles[colorTheme]}`}>
      <Tooltip label="back to home" position="bottom">
        <div className={styles.homeButton}>
          <a href="/projects/survey/2023">
            <IconArrowLeft size={32} />
            <IconHome size={40} />
          </a>
        </div>
      </Tooltip>
      <h1>{title}</h1>
    </div>
  );
}
