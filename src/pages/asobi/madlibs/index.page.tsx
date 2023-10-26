import Image from "next/image";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

import styles from "../styles/MadLibs.module.scss";

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
  const AsobiSora1 = (
    <Image
      src="https://assets.hellogirls.info/asobi/madlibs/asobi_sora_1.png"
      width={329}
      height={564}
      alt="sora"
    />
  );
  const AsobiSora2 = (
    <Image
      src="https://assets.hellogirls.info/asobi/madlibs/asobi_sora_2.png"
      width={329}
      height={564}
      alt="sora"
    />
  );
  const AsobiSora3 = (
    <Image
      src="https://assets.hellogirls.info/asobi/madlibs/asobi_sora_3.png"
      width={329}
      height={564}
      alt="sora"
    />
  );
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
          {soraImg}
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
