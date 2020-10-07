import React from "react";

import {
  ColorModeProvider,
  ThemeProvider as ChakraThemeProvider,
  CSSReset, ITheme
} from "@chakra-ui/core";

import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";

import theme from "styles/theme";

const config = (theme: ITheme) => ({
  light: {
    color: theme.colors.blue[500],
    bg: theme.colors.gray[300],
    borderColor: theme.colors.gray[200],
    placeholderColor: theme.colors.gray[500]
  },
  dark: {
    color: theme.colors.whiteAlpha[900],
    bg: theme.colors.blue[500],
    borderColor: theme.colors.whiteAlpha[300],
    placeholderColor: theme.colors.whiteAlpha[400]
  }
})


const ThemeContainer: React.FC = ({ children }) => (
  <ChakraThemeProvider theme={theme}>
    <ColorModeProvider value="light">
      <EmotionThemeProvider theme={theme}>
        <CSSReset config={config} />
        {children}
      </EmotionThemeProvider>
    </ColorModeProvider>
  </ChakraThemeProvider>
);

export default ThemeContainer;