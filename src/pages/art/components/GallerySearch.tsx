import styles from "../styles/Art.module.scss";

export default function GallerySearch() {
  return (
    <div className={styles.gallerySearchContainer}>
      <input
        type="text"
        className={styles.gallerySearch}
        placeholder="search for art..."
        aria-label="search for art"
      />
    </div>
  );
}
