import { Layout } from "../../components/Layout";
import { Post } from "../../lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import Link from "next/link";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import { CoverImage } from "../../components/cover-image";
import { AuthorDisplay } from "../../components/author-display";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight as light } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React, { ReactNode } from "react";
import Head from "next/head";
import { useReadingTime } from "../../lib/hooks";
import { DisqusComments } from "../../components/disqus";

type SlugProps = { post: Post };

export default function Slug({ post }: SlugProps) {
  const time = useReadingTime(post.content);

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="twitter:site" content={"@" + post.author.twitter} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:creator" content={"@" + post.author.twitter} />
        <meta
          name="twitter:image"
          content={`https://blog.alistair.cloud${post.cover}`}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:author" content={post.author.name} />
        <meta
          property="og:url"
          content={`https://blog.alistair.cloud/post/${post.slug}`}
        />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:image"
          content={`https://blog.alistair.cloud${post.cover}`}
        />
        <meta name="keywords" content={post.tags} />
        <meta property="og:type" content="website" />
      </Head>
      <Link href="/">
        <a className="font-bold text-4xl hover:underline">
          Blog<span className="text-gray-400">.</span>
        </a>
      </Link>
      <div className="mt-20">
        <div className="pb-3 flex">
          <a
            href={`https://twitter.com/intent/tweet?text=${post.title} by @${post.author.twitter} – https://blog.alistair.cloud/post/${post.slug}`}
            target="_blank"
            className="py-2 px-5 bg-blue-50 text-blue-600 inline-block transition-colors hover:bg-blue-100"
          >
            Share
          </a>
          <p className="py-2 px-5 bg-gray-50 text-gray-600">
            {time} minute read
          </p>
        </div>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-5">
          {post.title}
        </h1>

        <div className="mb-5">
          <AuthorDisplay showTwitter author={post.author} date={post.date} />
        </div>

        <CoverImage title={post.title} src={post.cover} />
        <div className="mt-10 max-w-2xl mx-auto">
          <Markdown options={options}>{post.content}</Markdown>
        </div>
        <div className="mt-5 max-w-2xl mx-auto">
          <DisqusComments post={post} />
        </div>
      </div>
    </Layout>
  );
}

const options: MarkdownToJSX.Options = {
  overrides: {
    h1: {
      props: { className: "mb-5 text-5xl font-bold mt-14" },
    },
    h2: {
      props: { className: "mb-2 text-4xl font-bold mt-10" },
    },
    h3: {
      props: { className: "mb-2 text-3xl font-normal mt-8 text-gray-700" },
    },
    h4: {
      props: { className: "mb-1 text-2xl mt-8" },
    },
    h5: {
      props: { className: "mb-1 text-xl text-gray-700 mt-6" },
    },
    h6: {
      props: { className: "mb-0.5 text-gray-500 mt-6" },
    },
    p: {
      props: { className: "leading-7 my-4 text-gray-600" },
    },
    img: {
      props: { className: "w-100" },
    },
    a: {
      props: { className: "underline hover:text-blue-500 hover:no-underline" },
    },
    ol: {
      props: { className: "list-decimal" },
    },
    ul: {
      props: { className: "list-disc" },
    },
    li: {
      props: { className: "mt-1" },
    },
    code: {
      component: (props: {
        children: ReactNode;
        language?: string;
        style: Record<string, string>;
        className?: string;
      }) => {
        if (!props.className) {
          return (
            <code className="text-md px-2 py-0.5 bg-gray-100 text-gray-500">
              {props.children}
            </code>
          );
        }
        return (
          <SyntaxHighlighter
            language={props.className.replace("lang-", "")}
            style={light}
          >
            {props.children}
          </SyntaxHighlighter>
        );
      },
    },
    hr: {
      props: {
        className: "mt-5 border-none border-gray-200 border-top-4",
      },
    },
  },
};

export const getStaticProps: GetStaticProps<SlugProps> = async (ctx) => {
  return {
    props: {
      post: getPostBySlug(ctx.params!.slug as string, [
        "title",
        "excerpt",
        "author",
        "content",
        "cover",
        "slug",
        "tags",
      ]),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async function () {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return { params: { slug: post.slug } };
    }),
    fallback: "blocking",
  };
};
