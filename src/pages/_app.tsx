import { StoreProvider } from "../redux";
import store from "../store/storeInstance";

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider value={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
