import Link from "next/link";

import styles from "./styles/Projects.module.scss";

import MainLayout from "component/MainLayout";
import Alert from "component/utility/Alert";

export default function Projects() {
  return (
    <MainLayout heading="projects">
      <Alert>this page is a work in progress!</Alert>
      <div className={styles.projectGroup}>
        <h2>
          <Link href="/projects/lucky-birthday">lucky birthday ranking</Link>
        </h2>
      </div>
    </MainLayout>
  );
}
