export interface Post {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: Date | string;
  content: string;
  slug: string;
  cover: string;
}
