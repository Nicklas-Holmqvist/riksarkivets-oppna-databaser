import { Layout } from '../components/Layout';
import { createGlobalStyle } from 'styled-components';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

const GlobalStyles = createGlobalStyle`
html,body {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  background-color: #F5F5F5;
}
main, footer, nav {
  max-width: 1200px;
  width: 100%;
  margin: auto;
}

header {
  border-bottom: 3px solid #0D5C91;
}

h1 {
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem 0;
}`;
