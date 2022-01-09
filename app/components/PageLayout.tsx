import { PropsWithChildren } from "react";

const PageLayout = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="max-w-screen-xl mx-auto px-5 py-10">{children}</div>;
};

export default PageLayout;
