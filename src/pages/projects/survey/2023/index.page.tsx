import { IconSparkles } from "@tabler/icons-react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UseListStateHandlers, useListState } from "@mantine/hooks";
import {
  AnimatePresence,
  AnimationSequence,
  motion,
  stagger,
  useAnimate,
  usePresence,
} from "framer-motion";
import { Oval } from "react-loader-spinner";

import SurveyLogo from "../components/SurveyLogo";

import styles from "./styles/main.module.scss";

import { DarkModeContext } from "context/DarkModeContext";
import DataLayout from "component/DataLayout";
import getData, { shuffleArray } from "component/utility/data";

interface PageItem {
  icon: ReactNode;
  title: string;
  url: string;
  index?: number;
  handlers?: UseListStateHandlers<boolean>;
  clicked?: boolean[];
}

function HomeGridItem({
  icon,
  title,
  url,
  index,
  handlers,
  clicked,
}: PageItem) {
  return (
    <a
      className={styles.homeGridContainerItem}
      href={url}
      onClick={() => {
        handlers && index && handlers.setItem(index, true);
      }}
    >
      <div className={styles.gridItemIcon}>{icon}</div>
      <div className={styles.gridItemTitle}>{title}</div>
    </a>
  );
}

/**
 * Animates the loader that appears when images are still loading
 * @param param0 SurveyLoader props
 * @returns The animated SurveyLoader element
 */
function SurveyLoader({
  colorTheme,
  setHideLoader,
}: {
  colorTheme: ColorThemeOption;
  setHideLoader: Dispatch<SetStateAction<boolean>>;
}) {
  const [ref, animate] = useAnimate();
  const [isLoaderPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isLoaderPresent) {
      const exit = async () => {
        await animate(ref.current, { opacity: 0 });
        setHideLoader(true);
        safeToRemove();
      };

      exit();
    }
  }, [isLoaderPresent]);

  return (
    <motion.div className={styles.loading} ref={ref}>
      <Oval
        color={colorTheme === "light" ? "#7d8534" : "#b4c044"}
        secondaryColor={colorTheme === "light" ? "#7d8534" : "#b4c044"}
        strokeWidth={5}
        width="10vw"
        height="10vw"
        wrapperClass={styles.loader}
      />
    </motion.div>
  );
}

function SurveySplash({
  hideLoader,
  list,
  colorTheme,
  loadedImgs,
  imgHandlers,
  setRemoveSplash,
}: {
  hideLoader: boolean;
  list: any[];
  colorTheme: ColorThemeOption;
  loadedImgs: boolean[];
  imgHandlers: UseListStateHandlers<boolean>;
  setRemoveSplash: Dispatch<SetStateAction<boolean>>;
}) {
  const [ref, animate] = useAnimate();
  const [logoRef, animateLogo] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  const largeLogoRef = useRef();
  const smallLogoRef = useRef();

  useEffect(() => {
    if (hideLoader && isPresent) {
      const enter = async () => {
        const sequence: AnimationSequence = [
          [ref.current, { opacity: 1 }, { duration: 0.2 }],
          [
            "div",
            { transform: "translateX(0px)" },
            { duration: 0.4, delay: stagger(0.3) },
          ],
          [ref.current, { opacity: 0.05 }, { duration: 0.8, at: "+0.3" }],
        ];

        const logoSequence: AnimationSequence = [
          [largeLogoRef.current, { opacity: 1 }, { duration: 0.3, delay: 0.5 }],
          [
            smallLogoRef.current,
            {
              rotate: [
                "35deg",
                "25deg",
                "-25deg",
                "25deg",
                "-25deg",
                "25deg",
                "35deg",
              ],
            },
            { duration: 0.5, at: "+0.3" },
          ],
        ];

        await animate(sequence);
        await animateLogo(logoSequence);
        setTimeout(() => {
          setRemoveSplash(true);
        }, 500);
      };

      enter();
    }
    if (!isPresent) {
      const exit = async () => {
        await animate(ref.current, { opacity: 0 });
        safeToRemove();
      };

      exit();
    }
  }, [isPresent, hideLoader]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <SurveyLogo
        year="2023"
        largeRef={largeLogoRef}
        smallRef={smallLogoRef}
        logoRef={logoRef}
        style={{ opacity: 0 }}
      />
      <div className={styles.splashPage} ref={ref}>
        {list.map((chara: any, index: number) => {
          return (
            <div
              className={`${styles.splashChara} ${styles[colorTheme]} ${
                styles[index % 2 === 1 ? "odd" : "even"]
              }`}
              key={index}
              style={{
                zIndex: index + 1,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://assets.hellogirls.info/renders/character_full1_${chara.character_id}.png`}
                alt={chara.first_name}
                onLoad={() => {
                  if (loadedImgs.length < 4) imgHandlers.append(true);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SurveyIndexPage(props: any) {
  const pages = [
    {
      icon: <IconSparkles />,
      title: "hall of fame",
      url: "/projects/survey/2023/hall-of-fame",
    },
  ];

  const { colorTheme } = useContext(DarkModeContext);

  const [clicked, handlers] = useListState<boolean>(pages.map((page) => false));
  const [loadedImgs, imgHandlers] = useListState<boolean>([]);
  const [hideLoader, setHideLoader] = useState<boolean>(false);
  const [removeSplash, setRemoveSplash] = useState<boolean>(false);

  const homeRef = useRef(null);

  const charaList = shuffleArray(props.enData.data);
  const croppedList = charaList.slice(0, 4);

  return (
    <DataLayout pageTitle={props.title}>
      <div className={`${styles.page} ${styles[colorTheme]}`}>
        <AnimatePresence>
          {loadedImgs.length < 4 && !hideLoader && (
            <SurveyLoader
              colorTheme={colorTheme}
              setHideLoader={setHideLoader}
            />
          )}
        </AnimatePresence>
        <div
          style={{
            height: "100%",
            display: hideLoader ? "block" : "none",
          }}
        >
          <AnimatePresence>
            {!removeSplash && (
              <SurveySplash
                hideLoader={hideLoader}
                colorTheme={colorTheme}
                list={croppedList}
                loadedImgs={loadedImgs}
                imgHandlers={imgHandlers}
                setRemoveSplash={setRemoveSplash}
              />
            )}
          </AnimatePresence>

          {removeSplash && (
            <motion.div
              className={styles.home}
              ref={homeRef}
              initial={{ y: 1000, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, delay: 1 },
              }}
            >
              <h1>choose a page to explore...</h1>
              <div className={styles.homeGridContainer}>
                {pages.map((page, i) => (
                  <HomeGridItem
                    key={i}
                    {...page}
                    index={i}
                    handlers={handlers}
                    clicked={clicked}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </DataLayout>
  );
}

export async function getServerSideProps() {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const DATA_URL = "https://data.ensemble.moe/ja/characters.json";
  const UNIT_DATA = "https://tl.data.ensemble.moe/en/units.json";

  const enData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);
  const unitData = await getData(UNIT_DATA);

  return {
    props: {
      rawData,
      enData,
      unitData,
      title: "enstars popularity survey results 2023",
      description:
        "over 1000 english speaking fans voted for their favorite characters, as well as who they think the most popular character is. this website documents the result of this survey.",
    },
  };
}
