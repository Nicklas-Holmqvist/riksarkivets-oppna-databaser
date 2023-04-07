import Link from 'next/link';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled, { css } from 'styled-components';

interface NavLinkProps {
  text: string;
  href: string;
  active: boolean;
}

interface StyledLinkProps {
  active: boolean;
  desktopView: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ text, href, active }) => {
  const desktopView = useMediaQuery({
    query: '(min-width: 800px)',
  });

  if (text === 'Start') {
    return (
      <Link href={href}>
        <StyledLink active={active} desktopView={desktopView}>
          {text}
        </StyledLink>
      </Link>
    );
  } else {
    return (
      <Link href={`${href}`}>
        <StyledLink active={active} desktopView={desktopView}>
          {text}
        </StyledLink>
      </Link>
    );
  }
};

export default NavLink;

export const StyledLink = styled.span<StyledLinkProps>`
  position: relative;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 500;
  ${({ desktopView }) =>
    desktopView
      ? css`
          margin-right: 1rem;
        `
      : undefined}
  &:after {
    content: '';
    position: absolute;
    background-color: var(--color-gold);
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
