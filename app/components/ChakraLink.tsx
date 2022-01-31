import {
  Link as LinkComponent,
  LinkProps as LinkComponentProps,
} from "@chakra-ui/react";
import { Link, LinkProps } from "@remix-run/react";

type TProps = LinkProps & LinkComponentProps;

const ChakraLink = (props: TProps) => {
  return <LinkComponent as={Link} {...props} />;
};

export default ChakraLink;
