import Head from 'next/head';
import { Provider } from "react-redux";
import { ThemeProvider } from 'styled-components';
import theme from 'theme/main.json';
import { store } from "../store";
import GlobalStyles from "./globalStyles";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Vestium</title>
        <meta name="description" content="Vestium web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default MyApp;
