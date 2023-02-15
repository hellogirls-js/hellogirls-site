import { useAnimation, motion } from "framer-motion";
import Link from "next/link";
import dayjs from "dayjs";

import {
  IconCircleCheck,
  IconSignature,
  IconZodiacAries,
} from "component/utility/AnimatedIcons";
import Strong from "component/utility/Strong";

export default function Profile({ styles }: { styles: any }) {
  const ICON_SIZE = 40;

  const allAboutSon: BioSection[] = [
    {
      title: "name",
      content: "son",
      icon: IconSignature,
    },
    {
      title: "age",
      content: `${dayjs().diff(dayjs("1999-03-30"), "year")} years old`,
      icon: IconZodiacAries,
    },
    {
      title: "pronouns",
      content: "she/he (they = OK)",
      icon: IconCircleCheck,
    },
  ];

  function ProfileCard({
    section,
    custom,
  }: {
    section: BioSection;
    custom: number;
  }) {
    const draw = {
      motion: {
        pathLength: [0, 1],
        opacity: [0, 1],
        transition: {
          pathLength: {
            delay: 0.05,
            type: "spring",
            duration: 1.5,
            bounce: 0,
          },
          opacity: {
            delay: 0.05,
            duration: 0.01,
          },
        },
        still: {
          pathLength: 1,
          opacity: 1,
        },
      },
    };

    const controls = useAnimation();
    function handleMouseEnterControls() {
      controls.start("motion");
    }

    function handleMouseLeaveControls() {
      controls.start("still");
    }

    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={styles.profileElement}
        onMouseEnter={handleMouseEnterControls}
        onMouseLeave={handleMouseLeaveControls}
        variants={{
          hiddenItem: {
            opacity: 0,
            y: 100,
          },
          visibleItem: {
            opacity: 1,
            y: 0,
            transition: {
              delay: custom * 0.8,
              duration: 0.6,
            },
          },
        }}
        initial="hiddenItem"
        animate="visibleItem"
        custom={custom}
      >
        <div className={styles.profileIcon}>
          <section.icon
            size={ICON_SIZE}
            variants={draw}
            custom={custom}
            animate={controls}
          />
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileTitle}>{section.title}</div>
          <div className={styles.profileContent}>{section.content}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.h2
        className={styles.heading2}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: (custom) => {
            return {
              opacity: 1,
              x: 0,
              transition: { delay: custom * 1.4, duration: 0.8 },
            };
          },
        }}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        who am i?
      </motion.h2>
      <div className={styles.profile}>
        <motion.div
          className={styles.info}
          variants={{
            hiddenInfo: { opacity: 0 },
            visibleInfo: (custom) => {
              return { opacity: 1, transition: { delay: custom } };
            },
          }}
          initial="hiddenInfo"
          animate="visibleInfo"
          custom={2}
        >
          {allAboutSon.map((info, index) => (
            <ProfileCard key={info.title} section={info} custom={index + 3} />
          ))}
        </motion.div>
        <motion.div
          className={styles.summary}
          variants={{
            hidden: { opacity: 0, y: -300 },
            visible: (custom) => {
              return {
                opacity: 1,
                y: 0,
                transition: { delay: custom * 0.8, duration: 1 },
              };
            },
          }}
          custom={6}
          initial="hidden"
          animate="visible"
        >
          <p>
            hi! my name is <Strong>son</Strong>. i&apos;m a black web developer
            and part time artist. my passion for coding reignited, and i created
            this website to store my coding projects! you might see me dabbling
            in data projects, among other things.
          </p>
          <p>
            some of the media i&apos;m currently interested in includes{" "}
            <Strong>pokemon</Strong>, <Strong>ensemble stars</Strong>, and
            animal crossing! i also have a random, yet strong, passion for{" "}
            <Strong>public transit and walkable cities</Strong> and you might
            catch me rambling about that once in a while.
          </p>
          <p>
            i&apos;m{" "}
            <Link href="https://twitter.com/HELLOGlRLS">active on twitter</Link>{" "}
            and don&apos;t know how to shut up, which means i write a lot of
            posts, but don&apos;t retweet a lot. follow at your own risk! due to
            my age, i try to not follow back people under the age of 18 or with
            no age listed. i talk a lot about whatever interests me at the
            moment, which currently happens to be{" "}
            <Strong>ensemble stars</Strong>.
          </p>
          <p>
            despite my strong interest in ensemble stars, i spend too much time
            drawing and coding to actually read any stories! i try to avoid
            making any generalizations about certain characters because of this.
            the characters i know the most about are <Strong>niki</Strong> and
            his fellow unitmates!
          </p>
          <p>
            i also have a very cute cat named{" "}
            <Link href="/cat">
              <Strong>moo moo</Strong>
            </Link>
            ! i love her dearly and will talk about her sometimes.
          </p>
        </motion.div>
      </div>
    </>
  );
}
