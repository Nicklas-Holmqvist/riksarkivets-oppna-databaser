import React from 'react';
import styled from 'styled-components';

import SimpleLink from './links/SimpleLink';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <Section>
      <Container>
        <Content>
          <Title>Information</Title>
          <Paragraph>
            Informationen på den här sidan är dels taget från Riksarkivets
            nedladdningsbara datamängder. Där finns olika register som
            arkiverats av Riksarkivet som har skickats till dem. Datan är oftast
            öppen för användning, därav den här sidan Historiska databaser.
          </Paragraph>
        </Content>
        <Content>
          <Title>Skapad av</Title>
          <Paragraph>Nicklas Holmqvist</Paragraph>
          <Title>Driver</Title>
          <SimpleLink
            href={'https://www.glomdvarld.se/'}
            text={'Glömdvärld.se'}
            target={'_blank'}
          />
          <br />
          <SimpleLink
            href={'https://www.facebook.com/glomd.varld.marks.harad/'}
            text={'Glömd värld i Marks härad'}
            target={'_blank'}
          />
        </Content>
        <Content>
          <Title>Kontakt</Title>
          <SimpleLink
            href={
              'mailto:nicklas_holmqvist@outlook.com?subject=Historiska databaser'
            }
            text={'nicklas_holmqvist@outlook.com'}
          />
        </Content>
      </Container>
    </Section>
  );
};

export default Footer;

const Section = styled.footer`
  background-color: var(--color-white);
  padding: 2rem 1rem;
  border-top: 3px solid var(--color-blue);
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const Content = styled.div`
  flex: 1;
  padding-right: 1rem;
  @media (max-width: 680px) {
    flex: auto;
    width: 100%;
  }
  :nth-child(1) {
    @media (max-width: 680px) {
      padding-bottom: 1rem;
    }
  }
  :nth-child(2) {
    @media (max-width: 680px) {
      padding-bottom: 1rem;
    }
  }
`;

const Paragraph = styled.p``;

const Title = styled.h3`
  font-weight: bold;
  padding-bottom: 0.2rem;
  :nth-child(3) {
    padding-top: 1rem;
  }
`;
