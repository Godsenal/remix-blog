import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        color: "gray.800",
        lineHeight: "tall",
        fontSize: "1.125rem",
      },
    },
  },
  textStyles: {
    caption: {
      fontSize: "0.9rem",
    },
  },
});

export default theme;
