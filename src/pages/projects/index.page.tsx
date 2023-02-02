import Link from "next/link";
import { useContext } from "react";

import styles from "./styles/Projects.module.scss";

import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";

interface ProjectObject {
  title: string;
  url?: string;
  description: JSX.Element;
  finished: boolean;
}

export default function Projects(props: any) {
  const CONTENT: ProjectObject[] = [
    {
      title: "lucky birthday ranking",
      url: "/projects/lucky-birthday",
      description: (
        <p className={styles.projectDesc}>
          a tool designed for users to easily retrieve their lucky birthday
          ranking based off off Japanese birthday luck fortunes. inspired by my
          inability to locate my birthday on the small, blurry charts commonly
          reposted on twitter.
        </p>
      ),
      finished: true,
    },
    {
      title: "makotools",
      url: "https://stars.ensemble.moe",
      description: (
        <p className={styles.projectDesc}>
          lead by{" "}
          <Link href="https://twitter.com/findermao" target="_blank">
            @findermao
          </Link>
          , makotools is a website made to store data related to the game
          ensemble stars! music!!. the site currently has over 80 contributers
          and i&apos;ve had lots of fun assisting as a dev and admin. the
          website is currently at version 0.3 with 0.4 on the way.
        </p>
      ),
      finished: true,
    },
    {
      title: "enstars marriage survey data visualization",
      description: (
        <p className={styles.projectDesc}>
          i created a survey for fans of ensemble stars to decide which
          characters are most and least suitable for marriage. i plan on
          visualizing these results on this website for participants to observe,
          as well as announcing the results of the survey live on this site.
        </p>
      ),
      finished: false,
    },
    {
      title: "enstars on fire twitter bot",
      description: (
        <p className={styles.projectDesc}>
          an anonymous person suggested rather than manually editing fire onto
          random card cgs, i should automate it and make it into a twitter bot.
          i will make it happen Starting February 9, we will no longer support
          free access to the Twitter API, both v2 and v1.1. A paid basic tier
          will be available instead
        </p>
      ),
      finished: false,
    },
    {
      title: "popular character visualization",
      description: (
        <p className={styles.projectDesc}>
          the release of makotools 0.4 allows users to choose their favorite
          characters and units from enstars. i plan to use this data to create a
          visualization of the most popular characters and units among users.
        </p>
      ),
      finished: false,
    },
  ];

  function Project({ proj }: { proj: ProjectObject }) {
    return (
      <div className={styles.project}>
        <h3 className={styles.projectTitle}>{proj.title}</h3>
        {proj.url && (
          <div className={styles.projectUrl}>
            <Link href={proj.url} target="_blank">
              view project
            </Link>
          </div>
        )}
        {proj.description}
      </div>
    );
  }

  const { colorTheme } = useContext(DarkModeContext);

  return (
    <MainLayout heading="projects">
      <div className={`${styles.projects} ${styles[colorTheme]}`}>
        <h2>current projects</h2>
        <div className={styles.projectsGrid}>
          {CONTENT.filter((project) => project.finished).map((project) => (
            <Project key={project.title} proj={project} />
          ))}
        </div>

        <h2>upcoming projects</h2>
        <div className={styles.projectsGrid}>
          {CONTENT.filter((project) => !project.finished).map((project) => (
            <Project key={project.title} proj={project} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "projects",
    },
  };
}
