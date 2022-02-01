import {
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import { PropsWithChildren } from "react";
import { Center, ChakraProvider, Heading, Stack } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { getUser } from "~/utils/auth.server";
import ChakraLink from "~/components/ChakraLink";
import theme from "~/theme";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  return user;
};

export const meta: MetaFunction = () => {
  return { title: "Remix blog" };
};

const Document = ({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Document title={caught.statusText}>
      <Center h="100vh">
        <Stack textAlign="center" spacing={5}>
          <Heading size="3xl">
            {caught.status} {caught.statusText}
          </Heading>
          <ChakraLink reloadDocument={true} to="/" color="blue.400">
            홈으로 이동
          </ChakraLink>
        </Stack>
      </Center>
    </Document>
  );
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.error(error);

  return (
    <Document title="Error">
      <Center h="100vh">
        <Stack textAlign="center" spacing={5}>
          <Heading size="3xl">{error.message || "알 수 없는 오류"}</Heading>
          <ChakraLink reloadDocument={true} to="/" color="blue.400">
            홈으로 이동
          </ChakraLink>
        </Stack>
      </Center>
    </Document>
  );
};

export default function App() {
  const user = useLoaderData<User>();

  return (
    <Document>
      <Outlet context={{ user }} />
    </Document>
  );
}
