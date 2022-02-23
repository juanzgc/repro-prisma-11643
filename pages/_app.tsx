import '../styles/globals.css'
import '../styles/nprogress.css'

import Router from "next/router";
import nProgress from "nprogress";


import type { AppProps } from 'next/app'

import { Decimal } from "decimal.js"
import superjson from 'superjson';

superjson.registerCustom<Decimal, string>(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: v => v.toJSON(),
    deserialize: v => new Decimal(v),
  },
  'decimal.js'
);

nProgress.configure({ showSpinner: false })
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {

  return ( 
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
