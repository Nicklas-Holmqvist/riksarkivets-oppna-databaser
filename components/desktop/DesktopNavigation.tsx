import React from 'react';
import styled from 'styled-components';

import NavLink from '../links/NavLink';
import { NavLinksProps } from '../Nav';

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
        <Links
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

const Links = styled(NavLink)`
  a {
    padding-left: 1rem;
  }
`;
