import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  MutableRefObject,
} from "react";
import { IconCat, IconFolders, IconHeart, IconNews } from "@tabler/icons-react";
import { useClickOutside } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";

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
        onClick(true);
      }}
    >
      <IconHeart size={40} />
    </div>
  );
}

function NavigationMenu({
  isOpen,
  navRef,
}: {
  isOpen: boolean;
  navRef: MutableRefObject<HTMLDivElement>;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={navRef}
          className={styles.menu}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
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
              <Link href="/cat">
                <IconCat size={16} /> moo moo
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navigation() {
  const { colorTheme } = useContext(DarkModeContext);
  const [isOpen, openMenu] = useState<boolean>(false);
  const navRef = useClickOutside<HTMLDivElement>(() => {
    openMenu(false);
  });

  return (
    <div className={`${styles.nav} ${styles[colorTheme]}`}>
      <Tooltip label="navigation" position="bottom">
        <NavigationButton isOpen={isOpen} onClick={openMenu} />
      </Tooltip>

      <NavigationMenu navRef={navRef} isOpen={isOpen} />
    </div>
  );
}
