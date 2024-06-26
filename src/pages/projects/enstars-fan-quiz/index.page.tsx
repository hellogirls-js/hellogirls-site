import React from "react";

import NatsumeSprite from "../../../../assets/natsume_regular.png";
import styles from "../styles/FanQuiz.module.scss";

export default function EnstarsFanQuiz() {
    return (
        <main className={styles.container}>
            <div className={styles.introContainer}>
                <div className={styles.nachumeContainer}>
                    <img src={NatsumeSprite.src} className={styles.nachumeImage} />
                </div>
                <div className={styles.speechBubbleContainer}>
                    <p>Are you a fan of Ensemble StarS? Have you ever wondered exactly what kind of fan you arE? Perhaps I could help with thaT.</p>
                </div>
            </div>
            <div className={styles.disclaimer}>This is a long personality quiz that consists of 49 questions to determine what kind of fan you are. You will select how much you agree with each statement on a scale from 1-5.</div>
        </main>
    );
}

export async function getServerSideProps() {
    return {
        props: {
            title: "what kind of enstars fan are you?"
        } 
    }
}
