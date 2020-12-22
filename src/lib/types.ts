export interface Post {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    twitter: string;
  };
  date: Date | string;
  content: string;
  slug: string;
  cover: string;
  tags: string;
}
