import styles from "../styles/Art.module.scss";

import GalleryGrid from "./GalleryGrid";
import GallerySearch from "./GallerySearch";

export default function GalleryMainContent() {
  return (
    <div className={styles.galleryMainContainer}>
      <GallerySearch />
      <GalleryGrid />
    </div>
  );
}
