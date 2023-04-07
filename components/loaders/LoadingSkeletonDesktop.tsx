import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSkeletonDesktop = () => {
  return (
    <Section>
      <Counter></Counter>
      <TableTitles></TableTitles>
      {Array.from({ length: 25 }, (index: number) => (
        <ListItem key={index}></ListItem>
      ))}
    </Section>
  );
};

export default LoadingSkeletonDesktop;

const animateSkeleton = keyframes`
0% {
  background-color: var(--bg-color);
}
50% {
    background-color: var(--color-skeleton);
}
100% {
  background-color: var(--bg-color);
}
`;

const Section = styled.section`
  padding-top: 0.2rem;
`;

const Counter = styled.div`
  width: 132px;
  height: 12px;
  margin-bottom: 1rem;
  transition: all 0.5s ease;
  animation: ${animateSkeleton} 0.8s;
  transition-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  @media (width: 800px) {
    padding-left: 1rem;
  }
`;

const TableTitles = styled.div`
  width: 100%;
  height: 1rem;
  margin-bottom: 0.7rem;
  transition: all 0.5s ease;
  animation: ${animateSkeleton} 0.8s;
  transition-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;

const ListItem = styled.div`
  height: 47px;
  margin: 7px 0;
  background-color: var(--bg-color);
  transition: all 0.5s ease;
  animation: ${animateSkeleton} 0.8s;
  transition-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;
