
/* fontawesome https://docs.fontawesome.com/web/use-with/react/use-with#nextjs */
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

/* google fonts https://nextjs.org/docs/app/getting-started/fonts#google-fonts */
import { Open_Sans } from 'next/font/google'
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400','700'],
})

import { Encode_Sans } from 'next/font/google'
const encodeSans = Encode_Sans({
  subsets: ['latin'],
})

import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* semantic-ui https://react.semantic-ui.com/usage/ */
import 'semantic-ui-css/semantic.min.css'

/* global */
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Hide header on the main page
  const hideHeader = router.pathname === '/';
  

  return (
    <main className={encodeSans.className}>
      {!hideHeader && <Header />}
      <Component {...pageProps} />
      <Footer />
    </main>
  )
}