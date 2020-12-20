import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "../Layout";
import { GetStaticProps } from "next";
import { Post } from "../lib/types";
import { getAllPosts } from "../lib/api";
import { CoverImage } from "../components/cover-image";
import day from "dayjs";
import { AuthorDisplay } from "../components/author-display";

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
      <div className={"flex items-center mt-20 mb-10"}>
        <h1 className={"text-8xl flex-1 font-bold mr-10"}>Blog.</h1>
        <p className={"text-right text-lg"}>
          My thoughts, programming and somewhat lyrical genius
        </p>
      </div>
      <CoverImage title={first.title} src={first.cover} slug={first.slug} />
      <div className={"flex flex-col md:flex-row mt-10"}>
        <div className={"flex-1 md:mr-5"}>
          <Link href={`/post/${first.slug}`}>
            <h1 className={"text-5xl hover:underline cursor-pointer pb-10"}>
              {first.title}
            </h1>
          </Link>
          <h2 className={"text-xl"}>
            {day(first.date).format("MMMM DD, YYYY")}
          </h2>
        </div>
        <div className={"flex-1 flex flex-col"}>
          <p className={"text-lg"}>{first.excerpt}</p>
          <AuthorDisplay author={first.author} />
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
  };
};
