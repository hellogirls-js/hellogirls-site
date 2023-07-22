import { useContext } from "react";
import useSWR from "swr";
import Link from "next/link";
import dayjs from "dayjs";

import styles from "./styles/Posts.module.scss";

import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";

export const runtime = "experimental-edge";

export default function Posts(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: posts } = useSWR("/api/readposts", fetcher);

  function Post({ post }: { post: PostMeta }) {
    return (
      <div className={styles.post}>
        <h3 className={styles.postTitle}>
          <Link href={`/post/${post.urlName}`}>{post.title}</Link>
        </h3>
        <div className={styles.postStats}>
          <div className={styles.postAuthor}>
            written by{" "}
            <Link href={post.url} target="_blank">
              {post.author}
            </Link>
          </div>
          {post.dateCreated && post.dateUpdated && (
            <div className={styles.postDates}>
              | {dayjs(post.dateCreated).format("MM/DD/YYYY h:mma")}, last
              updated: {dayjs(post.dateUpdated).format("MM/DD/YYYY h:mma")}
            </div>
          )}
        </div>
        <blockquote className={styles.postDesc}>{post.description}</blockquote>
      </div>
    );
  }

  return (
    <MainLayout heading="posts">
      <div className={`${styles.posts} ${styles[colorTheme]}`}>
        <h2>posts</h2>
        {posts &&
          posts
            .sort((a: any, b: any) => b.id - a.id)
            .map((post: PostMeta) => <Post key={post.id} post={post} />)}
        {!posts && <div>Loading...</div>}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      title: "posts",
    },
  };
}
