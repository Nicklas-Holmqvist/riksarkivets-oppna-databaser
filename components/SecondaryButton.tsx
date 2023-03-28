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
  background: white;
  color: #0d5c91;
  padding: 0.8rem 1.4rem;
  border: 1px solid #0d5c91;
  border-radius: 4px;
  cursor: pointer;
  transition: all ease 0.2s;
  color: #0d5c91;
  :hover {
    background-color: #0d5c91;
    color: white;
  }
`;
