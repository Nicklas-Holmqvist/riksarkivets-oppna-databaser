import React from 'react';
import styled from 'styled-components';

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  return (
    <HeroSection>
      <HeroContent>
        <h2>
          &#8220;Sök i historiska databaser ur Riksarkivets samlingar&#8220;
        </h2>
        <p> &#8211; Ett projekt av Nicklas Holmqvist</p>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 16rem 0;
  h2 {
    padding-bottom: 0.5rem;
  }
  @media (max-width: 800px) {
    padding: 6rem 0 12rem 0;
    h2 {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 540px) {
    h2 {
      font-size: 1rem;
    }
  }
`;

const HeroContent = styled.section`
  padding: 0 1rem;
`;
