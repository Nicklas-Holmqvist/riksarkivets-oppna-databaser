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
        <StyledNavLink key={index}>
          <NavLink
            text={navLink.text}
            href={navLink.href}
            active={path === navLink.href}
          />
        </StyledNavLink>
      ))}
    </>
  );
};

export default DesktopNavigation;

const StyledNavLink = styled.div`
  margin-right: 1.5rem;
`;
