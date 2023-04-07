import React, { ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import PrimaryButton, { Button } from './PrimaryButton';
import Link from 'next/link';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  resetErrorState() {
    this.setState({ hasError: false });
  }
  render() {
    if (this.state.hasError) {
      return (
        <Section>
          <h2>Något gick fel!</h2>
          <LinkContainer>
            <Link
              href={'/'}
              replace
              onClick={() => this.setState({ hasError: false })}
            >
              <Button>Något gick fel!</Button>
            </Link>
          </LinkContainer>
        </Section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const Section = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    text-align: center;
  }
`;

const LinkContainer = styled.div`
  padding-top: 2rem;
  margin: 0 auto;
`;
