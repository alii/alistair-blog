import { Layout } from "../../Layout";
import { Post } from "../../lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import Link from "next/link";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import { CoverImage } from "../../components/cover-image";
import { AuthorDisplay } from "../../components/author-display";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight as light } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ReactNode } from "react";
import Head from "next/head";

type SlugProps = { post: Post };

export default function Slug({ post }: SlugProps) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="twitter:site" content="@alii" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:creator" content={"@alii"} />
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
        <meta property="og:type" content="website" />
      </Head>
      <Link href={"/"}>
        <a className={"font-bold text-4xl hover:underline"}>Blog.</a>
      </Link>
      <div className={"mt-20"}>
        <h1
          className={
            "text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12"
          }
        >
          {post.title}
        </h1>

        <div className={"mb-5"}>
          <AuthorDisplay author={post.author} />
        </div>

        <CoverImage title={post.title} src={post.cover} />
        <div className={"mt-10 max-w-2xl mx-auto"}>
          <Markdown options={options}>{post.content}</Markdown>
        </div>
      </div>
    </Layout>
  );
}

const options: MarkdownToJSX.Options = {
  overrides: {
    h1: {
      props: { className: "mb-5 text-5xl font-bold mt-10" },
    },
    h2: {
      props: { className: "mb-3 text-4xl font-bold mt-6" },
    },
    h3: {
      props: { className: "mb-1 text-3xl font-semibold mt-4" },
    },
    h4: {
      props: { className: "mb-0.5 text-2xl mt-3" },
    },
    h5: {
      props: { className: "mb-0.5 text-xl text-gray-700 mt-1" },
    },
    h6: {
      props: { className: "mb-0.5 text-gray-500 mt-1" },
    },
    p: {
      props: { className: "leading-7 mb-5" },
    },
    img: {
      props: { className: "w-100 rounded-2xl" },
    },
    a: {
      props: { className: "underline hover:text-blue-500" },
    },
    ol: {
      props: { className: "list-decimal" },
    },
    ul: {
      props: { className: "list-disc" },
    },
    code: {
      component: (props: {
        children: ReactNode;
        language?: string;
        style: Record<string, string>;
        className?: string;
      }) => {
        if (!props.className)
          return (
            <code
              className={
                "text-md px-2 py-0.5 bg-gray-100 rounded-md text-gray-500"
              }
            >
              {props.children}
            </code>
          );
        return (
          <SyntaxHighlighter
            language={(props.language ?? "lang-typescript").replace(
              "lang-",
              ""
            )}
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
