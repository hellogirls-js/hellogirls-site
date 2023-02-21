import Link from "next/link";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  IconCat,
  IconFolders,
  IconHeart,
  IconNews,
  IconPhotoHeart,
  IconUsers,
} from "@tabler/icons-react";

import styles from "./Navigation.module.scss";

import { DarkModeContext } from "context/DarkModeContext";
import Tooltip from "component/utility/Tooltip";

function NavigationButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      id="nav-button"
      className={`${styles.button}${isOpen ? ` ${styles.openButton}` : ""}`}
      onClick={() => {
        onClick(!isOpen);
      }}
    >
      <IconHeart size={40} />
    </div>
  );
}

function NavigationMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : styles.closed}`}>
      <ul>
        <li>
          <Link href="/projects">
            <IconFolders size={16} /> projects
          </Link>
        </li>
        <li>
          <Link href="/posts">
            <IconNews size={16} /> posts
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <IconPhotoHeart size={16} /> art gallery
          </Link>
        </li>
        <li>
          <Link href="/ocs">
            <IconUsers size={16} /> oc profiles
          </Link>
        </li>
        <li>
          <Link href="/cat">
            <IconCat size={16} /> moo moo
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function Navigation() {
  const { colorTheme } = useContext(DarkModeContext);
  const [isOpen, openMenu] = useState<boolean>(false);

  return (
    <div className={`${styles.nav} ${styles[colorTheme]}`}>
      <Tooltip label="navigation" position="bottom">
        <NavigationButton isOpen={isOpen} onClick={openMenu} />
      </Tooltip>

      <NavigationMenu isOpen={isOpen} />
    </div>
  );
}
