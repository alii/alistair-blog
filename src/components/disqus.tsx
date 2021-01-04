import { DiscussionEmbed } from "disqus-react";
import { Post } from "../lib/types";

export const DisqusComments = ({ post }: { post: Post }) => {
  const disqusShortname = "your-disqus-shortname";
  const disqusConfig = {
    url: `https://blog.alistair.cloud/post/${post.slug}`,
    identifier: post.slug,
    title: post.title,
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
