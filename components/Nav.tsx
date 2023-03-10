import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';

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
    href: '/kurhuset-i-ostersund?page=1',
    path: '/kurhuset-i-ostersund',
  },
];

const Nav: React.FC<NavProps> = () => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<boolean>(false);

  const path = useRouter();

  function changeMobileView() {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 800) setMobileView(true);
    else {
      setMobileView(false);
      setDrawer(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', changeMobileView);
  });

  useEffect(() => {
    changeMobileView();
  }, []);

  return (
    <StyledNav>
      <StyledNavContainer>
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
      </StyledNavContainer>
    </StyledNav>
  );
};

export default Nav;

const StyledNav = styled.nav`
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

const StyledNavContainer = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-between;
`;
