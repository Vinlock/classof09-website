import React from 'react';
import { rem } from 'polished';
import { Link } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import '../styles/index.scss';
import Footer from '../components/Footer';
import Image from '../components/Image';

const theme = {
  smWidth: '576px',
  mdWidth: '768px',
  lgWidth: '992px',
  xlWidth: '1200px',
  xxlWidth: '1400px',
};

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #FFF;
  }
`;

const Container = styled.div`
  @media (min-width: 320px) {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0;
  }
`;

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: ${rem('50px')};
`;

const StyledImage = styled(Image)`
  margin: 0 auto;
  max-width: ${rem('500px')};
`;

const CoreLayout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ImageContainer>
          <Link to="/">
            <StyledImage image="ecr_banner" />
          </Link>
        </ImageContainer>
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <main>
          <Container className="container">
            {children}
          </Container>
        </main>
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default CoreLayout
