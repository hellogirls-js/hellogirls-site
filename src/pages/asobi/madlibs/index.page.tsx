import Image from "next/image";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Head from "next/head";

import styles from "../styles/MadLibs.module.scss";
import AsobiSora1 from "../../../../assets/asobi_sora_1.png";
import AsobiSora2 from "../../../../assets/asobi_sora_2.png";
import AsobiSora3 from "../../../../assets/asobi_sora_3.png";

import MadLibsHome from "./components/MadLibsHome";
import MadLibsInstructions from "./components/MadLibsInstructions";
import MadLibsGame from "./components/MadLibsGame";
import MadLibsResult from "./components/MadLibsResult";

import AsobiLayout from "component/ASOBILayout";

function MadLibsLoading() {
  return (
    <div className={styles.madlibsContentBlock}>
      <div className={styles.madlibsMainContent}>
        <ColorRing
          visible={true}
          height="200"
          width="200"
          ariaLabel="blocks-loading"
          wrapperStyle={{ margin: "auto" }}
          wrapperClass="blocks-wrapper"
          colors={["#ccb100", "#00a1e9", "#d4c600", "#284b97", "#ba2636"]}
        />
        <h3>Loading...</h3>
      </div>
    </div>
  );
}

export default function MadLibs() {
  const [soraImg, setSoraImg] = useState(AsobiSora1);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [story, setStory] = useState<string | null>(null);
  const [storyError, setStoryError] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    if (currentPage === "instructions") setSoraImg(AsobiSora2);
    if (currentPage === "home" || currentPage === "game")
      setSoraImg(AsobiSora1);
    if (currentPage === "result") setSoraImg(AsobiSora3);
  }, [currentPage]);

  useEffect(() => {
    if (result) {
      setCurrentPage("result");
    }
  }, [result]);

  return (
    <AsobiLayout title="Mad Libs">
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6411495121447387"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className={styles.madlibsContainer}>
        {currentPage === "home" && (
          <MadLibsHome
            setCurrentPage={setCurrentPage}
            setStory={setStory}
            setStoryError={setStoryError}
          />
        )}
        {currentPage === "instructions" && (
          <MadLibsInstructions setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "loading" && <MadLibsLoading />}
        {currentPage === "game" && story && !storyError && (
          <MadLibsGame story={story} setResult={setResult} />
        )}
        {currentPage === "result" && result && story && (
          <MadLibsResult
            result={result}
            story={story}
            setStory={setStory}
            setResult={setResult}
            setCurrentPage={setCurrentPage}
            setStoryError={setStoryError}
          />
        )}
        <div
          className={styles.madlibsSora}
          style={{
            marginBottom:
              currentPage === "result" || currentPage === "instructions"
                ? "1vh"
                : "20vh",
          }}
        >
          <Image
            src={soraImg.src}
            alt="sora"
            width={soraImg.width}
            height={soraImg.height}
          />
        </div>
      </div>
    </AsobiLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "Mad Libs | ASOBI!",
    },
  };
}
