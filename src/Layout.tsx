import { Fragment, PropsWithChildren } from "react";
import { Banner } from "./components/banner";
import { Footer } from "./components/footer";

export function Layout(props: PropsWithChildren<{}>) {
  return (
    <Fragment>
      <Banner />
      <div className="container mx-auto px-5">{props.children}</div>
      <Footer />
    </Fragment>
  );
}
