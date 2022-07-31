import { Provider } from "react-redux";
import store from "../store";
import "../styles/globals.css";
import { NotificationProvider } from "web3uikit";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </MoralisProvider>
    </Provider>
  );
}

export default MyApp;
