import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";

import styles from "./CardCG.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

export default function CardCG({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const aspectWidth = 1560;
  const aspectHeight = 720;
  const aspectRatio = aspectWidth / aspectHeight;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const width = isMobile ? 320 : 680;

  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div className={`${styles.imgContainer} ${styles[colorTheme]}`}>
      <Image src={src} alt={alt} width={width} height={width / aspectRatio} />
      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  );
}
