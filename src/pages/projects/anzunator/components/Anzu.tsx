import styles from "../styles/Anzunator.module.scss";

export default function Anzu({ image }: { image: string }) {
  return (
    <div className={styles.anzu}>
      <img className={styles.image} src={image} alt="anzu" />
    </div>
  );
}
