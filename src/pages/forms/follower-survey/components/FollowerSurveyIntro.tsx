import { motion } from "framer-motion";

import styles from "../../styles/Form.module.scss";

import Tooltip from "component/utility/Tooltip";
import TextInput from "component/utility/TextInput";

export default function FollowerSurveyIntro({
  isVisible,
}: {
  isVisible: boolean;
}) {
  return (
    <div
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
          style={{ paddingLeft: 0, width: "40%" }}
          textboxStyle={{ padding: 8 }}
        />
      </div>
      <motion.div className={styles.formSection}>
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
        <TextInput
          id="user_name"
          placeholder="input your twitter username"
          style={{ paddingLeft: 0, width: "40%" }}
          textboxStyle={{ padding: 8 }}
          required={true}
        />
      </motion.div>
    </div>
  );
}
