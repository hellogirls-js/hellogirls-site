import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  IconChevronLeft,
  IconHeart,
  IconRulerMeasure,
  IconSchool,
  IconSend,
  IconX,
  IconZodiacAquarius,
  IconZodiacAries,
  IconZodiacCancer,
  IconZodiacCapricorn,
  IconZodiacGemini,
  IconZodiacLeo,
  IconZodiacLibra,
  IconZodiacPisces,
  IconZodiacSagittarius,
  IconZodiacScorpio,
  IconZodiacTaurus,
  IconZodiacVirgo,
} from "@tabler/icons-react";
import { useClickOutside, useTimeout } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import Div100vh from "react-div-100vh";

import styles from "../styles/Bumble.module.scss";

import charaDataCG from "./data/charaIdToCard.json";
import charaIdToMessage from "./data/charaIdToMessage.json";

import { getData } from "utils/data";
import { cmToFeet, shuffleArray } from "component/utility/data";
import { createClient } from "utils/supabase/client";

const supabase = createClient();

const horoscopeData = [
  {
    name: "Aries",
    icon: <IconZodiacAries size={16} />,
  },
  {
    name: "Taurus",
    icon: <IconZodiacTaurus size={16} />,
  },
  {
    name: "Gemini",
    icon: <IconZodiacGemini size={16} />,
  },
  {
    name: "Cancer",
    icon: <IconZodiacCancer size={16} />,
  },
  {
    name: "Leo",
    icon: <IconZodiacLeo size={16} />,
  },
  {
    name: "Virgo",
    icon: <IconZodiacVirgo size={16} />,
  },
  {
    name: "Libra",
    icon: <IconZodiacLibra size={16} />,
  },
  {
    name: "Scorpio",
    icon: <IconZodiacScorpio size={16} />,
  },
  {
    name: "Sagittarius",
    icon: <IconZodiacSagittarius size={16} />,
  },
  {
    name: "Capricorn",
    icon: <IconZodiacCapricorn size={16} />,
  },
  {
    name: "Aquarius",
    icon: <IconZodiacAquarius size={16} />,
  },
  {
    name: "Pisces",
    icon: <IconZodiacPisces size={16} />,
  },
];

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

  const [isFlipped, setIsFlipped] = useState(false);

  const characterAge: number =
    Number(charaData.age) + (Number(charaData.age) < 17 ? 2 : 1);

  return (
    <motion.div
      key={charaData.character_id}
      className={styles.cardContainer}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <div
        className={`${styles.card}${isFlipped ? ` ${styles.isFlipped}` : ""}`}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div className={`${styles.cardBase} ${styles.cardFront}`}>
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
        </div>
        <div className={`${styles.cardBase} ${styles.cardBack}`}>
          <div className={styles.cardBackContainer}>
            <div className={styles.cardBackTitle}>
              About {charaData.first_name}
            </div>
            <div className={styles.charaBasicInfo}>
              <div className={styles.charaInfoPill}>
                <div className={styles.charaInfoPillIcon}>
                  <IconRulerMeasure size={14} />
                </div>
                <div className={styles.charaInfoPilLText}>
                  {charaData.height}cm / {cmToFeet(charaData.height)}
                </div>
              </div>
              <div className={styles.charaInfoPill}>
                <div className={styles.charaInfoPillIcon}>
                  {horoscopeData[charaData.horoscope].icon}
                </div>
                <div className={styles.charaInfoPilLText}>
                  {horoscopeData[charaData.horoscope].name}
                </div>
              </div>
              <div className={styles.charaInfoPill}>
                <div className={styles.charaInfoPillIcon}>
                  <IconSchool size={14} />
                </div>
                <div className={styles.charaInfoPilLText}>
                  {charaData.school
                    ? "In school"
                    : charaData.character_id === 71 ||
                      charaData.character_id === 74
                    ? "Not in school"
                    : "Graduated"}
                </div>
              </div>
            </div>
            {charaData.like && (
              <>
                <div className={styles.promptContainer}>
                  <div className={styles.charaPrompt}>
                    Their favorite thing in the world is...
                  </div>
                  <div className={styles.charaAnswer}>{charaData.like}</div>
                </div>
              </>
            )}
            <div className={styles.promptContainer}>
              <div className={styles.charaPrompt}>
                Their favorite hobby is...
              </div>
              <div className={styles.charaAnswer}>{charaData.hobby}</div>
            </div>
            <div className={styles.charaPromptImage}>
              <Image
                src={`https://assets.enstars.link/assets/card_still_full1_${charaData
                  .cards?.[charaData.character_id === 74 ? 1 : 0]}_normal.png`}
                alt={charaData.first_name}
                width={1560}
                height={720}
              />
            </div>
            <div className={styles.promptContainer}>
              <div className={styles.charaPrompt}>They love to eat...</div>
              <div className={styles.charaAnswer}>
                {charaData.favorite_food}
              </div>
            </div>
            <div className={styles.charaPromptImage}>
              <Image
                src={`https://assets.enstars.link/assets/card_still_full1_${charaData
                  .cards?.[
                  charaData.character_id === 51 ||
                  charaData.character_id === 72 ||
                  charaData.character_id === 15
                    ? 1
                    : 2
                ]}_normal.png`}
                alt={charaData.first_name}
                width={1560}
                height={720}
              />
            </div>
            <div className={styles.promptContainer}>
              <div className={styles.charaPrompt}>They are an expert at...</div>
              <div className={styles.charaAnswer}>{charaData.specialty}</div>
            </div>
            {charaData.dislike && (
              <div className={styles.promptContainer}>
                <div className={styles.charaPrompt}>
                  They absolutely hate...
                </div>
                <div className={styles.charaAnswer}>{charaData.dislike}</div>
              </div>
            )}
            <div className={styles.charaPromptImage}>
              <Image
                src={`https://assets.enstars.link/assets/card_still_full1_${charaData
                  .cards?.[charaData.character_id === 8 ? 3 : 4]}_normal.png`}
                alt={charaData.first_name}
                width={1560}
                height={720}
              />
            </div>
            <div className={styles.promptContainer}>
              <div className={styles.charaPrompt}>
                Some words they want to get in
              </div>
              <div className={styles.charaAnswer}>
                &quot;{charaData.quote}&quot;
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CardStack({
  charaList,
  direction,
  index,
  showChoiceNotif,
  showMissedMatchNotif,
  setShowMissedMatchNotif,
  setShowChoiceNotif,
}: {
  charaList: JPCharacterData[];
  direction: number;
  index: number;
  showChoiceNotif: { charaId: number; choice: boolean } | undefined;
  showMissedMatchNotif: boolean;
  setShowMissedMatchNotif: Dispatch<SetStateAction<boolean>>;
  setShowChoiceNotif: Dispatch<
    SetStateAction<{ charaId: number; choice: boolean } | undefined>
  >;
}) {
  return (
    <div className={styles.cardStackContainer}>
      <div className={styles.cardStack}>
        <AnimatePresence>
          {showChoiceNotif && index > 0 && (
            <ChoicePoll
              key={`${showChoiceNotif.charaId}_poll`}
              chara={
                charaList[
                  charaList.findIndex(
                    (chara) => chara.character_id === showChoiceNotif.charaId,
                  )
                ]
              }
              {...{ setShowChoiceNotif }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showMissedMatchNotif && index > 0 && (
            <MissedMatchNotif
              key={`${charaList[index - 1].character_id}_missed`}
              chara={charaList[index - 1]}
              {...{ setShowMissedMatchNotif }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence custom={direction}>
          {index < charaList.length && (
            <DatingCard
              key={charaList[index].character_id}
              charaData={charaList[index]}
              {...{ direction }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export enum CardActionKind {
  SMASH = "smash",
  PASS = "pass",
  RESET = "reset",
  PROCEED = "proceed",
}

export interface CardAction {
  type: CardActionKind;
  payload?: number;
}

export interface CardState {
  index: number;
  smashList: number[];
  passList: number[];
  matchList: number[];
  direction: 1 | -1 | 0;
  choice: number;
}

function reducer(state: CardState, action: CardAction): CardState {
  const { type, payload } = action;
  switch (type) {
    case CardActionKind.SMASH:
      const shouldMatch = Math.ceil(Math.random() * 3) % 2 === 1;

      return {
        ...state,
        index: !shouldMatch ? state.index + 1 : state.index,
        smashList: [...state.smashList, Number(payload)],
        matchList: shouldMatch
          ? [...state.matchList, Number(payload)]
          : state.matchList,
        direction: 1,
        choice: !shouldMatch ? Number(payload) : 0,
      };
    case CardActionKind.PASS:
      return {
        ...state,
        passList: [...state.passList, Number(payload)],
        direction: -1,
      };
    case CardActionKind.RESET:
      return {
        ...state,
        passList: [],
        smashList: [],
        direction: 0,
        index: 0,
      };
    case CardActionKind.PROCEED:
      return {
        ...state,
        index: state.index + 1,
        choice: Number(payload),
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
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useClickOutside(() => setOpenModal(false));

  return (
    <footer>
      <AnimatePresence>
        {openModal && (
          <motion.div
            className={styles.keitoModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.25 } }}
          >
            <div className={styles.keitoModalBg}>
              <motion.div
                className={styles.keitoModalContainer}
                ref={modalRef}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { duration: 0.3, delay: 0.25 },
                }}
                exit={{
                  scale: 0,
                }}
              >
                <p>
                  Does this website look familiar? This was originally an April
                  Fool&apos;s project! Keito fans loved it, so I preserved it
                  for them.{" "}
                  <Link href="https://dating.hellogirls.info" target="_blank">
                    You can check it out here!
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className={styles.gameFooterButton}
        onClick={() => setOpenModal(true)}
      >
        <Image
          src={`https://assets.enstars.link/assets/character_sd_square1_21.png`}
          alt={"link to keito hasumi april fools site"}
          width={75}
          height={75}
        />
      </button>
    </footer>
  );
}

function Rinne({ sprite, dialogue }: { sprite: number; dialogue: string }) {
  return (
    <div className={styles.rinneContainer}>
      <div className={styles.rinneSpriteContainer}>
        <div className={styles.rinne}>
          <Image
            width={580}
            height={690}
            src={`https://assets.hellogirls.info/asobi/bumble/asobi_rinne_${sprite}.png`}
            alt="rinne amagi"
          />
        </div>
      </div>
      <div className={styles.rinneDialogueContainer}>
        <div className={styles.rinneDialogue}>{dialogue}</div>
      </div>
    </div>
  );
}

function MatchScreen({
  chara,
  dispatch,
}: {
  chara: JPCharacterData;
  dispatch: Dispatch<CardAction>;
}) {
  return (
    <motion.div
      className={styles.matchScreenContainer}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
      exit={{ scale: 0, opacity: 0, y: 400 }}
    >
      <motion.div className={styles.matchHeader}>
        <div className={styles.matchTitle}>You matched!</div>
      </motion.div>
      <motion.div className={styles.matchBody}>
        <motion.div className={styles.graphicsContainer}>
          <motion.div
            className={styles.matchHeartContainer}
            initial={{ rotate: 0, opacity: 0, x: -100, y: -100, scale: 1.5 }}
            animate={{
              rotate: "10deg",
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              transition: { delay: 1.75, duration: 0.2 },
            }}
          >
            <IconHeart size={128} />
          </motion.div>
          <motion.div
            className={styles.matchCharaContainer}
            initial={{ rotate: 0, opacity: 0, x: 200 }}
            animate={{
              rotate: "-10deg",
              opacity: 1,
              x: 0,
              transition: { delay: 1, duration: 0.5 },
            }}
          >
            {chara && (
              <div className={styles.matchChara}>
                <Image
                  alt={chara?.first_name ?? "match"}
                  src={`https://assets.enstars.link/assets/card_rectangle4_${
                    charaDataCG[
                      String(chara.character_id) as keyof typeof charaDataCG
                    ]
                  }_normal.webp`}
                  width={640}
                  height={800}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.matchSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 2.5, duration: 0.5 } }}
        >
          {chara?.first_name} likes you, too! You may receive a message from
          them later.
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.matchFooter}
        initial={{ opacity: 0, y: 300 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 3.5, duration: 0.5 },
        }}
      >
        <button
          className={styles.matchButton}
          onClick={() => {
            dispatch({
              type: CardActionKind.PROCEED,
              payload: chara.character_id,
            });
          }}
        >
          Awesome!
        </button>
      </motion.div>
    </motion.div>
  );
}

function MissedMatchNotif({
  chara,
  setShowMissedMatchNotif,
}: {
  chara: JPCharacterData;
  setShowMissedMatchNotif: Dispatch<SetStateAction<boolean>>;
}) {
  const {} = useTimeout(
    () => {
      setShowMissedMatchNotif(false);
    },
    3000,
    { autoInvoke: true },
  );

  return (
    <motion.div
      className={styles.missedMatchContainer}
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div className={styles.missedMatchIcon}>
        <Image
          alt={chara.first_name}
          src={`https://assets.enstars.link/assets/card_rectangle4_${
            charaDataCG[String(chara.character_id) as keyof typeof charaDataCG]
          }_normal.webp`}
          width={640}
          height={800}
        />
      </div>
      <div className={styles.missedMatchText}>
        You missed a potential match!
      </div>
    </motion.div>
  );
}

function MatchedMessages({
  matches,
  charaData,
  setShowRinne,
}: {
  matches: number[];
  charaData: JPCharacterData[];
  setShowRinne: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedChara, setSelectedChara] = useState<number>();

  useEffect(() => {
    if (selectedChara) setShowRinne(false);
    else setShowRinne(true);
  }, [selectedChara]);

  const selectedCharaData =
    charaData.find((chara) => chara.character_id === selectedChara) ??
    undefined;

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.messageContainerHeader}>
        <AnimatePresence>
          {selectedCharaData && (
            <motion.button
              className={styles.messageContainerHeaderBack}
              onClick={() => setSelectedChara(undefined)}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
            >
              <IconChevronLeft size={32} />
            </motion.button>
          )}
        </AnimatePresence>
        <div className={styles.messageContainerHeaderTitle}>
          {selectedCharaData ? selectedCharaData.first_name : "Matches"}
        </div>
      </div>
      <div className={styles.messageContainerBody}>
        <AnimatePresence>
          {selectedChara ? (
            <motion.div
              key="DM"
              className={styles.matchDmContainer}
              initial={{ x: 700 }}
              animate={{ x: 0 }}
              exit={{ x: 700 }}
            >
              <div className={styles.matchDmMessageContainer}>
                <div className={styles.matchDmMessage}>
                  <div className={styles.matchDmIcon}>
                    <Image
                      alt={selectedCharaData?.first_name ?? "match"}
                      src={`https://assets.enstars.link/assets/card_rectangle4_${
                        charaDataCG[
                          String(selectedChara) as keyof typeof charaDataCG
                        ]
                      }_normal.webp`}
                      width={640}
                      height={800}
                    />
                  </div>
                  <div className={styles.matchDmContent}>
                    {
                      charaIdToMessage[
                        String(selectedChara) as keyof typeof charaIdToMessage
                      ]
                    }
                    {selectedChara === 16 && (
                      <Image
                        alt="koga and leon :)"
                        src="https://static.wikia.nocookie.net/ensemble-stars/images/c/ca/%28Wolf_Corgi%29_Koga_Oogami_CG.png/revision/latest/scale-to-width-down/1000?cb=20190509032324"
                        width={1000}
                        height={563}
                      />
                    )}
                    {selectedChara === 41 && (
                      <Image
                        alt="bloody mary"
                        src="https://i.ibb.co/ZKXj1wR/bloody-mary.png"
                        width={261}
                        height={165}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.matchDmControlsContainer}>
                <textarea className={styles.matchDmTextarea} rows={1} />
                <button className={styles.matchDmSendButton}>
                  <IconSend />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className={styles.matchesListContainer}
              initial={{ x: -700 }}
              animate={{ x: 0 }}
              exit={{ x: -700 }}
            >
              {matches.map((match) => {
                const matchingCharaData = charaData.find(
                  (chara) => chara.character_id === match,
                );
                return (
                  <div
                    key={match}
                    className={styles.matchItemContainer}
                    onClick={() => setSelectedChara(match)}
                  >
                    <div className={styles.matchItemIcon}>
                      <Image
                        alt={matchingCharaData?.first_name ?? "match"}
                        src={`https://assets.enstars.link/assets/card_rectangle4_${
                          charaDataCG[String(match) as keyof typeof charaDataCG]
                        }_normal.webp`}
                        width={640}
                        height={800}
                      />
                    </div>
                    <div className={styles.matchItemText}>
                      <div className={styles.matchItemName}>
                        {matchingCharaData?.first_name}
                      </div>
                      <div className={styles.matchItemPreview}>
                        {
                          charaIdToMessage[
                            String(match) as keyof typeof charaIdToMessage
                          ]
                        }
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ChoicePoll({
  chara,
  setShowChoiceNotif,
}: {
  chara: JPCharacterData;
  setShowChoiceNotif: Dispatch<
    SetStateAction<{ charaId: number; choice: boolean } | undefined>
  >;
}) {
  const {} = useTimeout(() => setShowChoiceNotif(undefined), 3000, {
    autoInvoke: true,
  });

  const { data: charaResults } = useQuery({
    queryKey: ["getCharaResults", chara.character_id],
    queryFn: async () => {
      const likes = await supabase
        .from("lipbite")
        .select()
        .eq("character_id", chara.character_id)
        .eq("choice", true);
      const passes = await supabase
        .from("lipbite")
        .select()
        .eq("character_id", chara.character_id)
        .eq("choice", false);

      return {
        likes: likes.data?.length ?? 0,
        passes: passes.data?.length ?? 0,
        total: (likes.data?.length ?? 0) + (passes.data?.length ?? 0),
      };
    },
  });

  return (
    <motion.div
      className={styles.choicePollContainer}
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.choicePollTitle}>
        <h3>{chara.first_name}</h3>
        <Image
          src={`https://assets.enstars.link/assets/character_sd_square1_${chara.character_id}.png`}
          alt={"character chibi head"}
          width={50}
          height={50}
        />
      </div>
      <div className={styles.choicePollResults}>
        <div
          className={`${styles.choicePollResultContainer} ${styles.choicePollLikeContainer}`}
        >
          <motion.div
            className={`${styles.choicePollBar} ${styles.choicePollLikeBar}`}
            initial={{ width: 0 }}
            animate={{
              width: charaResults
                ? `${(charaResults.likes / charaResults.total) * 100}%`
                : "0%",
              transition: {
                duration: 0.5,
              },
            }}
          >
            {charaResults
              ? ((charaResults.likes / charaResults.total) * 100).toFixed(1)
              : 0}
            %
          </motion.div>
          <div className={styles.choicePollLabel}>
            Like
            <div className={styles.choicePollData}>
              {charaResults?.likes} votes
            </div>
          </div>
        </div>
        <div
          className={`${styles.choicePollResultContainer} ${styles.choicePollPassContainer}`}
        >
          <motion.div
            className={`${styles.choicePollBar} ${styles.choicePollPassBar}`}
            initial={{ width: 0 }}
            animate={{
              width: charaResults
                ? `${(charaResults.passes / charaResults.total) * 100}%`
                : "0%",
              transition: {
                duration: 0.5,
              },
            }}
          >
            {charaResults
              ? ((charaResults.passes / charaResults.total) * 100).toFixed(1)
              : 0}
            %
          </motion.div>
          <div className={styles.choicePollLabel}>
            Pass
            <div className={styles.choicePollData}>
              {charaResults?.passes} votes
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Dating(props: any) {
  const [state, dispatch] = useReducer(reducer, {
    index: 0,
    smashList: [],
    passList: [],
    matchList: [],
    direction: 0,
    choice: 0,
  });

  enum RinneDialogue {
    START_DIALOGUE = "Tap the card to flip it over. C'mon~",
    PASS_DIALOGUE_1 = "Picky, huh?",
    PASS_DIALOGUE_2 = "Did they ick ya out?",
    LIKE_DIALOGUE_1 = "Kyahaha, nice pick!",
    LIKE_DIALOGUE_2 = "They're kinda cute, huh~? Just kidding, kyahaha!",
    NIKI_DIALOGUE = "Oi.",
    NIKI_DIALOGUE_LIKE = "Careful, Niki's mine.",
    NIKI_DIALOGUE_PASS = "What did you just say about Niki?",
    RINNE_DIALOGUE = "H-how did that...?!",
    RINNE_DIALOGUE_LIKE = "...",
    RINNE_DIALOGUE_PASS = "...",
    FINISHED_GOOD = "Well, well~ Look at all the lucky bachelors you racked up!",
    FINISHED_BAD = "No one? Poor thing, maybe li'l ol Rinne can cheer you up~",
  }

  const charaData: JPCharacterData[] = props.charaData;

  const [showChoiceNotif, setShowChoiceNotif] = useState<{
    charaId: number;
    choice: boolean;
  }>();
  const [showMatchNotif, setShowMatchNotif] = useState(false);
  const [showMissedMatchNotif, setShowMissedMatchNotif] = useState(false);
  const [rinneSprite, setRinneSprite] = useState(1);
  const [rinneDialogue, setRinneDialogue] = useState(
    RinneDialogue.START_DIALOGUE,
  );
  const [showRinne, setShowRinne] = useState(true);

  const { mutate: addVoteForChara } = useMutation({
    mutationFn: async (values: { charaId: number; choice: boolean }) => {
      const { error } = await supabase.from("lipbite").insert({
        character_id: values.charaId,
        choice: values.choice,
      });

      if (error) throw new Error(error.message);
    },
    onSuccess: (data, values) => {
      setShowChoiceNotif(values);
    },
    onError: (error) => {
      console.error("could not add data to DB", error.message, error.cause);
    },
  });

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

  useEffect(() => {
    if (state.smashList.length) {
      const mostRecentIndex = state.smashList.length - 1;
      if (state.smashList[mostRecentIndex] === 74) {
        setRinneDialogue(RinneDialogue.NIKI_DIALOGUE_LIKE);
      } else if (state.smashList[mostRecentIndex] === 71) {
        setRinneDialogue(RinneDialogue.RINNE_DIALOGUE_LIKE);
      } else {
        if (
          charaData[state.index]?.character_id !== 71 &&
          charaData[state.index]?.character_id !== 74
        ) {
          const randomChoice = Math.round(Math.random() * 10);
          if (randomChoice % 2 === 0) {
            setRinneDialogue(RinneDialogue.LIKE_DIALOGUE_1);
          } else {
            setRinneDialogue(RinneDialogue.LIKE_DIALOGUE_2);
          }
        }
      }
    }
  }, [state.smashList]);

  useEffect(() => {
    if (state.passList.length) {
      const mostRecentIndex = state.passList.length - 1;
      if (state.passList[mostRecentIndex] === 74) {
        setRinneDialogue(RinneDialogue.NIKI_DIALOGUE_PASS);
      } else if (state.passList[mostRecentIndex] === 71) {
        setRinneDialogue(RinneDialogue.RINNE_DIALOGUE_PASS);
      } else {
        if (
          charaData[state.index].character_id !== 71 &&
          charaData[state.index].character_id !== 74
        ) {
          const randomChoice = Math.round(Math.random() * 10);
          if (randomChoice % 2 === 0) {
            setRinneDialogue(RinneDialogue.PASS_DIALOGUE_1);
          } else {
            setRinneDialogue(RinneDialogue.PASS_DIALOGUE_2);
          }
        }
      }
      dispatch({
        type: CardActionKind.PROCEED,
        payload: state.passList[mostRecentIndex] * -1,
      });
    }
  }, [state.passList]);

  useEffect(() => {
    setShowMatchNotif(true);
  }, [state.matchList]);

  useEffect(() => {
    setShowMatchNotif(false);
    setShowMissedMatchNotif(false);
    if (state.index < charaData.length) {
      if (
        state.passList.length &&
        charaData[state.index - 1]?.character_id ===
          state.passList[state.passList.length - 1]
      ) {
        const random = Math.ceil(Math.random() * 4);
        if (random === 2) setShowMissedMatchNotif(true);
      }
      if (
        charaData[state.index].character_id === 71 ||
        (state.index > 0 && charaData[state.index - 1].character_id === 71)
      ) {
        // if you're on rinne
        if (charaData[state.index].character_id === 71) {
          setRinneSprite(2);
          setRinneDialogue(RinneDialogue.RINNE_DIALOGUE);
        } else {
          if (state.passList[state.passList.length - 1] === 71) {
            setRinneSprite(3);
          }
        }
      } else if (
        (state.index > 0 && charaData[state.index - 1].character_id === 74) ||
        charaData[state.index].character_id === 74
      ) {
        // if you make any choice regarding niki
        setRinneSprite(3);
        if (charaData[state.index].character_id === 74) {
          setRinneDialogue(RinneDialogue.NIKI_DIALOGUE);
        }
      } else {
        if (rinneSprite !== 1) setRinneSprite(1);
      }
    } else {
      setRinneSprite(1);
      if (state.matchList.length) {
        setRinneDialogue(RinneDialogue.FINISHED_GOOD);
      } else {
        setRinneDialogue(RinneDialogue.FINISHED_BAD);
      }
    }
  }, [state.index]);

  useEffect(() => {
    if (state.index > 0 && state.choice !== 0) {
      addVoteForChara({
        charaId: charaData[state.index - 1].character_id,
        choice: state.choice > 0,
      });
    }
  }, [state.choice]);

  return (
    <Div100vh>
      <div className={styles.bumbleContainer}>
        <GameHeader />
        <GameFooter />
        <AnimatePresence>
          {showMatchNotif && (
            <MatchScreen chara={charaData[state.index]} {...{ dispatch }} />
          )}
        </AnimatePresence>
        <main>
          <div className={styles.gameContainer}>
            {showRinne && (
              <Rinne sprite={rinneSprite} dialogue={rinneDialogue} />
            )}
            {state.index < charaData.length && (
              <>
                <CardStack
                  charaList={charaData}
                  direction={state.direction}
                  index={state.index}
                  {...{
                    showMissedMatchNotif,
                    setShowMissedMatchNotif,
                    setShowChoiceNotif,
                    showChoiceNotif,
                  }}
                />
                <Buttons
                  charaList={charaData}
                  index={state.index}
                  {...{ dispatch, addVoteForChara }}
                />
              </>
            )}
            {state.index >= charaData.length && (
              <div className={styles.messages}>
                <MatchedMessages
                  {...{ charaData, setShowRinne }}
                  matches={state.matchList}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </Div100vh>
  );
}

export async function getServerSideProps() {
  const DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const JP_DATA_URL = "https://data.ensemble.moe/ja/characters.json";
  const CARD_DATA_URL = "https://data.ensemble.moe/ja/cards.json";

  const enData = await getData(DATA_URL);
  const jpData = await getData(JP_DATA_URL);
  const cardDataRaw = await getData(CARD_DATA_URL);
  const cardData = cardDataRaw.data;

  const dataWithAge = (enData.data as EnCharacterData[])
    .filter((enChara) =>
      Object.keys(charaDataCG).includes(String(enChara.character_id)),
    )
    .map((enChara: EnCharacterData) => {
      const correspondingJpData = (jpData.data as JPCharacterData[]).find(
        (jpChara) => jpChara.character_id === enChara.character_id,
      );
      const fiveStarCards = cardData
        .filter(
          (card: any) =>
            card.rarity === 5 &&
            card.character_id === enChara.character_id &&
            card.id !==
              Number(
                charaDataCG[
                  String(enChara.character_id) as keyof typeof charaDataCG
                ],
              ),
        )
        .map((card: any) => card.id);
      return {
        ...enChara,
        height: correspondingJpData?.height,
        horoscope: correspondingJpData?.horoscope,
        age: correspondingJpData?.age,
        cards: fiveStarCards,
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
