import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import PrimaryButton from '../components/PrimaryButton';

interface Custom404Props {}

const Custom404: React.FC<Custom404Props> = () => {
  const router = useRouter();
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
