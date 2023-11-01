import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { IconBrandTumblr, IconBrandTwitter, IconX } from "@tabler/icons-react";
import { Oval } from "react-loader-spinner";

import styles from "./ShareImageModal.module.scss";

import { DarkModeContext } from "context/DarkModeContext";

async function getImage(url: string) {
  const image = await fetch(url)
    .then((res) => res)
    .catch((err) => console.error(err));

  console.log(image);

  return image;
}

export default function ShareImageModal({
  title,
  url,
  postImgUrl,
  postBody,
  postTag,
  setClose,
}: {
  title: string;
  url: string;
  postImgUrl: string;
  postBody: string;
  postTag: string;
  setClose: Dispatch<SetStateAction<boolean>>;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  const [loaded, setLoaded] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const image = getImage(postImgUrl);
  console.log(image);

  // FIXME: insert image properly
  return (
    <motion.div
      className={`${styles.modalContainer} ${styles[colorTheme]}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
    >
      <motion.div className={styles.modalBody}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <div className={styles.modalClose} onClick={() => setClose(true)}>
            <IconX />
          </div>
        </div>
        <div className={styles.modalShareImg}>
          {!loaded && <Oval />}
          <img
            ref={imageRef}
            src={postImgUrl}
            width={800}
            height={400}
            alt="post image"
            onLoad={() => setLoaded(true)}
            style={{
              display: loaded ? "block" : "none",
              borderRadius: 10,
              margin: "auto",
            }}
          />
          <div className={styles.modalShareButtonsContainer}>
            <a
              className={styles.modalShareButton}
              href={`https://twitter.com/intent/tweet?text=${postBody.replace(
                " ",
                "%20",
              )}%20?hashtag=${postTag}?url=${url}`}
              target="_blank"
              style={{ display: !loaded ? "none" : "block" }}
            >
              <IconBrandTwitter /> share to twitter
            </a>
            <a
              className={styles.modalShareButton}
              style={{ display: !loaded ? "none" : "block" }}
            >
              <IconBrandTumblr /> share to tumblr
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
