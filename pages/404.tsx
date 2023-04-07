import React from 'react';
import styled from 'styled-components';

import PrimaryButton from '../components/buttons/PrimaryButton';

interface Custom404Props {}

const Custom404: React.FC<Custom404Props> = () => {
  return (
    <Section>
      <h2>Sidan kan inte hittas!</h2>
      <LinkContainer>
        <PrimaryButton
          href={'/'}
          text={'Gå tillbaka till start'}
          replace={true}
        />
      </LinkContainer>
    </Section>
  );
};

export default Custom404;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 15rem;
  h2 {
    text-align: center;
  }
`;

const LinkContainer = styled.div`
  padding-top: 2rem;
  margin: 0 auto;
`;
