import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import MainLayout from 'component/MainLayout'
import { IconCircleCheck, IconSignature, IconZodiacAries } from '@tabler/icons-react'
import { useContext, useEffect, useState } from 'react'
import { DarkModeContext } from 'context/DarkModeContext'
import { Slide } from 'react-awesome-reveal'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { colorTheme } = useContext(DarkModeContext);

  const ICON_SIZE = 40;

  const allAboutSon: BioSection[] = [
    {
      title: "name",
      content: "son",
      icon: <IconSignature size={ICON_SIZE} />
    },
    {
      title: "age",
      content: "23 years old",
      icon: <IconZodiacAries size={ICON_SIZE} />
    },
    {
      title: "pronouns",
      content: "she/he (they = OK)",
      icon: <IconCircleCheck size={ICON_SIZE} />
    }
  ]

  function ProfileCard({ section }: { section: BioSection }) {
    return (
      <div className={styles.profileElement}>
        <div className={styles.profileIcon}>
          {section.icon}
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileTitle}>
            {section.title}
          </div>
          <div className={styles.profileContent}>
            {section.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainLayout heading="welcome!">
      <main className={`${styles.main} ${styles[colorTheme]}`}>
        <h2>who am i?</h2>
        <div className={styles.profile}>
          <div className={styles.info}>
            {allAboutSon.map((info) => <ProfileCard key={info.title} section={info} />)}
          </div>
          <div className={styles.summary}>
            <p>hi! my name is <strong>son</strong>. i'm a black web developer and part time artist. my passion for coding reignited, and i created this website to store my coding projects! you might see me dabbling in data projects, among other things.</p>
            <p>i consider myself to be a nerd. some of the media i'm currently interested in includes <strong>pokemon</strong>, <strong>ensemble stars</strong>, and animal crossing! i also have a random, yet strong, passion for <strong>public transit and walkable cities</strong> and you might catch me rambling about that once in a while.</p>
            <p>i'm <Link href="https://twitter.com/HELLOGlRLS">active on twitter</Link> and don't know how to shut up, which means i write a lot of posts, but don't retweet a lot. follow at your own risk! however, due to my age, i try to not follow back people under the age of 18 or with no age listed. i talk a lot about whatever interests me at the moment, which currently happens to be <strong>ensemble stars</strong>.</p>
            <p>i also have a very cute cat named <strong>moo moo</strong>! i love her dearly and will talk about her sometimes.</p>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
