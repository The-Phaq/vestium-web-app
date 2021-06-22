import { Provider } from "react-redux";
import { store } from "../store";
import GlobalStyles from "./globalStyles";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
