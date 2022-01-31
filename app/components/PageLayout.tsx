import { Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const PageLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <Container mt={10} maxW="container.md">
      {children}
    </Container>
  );
};

export default PageLayout;
