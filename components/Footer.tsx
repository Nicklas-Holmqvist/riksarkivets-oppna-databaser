import React from 'react';
import styled from 'styled-components';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <FooterSection>
      <FooterContainer>
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
          <a href="https://www.glomdvarld.se/" target="_blank" rel="noreferrer">
            Glömdvärld.se
          </a>
          <br />
          <a
            href="https://www.facebook.com/glomd.varld.marks.harad/"
            target="_blank"
            rel="noreferrer"
          >
            Glömd värld i Marks härad
          </a>
        </Content>
        <Content>
          <Title>Kontakt</Title>
          <a href="mailto:nicklas_holmqvist@outlook.com?subject=Historiska databaser">
            nicklas_holmqvist@outlook.com
          </a>
        </Content>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.footer`
  background-color: white;
  padding: 2rem 1rem;
  border-top: 3px solid #0d5c91;
`;

const FooterContainer = styled.div`
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
    :nth-child(1) {
      padding-bottom: 1rem;
    }
    :nth-child(2) {
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
