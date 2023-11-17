import { useAnimation, motion } from "framer-motion";
import Link from "next/link";
import dayjs from "dayjs";

import {
  IconCircleCheck,
  IconSignature,
  IconZodiacAries,
} from "component/utility/AnimatedIcons";
import Strong from "component/utility/Strong";

export default function Profile({
  styles,
  birthday,
}: {
  styles: any;
  birthday: string;
}) {
  const ICON_SIZE = 40;

  const allAboutSon: BioSection[] = [
    {
      title: "nickname",
      content: "son",
      icon: IconSignature,
    },
    {
      title: "age",
      content: `${dayjs().diff(dayjs(birthday), "year")} years old`,
      icon: IconZodiacAries,
    },
    {
      title: "pronouns",
      content: "any pronouns!",
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
          <div className={styles.profileTitle}>
            <strong>{section.title}</strong>
          </div>
          <div className={styles.profileContent}>{section.content}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <div style={{ margin: "10vh 0vw 23vh 0vw" }}>
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
            hi! you can call me <Strong>son</Strong>. i&apos;m a black web
            developer and part time artist. my passion for coding reignited, and
            i created this website to store my coding projects! you might see me
            dabbling in data projects, among other things.
          </p>
          <p>
            i started coding at a very young age (when i was ten years old!).
            it&apos;s embarrassing to admit, but what got me into web design was
            seeing the various pokemon fansites that were popular in the mid
            2000&apos;s to early 2010&apos;s. it was a niche community, yet i
            wouldn&apos;t be where i am if i never discovered them. i expanded
            my knowledge of coding in high school, where i learned
            object-oriented programming. then, i picked up the tools necessary
            for front-end development in college and managed to score myself
            some internships.
          </p>
          <p>
            some of the media i&apos;m currently interested in includes{" "}
            <Strong>pokemon</Strong>, <Strong>ensemble stars</Strong>, and
            animal crossing! i also have a random, yet strong, passion for{" "}
            <Strong>public transit and walkable cities</Strong> and you might
            catch me rambling about that once in a while.
          </p>
          <p>
            i also have a very cute cat named{" "}
            <Link href="/cat" style={{ textDecoration: "underline" }}>
              <Strong>moo moo</Strong>
            </Link>
            ! i love her dearly and will talk about her sometimes.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
