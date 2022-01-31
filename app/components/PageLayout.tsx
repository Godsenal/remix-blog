import { Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const PageLayout = ({ children }: PropsWithChildren<unknown>) => {
  return <Container mt={10}>{children}</Container>;
};

export default PageLayout;
