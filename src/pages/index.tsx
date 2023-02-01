import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import MainLayout from 'component/MainLayout'
import { IconCircleCheck, IconSignature, IconZodiacAries } from '@tabler/icons-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const allAboutSon: BioSection[] = [
    {
      title: "name",
      content: "son",
      icon: <IconSignature />
    },
    {
      title: "age",
      content: "23 years old",
      icon: <IconZodiacAries />
    },
    {
      title: "pronouns",
      content: "she/he (they = OK)",
      icon: <IconCircleCheck />
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
      <main className={styles.main}>
        <h2>who am i?</h2>
        <div className={styles.profile}>
          <div className={styles.info}>
            {allAboutSon.map((info) => <ProfileCard key={info.title} section={info} />)}
          </div>
          <div className={styles.summary}>
            <p>hi! my name is son. i'm a black web developer and part time artist. my passion for coding reignited, and i created this website to store my coding projects! you might see me dabbling in data projects, among other things.</p>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
