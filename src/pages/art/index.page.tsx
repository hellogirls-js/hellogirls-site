import { useContext } from "react";

import styles from "./styles/Art.module.scss";
import GallerySideMenu from "./components/GallerySideMenu";
import GalleryMainContent from "./components/GalleryMainContent";

import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";

export default function Art() {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <MainLayout heading="art gallery">
      <div className={`${styles.art} ${styles[colorTheme]}`}>
        <GallerySideMenu />
        <GalleryMainContent />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "art gallery",
    },
  };
}
