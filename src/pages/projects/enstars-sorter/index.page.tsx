/* eslint-disable prettier/prettier */
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./styles/CharaSorter.module.scss";

import { getData } from "utils/data";
import SorterGame from "./components/SorterGame";

const defaultOptions: SorterFilterOptions = {
  teachers: false,
  anzu: false,
  gatekeeper: false,
  newface: true,
  nice: true,
  seiya: false,
  madamoiselle: false,
  kaname: false,
};

export default function CharaSorter(props: any) {
  const [isSorting, setIsSorting] = useState(true);
  const [currentMatchup, setCurrentMatchup] = useState();
  const [filterOptions, setFilterOptions] =
    useState<SorterFilterOptions>(defaultOptions);
  const [openOptionsMenu, setOpenOptionsMenu] = useState(false);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.leftSide}>
          <h1>Ensemble Stars!! Character Sorter</h1>
          <div>made by <a href="https://about.hellogirls.info" target="_blank">son</a></div>
        </div>
        <div className={styles.optionsContainer}>
          <button className={styles.optionsButton} onClick={() => setOpenOptionsMenu(prev => !prev)}>
            <IconAdjustmentsHorizontal />
          </button>
          <AnimatePresence>
            {openOptionsMenu && (
              <motion.menu
                className={styles.optionsMenu}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
              >
                {(
                  Object.keys(filterOptions) as Array<
                    keyof typeof filterOptions
                  >
                ).map((option: keyof typeof filterOptions) => (
                  <div key={option}>
                    <div className={styles.optionsMenuCheckContainer}>
                      <input
                        type="checkbox"
                        checked={filterOptions[option]}
                        onChange={(e: ChangeEvent) => {
                          setFilterOptions((prev) => ({
                            ...prev,
                            [option]: (e.target as HTMLInputElement).checked,
                          }));
                        }}
                      />
                      {option === "newface"
                        ? "4Piece"
                        : option === "nice"
                        ? "Nice Arneb Thunder"
                        : `${option[0].toUpperCase()}${option.slice(1)}`}
                    </div>
                  </div>
                ))}
              </motion.menu>
            )}
          </AnimatePresence>
        </div>
      </header>
      <main className={styles.content}>
        <SorterGame />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const enData = await getData(TL_DATA_URL);
  return {
    props: {
      title: "enstars character sorter!",
      enData: enData.data,
    },
  };
}
