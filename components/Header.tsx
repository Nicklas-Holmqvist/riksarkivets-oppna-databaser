import React from 'react';
import styled from 'styled-components';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <StyledHeader>
      <h1>Historiska databaser</h1>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  transition: all ease;
  background-color: var(--color-white);
  @media (max-width: 800px) {
    left: 0;
    right: 0;
    padding: 0.2rem 2rem;
    position: fixed;
    z-index: 300;
    h1 {
      font-size: 1.2rem;
    }
  }
`;
