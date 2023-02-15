import { ReactNode, useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";

import styles from "./Accordion.module.scss";

export default function Accordion({
  title,
  icon = <IconChevronDown size={30} />,
  children,
}: {
  title?: string | ReactNode;
  icon?: any;
  children: any;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDrawer = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
    },
  };

  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{title}</h3>
        <motion.div
          className={styles.accordionIcon}
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          {icon}
        </motion.div>
      </div>
      <motion.div
        className={styles.accordionContent}
        variants={openDrawer}
        initial="hidden"
        animate={isOpen ? "hidden" : "visible"}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
