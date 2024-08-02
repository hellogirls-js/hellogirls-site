import React from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { AnimatePresence, motion, useAnimate, Variants } from "framer-motion";
import { useInterval, useViewportSize } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { StaticImageData } from "next/image";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import styles from "../styles/FanQuiz.module.scss";

import {
  QuizDBItem,
  QuizQuestion,
  quizQuestions,
  QuizResult,
  quizResults as quizResultNames,
} from "./data";
import OverallResults from "./OverallResults";

import NatsumeSprite from "assets/natsume_regular.png";
import NatsumeSpriteFocused from "assets/natsume_focused.png";
import { shuffleArray } from "component/utility/data";
import { createClient } from "utils/supabase/client";

const pages = ["intro", "quiz", "results"];
type QuizPage = (typeof pages)[number];

const supabase = createClient();

export function QuizHeader({
  title,
  natsumeSprite = NatsumeSprite,
}: {
  title: string;
  natsumeSprite?: StaticImageData;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.nachumeContainer}>
        <img
          src={natsumeSprite.src}
          alt="dr. natsume"
          className={styles.nachumeImage}
        />
      </div>
      <div className={styles.speechBubbleContainer}>
        <p>{title}</p>
      </div>
    </div>
  );
}

function IntroSection({
  setCurrentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<QuizPage>>;
}) {
  return (
    <>
      <div className={`${styles.container} ${styles.introContainer}`}>
        <QuizHeader
          title="
          Are you a fan of Ensemble StarS? Have you ever wondered exactly kind
          kind of fan you arE? Perhaps I could help with thaT."
        />
        <div className={styles.disclaimer}>
          This is a <strong>long</strong> personality quiz that consists of 56
          questions to determine what kind of fan you are. You will select how
          much you agree with each statement on a scale from 1-5.
        </div>
        <button
          className={styles.introButton}
          onClick={() => {
            setCurrentPage("quiz");
          }}
        >
          Get started!
        </button>
        <a href="/projects/enstars-fan-quiz/overall" style={{display: "block", textAlign: "center", fontSize: "1.5em", marginTop: "2em"}}>Want to see the community&apos;s resultS?</a>
      </div>
      <img
        className={styles.nachumeChibi}
        src="https://static.wikia.nocookie.net/ensemble-stars/images/c/c7/Natsume_Sakasaki_Work_Casual_%28Spring-Summer%29_Outfit_Chibi.png"
        alt="natsume chibi"
      />
    </>
  );
}

