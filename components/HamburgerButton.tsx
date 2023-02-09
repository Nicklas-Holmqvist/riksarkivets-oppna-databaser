import React from 'react';
import styled, { css } from 'styled-components';

interface HamburgerButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active: boolean;
}
interface StyledHamburgerButtonProps {
  active: boolean;
}
export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  active,
  ...props
}) => {
  return (
    <StyledHamburgerButton active={active} {...props}>
      <span></span>
      <span></span>
      <span></span>
    </StyledHamburgerButton>
  );
};

const StyledHamburgerButton = styled.button<StyledHamburgerButtonProps>`
  margin: 0;
  padding: 0;
  position: fixed;
  left: 1.5rem;
  top: 1.1rem;
  width: 1.6rem;
  height: 1.3rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 300;
  ${({ active }) =>
    active
      ? css`
      &:hover span {        
        &:nth-child(2) {
          width: 100%;
        }
        &:nth-child(3) {
          width: 100%;
        }
      }
        }
        `
      : css`
          &:hover span {
            width: 50%;
            &:nth-child(2) {
              width: 70%;
            }
            &:nth-child(3) {
              width: 80%;
            }
          }
        `}

  span {
    position: absolute;
    display: block;
    background-color: black;
    width: 100%;
    height: 3px;
    transition: all 0.2s;
    ${({ active }) =>
      active
        ? css`
            &:first-child {
                width: 0;
            }
            &:nth-child(2) {
                transform: rotate(-45deg);
                top: 50%;
            }
            &:nth-child(3) {
                transform: rotate(45deg);
                top: 50%;
            }
        }
        `
        : css`
            top: 10%;
            &:first-child {
              top: 50%;
            }
            &:nth-child(3) {
              top: 90%;
            }
          `}
  }
`;
