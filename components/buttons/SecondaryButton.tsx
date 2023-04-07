import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  text: string;
  href: string;
  replace?: boolean;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  text,
  href,
  replace = false,
}) => {
  return (
    <Link href={href} replace={replace}>
      <Button>{text}</Button>
    </Link>
  );
};

export default SecondaryButton;

const Button = styled.button`
  background: var(--color-white);
  color: var(--color-blue);
  padding: 0.8rem 1.4rem;
  border: 1px solid var(--color-blue);
  border-radius: 4px;
  cursor: pointer;
  transition: all ease 0.2s;
  color: var(--color-blue);
  :hover {
    background-color: var(--color-blue);
    color: var(--color-white);
  }
`;
