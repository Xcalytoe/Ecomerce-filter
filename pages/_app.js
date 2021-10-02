import '../styles/globals.css'
import "../styles/sass/bejamas.scss";
import "../styles/tailwind_animation.css";
import { GlobalProvider } from '../components/context/Provider';


function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

export default MyApp
