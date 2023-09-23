import { Dispatch, SetStateAction } from "react";

import styles from "../../styles/Form.module.scss";

import Textarea from "component/utility/TextArea";

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
  return (
    <div
      className={styles.formPart}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <label className={styles.formLabel} htmlFor="faveUnit">
        <h3>do you have any thoughts before you go? :3</h3>
      </label>
      <Textarea />
    </div>
  );
}
