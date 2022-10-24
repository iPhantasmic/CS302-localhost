import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: Record<string, any> | StyleFunctionProps) => ({
    body: {
      bg: mode("#FFFFFF", "#040505")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  textStyles: {
    faded: {
      fontSize: "6rem",
      color: "#797979",
      fontFamily: "var(--chakra-fonts-body)",
      fontWeight: "700",
      letterSpacing: -1,
      lineHeight: "100%",
      textAlign: "left",
    },
  },
  colors: {
    blue: {
      50: "#dee7fc",
    },
  },
  config,
  styles,
});

export default theme;
