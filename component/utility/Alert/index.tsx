import styles from "./Alert.module.scss";

export default function Alert({ children }: { children: any }) {
  return <div className={styles.alert}>{children}</div>;
}
