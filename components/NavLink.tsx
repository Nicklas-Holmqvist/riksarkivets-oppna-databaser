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
  return (
    <Link href={`${href}`}>
      <StyledLink active={active}>{text}</StyledLink>
    </Link>
  );
};

export default NavLink;

const StyledLink = styled.p<StyledLinkProps>`
  font-size: 2rem;
  ${({ active: active }) =>
    active
      ? css`
           {
            text-decoration: underline;
          }
        `
      : undefined}
`;
