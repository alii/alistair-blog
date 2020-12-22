import { Post } from "../lib/types";
import Image from "next/image";
import dayjs from "dayjs";
import { TwitterIcon } from "./icons";

export const DATE_FORMAT = "MMMM DD, YYYY";

export function AuthorDisplay({
  author,
  date,
  imageSize = 50,
  showTwitter = false,
}: {
  author: Post["author"];
  date?: Post["date"];
  imageSize?: number;
  showTwitter?: boolean;
}) {
  return (
    <div className="py-5 flex flex-row items-center">
      <div>
        <Image
          src={author.avatar}
          alt={`Avatar for ${author.name}`}
          height={imageSize}
          width={imageSize}
          className="mb-10"
        />
      </div>
      <div className="ml-4">
        <h1 className="font-bold text-2xl inline-flex items-center">
          {author.name}
          {showTwitter && (
            <a href={`https://twitter.com/${author.twitter}`}>
              <TwitterIcon
                aria-label={`Twitter link for ${author.name}`}
                height={18}
                width={18}
                className="inline-block ml-2 svg fill-current text-blue-500"
                style={{ marginTop: "-3px" }}
              />
            </a>
          )}
        </h1>
        {date && (
          <p className="text-gray-600">{dayjs(date).format(DATE_FORMAT)}</p>
        )}
      </div>
    </div>
  );
}
