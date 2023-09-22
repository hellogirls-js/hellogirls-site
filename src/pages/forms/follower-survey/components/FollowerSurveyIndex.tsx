import { IconCheck } from "@tabler/icons-react";

import styles from "../../styles/Form.module.scss";

export default function FollowerSurveyIndex({
  formIndex,
}: {
  formIndex: number;
}) {
  return (
    <div className={styles.formIndexContainer}>
      {[1, 2, 3, 4].map((index, i) => (
        <div
          className={`${styles.formIndex} ${
            index <= formIndex ? styles.completed : styles.regular
          }`}
          key={index}
        >
          {index < formIndex ? <IconCheck strokeWidth={3} /> : index}
        </div>
      ))}
    </div>
  );
}
