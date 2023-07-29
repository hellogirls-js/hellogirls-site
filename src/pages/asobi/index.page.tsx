import AsobiLayout from "component/ASOBILayout";

export default function Asobi() {
  return (
    <AsobiLayout title="Welcome!">
      <a href="/asobi/madlibs">
        <h3>Click here for Mad Libs!</h3>
      </a>
    </AsobiLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "ASOBI!",
    },
  };
}
