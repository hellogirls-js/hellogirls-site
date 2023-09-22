import { Dispatch, RefObject, SetStateAction } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";

import styles from "../../styles/Form.module.scss";

import Tooltip from "component/utility/Tooltip";
import TextInput from "component/utility/TextInput";
import Alert from "component/utility/Alert";

export default function FollowerSurveyIntro({
  isVisible,
  setIsBot,
  setName,
  setUsername,
  nameRef,
  usernameRef,
  error,
}: {
  isVisible: boolean;
  isBot: boolean;
  setIsBot: Dispatch<SetStateAction<boolean>>;
  setName: (newValue: string) => void;
  setUsername: (newValue: string) => void;
  nameRef: RefObject<HTMLInputElement>;
  usernameRef: RefObject<HTMLInputElement>;
  error?: FormError | null;
}) {
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  return (
    <motion.div
      className={styles.formPart}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="name">
          <h3>what is your name?</h3>
        </label>
        <TextInput
          id="user_name"
          placeholder="input your name"
          style={{ paddingLeft: 0, width: isDesktop ? "40%" : "100%" }}
          textboxStyle={{ padding: 8 }}
          onChange={(e: InputEvent) =>
            setName((e.currentTarget as HTMLInputElement).value)
          }
          refProp={nameRef}
        />
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel} htmlFor="name">
          <h3>how about your twitter username?</h3>
          <Tooltip
            label="this is required"
            position="top"
            style={{ width: "auto" }}
          >
            <span className={styles.asterisk}>*</span>
          </Tooltip>
        </label>
        {error?.noUsername && (
          <Alert
            icon={<IconAlertTriangle />}
            type="warning"
            style={{ width: isDesktop ? "40%" : "100%" }}
          >
            Please input your Twitter username.
          </Alert>
        )}
        <TextInput
          id="user_twitter"
          placeholder="input your twitter username"
          style={{ paddingLeft: 0, width: isDesktop ? "40%" : "100%" }}
          textboxStyle={{ padding: 8 }}
          required={true}
          onChange={(e: InputEvent) =>
            setUsername((e.currentTarget as HTMLInputElement).value)
          }
          refProp={usernameRef}
        />
      </div>
      {error?.isBot && (
        <Alert style={{ width: isDesktop ? "40%" : "100%" }}>
          Nice try, bot.
        </Alert>
      )}
      <input
        type="checkbox"
        style={{ display: "none" }}
        id="intro-security-check"
        onChange={(e) => setIsBot((e.target as HTMLInputElement).checked)}
      />
    </motion.div>
  );
}
