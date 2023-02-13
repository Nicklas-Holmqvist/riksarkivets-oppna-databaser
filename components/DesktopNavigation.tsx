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
    <>
      {navLinks.map((navLink, index) => (
        <NavLink
          key={index}
          text={navLink.text}
          href={navLink.href}
          active={path === navLink.href}
        />
      ))}
    </>
  );
};

export default DesktopNavigation;

const StyledNavContainer = styled.div``;
