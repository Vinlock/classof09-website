import React from 'react'
// import PropTypes from 'prop-types'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import '../styles/index.scss'
import Footer from '../components/Footer'

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

const CoreLayout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
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
