import React from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  size?: number;
}

interface StyledIconProps {
  hover: boolean;
}

export const Icon: React.FC<IconProps> = ({
  src,
  alt,
  size = 18,
  ...props
}) => {
  if (!src) {
    return <span>{alt}</span>;
  }
  return (
    <StyledIconContainer {...props}>
      <StyledIcon src={src} height={size} width={size} alt={alt} />
    </StyledIconContainer>
  );
};

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(Image)<StyledIconProps>`
  transition: all 0, 2s;
`;
