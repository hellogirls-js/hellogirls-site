import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import styles from "../../styles/Ninjaman.module.scss";

export default function NinjamanHome({
  setCurrentPage,
}: {
  setCurrentPage: Dispatch<SetStateAction<Page>>;
}) {
  return (
    <div className={`${styles.ninjamanHome} ${styles.ninjamanPage}`}>
      <div className={styles.ninjamanPageContainer}>
        <div className={styles.ninjamanShinobuContainer}>
          <Image
            src="https://assets.hellogirls.info/file/hellogirls-assets/asobi/ninjaman/asobi_shinobu_0.png"
            width={408 / 1.5}
            height={595 / 1.5}
            alt="shnoob"
          />
        </div>
        <div className={styles.ninjamanPageContentContainer}>
          <div className={styles.ninjamanHeading}>
            <h3>Welcome to Ninjaman, de gozaru!</h3>
          </div>
          <div className={styles.ninjamanContent}>
            <div className={styles.ninjamanHomeButtons}>
              <div
                className={styles.ninjamanHomeButton}
                onClick={() => setCurrentPage("game")}
              >
                Start game
              </div>
              <div
                className={styles.ninjamanHomeButton}
                onClick={() => {
                  setCurrentPage("instructions");
                }}
              >
                Instructions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
