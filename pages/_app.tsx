import { NextPage } from "next";
import { AppProps } from "next/app";
import ThemeContainer from "~/contexts/theme/ThemeContainer";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
    <ThemeContainer>
        <Component {...pageProps} />
    </ThemeContainer>
);

export default App;
