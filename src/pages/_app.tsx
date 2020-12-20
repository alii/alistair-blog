import NProgress from "nprogress";
import { AppProps } from "next/app";

import "tailwindcss/tailwind.css";
import "nprogress/nprogress.css";
import "../index.css";

import Router from "next/router";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
