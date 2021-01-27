import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";

const styles = {
    global: (props) => ({
        body: {
            color: mode("blue.500", "whiteAlpha.900")(props),
            bg: mode("gray.100", "#141214")(props),
        },
    }),
};

const breakpoints = createBreakpoints({
    sm: "36em",
    md: "48em",
    lg: "62em",
    xl: "75em",
});
const overrides = {
    colors: {
        purple: {
            500: "#8257e5",
        },
        blue: {
            500: "#0f3057",
            400: "#00587a",
            300: "#008891",
        },
        gray: {
            300: "#e1e1e6",
            500: "#e7e7de",
            600: "#29292e",
            700: "#202024",
            800: "#121214",
        },
    },
    fonts: {
        body: "Roboto, system-ui, sans-serif",
        heading: "Roboto, system-ui, sans-serif",
        mono: "Menlo, monospace",
    },
    breakpoints,
    styles,
};
const customTheme = extendTheme(overrides);

export default customTheme;
