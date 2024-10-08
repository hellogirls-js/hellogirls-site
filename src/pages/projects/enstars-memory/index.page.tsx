import { useContext, useEffect, useMemo, useState } from "react";
import {
  IconClockPause,
  IconClockPlay,
  IconQuestionMark,
} from "@tabler/icons-react";
import { useInterval, useListState } from "@mantine/hooks";
import Image from "next/image";

import styles from "../styles/Memory.module.scss";

import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";
import { getData } from "utils/data";
import TextInput from "component/utility/TextInput";
import Button from "component/utility/Button";
import Tooltip from "component/utility/Tooltip";
import Strong from "component/utility/Strong";

interface CharacterData {
  id: number;
  nameOptions: string[];
  guessed: boolean;
}

export default function MemoryTest(props: any) {
  const { charaData } = props;
  const { colorTheme } = useContext(DarkModeContext);

  const formattedData: CharacterData[] = charaData
    .sort((a: any, b: any) => a.sort_id - b.sort_id)
    .map((chara: any) => {
      const name = [chara.first_name, chara.last_name].filter(
        (name) => name !== undefined && name.length > 0,
      );
      let nameOptions: string[];
      if (name.length === 1) {
        // Fuck You HiMERU !
        nameOptions = name;
      } else {
        nameOptions = [
          name.join(" "),
          name.join(""),
          [name[1], name[0]].join(" "),
          [name[1], name[0]].join(""),
        ];
        if (chara.first_nameRuby ?? chara.last_nameRuby) {
          const nameRuby = [
            chara.first_nameRuby ?? chara.first_name,
            chara.last_nameRuby ?? chara.last_name,
          ];
          nameOptions.push(
            ...[
              nameRuby.join(" "),
              nameRuby.join(""),
              [nameRuby[1], nameRuby[0]].join(" "),
              [nameRuby[1], nameRuby[0]].join(""),
            ],
          );
        }
      }
      return {
        id: chara.character_id,
        nameOptions: nameOptions.map((name) => name.toLowerCase()),
        guessed: false,
      };
    });
  formattedData.push(
    ...[
      {
        id: 81,
        nameOptions: ["esu sagiri", "sagiri esu", "esusagiri", "sagiriesu"],
        guessed: false,
      },
      {
        id: 82,
        nameOptions: ["ibuki taki", "taki ibuki", "ibukitaki", "takiibuki"],
        guessed: false,
      },
      {
        id: 83,
        nameOptions: ["kanna natsu", "natsu kanna", "kannanatsu", "natsukanna"],
        guessed: false,
      },
      {
        id: 84,
        nameOptions: [
          "fuyume hanamura",
          "hanamura fuyume",
          "fuyumehanamura",
          "hanamurafuyume",
        ],
        guessed: false,
      },
      {
        id: 85,
        nameOptions: ["raika hojo", "hojo raika", "raikahojo", "hojoraika"],
        guessed: false,
      },
      {
        id: 86,
        nameOptions: [
          "nice arneb thunder",
          "nicearnebthunder",
          "sanda yoshihide",
          "yoshihide sanda",
          "yoshihidesanda",
          "sandayoshihide",
        ],
        guessed: false,
      },
    ],
  );

  const [gameTime, setGameTime] = useState<number>();
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const [characters, setCharacters] = useListState(formattedData);
  const [inputVal, setInputVal] = useState("");
  const [secondsLeft, setSecondsLeft] = useState<number>(-1);
  const [countdownString, setCountdownString] = useState<string>();

  const countdown = useInterval(() => {
    if (!hasGameEnded) {
      setSecondsLeft((prev) => prev - 1);
    }
  }, 1000);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputVal(event.target.value);
  };

  useEffect(() => {
    if (inputVal.length) {
      const trimmedInput = inputVal.trim();
      const inputMatchesCharaName = characters.findIndex((chara) => {
        return chara.nameOptions.includes(trimmedInput.toLowerCase());
      });
      if (
        inputMatchesCharaName > -1 &&
        !characters[inputMatchesCharaName].guessed
      ) {
        setCharacters.setItemProp(inputMatchesCharaName, "guessed", true);
        setInputVal("");
      }
    }
  }, [inputVal]);

  useEffect(() => {
    if (secondsLeft > 0) {
      const numberOfMinutes = Math.floor(secondsLeft / 60);
      const numberOfSeconds = Math.floor(secondsLeft % 60);
      setCountdownString(
        `${numberOfMinutes}:${
          numberOfSeconds < 10 ? `0${numberOfSeconds}` : numberOfSeconds
        }`,
      );
    } else if (secondsLeft === 0 && gameTime) {
      setHasGameEnded(true);
    }
  }, [secondsLeft]);

  useEffect(() => {
    if (gameTime && !countdown.active) {
      setHasGameEnded(false);
      setSecondsLeft(gameTime * 60);
      setCountdownString(`${gameTime}:00`);
      countdown.start();
    }
  }, [gameTime]);

  useEffect(() => {
    if (hasGameEnded) {
      countdown.stop();
      setGameTime(undefined);
    }
  }, [hasGameEnded]);

  const guessedCharas = useMemo(() => {
    return characters.filter((chara) => chara.guessed);
  }, [characters]);

  useEffect(() => {
    if (guessedCharas.length === characters.length) setHasGameEnded(true);
  }, [guessedCharas]);

  return (
    <MainLayout heading="test your memory!">
      <div className={`${styles.memoryGame} ${styles[colorTheme]}`}>
        <div className={styles.description}>
          <h2>enstars character quiz</h2>
          <p>
            the task is to name every playable ensemble stars character from
            memory. you have three minutes to do so and copying + pasting is not
            allowed. please provide each character&apos;s first and last name.
            good luck!
          </p>
        </div>
        <div className={styles.gameContainer}>
          <div className={styles.inputContainer}>
            {gameTime ? (
              <>
                <TextInput
                  value={inputVal}
                  onChange={onInputChange}
                  label="name all ensemble stars characters"
                  placeholder="input a character's full name"
                  style={{ width: "100%", padding: 0, paddingBottom: "2%" }}
                  textboxStyle={{
                    padding: "8px",
                    fontSize: "1.25em",
                    width: "100%",
                  }}
                  disabled={!countdown.active}
                  onPaste={(e) => e.preventDefault()}
                />
                <div className={styles.inputOptions}>
                  <div className={styles.timeOptions}>
                    <div className={styles.timer}>{countdownString}</div>
                    <Button
                      value={countdown.active ? "pause" : "resume"}
                      icon={
                        countdown.active ? (
                          <IconClockPause />
                        ) : (
                          <IconClockPlay />
                        )
                      }
                      onClick={() => {
                        countdown.toggle();
                      }}
                      disabled={hasGameEnded}
                    />
                  </div>
                  <div className={styles.amountLeft}>
                    {guessedCharas.length} / {characters.length} guessed
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ textAlign: "center" }}>Start!</h3>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2%",
                  }}
                >
                  <Button
                    value="EASY (6 minutes)"
                    onClick={() => setGameTime(6)}
                    buttonStyle={{
                      fontSize: "1.5em",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                  />
                  <Button
                    value="HARD (3 minutes)"
                    onClick={() => setGameTime(3)}
                    buttonStyle={{
                      fontSize: "1.5em",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                  />
                </div>
              </>
            )}
          </div>
          {hasGameEnded && (
            <div className={styles.results}>
              <p>
                You got <Strong>{guessedCharas.length}</Strong> out of{" "}
                {characters.length} characters!
              </p>
              {guessedCharas.length === characters.length && (
                <p>
                  You listed them all with{" "}
                  <Strong>{secondsLeft} seconds</Strong> left!
                </p>
              )}
            </div>
          )}
          <div className={styles.charaGrid}>
            {characters.map((chara) =>
              chara.guessed ? (
                <div key={chara.id} className={styles.guessedChara}>
                  <Tooltip label={chara.nameOptions[0]} position="top">
                    <Image
                      key={chara.id}
                      src={`https://assets.enstars.link/assets/character_sd_square1_${chara.id}.png`}
                      alt={chara.nameOptions[0]}
                      width={68}
                      height={68}
                    />
                  </Tooltip>
                </div>
              ) : (
                <div key={chara.id} className={styles.unguessedChara}>
                  <IconQuestionMark size={48} />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const DATA_URL = "https://data.ensemble.moe/ja/characters.json";

  const data = await getData(DATA_URL);
  const enData = await getData(TL_DATA_URL);

  const charaData = enData.data.map((chara: any) => {
    const correspondingJpChara = data.data.find(
      (c: any) => c.character_id === chara.character_id,
    );
    if (correspondingJpChara) {
      return {
        ...chara,
        sort_id: correspondingJpChara.sort_id,
      };
    }
    return chara;
  });

  return {
    props: {
      title: "test your memory!",
      charaData,
    },
  };
}