function QuizSection({
  setCurrentPage,
  quizResults,
  setQuizResults,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<QuizPage>>;
  quizResults: QuizQuestion[];
  setQuizResults: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}) {
  const shuffledQuizQuestions: QuizQuestion[] = React.useMemo<QuizQuestion[]>(
    () => shuffleArray(quizQuestions),
    [],
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentQuestion = shuffledQuizQuestions[currentIndex];

  const [selectedOption, setSelectedOption] = React.useState<
    number | undefined
  >();
  const [prevNatsumeDirection, setPrevNatsumeDirection] =
    React.useState<number>(-1);
  const [natsumeDirection, setNatsumeDirection] = React.useState<number>(0);
  const [natsumeScope, animateNatsume] = useAnimate<HTMLImageElement>();
  const { width: viewportWidth } = useViewportSize();

  const [natsumeSprite, setNatsumeSprite] =
    React.useState<StaticImageData>(NatsumeSprite);

  React.useEffect(() => {
    setNatsumeDirection(() => {
      const parenthesesRegex = /\(([^)]+)\)/;
      const shouldBeNegative = Math.random() >= 0.5;
      const natsumeTransformValue =
        parseInt(
          parenthesesRegex
            .exec(
              natsumeScope.current?.style.transform
                .split(" ")
                .filter((prop) => prop.includes("translateX"))[0],
            )?.[0]
            .slice(1, -3) ?? "0",
        ) ?? 0;

      let newValue = prevNatsumeDirection;

      if (
        (!shouldBeNegative && prevNatsumeDirection < 0) ||
        (!shouldBeNegative && natsumeTransformValue > -viewportWidth / 12) ||
        (shouldBeNegative &&
          natsumeTransformValue <= -(viewportWidth + viewportWidth / 12))
      ) {
        newValue--;
      } else {
        newValue++;
      }

      return newValue;
    });
  }, [prevNatsumeDirection]);

  const natsumeInterval = useInterval(() => {
    setPrevNatsumeDirection(natsumeDirection);
  }, 5000);

  React.useEffect(() => {
    natsumeInterval.start();

    return natsumeInterval.stop();
  }, [natsumeDirection]);

  React.useEffect(() => {
    animateNatsume(
      natsumeScope.current,
      {
        x: (viewportWidth / 12) * natsumeDirection,
        y: [0, -10, -20, -10, 0, -10, -20, -10, 0],
        rotateY:
          prevNatsumeDirection && prevNatsumeDirection < natsumeDirection
            ? 180
            : 0,
      },
      { duration: 0.6, rotateY: { duration: 0 } },
    );
  }, [natsumeDirection]);

  React.useEffect(() => {
    setSelectedOption(undefined);

    const useFocused = Math.random() > 0.5;
    setNatsumeSprite(useFocused ? NatsumeSpriteFocused : NatsumeSprite);
  }, [currentIndex]);

  React.useEffect(() => {
    if (quizResults.length) {
      if (currentIndex < shuffledQuizQuestions.length - 1) {
        setCurrentIndex((prev) => {
          return prev + 1;
        });
      } else {
        setCurrentPage("results");
      }
    }
  }, [quizResults]);

  const options = [
    "Disagree",
    "Somewhat disagree",
    "No opinion",
    "Somewhat agree",
    "Agree",
  ];

  return (
    <>
      <div className={`${styles.container} ${styles.quizContainer}`}>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.currentProgress}
              style={{
                width: `${Math.round(
                  (currentIndex * 100) / quizQuestions.length,
                )}%`,
              }}
            />
          </div>
          <div className={styles.progressNumber}>
            {currentIndex + 1} / {quizQuestions.length}
          </div>
        </div>
        <QuizHeader
          title={quizQuestions[currentIndex].question}
          {...{ natsumeSprite }}
        />
        <AnimatePresence>
          <motion.div
            key={currentQuestion.question}
            className={styles.quizOptions}
            initial={{ opacity: 0, x: 500, y: 0, position: "absolute" }}
            animate={{
              position: "relative",
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }}
            exit={{
              position: "absolute",
              opacity: 0,
              x: -500,
              y: 0,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }}
          >
            {options.map((option, index) => {
              const labelId = `${option
                .toLowerCase()
                .replaceAll(" ", "-")}-${index}`;
              return (
                <div
                  key={`${currentQuestion}-${option}`}
                  className={styles.quizOptionContainer}
                >
                  <button
                    className={`${styles.quizOptionButton}${
                      selectedOption === index ? ` ${styles.selected}` : ""
                    }`}
                    onClick={() => {
                      setSelectedOption(index);
                    }}
                    aria-labelledby={labelId}
                  />
                  {(option === "Disagree" || option === "Agree") && (
                    <div id={labelId} className={styles.quizOptionLabel}>
                      {option}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        <div className={styles.quizNavButtons}>
          <AnimatePresence>
            {currentIndex > 0 && (
              <motion.button
                key="prev"
                className={`${styles.navButton} ${styles.prevButton}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                exit={{ opacity: 0, y: 100, transition: { duration: 0.25 } }}
                aria-label="Previous question"
                onClick={() => {
                  setCurrentIndex((prev) => {
                    return prev - 1;
                  });
                }}
              >
                <IconArrowLeft size={32} />
              </motion.button>
            )}
            {selectedOption !== undefined && (
              <motion.button
                key="next"
                disabled={selectedOption === undefined}
                className={`${styles.navButton} ${styles.nextButton}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                exit={{ opacity: 0, y: 100, transition: { duration: 0.25 } }}
                aria-label="Next question"
                onClick={() => {
                  if (selectedOption !== undefined) {
                    setQuizResults((prev) => {
                      const filteredArray = prev.filter(
                        (result) =>
                          result.question !== currentQuestion.question,
                      );
                      return [
                        ...filteredArray,
                        { ...currentQuestion, selectedOption },
                      ];
                    });
                  }
                }}
              >
                <IconArrowRight size={32} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      <img
        ref={natsumeScope}
        className={styles.nachumeChibi}
        src="https://static.wikia.nocookie.net/ensemble-stars/images/c/c7/Natsume_Sakasaki_Work_Casual_%28Spring-Summer%29_Outfit_Chibi.png"
        alt="natsume chibi"
      />
    </>
  );
}

function ResultsPage({
  setCurrentPage,
  quizResults,
  supabase,
  overallResultsResponse,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<QuizPage>>;
  quizResults: QuizQuestion[];
  supabase: SupabaseClient<any, "public", any>;
  overallResultsResponse: UseQueryResult<QuizDBItem[] | null, Error>;
}) {
  const qc = useQueryClient();

  const {
    data: overallResults,
    isPending: areOverallResultsPending,
    error: overallResultsError,
  } = overallResultsResponse;

  const calculatedResults: Array<{
    result: QuizResult;
    value: number;
    fullMark: 28;
  }> = React.useMemo(() => {
    const initial: Array<{ result: QuizResult; value: number; fullMark: 28 }> =
      [];
    const reducedValue = quizResults.reduce((accumulated, current) => {
      const index = accumulated.findIndex(
        (result) => result.result === current.associatedResult,
      );
      const casualFanIndex = accumulated.findIndex(
        (result) => result.result === "Casual Fan",
      );
      if (index < 0) {
        accumulated.push({
          result: current.associatedResult,
          value: current.selectedOption ?? 0,
          fullMark: 28,
        });
      } else {
        accumulated[index].value += current.selectedOption ?? 0;
      }

      const casualFanAmount =
        Math.round(((4 - (current.selectedOption ?? 0)) / 8) * 100) / 100;

      if (casualFanIndex < 0) {
        accumulated.push({
          result: "Casual Fan",
          value: casualFanAmount,
          fullMark: 28,
        });
      } else {
        accumulated[casualFanIndex].value += casualFanAmount;
      }
      return accumulated;
    }, initial);

    const casualFanIndex = reducedValue.findIndex(
      (result) => result.result === "Casual Fan",
    );

    if (casualFanIndex >= 0) {
      const unroundedValue = reducedValue[casualFanIndex].value;
      reducedValue[casualFanIndex].value = Math.round(unroundedValue * 10) / 10;
    }

    return reducedValue;
  }, [quizResults]);

  const calculatedResultObject = React.useMemo(() => {
    const initial: Record<string, number> = {};
    quizResultNames.forEach((name) => {
      const keyName = name.toLowerCase().replace(" ", "_");
      initial[keyName] =
        calculatedResults.find((result) => result.result === name)?.value ?? 0;
    });
    return initial;
  }, [calculatedResults]);

  const result: { result: QuizResult; value: number } = React.useMemo(() => {
    const sortedResults = calculatedResults.sort((a, b) => b.value - a.value);
    return sortedResults[0];
  }, [calculatedResults]);

  const {
    mutate: addResultToDb,
    isSuccess: isMutationSuccessful,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("purrsonality_results").insert({
        result_name: result.result,
        result_id: quizResultNames.indexOf(result.result),
        result_values: calculatedResultObject,
      });

      if (error) throw new Error(error.message);
    },
    scope: {
      id: "addToDb",
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["getOverallResults"],
      });
    },
    onError: () => {
      console.error("could not update database");
    },
    retry: false,
  });

  const updateDb = React.useCallback(() => {
    if (!isMutationSuccessful) addResultToDb();
  }, [isMutationSuccessful]);

  React.useEffect(() => {
    console.log(
      "result",
      result,
      "is mutation successful",
      isMutationSuccessful,
    );
    if (result) {
      console.log("adding to db");
      updateDb();
    }

    return () => {
      resetMutation();
    };
  }, []);

  const quizResultsWithDescription: Array<{
    title: QuizResult;
    description: JSX.Element;
  }> = [
    {
      title: "Scholar",
      description: (
        <p>
          You really appreciate the stories Enstars has to offer. Your mind is
          like a library filled with stories. You&apos;re familiar with each
          writer and can point out what you like and dislike about their
          writing. With this much knowledge in the game&apos;s writing, you also
          enjoy analyzing the stories and the character dynamics present in
          them. Sometimes, you share these thoughts with others, and they
          appreciate your insight. While it can be frustrating to see people
          share misinformation on stories you&apos;ve read, you&apos;re willing
          to provide people with the correct information.
        </p>
      ),
    },
    {
      title: "Shipper",
      description: (
        <p>
          You experience the most joy from pairing up characters. Whether
          you&apos;re strictly dedicated to one ship, or ship one character with
          the entire cast, indulging in these pairings keep you going. You might
          read stories just to analyze the interactions between two characters
          in a ship, or have headcanons about how you think this pairing goes
          through their day to day life. Shipping is an important part of fandom
          culture, and I salute you, sailor, for treading those waters.
        </p>
      ),
    },
    {
      title: "Whale",
      description: (
        <p>
          You&apos;re most likely to be seen on the leaderboard of any given
          event. You have money to spend, and baby,{" "}
          <strong>you&apos;re gonna spend it on Enstars!</strong> You indulge in
          a lot of gameplay that requires you to spend money, such as tiering
          events and maxing out gacha gards. VIP 1 and 2 are probably your best
          friends if you play on the global servers. It&apos;s thanks to you
          that we can all keep playing Enstars, since you keep the servers
          alive. Thank you, whale. Your service is appreciated.
        </p>
      ),
    },
    {
      title: "Merch Collector",
      description: (
        <p>
          One of your favorite hobbies includes collecting merch of Enstars
          characters! You often frequent sites such as Mercari to purchase merch
          for your collection. You&apos;re very familiar with the process of
          ordering merch overseas, and might even host some group merch splits
          of your own. You might showcase this merch by creating ita bags or
          putting up merch displays on a character&apos;s birthday. These
          collections are so cute! I always enjoy seeing them.
        </p>
      ),
    },
    {
      title: "Hypeman",
      description: (
        <p>
          There is one character that you <strong>really</strong> like and you
          are dedicated to them. Everyone can easily associate you with this
          character since you talk about them often, have them as your profile
          picture, and collect all their cards. The thought of seeing them at a
          Dream Live makes your heart skip a beat from excitement. This
          character might be the only thing tying you to Enstars, but{" "}
          <strong>GODDAMN</strong>, you have to thank the franchise for bringing
          them in your life. Keep showing your dedication to your special guy,{" "}
          <strong>they will truly appreciate it!</strong>
        </p>
      ),
    },
    {
      title: "Dreamer",
      description: (
        <p>
          You are filled with love, and express this love by showering your
          favorite character with it. You might ship yourself, or a character
          that represents you, with a character you love. You might find
          yourself creating Picrews of yourself and your favorite character, or
          coming up with date scenarios with them. Many of you also commission
          art of yourself with your favorite character to bring your vision to
          life. <strong>Love is a beautiful thing</strong>, thank you for
          sharing it.
        </p>
      ),
    },
    {
      title: "Creative",
      description: (
        <p>
          You express yourself by creating art or writing fanfiction of Enstars
          characters. You have a creative mind and are filled with talent, so
          you bring color to the fanbase by sharing your creations. You might
          also express headcanons in your art since{" "}
          <strong>
            if Hapiele won&apos;t do it, you just have to do it yourself.
          </strong>
          . You might also host creative projects such as zines in order to
          showcase other people&apos;s creativity. You bring a lot to the
          fanbase, and nothing would be the same without your work.
        </p>
      ),
    },
    {
      title: "Casual Fan",
      description: (
        <p>
          You enjoy Enstars from a distance,{" "}
          <strong>and that&apos;s perfectly okay!</strong> You probably enjoy
          Enstars for the gameplay and don&apos;t delve too much into the
          stories or characters. There are probably other interests that take up
          your time and passion. Seeing hardcore fans might be daunting, yet
          inspiring, for you. You&apos;re perfectly fine the way you are;
          don&apos;t delve any deeper. <strong>Run while you still can.</strong>
        </p>
      ),
    },
    {
      title: "Connoisseur",
      description: (
        <p>
          You really do put the <strong>music</strong> in Ensemble Stars{" "}
          <strong>Music!</strong> Your favorite aspect of the game is the music.
          You&apos;re usually seen listening to the game&apos;s songs and have
          quite strong opinions on them. You may or may not even choose your
          favorite units based on their songs. It&apos;s a rhythm game after
          all, and no rhythm game is complete without music! It&apos;s a good
          thing people like you can appreciate what the staff and voice actors
          put so much effort into.
        </p>
      ),
    },
  ];

  const resultWithDescription = quizResultsWithDescription.find(
    (r) => r.title === result.result,
  );

  const variants: Variants = {
    initial: (i: number) => ({
      opacity: 0,
      y: i * 100,
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className={`${styles.container} ${styles.resultsContainer}`}>
      <motion.div
        className={styles.resultHeader}
        custom={1}
        {...{ variants }}
        initial="initial"
        animate="visible"
      >
        <div className={styles.resultImage}>
          <img
            src={`https://assets.hellogirls.info/quiz/chibi_${result.result
              .toLowerCase()
              .replaceAll(" ", "-")}.png`}
            alt={result.result}
          />
        </div>
        <div className={styles.resultTitle}>
          <h2>You are a {result.result}!</h2>
        </div>
      </motion.div>
      <motion.div
        className={styles.resultDesc}
        custom={2}
        {...{ variants }}
        initial="initial"
        animate="visible"
      >
        {resultWithDescription?.description}
      </motion.div>
      <motion.h3
        custom={3}
        {...{ variants }}
        initial="initial"
        animate="visible"
      >
        Here is how you scored overall,
      </motion.h3>
      <motion.div
        className={styles.resultChart}
        custom={4}
        {...{ variants }}
        initial="initial"
        animate="visible"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={calculatedResults}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="result" />
            <PolarRadiusAxis domain={[0, 28]} />
            <Tooltip />
            <Radar dataKey="value" stroke="#dcdea9" fill="#dcdea9" />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
      <motion.div
        className={styles.overallResultsChart}
        custom={6}
        {...{ variants }}
        initial="initial"
        animate="visible"
      >
        {overallResultsError && <div>could not load results :(</div>}
        {areOverallResultsPending && <div>loading results</div>}
        {overallResults && (
          <OverallResults {...{ overallResults }} userResult={result} />
        )}
      </motion.div>
      <motion.div
        className={styles.resultFooter}
        custom={7}
        {...{ variants }}
        initial="initial"
        animate="visible"
      >
        <button
          className={styles.tryAgain}
          onClick={() => {
            setCurrentPage("intro");
          }}
        >
          Try again?
        </button>
      </motion.div>
    </div>
  );
}

export default function EnstarsFanQuiz() {
  const [currentPage, setCurrentPage] = React.useState<QuizPage>("intro");
  const [quizResults, setQuizResults] = React.useState<QuizQuestion[]>([]);

  const overallResultsResponse = useQuery({
    queryKey: ["getOverallResults"],
    queryFn: async () => {
      const response = await supabase.from("purrsonality_results").select();
      console.table(response.data);
      return response.data;
    },
  });

  React.useEffect(() => {
    if (currentPage !== "results") {
      setQuizResults([]);
    }
  }, [currentPage]);

  return (
    <main className={styles.page}>
      {currentPage === "intro" && <IntroSection {...{ setCurrentPage }} />}
      {currentPage === "quiz" && (
        <QuizSection {...{ setCurrentPage, quizResults, setQuizResults }} />
      )}
      {currentPage === "results" && (
        <ResultsPage
          {...{ setCurrentPage, quizResults, supabase, overallResultsResponse }}
        />
      )}
    </main>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "what kind of enstars fan are you?",
    },
  };
}
