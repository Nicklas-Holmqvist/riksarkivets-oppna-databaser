import { createGlobalStyle } from 'styled-components';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Open_Sans, Enriqueta } from '@next/font/google';

import { Layout } from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';

const openSans = Open_Sans({
  weight: '400',
  subsets: ['latin'],
});

const enriqueta = Enriqueta({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <GlobalStyles />
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </>
  );
}

const GlobalStyles = createGlobalStyle`
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;  
  font-family: ${openSans.style.fontFamily}, sans-serif;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

:root {
  --color-white:#FEFEFE;
  --color-black:#252525;
  --color-blue:#0D5C91;
  --color-gold:#E8A621;
  --color-grey:#808080;
  --color-light-grey:#D3D3D3;
  --color-skeleton:#E1E1E1;
  --bg-color:#F5F5F5;
}

#__next {
  height: 100%;
}

html, body {
  height: 100%;
  background-color: var(--bg-color);
}
main {
  min-height: 100%;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

header {
  border-bottom: 3px solid var(--color-blue);
}

h1 {
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem 0;
  font-family: ${enriqueta.style.fontFamily}, sans-serif;
  color: var(--color-black);
}

h2 {
  font-family: ${enriqueta.style.fontFamily}, sans-serif;
  color: var(--color-black);
}

h3 {
  font-size: 1rem;
  font-weight: normal;
  padding: 0.2rem 0;
  letter-spacing: 0.7px;
  color: var(--color-black);
}

p {
  letter-spacing: 0.6px;
  line-height: 120%;
  color: var(--color-black);
}

a {
  text-decoration: none;
  color: var(--color-black);
}

hr {
  background: var(--color-light-grey);
  height: 1px;
  margin: 1rem 0.5rem;
  border: none;
}
`;
