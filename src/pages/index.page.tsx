import { useContext } from "react";

import Profile from "./components/Profile";
import Tech from "./components/Tech";

import styles from "@/styles/Home.module.scss";
import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";

export const runtime = "experimental-edge";

export default function Home(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <MainLayout heading="welcome!">
      <div className={styles[colorTheme]}>
        <Profile styles={styles} />
        <Tech styles={styles} />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "welcome!",
    },
  };
}
