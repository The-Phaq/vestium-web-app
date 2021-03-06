import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import theme from 'theme/main.json';
import { initFirebase } from 'api/firebase';
import { appWithTranslation } from 'i18n';
import { wrapper } from "../store";
import GlobalStyles from "./globalStyles";

initFirebase();

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Vestium</title>
        <meta name="description" content="Vestium web" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Rubik"
          rel="stylesheet"
          label="fonts"
          />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(appWithTranslation(MyApp));
