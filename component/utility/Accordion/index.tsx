import { ReactNode, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";

import styles from "./Accordion.module.scss";

export default function Accordion({
  title,
  icon = <IconChevronDown />,
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
    },
    visible: {
      height: "100%",
      transition: { duration: 0.3, delay: 0.01 },
    },
  };

  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </div>
      <motion.div
        className={styles.accordionContent}
        variants={openDrawer}
        initial={"hidden"}
        animate={isOpen ? "hidden" : "visible"}
        style={{}}
      >
        {children}
      </motion.div>
    </div>
  );
}
