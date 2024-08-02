import { useQuery } from "@tanstack/react-query";

import styles from "../styles/FanQuiz.module.scss";

import { QuizHeader } from "./index.page";
import OverallResults from "./OverallResults";

import { createClient } from "utils/supabase/client";

const supabase = createClient();

export default function EnstarsFanQuizOverall() {
  const {
    data: overallResultsData,
    isPending: areOverallResultsPending,
    error: overallResultsError,
  } = useQuery({
    queryKey: ["getOverallResults"],
    queryFn: async () => {
      const response = await supabase.from("purrsonality_results").select();
      return response.data;
    },
  });

  return (
    <main className={styles.page}>
      <div className={styles.container} style={{ marginBottom: "2em" }}>
        <QuizHeader title="Curious about the community's resultS...?" />
        {overallResultsData && (
          <OverallResults overallResults={overallResultsData} />
        )}
        {areOverallResultsPending && <div>loading...</div>}
        {overallResultsError && <div>could not load results :(</div>}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "overall results | what kind of enstars fan are you?",
    },
  };
}
