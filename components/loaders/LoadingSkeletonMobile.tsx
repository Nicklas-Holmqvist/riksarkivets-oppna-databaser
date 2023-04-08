import React from 'react';
import styled from 'styled-components';

import { Counter, ListItem } from './LoadingSkeletonDesktop';

interface LoadingSkeletonMobileProps {}

const LoadingSkeletonMobile: React.FC<LoadingSkeletonMobileProps> = () => {
  return (
    <Section>
      <Counter></Counter>
      {Array.from({ length: 25 }, (index: number) => (
        <MobileListItem key={index}></MobileListItem>
      ))}
    </Section>
  );
};

export default LoadingSkeletonMobile;

const Section = styled.section`
  @media (max-width: 800px) {
    padding: 0 1rem;
  }
`;

const MobileListItem = styled(ListItem)`
  height: 224.2px;
`;
