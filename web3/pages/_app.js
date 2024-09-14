import Head from 'next/head';
import '../styles/globals.css';

const ViemApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>ETHERLOCK</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/etherlock.ico" />
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default ViemApp;
