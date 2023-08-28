import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import styles from "../../styles/Ninjaman.module.scss";
import AsobiShinobu from "../../../../../assets/asobi_shinobu_0.png";

export default function NinjamanInstructions({
  setCurrentPage,
}: {
  setCurrentPage: Dispatch<SetStateAction<Page>>;
}) {
  return (
    <div className={`${styles.ninjamanInstructions} ${styles.ninjamanPage}`}>
      <div className={styles.ninjamanPageContainer}>
        <div className={styles.ninjamanShinobuContainer}>
          <Image
            src={AsobiShinobu.src}
            width={AsobiShinobu.width / 1.5}
            height={AsobiShinobu.height / 1.5}
            alt="shnoob"
          />
        </div>
        <div className={styles.ninjamanPageContentContainer}>
          <div className={styles.ninjamanHeading}>
            <h3>I&apos;ll tell you how to play, de gozaru!</h3>
          </div>
          <div className={styles.ninjamanContent}>
            <p>
              If you aren&apos;t familiar with the popular game, Hangman,
              I&apos;ll explain the rules to you! Basically, I will come up with
              a phrase. You&apos;re responsible for guessing this phrase by
              suggesting one letter at a time to me. Try to guess the phrase
              before I run out of shurikens, okay, de gozaru? You have seven
              tries!
            </p>

            <div className={styles.ninjamanInstructionsButtons}>
              <div
                className={styles.ninjamanInstructionsButton}
                onClick={() => setCurrentPage("home")}
              >
                You got it!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
