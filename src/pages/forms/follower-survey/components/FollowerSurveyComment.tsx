import { Dispatch, SetStateAction } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

import styles from "../../styles/Form.module.scss";

import Textarea from "component/utility/TextArea";
import Alert from "component/utility/Alert";

export default function FollowerSurveyComment({
  isVisible,
  setComment,
  setIsBot,
  error,
}: {
  isVisible: boolean;
  setComment: Dispatch<SetStateAction<string | null>>;
  setIsBot: Dispatch<SetStateAction<boolean>>;
  error?: FormError | null;
}) {
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  return (
    <div
      className={styles.formPart}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <label className={styles.formLabel} htmlFor="faveUnit">
        <h3>do you have any thoughts before you go? :3</h3>
      </label>
      <Textarea name="comment" placeholder="hiiiiii" maxLength={2500} />
      {error?.isBot && (
        <Alert
          icon={<IconAlertTriangle />}
          type="warning"
          style={{ width: isDesktop ? "40%" : "100%", margin: "10px 0" }}
        >
          Nice try, bot.
        </Alert>
      )}
      <input
        type="checkbox"
        style={{ display: "none" }}
        id="intro-security-check"
        onChange={(e) => setIsBot((e.target as HTMLInputElement).checked)}
      />
    </div>
  );
}
