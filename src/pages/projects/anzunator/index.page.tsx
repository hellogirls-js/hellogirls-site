import { useInterval, useListState } from "@mantine/hooks";
import { IconAsterisk } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getData } from "utils/data";

import Anzu from "./components/Anzu";
import Content from "./components/Content";
import styles from "./styles/Anzunator.module.scss";
import { ANZU_REGULAR } from "./utility/images";

function Sparkle({ x, y }: { x: number; y: number }) {
  return (
    <AnimatePresence>
      <motion.span
        className={styles.sparkle}
        style={{
          left: x,
          top: y,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: Math.random(), scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <IconAsterisk size={8} color="white" />
      </motion.span>
    </AnimatePresence>
  );
}

export default function Anzunator(props: any) {
  const [vw, setVw] = useState<number>();
  const [vh, setVh] = useState<number>();
  const [image, setImage] = useState(ANZU_REGULAR);
  const [sparklePlacements, sparklesHandler] = useListState<{
    x: number;
    y: number;
  }>([]);
  const addSparkleInterval = useCallback(() => {
    if (vw && vh) {
      if (sparklePlacements.length > Math.ceil((vw ?? 750) / 15)) {
        sparklesHandler.remove(0);
      }
      const xCoord = Math.random() * vw;
      const yCoord = Math.random() * vh;
      sparklesHandler.append({ x: xCoord, y: yCoord });
    }
  }, [vw, vh]);

  const removeSparkleInterval = useCallback(() => {
    sparklesHandler.remove(0);
  }, [sparklePlacements]);

  const addSparkle = useInterval(addSparkleInterval, 999);
  const removeSparkle = useInterval(removeSparkleInterval, 1000);

  useEffect(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);

    window.addEventListener("resize", () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    });
  }, []);

  useEffect(() => {
    if (vw && vh && !addSparkle.active) {
      addSparkle.start();
    }
  }, [vw, vh]);

  useEffect(() => {
    if (
      sparklePlacements.length > Math.ceil((vw ?? 750) / 15) &&
      !removeSparkle.active
    ) {
      removeSparkle.start();
    }

    if (sparklePlacements.length === 0) {
      removeSparkle.stop();
    }
  }, [sparklePlacements]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <motion.div
          className={styles.anzuContainer}
          animate={{ opacity: [1, 0.75, 1], y: [-3, 0, 3, 0, -3] }}
          transition={{ ease: "easeInOut", duration: 5, repeat: Infinity }}
        >
          <Anzu image={image} />
        </motion.div>
        <Content setImage={setImage} enData={props.enData} />
      </div>
      <footer className={styles.credit}>
        made by <Link href="https://hellogirls.info">son</Link>
      </footer>
      <div className={styles.sparkles}>
        {sparklePlacements.map((coord) => (
          <Sparkle key={`${coord.x}${coord.y}`} {...coord} />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const enData = await getData(TL_DATA_URL);
  return {
    props: {
      title: "anzunator",
      enData: enData.data,
    },
  };
}
