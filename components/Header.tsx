import React from 'react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <h2>Riksarkivets nedladdningsbara datamängder</h2>
    </header>
  );
};

export default Header;
