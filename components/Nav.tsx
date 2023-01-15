import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import NavLink from './NavLink';

interface NavProps {}

const navLinks = [
  { text: 'Kurhuset i Östersund', href: '/kurhuset-i-ostersund' },
];

const Nav: React.FC<NavProps> = () => {
  const path = useRouter();
  return (
    <StyledNav>
      {navLinks.map((link, index) => (
        <NavLink
          key={index}
          text={link.text}
          href={link.href}
          active={path.asPath === link.href}
        />
      ))}
    </StyledNav>
  );
};

export default Nav;

const StyledNav = styled.nav`
  display: flex;
  box-sizing: border-box;
  height: 3.5rem;
  padding-top: 1.5rem;
`;
