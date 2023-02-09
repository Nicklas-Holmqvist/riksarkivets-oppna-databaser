import React from 'react';
import styled from 'styled-components';

import { NavLinksProps } from './Nav';
import NavLink from './NavLink';

interface DesktopNavigationProps {
  navLinks: NavLinksProps[];
  path: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navLinks,
  path,
}) => {
  return (
    <StyledNav>
      {navLinks.map((navLink, index) => (
        <NavLink
          key={index}
          text={navLink.text}
          href={navLink.href}
          active={path === navLink.href}
        />
      ))}
    </StyledNav>
  );
};

export default DesktopNavigation;

const StyledNav = styled.nav`
  display: flex;
  height: 3.5rem;
  padding-top: 1.2rem;
  margin-bottom: 0.5rem;
  a {
    margin-right: 1.5rem;
  }
  @media (max-width: 1240px) {
    padding-left: 1rem;
  }
  @media (max-width: 800px) {
    height: 0px;
    padding: 0;
    margin: 0;
  }
`;
