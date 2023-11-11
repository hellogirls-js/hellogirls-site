export default function SurveyPopularVote(props: any) {}

export async function getServerSideProps() {
  return {
    props: {
      title: "hall of fame | enstars popularity survey results 2023",
    },
  };
}
