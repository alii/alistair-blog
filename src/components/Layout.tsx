import { Fragment, PropsWithChildren } from "react";
import { Banner } from "./banner";
import { Footer } from "./footer";

export function Layout(props: PropsWithChildren<{}>) {
  return (
    <Fragment>
      <Banner />
      <div className="container mx-auto px-5">{props.children}</div>
      <Footer />
    </Fragment>
  );
}
