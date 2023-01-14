import React from 'react';
import styled from 'styled-components';
import NavLink from './NavLink';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  return (
    <StyledNav>
      <NavLink
        text="Kurhuset i Östersund"
        href="/kurhuset-i-ostersund"
        active={true}
      />
    </StyledNav>
  );
};

export default Nav;

const StyledNav = styled.nav`
  height: 5rem;
`;
