import AsobiLayout from "component/ASOBILayout";

export default function Asobi() {
  return (
    <AsobiLayout title="Welcome!">
      <div
        style={{
          width: "min(100%, 810px)",
          margin: "auto",
          boxSizing: "border-box",
          padding: "2%",
        }}
      >
        <a href="/asobi/madlibs">
          <h3>Mad Libs!</h3>
        </a>
        <a href="/asobi/ninjaman">
          <h3>Ninjaman!</h3>
        </a>
      </div>
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
