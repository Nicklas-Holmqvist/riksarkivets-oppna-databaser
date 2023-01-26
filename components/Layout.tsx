import React from 'react';

import Header from './Header';
import Nav from './Nav';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Nav />
      <main>{children}</main>
      <footer></footer>
    </>
  );
};
