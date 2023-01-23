import React from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  size?: number;
  hover: boolean;
}

interface StyledIconProps {
  hover: boolean;
}

export const Icon: React.FC<IconProps> = ({
  src,
  alt,
  size = 18,
  hover,
  ...props
}) => {
  if (!src) {
    return <span>{alt}</span>;
  }
  return (
    <div {...props}>
      <StyledIcon
        hover={hover}
        src={src}
        height={size}
        width={size}
        alt={alt}
      />
    </div>
  );
};

const StyledIcon = styled(Image)<StyledIconProps>`
  cursor: pointer;
  transition: all 0, 2s;
  ${({ hover }) =>
    hover
      ? css`
          :hover {
            transform: scale(1.1);
          }
        `
      : undefined};
`;
