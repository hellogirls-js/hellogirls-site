import { useContext } from "react";
import useSWR from "swr";
import Image from "next/image";

import styles from "./styles/Cat.module.scss";

import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";

export default function Cat() {
  const { colorTheme } = useContext(DarkModeContext);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: pics } = useSWR("/api/readfiles", fetcher);

  function PictureFrame({ src }: { src: string }) {
    return (
      <div className={styles.picture}>
        <Image src={src} alt={"moo moo"} width={300} height={300} />
      </div>
    );
  }

  return (
    <MainLayout heading="moo moo! :3">
      <div className={`${styles.cat} ${styles[colorTheme]}`}>
        <h2>moo moo!</h2>
        <p>
          i adopted moo moo on november 24th, 2020. she is currently 4 years
          old, although many people have claimed she still looks like a kitten!
          i love moo moo very much and she&apos;s basically my baby, so i take
          lots of pictures of her.
        </p>
        {!pics && <div className={styles.loading}>Loading...</div>}
        {pics && (
          <div className={styles.gallery}>
            {pics.map((path: string) => (
              <PictureFrame key={path} src={path} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "moo moo",
    },
  };
}
