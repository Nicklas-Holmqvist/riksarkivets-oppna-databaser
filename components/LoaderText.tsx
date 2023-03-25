import React from 'react';
import styled from 'styled-components';
interface LoaderTextProps {
  text: string;
}

const LoaderText: React.FC<LoaderTextProps> = ({ text }) => {
  return (
    <Section>
      <p>{text}</p>
    </Section>
  );
};

export default LoaderText;

const Section = styled.section`
  padding: 4rem 0;
  text-align: center;
  transition: all ease 0.1s;
`;
