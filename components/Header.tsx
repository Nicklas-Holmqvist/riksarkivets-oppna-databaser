import React from 'react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <h1>Riksarkivets nedladdningsbara datamängder</h1>
    </header>
  );
};

export default Header;
