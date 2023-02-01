import {
  IconCircleCheck,
  IconSignature,
  IconZodiacAries,
} from "@tabler/icons-react";
import { useContext } from "react";
import Link from "next/link";

import styles from "@/styles/Home.module.scss";
import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";

export default function Home() {
  const { colorTheme } = useContext(DarkModeContext);

  const ICON_SIZE = 40;

  const allAboutSon: BioSection[] = [
    {
      title: "name",
      content: "son",
      icon: <IconSignature size={ICON_SIZE} />,
    },
    {
      title: "age",
      content: "23 years old",
      icon: <IconZodiacAries size={ICON_SIZE} />,
    },
    {
      title: "pronouns",
      content: "she/he (they = OK)",
      icon: <IconCircleCheck size={ICON_SIZE} />,
    },
  ];

  function ProfileCard({ section }: { section: BioSection }) {
    return (
      <div className={styles.profileElement}>
        <div className={styles.profileIcon}>{section.icon}</div>
        <div className={styles.profileInfo}>
          <div className={styles.profileTitle}>{section.title}</div>
          <div className={styles.profileContent}>{section.content}</div>
        </div>
      </div>
    );
  }

  return (
    <MainLayout heading="welcome!">
      <div className={styles[colorTheme]}>
        <h2 className={styles.heading2}>who am i?</h2>
        <div className={styles.profile}>
          <div className={styles.info}>
            {allAboutSon.map((info) => (
              <ProfileCard key={info.title} section={info} />
            ))}
          </div>
          <div className={styles.summary}>
            <p>
              hi! my name is <strong>son</strong>. i&apos;m a black web
              developer and part time artist. my passion for coding reignited,
              and i created this website to store my coding projects! you might
              see me dabbling in data projects, among other things.
            </p>
            <p>
              some of the media i&apos;m currently interested in includes{" "}
              <strong>pokemon</strong>, <strong>ensemble stars</strong>, and
              animal crossing! i also have a random, yet strong, passion for{" "}
              <strong>public transit and walkable cities</strong> and you might
              catch me rambling about that once in a while.
            </p>
            <p>
              i&apos;m{" "}
              <Link href="https://twitter.com/HELLOGlRLS">
                active on twitter
              </Link>{" "}
              and don&apos;t know how to shut up, which means i write a lot of
              posts, but don&apos;t retweet a lot. follow at your own risk! due
              to my age, i try to not follow back people under the age of 18 or
              with no age listed. i talk a lot about whatever interests me at
              the moment, which currently happens to be{" "}
              <strong>ensemble stars</strong>.
            </p>
            <p>
              despite my strong interest in ensemble stars, i spend too much
              time drawing and coding to actually read any stories! i try to
              avoid making any generalizations about certain characters because
              of this. the characters i have the most knowledge of are{" "}
              <strong>niki</strong> and his fellow unitmates!
            </p>
            <p>
              i also have a very cute cat named <strong>moo moo</strong>! i love
              her dearly and will talk about her sometimes.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
