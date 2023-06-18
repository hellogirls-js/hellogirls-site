import Image from "next/image";

import styles from "./styles/carrd.module.scss";

import NikiIcon from "assets/femme_niki_icon.png";

export default function Carrd() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <Image
                src={NikiIcon.src}
                width={NikiIcon.width / 1.5}
                height={NikiIcon.height / 1.5}
                alt="femme niki icon"
              />
            </div>
          </div>
          <div className={styles.basicBio}>
            <div className={styles.bioName}>son!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "son's carrd!",
    },
  };
}
