import {
  Container,
  Box,
  HStack,
  Heading,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Form, useOutletContext } from "remix";
import { TOutletContext } from "~/types/context";
import ChakraLink from "./ChakraLink";

type TProps = {
  withHeader?: boolean;
};

const PageLayout = ({
  children,
  withHeader = true,
}: PropsWithChildren<TProps>) => {
  const { user } = useOutletContext<TOutletContext>();

  return (
    <>
      {withHeader && (
        <Box
          as="header"
          position="fixed"
          top={0}
          left={0}
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.100"
          w="full"
          zIndex="sticky"
        >
          <HStack h="60px" px={6}>
            <Box>
              <ChakraLink to="/">
                <Heading size="md">이게 블로그?</Heading>
              </ChakraLink>
            </Box>
            <Spacer />
            <HStack>
              {user ? (
                <>
                  <ChakraLink to="/posts/new">새 글 작성</ChakraLink>
                  <Box>{user.name}</Box>
                  <Form action="/logout" method="post">
                    <Button type="submit">로그아웃</Button>
                  </Form>
                </>
              ) : (
                <>
                  <ChakraLink to="/login">로그인</ChakraLink>
                  <ChakraLink to="/register">회원가입</ChakraLink>
                </>
              )}
            </HStack>
          </HStack>
        </Box>
      )}
      <Container mt="60px" py={10} maxW="container.md">
        {children}
      </Container>
    </>
  );
};

export default PageLayout;
