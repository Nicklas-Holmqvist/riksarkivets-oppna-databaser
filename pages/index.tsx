import Head from 'next/head';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Riksarkivet nedladdningsbara datamängder</title>
        <meta name="description" content="Skapad av Nicklas Holmqvist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledMain>
        <p>Sidan är skapad som ett hobby projekt av Nicklas Holmqvist.</p>
        <p>
          All data i listan är hämtade från Riksarkivet och kan hittas här:{' '}
          <a href="https://riksarkivet.se/psidata">Riksarkivet</a>{' '}
        </p>
        <p>En startsida håller på att skapas till det här.</p>
        <p>För frågor om projektet kan ni maila:</p>
        <a href="mailto:nicklas_holmqvist@outlook.com">
          nicklas_holmqvist@outlook.com
        </a>
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  padding-left: 1rem;
  width: 100%;
  text-align: center;
  @media (max-width: 800px) {
    padding-top: 4.5rem;
  }
`;
