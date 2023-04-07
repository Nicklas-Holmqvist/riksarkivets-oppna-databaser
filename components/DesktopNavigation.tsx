import React from 'react';

import { NavLinksProps } from './Nav';
import NavLink, { StyledLink } from './NavLink';
import styled from 'styled-components';

interface DesktopNavigationProps {
  navLinks: NavLinksProps[];
  path: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navLinks,
  path,
}) => {
  return (
    <>
      {navLinks.map((navLink, index) => (
        <DesktopNavLinks
          key={index}
          text={navLink.text}
          href={navLink.href}
          active={path === navLink.path}
        />
      ))}
    </>
  );
};

export default DesktopNavigation;

const DesktopNavLinks = styled(NavLink)`
  a {
    padding-left: 1rem;
  }
`;
