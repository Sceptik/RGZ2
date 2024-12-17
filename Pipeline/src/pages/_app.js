import "@/styles/globals.css";
import "@/styles/Header/Header.module.css"
import { wrapper } from '../../store';

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

export default wrapper.withRedux(MyApp);
