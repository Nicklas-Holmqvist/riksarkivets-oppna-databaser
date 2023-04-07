import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import Header from './Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
};
