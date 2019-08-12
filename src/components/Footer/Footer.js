import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import { Link } from 'gatsby';
import Image from '../Image';

const Container = styled.div`
  width: 100%;
  text-align: center;
  opacity: 0.5;
  font-size: ${rem('12px')};
  margin: ${rem('50px')} auto;
`;

const StyledImage = styled(Image)`
  width: ${rem('70px')};
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  color: #000;
  margin: ${rem('20px')};
`;

const FooterLinks = styled.div`
  margin: ${rem('20px')};
`;

const Footer = () => (
  <Container className="container">
    <FooterLinks>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/privacy">Privacy Policy</StyledLink>
    </FooterLinks>
    <div>
      Powered by
      <StyledImage image="dak_logo" />
    </div>
  </Container>
);

export default Footer