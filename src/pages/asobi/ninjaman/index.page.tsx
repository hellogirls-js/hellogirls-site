import { useState } from "react";
import Head from "next/head";

import styles from "../styles/Ninjaman.module.scss";

import NinjamanHome from "./components/NinjamanHome";
import NinjamanInstructions from "./components/NinjamanInstructions";
import NinjamanGame from "./components/NinjamanGame";

import AsobiLayout from "component/ASOBILayout";

export default function Ninjaman() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  return (
    <AsobiLayout title="Ninjaman">
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6411495121447387"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className={styles.ninjamanContainer}>
        {currentPage === "home" && (
          <NinjamanHome setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "instructions" && (
          <NinjamanInstructions setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "game" && <NinjamanGame />}
      </div>
    </AsobiLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "Ninjaman | ASOBI!",
    },
  };
}
