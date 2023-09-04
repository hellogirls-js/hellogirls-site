import styles from "../../styles/Form.module.scss";

export default function FollowerSurveyFave({
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
        <label className={styles.formLabel} htmlFor="fave_unit">
          <h3>choose your favorite unit</h3>
        </label>
      </div>
    </div>
  );
}
