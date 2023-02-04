import Link from "next/link";
import dayjs from "dayjs";

import styles from "../MDXLayout.module.scss";

export default function PostInfo({ meta }: { meta: PostMeta }) {
  return (
    <div className={styles.postInfo}>
      <span>
        written by: <Link href={meta.url}>{meta.author}</Link>
      </span>
      {meta.dateCreated && dayjs(meta.dateCreated).format("MM/DD/YYYY h:mma")}
      {meta.dateCreated &&
        meta.dateUpdated &&
        meta.dateCreated !== meta.dateUpdated && (
          <span>
            last updated: {dayjs(meta.dateUpdated).format("MM/DD/YYYY h:mma")}
          </span>
        )}
    </div>
  );
}
