import { useContext, useReducer, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useDebouncedState, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { Oval } from "react-loader-spinner";

import styles from "../styles/Form.module.scss";

import FollowerSurveyIntro from "./components/FollowerSurveyIntro";
import FollowerSurveyFave from "./components/FollowerSurveyFave";
import FollowerSurveyIndex from "./components/FollowerSurveyIndex";
import FollowerSurveyPredicted from "./components/FollowSurveyPredicted";
import FollowerSurveyComment from "./components/FollowerSurveyComment";

import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";
import getData from "component/utility/data";
import Button from "component/utility/Button";

export default function FollowerSurveyForm(props: {
  title: string;
  actionUrl: string;
  rawData: any;
  enData: any;
  unitData: any;
}) {
  const { rawData, enData, unitData } = props;

  const [isIntroBotChecked, setIntroBotChecked] = useState<boolean>(false);
  const [isFaveBotChecked, setFaveBotChecked] = useState<boolean>(false);
  const [isPredictedBotChecked, setPredictedBotChecked] =
    useState<boolean>(false);
  const [isCommentBotChecked, setCommentBotChecked] = useState<boolean>(false);
  const [name, setName] = useDebouncedState<string>("", 300);
  const [username, setUsername] = useDebouncedState<string>("", 300);
  const [faveUnit, setFaveUnit] = useState<number | null>(null);
  const [faveChara, setFaveChara] = useState<number | null>(null);
  const [predictedUnit, setPredictedUnit] = useState<number | null>(null);
  const [predictedChara, setPredictedChara] = useState<number | null>(null);
  const [comment, setComment] = useState<string | null>(null);

  const nameInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const formContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const defaultState: State = {
    formData: {
      name: null,
      twitter: null,
      fave_unit: null,
      fave_chara: null,
      assumed_unit: null,
      assumed_chara: null,
      comment: null,
    },
    formIndex: 1,
    submitForm: false,
    submitLoading: false,
    introFormError: null,
    faveFormError: null,
    predictedFormError: null,
    commentFormError: null,
    submitError: false,
  };

  function reducer(state: State, action: Action): State {
    if (action.type === "nextSection") {
      switch (state.formIndex) {
        case 1:
          if (username !== null && username !== "" && !isIntroBotChecked) {
            return {
              ...state,
              formData: {
                ...state.formData,
                name: name,
                twitter: username,
              },
              introFormError: null,
              formIndex: 2,
            };
          } else {
            return {
              ...state,
              introFormError: {
                noUsername: username === null || username === "",
                isBot: isIntroBotChecked,
              },
            };
          }
          break;
        case 2:
          if (!isFaveBotChecked && faveChara !== null && faveUnit !== null) {
            formContentRef.current?.scrollIntoView({
              behavior: "smooth",
            });
            return {
              ...state,
              formData: {
                ...state.formData,
                fave_chara: faveChara,
                fave_unit: faveUnit,
              },
              faveFormError: null,
              formIndex: 3,
            };
          } else {
            formContentRef.current?.scrollIntoView({
              behavior: "smooth",
            });
            return {
              ...state,
              faveFormError: {
                noFaveChara: faveChara === null,
                noFaveUnit: faveUnit === null,
                isBot: isFaveBotChecked,
              },
            };
          }
          break;
        case 3:
          if (
            !isPredictedBotChecked &&
            predictedChara !== null &&
            predictedUnit !== null
          ) {
            formContentRef.current?.scrollIntoView({
              behavior: "smooth",
            });
            return {
              ...state,
              formData: {
                ...state.formData,
                assumed_chara: predictedChara,
                assumed_unit: predictedUnit,
              },
              predictedFormError: null,
              formIndex: 4,
            };
          } else {
            formContentRef.current?.scrollIntoView({
              behavior: "smooth",
            });
            return {
              ...state,
              predictedFormError: {
                noPredictedChara: predictedChara === null,
                noFaveUnit: predictedUnit === null,
                isBot: isPredictedBotChecked,
              },
            };
          }
          break;
        case 4:
          if (!isCommentBotChecked) {
            formContentRef.current?.scrollIntoView({
              behavior: "smooth",
            });
            return {
              ...state,
              formData: {
                ...state.formData,
                comment: comment,
              },
              commentFormError: null,
              submitForm: true,
            };
          } else {
            formContentRef.current?.scrollIntoView({
              behavior: "smooth",
            });
            return {
              ...state,
              commentFormError: {
                isBot: isCommentBotChecked,
              },
            };
          }
          break;
        default:
          return state;
      }
    } else if (action.type === "prevSection") {
      switch (state.formIndex) {
        case 2:
          if (usernameInput.current) usernameInput.current.value = username;
          return {
            ...state,
            formIndex: 1,
          };
          break;
        case 3:
          return {
            ...state,
            formIndex: 2,
          };
          break;
        case 4:
          return {
            ...state,
            formIndex: 3,
          };
          break;
        default:
          return state;
      }
    } else if (action.type === "submitData") {
      return {
        ...state,
        submitForm: true,
      };
    } else if (action.type === "submitError") {
      return {
        ...state,
        submitError: true,
      };
    } else if (action.type === "submitLoading") {
      return {
        ...state,
        submitLoading: true,
      };
    }
    return defaultState;
  }

  const [state, dispatch] = useReducer(reducer, {
    formData: {
      name: null,
      twitter: null,
      fave_unit: null,
      fave_chara: null,
      assumed_unit: null,
      assumed_chara: null,
      comment: null,
    },
    formIndex: 1,
    submitForm: false,
    submitError: false,
    submitLoading: false,
    introFormError: null,
    faveFormError: null,
    predictedFormError: null,
    commentFormError: null,
  });

  /**
   *
   * @returns A set of navigation buttons for the form
   */
  function FormButtons() {
    return (
      <div className={styles.formNavButtonContainer}>
        {state.formIndex > 1 && (
          <Button
            value="previous"
            icon={<IconArrowLeft />}
            onClick={() => {
              dispatch({
                type: "prevSection",
              });
            }}
            style={{ width: "17%" }}
            buttonStyle={{ width: "100%", padding: 10 }}
          />
        )}
        {state.formIndex === 4 ? (
          <Button
            type="submit"
            value="submit"
            alignIcon="right"
            icon={<IconArrowRight />}
            refProp={submitRef}
            style={{ width: "30%" }}
            buttonStyle={{ width: "100%", padding: 10 }}
          />
        ) : (
          <Button
            value="next"
            icon={<IconArrowRight />}
            alignIcon="right"
            onClick={() => {
              dispatch({
                type: "nextSection",
              });
            }}
            style={{ width: "30%" }}
            buttonStyle={{ width: "100%", padding: 10 }}
          />
        )}
      </div>
    );
  }

  const { colorTheme } = useContext(DarkModeContext);
  return (
    <MainLayout heading={props.title}>
      <div className={`${styles.formPage} ${styles[colorTheme]}`}>
        <h2>the follower survey of the century</h2>
        <h3>
          {isMobile && (
            <Link href="#follower-survey">
              i am on mobile i do not care what you have to say. just take me to
              the survey please.
            </Link>
          )}
        </h3>
        <p>
          hi! first off, thank you so much for 2000 followers oh my goodness. to
          continue, one day, i was in a really awful mood. i felt really
          paranoid online and decided to private my account, one of the only
          times i&apos;d ever do that. however, that wasn&apos;t enough to ease
          my anxieties; i needed a genuine pick-me-up. at the time, i was in my
          survey making era and thought about how i enjoyed reading the funny
          comments people left on my surveys. impulsively, i opened google forms
          and created a short-lived survey asking my followers who their
          favorite characters and units in ensemble stars are. i intended to end
          the survey whenever i felt ready to unprivate. my heart warmed when i
          read all of the comments people left. they were entertaining and
          managed to put a smile on my face. in return, i created a data
          visualization showing how everyone responded to the survey.
        </p>
        <p>
          i am <strong>NOT</strong> proud of the survey i created back then
          (back then being like 7 months ago but WHATEVER). it was rushed,
          uninspired, and blatantly revealed that i was unwilling to use
          advanced data visualization tools such as D3 or do any sort of
          meaningful analysis. i&apos;m committed to doing myself justice. with
          a larger sample size and more motivation, i will create the ULTIMATE
          character and unit popularity survey in ensemble stars (or, well,
          among my followers).
        </p>
        <p>
          that being said, thank you so much for taking part in this survey. and
          most importantly, thank you for supporting my coding endeavors!!
        </p>
        <motion.div
          ref={formContentRef}
          className={styles.formContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5 }}
        >
          {!state.submitForm && !state.submitError && !state.submitLoading ? (
            <>
              <FollowerSurveyIndex formIndex={state.formIndex} />
              <form
                id="follower-survey"
                ref={formRef}
                className={styles.form}
                method="POST"
                action={props.actionUrl}
                onSubmit={(e) => {
                  e.preventDefault();

                  const target = e.target as HTMLFormElement;
                  const { action } = target;
                  let data = Object.fromEntries(new FormData(target).entries());

                  data = {
                    ...data,
                    fave_unit: [
                      data.fave_unit,
                      unitData.data.find((u: any) => u.id == data.fave_unit)
                        .name,
                    ].join(": "),
                    fave_chara: [
                      data.fave_chara,
                      enData.data.find(
                        (c: any) => c.character_id == data.fave_chara
                      ).first_name,
                    ].join(": "),
                    assumed_unit: [
                      data.assumed_unit,
                      unitData.data.find((u: any) => u.id == data.assumed_unit)
                        .name,
                    ].join(": "),
                    assumed_chara: [
                      data.assumed_chara,
                      enData.data.find(
                        (c: any) => c.character_id == data.assumed_chara
                      ).first_name,
                    ].join(": "),
                    comment: `${data.comment || ""}`.replace(/<[^>]+>/gim, ""),
                  };

                  const submittedData = new FormData();

                  Object.keys(data).forEach((key) => {
                    submittedData.append(key, data[key]);
                  });

                  fetch(action, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin":
                        "https://script.google.com",
                    },
                  })
                    .then((res) => {
                      console.log(res);
                      if (res.status === 200 || res.status === 201) {
                        dispatch({ type: "submitData" });
                      } else {
                        dispatch({ type: "submitError" });
                      }
                    })
                    .catch(() => {
                      dispatch({ type: "submitError" });
                    });
                }}
              >
                <FollowerSurveyIntro
                  isVisible={state.formIndex === 1}
                  isBot={isIntroBotChecked}
                  setIsBot={setIntroBotChecked}
                  error={state.introFormError}
                  setName={setName}
                  setUsername={setUsername}
                  nameRef={nameInput}
                  usernameRef={usernameInput}
                />
                <FollowerSurveyFave
                  isVisible={state.formIndex === 2}
                  unitData={unitData.data}
                  rawData={rawData.data}
                  enData={enData.data}
                  faveUnit={faveUnit}
                  setFaveUnit={setFaveUnit}
                  faveChara={faveChara}
                  setFaveChara={setFaveChara}
                  setIsBot={setFaveBotChecked}
                  error={state.faveFormError}
                />
                <FollowerSurveyPredicted
                  isVisible={state.formIndex === 3}
                  unitData={unitData.data}
                  rawData={rawData.data}
                  enData={enData.data}
                  faveUnit={predictedUnit}
                  setFaveUnit={setPredictedUnit}
                  faveChara={predictedChara}
                  setFaveChara={setPredictedChara}
                  setIsBot={setPredictedBotChecked}
                  error={state.predictedFormError}
                />
                <FollowerSurveyComment
                  isVisible={state.formIndex === 4}
                  setComment={setComment}
                  setIsBot={setCommentBotChecked}
                  error={state.commentFormError}
                />
                <FormButtons />
              </form>
            </>
          ) : state.submitForm && !state.submitLoading && !state.submitError ? (
            <>
              <h3>thank you so much for participating!</h3>
              <p>
                please look forward to the data visualization i will create with
                this data. and most importantly, thank you for supporting my
                coding endeavors!
              </p>
            </>
          ) : state.submitError && !state.submitForm && !state.submitLoading ? (
            <>
              <h3>an error occurred while submitting, i&apos;m so sorry</h3>
              <p>please refresh the page and try again</p>
            </>
          ) : (
            <>
              <Oval
                width="10vw"
                height="10vw"
                color={colorTheme === "light" ? "#b5aef0" : "#5b53a8"}
                secondaryColor={colorTheme === "light" ? "#b5aef0" : "#5b53a8"}
                strokeWidth={5}
                strokeWidthSecondary={3}
                ariaLabel="loading"
                visible={true}
              />
            </>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const { FOLLOWER_FORM_DEPLOYMENT_URL } = process.env;

  const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const DATA_URL = "https://data.ensemble.moe/ja/characters.json";
  const UNIT_DATA = "https://tl.data.ensemble.moe/en/units.json";

  const enData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);
  const unitData = await getData(UNIT_DATA);

  return {
    props: {
      title: "follower survey",
      actionUrl: FOLLOWER_FORM_DEPLOYMENT_URL,
      rawData,
      enData,
      unitData,
    },
  };
}
