import Link from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';

interface NavLinkProps {
  text: string;
  href: string;
  active: boolean;
}

interface StyledLinkProps {
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ text, href, active }) => {
  if (text === 'Start') {
    return (
      <Link href={href}>
        <StyledLink active={active}>{text}</StyledLink>
      </Link>
    );
  } else {
    return (
      <Link href={`${href}`}>
        <StyledLink active={active}>{text}</StyledLink>
      </Link>
    );
  }
};

export default NavLink;

const StyledLink = styled.span<StyledLinkProps>`
  position: relative;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 500;
  &:after {
    content: '';
    position: absolute;
    background-color: #e8a621;
    ${({ active }) =>
      active
        ? css`
            width: 100%;
          `
        : css`
            width: 0;
          `};
    height: 3px;
    bottom: -4px;
    left: 0;
    transition: 0.2s;
  }
  &:hover:after {
    width: 100%;
  }
`;
