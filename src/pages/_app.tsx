import Store from '../hooks';
import '../styles/globals.css'
import { ActorProvider } from '../context/actor';

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <ActorProvider>
        <Component {...pageProps} />
      </ActorProvider>
    </Store>
  );
}

export default MyApp
