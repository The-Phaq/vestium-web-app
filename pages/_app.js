import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import theme from 'theme/main.json';
import { wrapper } from "../store";
import GlobalStyles from "./globalStyles";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Vestium</title>
        <meta name="description" content="Vestium web" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Livvic&display=optional"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
