import { ResponsiveContainer, YAxis } from "recharts";

import styles from "../styles/Survey.module.scss";

import MainLayout from "component/MainLayout";

export default function MarriageSurveyResults() {
  return (
    <MainLayout heading="enstars marriage survey results">
      <div className={styles.page}>
        <ResponsiveContainer>
          <YAxis dataKey="character" />
        </ResponsiveContainer>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "marriage survey results",
    },
  };
}
