import { theme, DefaultTheme } from "@chakra-ui/core";

const breakpoints: any = [`576px`, `768px`, `992px`, `1200px`];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const customTheme: DefaultTheme = {
    ...theme,
    breakpoints,
    fonts: {
        body: "Roboto, system-ui, sans-serif",
        heading: "Roboto, system-ui, sans-serif",
        mono: "Menlo, monospace",
    },
    fontWeights: {
        ...theme.fontWeights,
        normal: 400,
        medium: 600,
        bold: 700,
    },
    radii: {
        ...theme.radii,
        sm: "5px",
        md: "8px",
    },
    fontSizes: {
        ...theme.fontSizes,
        "6xl": "54px",
    },
    colors: {
        ...theme.colors,
        purple: {
            ...theme.colors.purple,
            500: "#8257e5",
        },
        blue: {
            ...theme.colors.blue,
            500: "#0f3057",
            400: "#00587a",
            300: "#008891",
        },
        gray: {
            ...theme.colors.gray,
            300: "#e1e1e6",
            500: "#e7e7de",
            600: "#29292e",
            700: "#202024",
            800: "#121214",
        },
    },
};

export default customTheme;
