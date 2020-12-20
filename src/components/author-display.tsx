import { Post } from "../lib/types";
import Image from "next/image";

export function AuthorDisplay({ author }: { author: Post["author"] }) {
  return (
    <div className={"py-5 flex items-center"}>
      <Image
        src={author.avatar}
        alt={`Avatar for ${author.name}`}
        height={50}
        width={50}
        className={"mb-10 rounded-md"}
      />
      <h1 className={"font-bold text-2xl ml-4"}>{author.name}</h1>
    </div>
  );
}
