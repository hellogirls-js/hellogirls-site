import styles from "../styles/Art.module.scss";

export default function GallerySideMenu() {
  return (
    <div className={styles.gallerySideMenu}>
      <h3>filter</h3>
      <div className={styles.menuTagsContainer}></div>
    </div>
  );
}
