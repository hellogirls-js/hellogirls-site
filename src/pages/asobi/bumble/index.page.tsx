import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { IconHeart, IconX } from "@tabler/icons-react";

import styles from "../styles/Bumble.module.scss";

import charaDataCG from "./data/charaIdToCard.json";

import { getData } from "utils/data";
import { shuffleArray } from "component/utility/data";

function AsobiLogo() {
  return (
    <div className={styles.asobiLogo}>
      <span className={`${styles.logoLetter} ${styles.logoLetterA}`}>A</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterS}`}>S</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterO}`}>O</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterB}`}>B</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterI}`}>I</span>
      <span className={`${styles.logoLetter} ${styles.logoLetterExclaim}`}>
        !
      </span>
    </div>
  );
}

function DatingCard({
  charaData,
  direction,
}: {
  charaData: JPCharacterData;
  direction: number;
}) {
  const ANIMATION_DURATION = 0.8;
  const ANIMATION_SHIFT = 800;

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? ANIMATION_SHIFT : ANIMATION_SHIFT * -1,
      opacity: 0,
      transition: {
        delay: ANIMATION_DURATION * 2,
      },
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: ANIMATION_SHIFT * direction,
      rotate: 150 * direction,
      opacity: 0,
      transition: {
        duration: ANIMATION_DURATION,
        opacity: {
          duration: ANIMATION_DURATION / 4,
        },
      },
    }),
  };

  const characterAge: number =
    Number(charaData.age) + (Number(charaData.age) < 17 ? 2 : 1);

  return (
    <motion.div
      key={charaData.character_id}
      className={styles.card}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <div className={styles.cardCharaInfo}>
        <div className={styles.charaBasicInfo}>
          <span className={styles.name}>{charaData.first_name}</span>,{" "}
          <span>{characterAge}</span>
        </div>
        <div className={styles.charaTagline}>{charaData.tagline}</div>
      </div>
      <Image
        src={`https://assets.enstars.link/assets/card_rectangle4_${
          charaDataCG[
            String(charaData.character_id) as keyof typeof charaDataCG
          ]
        }_normal.webp`}
        alt={charaData.first_name}
        width={640}
        height={800}
      />
    </motion.div>
  );
}

function CardStack({
  charaList,
  direction,
  index,
}: {
  charaList: JPCharacterData[];
  direction: number;
  index: number;
}) {
  return (
    <div className={styles.cardStackContainer}>
      <div className={styles.cardStack}>
        <AnimatePresence custom={direction}>
          <DatingCard
            key={charaList[index].character_id}
            charaData={charaList[index]}
            {...{ direction }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

export enum CardActionKind {
  SMASH = "smash",
  PASS = "pass",
  RESET = "reset",
}

export interface CardAction {
  type: CardActionKind;
  payload?: number;
}

export interface CardState {
  index: number;
  smashList: number[];
  passList: number[];
  direction: 1 | -1 | 0;
}

function reducer(state: CardState, action: CardAction): CardState {
  const { type, payload } = action;
  switch (type) {
    case CardActionKind.SMASH:
      return {
        ...state,
        smashList: [...state.smashList, Number(payload)],
        direction: 1,
        index: state.index + 1,
      };
    case CardActionKind.PASS:
      return {
        ...state,
        passList: [...state.passList, Number(payload)],
        direction: -1,
        index: state.index + 1,
      };
    case CardActionKind.RESET:
      return {
        ...state,
        passList: [],
        smashList: [],
        direction: 0,
        index: 0,
      };
    default:
      return state;
  }
}

function Buttons({
  dispatch,
  charaList,
  index,
}: {
  dispatch: Dispatch<CardAction>;
  charaList: JPCharacterData[];
  index: number;
}) {
  function LikeButton() {
    return (
      <button
        className={`${styles.dateButton} ${styles.like}`}
        onClick={() => {
          dispatch({
            type: CardActionKind.SMASH,
            payload: charaList[index]?.character_id,
          });
        }}
      >
        <IconHeart size={48} />
        Like
      </button>
    );
  }

  function PassButton() {
    return (
      <button
        className={`${styles.dateButton} ${styles.pass}`}
        onClick={() => {
          dispatch({
            type: CardActionKind.PASS,
            payload: charaList[index]?.character_id,
          });
        }}
      >
        <IconX size={48} />
        Pass
      </button>
    );
  }

  return (
    <div className={styles.buttonsContainer}>
      <PassButton />
      <LikeButton />
    </div>
  );
}

function GameHeader() {
  return (
    <header>
      <div className={styles.logoContainer}>
        <AsobiLogo />
      </div>
    </header>
  );
}

function GameFooter() {
  return (
    <footer>
      <div>
        <Link href="https://dating.hellogirls.info" target="_blank">
          <Image
            src={`https://assets.enstars.link/assets/character_sd_square1_21.png`}
            alt={"link to keito hasumi april fools site"}
            width={75}
            height={75}
          />
        </Link>
      </div>
    </footer>
  );
}

export default function Dating(props: any) {
  const [state, dispatch] = useReducer(reducer, {
    index: 0,
    smashList: [],
    passList: [],
    direction: 0,
  });

  const charaData: JPCharacterData[] = props.charaData;

  const [showChoiceNotif, setShowChoiceNotif] = useState(false);
  const [showMatchNotif, setShowMatchNotif] = useState(false);
  const [showMissedMatchNotif, setShowMissedMatchNotif] = useState(false);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        dispatch({
          type: CardActionKind.SMASH,
          payload: charaData[state.index].character_id,
        });
      }
      if (e.key === "ArrowLeft") {
        dispatch({
          type: CardActionKind.PASS,
          payload: charaData[state.index].character_id,
        });
      }
    },
    [charaData, state.index],
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className={styles.bumbleContainer}>
      <main>
        <div className={styles.gameContainer}>
          <div className={styles.rinne}>
            <Image
              width={580}
              height={690}
              src={`https://assets.hellogirls.info/asobi/bumble/asobi_rinne_1.png`}
              alt="rinne amagi"
            />
          </div>
          <CardStack
            charaList={charaData}
            direction={state.direction}
            index={state.index}
          />
          <Buttons
            charaList={charaData}
            index={state.index}
            {...{ dispatch }}
          />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const JP_DATA_URL = "https://data.ensemble.moe/ja/characters.json";

  const enData = await getData(DATA_URL);
  const jpData = await getData(JP_DATA_URL);

  const dataWithAge = (enData.data as EnCharacterData[])
    .filter((enChara) =>
      Object.keys(charaDataCG).includes(String(enChara.character_id)),
    )
    .map((enChara: EnCharacterData) => {
      const correspondingJpData = (jpData.data as JPCharacterData[]).find(
        (jpChara) => jpChara.character_id === enChara.character_id,
      );
      return {
        ...enChara,
        age: correspondingJpData?.age,
      };
    });

  const shuffledData = shuffleArray(dataWithAge);

  return {
    props: {
      title: "Dating | ASOBI! After Dark",
      charaData: shuffledData as JPCharacterData[],
    },
  };
}
