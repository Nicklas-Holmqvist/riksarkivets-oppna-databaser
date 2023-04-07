import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import React, { useState } from 'react';

import MobileNavigation from './mobile/MobileNavigation';
import DesktopNavigation from './desktop/DesktopNavigation';

interface NavProps {}

export interface NavLinksProps {
  text: string;
  href: string;
  path: string;
}

const navLinks: NavLinksProps[] = [
  { text: 'Start', href: '/', path: '/' },
  {
    text: 'Kurhuset i Östersund',
    href: '/kurhuset-i-ostersund?page=1&search=',
    path: '/kurhuset-i-ostersund',
  },
];

const Nav: React.FC<NavProps> = () => {
  const [drawer, setDrawer] = useState<boolean>(false);

  const path = useRouter();

  const mobileView = useMediaQuery({
    query: '(max-width: 800px)',
  });

  return (
    <Navigation>
      <Container>
        {!mobileView ? (
          <DesktopNavigation navLinks={navLinks} path={path.route} />
        ) : (
          <MobileNavigation
            navLinks={navLinks}
            path={path.route}
            drawer={drawer}
            setDrawer={() => setDrawer(!drawer)}
          />
        )}
      </Container>
    </Navigation>
  );
};

export default Nav;

const Navigation = styled.nav`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  height: 3.5rem;
  padding-top: 1.2rem;
  margin-bottom: 0.5rem;
  @media (max-width: 1240px) {
    padding-left: 0.5rem;
  }
  @media (max-width: 800px) {
    height: 0px;
    padding: 0;
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
