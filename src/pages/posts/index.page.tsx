import { useContext } from "react";
import Link from "next/link";

import styles from "./styles/Posts.module.scss";

import MainLayout from "component/MainLayout";
import { DarkModeContext } from "context/DarkModeContext";

interface PostObject {
  id: number;
  title: string;
  description: string;
}

export default function Posts(props: any) {
  const { colorTheme } = useContext(DarkModeContext);

  const POSTS: PostObject[] = [
    {
      id: 1,
      title: "testing, testing!",
      description: "a post made to test mdx. check it out!",
    },
  ];

  function Post({ post }: { post: PostObject }) {
    return (
      <div className={styles.post}>
        <h3 className={styles.postTitle}>
          <Link href={`/post/${post.id}`}>{post.title}</Link>
        </h3>
        <p className={styles.postDesc}>{post.description}</p>
      </div>
    );
  }

  return (
    <MainLayout heading="posts">
      <div className={`${styles.posts} ${styles[colorTheme]}`}>
        <h2>posts</h2>
        {POSTS.map((post) => (
          <Post key={post.id} post={post} />
        ))}
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
