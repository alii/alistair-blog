import React from "react";
import { Post } from "../lib/types";
import { CoverImage } from "./cover-image";
import Link from "next/link";
import day from "dayjs";
import { AuthorDisplay, DATE_FORMAT } from "./author-display";

type PostDisplayProps = {
  post: Partial<
    Omit<Post, "content"> & { content?: Post["content"]; slug: Post["slug"] }
  >;
  large?: boolean;
};

export function PostDisplay({ post, large = false }: PostDisplayProps) {
  return (
    <div>
      {post.title && post.cover && (
        <CoverImage title={post.title} src={post.cover} slug={post.slug} />
      )}
      <div
        className={`flex flex-col ${
          large ? "md:flex-row" : "md:flex-col"
        } mt-10`}
      >
        <div className="flex-1 md:mr-5">
          <Link href={`/post/${post.slug}`}>
            <h1 className="text-5xl hover:underline cursor-pointer pb-10">
              {post.title}
            </h1>
          </Link>
          {post.date && (
            <h2 className="text-xl">{day(post.date).format(DATE_FORMAT)}</h2>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          {post.excerpt && <p className="text-lg">{post.excerpt}</p>}
          {post.author && <AuthorDisplay author={post.author} />}
        </div>
      </div>
    </div>
  );
}
