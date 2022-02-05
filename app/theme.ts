import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  semanticTokens: {
    colors: {
      error: "#0070f3",
      success: "#0070f3",
    },
  },
  styles: {
    global: {
      "html, body": {
        color: "gray.800",
        lineHeight: "tall",
        fontSize: "1.05rem",
      },
    },
  },
  textStyles: {
    caption: {
      fontSize: "0.9rem",
    },
  },
  components: {
    Link: {
      variants: {
        menu: {
          color: "gray.600",
          _hover: {
            color: "gray.900",
            textDecoration: "none",
          },
        },
        link: {
          color: "success",
        },
      },
      defaultProps: {
        variant: "link",
      },
    },
  },
});

export default theme;
