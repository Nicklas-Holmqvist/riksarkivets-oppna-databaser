import React from 'react';
import styled from 'styled-components';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <StyledHeader>
      <h1>Riksarkivets öppna data</h1>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  transition: all ease;
  @media (max-width: 800px) {
    left: 0;
    right: 0;
    padding: 0 2rem;
    position: fixed;
    background-color: white;
    z-index: 200;
  }
`;
