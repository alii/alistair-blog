import React from "react";
import Head from "next/head";
import { Layout } from "../components/Layout";
import { GetStaticProps } from "next";
import { Post } from "../lib/types";
import { getAllPosts } from "../lib/api";
import { PostDisplay } from "../components/post-display";

const fields = ["slug", "excerpt", "author", "date", "title", "cover"] as const;

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

type IndexProps = {
  posts: Pick<Post, typeof fields[number]>[];
};

export default function Index({ posts }: IndexProps) {
  const [first, ...remaining] = posts;

  return (
    <Layout>
      <Head>
        <title>Alistair Smith • Blog</title>
      </Head>
      <div className="flex items-center mt-20 mb-10">
        <h1 className="text-8xl flex-1 font-bold mr-10">Blog.</h1>
        <p className="text-right text-lg">
          My thoughts, programming and somewhat lyrical genius
        </p>
      </div>
      <PostDisplay post={first} large={true} />
      <div className="mt-20">
        <h1 className="text-7xl font-bold py-10">More reads</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {remaining.map((post) => (
            <PostDisplay post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<IndexProps> = async function () {
  return {
    props: {
      posts: getAllPosts(fields as Writeable<typeof fields>),
    },
    revalidate: 120,
  };
};
