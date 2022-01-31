import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { Link, LinkProps } from "@remix-run/react";

type TProps = LinkProps & ChakraLinkProps;

const LinkComponent = (props: TProps) => {
  return <ChakraLink as={Link} {...props} />;
};

export default LinkComponent;
