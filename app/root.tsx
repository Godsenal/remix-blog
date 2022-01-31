import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import { ChakraProvider } from "@chakra-ui/react";
import { getUser } from "./utils/auth.server";
import { User } from "@prisma/client";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  return user;
};

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  const user = useLoaderData<User>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider>
          <Outlet context={{ user }} />
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
